const defBoards = {
  board_1: {
    artifact: "artifact_",
    points: [
      {
        text: {value: "0", position: [-8.5, -3]},
      },
      {
        text: {value: "20", position: [-5, -3]},
      },
      {
        inputs: {
          y: -4,
          style: {
            styleMain: "circulo",
          },
        },
      },
    ],
    type: 1,
    anche: true,
  },
  board_2: {
    artifact: "artifact_2",
    points: [
      {
        text: {value: "0", position: [-8.5, -3]},
      },
      {
        inputs: {
          y: -4,
          style: {
            styleMain: "circulo",
          },
        },
      },
      {
        text: {value: "20", position: [-1.5, -3]},
      },
    ],

    type: 1,
    anche: true,
  },
  board_3: {
    artifact: "artifact_3",
    points: [
      {
        text: {value: "0", position: [-8.5, -3]},
      },
      {
        text: {value: "20", position: [-6.75, -3]},
      },
      {},
      {},
      {
        inputs: {
          y: -4,
          style: {
            styleMain: "circulo",
          },
        },
      },
    ],
    type: 1,
    anche: true,
  },
  board_4: {
    artifact: "artifact_4",
    points: [
      {
        inputs: {
          y: -4,
          style: {
            styleMain: "circulo",
          },
        },
      },

      {
        text: {value: "0", position: [-5, -3]},
      },
      {
        text: {value: "20", position: [-1.5, -3]},
      },
    ],
    type: 1,
    anche: true,
  },
  board_5: {
    artifact: "artifact_5",
    points: [
      {},
      {
        inputs: {
          y: -4,
          style: {
            styleMain: "circulo",
          },
        },
      },
      {},
      {
        text: {value: "0", position: [-3.25, -3]},
      },
      {
        text: {value: "20", position: [-1.5, -3]},
      },
    ],
    type: 1,
  },
};

const def = {
  scrollNav: {
    lexico:
      " <p>Complete colocando un número en el círculo, tomando en cuenta la escala.</p>",
  },
  artifacts: {
    artifact_1: {
      border: true,
      board: "board_1",
      conditions: [[40]],
      engine: EngineEscalas,
    },
    artifact_2: {
      border: true,
      board: "board_2",
      conditions: [[10]],
      engine: EngineEscalas,
    },
    artifact_3: {
      board: "board_3",
      conditions: [[80]],
      engine: EngineEscalas,
    },
    artifact_4: {
      board: "board_4",
      conditions: [[-20]],
      engine: EngineEscalas,
    },
    artifact_5: {
      border: true,
      board: "board_5",
      conditions: [[-40]],
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
