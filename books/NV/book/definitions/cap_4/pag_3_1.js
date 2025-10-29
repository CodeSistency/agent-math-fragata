const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      border: true,
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        top: "3y+2 = 8",
        main: [{}, {}, {}, {}, {}],
        bottom: "",
      },
      conditions: [
        ["2"],
        ["y"],
        ["2"],

        ["3\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{3}", "\\left(\\right)/3"],

        ["3\\cdot y", "3y"],
        ["6"],

        ["\\left(\\right)+2"],
        ["\\left(\\right)-2"],

        ["3\\cdot y+2", "3y+2"],
        ["8"],
      ],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        top: "7x-7 = 7",
        main: [{}, {}, {}, {}, {}],
        bottom: "",
      },
      conditions: [
        ["2"],
        ["x"],
        ["2"],

        ["7\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{7}", "\\left(\\right)/7"],

        ["7\\cdot x", "7x"],
        ["14"],

        ["\\left(\\right)-7"],
        ["\\left(\\right)+7"],

        ["7\\cdot x-7", "7x-7"],
        ["7"],
      ],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        top: "3y+2 = 14",
        main: [{}, {}, {}, {}, {}],
        bottom: "",
      },
      conditions: [
        ["4"],
        ["y"],
        ["4"],

        ["3\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{3}", "\\left(\\right)/3"],

        ["3\\cdot y", "3y"],
        ["12"],

        ["\\left(\\right)+2"],
        ["\\left(\\right)-2"],

        ["3\\cdot y+2", "3y+2"],
        ["14"],
      ],
      engine: DiagramVertical,
    },
    artifact_4: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        top: "7x-7 = 21",
        main: [{}, {}, {}, {}, {}],
        bottom: "",
      },
      conditions: [
        ["4"],
        ["x"],
        ["4"],

        ["7\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{7}", "\\left(\\right)/7"],

        ["7\\cdot x", "7x"],
        ["28"],

        ["\\left(\\right)-7"],
        ["\\left(\\right)+7"],

        ["7\\cdot x-7", "7x-7"],
        ["21"],
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
