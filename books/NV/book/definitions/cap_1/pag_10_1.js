const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      parent: "main-content",
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "24",
          valueB: "3",
          operador1: "/",
          valueC: "",

          content: "body",
          id: "jsxgraph5",
        },
      ],
      conditions: [["8"]],
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

          valueA: "7",
          valueB: "3",
          operador1: ".",
          valueC: "",

          content: "body",
          id: "jsxgraph6",
        },
      ],
      conditions: [["21"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_3: {
      parent: "main-content",
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "7",
          valueB: "3",
          operador1: "+",
          valueC: "",

          content: "body",
          id: "jsxgraph7",
        },
      ],
      conditions: [["10"]],
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

          valueA: "15",
          valueB: "3",
          operador1: "/",
          valueC: "",

          content: "body",
          id: "jsxgraph8",
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

          valueA: "7",
          valueB: "3",
          operador1: "-",
          valueC: "",

          content: "body",
          id: "jsxgraph9",
        },
      ],
      conditions: [["4"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_6: {
      parent: "main-content",
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "15",
          valueB: "3",
          operador1: "÷",
          valueC: "",

          content: "body",
          id: "jsxgraph10",
        },
      ],
      conditions: [["5"]],
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
