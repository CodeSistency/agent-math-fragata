const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "z"}, // Parte central
          {left: ""}, // Parte superior
          {left: "d+z"}, // Parte inferior
        ],
      },
      conditions: [
        ["d+\\left(\\right)"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },

    artifact_2: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "x"}, // Parte central
          {left: ""}, // Parte superior
          {left: "x-b"}, // Parte inferior
        ],
      },
      conditions: [
        ["\\left(\\right)-b"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },

    artifact_3: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "x"}, // Parte central
          {left: ""}, // Parte superior
          {left: "\\frac{a}{x}"}, // Parte inferior
        ],
      },
      conditions: [
        ["\\frac{a}{\\left(\\right)}"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },

    artifact_4: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "d"}, // Parte central
          {left: ""}, // Parte superior
          {left: "d \\cdot b"}, // Parte inferior
        ],
      },
      conditions: [
        ["\\left(\\right)\\cdot b"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },

    artifact_5: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "x"}, // Parte central
          {left: "k - ( )"}, // Parte superior
          {left: ""}, // Parte inferior
        ],
      },
      conditions: [
        ["k-x"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },

    artifact_6: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "y"}, // Parte central
          {left: "\\frac{( )}{h}"}, // Parte superior
          {left: ""}, // Parte inferior
        ],
      },
      conditions: [
        ["\\frac{y}{h}"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },

    artifact_7: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "x"}, // Parte central
          {left: ""}, // Parte superior
          {left: "b-x"}, // Parte inferior
        ],
      },
      conditions: [
        ["b-\\left(\\right)"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },

    artifact_8: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "c"}, // Parte central
          {left: ""}, // Parte superior
          {left: "\\frac{c}{a}"}, // Parte inferior
        ],
      },
      conditions: [
        ["\\frac{\\left(\\right)}{a}"], // Respuesta posible en LaTeX
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
