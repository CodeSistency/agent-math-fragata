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
          {left: "y"}, // Cada objeto representa una fila con dos valores
          {left: "()/3"},
          {left: ""},
        ],
        // bottom: "2",
      },
      conditions: [["\\frac{y}{3}", "y/3"]],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: "z"}, // Cada objeto representa una fila con dos valores
          {left: "2-()"},
          {left: ""},
        ],
        // bottom: "2",
      },
      conditions: [["2-z"]],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: "x"}, // Cada objeto representa una fila con dos valores
          {left: "()/7"},
          {left: ""},
        ],
        // bottom: "2",
      },
      conditions: [["\\frac{x}{7}", "x/7"]],
      engine: DiagramVertical,
    },
    artifact_4: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: "x"}, // Cada objeto representa una fila con dos valores
          {left: "7-()"},
          {left: ""},
        ],
        // bottom: "2",
      },
      conditions: [["7-x"]],
      engine: DiagramVertical,
    },
    artifact_5: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: ""},
          {left: "3y"},
        ],
        // bottom: "2",
      },
      conditions: [["y"], ["3\\cdot\\left(\\right)", "3\\left(\\right)"]],
      engine: DiagramVertical,
    },
    artifact_6: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: ""},
          {left: "z+2"},
        ],
        // bottom: "2",
      },
      conditions: [["z"], ["\\left(\\right)+2"]],
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
