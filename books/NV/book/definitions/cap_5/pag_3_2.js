const defBoards = {
  board_1: {
    artifact: "artifact_1",
    points: [{visible: false}, {text: {value: "b"}}, {text: {value: "a"}}],
    type: 2,
  },
  board_2: {
    artifact: "artifact_2",
    points: [{visible: false}, {text: {value: "b"}}, {text: {value: "a"}}],
    type: 2,
  },
  board_3: {
    artifact: "artifact_3",
    points: [
      {visible: false},
      {visible: false},
      {text: {value: "a"}},
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
      {text: {value: "b"}},
    ],
    type: 2,
  },
  board_5: {
    artifact: "artifact_5",
    points: [
      {text: {value: "a"}},
      {text: {value: "b"}},
      {visible: false},
      {visible: false},
    ],
    type: 2,
  },
  board_6: {
    artifact: "artifact_6   ",
    points: [
      {text: {value: "b"}},
      {text: {value: "a"}},
      {visible: false},
      {visible: false},
    ],
    type: 2,
  },
};

const def = {
  scrollNav: {
    tittle: "orden",
    lexico:
      "Seleccione los números que podrían ser la letra cuyo valor se desconoce. (Pueden haber varios números, uno solo o inclusive ninguno).",
  },

  artifacts: {
    artifact_1: {
      board: "board_1",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a= -30"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          style:{form:"formEcalasCap1"},
          inputs: [
            {style: {input: "inputTableCheck"}, value: {label: 160, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -29, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -5, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 20, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 2, input: ""}},
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
              correctResponce: true,
            },
          ],
        },
      ],
      conditions: [{checks: ["N"]}],
      engine: EngineEscalas,
    },
    artifact_2: {
      board: "board_2",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "b=8"},
        {
          tag: "inputs",
          maxElementCheck: 2,
          style:{form:"formEcalasCap1"},
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: 160, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: -29, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -5, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: 20, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: 2, input: ""}},
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
            },
          ],
        },
      ],
      conditions: [{checks: ["160", "20"]}],
      engine: EngineEscalas,
    },
    artifact_3: {
      board: "board_3",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a=8"},
        {
          tag: "inputs",
          maxElementCheck: 2,
          style:{form:"formEcalasCap1"},
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: 160, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: -29, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -5, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: 20, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: 2, input: ""}},
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
            },
          ],
        },
      ],
      conditions: [{checks: ["160", "20"]}],
      engine: EngineEscalas,
    },
    artifact_4: {
      board: "board_4",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "b=8"},
        {
          tag: "inputs",
          maxElementCheck: 3,
          style:{form:"formEcalasCap1"},
          inputs: [
            {style: {input: "inputTableCheck"}, value: {label: 160, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: -29, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: -5, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: 20, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: 2, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
            },
          ],
        },
      ],
      conditions: [{checks: ["-29", "-5", "2"]}],
      engine: EngineEscalas,
    },
    artifact_5: {
      board: "board_5",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a= -160"},
        {
          tag: "inputs",
          maxElementCheck: 5,
          style:{form:"formEcalasCap1"},
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: 160, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: -29, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: -5, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: 20, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: 2, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
            },
          ],
        },
      ],
      conditions: [{checks: ["-29", "-5", "2", "160", "20"]}],
      engine: EngineEscalas,
    },
    artifact_6: {
      board: "board_6",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a= -160"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          style:{form:"formEcalasCap1"},
          inputs: [
            {style: {input: "inputTableCheck"}, value: {label: 160, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -29, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -5, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 20, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 2, input: ""}},
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
              correctResponce: true,
            },
          ],
        },
      ],
      conditions: [{checks: ["N"]}],
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
