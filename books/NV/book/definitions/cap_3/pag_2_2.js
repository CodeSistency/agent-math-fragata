const allDef = {
  engine: DiagramVertical,
  scrollNav: true,
  artifacts: {
    artifact_1: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "()+2"},
          {left: "11"},
        ],
        // bottom: "2",
      },
      conditions: [["9"]],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: "3x"}, // Cada objeto representa una fila con dos valores
          {left: "()-2"},
          {left: ""},
        ],
        // bottom: "2",
      },
      conditions: [["3x-2", "\\left(3x\\right)-2"]],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: "6/x"}, // Cada objeto representa una fila con dos valores
          {left: "\\left(\\right)\\cdot2"},
          {left: ""},
        ],
        // bottom: "2",
      },
      conditions: [
        [
          "6/x\\cdot2",
          "\\left(6/x\\right)\\cdot2",
          "\\frac{6}{x}\\cdot2",
          "\\left(\\frac{6}{x}\\right)\\cdot2",
        ],
      ],
      engine: DiagramVertical,
    },
    artifact_4: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: ""},
          {left: "x/4"},
        ],
        // bottom: "2",
      },
      conditions: [["x"], ["\\left(\\right)/4", "\\frac{\\left(\\right)}{4}"]],
      engine: DiagramVertical,
    },
    artifact_5: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: ""},
          {left: "2-y"},
        ],
        // bottom: "2",
      },
      conditions: [["y"], ["2-\\left(\\right)"]],
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
