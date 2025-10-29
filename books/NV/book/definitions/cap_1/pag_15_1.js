const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "6",
          valueB: "3",
          operador1: "/",
          valueC: "2",
          valueD: "",
          operador2: "-",
          valueE: "",

          content: "body",
          id: "jsxgraph1",
        },
      ],
      conditions: [["2"], ["0"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_2: {
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "6",
          valueB: "3",
          operador1: "/",
          valueC: "3",
          valueD: "",
          operador2: ".",
          valueE: "",

          content: "body",
          id: "jsxgraph2",
        },
      ],
      conditions: [["2"], ["6"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_3: {
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "6",
          valueB: "4",
          operador1: ".",
          valueC: "4",
          valueD: "",
          operador2: "-",
          valueE: "",

          content: "body",
          id: "jsxgraph3",
        },
      ],
      conditions: [["24"], ["20"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_4: {
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "6",
          valueB: "4",
          operador1: "+",
          valueC: "4",
          valueD: "",
          operador2: ".",
          valueE: "",

          content: "body",
          id: "jsxgraph4",
        },
      ],
      conditions: [["10"], ["40"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_5: {
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "6",
          valueB: "4",
          operador1: "+",
          valueC: "4",
          valueD: "",
          operador2: "+",
          valueE: "",

          content: "body",
          id: "jsxgraph5",
        },
      ],
      conditions: [["10"], ["14"]],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_6: {
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "6",
          valueB: "4",
          operador1: ".",
          valueC: "4",
          valueD: "",
          operador2: "/",
          valueE: "",

          content: "body",
          id: "jsxgraph6",
        },
      ],
      conditions: [["24"], ["6"]],
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
