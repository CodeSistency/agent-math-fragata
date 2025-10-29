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

          valueA: "2",
          valueB: "",
          operador1: ".",
          valueC: "6",

          content: "body",
          id: "jsxgraph1",
        },
      ],
      conditions: [["3"]],
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

          valueA: "2",
          valueB: "",
          operador1: "+",
          valueC: "12",

          content: "body",
          id: "jsxgraph6",
        },
      ],
      conditions: [["10"]],

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

          valueA: "7",
          valueB: "",
          operador1: "+",
          valueC: "7",

          content: "body",
          id: "jsxgraph7",
        },
      ],
      conditions: [["0"]],
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

          valueA: "7",
          valueB: "",
          operador1: "-",
          valueC: "2",

          content: "body",
          id: "jsxgraph4",
        },
      ],
      conditions: [["5"]],

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
          valueB: "2",
          operador1: "-",
          valueC: "6",

          content: "body",
          id: "jsxgraph8",
        },
      ],
      conditions: [["8"]],
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
