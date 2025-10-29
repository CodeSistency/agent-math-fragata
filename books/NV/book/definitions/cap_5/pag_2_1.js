const defBoards = {
  board_1: {
    artifact: "artifact_1",

    points: [
      {},
      {},
      {
        inputs: {
          y: -0.5,
          value: "-7",
          style: {disabled: true, styleMain: "inputLittle"},
        },
      },
      {
        inputs: {
          y: -0.5,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.5,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {},
      {},
    ],
    points_arches: [{arche: [2, 7, true, false, {heigth: 0.3}]}],

    type: 8,
  },

  board_2: {
    artifact: "artifact_2",

    points: [
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          value: "-11",
          style: {disabled: true, styleMain: "inputLittle"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },

      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
    ],

    points_arches: [
      {arche: [0, 5, true, false, {heigth: 0.3}]},
      {arche: [5, 9, true, false, {heigth: 0.3}]},
    ],

    type: 8,
  },

  board_3: {
    artifact: "artifact_3",

    points: [
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          value: "-1",
          style: {disabled: true, styleMain: "inputLittle"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
      {
        inputs: {
          y: -0.45,
          style: {disabled: true, styleMain: "inputLittle-transparent"},
        },
      },
    ],

    points_arches: [
      {arche: [0, 5, true, false, {heigth: 0.3}]},
      {arche: [5, 8, true, false, {heigth: 0.3}]},
    ],

    type: 8,
  },
};

const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      board: "board_1",
      downPoint: {
        activeInput: [2, 3, 4, 5, 6, 7],
        replaceTouchInput: ["inputLittle-transparent", "inputLittle"],
      },

      conditions: [["-6"], ["-5"], ["-4"], ["-3"], ["-2"], ["5"]],
      engine: EngineEscalas,
    },

    artifact_2: {
      board: "board_2",

      downPoint: {
        activeInput: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        replaceTouchInput: ["inputLittle-transparent", "inputLittle"],
      },

      conditions: [
        ["-16"],
        ["-15"],
        ["-14"],
        ["-13"],
        ["-12"],
        ["-10"],
        ["-9"],
        ["-8"],
        ["-7"],
        ["5"],
        ["4"],
      ],
      engine: EngineEscalas,
    },

    artifact_3: {
      board: "board_3",

      downPoint: {
        activeInput: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        replaceTouchInput: ["inputLittle-transparent", "inputLittle"],
      },

      conditions: [
        ["-6"],
        ["-5"],
        ["-4"],
        ["-3"],
        ["-2"],
        ["0"],
        ["1"],
        ["2"],
        ["5"],
        ["3"],
      ],
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
