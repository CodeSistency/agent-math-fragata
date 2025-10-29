const def = {
  scrollNav: {
    lexico:
      "<p><b>Regla:</b> Cuando la operación es número·() y en el () va una expresión, hay que dejar los paréntesis.</p>",
  },
  artifacts: {
    artifact_1: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "n"}, // Cada objeto representa una fila con dos valores
          {left: "4 \\cdot  ()"},
          {left: ""},
          {left: "() + 1"},
          {left: ""},
        ],
      },
      conditions: [["4n"], ["4n+1"]],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "k"}, // Cada objeto representa una fila con dos valores
          {left: "1 + ()"},
          {left: ""},
          {left: "3 \\cdot  ()"},
          {left: ""},
        ],
      },
      conditions: [["1+k"], ["3\\left(1+k\\right)"]],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "w"}, // Cada objeto representa una fila con dos valores
          {left: "5 - ()"},
          {left: ""},
          {left: "3 \\cdot  ()"},
          {left: ""},
        ],
      },
      conditions: [
        ["5-w"],
        ["3\\left(5-w\\right)", "3\\cdot\\left(5-w\\right)"],
      ],
      engine: DiagramVertical,
    },
    artifact_4: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "z"}, // Cada objeto representa una fila con dos valores
          {left: "3 \\cdot  ()"},
          {left: ""},
          {left: "() - 4"},
          {left: ""},
        ],
      },
      conditions: [["3z"], ["3z-4"]],
      engine: DiagramVertical,
    },
    artifact_5: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "n"}, // Cada objeto representa una fila con dos valores
          {left: "() + 1"},
          {left: ""},
          {left: "4 \\cdot  ()"},
          {left: ""},
        ],
      },
      conditions: [["n+1"], ["4\\left(n+1\\right)"]],
      engine: DiagramVertical,
    },
    artifact_6: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "x"}, // Cada objeto representa una fila con dos valores
          {left: "() / 3"},
          {left: ""},
          {left: "3 \\cdot  ()"},
          {left: ""},
        ],
      },
      conditions: [
        ["\\frac{x}{3}", "x/3"],
        [
          "3\\left(\\frac{x}{3}\\right)",
          "3\\cdot\\left(x/3\\right)",
          "3\\left(x/3\\right)",
          "3\\cdot\\left(\\frac{x}{3}\\right)",
        ],
      ],
      engine: DiagramVertical,
    },
    artifact_7: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "u"}, // Cada objeto representa una fila con dos valores
          {left: "3 \\cdot  ()"},
          {left: ""},
          {left: "9 - ()"},
          {left: ""},
        ],
      },
      conditions: [["3u"], ["9-3u"]],
      engine: DiagramVertical,
    },
    artifact_8: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "h"}, // Cada objeto representa una fila con dos valores
          {left: "6 \\cdot  ()"},
          {left: ""},
          {left: "() + 2"},
          {left: ""},
        ],
      },
      conditions: [["6h"], ["6h+2"]],
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
