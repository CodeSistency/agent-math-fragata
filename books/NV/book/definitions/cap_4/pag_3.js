
const def = {
  scrollNav: true,
  artifacts: {
    example_1: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        top: "\\text{ECUACIÓN}",
        main: [
          {left: "\\text{Incógnita}", right: "\\text{Solución} "}, // Cada objeto representa una fila con dos valores
          {
            left: "\\text{Operación}",
            right:
              "\\begin{center} \\begin{array}{c} \\text{Operación} \\\\ \\text{Inversa} \\end{array} \\end{center}",
          },
          {left: "\\text{Fórmula}", right: "\\text{Número}"},
        ],

        bottom: "\\text{SOLUCIÓN}",
      },

      engine: DiagramVertical,
    },
    example_2: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        top: "2x = 6",
        main: [
          {left: "x", right: "3"}, // Cada objeto representa una fila con dos valores
          {left: "2\\cdot\\left(\\right)", right: "\\left(\\right)/2"},
          {left: "2\\cdot\\ x", right: "6"},
        ],

        bottom: "3",
      },

      engine: DiagramVertical,
    },

    lexico_1: {
      nodo: [
        {
          texto: "Ecuación",
          etiqueta: "h2",
        },
        {
          texto:
            "Una expresión donde una fórmula igualada a un número. Ejemplo: <b>2x-3 = 5.</b>",
          etiqueta: "p",
          atributos: {style: "text-align:justify"},
        },
      ],

      engine: EngineOwner,
      styleContainer: "note",
    },
    lexico_2: {
      nodo: [
        {
          texto: "Incógnita",
          etiqueta: "h2",
        },
        {
          texto:
            "La letra de la fórmula de la ecuación. Ejemplo: en la ecuación <b>2x-3 = 5</b> la incógnita es x.",
          etiqueta: "p",
          atributos: {style: "text-align:justify"},
        },
      ],

      engine: EngineOwner,
      styleContainer: "note",
    },
    lexico_3: {
      nodo: [
        {
          texto: "Solución de la ecuación",
          etiqueta: "h2",
        },
        {
          texto:
            "La fórmula evaluada en la solución debe dar el número que está del otro lado de la igualdad. Ejemplo: si en la ecuación <b>2x-3 = 5</b>, se evalúa <b>2x-3</b> en el valor <b>x = 6</b>, se obtiene que <b>2·6-3 = 9</b>, pero 9 no es igual que el número que está a la derecha del símbolo <b>=</b> de la ecuación (que es el 5). Por lo tanto, 6 <b>no es</b> solución de la ecuación <b>2x-3 = 5.</b> En cambio, si se evalúa <b>2x-3</b> en el número 4, se obtiene <b>2·4-3 = 8-3 = 5.</b> Y este número es igual al que está del otro lado de la igualdad de la ecuación. Por lo tanto, <b>sí es</b> solución de la ecuación <b>2x-3 = 5.</b>",
          etiqueta: "p",
          atributos: {style: "text-align:justify"},
        },
      ],

      engine: EngineOwner,
      styleContainer: "note",
    },

    artifact_1: {
      border: true,
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        top: "3x = 18",
        main: [{}, {}, {}],
        bottom: "",
      },
      conditions: [
        ["6"],
        ["x"],
        ["6"],

        ["3\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{3}", "\\left(\\right)/3"],

        ["3\\cdot x", "3x"],
        ["18"],
      ],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        top: "x+4 = 5",
        main: [{}, {}, {}],
        bottom: "",
      },
      conditions: [
        ["1"],
        ["x"],
        ["1"],

        ["\\left(\\right)+4"],
        ["\\left(\\right)-4"],

        ["x+4"],
        ["5"],
      ],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        top: "4x = 12",
        main: [{}, {}, {}],
        bottom: "",
      },
      conditions: [
        ["3"],
        ["x"],
        ["3"],

        ["4\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{4}", "\\left(\\right)/4"],

        ["4\\cdot x", "4x"],
        ["12"],
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