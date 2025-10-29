const allDef = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "3 \\cdot ()"},
          {left: "6"},
        ],
      },
      conditions: [["2"]],
      engine: DiagramVertical,
    },
    artifact_2: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "() + 2"},
          {left: "6"},
        ],
      },
      conditions: [["4"]],
      engine: DiagramVertical,
    },

    artifact_3: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "() + 4"},
          {left: "6"},
        ],
      },
      conditions: [["2"]],
      engine: DiagramVertical,
    },

    artifact_4: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "() + 2"},
          {left: "5"},
        ],
      },
      conditions: [["3"]],
      engine: DiagramVertical,
    },
    artifact_5: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "2 \\cdot ()"},
          {left: "10"},
        ],
      },
      conditions: [["5"]],
      engine: DiagramVertical,
    },

    artifact_6: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "5 \\cdot ()"},
          {left: "15"},
        ],
      },
      conditions: [["3"]],
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
