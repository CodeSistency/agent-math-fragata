const defBoards = {
  //modelo 1
  board_1: {
    artifact: "artifact_1",
    points: [
      {
        text: {value: "0"},
      },
      {
        text: {value: "c"},
      },
      {},
      {},
      {
        text: {value: "8"},
      },
      {},
    ],
    type: 2,
  },
  board_2: {
    artifact: "artifact_2",
    points: [
      {
        text: {value: "0"},
      },
      {
        text: {value: "c"},
      },
      {},
      {
        text: {value: "12"},
      },
      {},
      {},
    ],
    type: 2,
  },
  board_3: {
    artifact: "artifact_3",
    points: [
      {
        text: {value: "0"},
      },
      {
        text: {value: "b"},
      },
      {},
      {},
      {text: {value: "a"}},
      {},
    ],
    type: 2,
  },
  board_4: {
    artifact: "artifact_4",
    points: [
      {
        text: {value: "0"},
      },
      {
        text: {value: "b"},
      },
      {},
      {},
      {text: {value: "a"}},
      {},
    ],
    type: 2,
  },
  board_5: {
    artifact: "artifact_5",
    points: [
      {
        text: {value: "0"},
      },
      {
        text: {value: "b"},
      },
      {},
      {},
      {text: {value: "a"}},
      {},
    ],
    type: 2,
  },
  board_6: {
    artifact: "artifact_6",
    points: [
      {
        text: {value: "0"},
      },
      {
        text: {value: "b"},
      },
      {},
      {},
      {text: {value: "a"}},
      {},
    ],
    type: 2,
  },
};

const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      board: "board_1",
      inputs: [
        {
          tag: "form",
          style: {
            form: "formInputBig",
          },
          value: "c=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["2"]],
      engine: EngineEscalas,
    },

    artifact_2: {
      board: "board_2",
      inputs: [
        {
          tag: "form",
          style: {
            form: "formInputBig",
          },
          value: "c=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["4"]],
      engine: EngineEscalas,
    },
    artifact_3: {
      border: true,
      board: "board_3",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "b=4"},
        {
          tag: "form",
          style: {
            form: "formInputDoble",
          },
          value: "a=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["16"]],
      engine: EngineEscalas,
    },
    artifact_4: {
      border: true,
      board: "board_4",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "a=4"},
        {
          tag: "form",
          style: {
            form: "formInputDoble",
          },
          value: "b=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["1"]],
      engine: EngineEscalas,
    },
    artifact_5: {
      board: "board_5",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "b=5"},
        {
          tag: "form",
          style: {
            form: "formInputDoble",
          },
          value: "a=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["20"]],
      engine: EngineEscalas,
    },
    artifact_6: {
      board: "board_6",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "a=4"},
        {
          tag: "form",
          style: {
            form: "formInputDoble",
          },
          value: "b=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["1"]],
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
