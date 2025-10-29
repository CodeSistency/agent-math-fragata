let alphabet = { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas
  'exp': {  //exponencial 
    point: { coord: [0, 1], visible: false },
    keyCurve: 'exp(x)',
    options: {}, interval: []
  },
  'identidadNegativa': { /* Identidad negativa */
    point: { coord: [0, 1], visible: false },
    keyCurve: '-x',
    options: { strokeColor: '#7f7879', strokeWidth: 2 }
  },
  'ln': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'ln(x)',
    options: {}, interval: []
  },
  'identidad': { // identidad 
    point: { coord: [0, 1], visible: false },
    keyCurve: 'x',
    options: {}, interval: []
  },
  'alCuadrado': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'x^(2)',
    options: {}, interval: []
  },
  'sqrt': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'sqrt(x)',
    options: {}, interval: []
  },
  'inversaNumerica': { //inversa numerica
    point: { coord: [0, 1], visible: false },
    keyCurve: 'x^(-1)',
    options: {}, interval: []
  },
  'sin': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'sin(x)',
  
  },
}
let alphabet_2 = {
  'exp': {  //exponencial 
    point: { coord: [0, 1], visible: false },
    keyCurve: 'exp(x)',
    options: {}, interval: []
  },
  
  'identidadNegativa': { /* Identidad negativa */
    point: { coord: [0, 1], visible: false },
    keyCurve: '-x',
    options: { strokeColor: '#7f7879', strokeWidth: 2 }
  },
  'ln': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'ln(x)',
    options: {}, interval: []
  },
  'sqrt': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'sqrt(x)',
    options: {}, interval: []
  },
  'sin': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'sin(x)',
  
  },
  'inversaNumerica': { //inversa numerica
    point: { coord: [0, 1], visible: false },
    keyCurve: 'x^(-1)',
    options: {}, interval: []
  },
}
  
