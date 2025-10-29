const defBoards = {
  //modelo 1 para lexico

  board_1: {
    artifact: "artifact_1",

    styles: {
      boundingbox: [-3.4, 3, 3.4, -2],
      axies: {
        y: {visible: false},
        x: {visible: false},
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
        height: 1.6,

        inputs: {
          a: {
            disabled: true,
            value: "1",
          },
          b: {
            value: "4 \\hspace{0.1cm} Pasos",
            disabled: true,
          },
          c: {
            disabled: true,
            value: "5",
          },
        },
      },
    ],
    slider: {
      visible: false,
      step: 0,
      snapWidth: 0.11,
      numPoints: 5,
      pointVisible: true,
      curvesVisible: true,
    },
    pointNames: ["", "2", "3", "4", ""],
  },
  //aqui comienzan ejercicios para usuarios
  board_2: {
    artifact: "artifact_2",
    styles: {
      boundingbox: [-3.4, 3, 3.4, -2],
      axies: {
        y: {visible: false},
        x: {visible: false},
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
        height: 1.6,

        inputs: {
          a: {
            disabled: true,
            value: "1",
          },
          c: {
            disabled: true,
            value: "6",
          },
        },
      },
    ],
    slider: {
      visible: true,
      step: 0,
      snapWidth: 0.11,
      numPoints: 6,
    },
    pointNames: ["", "2", "3", "4", "5", ""],
  },
  board_3: {
    artifact: "artifact_3",
    styles: {
      boundingbox: [-3.4, 3, 3.4, -2],
      axies: {
        y: {visible: false},
        x: {visible: false},
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
        height: 1.6,

        inputs: {
          a: {
            disabled: true,
            value: "3",
          },

          c: {
            disabled: true,
            value: "5",
          },
        },
      },
    ],
    slider: {
      visible: true,
      step: 0,
      snapWidth: 0.11,
      numPoints: 3,
    },
    pointNames: ["", "4", ""],
  },
  board_4: {
    artifact: "artifact_4",
    styles: {
      boundingbox: [-3.4, 3, 3.4, -2],
      axies: {
        y: {visible: false},
        x: {visible: false},
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
        height: 1.6,

        inputs: {
          a: {
            disabled: true,
            value: "131",
          },
          c: {
            disabled: true,
            value: "133",
          },
        },
      },
    ],
    slider: {
      visible: true,
      step: 0,
      snapWidth: 0.11,
      numPoints: 3,
    },
    pointNames: ["", "132", ""],
  },
  board_5: {
    artifact: "artifact_4",
    styles: {
      boundingbox: [-3.4, 3, 3.4, -2],
      axies: {
        y: {visible: false},
        x: {visible: false},
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
        height: 1.6,

        inputs: {
          a: {
            disabled: true,
            value: "10",
          },
          c: {
            disabled: true,
            value: "11",
          },
        },
      },
    ],
    slider: {
      visible: true,
      step: 0,
      snapWidth: 0.11,
      numPoints: 2,
    },
    pointNames: ["", ""],
  },
};
//si se va a agregar algo al objeto tiene que declararce la propiedad por defecto en el mod.js
const def = {
  scrollNav: {
    tittle: "Diagrama Segmento Horizontal",
  },
  artifacts: {
    lexico_1: {
      nodo: [
        {
          texto: "EI: Extremo izquierdo del segmento.",
          atributos: {style: "text-align:center"},
        },
        {
          texto: "ED: Extremo derecho del segmento.",
          atributos: {style: "text-align:center"},
        },
      ],
      recursos: [
        {
          recurso: {
            styleRecurso: ["intervals"],
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
                    x: -3.3,
                    y: -2,
                    mensaje: "Extremo Izquierdo",
                    stylesText: {cssClasses: "textJSX"},
                  },
                  {
                    x: 0.8,
                    y: -2,
                    mensaje: "Extremo Derecho",
                    stylesText: {cssClasses: "textJSX"},
                  },
                  {
                    x: -0.4,
                    y: 2.65,
                    mensaje: "Pasos",
                    stylesText: {cssClasses: "textJSX"},
                  },
                ],

                linea: [
                  {punto_1: [-2.8, 0], punto_2: [2.8, 0]},
                  {
                    type: "arrow",
                    punto_1: [-2.2, -1.5],
                    punto_2: [-2.5, -0.27],
                    stylesLine: {lastArrow: true},
                  },
                  {
                    type: "arrow",
                    punto_1: [2.2, -1.5],
                    punto_2: [2.5, -0.27],
                    stylesLine: {lastArrow: true},
                  },

                  {
                    type: "arrow",
                    punto_1: [0.2, 2.2],
                    punto_2: [0.7, 0.7],
                    stylesLine: {lastArrow: true},
                  },
                  {
                    type: "arrow",
                    punto_1: [-0.2, 2.2],
                    punto_2: [-0.7, 0.7],
                    stylesLine: {lastArrow: true},
                  },

                  {
                    type: "arrow",
                    punto_1: [0.5, 2.2],
                    punto_2: [2, 0.7],
                    stylesLine: {lastArrow: true},
                  },
                  {
                    type: "arrow",
                    punto_1: [-0.5, 2.2],
                    punto_2: [-2, 0.7],
                    stylesLine: {lastArrow: true},
                  },
                ],

                circle: [
                  {
                    punto_1: [-2.6, 0],
                    punto_2: [-1.3, 0],
                    type: "semicircle",
                    stylesPoint_1: {visible: true},
                  },
                  {punto_1: [-1.3, 0], punto_2: [0, 0], type: "semicircle"},
                  {
                    punto_1: [1.3, 0],
                    punto_2: [2.6, 0],
                    type: "semicircle",
                    stylesPoint_2: {visible: true},
                  },
                  {punto_1: [0, 0], punto_2: [1.3, 0], type: "semicircle"},
                ],
              },
            ],
          },
        },
        {
          recurso: {
            styleRecurso: ["intervals"],
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
                    x: -3.5,
                    y: -1,
                    mensaje: "Posición Ex. Izq.",
                    stylesText: {cssClasses: "textJSX"},
                  },
                  {
                    x: 1,
                    y: -1,
                    mensaje: "Posición Ex. Der.",
                    stylesText: {cssClasses: "textJSX"},
                  },
                  {
                    x: -1.35,
                    y: 2.57,
                    mensaje: "Números de Pasos",
                    stylesText: {cssClasses: "textJSX "},
                  },
                ],

                linea: [
                  {punto_1: [-2.8, 0], punto_2: [2.8, 0]},
                  {punto_1: [2.6, 2.5], punto_2: [2.6, 0]},
                  {punto_1: [-2.6, 2.5], punto_2: [-2.6, 0]},
                  {
                    type: "arrow",
                    punto_1: [-1.5, 2.5],
                    punto_2: [-2.6, 2.5],
                    stylesLine: {lastArrow: true},
                  },
                  {
                    type: "arrow",
                    punto_1: [1.5, 2.5],
                    punto_2: [2.6, 2.5],
                    stylesLine: {lastArrow: true},
                  },
                ],
                circle: [
                  {
                    punto_1: [-2.6, 0],
                    punto_2: [-1.3, 0],
                    type: "semicircle",
                    stylesPoint_1: {visible: true},
                  },
                  {punto_1: [-1.3, 0], punto_2: [0, 0], type: "semicircle"},
                  {
                    punto_1: [1.3, 0],
                    punto_2: [2.6, 0],
                    type: "semicircle",
                    stylesPoint_2: {visible: true},
                  },
                  {punto_1: [0, 0], punto_2: [1.3, 0], type: "semicircle"},
                ],
              },
            ],
          },
        },
      ],
      styleContainer: "note",
      engine: EngineOwner,
    },
    example: {
      description: "Ejemplo",

      prueba_t: true,
      board: "board_1",
      border: true,
      engine: HorizontalSegment,
      parent: "example_3",

      //elementos interval
      intervals: {
        //en los inputs
        inputs: {
          //si falla tiene este mensaje
          text: "Error desde la def",
          //tiene que tener estos valores
        },
      },
    },
    artifact_1: {
      board: "board_2",
      description: 'Complete: marcando los puntos, luego los pasos y finalmente el número de pasos marcados. P significa "Pasos".',
      point: [
        {
          texto: "P",
          SizeText: 16,
        },
      ],
      engine: HorizontalSegment,
      border: true,
      parent: "lexico-content",
      conditions: {
        //elementos interval
        intervals: {
          //en los inputs
          inputs: {
            //si falla tiene este mensaje
            text: "Error desde la def",
            //tiene que tener estos valores
            values: [["5"]],
          },
        },
      },
    },
    artifact_2: {
      board: "board_3",
      point: [
        {
          texto: "P",
          SizeText: 16,
        },
      ],
      engine: HorizontalSegment,

      parent: "lexico-content",
      conditions: {
        //elementos interval
        intervals: {
          //en los inputs
          inputs: {
            //si falla tiene este mensaje
            text: "Error desde la def",
            //tiene que tener estos valores
            values: [["2"]],
          },
        },
      },
    },
    artifact_3: {
      board: "board_4",
      point: [
        {
          texto: "P",
          SizeText: 16,
        },
      ],
      engine: HorizontalSegment,
      parent: "lexico-content",
      conditions: {
        //elementos interval
        intervals: {
          //en los inputs
          inputs: {
            //si falla tiene este mensaje
            text: "Error desde la def",
            //tiene que tener estos valores
            values: [["2"]],
          },
        },
      },
    },
    artifact_4: {
      board: "board_5",
      point: [
        {
          texto: "P",
          SizeText: 16,
        },
      ],
      engine: HorizontalSegment,
      parent: "lexico-content",
      conditions: {
        //elementos interval
        intervals: {
          //en los inputs
          inputs: {
            //si falla tiene este mensaje
            text: "Error desde la def",
            //tiene que tener estos valores
            values: [["1"]],
          },
        },
      },
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
