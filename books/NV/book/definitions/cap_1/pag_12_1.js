const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      parent: "main-content",
      small: true,
      subInputType: 3,
      valuesDefault: [
        {
          type: 3,

          valueA: "x",
          valueB: "y",
          operador1: ".",
          valueC: "",

          content: "body",
          id: "jsxgraph1",
        },
      ],
      conditions: [["xy", "x\\cdot y"]],
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

          valueA: "y",
          valueB: "x",
          operador1: "-",
          valueC: "",

          content: "body",
          id: "jsxgraph2",
        },
      ],
      conditions: [["y-x"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_3: {
      parent: "main-content",
      subInputType: 3,
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "x",
          valueB: "y",
          operador1: "-",
          valueC: "",

          content: "body",
          id: "jsxgraph3",
        },
      ],
      conditions: [["x-y"]],
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

          valueA: "x",
          valueB: "7",
          operador1: "-",
          valueC: "",

          content: "body",
          id: "jsxgraph4",
        },
      ],
      conditions: [["x-7"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_5: {
      parent: "main-content",
      subInputType: 3,
      exampleElement: true,
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "7",
          valueB: "x",
          operador1: "-",
          valueC: "",

          content: "body",
          id: "jsxgraph5",
        },
      ],
      conditions: [["7-x"]],
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
