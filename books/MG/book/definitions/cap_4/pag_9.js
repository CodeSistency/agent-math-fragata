let def = {
  example_artifact_1: {

    variableX: '7',
    buttonsActive: false,
    characteristicsArtifact: {
      typeForm: 'artifactGrid',
      width: '250px',
      height: 'auto',
      arrow: {
        count: 1,
        direction: 'down'
      },
      typeDiv: [
        {
          rounded: {
            count: 2,
            border: '1px solid black',
            formClas: 'rounded',
            inputEnable: true,
            size: {
              width: '150px',
              height: '50px'
            }
          }
        },
        {
          square: {
            count: 1,
            border: '1px solid black',
            formClas: 'square',
            inputEnable: true,
            size: {
              width: '100px',
              height: '50px'
            }
          }
        }
      ]

    },
    defaultinput: {
      screen: { defaultText: [{ textValue: 'x', disabled: true }, { textValue: 'tan(x)', disabled: true }] },
      key: { defaultText: [{ textValue: '\\tan\\left(\\space\\right)', disabled: true }] }
    },
    conditions: {
      screen: [[], [], []],
      //    key: []
    }
  },
}

let def2 =                               
{
  artifact_1: {
    quizType: 'table',
    rendering: 'example_rendering',
    // config: "procedural",
    // title: "Hola",
    keyBoardProfile: [ 'functions', 'symbols'], quiz: {

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
                                    data: 'Tecla',
                                    formato: {

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
                                      label: '',
                                      condition: ['tanleft(placeholder{}right)', 'tanleft(right)'],
                                      questionType: 'expression'
                                    }
                                  },

                                ]
                    },

                  ],

                  [// row
                    {//cell
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'text',
                                    //label,Answer,Validation
                                    data: 'Notación funcional',
                                    formato: {

                                    }
                                  }



                                ]
                    },

                    {
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'mathfieldSet',
                                    //label,Answer,Validation
                                    data: {
                                      placeholder: 'f\\left(x\\right)=\\placeholder[value_1]{}',
                                      condition: {
                                        value_1: 'tanleft(xright)',

                                      },
                                    }



                                  },



                                ]
                    },

                  ],



                  [// row
                    {//cell
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'text',
                                    //label,Answer,Validation
                                    data: 'Ecuacion en dos variables',
                                    formato: {

                                    }
                                  }



                                ]
                    },

                    {
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'mathfieldSet',
                                    //label,Answer,Validation
                                    data: {
                                      placeholder: 'y=\\placeholder[value_1]{}',
                                      condition: {
                                        value_1: 'tanleft(xright)',

                                      },
                                    }



                                  },



                                ]
                    },

                  ],



                  [// row
                    {//cell
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'text',
                                    //label,Answer,Validation
                                    data: 'Pares ordenados',
                                    formato: {

                                    }
                                  }



                                ]
                    },

                    {
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'mathfieldSet',
                                    //label,Answer,Validation
                                    data: {
                                      placeholder: '(x,\\placeholder[value_1]{})',
                                      condition: {
                                        value_1: 'tanleft(xright)',

                                      },
                                    }



                                  },




                                ]
                    },

                  ],

                ],

    }

  },
  artifact_3: {
    quizType: 'standard',
    rendering: 'rendering_1',
    //  config: "procedural",
    //  title: "Hola Mundo",
    keyBoardProfile: ['numeric', 'functions', 'symbols'], quiz: {
      generalLayout: '',
      formsQuestions: [
        {
          layout: 'vertical',
          nodes:
                        [




                          {
                            //tipo de pregunta
                            type: 'mathfieldSet',
                                

                            //label,Answer,Validation
                            data: {
                              placeholder: '\\left(-\\infty,\\infty\\right)-\\left\\lbrace\\ldots\\placeholder[value_1]{},\\placeholder[value_2]{}\\ldots\\rbrace',
                              label: 'Dominio',
                              condition: {
                                value_1: ['frac{-pi}{2}', '-frac{pi}{2}'],
                                value_2: 'frac{pi}{2}'
                              },
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Rango',

                              condition: ['left(-infty,inftyright)', 'R', 'left(-infty,+inftyright)'],

                              questionType: 'expression'
                            }



                          },





                        ]
        },


        {
          layout: 'vertical',
          nodes:
                        [


                          {
                            //tipo de pregunta
                            type: 'mathfieldSet',
                               

                            data: {
                              placeholder: '\\ldots\\left(\\placeholder[value_1]{});\\left(\\placeholder[value_2]{});\\left(\\placeholder[value_3]{})\\ldots',
                              label: 'Puntos de corte con el eje x',
                              condition: {
                                value_1: '-pi,0',
                                      
                                value_2: '0,0',
                                       
                                value_3: 'pi,0',
                                        

                              },

                              questionType: 'expression'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Puntos de corte con el eje y',
                              condition: 'left(0,0right)',
                              questionType: 'expression'
                            }

                          },



                        ]
        },






      ],

    }



  },

  artifact_4: {
    quizType: 'standard',
    rendering: 'rendering_2',
    // config: "procedural",
    //  title: "Hola Mundo",
    keyBoardProfile: ['numeric', 'functions', 'symbols'], quiz: {
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
                              label: 'Máximo absoluto',
                              condition: 'nexists',
                              questionType: 'expression'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Alcanzado en',
                              condition: 'nexists',
                              questionType: 'expression'
                            }



                          },





                        ]
        },


        {
          layout: 'horizontal',
          nodes:
                        [


                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Mínimo absoluto',
                              condition: 'nexists',
                              questionType: 'expression'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Alcanzado en',
                              condition: 'nexists',
                              questionType: 'expression'
                            }



                          },



                        ]
        },

      ],

    }



  },
  artifact_5: {
    quizType: 'standard',
    rendering: 'rendering_2',
    keyBoardProfile: ['numeric', 'functions', 'symbols'],
    quiz: {
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
                              label: 'Puntos máximos No absolutos:',
                              condition: ['nexists'],

                              questionType: 'expression'
                            }
                          },
                        ]
        },
        {
          layout: 'horizontal',
          nodes:
                        [
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Puntos mínimos No absolutos:',
                              condition: ['nexists'],
                              questionType: 'expression'
                            }
                          },
                        ]
        },

      ],
    }
  },

  artifact_6: {
    quizType: 'standard',
    rendering: 'rendering_4',

    keyBoardProfile: ['numeric', 'functions', 'symbols'], quiz: {
      generalLayout: '',
      formsQuestions: [
        {
          layout: 'vertical',
          nodes:
                        [
                          {
                            type: 'mathfieldSet',
                               

                            data: {
                              label: 'Zonas de crecimiento',
                              placeholder: '\\left(-\\infty,\\infty\\right)-\\left\\lbrace\\ldots\\placeholder[value_1]{},\\placeholder[value_2]{}\\ldots\\rbrace',
                              condition: {
                                value_1: ['frac{-pi}{2}', '-frac{pi}{2}'],
                                value_2: 'frac{pi}{2}'
                              },
                            }



                          },


                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Zonas de decrecimiento',
                              condition: 'nexists',
                              questionType: 'expression'
                            }



                          },





                        ]
        },


        {
          layout: 'vertical',
          nodes:
                        [


                          {
                            //tipo de pregunta
                            type: 'mathfieldSet',
                               

                            //label,Answer,Validation
                            data: {
                              label: 'Partes positivas',
                              placeholder: '\\ldots\\left(\\placeholder[value_1]{})\\cup\\left(\\placeholder[value_2]{})\\ldots',
                              condition: {
                                value_1: ['-pi,frac{-pi}{2}','-pi,-frac{pi}{2}'], 
                                value_2: ['0, frac{pi}{2}'],
                                    
                              },
                              questionType: 'expression'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfieldSet',
                             

                            data: {
                              label: 'Partes negativas',
                              placeholder: '\\ldots\\left(\\placeholder[value_1]{})\\cup\\left(\\placeholder[value_2]{})\\ldots',
                              condition: {
                                value_1: ['frac{-pi}{2}, 0', '-frac{pi}{2},0'],
                                value_2: 'frac{pi}{2}, pi',
                                      
                              },

                              questionType: 'expression'
                            }



                          },



                        ]
        },





      ],

    }



  }
}
let defBoards = {
  board_1: {

    inputs: [
      { x: -1.8, y: -0.8, value: '\\frac{-\\pi}{2}', style: { fontSize: 16, mathClass: 'colorInputAlphabet' }, valid: false },

      { x: 1.8, y: -0.8, value: '\\frac{\\pi}{2}', style: { fontSize: 16, mathClass: 'colorInputAlphabet' }, valid: false },
    ]
    ,

    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        // yp: [-3, -2, -1, 1, 2, 3],
        yv: ['-3', '-2', '-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
      },
      grid: true,
      grid: { style: '#DDDDDD' },
      boundingbox: [-4, 4, 4, -4],

    },

    inputs:[

      {x:-0.3,y:-1,value:'-1', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },
      {x:-0.3,y:-2,value:'-2', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },
      {x:-0.3,y:-3,value:'-3', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },


      {x:-0.3,y:1,value:'1', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },
      {x:-0.3,y:2,value:'2', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },
      {x:-0.3,y:3,value:'3', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },





      {x:-1.57079632679,y:-0.4,value:'\\frac{-\\pi}{2}', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },

      {x:1.57079632679,y:-0.4,value:'\\frac{\\pi}{2}', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false }
    ],


  },
}

