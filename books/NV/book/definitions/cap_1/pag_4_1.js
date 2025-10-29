const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      board: "board_1",
      engine: HorizontalSegment,
      helpArtifact: {
        message:
          "Agrega un número en el extremo Izquierdo y contando 3 pasos, obtendrás el extremo derecho.",
      },
      parent: "lexico-content",
      point: [
        {
          coordenada: [-0.4, -1],
          texto: "Ojo!",
          SizeText: 14,
        },
      ],
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
            values: [["105"]],
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
            values: [["99"]],
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
            values: [["110"]],
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

        inputs: {
          b: {
            disabled: true,
            value: "3 \\hspace{0.1cm} Pasos",
          },
        },
      },
    ],
    curioso: true,
    slider: {
      visible: true,
      step: 0,
      snapWidth: 0.11,
      numPoints: 4,
    },
    pointNames: ["", "", "", " "],
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
            value: "101",
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
    pointNames: ["", "102", "103", "104", ""],
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
          b: {
            disabled: true,
            value: "2 \\hspace{0.1cm} Pasos",
          },
          c: {
            disabled: true,
            value: "101",
          },
        },
      },
    ],
    slider: {
      visible: true,
      step: 0,
      snapWidth: 0.11,
      numPoints: 3,
      reverse: true,
    },
    pointNames: ["", "100", ""],
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
            value: "99",
          },
          b: {
            disabled: true,
            value: "11 \\hspace{0.1cm} Pasos",
          },
        },
      },
    ],
    slider: {
      visible: true,
      step: 0,
      snapWidth: 0.11,
      numPoints: 12,
    },
    pointNames: [
      "",
      "100",
      "101",
      "102",
      "103",
      "104",
      "105",
      "106",
      "107",
      "108",
      "109",
      "",
    ],
  },
};
//si se va a agregar algo al objeto tiene que declararce la propiedad por defecto en el mod.js

const contentMain = new CreateView(def, defBoards);
