const defBoards = {
  //modelo 1
  board_1: {
    artifact: "artifact_1",
    // classBoard:"BoardContent2",
    points: [{text: {value: "a"}}, {visible: false}, {text: {value: "b"}}],
    type: 6,
  },
  board_2: {
    artifact: "artifact_2",
    // classBoard:"BoardContent2",
    points: [{text: {value: "a"}}, {visible: false}, {text: {value: "b"}}],
    type: 6,
  },
  board_3: {
    artifact: "artifact_3",
    // classBoard:"BoardContent2",
    points: [{text: {value: "a"}}, {visible: false}, {text: {value: "b"}}],
    type: 6,
  },
  board_4: {
    artifact: "artifact_4",
    // classBoard:"BoardContent2",
    points: [{text: {value: "a"}}, {visible: false}, {text: {value: "b"}}],
    type: 6,
  },
  board_5: {
    artifact: "artifact_5",
    // classBoard:"BoardContent2",
    points: [{text: {value: "a"}}, {visible: false}, {text: {value: "b"}}],
    type: 6,
  },
};

const def = {
  scrollNav: {
    lexico: "Puede ayudarse con el dibujo.",
  },
  artifacts: {
    artifact_1: {
      board: "board_1",
      inputs: [
        {
          tag: "form",
          value:
            "¿Se sabe que los extremos de un segmento están en las posiciones  12 y 3 ¿Cuál es la longitud del segmento?",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["9"]],
      engine: EngineEscalas,
    },
    artifact_2: {
      board: "board_2",
      inputs: [
        {
          tag: "form",
          value:
            "La longitud de un segmento es siete y su extremo superior es 15 ¿Cuál es la posición de su extremo inferior ?",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["8"]],
      engine: EngineEscalas,
    },
    artifact_3: {
      board: "board_3",
      inputs: [
        {
          tag: "form",
          value:
            "¿Cuál es la posición del extremo superior de un segmento que comienza en 12 y tiene longitud 16 ?",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["28"]],
      engine: EngineEscalas,
    },

    artifact_4: {
      board: "board_4",
      inputs: [
        {
          tag: "form",
          value:
            "Se sabe que los extremos de un segmento están en las posiciones  31 y 12 ¿Cuál es la posición del extremo inferior?",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["12"]],
      engine: EngineEscalas,
    },
    artifact_5: {
      board: "board_5",
      helpArtifact: {
        message:
          "No es solo un número, es una expresión  que involucra operaciones matemáticas. Ejemplo (g-34)",
      },
      inputs: [
        {
          tag: "form",
          value:
            "El extremo inferior de un segmento es W y su extremo superior es de 15 ¿Cuál es su longitud? ",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["15-w"]],
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

const contentMain = new CreateView(def, defBoards);