let defBoards = {
  
  board_1: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-1, 1, 2, 3],
        yv: ['-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',
  
      },
  
      grid: { style: '#bfbaba' },
  
      boundingbox: [-5, 5, 5, -5],
  
  
  
    },
    alphabet,
    asymptotes: [
      // { x: -3, validate: true },
      // { x: 0, validate: true },
  
    ],
  
  
  },
  
  
  board_2: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-1, 1, 2, 3],
        yv: ['-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',
  
      },
      grid: { style: '#bfbaba' },
      boundingbox: [-5, 5, 5, -5],
  
    },
    alphabet,
    asymptotes: [
      // { x: -3, validate: true },
      { x: 1, },
      // { x: 0, validate: true },
  
    ],
  
  
  },
  board_3: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-1, 1, 2, 3],
        yv: ['-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',
  
      },
  
      grid: { style: '#bfbaba' },
  
      boundingbox: [-5, 5, 5, -5],
  
  
  
    },
    alphabet: alphabet_2,
    asymptotes: [
      // { x: -3, validate: true },
      { x: 1.57, },
      { x: 0, },
  
      { x: -1.57, },
  
      // { x: 0, validate: true },
  
    ],
  
  
  },
  board_4: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-1, 1, 2, 3],
        yv: ['-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',
  
      },
  
      grid: { style: '#bfbaba' },
  
      boundingbox: [-5, 5, 5, -5],
  
  
  
    },
    alphabet: alphabet_2,
    asymptotes: [
      // { x: -3, validate: true },
      { x: 0 },
  
      // { x: 0, validate: true },
  
    ],
  
  
  },
  board_5: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-1, 1, 2, 3],
        yv: ['-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',
  
      },
  
      grid: { style: '#bfbaba' },
  
      boundingbox: [-4, 4, 4, -4],
  
  
  
    },
    alphabet,
    asymptotes: [
      { x: -3.15 },
      { x: 0, },
      { x: 3.15 },
  
  
  
      // { x: 0, validate: true },
  
    ],
  
  
  },
  board_6: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-1, 1, 2, 3],
        yv: ['-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',
  
      },
  
      grid: { style: '#bfbaba' },
  
      boundingbox: [-5, 5, 5, -5],
  
  
  
    },
    alphabet: alphabet,
    asymptotes: [
      // { x: -3, validate: true },
      { x: 0 },
  
      // { x: 0, validate: true },
  
    ],
  
  
  },
  
  board_7: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-1, 1, 2, 3],
        yv: ['-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',
  
      },
  
      grid: { style: '#bfbaba' },
  
      boundingbox: [-4, 5, 4, -3],
  
  
  
    },
    alphabet,
    asymptotes: [
      // { x: -3, validate: true },
      // { x: 0, validate: true },
  
    ],
  
  
  },
  board_10: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-1, 1, 2, 3],
        yv: ['-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',
  
      },
      grid: { style: '#bfbaba' },
      boundingbox: [-3, 3, 3, -3],
  
    },
    alphabet,
    asymptotes: [
      // { x: -3, validate: true },
      { x: 1, },
      // { x: 0, validate: true },
  
    ],
  
  
  },
  board_14: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-1, 1, 2, 3],
        yv: ['-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',
  
      },
  
      grid: { style: '#bfbaba' },
  
      boundingbox: [-3, 3, 3, -3],
  
  
  
    },
    alphabet,
    asymptotes: [
      { x: -3.15 },
      { x: 0, },
      { x: 3.15 },
  
  
  
      // { x: 0, validate: true },
  
    ],
  
  
  },
  
  board_17: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-1, 1, 2, 3],
        yv: ['-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',
  
      },
  
      grid: { style: '#bfbaba' },
  
      boundingbox: [-4, 4, 5, -3],
  
  
  
    },
    alphabet: alphabet,
    asymptotes: [
      // { x: -3, validate: true },
      { x: 0 },
  
      // { x: 0, validate: true },
  
    ],
  
  
  },
}
  
  
const def =
  {
  
  /* 
    artifact_1: {
      curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
      instructionText: {
        text: 'sin(x)-x'
      },
  
  
      conditions: {
        operationType: 0,
  
        multiplyCurves: ['sin(x)', '-x'],
        asymptotes: [
          { x: 1.5, y: -0.5 },
          { x: -1.5, y: 0.5 },
          { x: 1, y: -0.16 },
          { x: -1, y: 0.16 },
  
  
  
  
          // { x: -1.92, y: -1},
          // { x: 1.92, y: 1 },
  
        ]
      }
    },
  
  
    artifact_2: {
      curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
      visibleAsyntote:true,
      instructionText: {
        text: 'Ojo! \\hspace{1cm} \\frac{1}{x}+\\exponentialE^x'
      },
  
  
      conditions: {
        operationType: 0,
  
        multiplyCurves: ['x^(-1)', 'exp(x)'],
        asymptotes: [
          { x: -0.69, y: -1 }
          // { x: -0.56, y: -1 },
  
        ]
      }
    },
  
  
    artifact_3: {
      curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
      visibleAsyntote:true,
      instructionText: {
        text: 'Ojo! \\hspace{1cm} \\frac{1}{x}+\\ln\\left(x\\right)'
      },
      conditions: {
        operationType: 0,
        multiplyCurves: ['x^(-1)', 'ln(x)'],
        asymptotes: [
          //{ x:0.2, y: 2 }, //Se puede quitar
          { x:1, y: 1 },
          { x:1.7632228, y: 1.13428 },
          { x:2.72, y: 1.36828},
  
  
  
        ]
      }
    },
    //version copia artefacto 4
    artifact_6: {
      curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
      visibleAsyntote:true,
      instructionText: {
        text: 'Ojo! \\hspace{1cm} \\frac{1}{x}+\\ln\\left(x\\right)'
      },
      conditions: {
        operationType: 0,
        multiplyCurves: ['x^(-1)', 'ln(x)'],
        asymptotes: [
          //{ x:0.2, y: 2 },
          { x:0.367, y: 1.718 },
  
          { x:1, y: 1 },
          // { x:1.7632228, y: 1.13428 },
          // { x:2.72, y: 1.36828},
  
  
  
        ]
      }
    },
  
  
    artifact_7: {
      curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
      instructionText: {
        text: 'Ojo! \\hspace{1cm} x\\cdot\\ln\\left(x\\right)'
      },
  
  
      conditions: {
        operationType: 2,
  
        multiplyCurves: ['x', 'ln(x)'],
        asymptotes: [
          //{ x: 1.7632, y: 1 },
  
          // { x: 0.367879, y: -0.367879 }, //Se puede quitar
          //{ x: 0.368, y: -0.368 },
  
          { x: 2.72, y: 2.72 },
  
  
        ]
      }
    },
  
    //version copia artifact 5
    artifact_10: {
      curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
      instructionText: {
        text: 'Ojo! \\hspace{1cm} x\\cdot\\ln\\left(x\\right)'
      },
  
  
      conditions: {
        operationType: 2,
  
        multiplyCurves: ['x', 'ln(x)'],
        asymptotes: [
          //{ x: 1.7632, y: 1 },
  
          // { x: 0.367879, y: -0.367879 }, //Se puede quitar
          { x: 0.368, y: -0.368 },
  
          // { x: 2.72, y: 2.72 },
  
  
        ]
      }
    },
   */
  
    artifact_1: {
      curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
      instructionText: {
        text: 'Ojo! \\hspace{1cm} \\frac{1}{x}\\cdot\\sin\\left(x\\right)'
      },
  
  
      conditions: {
        operationType: 2,
        multiplyCurves: ['x^(-1)', 'sin(x)'],
        noise:0.3,
        asymptotes: [
          { x: 1, y: 0.8415 }, //Se puede pasar al otro artefacto
          { x: -1, y: 0.8415 },//Se puede pasar al otro artefacto
          { x: -1.5, y: 0.665 },
          { x: 1.5, y: 0.665 }
        ]
      }
    },
    //version copia artifact 6
    artifact_2: {
      curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
      
      instructionText: {
        text: 'Ojo! \\hspace{1cm} \\frac{1}{x}\\cdot\\sin\\left(x\\right)'
      },
  
  
      conditions: {
        operationType: 2,
        multiplyCurves: ['x^(-1)', 'sin(x)'],
        asymptotes: [
          { x: 1, y: 0.8415 }, //Se puede pasar al otro artefacto
          { x: -1, y: 0.8415 },//Se puede pasar al otro artefacto
          { x: 0.2, y: 0.9933 },
          { x: -0.5, y: 0.9588 }
        ]
      }
    },
  
    artifact_3: {
      curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
      instructionText: {
        text: 'Ojo! \\hspace{1cm} x\\cdot\\exponentialE^x'
      },
  
  
      conditions: {
        operationType: 2,
        multiplyCurves: ['x', 'exp(x)'],
        asymptotes: [
          /* { x: -1.5, y: 3 },
          { x: -1, y: 1 },
          { x: -0.5, y: 0.2 },
          { x: 1.5, y: -3 },
          { x: 1, y: -1 },
          { x: 0.5, y: -0.2 }, */
          { x: 1, y: 2.718 },
          { x: -1, y: -0.368 },
  
  
  
  
  
        ]
      }
    },
    artifact_4: {
      curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
      instructionText: {
        text: 'Ojo! \\hspace{1cm} x\\cdot\\exponentialE^x'
      },
  
  
      conditions: {
        operationType: 2,
        multiplyCurves: ['x', 'exp(x)'],
        asymptotes: [
          /* { x: -1.5, y: 3 },
          { x: -1, y: 1 },
          { x: -0.5, y: 0.2 },
          { x: 1.5, y: -3 },
          { x: 1, y: -1 },
          { x: 0.5, y: -0.2 }, */
          { x: 0.548, y: 0.95 },
          { x: -1, y: -0.368 },
  
  
  
  
  
        ]
      }
    },
  
  
  
  }
  
