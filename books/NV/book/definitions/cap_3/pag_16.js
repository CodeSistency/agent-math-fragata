const defBoards = {
  board_1: {
    artifact: "artifact_1",
    styles: {
      axis: false,
      // grid:true
    },
    Interaction: {
      type: "Compass",
      compass: "none",
      compass: {
        isStatic: true,
        lengthCompass: 4,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    // maxLinesClick:5,
    shapes: [
      {
        type: "circle",
        refPt: ["point_A", "point_B"],

        points: [
          {
            x: 1,
            y: 0.4,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-1, -14]},
            },
          },
          {
            x: 2.1,
            y: -2.2,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
        style: {
          fixed: true,
          strokeColor: "#076382",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 5,
        },
      },
      {
        points: [
          {
            x: -5.5,
            y: -2.5,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 2.5,
            y: -2.5,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
        lines: [
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
    artifact: " artifact_2",
    styles: {
      axis: false,
      // grid:true
    },
    Interaction: {
      type: "Compass",
      compass: "none",
      /* compass:{
        isStatic:true,
        lengthCompass:4,
        position :[
          [0, 0],        // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2],  // Para punta_2 (ajuste según sea necesario)
      ]
      }*/
    },
    // maxLinesClick:5,
    shapes: [
      {
        type: "circle",
        refPt: ["point_A", "point_B"],

        points: [
          {
            x: -3.1,
            y: -1.1,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "A",
              label: {offset: [-4, -14]},
            },
          },
          {
            x: -3,
            y: -4,
            ref: "point_B",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
        style: {
          fixed: true,
          strokeColor: "#076382",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 5,
        },
      },
      {
        type: "circle",
        refPt: ["point_E", "point_F"],

        points: [
          {
            x: 3,
            y: 1.8,
            ref: "point_E",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-3, -14]},
            },
          },
          {
            x: 3.1,
            y: -1,
            ref: "point_F",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
        style: {
          fixed: true,
          strokeColor: "#076382",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 5,
        },
      },
      {
        points: [
          {
            x: -4.1,
            y: -1.1,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 4.1,
            y: -1.1,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_C", "point_D"],
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_3: {
    artifact: "artifact_3",
    styles: {
      axis: false,
      // grid:true
    },
    Interaction: {
      type: "Compass",
      compass: "none",
      /* compass:{
        isStatic:true,
        lengthCompass:4,
        position :[
          [0, 0],        // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2],  // Para punta_2 (ajuste según sea necesario)
      ]
      }*/
    },
    // maxLinesClick:5,
    shapes: [
      {
        type: "circle",
        refPt: ["point_A", "point_B"],

        points: [
          {
            x: -3.1,
            y: -1.1,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "A",
              label: {offset: [-4, -14]},
            },
          },
          {
            x: -3,
            y: -4,
            ref: "point_B",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
        style: {
          fixed: true,
          strokeColor: "#076382",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 5,
        },
      },
      {
        type: "circle",
        refPt: ["point_L", "point_F"],

        points: [
          {
            x: 3,
            y: 1.8,
            ref: "point_L",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-3, -14]},
            },
          },
          {
            x: 3.1,
            y: -1,
            ref: "point_F",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
        style: {
          fixed: true,
          strokeColor: "#076382",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 5,
        },
      },
      {
        points: [
          {
            x: -4.1,
            y: -1.1,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 4.1,
            y: -1.1,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: -4.3,
            y: 1.8,
            ref: "point_E",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: 4,
            y: 1.8,
            ref: "point_X",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_C", "point_D"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_E", "point_X"],
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
    lexico_1: {
      nodo: [
        {
          texto: "Rectas paralelas",
          etiqueta: "h1",
          atributos: {style: "text-align:center;padding-bottom:15px"},
        },
      ],

      recursos: [
        {
          recurso: {
            styles: {
              boundingbox: [-2.5, 2, 2.5, -2],
              axies: {
                y: {visible: false},
                x: {visible: false},
              },
            },
            styleRecurso: ["lexico_example_figure_short"],
            grafico: [
              {
                linea: [
                  {
                    punto_1: [-3, 0.9],
                    punto_2: [3, 0.9],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},

                    stylesPoint_1: {visible: true, strokeWidth: 3},

                    stylesPoint_2: {visible: true, strokeWidth: 3},
                  },
                  {
                    punto_1: [-1.59, -0.57],
                    punto_2: [1.4, 0.11],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},

                    //   stylesPoint_1:{visible:true,strokeWidth:3},

                    //   stylesPoint_2:{visible:true,strokeWidth:3},
                  },
                  {
                    punto_1: [-1.59, -1.2],
                    punto_2: [1.4, -0.5],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},

                    // stylesPoint_1:{visible:true,strokeWidth:3},

                    // stylesPoint_2:{visible:true,strokeWidth:3},
                  },
                ],

                texto: [
                  {
                    x: -0.6,
                    y: 1.5,
                    mensaje: "Paralelas",
                    styleText: {strokeColor: "#343a40"},
                  },
                ],
              },
            ],
          },
        },

        {
          recurso: {
            styles: {
              boundingbox: [-2.5, 2, 2.5, -2],
              axies: {
                y: {visible: false},
                x: {visible: false},
              },
            },
            styleRecurso: ["lexico_example_figure_short"],
            grafico: [
              {
                linea: [
                  {
                    punto_1: [-3, 0.9],
                    punto_2: [3, 0.9],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [-1.59, -0.57],
                    punto_2: [1.4, 0.11],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [-1.59, -1.2],
                    punto_2: [1.4, -1.2],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                  },
                ],

                texto: [
                  {
                    x: -0.9,
                    y: 1.5,
                    mensaje: "No paralelas",
                    styleText: {strokeColor: "#343a40"},
                  },
                ],
              },
            ],
          },
        },
      ],

      styleContainer: "note",
      engine: EngineOwner,
    },

    lexico_2: {
      nodo: [
        {
          texto: "<b>Método del compás para trazar paralelas en tres pasos</b>",
          atributos: {style: "text-align:center;padding-bottom:15px"},
        },
      ],

      recursos: [
        {
          recurso: {
            styles: {
              boundingbox: [-2.5, 2, 2.5, -2],
              axies: {
                y: {visible: false},
                x: {visible: false},
              },
            },
            styleRecurso: ["figures"],
            grafico: [
              {
                linea: [
                  {
                    punto_1: [-1.59, -1],
                    punto_2: [1.4, -1],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                  },
                ],

                points: [{x: 1, y: 0.5}],
              },
            ],
          },
        },
      ],

      styleContainer: "note",
      engine: EngineOwner,
    },
    example_1: {
      description:
        "Trazar la circunferencia centrada en el punto que es tangente a la recta.",

      board: "board_1",

      engine: engineFigure,
    },
    example_2: {
      description:
        "Utilizar la apertura del compás para trazar una circunferencia centrada en la recta.",

      board: "board_2",

      engine: engineFigure,
    },
    example_3: {
      description:
        "Trazar las recta tangente al segundo círculo que pasa por el centro del primero.",

      board: "board_3",

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
