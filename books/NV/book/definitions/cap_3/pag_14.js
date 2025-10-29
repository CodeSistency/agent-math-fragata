const defBoards = {
  board_1: {
    artifact: "artifact_1",
    Interaction: {
      type: "Segment",
      // compass:"none"
      compass: {
        lengthCompass: 4,
      },
    },
    shapes: [
      {
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
            x: 2,
            y: 0,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "B",
              label: {offset: [-4, -14]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
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
      // compass:"none"
      compass: {
        circlesConcentricSuperPosition: false,
        lengthCompass: 4,
      },
    },
    shapes: [
      {
        points: [
          {
            x: -5,
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
            x: -0.5,
            y: 0,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "B",
              label: {offset: [-4, -14]},
            },
          },
          {
            x: 3,
            y: 0,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "C",
              label: {offset: [-4, -14]},
            },
          },
          {
            x: 5.5,
            y: 0,
            ref: "point_D",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "D",
              label: {offset: [-4, -14]},
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
            refPt: ["point_B", "point_C"],
            style: {strokewidth: 2},
            type: "segment",
          },
          {
            refPt: ["point_C", "point_D"],
            style: {strokewidth: 2},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_3: {
    artifact: "artifact_3",
    Interaction: {
      type: "Segment",
      // compass:"none"
      compass: {
        lengthCompass: 4,
      },
    },
    shapes: [
      {
        points: [
          {
            x: -3,
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
            x: -0.2,
            y: 0,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "C",
              label: {offset: [-4, -14]},
            },
          },
          {
            x: 3,
            y: 0,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "D",
              label: {offset: [-4, -14]},
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
            refPt: ["point_B", "point_C"],
            style: {strokewidth: 2},
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
          texto: "Elementos de un círculo",
          etiqueta: "h1",
          atributos: {
            style: "text-align:center;",
          },
        },
      ],
      recursos: [
        {
          recurso: {
            styles: {
              boundingbox: [-2.5, 2.3, 2.5, -2],
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
                    punto_1: [-0.5, 1.6],
                    punto_2: [0.52, -1.6],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [-0.0, 0.0],
                    punto_2: [1.25, -1.12],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                  },
                ],

                texto: [
                  {
                    x: -0.4,
                    y: 0.4,
                    mensaje: "Diámetro",
                    styleText: {rotate: -70, strokeColor: "#343a40"},
                  },
                  {
                    x: 0.15,
                    y: 0.1,
                    mensaje: "Centro",
                    styleText: {rotate: 25, strokeColor: "#343a40"},
                  },
                  {
                    x: 0.5,
                    y: -0.2,
                    mensaje: "Radio",
                    styleText: {rotate: -40, strokeColor: "#343a40"},
                  },
                  {
                    x: -1,
                    y: 1.9,
                    mensaje: "Circunferencia",
                    styleText: {strokeColor: "#343a40"},
                  },
                ],
                circle: [
                  {
                    punto_1: [0, 0],
                    punto_2: [-1.67, 0],
                    type: "circle",
                    stylesPoint_1: {
                      visible: true,
                      strokeColor: "#076382",
                      fillColor: "#076382",
                      strokeWidth: 3,
                    },
                    stylesCircle: {strokeColor: "#076382", strokeWidth: 3},
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
      tools: [
        {
          tag: "form",
          containerTop: true,
          maxElementCheck: 2, // Máximo número de checkboxes permitidos
          style: {form: "formfigureTop"},
          value: "Círculo en el mismo radio,<br> pero centros diferentes.",
        },
        {
          tag: "inputs",
          maxElementCheck: 2, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value:
            "<p>Trace dos círculos: uno de centro <b>A</b>, que pasa por <b>B</b>. Otro, de mismo radio con centro <b>B</b></p>",
          inputs: [],
        },
      ],
      conditions: {
        circles: [
          [2, 0, 4],
          [-2, 0, 4],
        ],
      },
      engine: engineFigure,
    },
    artifact_2: {
      tools: [
        {
          tag: "form",
          containerTop: true,
          maxElementCheck: 2, // Máximo número de checkboxes permitidos
          style: {form: "formfigureTop"},
          value: "Círculos concéntricos.",
        },
        {
          tag: "form",
          maxElementCheck: 2, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value: "<p>Trace tres círculos con centro <b>B</b>, que pasa por <b>A,C y D</b>.<p>",
        },
      ],

      board: "board_2",
      conditions: {
        // inputs:[["o"]],
        circles: [
          [-0.5, 0, 3.6],
          [-0.5, 0, 4.5],
          [-0.5, 0, 6],
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
          value: "Círculos tangentes.",
        },
        {
          tag: "form",
          maxElementCheck: 2, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value: "<p>Trace dos círculos que pasan por <b>C</b>, cuyo centros sean <b>A y D</b>.</p>",
        },
      ],
      conditions: {
        circles: [
          [-3, 0, 2.8],
          [3, 0, 3.1],
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
