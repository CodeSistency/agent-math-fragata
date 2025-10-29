const allDef = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "x"}, // Cada objeto representa una fila con dos valores
          {left: "4 \\cdot ()"},
          {left: ""},
        ],
      },
      conditions: [
        ["4x", "4\\cdot x", "4\\left(x\\right)", "4\\cdot\\left(x\\right)"],
      ],
      engine: DiagramVertical,
    },
    artifact_2: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "y"}, // Cada objeto representa una fila con dos valores
          {left: "4 \\cdot ()"},
          {left: ""},
        ],
      },
      conditions: [
        ["4y", "4\\cdot y", "4\\left(y\\right)", "4\\cdot\\left(y\\right)"],
      ],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "y"}, // Cada objeto representa una fila con dos valores
          {left: "5 + ()"},
          {left: ""},
        ],
      },
      conditions: [["5+y"]],
      engine: DiagramVertical,
    },
    artifact_4: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "x"}, // Cada objeto representa una fila con dos valores
          {left: "() - 2"},
          {left: ""},
        ],
      },
      conditions: [["x-2"]],
      engine: DiagramVertical,
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
const contentMain = new CreateView(allDef);
