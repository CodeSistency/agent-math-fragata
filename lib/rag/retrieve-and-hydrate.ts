import { VectorStoreV2 } from "@/lib/rag/vector-store-v2";
import { pageRepository, exerciseRepository } from "@/lib/db/repositories";
import fs from "node:fs/promises";

type RetrieveOptions = {
  topK?: number;
  bookId?: string;
  chapterId?: string;
  hasArtifact?: boolean;
  artifactType?: string;
  pageNumber?: number;
};

export type HydratedPassage = {
  score: number;
  bookId?: string;
  chapterId?: string;
  pageId?: string;
  pageNumber?: number;
  filePath?: string;
  hasArtifact?: boolean;
  artifactDefinition?: { defBoards?: Record<string, any>; rDef?: Record<string, any> };
  text: string;
  exercise: any;
};

function looksLikePlaceholder(def?: any): boolean {
  if (!def || typeof def !== "object") return true;
  const boards = def.defBoards || {};
  const rdef = def.rDef || {};
  const values = [...Object.values(boards), ...Object.values(rdef)];
  if (!values.length) return true;
  return values.every((v: any) => v && typeof v === "object" && v.detected === true);
}

function normalizeJsToJson(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|\s)\/\/.*$/gm, "")
    .replace(/(['"])??([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
    .replace(/'/g, '"')
    .replace(/,\s*([}\]])/g, "$1");
}

async function loadLegacyDefinitionFromFile(filePath: string): Promise<any | undefined> {
  try {
    const raw = await fs.readFile(filePath, "utf8");

    const grabBlock = (name: string) => {
      // soporta const/let/export const
      const re = new RegExp(`(?:const|let|export\\s+const)\\s+${name}\\s*=\\s*\\{[\\s\\S]*?\\};`, "m");
      const m = raw.match(re);
      if (!m) return undefined;
      let objText = m[0]
        .replace(/^(const|let|export\s+const)\s+[a-zA-Z_]\w*\s*=\s*/, "")
        .replace(/;\s*$/, "");
      const jsonish = normalizeJsToJson(objText);
      return JSON.parse(jsonish);
    };

    // Intentar capturar defBoards y rDef explícitos
    const boards = grabBlock("defBoards");
    const rdef = grabBlock("rDef");

    // Si no se encontró ninguno, intentar export default como último recurso
    if (!boards && !rdef) {
      const m = raw.match(/export\s+default\s*\{[\s\S]*?\};/m) || raw.match(/module\.exports\s*=\s*\{[\s\S]*?\};/m);
      if (m) {
        let objText = m[0].replace(/^(export\s+default|module\.exports\s*=)\s*/, "").replace(/;\s*$/, "");
        const jsonish = normalizeJsToJson(objText);
        const parsed = JSON.parse(jsonish);
        return parsed;
      }
    }

    if (!boards && !rdef) return undefined;
    return { defBoards: boards, rDef: rdef };
  } catch {
    return undefined;
  }
}

export async function retrieveAndHydrate(
  queryText: string,
  options: RetrieveOptions = {}
): Promise<HydratedPassage[]> {
  const { topK = 5, bookId, chapterId, hasArtifact, artifactType, pageNumber: filterPageNumber } = options;

  console.log("[retrieveAndHydrate] start:", { queryText, topK, bookId, chapterId, hasArtifact, artifactType, filterPageNumber });

  // 1) Vector search for candidates
  const hits = await VectorStoreV2.querySimilarExercises(queryText, {
    topK: Math.max(topK, 5),
    bookId,
    chapterId,
    hasArtifact,
    artifactType,
  });
  console.log("[retrieveAndHydrate] vector hits:", { count: hits.length });

  // 2) Hydrate from DB using pageId when available
  const hydrated: HydratedPassage[] = [];
  for (const hit of hits) {
    const ex = hit.exercise as any;
    const meta = ex?.metadata || {};
    let pageContentText = "";
    let pageNumber: number | undefined;
    let filePath: string | undefined;
    let artifactDefinition: { defBoards?: Record<string, any>; rDef?: Record<string, any> } | undefined =
      meta.artifactDefinition;

    try {
      if (meta.pageId) {
        const page = await pageRepository.findById(meta.pageId);
        pageNumber = page?.pageNumber;
        filePath = page?.filePath;
        // Prefer artifactDefinition from canonical page content when present
        const pageDefBoards = (page as any)?.content?.defBoards;
        const pageRDef = (page as any)?.content?.rDef;
        if (pageDefBoards || pageRDef) {
          artifactDefinition = {
            defBoards: pageDefBoards || artifactDefinition?.defBoards,
            rDef: pageRDef || artifactDefinition?.rDef,
          };
        }
        // Extract a concise text: prefer enunciado + solución if present
        const enun = ex?.enunciado ? String(ex.enunciado) : "";
        const sol = ex?.solucion ? String(ex.solucion) : "";
        // Fallback to page.content; when artifact exists, include a compact descriptor of defBoards/rDef
        let artifactSnippet = "";
        if (artifactDefinition) {
          const keys = Object.keys(artifactDefinition.defBoards || {}).slice(0, 6).join(", ");
          const rKeys = Object.keys(artifactDefinition.rDef || {}).slice(0, 6).join(", ");
          artifactSnippet = [
            keys ? `defBoards: ${keys}` : "",
            rKeys ? `rDef: ${rKeys}` : "",
          ].filter(Boolean).join(" | ");
        }
        const pageText = page?.content
          ? (artifactSnippet ? `${artifactSnippet}\n` : "") + JSON.stringify(page.content).slice(0, 1000)
          : "";
        pageContentText = [enun, sol, pageText].filter(Boolean).join("\n\n").slice(0, 1500);
      } else if (meta.chapterId) {
        // As a fallback, fetch exercises by chapter and pick a small snippet
        const exs = await exerciseRepository.findByChapterId(meta.chapterId);
        const sample = exs[0]?.enunciado || "";
        pageContentText = String(sample).slice(0, 800);
      }

      // If the artifactDefinition looks like a placeholder, try to hydrate from the @definitions file
      const wasPlaceholder = looksLikePlaceholder(artifactDefinition);
      if (wasPlaceholder && filePath) {
        const defFull = await loadLegacyDefinitionFromFile(filePath);
        if (defFull) {
          // Heurísticas de mapeo
          const fullDefBoards = defFull.defBoards || defFull.boards || defFull.board ||
            Object.fromEntries(
              Object.entries(defFull).filter(([k, v]) => /^board_\d+$/i.test(k) && v && typeof v === "object")
            ) || undefined;
          const fullRDef = defFull.rDef || defFull.artifacts || defFull.def ||
            Object.fromEntries(
              Object.entries(defFull).filter(([k, v]) => (/^artifact_\d+$/i.test(k) || k === "artifacts") && v && typeof v === "object")
            ) || undefined;
          if (fullDefBoards || fullRDef) {
            artifactDefinition = {
              ...(artifactDefinition || {}),
              ...(fullDefBoards ? { defBoards: fullDefBoards } : {}),
              ...(fullRDef ? { rDef: fullRDef } : {}),
            };
            console.log("[retrieveAndHydrate] file fallback applied:", { filePath });
          } else {
            artifactDefinition = { ...(artifactDefinition || {}), allDef: defFull, parseFailed: false } as any;
            console.log("[retrieveAndHydrate] file fallback attached allDef:", { filePath });
          }
        } else {
          artifactDefinition = { ...(artifactDefinition || {}), parseFailed: true } as any;
          console.warn("[retrieveAndHydrate] file fallback parse failed:", { filePath });
        }
      } else if (wasPlaceholder) {
        artifactDefinition = { ...(artifactDefinition || {}), placeholder: true } as any;
      }
    } catch {
      // ignore hydration errors per hit
    }

    hydrated.push({
      score: hit.score,
      bookId: meta.bookId,
      chapterId: meta.chapterId,
      pageId: meta.pageId,
      pageNumber,
      filePath,
      hasArtifact: !!artifactDefinition,
      artifactDefinition,
      text: pageContentText || ex?.enunciado || "",
      exercise: ex,
    });
  }

  // 3) Rerank with schema-affinity boosting
  const scoreWithBoost = (h: HydratedPassage): number => {
    let s = h.score ?? 0;
    // Prefer artifacts when requested or present
    if (hasArtifact && h.hasArtifact) s += 0.15;
    if (h.hasArtifact) s += 0.05;
    // Schema affinity: defBoards.board_1.style and artifacts.artifact_1
    const def = h.artifactDefinition || {};
    const styleOk = !!(def.defBoards && (def.defBoards as any).board_1 && (def.defBoards as any).board_1.style);
    const artifactsOk = !!(h.exercise?.metadata?.artifactDefinition?.artifacts?.artifact_1);
    if (styleOk) s += 0.08;
    if (artifactsOk) s += 0.08;
    // rDef conventional keys
    const rKeys = Object.keys(def.rDef || {});
    const conventional = ["curvePoints", "hLineY", "vLineX", "points"];
    if (rKeys.some((k) => conventional.includes(k))) s += 0.05;
    return s;
  };

  // Optional pageNumber filter
  const filtered = typeof filterPageNumber === "number"
    ? hydrated.filter((h) => h.pageNumber === filterPageNumber)
    : hydrated;
  if (typeof filterPageNumber === "number") {
    console.log("[retrieveAndHydrate] pageNumber filter:", { filterPageNumber, before: hydrated.length, after: filtered.length });
  }

  const reranked = filtered
    .map((h) => ({ h, bs: scoreWithBoost(h) }))
    .sort((a, b) => b.bs - a.bs)
    .map((x) => x.h);

  // Debug trace
  try {
    const trace = reranked.slice(0, Math.min(topK, 5)).map((r) => ({
      score: r.score,
      hasArtifact: r.hasArtifact,
      bookId: r.bookId,
      pageId: r.pageId,
      rDefKeys: Object.keys(r.artifactDefinition?.rDef || {}).slice(0, 6),
      defBoardsKeys: Object.keys(r.artifactDefinition?.defBoards || {}).slice(0, 6),
    }));
    console.log("[retrieveAndHydrate] Reranked sample:", trace);
  } catch {}

  // 4) Trim to requested topK
  return reranked.slice(0, topK);
}


