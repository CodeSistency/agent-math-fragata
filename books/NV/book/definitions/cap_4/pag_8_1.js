const defBoards = {
  board_1: {
    artifact: "artifact_1",
    buttonInteraction: true,
    createInpForPnt: true,
    withMathfield: true,

    maxMathfield: 2,
    maxLinesClick: 2,

    Interaction: {
      type: "Compass",
      compass: "none",
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
        type: "circle",
        refPt: ["point_A", "point_B"],

        points: [
          {
            x: 0,
            y: -0.33,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "O",
              label: {offset: [-1, -14]},
            },
          },
          {
            x: -1.14,
            y: 3.55,
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
        points: [
          {
            x: 0,
            y: 3.65,
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
            x: 4,
            y: -0.33,
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
            x: 1.41,
            y: -1.73,
            ref: "point_E",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "C",
              label: {offset: [8, -1]},
            },
          },

          {
            x: 0,
            y: 4.3,
            ref: "point_F",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: 5,
            y: -0.33,
            ref: "point_G",
            style: {
              visible: false,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: -1.25,
            y: 4.2,
            ref: "point_H",
            style: {
              fillOpacity: 0,
              strokeOpacity: 0,
              visible: true,
              fixed: true,
              size: 3,
              name: "A",
              label: {offset: [8, -1]},
            },
          },

          {
            x: 3.96,
            y: -0.9,
            ref: "point_I",
            style: {
              fillOpacity: 0,
              strokeOpacity: 0,
              visible: true,
              fixed: true,
              size: 3,
              name: "B",
              label: {offset: [8, -1]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_G"],
            style: {strokewidth: 3},
            type: "segment",
          },

          {
            refPt: ["point_A", "point_F"],
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
};

const allDef = {
  scrollNav: {tittle: "Comparación de arcos, vértices y ángulos"},
  artifacts: {
    lexico_1: {
      nodo: [
        {
          texto:
            '<b>Mediante la "apertura" entre sus dos lados, el vértice representa el ángulo al cual está asociado.</b>',
          atributos: {style: "text-align:justify"},
        },

        {
          texto:
            "A menudo es fácil reconocer cual es el mayor ángulo, sin tener que superponer los vértices.",
          atributos: {style: "text-align:justify;"},
        },

        {
          texto:
            "El vértice 1 es el que tiene menor ángulo. El 3 es el que representa el mayor ángulo.",
          atributos: {style: "text-align:justify;order: 1;"},
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
            styleRecurso: ["lexico_example_figure_large"],
            grafico: [
              {
                linea: [
                  {
                    punto_1: [-0.88, -1.75],
                    punto_2: [-0.88, 2.5],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },

                  {
                    punto_1: [0.86, -1.75],
                    punto_2: [0.86, 2.5],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },

                  {
                    punto_1: [-2.25, -0.68],
                    punto_2: [-1.48, -0.68],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },

                  {
                    punto_1: [-2.25, -0.68],
                    punto_2: [-1.66, 1.08],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },

                  {
                    punto_1: [-0.37, -0.73],
                    punto_2: [-0.37, 1.08],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [-0.37, -0.73],
                    punto_2: [0.45, -0.73],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },

                  {
                    punto_1: [1.4, -0.73],
                    punto_2: [2.2, -0.73],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },

                  {
                    punto_1: [1.4, -0.73],
                    punto_2: [1.1, 1.08],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                ],

                texto: [
                  {
                    x: -1.1,
                    y: -1.4,
                    mensaje: "1",
                    styleText: {strokeColor: "#343a40"},
                  },

                  {
                    x: 0.65,
                    y: -1.4,
                    mensaje: "2",
                    styleText: {strokeColor: "#343a40"},
                  },

                  {
                    x: 2.3,
                    y: -1.4,
                    mensaje: "3",
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

    artifact_1: {
      description:
        "Trace el círculo de centro O, que pasa por C. Llame A´ y B´ los puntos que son corte, con el círculo que acaba de trazar, con los segmentos OA y OB respectivamente. Complete en el cuadradito con el signo de desigualdad adecuado:",
      board: "board_1",
      tools: [
        {
          tag: "form",
          containerTop: true,
          style: {form: "formfigureTop"},

          spans: [
            {
              value: "Long (AB)",
              input: true,
              style: {input: "mathSmall", span: "spanRowFigure"},
            },
            ,
            {value: "Long (A´B´)"},
          ],
        },

        {
          tag: "form",
          containerTop: true,
          style: {form: "formfigureTop column"},
          value:
            "En este caso, como los lados de los dos vértices coinciden, se tiene que aunque los arcos son diferentes sus ángulos son iguales: <b>(AB) = (A´B´)</b>",
        },
        {
          tag: "inputs",
          maxElementCheck: 1, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value: "¿El segmento OA´ está sobre el segmento OA?",
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
          tag: "inputs",
          maxElementCheck: 1, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value: "¿OA y OA´  tienen igual tamaño?",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
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
          value: "¿El segmento OB´ está sobre el segmento OB?",
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
          tag: "inputs",
          maxElementCheck: 1, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value: "¿OB y  OB´  tienen igual tamaño?",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
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
          value:
            "¿El vértice A´OB´ tiene la misma apertura que el vértice AOB?",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
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
        circles: [[0, -0.33, 2]],
        lines: [
          {
            points: [
              [
                [0, 1.6],
                [0, -0.3],
              ],
              [
                [1.8, -0.3],
                [0, -0.3],
              ],
            ],
            refLn: ["line_tagent_0"],
          },
          {
            points: [
              [
                [0, 1.6],
                [0, -0.3],
              ],
              [
                [1.8, -0.3],
                [0, -0.3],
              ],
            ],
            refLn: ["line_tagent_1"],
          },
        ],
        inputs: [
          [">"],
          {checks: ["Sí"]},
          {checks: ["No"]},

          {checks: ["Sí"]},
          {checks: ["No"]},
          {checks: ["No"]},
          {
            position: [
              [0, 1.6, ["a^{\\prime}"]],
              [1.8, -0.3, ["b^{\\prime}"]],
            ],
          },
          {
            position: [
              [0, 1.6, ["a^{\\prime}"]],
              [1.8, -0.3, ["b^{\\prime}"]],
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
