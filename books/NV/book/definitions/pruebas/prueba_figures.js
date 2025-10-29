const defBoards = {
  board_1: {
    artifact: "figure_1",
    Interaction: {
      type: "Compass",
      // compass:"none"
      compass: {
        lengthCompass: 4,
      },
    },
    styles: {
      axis: false,
      boundingbox: [-7, 5, 7, -5],
    },
    shapes: [
      {
        maxLines: 3,
        points: [
          {
            x: -0.3,
            y: 2.5,
            style: {
              visible: true,
              fixed: true,
              size: 5,
              name: "Q",
              label: {offset: [-1, -15]},
            },
          },
          {
            x: -3,
            y: -0.8,
            style: {
              visible: true,
              fixed: true,
              size: 5,
              name: "P",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: -2,
            y: -2.6,
            style: {
              visible: true,
              fixed: true,
              size: 5,
              name: "B",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: 0.7,
            y: -1.5,
            style: {
              visible: true,
              fixed: true,
              size: 5,
              label: {offset: [-5, -15]},
            },
          },
          {
            x: 3,
            y: -2.6,
            style: {
              visible: true,
              fixed: true,
              size: 5,
              name: "A",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: 2.2,
            y: 1.3,
            style: {
              visible: true,
              fixed: true,
              size: 5,
              label: {offset: [-5, -15]},
            },
          },
        ],
      },
    ],
  },
  board_2: {
    artifact: "figure_2",
    styles: {
      axis: true,
      grid: true,
      // boundingbox: [-7, 5, 7, -5]
      // min_boundingbox: [-7, 3, 7, -3]
    },
    Interaction: {
      type: "Circle",
      compass: {
        lengthCompass: 4,
      },
    },
    shapes: [
      {
        points: [
          {
            x: -0.2,
            y: -2,
            ref: "point_A",
            style: {
              visible: true,
              fixed: false,
              size: 5,
              name: "A",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: -1.6,
            y: -3.2,
            ref: "point_B",
            style: {
              visible: true,
              fixed: false,
              size: 5,
              name: "B",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: -3.5,
            y: 3.3,
            ref: "point_C",
            style: {
              visible: true,
              fixed: false,
              size: 5,
              name: "C",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 3.5,
            y: -1.7,
            ref: "point_O",
            style: {
              visible: true,
              fixed: false,
              size: 5,
              name: "O",
              label: {offset: [-4, 15]},
            },
          },
          {
            x: 2.7,
            y: 1.3,
            ref: "point_D",
            style: {
              visible: true,
              fixed: false,
              size: 5,
              name: "D",
              label: {offset: [-5, -15]},
            },
          },
          {
            x: 0.6,
            y: 3.5,
            ref: "point_H",
            style: {
              visible: true,
              fixed: false,
              size: 5,
              name: "H",
              label: {offset: [4, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            style: {strokewidth: 2},
            type: "segment",
          },
          {
            refPt: ["point_A", "point_H"],
            style: {strokewidth: 2},
            type: "segment",
          },
          {
            refPt: ["point_A", "point_O"],
            style: {strokewidth: 2},
            type: "segment",
          },
          {
            refPt: ["point_A", "point_D"],
            style: {strokewidth: 2},
            type: "segment",
          },
          {
            refPt: ["point_A", "point_C"],
            style: {strokewidth: 2},
            type: "segment",
          },
        ],
      },
    ],
  },
  board_3: {
    artifact: "figure_3",
    styles: {
      axis: false,
      // grid:true
    },
    Interaction: {
      type: "Compass",
      // compass:"none"
      compass: {
        // isStatic:true,
        // lengthCompass:3.5,
        position: [
          [0, 0], // Centro para baseCompas
          [1.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-1.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    // maxLinesClick:5,
    shapes: [
      {
        type: "circle",
        refPt: ["point_A", "point_B"],
        ref: "circle_tagent_0",
        points: [
          {
            x: -1.4,
            y: 1,
            ref: "point_A",
            style: {
              visible: true,
              fixed: false,
              size: 5,
              name: "A",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: -4.1,
            y: 0.8,
            ref: "point_B",
            style: {
              visible: true,
              fixed: false,
              size: 5,
              name: "B",
              label: {offset: [-4, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_B"],
            ref: "line_tagent_0",
            style: {strokewidth: 4},
            type: "segment",
          },
        ],
        style: {
          fixed: true,
          strokeColor: "#3d348b",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 1,
        },
      },
      {
        type: "circle",
        refPt: ["point_C", "point_D"],
        ref: "circle_tagent_1",
        points: [
          {
            x: 3.8,
            y: 0.8,
            ref: "point_C",
            style: {
              visible: false,
              fixed: false,
              size: 5,
              name: "C",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 6.3,
            y: 0.8,
            ref: "point_D",
            style: {
              visible: false,
              fixed: false,
              size: 5,
              name: "D",
              label: {offset: [-4, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_C", "point_D"],
            ref: "line_tagent_0",
            style: {strokewidth: 4},
            type: "segment",
          },
        ],
        style: {
          fixed: true,
          strokeColor: "#3d348b",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 1,
        },
      },
      {
        type: "circle",
        refPt: ["point_2", "point_3"],
        ref: "circle_tagent_15",
        points: [
          {
            x: 0.1,
            y: -3.33,
            ref: "point_2",
            style: {
              visible: false,
              fixed: false,
              size: 5,
              name: "2",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 1.4,
            y: -3.7,
            ref: "point_3",
            style: {
              visible: false,
              fixed: false,
              size: 5,
              name: "3",
              label: {offset: [-4, -15]},
            },
          },
        ],
        style: {
          fixed: true,
          strokeColor: "#3d348b",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 1,
        },
      },
    ],
  },
  board_4: {
    artifact: "figure_4",
    styles: {boundingbox: [-5, 4, 7, -5]},
    shapes: [
      {
        type: "circle",
        refPt: ["point_0", "point_1"],
        ref: "circle_tagent_0",
        points: [
          {
            x: -2,
            y: -0.3,
            style: {visible: true, size: 6},
            text: {value: "A", angle: 280, radius: 0.6},
          },
          {x: -2, y: -2.7},
        ],
      },
      {
        type: "circle",
        refPt: ["point_0", "point_1"],
        ref: "circle_tagent_1",
        points: [
          {
            x: 3.6,
            y: -0.3,
            style: {visible: true, size: 6},
            text: {value: "B", angle: 280, radius: 0.6},
          },
          {x: 3.6, y: -3.5},
        ],
      },
    ],
  },
  board_5: {
    artifact: "figure_5",
    shapes: [
      {
        type: "polygon",
        style: {
          fillColor: "none",
          strokeWidth: 4,
        },
        refPt: ["point_0", "point_1", "point_2", "point_3"],
        points: [
          {x: -2.5, y: 3},
          {x: -2.5, y: -3},
          {x: 2.5, y: -3},
          {x: 2.5, y: 3},
          {x: 0, y: 0, style: {visible: true, size: 6}},
        ],
        // lines:[
        //   {
        //     points:[[0,0],[0,3]],
        //     refLn:["line_tagent_0","line_tagent_1"]
        //   },{
        //     points:[[0,0],[3,0]],
        //     refLn:["line_tagent_0","line_tagent_1"]
        //   },
        // ]
      },
    ],
  },
  board_6: {
    artifact: "figure_6",
    styles: {
      axis: true,
      grid: true,
      // boundingbox: [-7, 5, 7, -5]
      // min_boundingbox: [-7, 3, 7, -3]
    },
    Interaction: {
      type: "Circle",
      compass: {
        lengthCompass: 4,
      },
    },
    shapes: [
      {
        type: "circle",
        refPt: ["point_A", "point_B"],

        points: [
          {
            x: 0,
            y: 0,
            ref: "point_A",
            style: {
              visible: true,
              fixed: false,
              size: 3,
              name: "A",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 0,
            y: -4,
            ref: "point_B",
            style: {
              visible: false,
              fixed: false,
              size: 5,
              name: "B",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 3,
            y: -2.8,
            ref: "point_C",
            style: {
              visible: false,
              fixed: false,
              size: 5,
              name: "C",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 2.2,
            y: -3.4,
            ref: "point_D",
            style: {
              visible: false,
              fixed: false,
              size: 5,
              name: "D",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: -1.1,
            y: 3.7,
            ref: "point_E",
            style: {
              visible: false,
              fixed: false,
              size: 5,
              name: "E",
              label: {offset: [-4, -15]},
            },
          },
          {
            x: 1.1,
            y: -3.93,
            ref: "point_F",
            style: {
              visible: false,
              fixed: false,
              size: 5,
              name: "F",
              label: {offset: [-4, -15]},
            },
          },
        ],
        lines: [
          {
            refPt: ["point_A", "point_C"],
            ref: "line_tagent_0",
            style: {strokewidth: 3},
            type: "segment",
          },
          {
            refPt: ["point_E", "point_F"],
            ref: "line_tagent_0",
            style: {strokewidth: 3},
            type: "segment",
          },
        ],
      },
    ],
  },
};
const def = {
  scrollNav: true,
  artifacts: {
    // figure_1:{
    //     board: 'board_1',
    //     conditions:{
    //      segments: [['PQ'],['BA'],['oB']],
    //      inputs:[["o"]]
    //     },
    //     engine: engineFigure,
    // },
    // figure_2:{
    //   board: 'board_2',
    //   conditions:{
    //     // validacion de circulo
    //    circles:[
    //     [
    //       0,// representa la posicion de centro del circulo en respecto al eje de las X
    //      2,// representa la posicion de centro del circulo en respecto al eje de las Y
    //       3// representa al radio de circulo
    //     ],[-3,2,2]
    //    ]
    // },
    //   engine: engineFigure,

    // },
    figure_3: {
      board: "board_3",
      tools: [
        {
          tag: "inputs",
          containerTop: true,
          maxElementCheck: 2, // Máximo número de checkboxes permitidos
          style: {form: "formFigure"},
          value: "¿Te gusta la programación?",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
              correctResponce: false,
            },
          ],
        },
      ],

      conditions: {
        // tangents_circles:[
        //   {
        //     evaluate:"circle",
        //     lines:["line_tagent_1"],
        //     circle:["circle_tagent_1"],
        //   },
        //   {
        //     evaluate:"circle",
        //     lines:["line_tagent_0"],
        //     circle:["circle_tagent_0"],
        //   }
        // ],
        tangents_lines: [
          {
            lines: ["line_tagent_0"],
            circles: ["circle_tagent_0", "circle_tagent_1"],
          },
          {
            lines: ["line_tagent_1"],
            circles: ["circle_tagent_0", "circle_tagent_1"],
          },
          {
            lines: ["line_tagent_2"],
            circles: ["circle_tagent_0", "circle_tagent_1"],
          },
          {
            lines: ["line_tagent_3"],
            circles: ["circle_tagent_0", "circle_tagent_1"],
          },
        ],
      },
      engine: engineFigure,
    },
  },
};

const contentMain = new CreateView(def, defBoards);

// contentMain.initVIew(def);
