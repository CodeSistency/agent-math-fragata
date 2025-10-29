const defBoards = {
  //modelo 1

  board_1: {
    artifact: "artifact_1",
    styles: {
      boundingbox: [-3.5, 6.5, 3.5, -4],
      axies: {
        y: { visible: false },
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
        model: "3",
        height: 1.6,
        //   fillInterval: true,

        inputs: {
          b1: {
            disabledColor: true,
            disabled: true,
            value: "9",
          },
          b: {
            disabledColor: true,
            disabled: false,
            value: "12-3",
          },
          c: {
            disabled: true,
            value: "12",
          },
          a: {
            disabled: true,
            value: "3",
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
      boundingbox: [-3.5, 4, 3.5, -5.5],
      axies: {
        y: { visible: false },
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
        model: "3",
        height: 1.6,
        //   fillInterval: true,

        inputs: {
          a: {
            disabled: false,
            value: "",
          },
          b: {
            disabled: true,
            value: "8",
          },
          c: {
            disabled: true,
            value: "17",
          },
          a1: {
            disabledColor: true,
            disabled: false,
            value: "9",
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
    artifact: "artifact_1",
    styles: {
      boundingbox: [-3.5, 4, 3.5, -5.5],
      axies: {
        y: { visible: false },
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
        model: "3",
        height: 1.6,
        //   fillInterval: true,

        inputs: {
          b: {
            disabled: true,
            value: "6",
          },
          c: {
            disabled: false,
            value: "",
          },
          c1: {
            disabledColor: true,
            disabled: false,
            value: "9",
          },
          a: {
            disabled: true,
            value: "3",
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
    artifact: "artifact_1",
    styles: {
      boundingbox: [-3.5, 4, 3.5, -5.5],
      axies: {
        y: { visible: false },
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
        model: "3",
        height: 1.6,
        //   fillInterval: true,

        inputs: {
          b: {
            disabled: true,
            value: "8",
          },
          c: {
            disabled: true,
            value: "9",
          },
          a: {
            disabled: false,
            value: "",
          },
          a1: {
            disabledColor: true,
            disabled: false,
            value: "1",
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
    artifact: "artifact_1",
    styles: {
      boundingbox: [-3.5, 4, 3.5, -5.5],
      axies: {
        y: { visible: false },
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
        model: "3",
        height: 1.6,
        //   fillInterval: true,

        inputs: {
          b: {
            disabled: true,
            value: "6",
          },
          c: {
            disabled: false,
            value: "",
          },
          c1: {
            disabledColor: true,
            disabled: false,
            value: "139",
          },
          a: {
            disabled: true,
            value: "133",
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
  scrollNav: {
    lexico:
      "La operación debe hacerse con los números que no están en círculo y que están en el recuadro.",
  },
  artifacts: {
    example_1: {
      board: "board_1",
      engine: HorizontalSegment,
      parent: "main-content",
    },
    artifact_1: {
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
            values: [["17-8"]],
          },
        },
      },
    },
    artifact_2: {
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
            values: [["3+6"]],
          },
        },
      },
    },
    artifact_3: {
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
            values: [["9-8"]],
          },
        },
      },
    },
    artifact_4: {
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
            values: [["133+6"]],
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
