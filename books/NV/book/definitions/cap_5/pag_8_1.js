const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      border: true,
      board: "board_1",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "b=-62"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: -180, input: ""},
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: -174, input: ""},
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: -186, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: -124, input: ""},
            },
          ],
        },
      ],
      conditions: [{checks: ["-186"]}],

      engine: EngineEscalas,
    },
    artifact_2: {
      board: "board_2",
      border: true,
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a=39"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          inputs: [
            {style: {input: "inputTableCheck"}, value: {label: -49, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -50, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: -52, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: -26, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -55, input: ""}},
          ],
        },
      ],
      conditions: [{checks: ["-52"]}],

      engine: EngineEscalas,
    },
    artifact_3: {
      board: "board_3",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a=-1000"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          inputs: [
            {style: {input: "inputTableCheck"}, value: {label: 900, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: 500, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: 250, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 60, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 160, input: ""}},
          ],
        },
      ],
      conditions: [{checks: ["500"]}],

      engine: EngineEscalas,
    },
    artifact_4: {
      board: "board_4",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "b=84"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          inputs: [
            {style: {input: "inputPointForm"}, value: {label: -60, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: -15, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: -19, input: ""}},
            {
              style: {input: "inputPointForm"},
              value: {label: -21, input: ""},
              correctResponce: true,
            }, // acomodar
            {style: {input: "inputPointForm"}, value: {label: -22, input: ""}}, // acomodar
          ],
        },
      ],
      conditions: [
        {checks: ["-21"]}, // acomodar
      ],
      engine: EngineEscalas,
    },
    artifact_5: {
      board: "board_5",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a=34"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          inputs: [
            {style: {input: "inputPointForm"}, value: {label: 70, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: 100, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: 60, input: ""}},
            {
              style: {input: "inputPointForm"},
              value: {label: 68, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputPointForm"}, value: {label: 86, input: ""}},
          ],
        },
      ],
      conditions: [{checks: ["68"]}],
      engine: EngineEscalas,
    },
    artifact_6: {
      board: "board_6",
      parent: "lexico-content",
      point: [
        {
          coordenada: [-8.3,2],
          texto: "a",
          SizeText: 18,
        },
     
      ],
      inputs: [
        {tag: "input", style: "inputPoint", value: "b=-48"},
        {
          tag: "inputs",
          maxElementCheck: 1,
          inputs: [
            {style: {input: "inputPointForm"}, value: {label: -64, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: -75, input: ""}},
            {style: {input: "inputPointForm"}, value: {label: -100, input: ""}},
            {
              style: {input: "inputPointForm"},
              value: {label: -72, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputPointForm"}, value: {label: -80, input: ""}},
          ],
        },
      ],
      conditions: [{checks: ["-72"]}],
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

const defBoards = {
  board_1: {
    artifact: "artifact_1",
    points: [
      {text: {value: "a"}},
      {},
      {},
      {},
      {text: {value: "b"}},
      {},
      {text: {value: "0"}},
    ],
    //  slider:[{},{},{},{}],
    type: 2,
  },
  board_2: {
    artifact: "artifact_2",
    points: [
      {text: {value: "b"}},
      {},
      {},
      {},
      {text: {value: "0"}},
      {},
      {},
      {text: {value: "a"}},
    ],
    type: 2,
  },
  board_3: {
    artifact: "artifact_3",
    points: [
      {text: {value: "a"}},
      {},
      {},
      {},
      {text: {value: "0"}},
      {},
      {text: {value: "b"}},
    ],
    type: 2,
  },
  board_4: {
    artifact: "artifact_4",
    points: [
      {text: {value: "a"}},
      {text: {value: "0"}},
      {},
      {},
      {},
      {text: {value: "b"}}, // acomodar
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
  board_6: {
    artifact: "artifact_6",
    points: [
      {},
      {},
      {text: {value: "b"}},
      {},{},
      {text: {value: "0"}}, // acomodar
    ],
    arrows: [
      {
        p2_x: -7.8,
        p2_y: 2,
        p1_x: -7.8,
        p1_y: -2,
        type: "line",
        style: {strokeColor: "#000"},
      },
    ],
    type: 2,
   
  },
};

const contentMain = new CreateView(def, defBoards);
