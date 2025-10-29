const defBoards = {
  board_1: {
    artifact: "artifact_1",
    points: [
      {},
      {},
      {},
      {text: {value: "6", position: "default"}},
      {text: {value: "8", position: "default"}},
      {},
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
      {},
      {},
    ],
    type: 1,
  },
  board_2: {
    artifact: "artifact_2",
    points: [
      {
        text: {value: "0", position: "default"},
      },
      {
        text: {value: "50", position: "default"},
      },
      {
        inputs: {
          x: -1.45,
          y: -4.4,
          style: {
            styleMain: "circulo",
          },
        },
      },
    ],
    type: 1,
    anche: true,
  },
  board_3: {
    artifact: "artifact_3",
    points: [
      {
        text: {value: "0", position: "default"},
      },
      {},
      {
        text: {value: "50", position: "default"},
        inputs: {
          x: -4.98,
          y: -4.4,
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
      {},
      {},
      {},
      {text: {value: "10", position: "default"}},
      {text: {value: "15", position: "default"}},
      {},
      {
        inputs: {
          x: -2.88,
          y: -4.4,
          style: {
            styleMain: "circulo",
          },
        },
      },
      {},
      {},
      {},
      {},
    ],
    type: 1,
  },
  board_5: {
    artifact: "artifact_5",
    points: [
      {},
      {},
      {},
      {text: {value: "6", position: "default"}},
      {},
      {text: {value: "12", position: "default"}},
      {
        inputs: {
          x: -2.88,
          y: -4.4,
          style: {
            styleMain: "circulo",
          },
        },
      },
      {},
      {},
      {},
      {},
    ],
    type: 1,
  },
  board_6: {
    artifact: "artifact_6",
    points: [
      {},
      {text: {value: "0", position: "default"}},
      {},
      {},
      {},
      {text: {value: "12", position: "default"}},
      {
        inputs: {
          x: -3.58,
          y: -4,
          style: {
            styleMain: "circulo",
          },
        },
      },
      {},
      {},
      {},
      {
        inputs: {
          x: -1.48,
          y: -4,
          style: {
            styleMain: "circulo",
          },
        },
      },
    ],
    type: 1,
  },
};

const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      board: "board_1",
      conditions: [[16]],
      engine: EngineEscalas,
    },
    artifact_2: {
      board: "board_2",
      conditions: [[100]],
      engine: EngineEscalas,
    },
    artifact_3: {
      board: "board_3",
      conditions: [[25]],
      engine: EngineEscalas,
    },
    artifact_4: {
      board: "board_4",
      conditions: [[35]],
      engine: EngineEscalas,
    },
    artifact_5: {
      board: "board_5",
      conditions: [[21]],
      engine: EngineEscalas,
    },
    artifact_6: {
      board: "board_6",
      conditions: [[18], [27]],
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
