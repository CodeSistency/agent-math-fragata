const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      board: "board_1",
      border: true,
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
            values: [["135"]],
          },
        },
      },
    },

    artifact_2: {
      board: "board_2",
      border: true,
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
            values: [["127"]],
          },
        },
      },
    },
    artifact_3: {
      board: "board_3",
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
            values: [["1"]],
          },
        },
      },
    },
    artifact_4: {
      board: "board_4",
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
            values: [["137"]],
          },
        },
      },
    },
    artifact_5: {
      board: "board_5",
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
            values: [["135"]],
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

    intervals: [
      {
        height: 1.6,

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
    slider: {
      visible: true,
      step: 0,
      snapWidth: 0.11,
      numPoints: 5,
    },
    pointNames: ["", "132", "133", "134", ""],
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

        inputs: {
          b: {
            disabled: true,
            value: "4 \\hspace{0.1cm} Pasos",
          },
          c: {
            disabled: true,
            value: "131",
          },
        },
      },
    ],
    slider: {
      visible: true,
      step: 0,
      snapWidth: 0.11,
      numPoints: 5,
      reverse: true,
    },
    pointNames: ["", "128", "129", "130", ""],
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
            value: "0",
          },
          b: {
            disabled: true,
            value: "1  \\hspace{0.1cm} Paso",
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
          b: {
            disabled: true,
            value: "6 \\hspace{0.1cm} Pasos",
          },
        },
      },
    ],
    slider: {
      visible: true,
      step: 0,
      snapWidth: 0.11,
      numPoints: 7,
    },
    pointNames: ["", "132", "133", "134", "135", "136", ""],
  },
  board_5: {
    artifact: "artifact_5",
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
          b: {
            disabled: true,
            value: "1 \\hspace{0.1cm} Paso",
          },
          c: {
            disabled: true,
            value: "136",
          },
        },
      },
    ],
    slider: {
      visible: true,
      step: 0,
      snapWidth: 0.11,
      numPoints: 2,
      reverse: true,
    },
    pointNames: ["", ""],
  },
};
//si se va a agregar algo al objeto tiene que declararce la propiedad por defecto en el mod.js

const contentMain = new CreateView(def, defBoards);