const def2 = {


  
  artifact_5: {
    quizType: 'table',
    rendering: 'rendering_3',
    //config: "procedural",
    //title: "Hola",
    keyBoardProfile: ['numeric','functions'],         quiz: {
      header: [
  
        [//row
          {//cell 
  
            nodes:
                            [
                              {
                                //tipo de pregunta
                                type: 'text',
                                //label,Answer,Validation
                                data: 'x ',
                                formato: {
                                  fontSize: '1rem',
                                  fontStyle: 'italic',
  
                                }
                              }
                            ]
          },
          {//cell 
  
  
            nodes:
                            [
                              {
                                //tipo de pregunta
                                type: 'text',
                                //label,Answer,Validation
                                data: '0.5',
                                formato: {
  
                                }
                              }
                            ]
          },
          {//cell 
  
  
            nodes:
                            [
                              {
                                //tipo de pregunta
                                type: 'text',
                                //label,Answer,Validation
                                data: '0.05',
                                formato: {
  
                                }
                              }
                            ]
          },
                    
        ],
  
  
  
      ],
      cells:
                [
                   
                  [// row
                    {//cell
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'text',
                                    //label,Answer,Validation
                                    data: `<math xmlns='http://www.w3.org/1998/Math/MathML'>
                                        <mrow>
                                         <mfrac>
                                          <mn>1</mn>
                                          <mi>x</mi>
                                         </mfrac>
                                         <mo>*</mo>                                                                                                                                           
                                         <mrow>
                                          <mi>Sin</mi>
  
                                          <mo>(</mo>
                                          <mi>x</mi>
                                          <mo>)</mo>
  
                                         </mrow>
                                        </mrow>
                                       </math>
                                       `,
                                    formato: {
                                      fontSize: '24px',
                                      fontStyle: 'italic',
  
                                    }
                                  }
  
                                ]
                    },
  
                    {
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'mathfield',
                                    //label,Answer,Validation
                                    data: {
                                      label: 'f(x)s',
                                      condition: '0.958851',
                                      questionType: 'basic'
                                    }
                                  },
                               
                                  /* 0.2397127693021015
  VM3378:1 0.002498958463533917
  VM3378:1 0.00002499989583346354
  VM3378:1 2.4999998958333343e-7 */
                                ]
                    },
                    {
                      nodes:
                                [
                                  {
                                    type: 'mathfield',
                                    data: {
                                      label: 'raul1',
                                      condition: '0.999583',
                                      questionType: 'basic'
                                    }
                                  },
                                 
  
  
                                ]
                    },
                      
                  ],
                 
  
                ],
  
    }
  
  },
  artifact_6: {
    quizType: 'table',
    rendering: 'rendering_3',
    //config: "procedural",
    //title: "Hola",
    keyBoardProfile: ['numeric','functions'],         quiz: {
      header: [
  
        [//row
          {//cell 
  
            nodes:
                            [
                              {
                                //tipo de pregunta
                                type: 'text',
                                //label,Answer,Validation
                                data: 'x ',
                                formato: {
                                  fontSize: '1rem',
                                  fontStyle: 'italic',
  
                                }
                              }
                            ]
          },
                    
          {//cell 
  
  
            nodes:
                            [
                              {
                                //tipo de pregunta
                                type: 'text',
                                //label,Answer,Validation
                                data: '0.005',
                                formato: {
  
                                }
                              }
                            ]
          },
          {//cell 
  
  
            nodes:
                            [
                              {
                                //tipo de pregunta
                                type: 'text',
                                //label,Answer,Validation
                                data: '0.0005',
                                formato: {
  
                                }
                              }
                            ]
          }
        ],
  
      ],
      cells:
                [
                   
                  [// row
                    {//cell
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'text',
                                    //label,Answer,Validation
                                    data: `<math xmlns='http://www.w3.org/1998/Math/MathML'>
                                        <mrow>
                                         <mfrac>
                                          <mn>1</mn>
                                          <mi>x</mi>
                                         </mfrac>
                                         <mo>*</mo>                                                                                                                                           
                                         <mrow>
                                          <mi>Sin</mi>
  
                                          <mo>(</mo>
                                          <mi>x</mi>
                                          <mo>)</mo>
  
                                         </mrow>
                                        </mrow>
                                       </math>
                                       `,
                                    formato: {
                                      fontSize: '24px',
                                      fontStyle: 'italic',
  
                                    }
                                  }
  
                                ]
                    },
  
                    {
                      nodes:
  
                         
                            {
                              //tipo de pregunta
                              type: 'mathfield',
                              //label,Answer,Validation
                              data: {
                                label: 'Dominio',
                                condition: ['0.999996'],
                                questionType: 'expression'
                              }
  
                            },
                    },
                    {
                      nodes:
  
                            {
                              //tipo de pregunta
                              type: 'mathfield',
                              //label,Answer,Validation
                              data: {
                                label: 'Dominio',
                                condition: ['1'],
                                questionType: 'expression'
                              }
  
                            },
                    }
                  ],
                 
  
                ],
  
    }
  
  },
  
  
  
  artifact_7: {
    quizType: 'standard',
    rendering: 'rendering_ex',
    //  config: "procedural",
    //title: "Hola Mundo",
    keyBoardProfile: ['numeric','functions'],        quiz: {
      generalLayout: '',
      formsQuestions: [
        {
          layout: 'horizontal',
          nodes:
                    [
  
  
                      {
                        //tipo de pregunta
                        type: 'mathfield',
                        //label,Answer,Validation
                        data: {
                          label: `<math xmlns='http://www.w3.org/1998/Math/MathML'>
                                <mrow>
                                 <mo>-</mo>
                                 <mn>3</mn>
                                 <mo>*</mo>
  
                                 <msup>
                                 <mi>e</mi>
                                 <mn>-3</mn>
                                </msup>
                                </mrow>
                               </math>`,
                          condition: ['-0.149361'],
                          questionType: 'expression'
                        }
                      },
                      {
                        //tipo de pregunta
                        type: 'mathfield',
                        //label,Answer,Validation
                        data: {
                          label: `<math xmlns='http://www.w3.org/1998/Math/MathML'>
                                <mrow>
                                 <mo>-</mo>
                                 <mn>5</mn>
                                 <mo>*</mo>
  
                                 <msup>
                                 <mi>e</mi>
                                 <mn>-5</mn>
                                </msup>
                                </mrow>
                               </math>`,
                          condition: ['-0.033690'],
                          questionType: 'expression'
                        }
  
  
  
                      },
  
                      {
                        //tipo de pregunta
                        type: 'mathfield',
                        //label,Answer,Validation
                        data: {
                          label: `<math xmlns='http://www.w3.org/1998/Math/MathML'>
                                <mrow>
                                 <mo>-</mo>
                                 <mn>10</mn>
                                 <mo>*</mo>
  
                                 <msup>
                                 <mi>e</mi>
                                 <mn>-10</mn>
                                </msup>
                                </mrow>
                               </math>`,
                          condition: ["-0.000454"],
                          questionType: 'expression'
                        }
  
  
  
                      },
  
  
  
                    ]
        },
  
      ],
  
    }
  
  
  
  },
  
}
  
  
new GenerateSumConstant(def, defBoards)
  
const quizGen = new QuizGenerator(def2)
quizGen.generateObject()
  