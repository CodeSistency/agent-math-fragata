const defBoards = {
  //modelo 1

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
        //   fillInterval: true,
        inputs: {
          b: {
            disabled: true,
            value: "4\\hspace{0.1cm} Pasos",
          },
          c: {
            disabled: true,
            value: "131",
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
        //   fillInterval: true,
        inputs: {
          b: {
            disabled: true,
            value: "4\\hspace{0.1cm} Pasos",
          },
          c: {
            disabled: true,
            value: "235",
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
        //   fillInterval: true,
        inputs: {
          a: {
            disabled: true,
            value: "131",
          },
          b: {
            disabled: true,
            value: "4 \\hspace{0.1cm} Pasos",
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
        //   fillInterval: true,
        inputs: {
          a: {
            disabled: true,
            value: "131",
          },

          c: {
            disabled: true,
            value: "1245",
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
  },
  board_5: {
    artifact: "artifact_5",
    styles: {
      boundingbox: [-3.4, 3, 3.4, -2],
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
        height: 1.6,
        //   fillInterval: true,
        inputs: {
          b: {
            disabled: true,
            value: "4 \\hspace{0.1cm} Pasos",
          },
          c: {
            disabled: true,
            value: "4",
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
//si se va a agregar algo al objeto tiene que declararce la propiedad por defecto en el mod.js
const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      description:
        " <br><b>Análisis del ejemplo:</b><br> No pueden ser números mayores a 131, porque si se va hacia la izquierda a partir del 131 los números deben ir disminuyendo,por lo tanto, solo podrían ser números  menores a 131, y no se pueden dar muchos pasos, por qué solo nos indica que son solo  4 pasos, el único número para el cual no tenemos una razón para descartarlo es el 127, y por eso se puede colocar en el círculo.",
      board: "board_1",
      engine: HorizontalSegment,
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
            values: [["127"]],
          },
        },
      },
    },

    artifact_2: {
      board: "board_2",
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
            values: [["231"]],
          },
        },
      },
    },
    artifact_3: {
      board: "board_3",
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
            values: [["135"]],
          },
        },
      },
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
            values: [["1114"]],
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
            values: [["0"]],
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
