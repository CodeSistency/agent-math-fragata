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
      /* compass:{
        // isStatic:true,
        // lengthCompass:3.5,
        position :[
          [0, 0],        // Centro para baseCompas
          [1.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-1.6, -3.2],  // Para punta_2 (ajuste según sea necesario)
      ]
      },*/
    },
    // maxLinesClick:5,
    shapes: [
      {
        points: [
          {
            x: 3,
            y: 1.8,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [-1, 6]},
            },
          },
          {
            x: -1,
            y: -1.5,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O",
              label: {offset: [-7, -8]},
            },
          },
          {
            x: 4,
            y: -1.5,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "A",
              label: {offset: [4, -8]},
            },
          },
          {
            x: 0.5,
            y: -1.5,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "Lado 1",
              label: {offset: [4, -15]},
            },
          },
          {
            x: 0.2,
            y: 1,
            ref: "point_E",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "Lado 2",
              label: {offset: [-20, -8]},
            },
          },
          {
            x: -5,
            y: -1,
            ref: "point_F",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "Punta o esquina",
              label: {offset: [-10, -10]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_C", "point_B"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_B", "point_A"],
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
          texto:
            "<b>Así como el segmento es parte de una recta, el arco es parte de una círcunferencia.</b>",
          atributos: {style: "text-align:center;padding-bottom:15px;"},
        },

        {
          texto: "<b>Partes de una círcunferencia: arcos</b>",
          atributos: {
            style: "text-align:center;padding-bottom:15px;font-size:25px;",
          },
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
            styleRecurso: ["lexico_example_figure"],
            grafico: [
              {
                linea: [
                  {
                    punto_1: [-3, -1],
                    punto_2: [3, -1],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},

                    stylesPoint_1: {visible: true, strokeWidth: 3},

                    stylesPoint_2: {visible: true, strokeWidth: 3},
                  },
                ],

                texto: [
                  {
                    x: -2.3,
                    y: -1.5,
                    mensaje:
                      "En la figura aparecen (más oscuro) los tres arcos: AB, CD, EF.",
                    styleText: {strokeColor: "#343a40"},
                  },

                  {
                    x: -0.95,
                    y: 1.25,
                    mensaje: "A",
                    styleText: {strokeColor: "#343a40"},
                  },

                  {
                    x: 0.05,
                    y: 1.6,
                    mensaje: "B",
                    styleText: {strokeColor: "#343a40"},
                  },

                  {
                    x: -1,
                    y: 0,
                    mensaje: "F",
                    styleText: {strokeColor: "#343a40"},
                  },

                  {
                    x: -0.12,
                    y: -0.5,
                    mensaje: "E",
                    styleText: {strokeColor: "#343a40"},
                  },

                  {
                    x: 0.65,
                    y: -0.14,
                    mensaje: "D",
                    styleText: {strokeColor: "#343a40"},
                  },

                  {
                    x: 0.85,
                    y: 0.85,
                    mensaje: "C",
                    styleText: {strokeColor: "#343a40"},
                  },
                ],

                circle: [
                  {
                    punto_1: [-0.04, 0.58],
                    punto_2: [-0.87, 0.46],
                    type: "circle",

                    stylesCircle: {strokeColor: "#91c2d2", strokeWidth: 3},
                  },
                ],

                ellipse: [
                  {
                    punto_1: [-0.7, 1.08],
                    punto_2: [-0.32, 1.37],
                    punto_3: [0.12, 1.4],

                    type: "circumcirclearc",

                    styles: {strokeColor: "#076382"},
                    stylesPoint_1: {
                      visible: true,
                      fillColor: "#076382",
                      strokeColor: "#076382",
                    },
                    // stylesPoint_2:{visible:true,fixed:false},
                    stylesPoint_3: {
                      visible: true,
                      fillColor: "#076382",
                      strokeColor: "#076382",
                    },
                  },

                  {
                    punto_1: [-0.72, 0.1],
                    punto_2: [-0.44, -0.16],
                    punto_3: [-0.03, -0.26],

                    type: "circumcirclearc",

                    styles: {strokeColor: "#076382"},
                    stylesPoint_1: {
                      visible: true,
                      fixed: true,
                      fillColor: "#076382",
                      strokeColor: "#076382",
                    },
                    // stylesPoint_2:{visible:true,fixed:false},
                    stylesPoint_3: {
                      visible: true,
                      fixed: true,
                      fillColor: "#076382",
                      strokeColor: "#076382",
                    },
                  },

                  {
                    punto_1: [0.62, 0.06],
                    punto_2: [0.78, 0.39],
                    punto_3: [0.76, 0.82],

                    type: "circumcirclearc",

                    styles: {strokeColor: "#076382"},
                    stylesPoint_1: {
                      visible: true,
                      fixed: true,
                      fillColor: "#076382",
                      strokeColor: "#076382",
                    },
                    // stylesPoint_2:{visible:true,fixed:false},
                    stylesPoint_3: {
                      visible: true,
                      fixed: true,
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

    lexico_2: {
      nodo: [
        {
          texto: "<b>Elementos de un arco: centro y extremos</b>",
          atributos: {
            style: "text-align:center;padding-bottom:15px;font-size:25px;",
          },
        },
      ],

      recursos: [
        {
          recurso: {
            styles: {
              boundingbox: [-3, 3, 3, -3],
              axies: {
                y: {visible: false},
                x: {visible: false},
              },
            },
            styleRecurso: ["lexico_example_figure_short"],
            grafico: [
              {
                ellipse: [
                  {
                    punto_1: [-0.7, -0.31],
                    punto_2: [-0.08, -0.88],
                    punto_3: [0.74, -1.06],

                    type: "circumcirclearc",

                    styles: {strokeColor: "#076382"},
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

                points: [
                  {
                    x: 0.63,
                    y: 2,
                    stylesPoint: {
                      visible: true,
                      fillColor: "#076382",
                      strokeColor: "#076382",
                    },
                  },
                ],

                texto: [
                  {
                    x: -1,
                    y: -1.7,
                    mensaje: "Extremos",
                    styleText: {strokeColor: "#343a40"},
                  },

                  {
                    x: 0.85,
                    y: 1.7,
                    mensaje: "Centro",
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

    lexico_3: {
      nodo: [
        {
          texto: "<b>Vértices y arcos</b>",
          atributos: {
            style: "text-align:center;padding-bottom:15px;font-size:25px;",
          },
        },
      ],

      recursos: [
        {
          recurso: {
            styles: {
              boundingbox: [-3, 3, 4, -3],
              axies: {
                y: {visible: false},
                x: {visible: false},
              },
            },
            styleRecurso: ["lexico_example_figure_large_2"],
            grafico: [
              {
                ellipse: [
                  {
                    punto_1: [-2.14, 1.15],
                    punto_2: [-1.8, 0.59],
                    punto_3: [-1.16, 0.41],

                    type: "circumcirclearc",
                  },

                  {
                    punto_1: [1.27, 1.22],
                    punto_2: [1.8, 0.42],
                    punto_3: [2.71, 0.21],

                    type: "circumcirclearc",
                    styles: {strokeColor: "#076382"},
                  },
                ],

                linea: [
                  {
                    punto_1: [-2.17, -1.73],
                    punto_2: [2.95, -1.73],
                    stylesLine: {
                      strokeWidth: 2,
                      strokeColor: "#076382",
                      lastArrow: true,
                      fillColor: "#076382",
                    },
                  },

                  {
                    punto_1: [2.57, 1.52],
                    punto_2: [1.27, 1.22],
                    stylesLine: {
                      strokeWidth: 2,
                      strokeColor: "#076382",
                      fillColor: "#076382",
                    },
                  },

                  {
                    punto_1: [2.57, 1.52],
                    punto_2: [2.71, 0.21],
                    stylesLine: {
                      strokeWidth: 2,
                      strokeColor: "#076382",
                      fillColor: "#076382",
                    },

                    stylesPoint_1: {
                      visible: true,
                      strokeWidth: 3,
                      strokeColor: "#076382",
                      fillColor: "#076382",
                    },
                  },
                ],

                points: [
                  {
                    x: -1.2,
                    y: 1.32,
                    stylesPoint: {
                      visible: true,
                      fixed: true,
                      fillColor: "#076382",
                      strokeColor: "#076382",
                    },
                  },
                ],

                texto: [
                  {
                    x: -2.1,
                    y: -0.6,
                    mensaje: "A un arco se le asocia un vértice.",
                    stylesText: {
                      cssClasses: "text_figure_2",
                    },
                  },
                  {
                    x: -1.5,
                    y: 2.3,
                    mensaje: "Arco",
                    stylesText: {
                      cssClasses: "text_figure_2",
                    },
                  },
                  {
                    x: 1.8,
                    y: 2.3,
                    mensaje: "Vértice",
                    stylesText: {
                      cssClasses: "text_figure_2",
                    },
                  },
                  {
                    x: -2.7,
                    y: -1.4,
                    mensaje: "Trazar dos segmentos a partir del centro",
                    stylesText: {
                      cssClasses: "text_figure_2",
                    },
                  },
                  {
                    x: -2.5,
                    y: -2.1,
                    mensaje: "del arco, hacia sus puntos extremos",
                    stylesText: {
                      cssClasses: "text_figure_2",
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

    lexico_4: {
      nodo: [
        {
          texto: "<b>Copia de vértices</b>",
          atributos: {style: "text-align:center;font-size:25px;"},
        },

        {
          texto:
            "Los arcos que pasan por B tienen sus centros en O y A. Sus radios son OB y AB. Se utilizaron esas aperturas desde O´ y A´ para trazar dos arcos. El punto de corte de esos dos arcos es B´. El segmento O´B´ es el homólogo a OB.",
          atributos: {style: "text-align:justify;"},
        },
      ],

      recursos: [
        {
          recurso: {
            styles: {
              boundingbox: [-3, 3, 3, -3],
              axies: {
                y: {visible: false},
                x: {visible: false},
              },
            },
            styleRecurso: ["lexico_example_figure_large"],
            grafico: [
              {
                ellipse: [
                  {
                    punto_1: [-2.2, 2],
                    punto_2: [-1.65, 1.12],
                    punto_3: [-1.27, -0.25],

                    type: "circumcirclearc",

                    styles: {strokeColor: "#91c2d2"},
                  },

                  {
                    punto_1: [-2.12, 0.18],
                    punto_2: [-1.49, 1.47],
                    punto_3: [-1.14, 1.83],

                    type: "circumcirclearc",

                    styles: {strokeColor: "#91c2d2"},
                  },

                  {
                    punto_1: [1.07, -0.56],
                    punto_2: [1.68, 0.43],
                    punto_3: [2.26, 0.86],

                    type: "circumcirclearc",

                    styles: {strokeColor: "#91c2d2"},

                    stylesPoint_2: {
                      visible: true,
                      fixed: true,
                      strokeColor: "#076382",
                      fillColor: "#076382",
                    },
                  },

                  {
                    punto_1: [1.32, 1.18],
                    punto_2: [1.68, 0.43],
                    punto_3: [2.07, -0.67],

                    type: "circumcirclearc",

                    styles: {strokeColor: "#91c2d2"},
                  },
                ],

                texto: [
                  {
                    x: -2.5,
                    y: -2.3,
                    mensaje: "O",
                    stylesText: {cssClasses: "text_figure"},
                  },

                  {
                    x: -1.2,
                    y: -2.3,
                    mensaje: "A",
                    stylesText: {cssClasses: "text_figure"},
                  },

                  {
                    x: 0.6,
                    y: -2.35,
                    mensaje: "O´",
                    stylesText: {cssClasses: "text_figure"},
                  },

                  {
                    x: 2,
                    y: -2.3,
                    mensaje: "A´",
                    stylesText: {cssClasses: "text_figure"},
                  },

                  {
                    x: 1.62,
                    y: 1,
                    mensaje: "B´",
                    stylesText: {cssClasses: "text_figure"},
                  },

                  {
                    x: -1.75,
                    y: 1.7,
                    mensaje: "B",
                    stylesText: {cssClasses: "text_figure"},
                  },

                  {
                    x: -0.5,
                    y: 0.5,
                    mensaje: "Trace O´B´",
                    stylesText: {cssClasses: "text_figure"},
                  },
                ],

                linea: [
                  {
                    punto_1: [-2.27, -1.76],
                    punto_2: [-1.14, -1.76],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                  },

                  {
                    punto_1: [0.82, -1.76],
                    punto_2: [1.95, -1.76],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                  },

                  {
                    punto_1: [-2.25, -1.76],
                    punto_2: [-1.67, 1.2],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
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
      description: "<h3>Vértices: partes</h3>",

      board: "board_1",
      tools: [
        {
          tag: "form",
          style: {form: "formFigureTools"},
          value: "<p>El <b>Lado 2</b> es el segmento <b>OB</b>.<br><b>El Lado 1</b> es el segmento:</p>",
          inputs: [{style: "inputFigure"}],
        },
        {
          tag: "form",
          style: {form: "formFigureTools"},
          value: "<p>La <b>punta o esquina</b> es el punto:</p>",
          inputs: [{style: "inputFigure"}],
        },
      ],
      conditions: {
        inputs: [["oa"], ["o"]],
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
