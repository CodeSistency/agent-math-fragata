const defBoards = {
  board_1: {
    artifact: "artifact_1",
    buttonSegment: true,

    Interaction: {
      type: "Segment",
      compass: "none",
      compass: {
        isStatic: true,
        lengthCompass: 4,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    // maxLinesClick:5,
    shapes: [
      {
        type: "arc",
        refPt: ["point_A", "point_B", "point_C"],

        points: [
          {
            x: -0.16,
            y: -0.76,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-1, -14]},
            },
          },
          {
            x: 3.48,
            y: -0.78,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: -0.22,
            y: 2.9,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
        style: {
          fixed: true,
          strokeColor: "#076382",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 5,
          highlight: false,
        },
      },
      {},
    ],
  },
  board_2: {
    artifact: "artifact_2",
    buttonSegment: true,

    Interaction: {
      type: "Segment",
      compass: "none",
      compass: {
        isStatic: true,
        lengthCompass: 4,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    // maxLinesClick:5,
    shapes: [
      {
        type: "arc",
        refPt: ["point_A", "point_B", "point_C"],

        points: [
          {
            x: 0,
            y: -1,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-1, -14]},
            },
          },
          {
            x: 4,
            y: -1,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: -4,
            y: -1,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
        style: {
          fixed: true,
          strokeColor: "#076382",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 5,
          highlight: false,
        },
      },
      {
        // points:[
        //   {x:0,y:3.65,ref:"point_C",style:{visible:true,fixed:false,size:3,name:'',label:{offset:[8,-1]}}},
        //   {x:4,y:-0.33,ref:"point_D",style:{visible:true,fixed:true,size:3,name:'',label:{offset:[8,-1]}}},
        //   {x:1.41,y:-1.73,ref:"point_E",style:{visible:true,fixed:false,size:3,name:'C',label:{offset:[8,-1]}}},
        //   {x:0,y:4.3,ref:"point_F",style:{visible:false,fixed:false,size:3,name:'',label:{offset:[8,-1]}}},
        //   {x:5,y:-0.33,ref:"point_G",style:{visible:false,fixed:true,size:3,name:'',label:{offset:[8,-1]}}},
        //   {x:-1.25,y:4.2,ref:"point_H",style:{fillOpacity: 0, strokeOpacity:0, visible:true,fixed:true,size:3,name:'A',label:{offset:[8,-1]}}},
        //   {x:3.96,y:-0.9,ref:"point_I",style:{fillOpacity: 0, strokeOpacity:0, visible:true,fixed:true,size:3,name:'B',label:{offset:[8,-1]}}},
        // ],
      },
    ],
  },
  board_3: {
    artifact: "artifact_3",
    buttonSegment: true,

    Interaction: {
      type: "Segment",
      compass: "none",
      compass: {
        isStatic: true,
        lengthCompass: 4,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    // maxLinesClick:5,
    shapes: [
      {
        type: "arc",
        refPt: ["point_A", "point_B", "point_C"],

        points: [
          {
            x: 0,
            y: 0,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-1, -14]},
            },
          },
          {
            x: 3,
            y: 0,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
          {
            x: 0,
            y: -3,
            ref: "point_C",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
        style: {
          fixed: true,
          strokeColor: "#076382",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 5,
          highlight: false,
        },
      },
      {
        // points:[
        //   {x:0,y:3.65,ref:"point_C",style:{visible:true,fixed:false,size:3,name:'',label:{offset:[8,-1]}}},
        //   {x:4,y:-0.33,ref:"point_D",style:{visible:true,fixed:true,size:3,name:'',label:{offset:[8,-1]}}},
        //   {x:1.41,y:-1.73,ref:"point_E",style:{visible:true,fixed:false,size:3,name:'C',label:{offset:[8,-1]}}},
        //   {x:0,y:4.3,ref:"point_F",style:{visible:false,fixed:false,size:3,name:'',label:{offset:[8,-1]}}},
        //   {x:5,y:-0.33,ref:"point_G",style:{visible:false,fixed:true,size:3,name:'',label:{offset:[8,-1]}}},
        //   {x:-1.25,y:4.2,ref:"point_H",style:{fillOpacity: 0, strokeOpacity:0, visible:true,fixed:true,size:3,name:'A',label:{offset:[8,-1]}}},
        //   {x:3.96,y:-0.9,ref:"point_I",style:{fillOpacity: 0, strokeOpacity:0, visible:true,fixed:true,size:3,name:'B',label:{offset:[8,-1]}}},
        // ],
      },
    ],
  },
  board_4: {
    artifact: "artifact_4",
    buttonSegment: true,

    Interaction: {
      type: "Segment",
      compass: "none",
      compass: {
        isStatic: true,
        lengthCompass: 4,
        position: [
          [0, 0], // Centro para baseCompas
          [5.6, -3.2], // Para punta_1 (ajuste según sea necesario)
          [-5.6, -3.2], // Para punta_2 (ajuste según sea necesario)
        ],
      },
    },
    shapes: [
      {
        type: "circle",
        refPt: ["point_A", "point_B"],

        points: [
          {
            x: 0.22,
            y: 0,
            ref: "point_A",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [-1, -14]},
            },
          },
          {
            x: 4.21,
            y: 0,
            ref: "point_B",
            style: {
              visible: true,
              fixed: true,
              size: 3,
              name: "",
              label: {offset: [8, -1]},
            },
          },
        ],
        style: {
          fixed: true,
          strokeColor: "#076382",
          strokeWidth: 3,
          fillColor: "transparent",
          fillOpacity: 5,
          highlight: false,
        },
      },
    ],
  },
};
const allDef = {
  scrollNav: true,
  artifacts: {
    lexico_1: {
      nodo: [
        {
          texto: "<b>Medidas de ángulos</b>",
          atributos: {style: "text-align:justify;font-size:25px;"},
        },
        {
          texto:
            "De acuerdo a la apertura del vértice los ángulos se clasifican en <b>obtusos, agudos y rectos.</b>",
          atributos: {style: "text-align:justify;"},
        },
        {
          texto:
            "Las <b>unidades</b> más comunes para medir los ángulos son los <b>los grados sexagesimales y los radianes.</b>",
          atributos: {style: "text-align:justify;"},
        },
      ],

      recursos: [
        {
          recurso: {
            styles: {
              boundingbox: [-2.5, 2.8, 2.5, -3.2],
              axies: {
                y: {visible: false},
                x: {visible: false},
              },
            },
            styleRecurso: ["lexico_example_figure_large"],
            grafico: [
              {
                linea: [
                  {
                    punto_1: [-0.88, -3.2],
                    punto_2: [-0.88, 3],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [0.86, -3.2],
                    punto_2: [0.86, 3],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [-2.25, -0.68],
                    punto_2: [-1.48, -0.68],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [-2.25, -0.68],
                    punto_2: [-1.66, 1.08],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [-0.37, -0.73],
                    punto_2: [-0.37, 1.08],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [-0.37, -0.73],
                    punto_2: [0.45, -0.73],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [1.4, -0.73],
                    punto_2: [2.2, -0.73],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [1.4, -0.73],
                    punto_2: [1.1, 1.08],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [-3, 1.7],
                    punto_2: [3, 1.7],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [-3, -1.35],
                    punto_2: [3, -1.35],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                  {
                    punto_1: [-3, -2.1],
                    punto_2: [3, -2.25],
                    stylesLine: {strokeWidth: 2, strokeColor: "#076382"},
                  },
                ],

                texto: [
                  {
                    x: -1.95,
                    y: 2.3,
                    mensaje: "Agudo",
                    stylesText: {cssClasses: "text_figure"},
                  },

                  {
                    x: -0.25,
                    y: 2.3,
                    mensaje: "Recto",
                    stylesText: {cssClasses: "text_figure"},
                  },

                  {
                    x: 1.45,
                    y: 2.3,
                    mensaje: "Obtuso",
                    stylesText: {cssClasses: "text_figure"},
                  },
                  {
                    x: -2.2,
                    y: -1.75,
                    mensaje: "Menos de 90°",
                    stylesText: {cssClasses: "text_figure"},
                  },
                  {
                    x: -2.4,
                    y: -2.7,
                    mensaje: "Menos de π/2 rad",
                    stylesText: {cssClasses: "text_figure"},
                  },
                  {
                    x: -0.15,
                    y: -1.75,
                    mensaje: "90°",
                    stylesText: {cssClasses: "text_figure"},
                  },
                  {
                    x: -0.25,
                    y: -2.7,
                    mensaje: "π/2 rad",
                    stylesText: {cssClasses: "text_figure"},
                  },
                  {
                    x: 1.25,
                    y: -1.75,
                    mensaje: "Más de 90°",
                    stylesText: {cssClasses: "text_figure"},
                  },
                  {
                    x: 1.1,
                    y: -2.7,
                    mensaje: "Más de π/2 rad",
                    stylesText: {cssClasses: "text_figure"},
                  },
                ],
              },
            ],
          },
        },
      ],

      styleContainer: "note",
      engine: EngineOwner,
    },
    lexico_2: {
      nodo: [
        {
          texto: "<b>Casos extremos:</b>",
          atributos: {style: "text-align:left;font-size:25px;"},
        },
        {
          texto:
            "Un vértice sin punta. Corresponde a un ángulo obtuso igual al doble de un recto.",
          atributos: {style: "text-align:justify;"},
        },
        {
          texto:
            "Ángulos mayores que dos rectos. Para reconocerlos se suele poner un arco entre los lados del vértice.",
          atributos: {style: "text-align:justify;"},
        },
      ],

      recursos: [
        {
          recurso: {
            styles: {
              boundingbox: [-4, 4, 4, -4],
              axies: {
                y: {visible: false},
                x: {visible: false},
              },
            },
            styleRecurso: ["lexico_example_figure_medium"],
            grafico: [
              {
                linea: [
                  {
                    punto_1: [-0.27, -0.22],
                    punto_2: [2.68, -0.37],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                    // stylesPoint_1: {visible:true},  stylesPoint_2: {visible:true}
                  },
                  {
                    punto_1: [-0.27, -0.22],
                    punto_2: [1, 2.41],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                    // stylesPoint_1: {visible:true},  stylesPoint_2: {visible:true}
                  },
                ],

                ellipse: [
                  {
                    punto_1: [-0.27, -0.22],
                    punto_2: [0.82, 2.04],
                    punto_3: [1.65, -0.3],

                    type: "arc",

                    styles: {
                      strokeColor: "#91c2d2",
                      strokeWidth: 3,
                      lastArrow: {type: 1},
                      firstArrow: {type: 1},
                    },
                    stylesPoint_1: {
                      visible: true,
                      fixed: true,
                      fillColor: "#076382",
                      strokeColor: "#076382",
                    },
                    // stylesPoint_2:{visible:true,fixed:false},
                    // stylesPoint_3: { visible: true, fixed: false, fillColor: '#076382', strokeColor: '#076382', },
                  },
                ],
              },
            ],
          },
        },
        {
          recurso: {
            styles: {
              boundingbox: [-4, 4, 4, -4],
              axies: {
                y: {visible: false},
                x: {visible: false},
              },
            },
            styleRecurso: ["lexico_example_figure_medium"],
            grafico: [
              {
                linea: [
                  {
                    punto_1: [-0.75, -2.05],
                    punto_2: [2.49, -2.05],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                    // stylesPoint_1: {visible:true},  stylesPoint_2: {visible:true}
                  },
                  {
                    punto_1: [-0.75, -2.05],
                    punto_2: [-0.78, 1.89],
                    stylesLine: {strokeWidth: 3, strokeColor: "#076382"},
                    // stylesPoint_1: {visible:true},  stylesPoint_2: {visible:true}
                  },
                ],

                ellipse: [
                  {
                    punto_1: [-0.32, -1.4],
                    punto_2: [0.97, -1.73],
                    punto_3: [-0.89, 1.96],

                    type: "arc",

                    styles: {
                      strokeColor: "#91c2d2",
                      strokeWidth: 3,
                      lastArrow: {type: 1},
                      firstArrow: {type: 1},
                    },
                    // stylesPoint_1: { visible: true, fixed: false, fillColor: '#076382', strokeColor: '#076382', },
                    // stylesPoint_2:{visible:true,fixed:false},
                    // stylesPoint_3: { visible: true, fixed: false, fillColor: '#076382', strokeColor: '#076382', },
                  },
                ],
              },
            ],
          },
        },
      ],

      styleContainer: "note",
      engine: EngineOwner,
    },
    artifact_1: {
      description:
        " <b>Arcos y ángulos</b>Complete con los vértices correspondientes. <br> Nota: tome en cuenta que 2 x π/2 = π  y que 2 x 90 = 180,...etc.",
      tools: [
        {
          tag: "form",
          containerTop: true,
          style: {form: "formfigureTop"},
          value: "Un cuarto de círculo <br> Tamaño = recto",
        },
        {
          tag: "form",

          style: {form: "formFigureTools"},
          value: "90 grados <br> π/2 radianes ",
        },
      ],
      conditions: {
        lines: [
          {
            points: [
              [
                [-0.22, 2.9],
                [-0.16, -0.76],
              ],
              [
                [3.48, -0.78],
                [-0.16, -0.76],
              ],
            ],
            refLn: ["line_segment_0"],
          },
          {
            points: [
              [
                [-0.22, 2.9],
                [-0.16, -0.76],
              ],
              [
                [3.48, -0.78],
                [-0.16, -0.76],
              ],
            ],
            refLn: ["line_segment_1"],
          },
        ],
      },
      board: "board_1",
      engine: engineFigure,
    },
    artifact_2: {
      conditions: {
        lines: [
          {
            points: [
              [
                [-4, -1],
                [0, -1],
              ],
              [
                [4, -1],
                [0, -1],
              ],
            ],
            refLn: ["line_segment_0"],
          },
          {
            points: [
              [
                [-4, -1],
                [0, -1],
              ],
              [
                [4, -1],
                [0, -1],
              ],
            ],
            refLn: ["line_segment_1"],
          },
        ],
        inputs: [["2"], ["180"], ["\\pi"]],
      },
      tools: [
        {
          tag: "form",
          containerTop: true,
          style: {form: "formfigureTop"},
          value: "Medio círculo",
        },
        {
          tag: "form",
          containerTop: true,
          style: {form: "formfigureTop"},
          spans: [
            {
              value: "Tamaño =",
              input: true,
              style: {input: "mathSmall", span: "spanRowFigure"},
            },
            {value: "rectos"},
          ],
        },
        {
          tag: "form",
          style: {form: "formFigure2"},

          spans: [
            {input: true, style: {input: "mathSmall", span: "spanRowFigure"}},
            {value: "Grados"},
          ],
        },

        {
          tag: "form",
          style: {form: "formFigure2"},

          spans: [
            {input: true, style: {input: "mathSmall", span: "spanRowFigure"}},
            {value: "Radianes"},
          ],
        },
      ],
      board: "board_2",
      engine: engineFigure,
    },
    artifact_3: {
      conditions: {
        lines: [
          {
            points: [
              [
                [0, -3],
                [0, 0],
              ],
              [
                [3, 0],
                [0, 0],
              ],
            ],
            refLn: ["line_segment_0"],
          },
          {
            points: [
              [
                [0, -3],
                [0, 0],
              ],
              [
                [3, 0],
                [0, 0],
              ],
            ],
            refLn: ["line_segment_1"],
          },
        ],
        inputs: [["2"], ["270"], ["3\\pi/2", "\\frac{3\\pi}{2}"]],
      },
      tools: [
        {
          tag: "form",
          containerTop: true,
          style: {form: "formfigureTop"},
          value: "Tres cuartos de círculo",
        },
        {
          tag: "form",
          containerTop: true,
          style: {form: "formfigureTop"},
          spans: [
            {
              value: "Tamaño =",
              input: true,
              style: {input: "mathSmall", span: "spanRowFigure"},
            },
            {value: "rectos"},
          ],
        },
        {
          tag: "form",
          style: {form: "formFigure2"},

          spans: [
            {input: true, style: {input: "mathSmall", span: "spanRowFigure"}},
            {value: "Grados"},
          ],
        },

        {
          tag: "form",
          style: {form: "formFigure2"},

          spans: [
            {input: true, style: {input: "mathSmall", span: "spanRowFigure"}},
            {value: "Radianes"},
          ],
        },
      ],
      board: "board_3",
      engine: engineFigure,
    },
    artifact_4: {
      tools: [
        {
          tag: "form",
          containerTop: true,
          style: {form: "formfigureTop"},
          value: "Un círculo completo",
        },
        {
          tag: "form",
          containerTop: true,
          style: {form: "formfigureTop"},
          spans: [
            {
              value: "Tamaño =",
              input: true,
              style: {input: "mathSmall", span: "spanRowFigure"},
            },
            {value: "rectos"},
          ],
        },
        {
          tag: "form",
          style: {form: "formFigure2"},

          spans: [
            {input: true, style: {input: "mathSmall", span: "spanRowFigure"}},
            {value: "Grados"},
          ],
        },

        {
          tag: "form",
          style: {form: "formFigure2"},

          spans: [
            {input: true, style: {input: "mathSmall", span: "spanRowFigure"}},
            {value: "Radianes"},
          ],
        },
      ],
      conditions: {
        lines: [
          {
            points: [
              [
                [0.22, 0],
                [4.21, 0],
              ],
            ],
            refLn: ["line_segment_0"],
          },
        ],
        inputs: [["1"], ["360"], ["2\\pi"]],
      },
      board: "board_4",
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

const contentMain = new CreateView(allDef, defBoards);
