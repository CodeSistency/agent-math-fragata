const allDef = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      border: true,
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "",
        main: [
          {left: "x"},
          {left: "() + 3"},
          {left: ""},
          {left: "2\\cdot()"},
          {left: "", right: "20"},
        ],
        bottom: "",
      },

      conditions: [
        ["2\\left(x+3\\right)=20"],
        ["7"],
        ["7"],
        ["\\left(\\right)-3"],
        ["x+3"],
        ["10"],
        ["\\frac{\\left(\\right)}{2}", "\\left(\\right)/2"],
        ["2\\left(x+3\\right)"],
      ],
      engine: DiagramVertical,
    },
    artifact_2: {
      border: true,
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "",
        main: [
          {left: "x"},
          {left: "2\\cdot()"},
          {left: ""},
          {left: "() + 3"},
          {left: "", right: "20"},
        ],
        bottom: "",
      },

      conditions: [
        ["2x+3=20"],
        ["8.5"],
        ["8.5"],
        ["\\frac{\\left(\\right)}{2}", "\\left(\\right)/2"],
        ["2x"],
        ["17"],
        ["\\left(\\right)-3"],
        ["2x+3"],
      ],
      engine: DiagramVertical,
    },
    artifact_3: {
      border: true,
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "",
        main: [
          {left: "y"},
          {left: "", right: "()+3"},
          {left: ""},
          {left: "5\\cdot()"},
          {left: "", right: "35"},
        ],
        bottom: "",
      },

      conditions: [
        ["5\\left(y-3\\right)=35"],
        ["10"],
        ["10"],
        ["\\left(\\right)-3"],
        ["y-3"],
        ["7"],
        ["\\frac{\\left(\\right)}{5}", "\\left(\\right)/5"],
        ["5\\left(y-3\\right)"],
      ],
      engine: DiagramVertical,
    },

    artifact_4: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "",
        main: [
          {left: "x"},
          {left: "5/()"},
          {left: ""},
          {left: "4+\\left(\\right)"},
          {left: "", right: "8"},
        ],
        bottom: "",
      },

      conditions: [
        ["4+\\left(\\frac{5}{x}\\right)=8", "4+\\left(5/x\\right)=8"],
        ["20"],
        ["20"],
        ["5\\cdot\\left(\\right)"],
        ["5/x", "\\frac{5}{x}"],
        ["4"],
        ["\\left(\\right)-4"],
        ["4+\\left(\\frac{5}{x}\\right)", "4+\\left(5/x\\right)"],
      ],
      engine: DiagramVertical,
    },
    artifact_5: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "",
        main: [
          {left: "x"},
          {left: "()+4"},
          {left: ""},
          {left: "2\\cdot()"},
          {left: "", right: "20"},
        ],
        bottom: "",
      },

      conditions: [
        ["2\\left(x+4\\right)=20"],
        ["6"],
        ["6"],
        ["\\left(\\right)-4"],
        ["x+4"],
        ["10"],
        ["\\frac{\\left(\\right)}{2}", "\\left(\\right)/2"],
        ["2\\left(x+4\\right)"],
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
