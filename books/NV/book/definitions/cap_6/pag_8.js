const def = {
  scrollNav: true,
  artifacts: {
    example_1: {
      description:
        "<h3>División de números enteros<h3><p>El signo del resultado de la división de números enteros se obtienen con las mismas reglas que el de la multiplicación.</p> <p>El tamaño se obtiene dividiendo los tamaños</p>",
      body: [
        ["División", "Signo de los números"],
        ["Tamaño del resultado", "Resultados"],
      ],
      engine: engineTable,
    },
    example_2: {
      body: [
        [
          {value: "12/3", style: {td: "width-100"}},
          {value: "Dos +", style: {td: "width-100"}},
        ],
        [
          {value: "4", style: {td: "width-100"}},
          {value: "4", style: {td: "width-100"}},
        ],
      ],

      engine: engineTable,
    },
    artifact_1: {
      body: [
        [{value: "12/3", style: {td: "width-100"}}, "Un -"],
        [
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["4"], ["-4"]],
      engine: engineTable,
    },
    artifact_2: {
      body: [
        [
          {value: "-12/3", style: {td: "width-100"}},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
        [
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["un-"], ["4"], ["-4"]],
      engine: engineTable,
    },
    artifact_3: {
      body: [
        [
          {value: "-12/(-3)", style: {td: "width-100"}},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
        [
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["dos-"], ["4"], ["4"]],
      engine: engineTable,
    },
    artifact_4: {
      body: [
        [
          {value: "15/3", style: {td: "width-100"}},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
        [
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["dos+"], ["5"], ["5"]],
      engine: engineTable,
    },
    artifact_5: {
      body: [
        [
          {value: "-15/-3", style: {td: "width-100"}},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
        [
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["dos-"], ["5"], ["5"]],
      engine: engineTable,
    },
    artifact_raiting: {
      parent: "scroll-container",
      questions: {
        question_1: {
          value: "¿Fue fácil?",
        },
      },
      engine: EngineOwner,
    },
  },
};

const contentMain = new CreateView(def);
