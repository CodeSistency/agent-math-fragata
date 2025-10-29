const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      parent: "main-content",
      subInputType: 3,
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "",
          valueB: "",
          operador1: "",
          valueC: "x-3",
          content: "body",
          id: "jsxgraph3",
        },
      ],
      conditions: [["x"], ["3"], ["-"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_2: {
      parent: "main-content",
      subInputType: 3,
      small: true,
      valuesDefault: [
        {
          type: 3,
          valueA: "",
          valueB: "",
          operador1: "",
          valueC: "xy",
          content: "body",
          id: "jsxgraph4",
        },
      ],
      conditions: [["x"], ["y"], ["\\cdot", "x", "X", "·"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_3: {
      parent: "main-content",
      exampleElement: true,
      small: true,
      subInputType: 3,
      valuesDefault: [
        {
          type: 3,

          valueA: "",
          valueB: "",
          operador1: "",
          valueC: "x+x",

          content: "body",
          id: "jsxgraph5",
        },
      ],
      conditions: [["x"], ["x"], ["+"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_4: {
      parent: "main-content",
      subInputType: 3,
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "",
          valueB: "",
          operador1: "",
          valueC: "x-5",

          content: "body",
          id: "jsxgraph2",
        },
      ],
      conditions: [["x"], ["5"], ["-"]],
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
