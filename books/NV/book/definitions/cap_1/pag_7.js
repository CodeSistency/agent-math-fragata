const def = {
  scrollNav: true,
  artifacts: {
    lexico_1: {
      nodo: [
        {texto: "Orden", etiqueta: "h1"},
        {texto: 'La "punta" se llama vértice.'},
      ],

      recursos: [
        {
          recurso: {
            styles: {
              boundingbox: [-4, 4, 4, -4],
              axies: {
                y: {visible: false},
                x: {visible: false},
              },
            },

            grafico: [
              {
                texto: [
                  {
                    x: -3,
                    y: 3,
                    mensaje: "Punta o Vértice",
                    styleText: {color: "#076382"},
                  },
                ],
                linea: [
                  {
                    type: "arrow",
                    punto_1: [-1.73, 1.82],
                    punto_2: [-0.04, -0.27],
                    stylesLine: {lastArrow: true, strokeWidth: 3},
                  },
                ],
                curve: [
                  {
                    x: [1.6, 0.8, 1.6],
                    y: [-1, -1.5, -2],
                    styles: {visible: true, fixed: true, strokeWidth: 3},
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
        'El vértice "apunta" al menor número. Complete con una de las palabras: <b>Correcto o Incorrecto.</b>',
      border: true,
      artifactClass: "artifact-big-very-min",
      body: [
        ["3 < 5", "correcto"],
        [
          "3 > 5",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "correcto"},
                  {valor: "incorrecto"},
                ],
                style: {select: "selectClaseDos"},
              },
            ],
          },
        ],
        [
          "5 < 3",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "correcto"},
                  {valor: "incorrecto"},
                ],
                style: {select: "selectClaseDos"},
              },
            ],
          },
        ],
        [
          "5 > 3",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "correcto"},
                  {valor: "incorrecto"},
                ],
                style: {select: "selectClaseDos"},
              },
            ],
          },
        ],
      ],

      conditions: [["incorrecto"], ["incorrecto"], ["correcto"]],
      engine: engineTable,
    },
    artifact_2: {
      description:
        'El vértice "apunta" al menor número. Complete con una de las palabras: <b>Correcto o Incorrecto.</b>',

      artifactClass: "artifact-big-very-min",
      body: [
        [
          "8 > 10",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "correcto"},
                  {valor: "incorrecto"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "8 < 10",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "correcto"},
                  {valor: "incorrecto"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "15 > 13",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "correcto"},
                  {valor: "incorrecto"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "5 < 13",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "correcto"},
                  {valor: "incorrecto"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "3 < 0",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "correcto"},
                  {valor: "incorrecto"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
      ],

      conditions: [
        ["incorrecto"],
        ["correcto"],
        ["correcto"],
        ["correcto"],
        ["incorrecto"],
      ],
      engine: engineTable,
    },
    artifact_3: {
      description:
        'El vértice "apunta" al menor número. Complete con una de las palabras: <b>Correcto o Incorrecto.</b>',
      artifactClass: "artifact-big-very-min",
      body: [
        [
          "103 < 1032",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "correcto"},
                  {valor: "incorrecto"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "501 > 5000",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "correcto"},
                  {valor: "incorrecto"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "501 < 501",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "correcto"},
                  {valor: "incorrecto"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],

        [
          "501 > 501",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "correcto"},
                  {valor: "incorrecto"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],

        [
          "3 > 0",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "correcto"},
                  {valor: "incorrecto"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
      ],

      conditions: [
        ["correcto"],
        ["incorrecto"],
        ["incorrecto"],
        ["incorrecto"],
        ["correcto"],
      ],
      engine: engineTable,
    },
    artifact_4: {
      description:
        'El vértice "apunta" al menor número. Complete con una de las letras. <br> <b>Si se tiene P > Q, entonces el menor es  Q y el mayor es P.</b><br> <b>Si se tiene P < Q, entonces el menor es  P y el mayor es Q.</b>',
      artifactClass: "artifact-big-very-min",
      border: true,
      body: [
        ["A < B ¿Quién es el menor?", "A"],
        [
          "A < B ¿Quién es el mayor?",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "A"}, {valor: "B"}],
                style: {select: "selectClaseDos"},
              },
            ],
          },
        ],
      ],

      conditions: [["b"]],
      engine: engineTable,
    },
    artifact_5: {
      description:
        'El vértice "apunta" al menor número. Complete con una de las letras.',
      artifactClass: "artifact-big-very-min",
      border: true,
      body: [
        ["H es menor que F", "H < F"],
        [
          "H es menor que F",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "H"}, {valor: "F"}],
                style: {select: "selectClase"},
              },
              {
                style: {span: "spanFlex", select: "selectClase"},
                text: {span: ">"},
                default: [{valor: "selecciona"}, {valor: "H"}, {valor: "F"}],
              },
            ],
          },
        ],
      ],

      conditions: [["f"], ["h"]],
      engine: engineTable,
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

const contentMain = new CreateView(def);
