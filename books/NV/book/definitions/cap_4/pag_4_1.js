const allDef = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "2y-7=1",
        main: [{ left: "" }, { left: "" }, { left: "" }, { left: "" }, { left: "" }],
        bottom: "",
      },

      conditions: [
        ["4"],
        ["y"],
        ["4"],
        ["2\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{2}", "\\left(\\right)/2"],
        ["2y"],
        ["8"],
        ["\\left(\\right)-7"],
        ["\\left(\\right)+7"],
        ["2y-7"],
        ["1"],
      ],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "3x+2=5",
        main: [{ left: "" }, { left: "" }, { left: "" }, { left: "" }, { left: "" }],
        bottom: "",
      },

      conditions: [
        ["1"],
        ["x"],
        ["1"],
        ["3\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{3}", "\\left(\\right)/3"],
        ["3x"],
        ["3"],
        ["\\left(\\right)+2"],
        ["\\left(\\right)-2"],
        ["3x+2"],
        ["5"],
      ],
      engine: DiagramVertical,
    },

    artifact_3: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "2(x+4)=20",
        main: [{ left: "" }, { left: "" }, { left: "" }, { left: "" }, { left: "" }],
        bottom: "",
      },

      conditions: [
        ["6"],
        ["x"],
        ["6"],
        ["\\left(\\right)+4"],
        ["\\left(\\right)-4"],
        ["x+4"],
        ["10"],
        ["2\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{2}", "\\left(\\right)/2"],
        ["2\\left(x+4\\right)"],
        ["20"],
      ],
      engine: DiagramVertical,
    },
    artifact_4: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "2x+4=20",
        main: [{ left: "" }, { left: "" }, { left: "" }, { left: "" }, { left: "" }],
        bottom: "",
      },

      conditions: [
        ["8"],
        ["x"],
        ["8"],
        ["2\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{2}", "\\left(\\right)/2"],
        ["2x"],
        ["16"],
        ["\\left(\\right)+4"],
        ["\\left(\\right)-4"],
        ["2x+4"],
        ["20"],
      ],
      engine: DiagramVertical,
    },
    artifact_5: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "c(y-d)=f",
        main: [{ left: "y" }, { left: "" }, { left: "" }, { left: "" }, { left: "" }],
        bottom: "",
      },

      conditions: [
        ["\\frac{f}{c}+d", "f/c+d"],
        ["\\frac{f}{c}+d", "f/c+d"],
        ["\\left(\\right)-d"],
        ["\\left(\\right)+d"],
        ["y-d"],
        ["\\frac{f}{c}", "f/c"],
        ["c\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{c}", "\\left(\\right)/c"],
        ["c\\left(y-d\\right)"],
        ["f"],
      ],
      engine: DiagramVertical,
    },
    artifact_6: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "cz-d=f",
        main: [{ left: "z" }, { left: "" }, { left: "" }, { left: "" }, { left: "" }],
        bottom: "",
      },

      conditions: [
        ["\\frac{f+d}{c}", "f+d/c"],
        ["\\frac{f+d}{c}", "f+d/c"],
        ["c\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{c}", "\\left(\\right)/c"],
        ["cz"],
        ["f+d"],
        ["\\left(\\right)-d"],
        ["\\left(\\right)+d"],
        ["cz-d"],
        ["f"],
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
