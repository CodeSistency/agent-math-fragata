const defBoards = {
  board_1: {
    artifact: "artifact_1",
    buttonInteraction: true,

    Interaction: {
      type: "Compass",
      compass: "none",
      compass: {
        isStatic: false,
        lengthCompass: 3,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 1,
    shapes: [
      {
        points: [
          {
            x: -4,
            y: -1,
            ref: "point_A",
            style: {
              visible: false,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 4,
            y: -1,
            ref: "point_B",
            style: {
              visible: false,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: -4,
            y: 1,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_2: {
    artifact: "artifact_2",
    buttonInteraction: true,

    Interaction: {
      type: "Compass",
      compass: {
        isStatic: false,
        lengthCompass: 3,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 1,
    shapes: [
      {
        points: [
          {
            x: -4,
            y: 1.5,
            ref: "point_A",
            style: {
              visible: false,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 4,
            y: 1.5,
            ref: "point_B",
            style: {
              visible: false,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: 0,
            y: -0.5,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_3: {
    artifact: "artifact_3",
    buttonInteraction: true,

    Interaction: {
      type: "Compass",
      compass: {
        lengthCompass: 3,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 1,
    shapes: [
      {
        points: [
          {
            x: -3,
            y: -1,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 3,
            y: 3,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: -1,
            y: -3,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_4: {
    artifact: "artifact_4",
    buttonInteraction: true,

    Interaction: {
      type: "Compass",
      compass: {
        isStatic: false,
        lengthCompass: 3,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 1,
    shapes: [
      {
        points: [
          {
            x: -2,
            y: -1.1,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 5.4,
            y: 4,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: -3.7,
            y: -2.1,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            ref: "lineEvaluate_0",
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
        texts: [{x: 5, y: -3.7, value: "Ojo!"}],
      },
    ],
  },
  board_5: {
    artifact: "artifact_5",
    buttonInteraction: true,

    Interaction: {
      type: "Compass",
      // compass:"none"
      compass: {
        isStatic: false,
        lengthCompass: 3,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 1,
    shapes: [
      {
        points: [
          {
            x: -3,
            y: -1,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 3,
            y: 3,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: -3.5,
            y: -3,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            ref: "lineEvaluate_0",
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_6: {
    artifact: "artifact_6",
    buttonInteraction: true,

    Interaction: {
      type: "Compass",
      compass: {
        lengthCompass: 3,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    maxLinesClick: 1,
    shapes: [
      {
        points: [
          {
            x: -3,
            y: 3,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 2,
            y: -2,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 0,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: 2,
            y: 0,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-4, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            ref: "lineEvaluate_0",
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
};
const def = {
  scrollNav: {
    lexico:
      "Haga los tres pasos en el mismo recuadro donde está planteado el problema. A veces hay que prolongar la recta para poder hacer el primer círculo. Algunos círculos van a sobrepasar el marco.",
  },
  artifacts: {
    artifact_1: {
      board: "board_1",
      conditions: {
        circles: [[-4, 1, 2]],
        tangents_circles: [
          {
            lines: ["line_tagent_0"],
            circles: ["circle_tagent_1"],
          },
        ],
        tangents_lines: [
          {
            lines: ["line_tagent_0"],
            circles: ["circle_tagent_1"],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_2: {
      board: "board_2",
      conditions: {
        circles: [[0, -0.5, 2]],
        tangents_circles: [
          {
            lines: ["line_tagent_0"],
            circles: ["circle_tagent_1"],
          },
        ],
        tangents_lines: [
          {
            lines: ["line_tagent_0"],
            circles: ["circle_tagent_1"],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_3: {
      board: "board_3",
      conditions: {
        circles: [[-1, -3, 2.8]],
        tangents_circles: [
          {
            lines: ["line_tagent_0"],
            circles: ["circle_tagent_1"],
          },
        ],
        tangents_lines: [
          {
            lines: ["line_tagent_0"],
            circles: ["circle_tagent_1"],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_4: {
      board: "board_4",
      conditions: {
        circles: [[-3.7, -2, 1.9]],
        tangents_circles: [
          {
            lines: [, "lineEvaluate_0"],
            circles: ["circle_tagent_1"],
          },
        ],
        tangents_lines: [
          {
            lines: ["line_tagent_0"],
            circles: ["circle_tagent_0"],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_5: {
      board: "board_5",
      conditions: {
        circles: [[-3.5, -3, 1.45]],
        tangents_circles: [
          {
            lines: [, "line_tagent_0"],
            circles: ["circle_tagent_1"],
          },
        ],
        tangents_lines: [
          {
            lines: ["line_tagent_0"],
            circles: ["circle_tagent_1"],
          },
        ],
      },
      engine: engineFigure,
    },
    artifact_6: {
      board: "board_6",
      conditions: {
        circles: [[2, 0.1, 1.4, 0.2]],
        tangents_circles: [
          {
            lines: [, "line_tagent_0"],
            circles: ["circle_tagent_1"],
          },
        ],
        tangents_lines: [
          {
            lines: ["line_tagent_0"],
            circles: ["circle_tagent_1"],
          },
        ],
      },
      engine: engineFigure,
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
