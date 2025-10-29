const defBoards = {
  board_1: {
    artifact: "artifact_1",
    createInpForPnt: true,
    maxMathfield: 1,

    Interaction: {
      type: "Segment",
      compass: {
        lengthCompass: 4,
      },
    },
    // maxMathfield:1,
    shapes: [
      {
        points: [
          {
            x: -0.2,
            y: -1,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "A",
              label: {offset: [-1, -14]},
            },
          },
          {
            x: -2.3,
            y: -2,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "B",
              label: {offset: [-1, -8]},
            },
          },
          {
            x: -6,
            y: 3.3,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 2,
              name: "",
              label: {offset: [-1, -15]},
            },
          },
          {
            x: 6,
            y: -0.4,
            ref: "point_O",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "O",
              label: {offset: [-6, 7]},
            },
          },
          {
            x: 3,
            y: 0.6,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 2,
              name: "",
              label: {offset: [-1, -15]},
            },
          },
          {
            x: 1.7,
            y: 3.5,
            ref: "point_H",
            style: {
              visible: true,
              fixed: true,
              size: 2,
              name: "",
              label: {offset: [1, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            style: {strokewidth: 2},
            type: "segment",
          },
          {
            refPt: ["point_A", "point_H"],
            style: {strokewidth: 2},
            type: "segment",
          },
          {
            refPt: ["point_A", "point_O"],
            style: {strokewidth: 2},
            type: "segment",
          },
          {
            refPt: ["point_A", "point_D"],
            style: {strokewidth: 2},
            type: "segment",
          },
          {
            refPt: ["point_A", "point_C"],
            style: {strokewidth: 2},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_2: {
    artifact: "artifact_2",
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
    OnePoint:1,
    createInpForPnt: true,
    buttonSegment: true,
    buttonInteraction: true,
    maxLinesClick: 1,
    maxMathfield: 1,
    withMathfield: true,
    shapes: [
      {
        type: "circle",
        ref: "circleEvaluate_0",
        refPt: ["point_A", "point_B"],

        points: [
          {
            x: -5.72,
            y: -3.82,
            ref: "point_A",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "B",
              label: {offset: [-1, -14]},
            },
          },
          {
            x: 5.6,
            y: -2.06,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "A",
              label: {offset: [8, -1]},
            },
          },
        ],
        style: {
          fixed: true,
          strokeColor: "#076382",
          highlight: false,
          strokeWidth: 4,
          fillColor: "transparent",
          fillOpacity: 1,
        },
      },
      {
        points: [
          {
            x: -5.94,
            y: -2.06,
            ref: "point_O",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "O",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 3.9,
            y: 2.32,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "B",
              label: {offset: [6, 4]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_O", "point_D"],
            style: {strokewidth: 2},
            type: "segment",
          },
        ],
      },
    ],
  },
};
const def = {
  scrollNav: {
    lexico:
      '<h3>Comparación de longitudes de segmentos</h3> <p>La longitud o "tamaño" de <b>OB</b> se designa de forma abreviada como: <b>Long(OB)</b> Cuando dos segmentos producen la misma apertura el (mismo) compás, se dice que tienen igual longitud.',
  },
  artifacts: {
    // artifact_1: {
    //   board: "board_1",
    //   tools: [
    //     {
    //       tag: "form",
    //       style: {form: "formFigure2"},
    //       value:
    //         "<p>Marcar un punto <b>H</b> de manera que el segmento <b>AH</b> sea más grande que todos los que están en la figura.</p>",
    //     },
    //     {
    //       tag: "inputs",
    //       maxElementCheck: 1, // Máximo número de checkboxes permitidos
    //       style: {form: "formFigure2"},
    //       value:
    //         "<p>Entre los segmentos de la figura: <b>¿Existen dos de igual tamaño?</b></p>",
    //       inputs: [
    //         {
    //           style: {input: "inputTableCheck"},
    //           value: {label: "Si", input: ""},
    //           correctResponce: true,
    //         },
    //         {
    //           style: {input: "inputTableCheck"},
    //           value: {label: "No", input: ""},
    //         },
    //       ],
    //     },
    //     {
    //       tag: "inputs",
    //       maxElementCheck: 1, // Máximo número de checkboxes permitidos
    //       style: {form: "formFigure2"},
    //       value:
    //         "<p>Compruebe su impresión utilizando el compás <b>¿Existen dos de igual tamaño?</b></p>",
    //       inputs: [
    //         {
    //           style: {input: "inputTableCheck"},
    //           value: {label: "Si", input: ""},
    //           correctResponce: true,
    //         },
    //         {
    //           style: {input: "inputTableCheck"},
    //           value: {label: "No", input: ""},
    //         },
    //       ],
    //     },
    //   ],
    //   conditions: {
    //     inputs: [
    //       {checks: ["No"]},
    //       {checks: ["No"]},
    //       {espeficPoint: ["point_C"], compare: ["h"]},
    //     ],
    //   },
    //   engine: engineFigure,
    // },
    artifact_2: {
      board: "board_2",

      tools: [
        {
          tag: "form",
          containerTop: true,
          style: {form: "formfigureTop"},
          value: "<p>Trace el segmento <b>OA</b>.<br>Trace el segmento <b>AB</b>.</p>",
        },
        {
          tag: "inputs",
          containerTop: true,
          maxElementCheck: 1, // Máximo número de checkboxes permitido
          style: {form: "formfigureTop"},
          value: "¿Long(OB) = Long(OA)?",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Si", input: ""},
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
              correctResponce: true,
            },
          ],
        },
        {
          tag: "inputs",
          maxElementCheck: 1, // Máximo número de checkboxes permitidos
          containerTop: true,
          style: {form: "formfigureTop"},
          value: "¿Long(OB) = Long(AB)?",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Si", input: ""},
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
              correctResponce: true,
            },
          ],
        },
        {
          tag: "form",
          maxElementCheck: 2, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value: "<b>Complete con el signo de orden adecuado.</b>",
        },
        {
          tag: "form",
          style: {form: "formFigure2 gap-10"},
          spans: [
            {
              value: "Long(OB) ",
              input: true,
              style: {input: "mathSmall", span: "spanRowFigure"},
            },
            {value: "Long(AB)"},
          ],
        },
        {
          tag: "form",
          style: {form: "formFigure2"},
          value: "<b>Marque sobre la parte curva un punto, llámelo P.</b>",
        },
        {
          tag: "inputs",
          maxElementCheck: 1, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value: "¿Long(OB) = Long(OP)?",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Si", input: ""},
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
              correctResponce: true,
            },
          ],
        },
        {
          tag: "inputs",
          maxElementCheck: 1, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value: "¿Long(OB) = Long(AP)?",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Si", input: ""},
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
              correctResponce: true,
            },
          ],
        },
      ],

      conditions: {
        inputs: [
          {checks: ["Si"]},
          {checks: ["No"]},
          [">"],
          {checks: ["Si"]},
          {checks: ["No"]},
          {
            circles: ["circleEvaluate_0"],
            compare: ["p"],
            positionAgainst: [-6, -2],
          },
        ],
        lines: [
          {
            points: [
              [
                [5.6, -2],
                [-6, -2],
              ],
            ],
            refLn: ["line_segment_0"],
          },
          {
            points: [
              [
                [5.6, -2],
                [3.9, 2.32],
              ],
            ],
            refLn: ["line_segment_1"],
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

// contentMain.initVIew(def);
