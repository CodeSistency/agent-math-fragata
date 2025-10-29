const defBoards = {
  board_1: {
    artifact: "artifact_1",
    buttonSegment: true,

    Interaction: {
      type: "Segment",
      compass: {
        lengthCompass: 3,
        position: [
          [0, 0], // Centro para baseCompas
          [1.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-1.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    shapes: [
      {
        type: "arc",
        refPt: ["point_A", "point_B", "point_C"],
        ref: "circle_tagent_0",
        points: [
          {
            x: 3.4,
            y: -0.35,
            ref: "point_A",
            style: {visible: true, fixed: true, size: 2, name: ""},
          },
          {
            x: 1.4,
            y: 1.35,
            ref: "point_B",
            style: {visible: true, fixed: true, size: 2, name: ""},
          },
          {
            x: 5.7,
            y: -1.6,
            ref: "point_C",
            style: {visible: true, fixed: true, size: 2, name: ""},
          },
        ],

        style: {
          fixed: true,
          strokeColor: "#3d348b",
          highlight: false,
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 1,
        },
      },
      {
        type: "arc",
        refPt: ["point_Z", "point_X", "point_M"],
        ref: "circle_tagent_2",
        points: [
          {
            x: -3.6,
            y: -0.35,
            ref: "point_Z",
            style: {visible: true, fixed: true, size: 2, name: ""},
          },
          {
            x: -6.4,
            y: -0.2,
            ref: "point_X",
            style: {visible: true, fixed: true, size: 2, name: ""},
          },
          {
            x: -2,
            y: -2.6,
            ref: "point_M",
            style: {visible: true, fixed: true, size: 2, name: ""},
          },
        ],

        style: {
          fixed: true,
          strokeColor: "#3d348b",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 1,
          highlight: false,
        },
      },

      {
        points: [
          {
            x: 0,
            y: -6,
            ref: "point_F",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "A'",
              label: {offset: [4, -8]},
            },
          },
          {
            x: 0,
            y: 6,
            ref: "point_G",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O'",
              label: {offset: [3, 6]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_F", "point_G"],
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_2: {
    artifact: "artifact_2",
    buttonSegment: true,

    Interaction: {
      type: "Segment",
      compass: {
        lengthCompass: 3,
        position: [
          [0, 0], // Centro para baseCompas
          [1.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-1.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    shapes: [
      {
        type: "arc",
        refPt: ["point_A", "point_B", "point_C"],
        ref: "circle_tagent_0",
        points: [
          {
            x: 2,
            y: -0.35,
            ref: "point_A",
            style: {visible: true, fixed: true, size: 2, name: ""},
          },
          {
            x: 5.8,
            y: -1.2,
            ref: "point_B",
            style: {visible: true, fixed: true, size: 2, name: ""},
          },
          {
            x: 5.6,
            y: 1,
            ref: "point_C",
            style: {visible: true, fixed: true, size: 2, name: ""},
          },
        ],

        style: {
          fixed: true,
          strokeColor: "#3d348b",
          highlight: false,
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 1,
        },
      },
      {
        type: "arc",
        refPt: ["point_Z", "point_X", "point_M"],
        ref: "circle_tagent_2",
        points: [
          {
            x: -3.6,
            y: -0.35,
            ref: "point_Z",
            style: {visible: true, fixed: true, size: 2, name: ""},
          },
          {
            x: -1.5,
            y: 1,
            ref: "point_X",
            style: {visible: true, fixed: true, size: 2, name: ""},
          },
          {
            x: -1.3,
            y: -1.2,
            ref: "point_M",
            style: {visible: true, fixed: true, size: 2, name: ""},
          },
        ],

        style: {
          fixed: true,
          strokeColor: "#3d348b",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 1,
          highlight: false,
        },
      },
      {
        points: [
          {
            x: 0,
            y: -6,
            ref: "point_F",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "A'",
              label: {offset: [4, -8]},
            },
          },
          {
            x: 0,
            y: 6,
            ref: "point_G",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O'",
              label: {offset: [3, 6]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_F", "point_G"],
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
    createInpForPnt: true,
    maxMathfield: 1,
    maxLinesClick: 1,

    Interaction: {
      type: "Compass",
      compass: {
        lengthCompass: 4,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    shapes: [
      {
        points: [
          {
            x: -5,
            y: -1,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: -3,
            y: 1.2,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [4, 6]},
            },
          },
          {
            x: -2,
            y: -1,
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
            x: 2,
            y: -1,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O'",
              label: {offset: [-8, -8]},
            },
          },
          {
            x: 4,
            y: 1.2,
            ref: "point_E",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B'",
              label: {offset: [4, 6]},
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
            refPt: ["point_A", "point_C"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_D", "point_E"],
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_4: {
    artifact: "artifact_4",
    buttonInteraction: true,
    createInpForPnt: true,
    maxMathfield: 1,
    maxLinesClick: 1,
    Interaction: {
      type: "Compass",
      compass: {
        isStatic: false,
        lengthCompass: 4,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    shapes: [
      {
        points: [
          {
            x: -5,
            y: -1,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: -3,
            y: 1.2,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [4, 6]},
            },
          },
          {
            x: -2,
            y: -1,
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
            x: 4.2,
            y: -1,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B'",
              label: {offset: [4, -8]},
            },
          },
          {
            x: 2,
            y: 1.8,
            ref: "point_E",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O'",
              label: {offset: [-10, 6]},
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
            refPt: ["point_A", "point_C"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_D", "point_E"],
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_5: {
    artifact: "artifact_5",
    buttonInteraction: true,
    createInpForPnt: true,
    maxMathfield: 1,
    maxLinesClick: 1,
    Interaction: {
      type: "Compass",
      compass: {
        isStatic: false,
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
        points: [
          {
            x: -5,
            y: -1,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: -2,
            y: 2,
            ref: "point_B",
            style: {
              visible: true,
              fixed: false,
              size: 0,
              name: "B",
              label: {offset: [4, 6]},
            },
          },
          {
            x: -3,
            y: -2,
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
            y: -1,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O'",
              label: {offset: [4, -8]},
            },
          },
          {
            x: 4,
            y: 1,
            ref: "point_E",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "A'",
              label: {offset: [3, 6]},
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
            refPt: ["point_A", "point_C"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_D", "point_E"],
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_6: {
    artifact: "artifact_6",
    buttonInteraction: true,
    createInpForPnt: true,
    maxMathfield: 1,
    maxLinesClick: 1,
    Interaction: {
      type: "Compass",
      compass: {
        isStatic: false,
        lengthCompass: 4,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    shapes: [
      {
        points: [
          {
            x: -5,
            y: -1,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: -3,
            y: 2,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [4, 6]},
            },
          },
          {
            x: -3,
            y: -2,
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
            x: 2,
            y: -1,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "A'",
              label: {offset: [4, -8]},
            },
          },
          {
            x: 3,
            y: 1,
            ref: "point_E",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O'",
              label: {offset: [3, 6]},
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
            refPt: ["point_A", "point_C"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_D", "point_E"],
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

      conditions: {
        lines: [
          {
            points: [
              [
                [-6.4, -0.2],
                [-3.6, -0.4],
              ],
              [
                [-2, -2.6],
                [-3.6, -0.4],
              ],
              //
              [
                [3.4, -0.35],
                [1.4, 1.35],
              ],
              [
                [3.4, -0.35],
                [5.7, -1.6],
              ],
            ],
            refLn: ["line_segment_0"],
          },
          {
            points: [
              [
                [-6.4, -0.2],
                [-3.6, -0.4],
              ],
              [
                [-2, -2.6],
                [-3.6, -0.4],
              ],
              //
              [
                [3.4, -0.35],
                [1.4, 1.35],
              ],
              [
                [3.4, -0.35],
                [5.7, -1.6],
              ],
            ],
            refLn: ["line_segment_1"],
          },
          {
            points: [
              [
                [-6.4, -0.2],
                [-3.6, -0.4],
              ],
              [
                [-2, -2.6],
                [-3.6, -0.4],
              ],
              //
              [
                [3.4, -0.35],
                [1.4, 1.35],
              ],
              [
                [3.4, -0.35],
                [5.7, -1.6],
              ],
            ],
            refLn: ["line_segment_2"],
          },
          {
            points: [
              [
                [-6.4, -0.2],
                [-3.6, -0.4],
              ],
              [
                [-2, -2.6],
                [-3.6, -0.4],
              ],
              //
              [
                [3.4, -0.35],
                [1.4, 1.35],
              ],
              [
                [3.4, -0.35],
                [5.7, -1.6],
              ],
            ],
            refLn: ["line_segment_3"],
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
          value: "<b>¿Los vértices de los últimos ejercicios se parecen?</b>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
        {
          tag: "form",
          maxElementCheck: 2, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value:
            'Los arcos de los últimos ejercicios son complementarios en el sentido que unidos, dan una circunferencia completa, por ello sus vértices se parecen. De hecho son "iguales".',
        },
      ],
      conditions: {
        lines: [
          {
            points: [
              [
                [-3.6, -0.35],
                [-1.5, 1],
              ],
              [
                [-3.6, -0.35],
                [-1.3, -1.2],
              ],
              //
              [
                [2, -0.35],
                [5.5, 1],
              ],
              [
                [2, -0.35],
                [5.8, -1.2],
              ],
            ],
            refLn: ["line_segment_0"],
          },
          {
            points: [
              [
                [-3.6, -0.35],
                [-1.5, 1],
              ],
              [
                [-3.6, -0.35],
                [-1.3, -1.2],
              ],
              //
              [
                [2, -0.35],
                [5.5, 1],
              ],
              [
                [2, -0.35],
                [5.8, -1.2],
              ],
            ],
            refLn: ["line_segment_1"],
          },
          {
            points: [
              [
                [-3.6, -0.35],
                [-1.5, 1],
              ],
              [
                [-3.6, -0.35],
                [-1.3, -1.2],
              ],
              //
              [
                [2, -0.35],
                [5.5, 1],
              ],
              [
                [2, -0.35],
                [5.8, -1.2],
              ],
            ],
            refLn: ["line_segment_2"],
          },
          {
            points: [
              [
                [-3.6, -0.35],
                [-1.5, 1],
              ],
              [
                [-3.6, -0.35],
                [-1.3, -1.2],
              ],
              //
              [
                [2, -0.35],
                [5.5, 1],
              ],
              [
                [2, -0.35],
                [5.8, -1.2],
              ],
            ],
            refLn: ["line_segment_3"],
          },
        ],
        inputs: [{checks: ["Sí"]}],
      },
      engine: engineFigure,
    },

    artifact_3: {
      description:
        "Copie los vértices sobre los segmentos que aparecen al lado.",
      board: "board_3",

      conditions: {
        lines: [
          {
            points: [
              [
                [2.1, -1],
                [5, -1],
              ],
            ],
            noise: [0.3, 0.2],
            refLn: ["line_tagent_0"],
          },
        ],
        inputs: [{position: [[5, -0.92, ["a^{\\prime}"]]]}],
      },
      engine: engineFigure,
    },
    artifact_4: {
      board: "board_4",
      description:
        "Copie los vértices sobre los segmentos que aparecen al lado.",

      conditions: {
        lines: [
          {
            points: [
              [
                [2, -1.8],
                [1.9, 1.6],
              ],
            ],
            noise: [0.2, 0.3],
            refLn: ["line_tagent_0"],
          },
        ],
        inputs: [{position: [[2, -1.7, ["a^{\\prime}"]]]}],
      },
      engine: engineFigure,
    },
    artifact_5: {
      board: "board_5",
      description:
        "Copie los vértices sobre los segmentos que aparecen al lado.",

      conditions: {
        lines: [
          {
            points: [
              [
                [0, 2],
                [3, -1],
              ],
            ],
            noise: [0.2, 0.3],
            refLn: ["line_tagent_0"],
          },
        ],
        inputs: [{position: [[0, 2, ["b^{\\prime}"]]]}],
      },
      engine: engineFigure,
    },
    artifact_6: {
      board: "board_6",
      description:
        "Copie los vértices sobre los segmentos que aparecen al lado.",

      conditions: {
        lines: [
          {
            points: [
              [
                [3, 1],
                [6, -1],
              ],
            ],
            noise: [0.2, 0.3],
            refLn: ["line_tagent_0"],
          },
        ],
        inputs: [{position: [[6, -1, ["b^{\\prime}"]]]}],
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
