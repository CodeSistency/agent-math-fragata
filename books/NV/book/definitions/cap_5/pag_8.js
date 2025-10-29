const defBoards = {
  board_1: {
    artifact: "artifact_1",
    points: [
      {text: {value: "a"}},
      {text: {value: "0"}},
      {},
      {text: {value: "b"}},
    ],
    //  slider:[{},{},{},{}],
    type: 2,
  },
  board_2: {
    artifact: "artifact_2",
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
  board_3: {
    artifact: "artifact_3",
    points: [
      {text: {value: "b"}},
      {text: {value: "a"}},
      {},
      {},
      {},
      {text: {value: "0"}},
    ],
    type: 2,
  },
  board_4: {
    artifact: "artifact_4",


    arrows: [
      {
        p2_x: -8.05,
        p2_y: 2,
        p1_x: -8.05,
        p1_y: -2,
        type: "line",
        style: {strokeColor: "#000"},
      },
    ],
    points: [
      {},
      {},
      {text: {value: "b"}},
      {},
      {},
      {},
      {},
      {},
      {text: {value: "0"}}, // acomodar
    ],
    type: 2,
  },
  board_5: {
    artifact: "artifact_5",
    points: [
      {text: {value: "0"}},
      {},
      {text: {value: "a"}},
      {},
      {text: {value: "b"}},
    ],
    type: 2,
  },
};

const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      border: true,
      board: "board_1",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a=-20"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          inputs: [
            {style: {input: "inputTableCheck"}, value: {label: 20, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -20, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 60, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -40, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: 40, input: ""},
              correctResponce: true,
            },
          ],
        },
      ],
      conditions: [{checks: ["40"]}],

      engine: EngineEscalas,
    },
    artifact_2: {
      board: "board_2",
      border: true,
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a=-30"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: 30, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: 40, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -25, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -40, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 35, input: ""}},
          ],
        },
      ],
      conditions: [{checks: ["30"]}],

      engine: EngineEscalas,
    },
    artifact_3: {
      board: "board_3",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "b=-25"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          inputs: [
            {style: {input: "inputTableCheck"}, value: {label: 20, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: -20, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: -15, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 10, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 30, input: ""}},
          ],
        },
      ],
      conditions: [{checks: ["-20"]}],

      engine: EngineEscalas,
    },
    artifact_4: {
      board: "board_4",
      parent: "lexico-content",
      point: [
        {
          coordenada: [-8.5,2],
          texto: "a",
          SizeText: 18,
        },
     
      ],
      inputs: [
        {tag: "input", style: "inputPoint", value: "b=-120"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          inputs: [
            {style: {input: "inputPointForm"}, value: {label: -160, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: -180, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: -165, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: -170, input: ""}}, // acomodar
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
              correctResponce: true,
            },
          ],
        },
      ],
      conditions: [
        {checks: ["N"]}, // acomodar
      ],
      engine: EngineEscalas,
    },
    artifact_5: {
      board: "board_5",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a=120"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          inputs: [
            {style: {input: "inputPointForm"}, value: {label: 160, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: 60, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: 180, input: ""}},
            {
              style: {input: "inputPointForm"},
              value: {label: 240, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputPointForm"}, value: {label: 250, input: ""}},
          ],
        },
      ],
      conditions: [{checks: ["240"]}],
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
