//si se va a agregar algo al objeto tiene que declararce la propiedad por defecto en el mod.js
const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      board: "board_1",
      point: [
        {
          texto: "P",
          SizeText: 18,
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
            values: [["5"]],
          },
        },
      },
    },

    artifact_2: {
      board: "board_2",
      point: [
        {
          texto: "P",
          SizeText: 18,
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
            values: [["10"]],
          },
        },
      },
    },
    artifact_3: {
      board: "board_3",
      engine: HorizontalSegment,
      point: [
        {
          texto: "P",
          SizeText: 18,
        },
      ],
      parent: "lexico-content",
      conditions: {
        //elementos interval
        intervals: {
          //en los inputs
          inputs: {
            //si falla tiene este mensaje
            text: "Error desde la def",
            //tiene que tener estos valores
            values: [["4"]],
          },
        },
      },
    },
    artifact_4: {
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
            values: [["3"]],
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
    newMod: true,
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
            value: "15",
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
    pointNames: ["", "11", "12", "13", "14", ""],
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
          a: {
            disabled: true,
            value: "131",
          },
          c: {
            disabled: true,
            value: "141",
          },
        },
      },
    ],
    slider: {
      visible: true,
      step: 0,
      snapWidth: 0.11,
      numPoints: 11,
    },
    pointNames: [
      "",
      "132",
      "133",
      "134",
      "135",
      "136",
      "137",
      "138",
      "139",
      "140",
      "",
    ],
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
            value: "7",
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
    pointNames: ["", "4", "5", "6", ""],
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
            value: "0",
          },
          c: {
            disabled: true,
            value: "3",
          },
        },
      },
    ],
    slider: {
      visible: true,
      step: 0,
      snapWidth: 0.11,
      numPoints: 4,
    },
    pointNames: ["", "1", "2", ""],
  },
};

const contentMain = new CreateView(def, defBoards);
