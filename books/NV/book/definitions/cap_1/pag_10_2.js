const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      parent: "main-content",
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "18",
          valueB: "3",
          operador1: ".",
          valueC: "",

          content: "body",
          id: "jsxgraph15",
        },
      ],
      conditions: [["54"]],
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

          valueA: "35",
          valueB: "7",
          operador1: "/",
          valueC: "",

          content: "body",
          id: "jsxgraph16",
        },
      ],
      conditions: [["5"]],
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

          valueA: "18",
          valueB: "3",
          operador1: "+",
          valueC: "",

          content: "body",
          id: "jsxgraph17",
        },
      ],
      conditions: [["21"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_4: {
      small: true,
      parent: "main-content",
      valuesDefault: [
        {
          type: 3,

          valueA: "18",
          valueB: "3",
          operador1: "-",
          valueC: "",

          content: "body",
          id: "jsxgraph18",
        },
      ],
      conditions: [["15"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_5: {
      small: true,
      parent: "main-content",
      valuesDefault: [
        {
          type: 3,

          valueA: "18",
          valueB: "3",
          operador1: "÷",
          valueC: "",

          content: "body",
          id: "jsxgraph19",
        },
      ],
      conditions: [["6"]],
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
