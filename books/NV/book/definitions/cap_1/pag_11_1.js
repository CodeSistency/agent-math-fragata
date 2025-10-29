const def = {
  scrollNav: true,
  artifacts: {
    //clase
    artifact_1: {
      parent: "main-content",
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "",
          valueB: "",
          operador1: "/",
          valueC: "6",

          content: "body",
          id: "jsxgraph1",
        },
      ],
      conditions: {
        operations: [{valueEspecting: 6, operador: "/"}],
      },

      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },

    artifact_2: {
      parent: "main-content",
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "",
          valueB: "",
          operador1: "+",
          valueC: "12",

          content: "body",
          id: "jsxgraph6",
        },
      ],
      conditions: {
        operations: [{valueEspecting: 12, operador: "+"}],
      },

      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    //class2Content
    artifact_3: {
      parent: "main-content",
      small: true,
      exampleElement: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "",
          valueB: "",
          operador1: ".",
          valueC: "28",

          content: "body",
          id: "jsxgraph7",
        },
      ],
      conditions: {
        operations: [{valueEspecting: 28, operador: "*"}],
      },
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_4: {
      parent: "main-content",
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "",
          valueB: "",
          operador1: "/",
          valueC: "5",

          content: "body",
          id: "jsxgraph4",
        },
      ],
      conditions: {
        operations: [{valueEspecting: 5, operador: "/"}],
      },

      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },

    artifact_5: {
      parent: "main-content",
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "",
          valueB: "",
          operador1: "÷",
          valueC: "1",

          content: "body",
          id: "jsxgraph8",
        },
      ],
      conditions: {
        operations: [{valueEspecting: 1, operador: "/"}],
      },
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
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
