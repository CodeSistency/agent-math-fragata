const textUtils = {
  artifacts: {
    lexico_1: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "\\text{Pantalla}"}, // Cada objeto representa una fila con dos valores
          {left: "\\text{Tecla}"},
          {left: "\\text{Pantalla}"},
        ],
      },
      engine: DiagramVertical,
    },
    lexico_2: {
      secondaryClass:"largeInputVertical",
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "\\begin{center} \\begin{array}{c} \\text{Número,} \\\\ \\text{Variable}  \\\\ \\text{o Fórmula}  \\end{array} \\end{center} "}, // Cada objeto representa una fila con dos valores
          {left: "\\text{Operación}"},
          {left: "\\begin{center} \\begin{array}{c} \\text{Número,} \\\\ \\text{Variable}  \\\\ \\text{o Fórmula}  \\end{array} \\end{center} "},
        ],
      },
      engine: DiagramVertical,
    },
    lexico_3: {
      nodo: [
        {
          texto: "Restricción",
          etiqueta: "h1",
        },
        {
          texto:
            "En las teclas, dentro de los paréntesis de las operaciones, no deben ponerse letras que jueguen el papel de variables. Dichas letras solo pueden estar en las pantallas. En las teclas se ponen las operaciones.",
          atributos: {style: "text-align:justify"},
        },
        {
          texto:
            'Dos paréntesis ( ) se leerán "algo". La expresión ( ) + 3 se lee "algo más tres". ( ) + 3 es una operación. x + 3 es una fórmula. Una operación no es una fórmula.',
          atributos: {style: "text-align:justify"},
        },
        {
          texto: "Incorrecto",
          etiqueta: "h2",
        },
      ],

      styleContainer: "note",
      engine: EngineOwner,
    },
    lexico_4: {
      nodo: [
        {
          texto:
            'Dos paréntesis ( ) se leerán "algo". La expresión ( ) + 3 se lee "algo más tres". ( ) + 3 es una operación. x + 3 es una fórmula. Una operación no es una fórmula.',
          atributos: {style: "text-align:justify"},
        },
        {
          texto: "Correcto",
          etiqueta: "h2",
        },
      ],

      styleContainer: "note",
      engine: EngineOwner,
    },
  },
};

const allDef = {
  scrollNav: {
    tittle: "Diagrama Funcional",
  },
  artifacts: {
    example_1: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "4"}, // Cada objeto representa una fila con dos valores
          {left: "() + 2"},
          {left: "6"},
        ],
      },
      engine: DiagramVertical,
    },
    example_2: {
      border: true,
      prueba_t: true,
      parent: "lexico_3",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "x"}, // Cada objeto representa una fila con dos valores
          {left: "(x) + 3"},
          {left: "x + 3"},
        ],
      },
      engine: DiagramVertical,
    },
    example_3: {
      border: true,
      prueba_t: true,
      parent: "lexico_4",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "x"}, // Cada objeto representa una fila con dos valores
          {left: "() + 3"},
          {left: "x + 3"},
        ],
      },
      engine: DiagramVertical,
    },
    artifact_1: {
      border: true,
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "4"}, // Cada objeto representa una fila con dos valores
          {left: "() + 3"},
          {left: ""},
        ],
      },
      conditions: [["7"]],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "4"}, // Cada objeto representa una fila con dos valores
          {left: "3 \\cdot ()"},
          {left: ""},
        ],
      },
      conditions: [["12"]],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "6"}, // Cada objeto representa una fila con dos valores
          {left: "3 \\cdot ()"},
          {left: ""},
        ],
      },
      conditions: [["18"]],
      engine: DiagramVertical,
    },
    artifact_4: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "11"}, // Cada objeto representa una fila con dos valores
          {left: "() + 1"},
          {left: ""},
        ],
      },
      conditions: [["12"]],
      engine: DiagramVertical,
    },
    artifact_5: {
      parent: "containerBasePage",
      visual: "left", // o 'left', , 'complete'
      inputs: {
        main: [
          {left: "12"}, // Cada objeto representa una fila con dos valores
          {left: "() - 2"},
          {left: ""},
        ],
      },
      conditions: [["10"]],
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

const contentMain = new CreateView(textUtils);
contentMain.initVIew(allDef);
