const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "3 \\cdot  ()"},
          {left: ""},
          {left: "() + 4"},
          {left: "10"},
        ],
      },
      conditions: [["2"], ["6"]],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "4 \\cdot  ()"},
          {left: ""},
          {left: "() + 1"},
          {left: "17"},
        ],
      },
      conditions: [["4"], ["16"]],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "1 + ()"},
          {left: ""},
          {left: "3 \\cdot  ()"},
          {left: "15"},
        ],
      },
      conditions: [["4"], ["5"]],
      engine: DiagramVertical,
    },
    artifact_4: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "5 - ()"},
          {left: ""},
          {left: "3 \\cdot  ()"},
          {left: "9"},
        ],
      },
      conditions: [["2"], ["3"]],
      engine: DiagramVertical,
    },
    artifact_5: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "() + 1"},
          {left: ""},
          {left: "4 \\cdot  ()"},
          {left: "16"},
        ],
      },
      conditions: [["3"], ["4"]],
      engine: DiagramVertical,
    },
    artifact_6: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "() / 3"},
          {left: ""},
          {left: "3 \\cdot  ()"},
          {left: "15"},
        ],
      },
      conditions: [["15"], ["5"]],
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
