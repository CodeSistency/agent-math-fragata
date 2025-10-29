const defBoards = {
  board_1: {
    artifact: "artifact_1",
    boundingbox: [-15, 2, 15, -4],
    spaceExtreme: 2.5,
    points: [
      {
        inputs: {
          style: {
            styleMain: "circulo",
          },
        },
      },
      {},
      {},
      {},
      {},
      {},
      {
        text: {value: "3", position: [2.7, -1.5]},
      },
      {
        text: {value: "5", position: [5.4, -1.5]},
      },
      {},
      {},
      {},
    ],
    type: 7,
  },
  board_2: {
    artifact: "artifact_2",
    boundingbox: [-15, 2, 15, -4],
    spaceExtreme: 2.5,
    points: [
      {
        inputs: {
          style: {
            styleMain: "circulo",
          },
        },
      },
      {},
      {},
      {},
      {},
      {},
      {
        text: {value: "-4", position: [2.7, -1.5]},
      },
      {
        text: {value: "-3", position: [5.4, -1.5]},
      },
      {},
      {},
      {},
    ],
    type: 7,
  },
  board_3: {
    artifact: "artifact_3",
    boundingbox: [-15, 2, 15, -4],
    points: [
      {},
      {},
      {
        inputs: {
          style: {
            styleMain: "circulo",
          },
        },
      },
      {},
      {},
      {},
      {},
      {
        text: {value: "3", position: [5.4, -1.5]},
      },
      {
        text: {value: "6", position: [8.1, -1.5]},
      },
      {},
      {},
    ],
    type: 7,
  },
  board_4: {
    artifact: "artifact_4",
    boundingbox: [-15, 2, 15, -4],
    points: [
      {},
      {},
      {
        inputs: {
          style: {
            styleMain: "circulo",
          },
        },
      },
      {},
      {},
      {},
      {},
      {
        text: {value: "-4", position: [5.4, -1.5]},
      },
      {
        text: {value: "-2", position: [8.1, -1.5]},
      },
      {},
      {},
    ],
    type: 7,
  },
  board_5: {
    artifact: "artifact_5",
    spaceExtreme: 2.5,
    boundingbox: [-15, 2, 15, -4],
    points: [
      {
        inputs: {
          style: {
            styleMain: "circulo",
          },
        },
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {
        text: {value: "5", position: [0, -1.5]},
      },
      {
        text: {value: "2", position: [-2.7, -1.5]},
      },
      {},
      {},
    ],
    type: 7,
  },
  board_6: {
    artifact: "artifact_6",
    boundingbox: [-15, 2, 15, -4],
    points: [
      {},
      {},
      {},
      {},
      {},
      {},
      {
        text: {value: "-6", position: [-10.8, -1.5]},
      },
      {
        inputs: {
          style: {
            styleMain: "circulo",
          },
        },
      },
      {
        text: {value: "-3", position: [-8.1, -1.5]},
      },
      {},
      {},
    ],
    type: 7,
  },
  board_7: {
    artifact: "artifact_7",
    boundingbox: [-15, 2, 15, -4],
    points: [
      {},
      {},
      {},
      {},
      {},
      {},
      {
        text: {value: "-3", position: [-2.7, -1.5]},
      },
      {
        text: {value: "3", position: [-0, -1.5]},
      },
      {},
      {
        inputs: {
          style: {
            styleMain: "circulo",
          },
        },
      },
      {},
    ],
    type: 7,
  },
};

const def = {
  scrollNav: {
    lexico: "Descubra que número va en el círculo",
  },
  artifacts: {
    artifact_1: {
      border: true,
      board: "board_1",
      engine: EngineEscalas,
      conditions: [["-9"]],
    },
    artifact_2: {
      border: true,
      board: "board_2",
      engine: EngineEscalas,
      conditions: [["-10"]],
    },
    artifact_3: {
      board: "board_3",
      engine: EngineEscalas,
      conditions: [["-12"]],
    },
    artifact_4: {
      board: "board_4",
      engine: EngineEscalas,
      conditions: [["-14"]],
    },
    artifact_5: {
      board: "board_5",
      engine: EngineEscalas,
      conditions: [["-10"]],
    },
    artifact_6: {
      board: "board_6",
      engine: EngineEscalas,
      conditions: [["12"]],
    },
    artifact_7: {
      board: "board_7",
      engine: EngineEscalas,
      conditions: [["15"]],
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
