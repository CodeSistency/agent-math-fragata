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
          {left: "9 - ()"},
          {left: "6"},
        ],
      },
      conditions: [["1"], ["3"]],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: ""}, // Cada objeto representa una fila con dos valores
          {left: "10 - ()"},
          {left: ""},
          {left: "3 \\cdot  ()"},
          {left: "15"},
        ],
      },
      conditions: [["5"], ["5"]],
      engine: DiagramVertical,
    },
    artifact_3: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "x"}, // Cada objeto representa una fila con dos valores
          {left: "9 - ()"},
          {left: ""},
          {left: "5 \\cdot  ()"},
          {left: ""},
        ],
      },
      conditions: [
        ["9-x"],
        ["5\\cdot\\left(9-x\\right)", "5\\left(9-x\\right)"],
      ],
      engine: DiagramVertical,
    },
    artifact_4: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "y"}, // Cada objeto representa una fila con dos valores
          {left: "2 + ()"},
          {left: ""},
          {left: "2 \\cdot  ()"},
          {left: ""},
        ],
      },
      conditions: [
        ["2+y"],
        ["2\\cdot\\left(2+y\\right)", "2\\left(2+y\\right)"],
      ],
      engine: DiagramVertical,
    },
    artifact_5: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "y"}, // Cada objeto representa una fila con dos valores
          {left: "2 \\cdot  ()"},
          {left: ""},
          {left: "2 + ()"},
          {left: ""},
        ],
      },
      conditions: [
        ["2\\cdot y", "2y"],
        [
          "2+\\left(2\\cdot y\\right)",
          "2+\\left(2y\\right)",
          "2+2y",
          "2+2\\cdot y",
        ],
      ],
      engine: DiagramVertical,
    },
    artifact_6: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "z"}, // Cada objeto representa una fila con dos valores
          {left: "3 \\cdot  ()"},
          {left: ""},
          {left: "() + 4"},
          {left: ""},
        ],
      },
      conditions: [
        ["3\\cdot z", "3z"],
        ["3z+4", "\\left(3\\cdot z\\right)+4", "3\\cdot z+4"],
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

const contentMain = new CreateView(def);
