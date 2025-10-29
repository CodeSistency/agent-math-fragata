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
          {left: "\\frac{x}{2}+4"},
        ],
        // bottom: "2",
      },
      conditions: [
        ["x"],
        ["\\frac{\\left(\\right)}{2}"],
        ["\\frac{x}{2}"],
        ["\\left(\\right)+4"],
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
          {left: "6x-2"},
        ],
        // bottom: "2",
      },
      conditions: [
        ["x"],
        ["6\\left(\\right)", "6\\cdot\\left(\\right)", "6.\\left(\\right)"],
        ["6x", "6.x", "6\\cdot\\left(\\right)"],
        ["\\left(\\right)-2"],
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
          {left: "5-3x"},
        ],
        // bottom: "2",
      },
      conditions: [
        ["x"],
        ["3\\left(\\right)", "3\\cdot\\left(\\right)"],
        ["3x"],
        ["5-\\left(\\right)"],
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
          {left: "4(y-6)"},
        ],
        // bottom: "2",
      },
      conditions: [
        ["y"],
        ["\\left(\\right)-6"],
        ["y-6"],
        ["4\\left(\\right)", "4\\cdot\\left(\\right)"],
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
          {left: "7z+5"},
        ],
        // bottom: "2",
      },
      conditions: [
        ["z"],
        ["7\\left(\\right)", "7\\cdot\\left(\\right)"],
        ["7z"],
        ["\\left(\\right)+5"],
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
          {left: "7(z+5)"},
        ],
        // bottom: "2",
      },
      conditions: [
        ["z"],
        ["\\left(\\right)+5"],
        ["z+5"],
        ["7\\left(\\right)", "7\\cdot\\left(\\right)", "7.\\left(\\right)"],
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
