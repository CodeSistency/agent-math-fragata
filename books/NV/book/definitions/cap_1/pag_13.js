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

          valueA: "",
          valueB: "",
          operador1: "",
          valueC: "2+y",

          content: "body",
          id: "jsxgraph1",
        },
      ],
      conditions: [["2"], ["y"], ["+"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },

    artifact_2: {
      border: true,
      small: true,
      helpArtifact: {
        message:
          "Es una multiplicación, puedes utilizar algún signo que represente la multiplicación.",
      },
      parent: "main-content",
      subInputType: 3,
      point: [
        {
          coordenada: [1, 0.5],
          texto: "Ojo!",
        },
      ],
      valuesDefault: [
        {
          type: 3,

          valueA: "",
          valueB: "",
          operador1: "",
          valueC: "3y",

          content: "body",
          id: "jsxgraph2",
        },
      ],
      conditions: [["3"], ["y"], ["x", "X", "·", "\\cdot"]],
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

          valueA: "",
          valueB: "",
          operador1: "",
          valueC: "y3",

          content: "body",
          id: "jsxgraph3",
        },
      ],
      conditions: [["y"], ["3"], ["x", "X", "·", "\\cdot"]],
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
          valueC: "9÷x",

          content: "body",
          id: "jsxgraph4",
        },
      ],
      conditions: [["9"], ["x"], ["\\div"]],
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

          valueA: "",
          valueB: "",
          operador1: "",
          valueC: "x-x",

          content: "body",
          id: "jsxgraph5",
        },
      ],
      conditions: [["x"], ["x"], ["-"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_6: {
      parent: "main-content",
      subInputType: 3,
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "",
          valueB: "",
          operador1: "",
          valueC: "x÷6",

          content: "body",
          id: "jsxgraph6",
        },
      ],
      conditions: [["x"], ["6"], ["\\div"]],
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
