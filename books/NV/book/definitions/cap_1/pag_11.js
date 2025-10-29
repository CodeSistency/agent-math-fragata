const def = {
  scrollNav: true,
  artifacts: {
    //clase
    example_1: {
      border: true,
      small: true,
      parent: "main-content",
      valuesDefault: [
        {
          type: 3,

          valueA: "6",
          valueB: "4",
          operador1: ".",
          valueC: "24",

          content: "body",
          id: "jsxgraph1",
        },
      ],

      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },

    artifact_1: {
      border: true,
      small: true,
      parent: "main-content",
      valuesDefault: [
        {
          type: 3,

          valueA: "",
          valueB: "",
          operador1: "-",
          valueC: "24",

          content: "body",
          id: "jsxgraph6",
        },
      ],
      conditions: {
        operations: [{valueEspecting: 24, operador: "-"}],
      },

      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    //class2Content
    artifact_2: {
      small: true,
      parent: "main-content",
      exampleElement: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "",
          valueB: "",
          operador1: ".",
          valueC: "15",

          content: "body",
          id: "jsxgraph7",
        },
      ],
      conditions: {
        operations: [{valueEspecting: 15, operador: "*"}],
      },
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_3: {
      small: true,
      parent: "main-content",
      valuesDefault: [
        {
          type: 3,

          valueA: "",
          valueB: "",
          operador1: "+",
          valueC: "5",

          content: "body",
          id: "jsxgraph4",
        },
      ],
      conditions: {
        operations: [{valueEspecting: 5, operador: "+"}],
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
          operador1: ".",
          valueC: "1",

          content: "body",
          id: "jsxgraph8",
        },
      ],
      conditions: {
        operations: [{valueEspecting: 1, operador: "*"}],
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
