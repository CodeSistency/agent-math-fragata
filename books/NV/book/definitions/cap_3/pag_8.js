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
          {left: ""},
          {left: ""},
          {left: "3x+2"},
        ],
        // bottom: "2",
      },
      conditions: [
        ["x"],
        ["3\\cdot\\left(\\right)", "3.()"],
        ["3x"],
        ["\\left(\\right)+2"],
      ],
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
          {left: ""},
          {left: ""},
          {left: "4(y-3)"},
        ],
        // bottom: "2",
      },
      conditions: [
        ["y"],
        ["()-3", "\\left(\\right)-3"],
        ["y-3"],
        ["4\\cdot\\left(\\right)", "4.\\left(\\right)"],
      ],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: ""},
          {left: ""},
          {left: ""},
          {left: "2y-3"},
        ],
        // bottom: "2",
      },
      conditions: [
        ["y"],
        ["2\\left(\\right)", "2()", "2\\cdot\\left(\\right)"],
        ["2y"],
        ["\\left(\\right)-3"],
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
          {left: ""},
          {left: ""},
          {left: "5(z+3)"},
        ],
        // bottom: "2",
      },
      conditions: [
        ["z"],
        ["\\left(\\right)+3"],
        ["z+3"],
        ["5\\left(\\right)", "5\\cdot\\left(\\right)", "5.\\left(\\right)"],
      ],
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
          {left: ""},
          {left: ""},
          {left: "4y-3"},
        ],
        // bottom: "2",
      },
      conditions: [
        ["y"],
        ["4\\left(\\right)", "4\\cdot\\left(\\right)", "4.y"],
        ["4y", "4.y", "4\\cdot\\left(\\right)"],
        ["\\left(\\right)-3"],
      ],
      engine: DiagramVertical,
    },
    artifact_6: {
      parent: "containerBasePage",
      visual: "left", // o 'left', 'right', 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: ""},
          {left: ""},
          {left: ""},
          {left: "2-3x"},
        ],
        // bottom: "2",
      },
      conditions: [
        ["x"],
        ["3\\left(\\right)", "3\\cdot\\left(\\right)", "3.\\left(\\right)"],
        ["3x", "3.x", "3\\cdot x"],
        ["2-\\left(\\right)"],
      ],
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
