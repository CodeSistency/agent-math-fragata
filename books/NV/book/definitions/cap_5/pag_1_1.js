const defBoards = {
  board_1: {
    artifact: "artifact_1",

    points: [
      {
        inputs: {
          y: -1.5,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },

      {},
      {},
      {},
      {},

      {text: {value: "0", position: [-1.23, -1]}},
      {text: {value: "1", position: [1.23, -1]}},

      {},
      {},
      {},
      {},
      {},
    ],

    type: 7,
  },
  board_2: {
    artifact: "artifact_2",

    points: [
      {},

      {
        inputs: {
          y: -1.5,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {},

      {text: {value: "0", position: [-6.14, -1]}},
      {text: {value: "1", position: [-3.68, -1]}},

      {},
      {},
      {},
      {},

      {
        inputs: {
          y: -1.5,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {},
      {},
    ],

    type: 7,
  },
  board_3: {
    artifact: "artifact_3",

    points: [
      {},

      {},
      {},

      {
        inputs: {
          y: -1.5,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {},

      {},
      {text: {value: "0", position: [1.23, -1]}},
      {text: {value: "1", position: [3.68, -1]}},
      {},

      {},
      {
        inputs: {
          y: -1.5,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {},
    ],

    type: 7,
  },
  board_4: {
    artifact: "artifact_4",

    points: [
      {},
      {},

      {inputs: {value: "-7", style: {disabled: true, styleMain: "circle-min"}}},
      {inputs: {style: {styleMain: "circle-min"}}},
      {inputs: {style: {styleMain: "circle-min"}}},
      {inputs: {style: {styleMain: "circle-min"}}},
      {inputs: {style: {styleMain: "circle-min"}}},

      {},
      {},
    ],

    points_arches: [{arche: [2, 6, true, false, {heigth: 1}]}],
    type: 7,
  },
  board_5: {
    artifact: "artifact_5",

    points: [
      {},
      {},

      {inputs: {style: {styleMain: "circle-min"}}},
      {inputs: {style: {styleMain: "circle-min"}}},
      {
        inputs: {
          value: "-11",
          style: {disabled: true, styleMain: "circle-min"},
        },
      },
      {inputs: {style: {styleMain: "circle-min"}}},
      {inputs: {style: {styleMain: "circle-min"}}},

      {},
      {},
    ],

    points_arches: [{arche: [2, 6, true, false, {heigth: 1}]}],
    type: 7,
  },
  board_6: {
    artifact: "artifact_6",

    points: [
      {},
      {},

      {inputs: {style: {styleMain: "circle-min"}}},
      {inputs: {style: {styleMain: "circle-min"}}},
      {inputs: {style: {styleMain: "circle-min"}}},
      {inputs: {value: "2", style: {disabled: true, styleMain: "circle-min"}}},
      {inputs: {style: {styleMain: "circle-min"}}},

      {},
      {},
    ],

    points_arches: [{arche: [2, 6, true, false, {heigth: 1}]}],
    type: 7,
  },
  board_7: {
    artifact: "artifact_7",

    points: [
      {},
      {},

      {inputs: {style: {styleMain: "circle-min"}}},
      {inputs: {style: {styleMain: "circle-min"}}},
      {inputs: {style: {styleMain: "circle-min"}}},
      {inputs: {style: {styleMain: "circle-min"}}},
      {inputs: {value: "2", style: {disabled: true, styleMain: "circle-min"}}},

      {},
      {},
    ],

    points_arches: [{arche: [2, 6, true, false, {heigth: 1}]}],
    type: 7,
  },
};

const def = {
  scrollNav: true,

  artifacts: {
    artifact_1: {
      description: "Sitúe el número -5 debajo del correspondiente punto.",
      border: true,
      board: "board_1",
      downPoint: {activeInput: [0]},
      conditions: [["-5"]],
      engine: EngineEscalas,
    },
    artifact_2: {
      description:
        "Situar los números 6 y -2 debajo de los puntos correspondientes.",
      board: "board_2",
      downPoint: {activeInput: [1, 9]},
      conditions: [["-2"], ["6"]],
      engine: EngineEscalas,
    },
    artifact_3: {
      description:
        "Situar los números -3 y 4 debajo de los puntos correspondientes.",
      board: "board_3",
      downPoint: {activeInput: [3, 10]},
      conditions: [["-3"], ["4"]],
      engine: EngineEscalas,
    },
    artifact_4: {
      border: true,
      board: "board_4",
      conditions: [["-6"], ["-5"], ["-4"], ["-3"]],
      engine: EngineEscalas,
    },
    artifact_5: {
      board: "board_5",
      conditions: [["-13"], ["-12"], ["-10"], ["-9"]],
      engine: EngineEscalas,
    },
    artifact_6: {
      board: "board_6",
      conditions: [["-1"], ["0"], ["1"], ["3"]],
      engine: EngineEscalas,
    },
    artifact_7: {
      board: "board_7",
      conditions: [["-2"], ["-1"], ["0"], ["1"]],
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
