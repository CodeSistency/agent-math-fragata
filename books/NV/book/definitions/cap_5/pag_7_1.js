const defBoards = {
  //modelo 1

  board_1: {
    artifact: "artifact_1",
    points: [
      {
        text: {value: "b"},
      },
      {
        text: {value: "0"},
      },
      {},
      {},
      {text: {value: "a"}},
      {},
    ],
    type: 2,
  },
  board_2: {
    artifact: "artifact_2",
    points: [
      {
        text: {value: "b"},
      },
      {
        text: {value: "0"},
      },
      {},
      {text: {value: "a"}},
      {},
    ],
    type: 2,
  },
  board_3: {
    artifact: "artifact_3",
    points: [
      {
        text: {value: "b"},
      },
      {},
      {},
      {
        text: {value: "0"},
      },
      {},
      {text: {value: "a"}},
    ],
    type: 2,
  },
  board_4: {
    artifact: "artifact_4",
    points: [
      {text: {value: "a"}},
      {},
      {text: {value: "0"}},
      {},
      {},
      {},
      {text: {value: "b"}},
    ],
    type: 2,
  },
  board_5: {
    artifact: "artifact_5",
    points: [
      {text: {value: "a"}},
      {},
      {},
      {text: {value: "0"}},
      {},
      {},
      {text: {value: "b"}},
    ],
    type: 2,
  },
};

const def = {
  scrollNav: {
    lexico:
      "<p>De acuerdo a la posición en la recta y al valor numérico que tiene asignado una de las letras, asigne el valor a la otra letra.</p>",
  },
  artifacts: {
    artifact_1: {
      border: true,
      board: "board_1",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "a=9"},
        {
          tag: "form",
          style: {
            form: "formInputDoble",
          },
          value: "b=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["-3"]],
      engine: EngineEscalas,
    },
    artifact_2: {
      border: true,
      board: "board_2",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "b=-4"},
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
    artifact_3: {
      board: "board_3",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "b=-3"},
        {
          tag: "form",
          style: {
            form: "formInputDoble",
          },
          value: "a=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["2"]],
      engine: EngineEscalas,
    },
    artifact_4: {
      board: "board_4",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "a=-4"},
        {
          tag: "form",
          style: {
            form: "formInputDoble",
          },
          value: "b=",
          inputs: [{style: "mathSmall"}],
        },
      ],
      conditions: [["8"]],
      engine: EngineEscalas,
    },
    artifact_5: {
      board: "board_5",
      inputs: [
        {tag: "input", style: "inputPointMedium", value: "a=-18"},
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
