const defBoards = {
  board_1: {
    artifact: "artifact_1",
    points: [
      {},
      {},
      {},
      {text: {value: "0"}},
      {text: {value: "a"}},
      {},
      {},
      {text: {value: "20"}},
    ],
    type: 2,
  },
  board_2: {
    artifact: "artifact_1",
    points: [
      {},
      {text: {value: "c"}},
      {text: {value: "0"}},
      {},
      {},
      {text: {value: "30"}},
      {},
      {},
    ],
    type: 2,
  },
  board_3: {
    artifact: "artifact_3",
    points: [
      {},
      {text: {value: "c"}},
      {text: {value: "0"}},
      {},
      {},
      {},
      {text: {value: "20"}},
      {},
    ],
    type: 2,
  },
  board_4: {
    artifact: "artifact_4",
    points: [
      {},
      {},
      {text: {value: "-60"}},
      {text: {value: "0"}},
      {},
      {},
      {},
      {text: {value: "a"}},
    ],
    type: 2,
  },
  board_5: {
    artifact: "artifact_4",
    points: [
      {},
      {text: {value: "-60"}},
      {},
      {text: {value: "0"}},
      {text: {value: "a"}},
      {},
      {},
      {},
    ],
    type: 2,
  },
};

const def = {
  scrollNav: {
    lexico:
      "De acuerdo con la escala y la posición de la letra, descubra su valor.",
  },
  artifacts: {
    artifact_1: {
      board: "board_1",
      inputs: [
        {
          tag: "form",
          style: {form: "formRow NormalizeFontsEscalas p-10"},
          value: "a=",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["5"]],
      engine: EngineEscalas,
    },
    artifact_2: {
      board: "board_2",
      inputs: [
        {
          tag: "form",
          style: {form: "formRow NormalizeFontsEscalas p-10"},
          value: "c=",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["-10"]],
      engine: EngineEscalas,
    },
    artifact_3: {
      board: "board_3",
      inputs: [
        {
          tag: "form",
          style: {form: "formRow NormalizeFontsEscalas p-10"},
          value: "c=",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["-5"]],
      engine: EngineEscalas,
    },
    artifact_4: {
      board: "board_4",
      inputs: [
        {
          tag: "form",
          style: {form: "formRow NormalizeFontsEscalas p-10"},
          value: "a=",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["240"]],
      engine: EngineEscalas,
    },
    artifact_5: {
      board: "board_5",
      inputs: [
        {
          tag: "form",
          style: {form: "formRow NormalizeFontsEscalas p-10"},
          value: "a=",
          inputs: [{style: "inputFormEscalas"}],
        },
      ],
      conditions: [["30"]],
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
