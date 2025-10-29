const defBoards = {
  board_1: {
    artifact: "artifact_1",
    buttonSegment: true,

    Interaction: {
      type: "Segment",
      compass: "none",
      compass: {
        // isStatic:true,
        lengthCompass: 3,
        position: [
          [0, 0], // Centro para baseCompas
          [0.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-0.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
        styleCircle: {
          dash: 2,
        },
      },
    },
    maxLinesClick: 2,
    withMathfield: false,
    shapes: [
      {
        type: "arc",
        refPt: ["point_A", "point_B", "point_C"],
        points: [
          {
            x: 0,
            y: 0,
            ref: "point_A",
            name: "A",
            label: {offset: [-4, -15]},
            style: {visible: true, fixed: true, size: 3},
          },
          {
            x: -3.5,
            y: 2,
            ref: "point_B",
            name: "B",
            label: {offset: [-4, -15]},
            style: {visible: true, fixed: true, size: 3},
          },
          {
            x: 2.2,
            y: -3.3,
            ref: "point_C",
            name: "C",
            label: {offset: [-4, -15]},
            style: {visible: true, fixed: true, size: 3},
          },
        ],

        style: {
          fixed: true,
          strokeColor: "#217e9d",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 1,
          highlight: false,
        },
      },
    ],
  },
  board_2: {
    artifact: "artifact_2",
    buttonSegment: true,

    Interaction: {
      type: "Segment",
      compass: "none",
      compass: {
        // isStatic:true,
        lengthCompass: 3,
        position: [
          [0, 0], // Centro para baseCompas
          [0.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-0.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
        styleCircle: {
          dash: 2,
        },
      },
    },
    // maxLinesClick:5,
    shapes: [
      {
        type: "arc",
        refPt: ["point_A", "point_B", "point_C"],
        points: [
          {
            x: 0,
            y: 0.5,
            ref: "point_A",
            style: {visible: true, fixed: true, size: 3},
          },
          {
            x: -3.5,
            y: 0.5,
            ref: "point_B",
            style: {visible: true, fixed: true, size: 3},
          },
          {
            x: 3.5,
            y: 0.5,
            ref: "point_C",
            style: {visible: true, fixed: true, size: 3},
          },
        ],

        style: {
          fixed: true,
          strokeColor: "#217e9d",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 1,
          highlight: false,
        },
      },
    ],
  },
  board_3: {
    artifact: "artifact_3",
    buttonSegment: true,

    Interaction: {
      type: "Segment",
      compass: "none",
      compass: {
        // isStatic:true,
        lengthCompass: 3,
        position: [
          [0, 0], // Centro para baseCompas
          [0.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-0.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    // maxLinesClick:5,
    shapes: [
      {
        type: "arc",
        refPt: ["point_A", "point_B", "point_C"],
        points: [
          {
            x: 0,
            y: 0.5,
            ref: "point_A",
            name: "A",
            label: {offset: [-4, -15]},
            style: {visible: true, fixed: true, size: 3},
          },
          {
            x: -0.78,
            y: -3,
            ref: "point_B",
            name: "A",
            label: {offset: [-4, -15]},
            style: {visible: true, fixed: true, size: 3},
          },
          {
            x: -3.5,
            y: -0.3,
            ref: "point_C",
            name: "c",
            style: {visible: true, fixed: true, size: 3},
          },
        ],

        style: {
          fixed: true,
          strokeColor: "#217e9d",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 1,
          dash: 3,
          highlight: false,
        },
      },
    ],
  },
  board_4: {
    artifact: "artifact_4",
    buttonSegment: true,

    Interaction: {
      type: "Segment",
      compass: "none",
      compass: {
        // isStatic:true,
        lengthCompass: 3,
        position: [
          [0, 0], // Centro para baseCompas
          [0.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-0.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    // maxLinesClick:5,
    shapes: [
      {
        type: "arc",
        refPt: ["point_A", "point_B", "point_C"],
        points: [
          {
            x: -0.68,
            y: 0,
            ref: "point_A",
            style: {visible: true, fixed: true, size: 3},
          },
          {
            x: 3.66,
            y: -0.52,
            ref: "point_B",
            style: {visible: true, fixed: true, size: 3},
          },
          {
            x: 1.5,
            y: 3.66,
            ref: "point_C",
            style: {visible: true, fixed: true, size: 3},
          },
        ],

        style: {
          fixed: true,
          strokeColor: "#217e9d",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 1,
          dash: 3,
        },
      },
    ],
  },
};
const allDef = {
  scrollNav: true,
  artifacts: {
    lexico_1: {
      nodo: [
        {
          texto: "<b>Arcos, Vértices y Ángulos</b>",
          atributos: {
            style: "text-align:center;padding-bottom:15px;font-size:25px;",
          },
        },
      ],

      recursos: [
        {
          recurso: {
            styles: {
              boundingbox: [-2.5, 2.5, 2.5, -1.7],
              axies: {
                y: {visible: false},
                x: {visible: false},
              },
            },
            styleRecurso: ["lexico_example_figure"],
            grafico: [
              {
                linea: [
                  {
                    punto_1: [-0.72, -0.83],
                    punto_2: [-0.51, -0.37],
                    stylesLine: {
                      strokeWidth: 2,
                      strokeColor: "#076382",
                      lastArrow: true,
                    },
                  },

                  {
                    punto_1: [0.71, 1.28],
                    punto_2: [0.87, 1.74],
                    stylesLine: {
                      strokeWidth: 2,
                      strokeColor: "#076382",
                      firstArrow: true,
                    },
                  },
                ],
                texto: [
                  {
                    x: -1,
                    y: -1.1,
                    mensaje: "Arco",
                    styleText: {strokeColor: "#343a40"},
                  },
                  {
                    x: 0,
                    y: 2,
                    mensaje: "Complementario",
                    styleText: {strokeColor: "#343a40"},
                  },
                ],

                circle: [
                  {
                    punto_1: [-0.04, 0.58],
                    punto_2: [-0.87, 0.46],
                    type: "circle",
                    stylesCircle: {
                      strokeColor: "#91c2d2",
                      strokeWidth: 3,
                      dash: 3,
                    },
                    stylesPoint_1: {
                      visible: true,
                      strokeColor: "#076382",
                      fillColor: "#076382",
                    },
                  },
                ],

                ellipse: [
                  {
                    punto_1: [-0.79, 0.25],
                    punto_2: [-0.44, -0.16],
                    punto_3: [0.13, -0.23],

                    type: "circumcirclearc",

                    styles: {strokeColor: "#076382", strokeWidth: 3},
                    stylesPoint_1: {
                      visible: true,
                      fillColor: "#076382",
                      strokeColor: "#076382",
                    },
                    stylesPoint_3: {
                      visible: true,
                      fillColor: "#076382",
                      strokeColor: "#076382",
                    },
                  },
                ],
              },
            ],
          },
        },

        {
          recurso: {
            styles: {
              boundingbox: [-2.5, 3.5, 2.5, -1],
              axies: {
                y: {visible: false},
                x: {visible: false},
              },
            },
            styleRecurso: ["lexico_example_figure"],
            grafico: [
              {
                linea: [
                  {
                    punto_1: [-3, 2],
                    punto_2: [3, 2],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [-0.95, 0.03],
                    punto_2: [-0.04, 0.58],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },

                  {
                    punto_1: [0.17, -0.46],
                    punto_2: [-0.04, 0.58],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                ],

                texto: [
                  {
                    x: -2,
                    y: 2.8,
                    mensaje:
                      "Un arco y su complementario tienen los mismos vértices.",
                    styleText: {strokeColor: "#343a40"},
                  },
                ],

                circle: [
                  {
                    punto_1: [-0.04, 0.58],
                    punto_2: [-1.09, 0.41],
                    type: "circle",
                    stylesCircle: {
                      strokeColor: "#91c2d2",
                      strokeWidth: 3,
                      dash: 3,
                    },

                    stylesPoint_1: {
                      visible: true,
                      strokeColor: "#076382",
                      fillColor: "#076382",
                    },
                  },
                ],

                ellipse: [
                  {
                    punto_1: [-0.95, 0.03],
                    punto_2: [-0.52, -0.36],
                    punto_3: [0.17, -0.46],

                    type: "circumcirclearc",

                    styles: {strokeColor: "#076382", strokeWidth: 3},
                    stylesPoint_1: {
                      visible: true,
                      fillColor: "#076382",
                      strokeColor: "#076382",
                    },
                    stylesPoint_3: {
                      visible: true,
                      fillColor: "#076382",
                      strokeColor: "#076382",
                    },
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
    artifact_1: {
      board: "board_1",
      conditions: {
        lines: [
          {
            points: [
              [
                [-3.5, 2],
                [0, 0],
              ],
              [
                [2.2, -3.3],
                [0, 0],
              ],
            ],
            refLn: ["line_segment_0"],
          },
          {
            points: [
              [
                [-3.5, 2],
                [0, 0],
              ],
              [
                [2.2, -3.3],
                [0, 0],
              ],
            ],
            refLn: ["line_segment_1"],
          },
        ],
        circles: [[0, 0, 4]],
      },
      engine: engineFigure,
    },
    artifact_2: {
      board: "board_2",
      conditions: {
        lines: [
          {
            points: [
              [
                [-3.5, 0.5],
                [0, 0.5],
              ],
              [
                [3.5, 0.5],
                [0, 0.5],
              ],
            ],
            refLn: ["line_segment_0"],
          },
          {
            points: [
              [
                [-3.5, 0.5],
                [0, 0.5],
              ],
              [
                [3.5, 0.5],
                [0, 0.5],
              ],
            ],
            refLn: ["line_segment_1"],
          },
        ],
        circles: [[0, 0.5, 3.5]],
      },
      engine: engineFigure,
    },
    artifact_3: {
      board: "board_3",
      conditions: {
        lines: [
          {
            points: [
              [
                [-3.5, -0.3],
                [0, 0.5],
              ],
              [
                [-0.78, -3],
                [0, 0.5],
              ],
            ],
            refLn: ["line_segment_0"],
          },
          {
            points: [
              [
                [-3.5, -0.3],
                [0, 0.5],
              ],
              [
                [-0.78, -3],
                [0, 0.5],
              ],
            ],
            refLn: ["line_segment_1"],
          },
        ],
        circles: [[0, 0.5, 3.6]],
      },
      engine: engineFigure,
    },
    artifact_4: {
      conditions: {
        lines: [
          {
            points: [
              [
                [1.5, 3.6],
                [-0.68, 0],
              ],
              [
                [3.66, -0.52],
                [-0.68, 0],
              ],
            ],
            refLn: ["line_segment_0"],
          },
          {
            points: [
              [
                [1.5, 3.6],
                [-0.68, 0],
              ],
              [
                [3.66, -0.52],
                [-0.68, 0],
              ],
            ],
            refLn: ["line_segment_1"],
          },
        ],
        circles: [[-0.68, 0, 4.4]],
      },
      board: "board_4",
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

const contentMain = new CreateView(allDef, defBoards);
