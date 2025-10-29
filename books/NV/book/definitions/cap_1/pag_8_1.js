const defBoards = {
  board_1: {
    artifact: "artifact_1",
    points: [
      {visible: false},
      {visible: false},
      {visible: false},
      {text: {value: "b"}},
      {text: {value: "a"}},
    ],
    type: 2,
  },
  board_2: {
    artifact: "artifact_2",
    points: [
      {visible: false},
      {visible: false},
      {visible: false},
      {text: {value: "b"}},
      {text: {value: "a"}},
    ],
    type: 2,
  },
  board_3: {
    artifact: "artifact_3",
    points: [
      {visible: false},
      {visible: false},
      {text: {value: "a"}},
      {visible: false},
      {text: {value: "b"}},
    ],
    type: 2,
  },
  board_4: {
    artifact: "artifact_4",
    points: [
      {visible: false},
      {visible: false},
      {text: {value: "a"}},
      {visible: false},
      {text: {value: "b"}},
    ],
    type: 2,
  },
};

const def = {
  scrollNav: {
    lexico:
      "Selecciona los números que podrían ser la letra cuyo valor se desconoce. (Pueden haber varios números, uno solo o inclusive ninguno).",
  },
  artifacts: {
    artifact_1: {
      board: "board_1",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a=8"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          style:{form:"formEcalasCap1"},
          inputs: [
            {style: {input: "inputPointForm"}, value: {label: 160, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: 19, input: ""}},
            {
              style: {input: "inputPointForm"},
              value: {label: 5, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputPointForm"}, value: {label: 20, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: 30, input: ""}},
          ],
        },
      ],
      conditions: [{checks: ["5"]}],
      engine: EngineEscalas,
    },
    artifact_2: {
      board: "board_2",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "b=8"},
        {
          tag: "inputs",
          maxElementCheck: 4
          , style:{form:"formEcalasCap1"},
          inputs: [
            {
              style: {input: "inputPointForm"},
              value: {label: 160, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputPointForm"},
              value: {label: 19, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputPointForm"}, value: {label: 5, input: ""}},
            {
              style: {input: "inputPointForm"},
              value: {label: 20, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputPointForm"},
              value: {label: 30, input: ""},
              correctResponce: true,
            },
          ],
        },
      ],
      conditions: [{checks: ["160", "19", "20", "30"]}],
      engine: EngineEscalas,
    },
    artifact_3: {
      board: "board_3",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a=18"},
        {
          tag: "inputs",
          maxElementCheck: 3, style:{form:"formEcalasCap1"},
          inputs: [
            {
              style: {input: "inputPointForm"},
              value: {label: 50, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputPointForm"},
              value: {label: 19, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputPointForm"}, value: {label: 5, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: 15, input: ""}},
            {
              style: {input: "inputPointForm"},
              value: {label: 35, input: ""},
              correctResponce: true,
            },
          ],
        },
      ],
      conditions: [{checks: ["50", "19", "35"]}],
      engine: EngineEscalas,
    },
    artifact_4: {
      board: "board_4",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "b=8"},
        {
          tag: "inputs", style:{form:"formEcalasCap1"},
          maxElementCheck: 2,
          inputs: [
            {style: {input: "inputPointForm"}, value: {label: 160, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: 19, input: ""}},
            {
              style: {input: "inputPointForm"},
              value: {label: 5, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputPointForm"}, value: {label: 20, input: ""}},
            {
              style: {input: "inputPointForm"},
              value: {label: 3, input: ""},
              correctResponce: true,
            },
          ],
        },
      ],
      conditions: [{checks: ["5", "3"]}],
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
