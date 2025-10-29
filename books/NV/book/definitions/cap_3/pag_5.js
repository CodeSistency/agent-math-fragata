const def = {
  scrollNav: true,
  artifacts: {
    example_1: {
      border: true,
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "6"}, // Parte central
          {left: "9-()"}, // Parte superior
          {left: "3"},
          {left: "5\\cdot ()"}, // Parte superior
          {left: "15"}, // Parte inferior
        ],
      },
      engine: DiagramVertical,
    },
    artifact_1: {
      border: true,
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "2"}, // Parte central
          {left: "3+()"}, // Parte superior
          {left: ""},
          {left: "2\\cdot ( )"}, // Parte superior
          {left: ""}, // Parte inferior
        ],
      },
      conditions: [
        ["5"],
        ["10"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "7"}, // Parte central
          {left: "() - 5"}, // Parte superior
          {left: ""},
          {left: "3 \\cdot ()"}, // Parte superior
          {left: ""}, // Parte inferior
        ],
      },
      conditions: [
        ["2"],
        ["6"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "6"}, // Parte central
          {left: "2 \\cdot ( )"}, // Parte superior
          {left: ""},
          {left: "\\frac{( )}{3}"}, // Parte superior
          {left: ""}, // Parte inferior
        ],
      },
      conditions: [
        ["12"],
        ["4"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },
    artifact_4: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "4"}, // Cada objeto representa una fila con dos valores
          {left: "() - 1"},
          {left: ""},
          {left: "() / 3"},
          {left: ""},
        ],
      },
      conditions: [["3"], ["1"]],
      engine: DiagramVertical,
    },
    artifact_5: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "5"}, // Cada objeto representa una fila con dos valores
          {left: "() + 1"},
          {left: ""},
          {left: "4 + ()"},
          {left: ""},
        ],
      },
      conditions: [["6"], ["10"]],
      engine: DiagramVertical,
    },
    artifact_6: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "9 - ()"},
          {left: ""},
          {left: "5 \\cdot  ()"},
          {left: "25"},
        ],
      },
      conditions: [["4"], ["5"]],
      engine: DiagramVertical,
    },
    artifact_7: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "2 \\cdot  ()"},
          {left: ""},
          {left: "2 + ()"},
          {left: "8"},
        ],
      },
      conditions: [["3"], ["6"]],
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

const contentMain = new CreateView(def);
