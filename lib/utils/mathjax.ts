import { useEffect, useRef } from "react";

/**
 * MathJax configuration for LaTeX rendering
 */
export const mathJaxConfig = {
  loader: { load: ["[tex]/ams"] },
  tex: {
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
    processEscapes: true,
    processEnvironments: true,
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex",
  },
};

/**
 * Hook to auto-typeset MathJax content
 */
export function useMathJax(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (typeof window === "undefined" || !window.MathJax) {
      return;
    }

    if (ref.current) {
      window.MathJax.typesetPromise([ref.current]).catch((err: Error) => {
        console.error("MathJax typeset error:", err);
      });
    }
  });
}

/**
 * Initialize MathJax script if not already loaded
 */
export function initializeMathJax() {
  if (typeof window === "undefined" || window.MathJax) {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
  script.async = true;
  script.id = "MathJax-script";
  
  script.onload = () => {
    if (window.MathJax) {
      window.MathJax.tex = mathJaxConfig.tex;
      window.MathJax.startup.defaultReady();
    }
  };

  document.head.appendChild(script);
}

/**
 * Render LaTeX string to HTML-safe string
 */
export function renderLaTeX(latex: string): string {
  // Basic escaping for HTML
  return latex
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Extend Window interface for MathJax
declare global {
  interface Window {
    MathJax?: {
      typesetPromise: (elements: HTMLElement[]) => Promise<void>;
      tex: any;
      startup: {
        defaultReady: () => void;
      };
    };
  }
}

