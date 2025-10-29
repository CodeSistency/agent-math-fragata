const defBoards = {
  board_1: {
    artifact: "artifact_1",
    buttonInteraction: true,
    maxLinesClick: 3,
    Interaction: {
      type: "Compass",
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
    // maxLinesClick:3,
    shapes: [
      {
        type: "circle",
        refPt: ["point_A", "point_B"],
        ref: "circle_tagent_0",

        points: [
          {
            x: -2,
            y: 0,
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
            x: -2,
            y: 1.5,
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
        ref: "circle_tagent_1",

        points: [
          {
            x: 1.6,
            y: 0,
            ref: "point_E",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "B",
              label: {offset: [-3, -14]},
            },
          },
          {
            x: 2,
            y: 2,
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
    ],
  },
  board_2: {
    artifact: "artifact_2",
    buttonInteraction: true,
    Interaction: {
      type: "Segment",
      compass: {
        lengthCompass: 6,
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
        ref: "circle_tagent_0",

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
              label: {offset: [-4, -14]},
            },
          },
          {
            x: 0,
            y: 2,
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
        },
      },
      {
        points: [
          {
            x: 0,
            y: -2,
            ref: "point_L",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 2,
            y: 0,
            ref: "point_M",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: -2,
            y: 0,
            ref: "point_N",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
      },
      {
        type: "circle",
        refPt: ["point_C", "point_M"],
        ref: "circle_tagent_1",

        points: [
          {
            x: 6,
            y: 0,
            ref: "point_C",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -14]},
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
        },
      },
      {
        type: "circle",
        refPt: ["point_F", "point_N"],
        ref: "circle_tagent_2",

        points: [
          {
            x: -6,
            y: 0,
            ref: "point_F",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -14]},
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
        },
      },
      {
        type: "circle",
        refPt: ["point_H", "point_B"],
        ref: "circle_tagent_3",

        points: [
          {
            x: 0,
            y: 6,
            ref: "point_H",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -14]},
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
        },
      },
      {
        type: "circle",
        refPt: ["point_J", "point_L"],
        ref: "circle_tagent_4",

        points: [
          {
            x: 0,
            y: -6,
            ref: "point_J",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -14]},
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
        },
      },
    ],
  },
  board_3: {
    artifact: "artifact_3",
    buttonSegment: true,
    Interaction: {
      type: "Segment",
      compass: {
        lengthCompass: 4,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 0,
    shapes: [
      {
        type: "circle",
        refPt: ["point_A", "point_B"],

        points: [
          {
            x: 0,
            y: 0,
            ref: "point_A",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -14]},
            },
          },
          {
            x: 0,
            y: 2,
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
        },
      },
      {
        points: [
          {
            x: 0,
            y: -2,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 2,
            y: 0,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: -2,
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
        ],
      },
    ],
  },
  board_4: {
    artifact: "artifact_4",
    Interaction: {
      type: "Compass",
      compass: {
        lengthCompass: 4,
        circlesConcentricSuperPosition: false,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 0,
    shapes: [
      {
        points: [
          {
            x: -2.5,
            y: 2.5,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: -2.5,
            y: -2.5,
            ref: "point_B",
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
            y: -2.5,
            ref: "point_C",
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
            y: 2.5,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: 0,
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
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            ref: "segment_AB",
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_A", "point_D"],
            ref: "segment_AD",
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_A", "point_C"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_D", "point_B"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_B", "point_C"],
            ref: "segment_BC",
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_C", "point_D"],
            ref: "segment_CD",
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
      description:
        "En cada figura trace todas las rectas que son tangentes a los dos círculos.",

      board: "board_1",
      conditions: {
        tangents_lines: [
          {
            lines: ["line_tagent_0"],
            circles: ["circle_tagent_0", "circle_tagent_1"],
          },
          {
            lines: ["line_tagent_1"],
            circles: ["circle_tagent_0", "circle_tagent_1"],
          },
          {
            lines: ["line_tagent_2"],
            circles: ["circle_tagent_0", "circle_tagent_1"],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_2: {
      board: "board_2",
      tools: [
        {
          tag: "form",
          containerTop: true,
          maxElementCheck: 2, // Máximo número de checkboxes permitidos
          style: {form: "formfigureTop"},
          value: "Tangentes al circulo por los cuatro puntos.",
        },
        {
          tag: "form",
          maxElementCheck: 2, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value: "Circunferencia inscrita en un cuadrado",
        },
      ],
      conditions: {
        tangents_lines: [
          {
            lines: [
              "line_tagent_0",
              "line_tagent_1",
              "line_tagent_2",
              "line_tagent_3",
            ],
            circles: ["circle_tagent_0", "circle_tagent_1"],
          },
          {
            lines: [
              "line_tagent_0",
              "line_tagent_1",
              "line_tagent_2",
              "line_tagent_3",
            ],
            circles: ["circle_tagent_0", "circle_tagent_2"],
          },
          {
            lines: [
              "line_tagent_0",
              "line_tagent_1",
              "line_tagent_2",
              "line_tagent_3",
            ],
            circles: ["circle_tagent_0", "circle_tagent_3"],
          },
          {
            lines: [
              "line_tagent_0",
              "line_tagent_1",
              "line_tagent_2",
              "line_tagent_3",
            ],
            circles: ["circle_tagent_0", "circle_tagent_4"],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_3: {
      board: "board_3",
      tools: [
        {
          tag: "form",
          containerTop: true,
          maxElementCheck: 2, // Máximo número de checkboxes permitidos
          style: {form: "formfigureTop"},
          value: "Unir los cuatros puntos con segmentos.",
        },
        {
          tag: "form",
          maxElementCheck: 2, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value: "Circunferencia circunscrita al cuadrado",
        },
      ],
      conditions: {
        lines: [
          {
            points: [
              [
                [0, 2],
                [2, 0],
              ],
              [
                [0, 2],
                [-2, 0],
              ],
              [
                [0, -2],
                [-2, 0],
              ],
              [
                [0, -2],
                [2, 0],
              ],
            ],
            refLn: ["line_segment_0"],
          },
          {
            points: [
              [
                [0, 2],
                [2, 0],
              ],
              [
                [0, 2],
                [-2, 0],
              ],
              [
                [0, -2],
                [-2, 0],
              ],
              [
                [0, -2],
                [2, 0],
              ],
            ],
            refLn: ["line_segment_1"],
          },
          {
            points: [
              [
                [0, 2],
                [2, 0],
              ],
              [
                [0, 2],
                [-2, 0],
              ],
              [
                [0, -2],
                [-2, 0],
              ],
              [
                [0, -2],
                [2, 0],
              ],
            ],
            refLn: ["line_segment_2"],
          },
          {
            points: [
              [
                [0, 2],
                [2, 0],
              ],
              [
                [0, 2],
                [-2, 0],
              ],
              [
                [0, -2],
                [-2, 0],
              ],
              [
                [0, -2],
                [2, 0],
              ],
            ],
            refLn: ["line_segment_3"],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_4: {
      board: "board_4",
      tools: [
        {
          tag: "form",
          style: {form: "formFigure2"},
          value: "Trace dos círculos <br> El inscrito y el circunscrito.",
        },
      ],
      conditions: {
        circles: [
          [0, 0, 3.6, 0.1],
          [0, 0, 2.5, 0.1],
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
