const textUtils = {
  artifacts: {
    lexico_1: {
      parent: "main-content",
      nodo: [
        {texto: "<b>Números positivos y negativos</b>"},
        {
          texto: '<b>Números enteros positivos:</b> "son" los natuales.',
          atributos: {style: "text-align:justify"},
        },
        {
          texto:
            "<b>Números enteros negativos:</b> formados por un natural precedido de un signo menos.",
          atributos: {style: "text-align:justify"},
        },
        {
          texto: "Ejemplo:-5",
          atributos: {style: "text-align:center"},
        },
        {
          texto: 'Ese número se leerá: "cinco negativo" o "menos cinco."',
          atributos: {style: "text-align:center"},
        },
      ],
      styleContainer: "note",
      engine: EngineOwner,
    },

    example_1: {
      parent: "main-content",
      nodo: [{texto: "<b>Recta de los enteros:</b>"}],
      styleContainer: "note",
      engine: EngineOwner,
    },
  },
};

const defBoards = {
  board_0: {
    artifact: "artifact_0",

    points: [
      {
        text: {value: "...Sigue", position: [-6, -1.1]},
        inputs: {
          y: -0.5,
          value: "\\text{-5}",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        text: {value: "Sigue...", position: [6, -1.1]},
        inputs: {
          y: -0.5,
          value: "\\text{-4}",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          value: "\\text{-3}",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          value: "\\text{-2}",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          value: "\\text{-1}",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          value: "\\text{0}",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          value: "\\text{1}",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          value: "\\text{2}",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          value: "\\text{3}",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          value: "\\text{4}",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          value: "\\text{5}",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          value: "\\text{6}",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
    ],

    type: 9,
  },

  board_1: {
    artifact: "artifact_1",

    points: [
      {
        inputs: {
          y: -1.5,
          value: "-5",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-4",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "3",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "3",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-1",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "0",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "1",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "2",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-3",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "4",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "5",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "6",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
    ],

    type: 7,
  },

  board_2: {
    artifact: "artifact_2",

    points: [
      {
        inputs: {
          y: -1.5,
          value: "-5",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-3",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-4",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-2",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-1",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "0",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "1",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "2",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "3",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "4",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "5",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "6",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
    ],

    type: 7,
  },
  board_3: {
    artifact: "artifact_3",

    points: [
      {
        inputs: {
          y: -1.5,
          value: "5",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "4",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "3",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "2",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "1",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "0",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-1",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-2",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-3",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-4",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-5",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-6",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
    ],

    type: 7,
  },
  board_4: {
    artifact: "artifact_4",

    points: [
      {
        inputs: {
          y: -1.5,
          value: "-4",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-5",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "3",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-2",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "1",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "0",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-1",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "2",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "-3",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "4",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "5",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -1.5,
          value: "6",
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
    ],

    type: 7,
  },
};

const def = {
  scrollNav: {
    lexico:
      "Corregir los errores que se han hecho al escribir los números debajo de los puntos.",
    tittle: "Los enteros en la Recta",
  },
  artifacts: {
    artifact_0: {
      prueba_t: true,
      parent: "example_1",
      board: "board_0",
      engine: EngineEscalas,
    },

    artifact_1: {
      border: true,
      board: "board_1",
      enableInput: [2, 3, 8],
      conditions: [["-3"], ["-2"], ["3"]],
      engine: EngineEscalas,
    },
    artifact_2: {
      board: "board_2",
      enableInput: [1, 2],
      conditions: [["-4"], ["-3"]],
      engine: EngineEscalas,
    },
    artifact_3: {
      board: "board_3",
      enableInput: [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11],
      conditions: [
        ["-5"],
        ["-4"],
        ["-3"],
        ["-2"],
        ["-1"],
        ["1"],
        ["2"],
        ["3"],
        ["4"],
        ["5"],
        ["6"],
      ],
      engine: EngineEscalas,
    },
    artifact_4: {
      board: "board_4",
      enableInput: [0, 1, 2, 4, 6, 8],
      conditions: [["-5"], ["-4"], ["-3"], ["-1"], ["1"], ["3"]],
      engine: EngineEscalas,
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

const contentMain = new CreateView(textUtils, defBoards);
contentMain.initVIew(def);
