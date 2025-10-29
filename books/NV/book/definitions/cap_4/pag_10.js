const defBoards = {
  board_1: {
    artifact: "artifact_1",
    buttonSegment: true,
    Interaction: {
      type: "Segment",
      compass: {
        lengthCompass: 5,
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
        refPt: ["point_A", "point_B"],
        points: [
          {
            x: -5.7,
            y: -3,
            ref: "point_O",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "O",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: -3.4,
            y: 0.7,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "B",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: -3,
            y: -3.7,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "A",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 4.8,
            y: 4.5,
            ref: "point_B'",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "B´",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 2.5,
            y: 0.9,
            ref: "point_O'",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "O´",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: 5.7,
            y: 0.2,
            ref: "point_A'",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "A´",
              label: {offset: [-4, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_O", "point_A"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_B", "point_O"],
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_B", "point_B'"],
            style: {strokewidth: 3, dash: 3},
            type: "segment",
          },
          {
            refPt: ["point_O", "point_O'"],
            style: {strokewidth: 2, lastArrow: true},
            type: "segment",
          },
          {
            refPt: ["point_A", "point_A'"],
            style: {strokewidth: 3, dash: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_2: {
    artifact: "artifact_2",
    createInpForPnt: true,
    maxMathfield: 2,
    withMathfield: true,
    buttonSegment: false,
    buttonInteraction: true,
    Interaction: {
      type: "Segment",
      compass: {
        lengthCompass: 5,
        circlesConcentricSuperPosition: false,
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
        refPt: ["point_A", "point_B"],

        points: [
          {
            x: -5.7,
            y: -3,
            ref: "point_O",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: -6.16,
            y: 0.34,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [-4, 15]},
            },
          },
          // { x: -6.25, y: 1.56, ref: "point_D", style: { fillOpacity: 0, strokeOpacity:0, visible: true, fixed: true, size: 3, name: 'B', label: { offset: [-4, -15]} } },
          {
            x: -3,
            y: -3.7,
            ref: "point_A",
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
            y: 1.5,
            ref: "point_O'",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O´",
              label: {offset: [-5, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_O", "point_A"],
            ref: "line_tagent_0",
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_B", "point_O"],
            ref: "line_tagent_1",
            style: {strokewidth: 3},
            type: "segment",
          },

          {
            refPt: ["point_O", "point_O'"],
            ref: "line_tagent_3",
            style: {strokewidth: 2, lastArrow: true},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_3: {
    artifact: "artifact_3",
    createInpForPnt: true,
    buttonInteraction: true,
    maxMathfield: 2,
    maxLinesClick: 2,
    Interaction: {
      type: "Compass",
      compass: {
        lengthCompass: 5,
        circlesConcentricSuperPosition: false,
        position: [
          [0, 0], // Centro para baseCompas
          [1.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-1.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    shapes: [
      {
        refPt: ["point_A", "point_B"],

        points: [
          {
            x: -5.7,
            y: -3,
            ref: "point_O",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: -6.16,
            y: 0.34,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [-4, 15]},
            },
          },
          {
            x: -2,
            y: 2.3,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "A",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 2.5,
            y: -0.62,
            ref: "point_O'",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O´",
              label: {offset: [-5, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_O", "point_A"],
            ref: "line_tagent_0",
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_B", "point_O"],
            ref: "line_tagent_1",
            style: {strokewidth: 3},
            type: "segment",
          },

          {
            refPt: ["point_O", "point_O'"],
            ref: "line_tagent_2",
            style: {strokewidth: 2, lastArrow: true},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_4: {
    artifact: "artifact_4",
    createInpForPnt: true,
    buttonInteraction: true,
    maxMathfield: 2,
    maxLinesClick: 2,
    Interaction: {
      type: "Segment",
      compass: {
        lengthCompass: 5,
        circlesConcentricSuperPosition: false,
        position: [
          [0, 0], // Centro para baseCompas
          [1.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-1.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    shapes: [
      {
        points: [
          {
            x: -5.7,
            y: -3,
            ref: "point_O",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: -5.7,
            y: -0.5,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [-4, 15]},
            },
          },
          {
            x: -2.5,
            y: -3,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "A",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 0.6,
            y: -3,
            ref: "point_O'",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O'",
              label: {offset: [-5, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_O", "point_A"],
            ref: "line_tagent_0",
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_B", "point_O"],
            ref: "line_tagent_1",
            style: {strokewidth: 3},
            type: "segment",
          },

          {
            refPt: ["point_O", "point_O'"],
            ref: "line_tagent_3",
            style: {strokewidth: 2, lastArrow: true},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_5: {
    createInpForPnt: true,
    buttonInteraction: true,
    maxMathfield: 2,
    maxLinesClick: 2,
    Interaction: {
      type: "Segment",
      compass: {
        lengthCompass: 5,
        circlesConcentricSuperPosition: false,
        position: [
          [0, 0], // Centro para baseCompas
          [1.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-1.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    shapes: [
      {
        refPt: ["point_A", "point_B"],

        points: [
          {
            x: -3,
            y: -3,
            ref: "point_O",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: -5.8,
            y: -3,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 0,
            y: -3,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "A",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 1.5,
            y: -0.4,
            ref: "point_O'",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O´",
              label: {offset: [-5, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_O", "point_A"],
            ref: "line_tagent_0",
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_B", "point_O"],
            ref: "line_tagent_1",
            style: {strokewidth: 3},
            type: "segment",
          },

          {
            refPt: ["point_O", "point_O'"],
            ref: "line_tagent_3",
            style: {strokewidth: 2, lastArrow: true},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_6: {
    artifact: "artifact_6",
    createInpForPnt: true,
    buttonInteraction: true,
    maxMathfield: 2,
    maxLinesClick: 2,
    Interaction: {
      type: "Segment",
      compass: {
        lengthCompass: 5,
        circlesConcentricSuperPosition: false,
        position: [
          [0, 0], // Centro para baseCompas
          [1.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-1.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    shapes: [
      {
        refPt: ["point_A", "point_B"],

        points: [
          {
            x: -4.36,
            y: 1,
            ref: "point_O",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: -5.7,
            y: -1.3,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: -2.5,
            y: -3,
            ref: "point_A",
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
            y: 1,
            ref: "point_O'",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O´",
              label: {offset: [-5, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_O", "point_A"],
            ref: "line_tagent_0",
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_B", "point_O"],
            ref: "line_tagent_1",
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_O", "point_O'"],
            ref: "line_tagent_3",
            style: {strokewidth: 2, lastArrow: true},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_7: {
    artifact: "artifact_7",
    createInpForPnt: true,
    buttonInteraction: true,
    maxMathfield: 2,
    maxLinesClick: 2,
    Interaction: {
      type: "Segment",
      compass: {
        lengthCompass: 5,
        circlesConcentricSuperPosition: false,
        position: [
          [0, 0], // Centro para baseCompas
          [1.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-1.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    shapes: [
      {
        refPt: ["point_A", "point_B"],

        points: [
          {
            x: 0.84,
            y: -3,
            ref: "point_O",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: -5.04,
            y: -3,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 4.88,
            y: -3,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "A",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 0.82,
            y: 2.32,
            ref: "point_O'",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O'",
              label: {offset: [-4, 15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_O", "point_A"],
            ref: "line_tagent_0",
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_B", "point_O"],
            ref: "line_tagent_1",
            style: {strokewidth: 3},
            type: "segment",
          },

          {
            refPt: ["point_O", "point_O'"],
            ref: "line_tagent_3",
            style: {strokewidth: 2, lastArrow: true},
            type: "segment",
          },
        ],
      },
    ],
  },
};

const allDef = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      board: "board_1",
      description: "Traslación de vértices ",
      conditions: [],
      engine: engineFigure,
      tools: [
        {
          tag: "form",
          containerTop: true,
          style: {form: "formfigureTop column"},
          value:
            "Utilizando la apertura del compás compare la longitud de los segmentos BB´, OO´, AA´",

          spans: [
            {
              value: "¿Son iguales?",
              select: true,
              default: [{valor: "selecciona"}, {valor: "Si"}, {valor: "No"}],
              style: {select: "selectFigure", span: "spanRowFigure"},
            },
          ],
        },
        {
          tag: "form",
          style: {form: "formFigureTools"},
          value: "Trace los segmentos O´B´, O´A´",

          spans: [
            {
              value: "¿O´A´ es paralelo a OA?",
              select: true,
              default: [{valor: "selecciona"}, {valor: "Si"}, {valor: "No"}],
              style: {select: "selectFigure", span: "spanRowFigure"},
            },

            {
              value: "¿O´B´ es paralelo a OB?",
              select: true,
              default: [{valor: "selecciona"}, {valor: "Si"}, {valor: "No"}],
              style: {select: "selectFigure", span: "spanRowFigure"},
            },
          ],
        },
        {
          tag: "form",
          style: {form: "formFigureTools"},
          spans: [
            {
              value:
                "Verificar mediante el compás, que <br> Long(O´B´)= Long(OB) y Long(O´A´)= Long (OA). <br> <br> El vértice B´O´A´ es una <b>copia</b> del vértice BOA obtenida por la <b>traslación</b> definida po OO´.",
            },
          ],
        },
      ],
      conditions: {
        inputs: [["no"], ["si"], ["si"]],
        lines: [
          {
            points: [
              [
                [2.5, 0.9],
                [5.5, 0.2],
              ],
              [
                [4.8, 4.5],
                [2.5, 0.9],
              ],
            ],
            refLn: ["line_segment_0"],
          },

          {
            points: [
              [
                [2.5, 0.9],
                [5.5, 0.2],
              ],
              [
                [4.8, 4.5],
                [2.5, 0.9],
              ],
            ],
            refLn: ["line_segment_1"],
          },
        ],
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
                [2.8, 1.5],
                [5.6, 0.8],
              ],
              [
                [2.8, 1.5],
                [2.2, 4.4],
              ],
            ],
            refLn: ["line_tagent_0"],
          },
          {
            points: [
              [
                [2.8, 1.5],
                [2.2, 4.4],
              ],
              [
                [2.8, 1.5],
                [5.6, 0.8],
              ],
            ],
            refLn: ["line_tagent_1"],
          },
        ],
        inputs: [
          {
            position: [
              [2.2, 4.4, ["b^{\\prime}"]],
              [5.6, 0.8, ["a^{\\prime}"]],
            ],
          },
          {
            position: [
              [2.2, 4.4, ["b^{\\prime}"]],
              [5.6, 0.8, ["a^{\\prime}"]],
            ],
          },
        ],
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
                [1.6, 2.5],
                [2.5, -0.6],
              ],
              [
                [2.5, -0.6],
                [5.7, 4.3],
              ],
            ],
            refLn: ["line_tagent_0"],
          },
          {
            points: [
              [
                [1.6, 2.5],
                [2.5, -0.6],
              ],
              [
                [2.5, -0.6],
                [5.7, 4.3],
              ],
            ],
            refLn: ["line_tagent_1"],
          },
        ],
        inputs: [
          {
            position: [
              [1.6, 2.5, ["b^{\\prime}"]],
              [5.7, 4.3, ["a^{\\prime}"]],
            ],
          },
          {
            position: [
              [1.6, 2.5, ["b^{\\prime}"]],
              [5.7, 4.3, ["a^{\\prime}"]],
            ],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_4: {
      board: "board_4",
      conditions: {
        lines: [
          {
            points: [
              [
                [0.7, -0.6],
                [0.6, -3],
              ],
              [
                [0.6, -3],
                [3.9, -3],
              ],
            ],
            refLn: ["line_tagent_0"],
          },
          {
            points: [
              [
                [0.7, -0.6],
                [0.6, -3],
              ],
              [
                [0.6, -3],
                [3.9, -3],
              ],
            ],
            refLn: ["line_tagent_1"],
          },
        ],
        inputs: [
          {
            position: [
              [0.7, -0.6, ["b^{\\prime}"]],
              [3.9, -3, ["a^{\\prime}"]],
            ],
          },
          {
            position: [
              [0.7, -0.6, ["b^{\\prime}"]],
              [3.9, -3, ["a^{\\prime}"]],
            ],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_5: {
      board: "board_5",
      conditions: {
        lines: [
          {
            points: [
              [
                [-1.5, -0.6],
                [1.3, -0.6],
              ],
              [
                [4.1, -0.6],
                [1.3, -0.6],
              ],
            ],
            refLn: ["line_tagent_0"],
          },
          {
            points: [
              [
                [-1.5, -0.6],
                [1.3, -0.6],
              ],
              [
                [4.1, -0.6],
                [1.3, -0.6],
              ],
            ],
            refLn: ["line_tagent_1"],
          },
        ],
        inputs: [
          {
            position: [
              [-1.5, -0.6, ["b^{\\prime}"]],
              [4.1, -0.6, ["a^{\\prime}"]],
            ],
          },
          {
            position: [
              [-1.5, -0.6, ["b^{\\prime}"]],
              [4.1, -0.6, ["a^{\\prime}"]],
            ],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_6: {
      board: "board_6",
      conditions: {
        lines: [
          {
            points: [
              [
                [0.8, -1.2],
                [2, 1],
              ],
              [
                [4, -3],
                [2, 1],
              ],
            ],
            refLn: ["line_tagent_0"],
          },
          {
            points: [
              [
                [0.8, -1.2],
                [2, 1],
              ],
              [
                [4, -3],
                [2, 1],
              ],
            ],
            refLn: ["line_tagent_1"],
          },
        ],
        inputs: [
          {
            position: [
              [0.8, -1.2, ["b^{\\prime}"]],
              [4, -3, ["a^{\\prime}"]],
            ],
          },
          {
            position: [
              [0.8, -1.2, ["b^{\\prime}"]],
              [4, -3, ["a^{\\prime}"]],
            ],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_7: {
      board: "board_7",
      conditions: {
        lines: [
          {
            points: [
              [
                [-5, 2],
                [0.7, 2],
              ],
              [
                [5, 2],
                [0.7, 2],
              ],
            ],
            refLn: ["line_tagent_0"],
          },
          {
            points: [
              [
                [-5, 2],
                [0.7, 2],
              ],
              [
                [5, 2],
                [0.7, 2],
              ],
            ],
            refLn: ["line_tagent_1"],
          },
        ],
        inputs: [
          {
            position: [
              [-5, 2, ["b^{\\prime}"]],
              [5, 2, ["a^{\\prime}"]],
            ],
          },
          {
            position: [
              [-5, 2, ["b^{\\prime}"]],
              [5, 2, ["a^{\\prime}"]],
            ],
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

const contentMain = new CreateView(allDef, defBoards);
