const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      border: true,
      parent: "main-content",
      subInputType: 3,
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "x",
          valueB: "y",
          operador1: "+",
          valueC: "",

          content: "body",
          id: "jsxgraph1",
        },
      ],
      conditions: [["x+y"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_2: {
      parent: "main-content",
      subInputType: 3,
      border: true,
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "x",
          valueB: "y",
          operador1: "/",
          valueC: "",

          content: "body",
          id: "jsxgraph2",
        },
      ],
      conditions: [["x/y"]],
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

          valueA: "y",
          valueB: "x",
          operador1: "/",
          valueC: "",

          content: "body",
          id: "jsxgraph3",
        },
      ],
      conditions: [["y/x"]],
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

          valueA: "d",
          valueB: "a",
          operador1: "÷",
          valueC: "",

          content: "body",
          id: "jsxgraph4",
        },
      ],
      conditions: [["d\\div a"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_5: {
      parent: "main-content",
      subInputType: 3,
      small: true,
      exampleElement: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "2",
          valueB: "y",
          operador1: ".",
          valueC: "",

          content: "body",
          id: "jsxgraph5",
        },
      ],
      conditions: [["2\\cdot y", "2y"]],
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
