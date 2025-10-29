const def = {
  scrollNav: true,
  artifacts: {
    /*nuevos*/

    artifact_1: {
      body: [
        [
          "<mrow><mn>6</mn><mo>⋅</mo><mrow><mo>(</mo><mrow><mo>−</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow>",
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
    artifact_2: {
      body: [
        [
          "-6·(-5)",
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
      conditions: [["los dos -"], ["30"], ["30"]],
      engine: engineTable,
    },
    artifact_3: {
      body: [
        [
          "<mrow><mo>−</mo><mn>6</mn><mo>⋅</mo><mn>5</mn></mrow>",
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
    artifact_4: {
      body: [
        [
          "6·5",
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
      conditions: [["los dos +"], ["30"], ["30"]],
      engine: engineTable,
    },
    artifact_5: {
      body: [
        [
          "2·(-8)",
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
      conditions: [["un -"], ["16"], ["-16"]],
      engine: engineTable,
    },
    /**/
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
