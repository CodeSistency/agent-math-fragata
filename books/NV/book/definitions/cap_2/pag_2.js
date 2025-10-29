const defBoards = {
  board_1: {
    artifact: "artifact_1",
    points: [
      {
        text: {value: "EI", position: [-3.5, 1.5]},
      },
      {
        visible: false,
        inputs: {
          x: 0,
          y: -2,
          value: "\\text{Longitud}",

          style: {
            styleMain: "obaloMedium",
            disabled: true,
          },
        },
      },
      {
        text: {value: "ED", position: [3.5, 1.5]},
      },
    ],
    type: 3,
    slim: true,
  },
  board_3: {
    artifact: "example_3",
    styles: {
      boundingbox: [-3.5, 6, 3.5, -6],
      axies: {
        y: {visible: false},
        x: {
          visible: false,
        },
      },
    },
    points: [
      {
        x: 0,
        y: 0,
        style: {
          visible: false,
          layer: 100,
        },
      },
    ],

    intervals: [
      {
        model: "2",
        height: 1.6,
        //   fillInterval: true,

        inputs: {
          b1: {
            disabledColor: true,
            disabled: false,
            value: "5",
          },
          b: {
            disabledColor: true,
            disabled: false,
            value: "7-2",
          },
          c: {
            disabledColor: true,
            disabled: false,
            value: "2+5",
          },
          c1: {
            disabledColor: true,
            disabled: false,
            value: "7",
          },
          a: {
            disabledColor: true,
            disabled: false,
            value: "7-5",
          },
          a1: {
            disabledColor: true,
            disabled: false,
            value: "2",
          },
        },
      },
    ],
    btnSlider: false,
    slider: {
      visible: false,
      step: 0,
      snapWidth: 0.11,
      numPoints: 2,

      pointvisible: true,
    },
    pointNames: ["", ""],
    // pointNames: []
  },
  board_4: {
    artifact: "artifact_4",
    styles: {
      boundingbox: [-3.5, 6, 3.5, -6],
      axies: {
        y: {visible: false},
        x: {
          visible: false,
        },
      },
    },
    points: [
      {
        x: 0,
        y: 0,
        style: {
          visible: false,
          layer: 100,
        },
      },
    ],

    intervals: [
      {
        model: "2",
        height: 1.6,
        //   fillInterval: true,

        inputs: {
          b1: {
            disabledColor: true,
            disabled: true,
            value: "6",
          },
          b: {
            disabled: false,
            value: "",
          },
          c: {
            disabled: false,
            value: "",
          },
          c1: {
            disabledColor: true,
            disabled: true,
            value: "8",
          },
          a: {
            disabled: false,
            value: "",
          },
          a1: {
            disabledColor: true,
            disabled: true,
            value: "2",
          },
        },
      },
    ],
    btnSlider: false,
    slider: {
      visible: false,
      step: 0,
      snapWidth: 0.11,
      numPoints: 2,

      pointvisible: true,
    },
    pointNames: ["", ""],
    // pointNames: []
  },
  board_5: {
    artifact: "artifact_5",
    styles: {
      boundingbox: [-3.5, 6, 3.5, -6],
      axies: {
        y: {visible: false},
        x: {
          visible: false,
        },
      },
    },
    points: [
      {
        x: 0,
        y: 0,
        style: {
          visible: false,
          layer: 100,
        },
      },
    ],

    intervals: [
      {
        model: "2",
        height: 1.6,
        //   fillInterval: true,

        inputs: {
          b1: {
            disabledColor: true,
            disabled: true,
            value: "5",
          },
          b: {
            disabled: false,
            value: "",
          },
          c: {
            disabled: false,
            value: "",
          },
          c1: {
            disabledColor: true,
            disabled: true,
            value: "15",
          },
          a: {
            disabled: false,
            value: "",
          },
          a1: {
            disabledColor: true,
            disabled: true,
            value: "10",
          },
        },
      },
    ],
    btnSlider: false,
    slider: {
      visible: false,
      step: 0,
      snapWidth: 0.11,
      numPoints: 2,

      pointvisible: true,
    },
    pointNames: ["", ""],
    // pointNames: []
  },
};

