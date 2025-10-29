const allDef = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      border: true,
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "ay + b = c",
        main: [{ left: "y" }, { left: "" }, { left: "" }, { left: "" }, { left: "" }],
        bottom: "",
      },

      conditions: [
        ["c-b/a", "\\frac{c-b}{a}",],
        ["c-b/a", "\\frac{c-b}{a}"],
        ["a\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{a}", "\\left(\\right)/a"],
        ["ay"],
        ["c-b"],
        ["\\left(\\right)+b"],
        ["\\left(\\right)-b"],
        ["ay+b"],
        ["c"],
      ],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "ay + b = c",
        main: [{ left: "y" }, { left: "" }, { left: "" }, { left: "" }, { left: "" }],
        bottom: "",
      },

      conditions: [
        ["c-b/a", "\\frac{c-b}{a}"],
        ["c-b/a", "\\frac{c-b}{a}"],
        ["a\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{a}", "\\left(\\right)/a"],
        ["ay"],
        ["c-b"],
        ["\\left(\\right)+b"],
        ["\\left(\\right)-b"],
        ["ay+b"],
        ["c"],
      ],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "cy+d=a",
        main: [{ left: "y" }, { left: "" }, { left: "" }, { left: "" }, { left: "" }],
        bottom: "",
      },

      conditions: [
        ["a-d/c", "\\frac{a-d}{c}"],
        ["a-d/c", "\\frac{a-d}{c}"],
        ["c\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{c}", "\\left(\\right)/c"],
        ["cy"],
        ["a-d"],
        ["\\left(\\right)+d"],
        ["\\left(\\right)-d"],
        ["cy+d"],
        ["a"],
      ],
      engine: DiagramVertical,
    },
    artifact_4: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "(x/h)-k=j",
        main: [{ left: "x" }, { left: "" }, { left: "" }, { left: "" }, { left: "" }],
        bottom: "",
      },

      conditions: [
        ['h\\cdot\\left(j+k\\right)'],
        ['h\\cdot\\left(j+k\\right)'],
        ["\\frac{\\left(\\right)}{h}"],
        ['h\\cdot\\left(\\right)'],
        ["\\frac{x}{h}"],
        ["j+k"],
        ["\\left(\\right)-k"],
        ["\\left(\\right)+k"],
        ["\\left(\\frac{x}{h}\\right)-k", "\\left(x/h\\right)-k"],
        ["j"],
      ],
      engine: DiagramVertical,
    },
    artifact_5: {
      parent: "containerBasePage",
      visual: "complete",
      inputs: {
        top: "1+(z/a)=3",
        main: [{ left: "z" }, { left: "" }, { left: "" }, { left: "" }, { left: "" }],
        bottom: "",
      },

      conditions: [
        ["a2"],
        ["a2"],
        ["frac{\\left(\\right)}{a}", "\\left(\\right)/a"],
        ['a\\cdot\\left(\\right)'],//
        ["\\frac{z}{a}", "z/a"],
        ["2"],
        ["1+\\left(\\right)"],
        ["\\left(\\right)-1"],
        ["1+\\left(\\frac{z}{a}\\right)", "1+\\left(z/a\\right)"],
        ["3"],
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
