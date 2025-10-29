const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      border: true,

      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "6",
          valueB: "3",
          operador1: ".",
          valueC: "4",
          valueD: "",
          operador2: "+",
          valueE: "",

          content: "body",
          id: "jsxgraph1",
        },
      ],

      conditions: [["18"], ["22"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },

    artifact_2: {
      border: true,
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "6",
          valueB: "3",
          operador1: "+",
          valueC: "4",
          valueD: "",
          operador2: ".",
          valueE: "",

          content: "body",
          id: "jsxgraph2",
        },
      ],
      conditions: [["9"], ["36"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_3: {
      border: true,
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "6",
          valueB: "3",
          operador1: "+",
          valueC: "4",
          valueD: "",
          operador2: "+",
          valueE: "",

          content: "body",
          id: "jsxgraph3",
        },
      ],
      conditions: [["9"], ["13"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_4: {
      border: true,
      parent: "main-content",
      valuesDefault: [
        {
          type: 2,

          valueA: "6",
          valueB: "3",
          operador1: "+",
          valueC: "4",
          valueD: "",
          operador2: "+",
          valueE: "",

          content: "body",
          id: "jsxgraph4",
        },
      ],
      conditions: [["7"], ["13"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_5: {
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "6",
          valueB: "3",
          operador1: "+",
          valueC: "4",
          valueD: "",
          operador2: "-",
          valueE: "",

          content: "body",
          id: "jsxgraph5",
        },
      ],
      conditions: [["9"], ["5"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_6: {
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "6",
          valueB: "3",
          operador1: "-",
          valueC: "4",
          valueD: "",
          operador2: ".",
          valueE: "",

          content: "body",
          id: "jsxgraph6",
        },
      ],
      conditions: [["3"], ["12"]],
      tmp: "tmp",
      engine: EngineDiagrama,
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
