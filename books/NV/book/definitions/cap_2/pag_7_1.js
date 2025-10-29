const defBoards = {
  //modelo 1
  board_1: {
    newInp: true,
    btnSlider: false,

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
            value: "11",
          },
          b: {
            value: "8",
          },
          c: {
            value: "3",
          },
        },
      },
    ],
    slider: {
      visible: false,
      step: 0,
      snapWidth: 0.11,
      numPoints: 2,
      curvesVisible: false,
      pointVisible: true,
    },
    pointNames: ["", ""],
  },
  board_2: {
    newInp: true,
    btnSlider: false,

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
            value: "4",
          },
          b: {
            value: "2",
          },
          c: {
            value: "5",
          },
        },
      },
    ],
    slider: {
      visible: false,
      step: 0,
      snapWidth: 0.11,
      numPoints: 2,

      pointvisible: true,
    },
    pointNames: ["", ""],
  },
  board_3: {
    newInp: true,
    btnSlider: false,

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
            value: "1",
          },
          b: {
            value: "2",
          },
          c: {
            value: "5",
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
};

const def = {
  scrollNav: {
    lexico: " <h4>Corregir los posibles errores.</h4>",
  },
  artifacts: {
    artifact_1: {
      board: "board_1",

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
          },
        },
      },
    },
    artifact_2: {
      board: "board_2",
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
          },
        },
      },
    },
    artifact_3: {
      board: "board_3",
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
