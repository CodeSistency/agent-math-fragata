const defBoards = {
  //modelo 1
  board_1: {
    artifact: "artifact_1",
    points: [
      {
        text: {value: "0"},
      },
      {},
      {
        text: {value: "a"},
      },
      {
        text: {value: "b"},
      },
      {},
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
      {},
      {},
      {},
      {},
      {
        text: {value: "a"},
      },
      {
        text: {value: "b"},
      },
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
      {},
      {},
      {},
      {
        text: {value: "a"},
      },
      {},
      {
        text: {value: "b"},
      },
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
      {},
      {},
      {},
      {},
      {
        text: {value: "a"},
      },
      {
        text: {value: "b"},
      },
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
      {},
      {},
      {},
      {
        text: {value: "a"},
      },
      {},
      {
        text: {value: "b"},
      },
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
      {},
      {},
      {},
      {
        text: {value: "a"},
      },
      {},
      {
        text: {value: "b"},
      },
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
        {tag: "input", style: "inputPointMedium", value: "a=8"},
        {
          tag: "form",
          style: {
            form: "formInputDoble",
          },
          value: "b=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["12"]],
      engine: EngineEscalas,
    },
    artifact_2: {
      board: "board_2",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "a=5"},
        {
          tag: "form",
          style: {
            form: "formInputDoble",
          },
          value: "b=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["6"]],
      engine: EngineEscalas,
    },
    artifact_3: {
      board: "board_3",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "a=12"},
        {
          tag: "form",
          style: {
            form: "formInputDoble",
          },
          value: "b=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["18"]],
      engine: EngineEscalas,
    },
    artifact_4: {
      board: "board_4",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "a=15"},
        {
          tag: "form",
          style: {
            form: "formInputDoble",
          },
          value: "b=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["18"]],
      engine: EngineEscalas,
    },
    artifact_5: {
      board: "board_5",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "b=12"},
        {
          tag: "form",
          style: {
            form: "formInputDoble",
          },
          value: "a=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["8"]],
      engine: EngineEscalas,
    },
    artifact_6: {
      board: "board_6",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "b=36"},
        {
          tag: "form",
          style: {
            form: "formInputDoble",
          },
          value: "a=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["24"]],
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
