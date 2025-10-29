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
          {left: ""},
          {left: "z-2"},
        ],
        // bottom: "2",
      },
      conditions: [["z"], ["\\left(\\right)-2"]],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: ""},
          {left: "2+z"},
        ],
        // bottom: "2",
      },
      conditions: [["z"], ["2+\\left(\\right)"]],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: "3"}, // Cada objeto representa una fila con dos valores
          {left: "()-2"},
          {left: ""},
        ],
        // bottom: "2",
      },
      conditions: [["1"]],
      engine: DiagramVertical,
    },
    artifact_4: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: "5"}, // Cada objeto representa una fila con dos valores
          {left: "\\left(\\right)\\cdot2"},
          {left: ""},
        ],
        // bottom: "2",
      },
      conditions: [["10"]],
      engine: DiagramVertical,
    },
    artifact_5: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "3\\cdot\\left(\\right)"},
          {left: "3"},
        ],
        // bottom: "2",
      },
      conditions: [["1"]],
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
