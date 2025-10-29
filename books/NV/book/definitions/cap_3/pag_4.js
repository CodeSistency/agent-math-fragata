const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      border: true,
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "x"}, // Parte central
          {left: "a \\cdot ( )"}, // Parte superior
          {left: ""}, // Parte inferior
        ],
      },
      conditions: [
        ["a\\cdot x", "ax"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },

    artifact_2: {
      border: true,
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "y"}, // Parte central
          {left: "a - ( )"}, // Parte superior
          {left: ""}, // Parte inferior
        ],
      },
      conditions: [
        ["a-y"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },

    artifact_3: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "y"}, // Parte central
          {left: "\\frac{( )}{b}"}, // Parte superior
          {left: ""}, // Parte inferior
        ],
      },
      conditions: [
        ["\\frac{y}{b}"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },

    artifact_4: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "x"}, // Parte central
          {left: "b \\cdot ( )"}, // Parte superior
          {left: ""}, // Parte inferior
        ],
      },
      conditions: [
        ["b\\cdot x", "bx"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },
    artifact_5: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "y"}, // Parte central
          {left: "b \\cdot ( )"}, // Parte superior
          {left: ""}, // Parte inferior
        ],
      },
      conditions: [
        ["b\\cdot y", "by"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },

    artifact_6: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "z"}, // Parte central
          {left: "\\frac{( )}{b}"}, // Parte superior
          {left: ""}, // Parte inferior
        ],
      },
      conditions: [
        ["\\frac{z}{b}"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },

    artifact_7: {
      border: true,
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "x"}, // Parte central
          {left: ""}, // Parte superior
          {left: "x + b"}, // Parte inferior
        ],
      },
      conditions: [
        ["\\left(\\right)+b"], // Respuesta posible en LaTeX
      ],
      engine: DiagramVertical,
    },

    artifact_8: {
      parent: "containerBasePage",
      visual: "left",
      inputs: {
        main: [
          {left: "y"}, // Parte central
          {left: ""}, // Parte superior
          {left: "\\frac{y}{c}"}, // Parte inferior
        ],
      },
      conditions: [
        ["\\frac{\\left(\\right)}{c}"], // Respuesta posible en LaTeX
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
