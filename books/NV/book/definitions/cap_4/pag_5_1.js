const allDef = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "",
        main: [
          {left: "y"},
          {left: "2\\cdot()"},
          {left: ""},
          {left: "()-31"},
          {left: "", right: "19"},
        ],
        bottom: "",
      },

      conditions: [
        ["2y-31=19"],
        ["25"],
        ["25"],
        ["\\frac{\\left(\\right)}{2}", "\\left(\\right)/2"],
        ["2y"],
        ["50"],
        ["\\left(\\right)+31"],
        ["2y-31"],
      ],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "",
        main: [
          {left: "z"},
          {left: "", right: "()+3"},
          {left: ""},
          {left: "()/5"},
          {left: "", right: "r"},
        ],
        bottom: "",
      },

      conditions: [
        ["\\frac{z-3}{5}=r", "z-3/5=r", "\\left(z-3\\right)/5=r"],
        ["5r+3"],
        ["5r+3"],
        ["\\left(\\right)-3"],
        ["z-3"],
        ["5r"],
        ["5\\cdot\\left(\\right)"],
        ["z-3/5", "\\frac{z-3}{5}", "\\left(z-3\\right)/5"],
      ],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "",
        main: [
          {left: ""},
          {left: "\\frac{()}{5}"},
          {left: ""},
          {left: "", right: "()+3"},
          {left: ""},
        ],
        bottom: "",
      },

      conditions: [
        {equationInput: "inputsValid_0"},
        {dependent_A: {index: "1"}, dependent_B: {partEquation: "0"}},
        {variant: true},
        {dependent_A: {index: "1"}, dependent_B: {partEquation: "0"}},
        ["5\\cdot\\left(\\right)"],
        {dependent_A: {index: "2"}, dependent_B: {value: "/5"}},
        {dependent_A: {index: "9"}, dependent_B: {value: "+3"}},
        ["\\left(\\right)-3"],
        {dependent_A: {index: "5"}, dependent_B: {value: "-3"}},
        {dependent_A: {leftEquation: true}},
      ],
      engine: DiagramVertical,
    },
    artifact_4: {
      border: true,
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "",
        main: [
          {left: ""},
          {left: "", right: "()·5"},
          {left: ""},
          {left: "() - 3"},
          {left: "", right: "1"},
        ],
        bottom: "",
      },

      conditions: [
        {equationInput: "inputsValid_0"},
        {dependent_A: {index: "1"}, dependent_B: {partEquation: "0"}},
        {variant: true},
        {dependent_A: {index: "6"}, dependent_B: {value: "\\cdot5"}},
        ["\\frac{\\left(\\right)}{5}"],
        {dependent_A: {index: "2"}, dependent_B: {value: "/5"}},
        {dependent_A: {value: "1"}, dependent_B: {value: "+3"}},
        ["\\left(\\right)+3","3+\\left(\\right)"],
        {dependent_A: {index:"5"},dependent_B: {value: "-3"}}
       
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
