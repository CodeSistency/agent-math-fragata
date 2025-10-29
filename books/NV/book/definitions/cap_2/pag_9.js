const defBoards = {
  board_1: {
    artifact: "artifact_1",
    classBoard: "BoardContent2",
    points: [{text: {value: "a"}}, {visible: false}, {text: {value: "b"}}],
    type: 6,
  },
  board_2: {
    artifact: "artifact_2",
    classBoard: "BoardContent2",
    points: [{text: {value: "a"}}, {visible: false}, {text: {value: "b"}}],
    type: 6,
  },
  board_3: {
    artifact: "artifact_3",
    classBoard: "BoardContent2",
    points: [{text: {value: "a"}}, {visible: false}, {text: {value: "b"}}],
    type: 6,
  },
  board_4: {
    artifact: "artifact_4",
    classBoard: "BoardContent2",
    points: [{text: {value: "a"}}, {visible: false}, {text: {value: "b"}}],
    type: 6,
  },
  board_5: {
    artifact: "artifact_5",
    classBoard: "BoardContent2",
    points: [{text: {value: "a"}}, {visible: false}, {text: {value: "b"}}],
    type: 6,
  },
  board_6: {
    artifact: "artifact_6",
    classBoard: "BoardContent2",
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
            "¿Cuál es la posición del extremo superior (derecho) de un segmento que comienza en 3 y tiene longitud 7 ?",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["10"]],
      engine: EngineEscalas,
    },
    artifact_2: {
      board: "board_2",
      inputs: [
        {
          tag: "form",
          value:
            "¿Cuál es la longitud del segmento cuyo extremo superior está en 1007 y cuyo extremo inferior (izquierdo) está en 7 ?",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["1000"]],
      engine: EngineEscalas,
    },
    artifact_3: {
      board: "board_3",
      helpArtifact: {
        message:
          "No es solo un número, es una expresión  que involucra operaciones matemáticas. Ejemplo: (b-1)",
      },
      inputs: [
        {
          tag: "form",
          value:
            "¿Cuál es la longitud del segmento cuyo extremo superior está en P y cuyo extremo inferior  está en 7 ?",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["p-7"]],

      engine: EngineEscalas,
    },

    artifact_4: {
      board: "board_4",
      inputs: [
        {
          tag: "form",
          value:
            "¿Cuál es la posición del extremo superior de un segmento que comienza en 5 y tiene longitud 6 ?",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["11"]],
      engine: EngineEscalas,
    },
    artifact_5: {
      board: "board_5",
      inputs: [
        {
          tag: "form",
          value:
            "La longitud de un segmento es cinco y su extremo superior es de 15 ¿Cuál es la posición de su extremo inferior ?",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["10"]],
      engine: EngineEscalas,
    },
    artifact_6: {
      board: "board_6",
      inputs: [
        {
          tag: "form",
          value:
            "Se sabe que los extremos de un segmento están en las posiciones  12 y 3 ¿Cuál es la posición del extremo inferior?",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["3"]],
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
