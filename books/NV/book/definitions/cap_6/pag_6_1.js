const def = {
  scrollNav: true,
  artifacts: {
    lexico_1: {
      body: [
        ["Multiplicación", "Signos de los factores"],
        ["Tamaño del simplificado", "Signos de los factores"],
      ],
      engine: engineTable,
    },
    example_1: {
      body: [
        [" 2·3", "Los dos + "],
        [" 6 ", "6"],
      ],

      engine: engineTable,
    },
    example_2: {
      body: [
        [
          "<mrow><mn>2</mn><mo>⋅</mo><mrow><mo>(</mo><mrow><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow>",
          "Un -",
        ],
        [" 6 ", "-6"],
      ],

      engine: engineTable,
    },
    artifact_1: {
      border: true,
      body: [
        [
          "<mrow><mo>−</mo><mn>2</mn><mo>⋅</mo><mn>3</mn></mrow>",
          {
            tag: "select",
            default: [
              {valor: "selecciona"},
              {valor: "Un -"},
              {valor: "Un +"},
              {valor: "Los dos +"},
              {valor: "Los dos -"},
            ],
          },
        ],
        [
          {tag: "input", style: "inputLarge"},
          {tag: "input", style: "inputLarge"},
        ],
      ],
      conditions: [["un -"], ["6"], ["-6"]],
      engine: engineTable,
    },
    artifact_2: {
      body: [
        [
          "<mrow><mo>−</mo><mn>2</mn><mo>⋅</mo><mrow><mo>(</mo><mrow><mo>−</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow>",

          {
            tag: "select",
            default: [
              {valor: "selecciona"},
              {valor: "Un -"},
              {valor: "Un +"},
              {valor: "Los dos +"},
              {valor: "Los dos -"},
            ],
          },
        ],

        [
          {tag: "input", style: "inputLarge"},
          {tag: "input", style: "inputLarge"},
        ],
      ],
      conditions: [["los dos -"], ["6"], ["6"]],
      engine: engineTable,
    },
    artifact_3: {
      body: [
        [
          "<mrow><mo>−</mo><mn>5</mn><mo>⋅</mo><mn>6</mn></mrow>",
          {
            tag: "select",
            default: [
              {valor: "selecciona"},
              {valor: "Un -"},
              {valor: "Un +"},
              {valor: "Los dos +"},
              {valor: "Los dos -"},
            ],
          },
        ],

        [
          {tag: "input", style: "inputLarge"},
          {tag: "input", style: "inputLarge"},
        ],
      ],
      conditions: [["un -"], ["30"], ["-30"]],
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
