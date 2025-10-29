const defBoards = {
  board_1: {
    artifact: "artifact_1",
    buttonInteraction: true,
    Interaction: {
      type: "Compass",
      // compass:"none"
      compass: {
        position: [
          [0, 0], // Centro para baseCompas
          [1.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-1.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 1,
    shapes: [
      {
        points: [
          {
            x: -4,
            y: 0,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O",
              label: {offset: [-8, 10]},
            },
          },
          {
            x: 3,
            y: 2,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "P",
              label: {offset: [4, 10]},
            },
          },
          {
            x: -4,
            y: -1.5,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "A",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 3,
            y: -1.5,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [4, -8]},
            },
          },
          {
            x: -4,
            y: 2,
            ref: "point_F",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "F",
              label: {offset: [4, -8]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            ref: "line_evaluate_0",
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_C", "point_D"],
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_2: {
    artifact: "artifact_2",
    buttonInteraction: true,

    Interaction: {
      type: "Compass",
      // compass:"none"
      compass: {
        position: [
          [0, 0], // Centro para baseCompas
          [1.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-1.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 2,
    shapes: [
      {
        points: [
          {
            x: -6,
            y: 3,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "P",
              label: {offset: [-2, 15]},
            },
          },
          {
            x: 0,
            y: 3,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "O",
              label: {offset: [-2, -12]},
            },
          },
          {
            x: 6,
            y: 1,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "B",
              label: {offset: [-2, -12]},
            },
          },
          {
            x: 0,
            y: 1,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "A",
              label: {offset: [-2, -12]},
            },
          },

          {
            x: -4.5,
            y: -2,
            ref: "point_G",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "O",
              label: {offset: [-4, 15]},
            },
          },
          {
            x: -1.6,
            y: -3,
            ref: "point_H",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "P",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 1,
            y: -3,
            ref: "point_I",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "A",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 5,
            y: -3,
            ref: "point_J",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "B",
              label: {offset: [-4, -15]},
            },
          },

          {
            x: -7,
            y: -0.5,
            ref: "point_E",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [4, -8]},
            },
          },
          {
            x: 7,
            y: -0.5,
            ref: "point_F",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [4, -8]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_C", "point_D"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_E", "point_F"],
            style: {strokewidth: 2},
            type: "segment",
          },
          {
            refPt: ["point_I", "point_J"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_G", "point_H"],
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
      // {
      //   type:"circle",
      //   ref:"circleEvaluate_0",
      //   refPt:["point_AC","point_BC"],

      //   points:[
      //     {x:.9,y:.4,ref:"point_AC",style:{visible:false,fixed:false,size:3,name:'',label:{offset:[-1,-14]}}},
      //     {x:0.8,y:-2.2,ref:"point_BC",style:{visible:false,fixed:false,size:3,name:'',label:{offset:[8,-1]}}},

      //   ],
      //   style: {
      //     fixed: true,
      //     strokeColor: "transparent",
      //     strokeWidth: 4,
      //     highlight: false,
      //     fillColor: 'transparent',
      //     fillOpacity: 1
      //   }
      // },
      // {
      //   type:"circle",
      //   ref:"circleEvaluate_2",
      //   refPt:["point_AC3","point_BC3"],

      //   points:[
      //     {x:5.9,y:.4,ref:"point_AC3",style:{visible:false,fixed:false,size:3,name:'AC3',label:{offset:[-1,-14]}}},
      //     {x:5.9,y:-2.2,ref:"point_BC3",style:{visible:false,fixed:false,size:3,name:'BC3',label:{offset:[8,-1]}}},

      //   ],
      //   style: {
      //     fixed: true,
      //     strokeColor: "transparent",
      //     strokeWidth: 4,
      //     highlight: false,

      //     fillColor: 'transparent',
      //     fillOpacity: 1
      //   }
      // },
    ],
  },
  board_3: {
    artifact: "artifact_3",

    Interaction: {
      type: "Compass",
      compass: {
        position: [
          [0, 0], // Centro para baseCompas8y
          [1.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-1.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 0,
    shapes: [
      {
        points: [
          {
            x: -6,
            y: 0,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "A",
              label: {offset: [-10, 0]},
            },
          }, // 1
          {
            x: 6,
            y: 0,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [4, 0]},
            },
          }, //2
          {
            x: -6,
            y: -2,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "C",
              label: {offset: [-10, 0]},
            },
          }, //3
          {
            x: 6,
            y: -2,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "D",
              label: {offset: [4, 0]},
            },
          }, //4
          {
            x: -6,
            y: 3,
            ref: "point_E",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-8, 10]},
            },
          }, //5
          {
            x: 6,
            y: 3,
            ref: "point_F",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, 10]},
            },
          }, //6

          {
            x: -2,
            y: -2,
            ref: "point_G",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          }, //7
          {
            x: -2,
            y: 3,
            ref: "point_H",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, -8]},
            },
          }, //8
          {
            x: 2,
            y: -2,
            ref: "point_I",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-8, 10]},
            },
          }, //9
          {
            x: 2,
            y: 3,
            ref: "point_J",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, 10]},
            },
          }, //10

          {
            x: -5,
            y: 2,
            ref: "point_K",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          }, //11
          {
            x: -3,
            y: 0.5,
            ref: "point_L",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, -8]},
            },
          }, //12
          {
            x: -6,
            y: 1,
            ref: "point_M",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-8, 10]},
            },
          }, // 13

          {
            x: 4,
            y: 2,
            ref: "point_N",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, 10]},
            },
          }, //14
          {
            x: 3,
            y: 1,
            ref: "point_O",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          }, //15
          {
            x: 6,
            y: 0.5,
            ref: "point_P",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, -8]},
            },
          }, //16

          {
            x: 1.5,
            y: 0.5,
            ref: "point_Q",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-8, 10]},
            },
          }, //17
          {
            x: -0.5,
            y: 2,
            ref: "point_R",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, 10]},
            },
          }, //18
          {
            x: -1.5,
            y: 1,
            ref: "point_S",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          }, //19
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_C", "point_D"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_E", "point_F"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_G", "point_H"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_I", "point_J"],
            style: {strokewidth: 3},
            type: "segment",
          },

          {
            refPt: ["point_M", "point_L"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_K", "point_L"],
            style: {strokewidth: 3},
            type: "segment",
          },

          {
            refPt: ["point_N", "point_P"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_O", "point_P"],
            style: {strokewidth: 3},
            type: "segment",
          },

          {
            refPt: ["point_Q", "point_R"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_Q", "point_S"],
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_4: {
    artifact: "artifact_4",

    Interaction: {
      type: "Compass",
      compass: {
        position: [
          [0, 0], // Centro para baseCompas8y
          [1.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-1.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 0,
    shapes: [
      {
        points: [
          {
            x: -6,
            y: 0,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "A",
              label: {offset: [-10, 0]},
            },
          }, // 1
          {
            x: 6,
            y: 0,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [4, 0]},
            },
          }, //2
          {
            x: -6,
            y: -2,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "C",
              label: {offset: [-10, 0]},
            },
          }, //3
          {
            x: 6,
            y: -2,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "D",
              label: {offset: [4, 0]},
            },
          }, //4
          {
            x: -6,
            y: 3,
            ref: "point_E",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-8, 10]},
            },
          }, //5
          {
            x: 6,
            y: 3,
            ref: "point_F",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, 10]},
            },
          }, //6

          {
            x: -2,
            y: -2,
            ref: "point_G",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          }, //7
          {
            x: -2,
            y: 3,
            ref: "point_H",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, -8]},
            },
          }, //8
          {
            x: 2,
            y: -2,
            ref: "point_I",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-8, 10]},
            },
          }, //9
          {
            x: 2,
            y: 3,
            ref: "point_J",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, 10]},
            },
          }, //10

          {
            x: -5,
            y: 2,
            ref: "point_K",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          }, //11
          {
            x: -3,
            y: 0.5,
            ref: "point_L",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, -8]},
            },
          }, //12
          {
            x: -6,
            y: 1,
            ref: "point_M",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-8, 10]},
            },
          }, // 13

          {
            x: 4,
            y: 2,
            ref: "point_N",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, 10]},
            },
          }, //14
          {
            x: 3,
            y: 1,
            ref: "point_O",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          }, //15
          {
            x: 6,
            y: 0.5,
            ref: "point_P",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, -8]},
            },
          }, //16

          {
            x: 1.5,
            y: 0.5,
            ref: "point_Q",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-8, 10]},
            },
          }, //17
          {
            x: -0.5,
            y: 2,
            ref: "point_R",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [4, 10]},
            },
          }, //18
          {
            x: -1.5,
            y: 1,
            ref: "point_S",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          }, //19
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_C", "point_D"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_E", "point_F"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_G", "point_H"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_I", "point_J"],
            style: {strokewidth: 3},
            type: "segment",
          },

          {
            refPt: ["point_M", "point_L"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_K", "point_L"],
            style: {strokewidth: 3},
            type: "segment",
          },

          {
            refPt: ["point_N", "point_P"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_O", "point_P"],
            style: {strokewidth: 3},
            type: "segment",
          },

          {
            refPt: ["point_Q", "point_R"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_Q", "point_S"],
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
};
const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      board: "board_1",
      tools: [
        {
          tag: "inputs",
          maxElementCheck: 1, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value:
            "<p>Trace la paralela a <b>AB</b> que pasa por <b>P</b>. <b>¿Coincide OP con la recta que usted trazó?</b></p>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Si", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
      ],
      conditions: {
        inputs: [{checks: ["No"]}],
        lines: [
          {
            points: [
              [
                [-4, 2],
                [3, 2],
              ],
            ],
            refLn: ["line_tagent_0"],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_2: {
      board: "board_2",
      tools: [
        {
          tag: "inputs",
          maxElementCheck: 1, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value:
            "<p>En cada figura seleccione un punto en alguna de las rectas y por ese punto trace una paralela a la otra recta. <b>¿Coincide con la recta en la que usted seleccionó el punto?</b></p>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Si", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
      ],
      conditions: {
        inputs: [{checks: ["Si"]}],
        lines: [
          {
            points: [
              [
                [0, 3],
                [6, 3],
              ],
              [
                [0, 1],
                [-6, 1],
              ],
            ],
            refLn: ["line_tagent_0"],
          },
          {
            points: [
              [
                [-4.5, -2],
                [5, -2],
              ],
              [
                [-4.5, -2],
                [1, -2],
              ],
              [
                [-4.1, -1.2],
                [1, -3],
              ],
            ],
            refLn: ["line_tagent_1"],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_3: {
      board: "board_3",
      description: "Verifique su impresión con el compás.",
      tools: [
        {
          tag: "inputs",
          style: {form: "formFigure2"},
          value: "<p>¿Las rectas <b>AB</b> y <b>CD</b> le parecen paralelas?</p>",
          maxElementCheck: 1, // Máximo número de checkboxes permitidos
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Si", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
      ],
      conditions: {
        inputs: [{checks: ["Si"]}],
      },
      engine: engineFigure,
    },
    artifact_4: {
      board: "board_4",
      description: "Verifique su impresión con el compás.",
      tools: [
        {
          tag: "inputs",
          style: {form: "formFigure2"},
          value: "<p>¿Las rectas <b>AB</b> y <b>CD</b> le parecen paralelas?</p>",
          maxElementCheck: 1, // Máximo número de checkboxes permitidos
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Si", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
      ],
      conditions: {
        inputs: [{checks: ["Si"]}],
      },
      engine: engineFigure,
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

// contentMain.initVIew(def);