const def3 =
{

  artifact_2: {
    buttonsActive: {
      curve: true
    },
    conditions: {
      alphabetDiagram: {

        mathEcuation: 'tan(x)', //Curva a crear utiliza las expresiones de mathjs
        expression: '\\tan\\left(\\right)',
        xCoords: [
          [
            { xCoord: -3.14, axisText: '-\\pi' },
            { xCoord: -2.5 },
            { xCoord: -2},
            { xCoord: -1.1},
            { xCoord: -1.4},
            { xCoord: 2},


            { xCoord: '-\\frac{\\pi}{2}' },
            // { xCoord: -1.37, axisText: "-\\frac{\\pi}{2}+\\frac{\\pi}{16}"}

          ],
          [
            { xCoord: -0.392, axisText: '-\\frac{\\pi}{8}' },
            { xCoord: 0.785, axisText: '\\frac{\\pi}{4}' },
            { xCoord: '\\frac{\\pi}{2}' },
            // { xCoord: 1.570, axisText: "\\frac{\\pi}{2}" },

          ],
          [
                        
            {xCoord: 1.76},
            { xCoord: 3.141, axisText: '\\pi' },

          ],

        ],

      }
    }
  },


}

const quizGen = new QuizGenerator(def2)
quizGen.generateObject()


generateArtifact(def)

new GenerateArtifactsEngineAlphabet(def3, defBoards)