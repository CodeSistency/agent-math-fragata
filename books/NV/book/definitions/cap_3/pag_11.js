const defBoards = {
  board_1: {
    artifact: "artifact_1",
    buttonSegment: true,
    createInpForPnt: true,
    maxMathfield: 1,
    Interaction: {
      type: "Segment",
      // compass:"none"
      compass: {
        lengthCompass: 4,
      },
    },

    shapes: [
      {
        maxLines: 4,
        points: [
          {
            x: -2,
            y: 2.7,
            style: {
              visible: true,
              fixed: true,
              size: 5,
              name: "Q",
              label: {offset: [-1, -15]},
            },
          },
          {
            x: -5.8,
            y: -0,
            style: {
              visible: true,
              fixed: true,
              size: 5,
              name: "P",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: -4,
            y: -2.5,
            style: {
              visible: true,
              fixed: true,
              size: 5,
              name: "B",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: 0,
            y: -1.5,
            style: {
              visible: true,
              fixed: true,
              size: 5,
              name: "",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: 4.4,
            y: -2.5,
            style: {
              visible: true,
              fixed: true,
              size: 5,
              name: "A",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: 3.5,
            y: 1.8,
            style: {
              visible: true,
              fixed: true,
              size: 5,
              label: {offset: [-5, -15]},
            },
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
          texto: "El punto y su nombre",
          etiqueta: "h1",
          atributos: {
            style: "text-align:center;",
          },
        },
        {
          texto:
            "La letra que se pone al lado de un punto es el nombre que se le da para designarlo en los razonamientos que lo utilicen. En el caso de la figura el punto tiene el nombre <b>H</b>.",
          atributos: {
            style: "text-align:justify;",
          },
        },
      ],

      recursos: [
        {
          recurso: {
            styleRecurso: ["figures_2"],
            grafico: [
              {
                texto: [
                  {
                    x: -0.4,
                    y: 0,
                    mensaje: "H",
                    stylesText: {cssClasses: "textJSX"},
                  },
                ],
                points: [{x: -0.69, y: 1.3, stylesPoint: { size: 4}}],
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
          texto: "Segmento",
          etiqueta: "h1",
        },
        {
          texto:
            "La figura adjunta recibe el nombre de segmento <b>OB</b>. Se designa por <b>OB</b>. (Note la raya encima de las letras). También se puede llamar <b>BO</b> y designar por <b>BO</b>. En el caso de la figura el segmento es <b>BO</b>. Un segmento es una parte conexa de una recta.",
          atributos: {
            style: "text-align:justify;",
          },
        },
      ],

      recursos: [
        {
          recurso: {
            styleRecurso: ["figures"],

            grafico: [
              {
                texto: [
                  {
                    x: -3,
                    y: -2.3,
                    mensaje: "B",
                    stylesText: {cssClasses: "textJSX"},
                  },
                  {
                    x: 2.65,
                    y: 2.3,
                    mensaje: "O",
                    stylesText: {cssClasses: "textJSX"},
                  },
                ],

                linea: [
                  {
                    punto_1: [-2.8, -1],
                    punto_2: [2.8, 1],
                    stylesPoint_1: {visible: true, size: 4},
                    stylesPoint_2: {visible: true, size: 4},
                    stylesLine:{strokeWidth:3}
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
          maxElementCheck: 2, // Máximo número de checkboxes permitidos
          style: {form: "formFigure2"},
          value:
            "<p>Póngale nombre a los puntos que no lo tienen. <b>¡Ojo!</b> Dos puntos diferentes deben tener nombres diferentes. Un nombre es necesario para saber de qué punto se está hablando. <br> <b>Trace los segmentos PA, OA y BQ Trace OB.</b></p>",
        },
      ],
      conditions: {
        segments: [
          ["pa", "oa", "bq", "ob"],
          ["pa", "oa", "bq", "ob"],
          ["pa", "oa", "bq", "ob"],
          ["pa", "oa", "bq", "ob"],
        ],
        inputs: [
          {
            position: [
              [0, -1.5, ["o"]],
              [3.5, 1.8, ["o"]],
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

// contentMain.initVIew(def);

const contentMain = new CreateView(def, defBoards);
