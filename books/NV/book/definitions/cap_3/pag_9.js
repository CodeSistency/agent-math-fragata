const textUtils = {
  artifacts: {
    lexico_1: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: " ", right: " "}, // Cada objeto representa una fila con dos valores
          {
            left: "\\text{Operación}",
            right:
              "\\begin{center} \\begin{array}{c} \\text{Operación} \\\\ \\text{Inversa} \\end{array} \\end{center}",
          },
          {left: " ", right: " "},
        ],
      },

      engine: DiagramVertical,
    },
  },
};

const def = {
  scrollNav: {
    tittle: "Operación Inversa",
  },
  artifacts: {
    example_1: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "8", right: "8"}, // Cada objeto representa una fila con dos valores
          {left: "() + 2", right: "() - 2"},
          {left: "10", right: "10"},
        ],
      },

      engine: DiagramVertical,
    },

    artifact_1: {
      border: true,
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "4", right: "4"}, // Cada objeto representa una fila con dos valores
          {left: "() + 2"},
          {},
        ],
      },
      conditions: [["\\left(\\right)-2"], ["6"], ["6"]],
      engine: DiagramVertical,
    },
    artifact_2: {
      border: true,
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "4", right: "4"}, // Cada objeto representa una fila con dos valores
          {left: "() \\cdot  2"},
          {},
        ],
      },
      conditions: [["\\frac{\\left(\\right)}{2}", '\\left(\\right)/2'], ["8"], ["8"]],
      engine: DiagramVertical,
    },
    artifact_3: {
      border: true,
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "4", right: "4"}, // Cada objeto representa una fila con dos valores
          {left: "() - 2"},
          {},
        ],
      },
      conditions: [["\\left(\\right)+2"], ["2"], ["2"]],
      engine: DiagramVertical,
    },
    artifact_4: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "4", right: "4"}, // Cada objeto representa una fila con dos valores
          {left: "() ÷ 2"},
          {},
        ],
      },
      conditions: [
        ["2\\cdot\\left(\\right)", "\\left(\\right)\\cdot2"],
        ["2"],
        ["2"],
      ],
      engine: DiagramVertical,
    },
    artifact_5: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "4", right: "4"}, // Cada objeto representa una fila con dos valores
          {left: "() - 7"},
          {},
        ],
      },
      conditions: [["\\left(\\right)+7"], ["-3"], ["-3"]],
      engine: DiagramVertical,
    },
    artifact_6: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "6"}, // Cada objeto representa una fila con dos valores
          {left: "() / 2"},
          {},
        ],
      },
      conditions: [
        ["6"],
        ["2\\cdot\\left(\\right)", "\\left(\\right)\\cdot2"],
        ["3"],
        ["3"],
      ],
      engine: DiagramVertical,
    },
    artifact_7: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "12", right: "4"}, // Cada objeto representa una fila con dos valores
          {left: "() - 2"},
          {},
        ],
      },
      conditions: [["\\left(\\right)+2"], ["10"], ["10"]],
      engine: DiagramVertical,
    },
    artifact_8: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "11", right: "11"}, // Cada objeto representa una fila con dos valores
          {},
          {left: "4", right: "4"},
        ],
      },
      conditions: [["\\left(\\right)-7"], ["\\left(\\right)+7"]],
      engine: DiagramVertical,
    },
    artifact_9: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "6", right: "6"}, // Cada objeto representa una fila con dos valores
          {left: "6 - ()"},
          {},
        ],
      },
      conditions: [["6+\\left(\\right)"], ["0"], ["0"]],
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

const contentMain = new CreateView(textUtils);
contentMain.initVIew(def);
