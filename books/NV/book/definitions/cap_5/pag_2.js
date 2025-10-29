const defBoards = {
  board_1: {
    artifact: "artifact_1",

    points: [
      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},

      {text: {value: "-231", position: [-6.75, -3]}},
      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},
      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},
      {},
    ],

    type: 1,
  },
  board_2: {
    artifact: "artifact_2",

    points: [
      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},

      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},
      {text: {value: "-112", position: [-5, -3]}},
      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},
      {},
    ],

    type: 1,
  },
  board_3: {
    artifact: "artifact_3",

    points: [
      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},

      {text: {value: "112", position: [-6.75, -3]}},
      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},
      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},
      {},
    ],

    type: 1,
  },
  board_4: {
    artifact: "artifact_4",

    points: [
      {},

      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},
      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},
      {text: {value: "-2031", position: [-3.25, -3]}},
      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},
    ],

    type: 1,
  },
  board_5: {
    artifact: "artifact_5",

    points: [
      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},

      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},
      {text: {value: "-2301", position: [-5, -3]}},
      {inputs: {y: -3.5, style: {styleMain: "circulo"}}},
      {},
    ],

    type: 1,
  },
};

const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      border: true,
      board: "board_1",
      conditions: [["-232"], ["-230"], ["-229"]],
      engine: EngineEscalas,
    },

    artifact_2: {
      board: "board_2",
      conditions: [["-114"], ["-113"], ["-111"]],
      engine: EngineEscalas,
    },
    artifact_3: {
      board: "board_3",
      conditions: [["111"], ["113"], ["114"]],
      engine: EngineEscalas,
    },
    artifact_4: {
      board: "board_4",
      conditions: [["-2033"], ["-2032"], ["-2030"]],
      engine: EngineEscalas,
    },
    artifact_5: {
      board: "board_5",
      conditions: [["-2303"], ["-2302"], ["-2300"]],
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
