const def = {
  scrollNav: true,

  artifacts: {
    artifact_1: {
      board: "board_1",
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
            values: [["m-l"]],
          },
        },
      },
    },
    artifact_2: {
      board: "board_2",
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
            values: [["b-a"]],
          },
        },
      },
    },
    artifact_3: {
      board: "board_3",
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
            values: [["l+m"]],
          },
        },
      },
    },
    artifact_4: {
      board: "board_4",
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
            values: [["k-h"]],
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
            value: "L",
          },
          c: {
            disabled: true,
            value: "M",
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
            value: "A",
          },
          c: {
            disabled: true,
            value: "B",
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
    artifact: "artifact_4",
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
          a: {
            disabled: true,
            value: "L",
          },

          b: {
            disabled: true,
            value: "M",
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
          a: {
            disabled: true,
            value: "H",
          },
          c: {
            disabled: true,
            value: "K",
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

const contentMain = new CreateView(def, defBoards);
