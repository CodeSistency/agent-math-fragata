const defBoards = {
  board_1: {
    artifact: "artifact_1",
    // styles:{
    //   axis:false,
    // },
    // styles:{
    //   axis:false,
    // },
    Interaction: {
      type: "Compass",
      compass: "none",
      compass: {
        // isStatic:true,
        // isStatic:true,
        lengthCompass: 4,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 2,
    buttonInteraction: true,

    shapes: [
      {
        type: "circle",
        refPt: ["point_A", "point_B"],
        ref: "circle_evaluate_0",
        ref: "circle_evaluate_0",

        points: [
          {
            x: 0,
            y: 0,
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
            x: 0,
            y: 2.5,
            ref: "point_B",
            style: {
              visible: true,
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
          highlight: false,
        },
      },
      {
        points: [
          {
            x: -4.5,
            y: 2.5,
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
            x: 4.5,
            y: 2.5,
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
            x: -2.5,
            y: 0,
            ref: "point_E",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: 2.5,
            y: 0,
            ref: "point_F",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_C", "point_D"],
            ref: "line_Evaluate_0",
            style: {strokewidth: 3},
            type: "segment",
          },

          {
            refPt: ["point_C", "point_D"],
            ref: "line_Evaluate_0",
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
      {
        type: "circle",
        refPt: ["point_H", "point_G"],
        ref: "circle_tagent_1",

        points: [
          {
            x: 2.5,
            y: 0,
            ref: "point_G",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "G",
              label: {offset: [-1, -14]},
            },
          },
          {
            x: 12,
            y: 0,
            ref: "point_H",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "H",
              label: {offset: [8, -1]},
            },
          },
          {
            x: 12,
            y: 0,
            ref: "point_H",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "H",
              label: {offset: [8, -1]},
            },
          },
        ],
        style: {
          fixed: true,
          strokeColor: "transparent",
          strokeWidth: 3,
          highlight: false,
          fillColor: "transparent",
          fillOpacity: 5,
          highlight: false,
        },
      },
      {
        type: "circle",
        refPt: ["point_I", "point_E"],
        ref: "circle_tagent_2",

        refPt: ["point_I", "point_E"],
        ref: "circle_tagent_2",

        points: [
          {
            x: -12,
            y: 0,
            ref: "point_I",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "I",
              label: {offset: [-1, -14]},
            },
          },
          {
            x: -12,
            y: 0,
            ref: "point_I",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "I",
              label: {offset: [-1, -14]},
            },
          },
        ],
        style: {
          fixed: true,
          strokeColor: "transparent",
          highlight: false,
          strokeColor: "transparent",
          highlight: false,
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 5,
          highlight: false,
        },
      },
    ],
  },
  board_2: {
    artifact: "artifact_2",
    buttonInteraction: true,

    Interaction: {
      type: "Compass",
      compass: "none",
      compass: {
        lengthCompass: 4,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 1,
    shapes: [
      {
        type: "circle",
        refPt: ["point_A", "point_B"],
        ref: "circleEvaluate_0",
        points: [
          {
            x: -2,
            y: 0,
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
            x: 0.7,
            y: 0,
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
          highlight: false,
        },
      },
      {
        type: "circle",
        ref: "circleEvaluate_1",
        refPt: ["point_J", "point_K"],

        points: [
          {
            x: 1.8,
            y: -0.2,
            ref: "point_J",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-1, -14]},
            },
          },
          {
            x: 2.8,
            y: -0.2,
            ref: "point_K",
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
          strokeColor: "transparent",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 5,
          highlight: false,
        },
      },
      {
        points: [
          {
            x: -3.8,
            y: 4.2,
            ref: "point_C",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 5.5,
            y: -1.2,
            ref: "point_D",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: 4,
            y: -0.35,
            ref: "point_F",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "A",
              label: {offset: [0, 15]},
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
    buttonInteraction: true,

    Interaction: {
      type: "Compass",
      compass: "none",
      compass: {
        lengthCompass: 4,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 4,
    shapes: [
      {
        type: "circle",
        refPt: ["point_A", "point_B"],
        ref: "circleEvaluate_0",
        points: [
          {
            x: -3,
            y: 0,
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
            x: -1,
            y: 0,
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
          highlight: false,
        },
      },
      {
        type: "circle",
        ref: "circleEvaluate_1",
        refPt: ["point_J", "point_K"],

        points: [
          {
            x: 3,
            y: 0,
            ref: "point_J",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-1, -14]},
            },
          },
          {
            x: 1,
            y: 0,
            ref: "point_K",
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
          highlight: false,
        },
      },
    ],
  },
  board_4: {
    artifact: "artifact_4",
    buttonInteraction: true,

    Interaction: {
      type: "Compass",
      compass: "none",
      compass: {
        lengthCompass: 4,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 4,
    shapes: [
      {
        type: "circle",
        refPt: ["point_A", "point_B"],
        ref: "circleEvaluate_0",
        points: [
          {
            x: -3,
            y: 0,
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
            x: -1,
            y: 0,
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
          highlight: false,
        },
      },
      {
        type: "circle",
        ref: "circleEvaluate_1",
        refPt: ["point_J", "point_K"],

        points: [
          {
            x: 3,
            y: 0,
            ref: "point_J",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-1, -14]},
            },
          },
          {
            x: 0.2,
            y: 0,
            ref: "point_K",
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
          highlight: false,
        },
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
          texto: "Rectas tangentes a círculos",
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
            styleRecurso: ["lexico_example_figure"],
            grafico: [
              {
                linea: [
                  {
                    punto_1: [-1.73, -1.58],
                    punto_2: [1.13, 1.35],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [1.35, 1.37],
                    punto_2: [1.93, 0.53],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                  },
                ],
                texto: [
                  {
                    x: -0.5,
                    y: -0.6,
                    mensaje: "Tangente",
                    styleText: {rotate: 43, strokeColor: "#343a40"},
                  },
                  {
                    x: 1.5,
                    y: 1.6,
                    mensaje: "Tangente",
                    styleText: {rotate: -51, strokeColor: "#343a40"},
                  },
                ],
                circle: [
                  {
                    punto_1: [-1.82, -0.9],
                    punto_2: [-1.74, -0.42],
                    type: "circle",
                    stylesCircle: {strokeColor: "#91c2d2", strokeWidth: 2},
                  },
                  {
                    punto_1: [1.2, 0.66],
                    punto_2: [0.84, 0.33],
                    type: "circle",
                    stylesCircle: {strokeColor: "#91c2d2", strokeWidth: 2},
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
      description:
        "Complete con tangentes a la circunferencia en cada uno de los tres puntos.",

      board: "board_1",
      conditions: {
        tangents_lines: [
          {
            lines: ["line_tagent_1", "line_tagent_0"],
            circles: ["circle_tagent_0", "circle_tagent_1"],
          },
          {
            lines: ["line_tagent_0", "line_tagent_1"],
            circles: ["circle_tagent_0", "circle_tagent_2"],
          },
        ],
      },

      engine: engineFigure,
    },
    artifact_2: {
      description: "Trace la otra tangente al círculo que pasa por A.",
      board: "board_2",
      conditions: {
        tangents_lines: [
          {
            lines: ["line_tagent_0"],
            circles: ["circleEvaluate_0", "circleEvaluate_1"],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_3: {
      board: "board_3",
      description:
        "En cada figura trace todas las rectas que son tangentes a los dos círculos.",
      conditions: {
        tangents_lines: [
          {
            lines: ["line_tagent_0"],
            circles: ["circleEvaluate_0", "circleEvaluate_1"],
          },
          {
            lines: ["line_tagent_1"],
            circles: ["circleEvaluate_0", "circleEvaluate_1"],
          },
          {
            lines: ["line_tagent_2"],
            circles: ["circleEvaluate_0", "circleEvaluate_1"],
          },
          {
            lines: ["line_tagent_3"],
            circles: ["circleEvaluate_0", "circleEvaluate_1"],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_4: {
      board: "board_4",
      description:
        "En cada figura trace todas las rectas ue son tangentes a los dos círculos.",
      conditions: {
        tangents_lines: [
          {
            lines: ["line_tagent_0"],
            circles: ["circleEvaluate_0", "circleEvaluate_1"],
          },
          {
            lines: ["line_tagent_1"],
            circles: ["circleEvaluate_0", "circleEvaluate_1"],
          },
          {
            lines: ["line_tagent_2"],
            circles: ["circleEvaluate_0", "circleEvaluate_1"],
          },
          {
            lines: ["line_tagent_3"],
            circles: ["circleEvaluate_0", "circleEvaluate_1"],
          },
        ],
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
