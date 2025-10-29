const def = {
  scrollNav: true,
  artifacts: {
    /*nuevos*/

    artifact_1: {
      body: [
        [
          "-8·(-2)",
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
      conditions: [["los dos -"], ["16"], ["16"]],
      engine: engineTable,
    },
    artifact_2: {
      body: [
        [
          "-8·2",
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
    artifact_3: {
      body: [
        [
          "11·(-5)",
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
      conditions: [["un -"], ["55"], ["-55"]],
      engine: engineTable,
    },
    artifact_4: {
      body: [
        [
          "11·5",
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
      conditions: [["los dos +"], ["55"], ["55"]],
      engine: engineTable,
    },
    artifact_5: {
      body: [
        [
          "-11·(-5)",
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
      conditions: [["los dos -"], ["55"], ["55"]],
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
