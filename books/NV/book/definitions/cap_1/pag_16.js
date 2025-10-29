const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      border: true,

      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "",
          valueB: "3",
          operador1: ".",
          valueC: "4",
          valueD: "",
          operador2: "+",
          valueE: "16",

          content: "body",
          id: "jsxgraph1",
        },
      ],
      conditions: [["4"], ["12"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_2: {
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "",
          valueB: "3",
          operador1: ".",
          valueC: "2",
          valueD: "",
          operador2: "-",
          valueE: "16",

          content: "body",
          id: "jsxgraph2",
        },
      ],
      conditions: [["6"], ["18"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_3: {
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "",
          valueB: "3",
          operador1: "+",
          valueC: "4",
          valueD: "",
          operador2: ".",
          valueE: "16",

          content: "body",
          id: "jsxgraph3",
        },
      ],
      conditions: [["1"], ["4"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_4: {
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "",
          valueB: "3",
          operador1: "/",
          valueC: "4",
          valueD: "",
          operador2: ".",
          valueE: "16",

          content: "body",
          id: "jsxgraph4",
        },
      ],
      conditions: [["12"], ["4"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_5: {
      parent: "main-content",
      valuesDefault: [
        {
          type: 2,

          valueA: "10",
          valueB: "2",
          operador1: ".",
          valueC: "",
          valueD: "",
          operador2: "+",
          valueE: "16",

          content: "body",
          id: "jsxgraph5",
        },
      ],
      conditions: [["3"], ["6"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_6: {
      parent: "main-content",
      valuesDefault: [
        {
          type: 2,

          valueA: "",
          valueB: "4",
          operador1: ".",
          valueC: "4",
          valueD: "",
          operador2: "+",
          valueE: "16",

          content: "body",
          id: "jsxgraph6",
        },
      ],
      conditions: [["0"], ["16"]],
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