const def = {
  scrollNav: true,
  artifacts: {
    example_1: {
      border: true,
      board: "board_1",
      inputs: [
        {
          tag: "form",
          style: {
            form: "formEjemp",
            td: "tdNotline",
          },
          value: ``,
          spans: [
            {
              value: `<b>Longitud del segmento:</b>"lo que mide" el segmento.`,
              style: {span: "spanEjemplo"},
            },
            {
              value: `<b>Cálculo de la longitud de un segmento:</b><b>resta.</b>`,
              style: {span: "spanEjemplo"},
            },
            {
              value: `Posición del extremo derecho menos la del izquierdo.`,
              style: {span: "spanEjemplo"},
            },
          ],
        },
        {
          tag: "form",
          style: {
            form: "formEjemp",
          },
          value: ``,
          spans: [
            {
              value: `<b>Cálculo del extremo izquierdo:</b> <b>resta.</b>`,
              style: {span: "spanEjemplo"},
            },
            {
              value: `Posición del extremo derecho menos la longitud.`,
              style: {span: "spanEjemplo"},
            },
            {
              value: `<b>Cálculo del extremo derecho:</b><b>suma.</b>`,
              style: {span: "spanEjemplo"},
            },
            {
              value: `Posición del extremo izquierdo más longitud.`,
              style: {span: "spanEjemplo"},
            },
          ],
        },
      ],
      engine: EngineEscalas,
    },
    artifact_1: {
      border: true,
      artifactClass: "artifact-big-very-min",
      body: [
        [
          {
            tag: "form",
            style: {td: "tdNotline"},
            selects: [
              {
                style: {
                  select: "selectInput",
                  span: "spanTableCheck",
                  select: "selectClase mathBig",
                },
                text: {
                  span: "¿El extremo derecho debe ser mayor al izquierdo?",
                },
                default: [{valor: "selecciona"}, {valor: "si"}, {valor: "no"}],
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {td: "tdNotline"},
            selects: [
              {
                style: {
                  select: "selectInput",
                  span: "spanTableCheck",
                  select: "selectClase mathBig",
                },
                text: {
                  span: "¿Tiene eso que ver para obtener la posición del extremo derecho. Hay que sumar en vez de restar?",
                },
                default: [{valor: "selecciona"}, {valor: "si"}, {valor: "no"}],
              },
            ],
          },
        ],
        [
          {
            value:
              "El extremo izquierdo también se denomina extremo inferior. Y el extremo derecho, superior. ",
            style: {td: "tdNotline"},
          },
        ],
      ],
      conditions: [["si"], ["si"]],
      engine: engineTable,
    },
    example_3: {
      board: "board_3",
      engine: HorizontalSegment,
      parent: "lexico-content",
      border: true,
    },
    artifact_4: {
      board: "board_4",
      engine: HorizontalSegment,
      parent: "lexico-content",
      border: true,

      conditions: {
        keyBoard: true,
        //elementos interval
        intervals: {
          //en los inputs
          inputs: {
            //si falla tiene este mensaje
            text: "Error desde la def",
            //tiene que tener estos valores
            values: [["8-6"], ["8-2"], ["2+6"]],
          },
        },
      },
    },
    artifact_5: {
      board: "board_5",
      engine: HorizontalSegment,
      parent: "lexico-content",

      conditions: {
        keyBoard: true,
        //elementos interval
        intervals: {
          //en los inputs
          inputs: {
            //si falla tiene este mensaje
            text: "Error desde la def",
            //tiene que tener estos valores
            values: [["15-5"], ["15-10"], ["10+5"]],
          },
        },
      },
    },
    /*nuevos*/

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
