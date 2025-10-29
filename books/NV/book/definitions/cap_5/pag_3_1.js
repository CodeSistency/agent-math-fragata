const defBoards = {
  board_1: {
    artifact: "artifact_1",
    points: [{text: {value: "a"}}, {text: {value: "b"}}],
    type: 2,
  },
  board_2: {
    artifact: "artifact_2",
    points: [{text: {value: "a"}}, {text: {value: "b"}}],
    type: 2,
  },
  board_3: {
    artifact: "artifact_3",
    points: [{text: {value: "b"}}, {text: {value: "a"}}],
    type: 2,
  },
  board_4: {
    artifact: "artifact_4",
    points: [{text: {value: "b"}}, {text: {value: "a"}}],
    type: 2,
  },
  board_5: {
    artifact: "artifact_5",
    points: [{text: {value: "b"}}, {text: {value: "a"}}],
    type: 2,
  },
  board_6: {
    artifact: "artifact_6",
    points: [
      {visible: false},
      {visible: false},
      {text: {value: "a"}},
      {text: {value: "b"}},
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
      border: true,
      board: "board_1",
      inputs: [
        {tag: "input", style: "inputPoint", value: "b=20"},
        {
          tag: "inputs",
          maxElementCheck: 2,
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: 160, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: 19, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -5, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 20, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: 30, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
            },
          ],
        },
      ],
      conditions: [{checks: ["19", "-5"]}],

      engine: EngineEscalas,
    },
    artifact_2: {
      border: true,
      board: "board_2",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "b=20"},
        {
          tag: "inputs",
          maxElementCheck: 3,
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: -160, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: 19, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: -5, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 20, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: 30, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
            },
          ],
        },
      ],
      conditions: [{checks: ["19", "-5", "-160"]}],

      engine: EngineEscalas,
    },
    artifact_3: {
      border: true,
      board: "board_3",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a=5"},
        {
          tag: "inputs",
          maxElementCheck: 2,
          inputs: [
            {style: {input: "inputTableCheck"}, value: {label: 160, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: -19, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: -5, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: 20, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 30, input: ""}},
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
            },
          ],
        },
      ],
      conditions: [{checks: ["-19", "-5"]}],

      engine: EngineEscalas,
    },
    artifact_4: {
      border: true,
      board: "board_4",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "b= -5"},
        {
          tag: "inputs",
          maxElementCheck: 3,
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: 160, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: -19, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -5, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: 20, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: 30, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
            },
          ],
        },
      ],
      conditions: [{checks: ["160", "20", "30"]}],

      engine: EngineEscalas,
    },
    artifact_5: {
      border: true,
      board: "board_5",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "b= -21"},
        {
          tag: "inputs",
          maxElementCheck: 5,
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: 160, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: 19, input: ""},
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
              value: {label: 30, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
            },
          ],
        },
      ],
      conditions: [{checks: ["19", "-5", "160", "20", "30"]}],

      engine: EngineEscalas,
    },
    artifact_6: {
      border: true,
      board: "board_6",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a= -30"},
        {
          tag: "inputs",
          maxElementCheck: 5,
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: 160, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: -19, input: ""},
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
              value: {label: 30, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
            },
          ],
        },
      ],
      conditions: [{checks: ["-19", "-5", "160", "20", "30"]}],

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
