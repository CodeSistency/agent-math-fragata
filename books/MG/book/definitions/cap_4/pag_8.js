
const defBoards = {
  board_1: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        xd: [[0, 0],
          [1, 0],],
      },
      grid: true,
      grid: { style: '#DDDDDD' },
      boundingbox: [-5, 5, 5, -5],

    },
    texts: [
      { x: -0.3, y: 2.8, text: '3', style: { fontSize: 12 } },
      { x: -0.3, y: 1.8, text: '2', style: { fontSize: 12 } },
      { x: -0.3, y: 0.8, text: '1', style: { fontSize: 12 } },
      { x: -0.4, y: -1.2, text: '-1', style: { fontSize: 12 } },
      { x: -0.4, y: -2.2, text: '-2', style: { fontSize: 12 } },
      { x: -0.4, y: -3.2, text: '-3', style: { fontSize: 12 } }
    ],
    /*  {x:-1.8,y:-0.8,value:'\\frac{-\\pi}{2}', style:{fontSize:16, mathClass: "colorInputAlphabet"},valid:false },
 */

    inputs: [
      { x: -3.17, y: -0.3, value: '-π', style: { fontSize: 15, mathClass: 'colorInputAlphabet' }, valid: false },
      {
        x: -1.60, y: -0.4
        , value: '-\\frac{\\pi}{2}', style: { fontSize: 13, mathClass: 'colorInputAlphabet' }, valid: false
      },
      { x: 1.54, y: -0.4, value: '\\frac{\\pi}{2}', style: { fontSize: 13, mathClass: 'colorInputAlphabet' }, valid: false },
      { x: 3.13, y: -0.3, value: 'π', style: { fontSize: 15, mathClass: 'colorInputAlphabet' }, valid: false },

    ],

  },
}

const def = {

  artifact_Example1: {

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
      screen: { defaultText: [{ textValue: 'n', disabled: true }, { textValue: 'cos(n)', disabled: true }] },
      key: { defaultText: [{ textValue: 'cos(\\space\\space)}' }], disabled: true }
    },
    conditions: {
      screen: [[], [], []],

    }
  },
}


const defQuiz = {
  artifact_1: {
    quizType: 'table',
    rendering: 'rendering_1',
    keyBoardProfile: ['functions', 'symbols'],

    quiz: {

      cells:
        [
          [// row
            {//cell
              nodes:
                [
                  {
                    type: 'text',
                    data: 'Tecla',
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
                      condition: ['cosleft(placeholder{}right)', 'cosleft(right)'],
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
                      placeholder: 'f(n)=\\placeholder[value_1]{}',
                      condition: {
                        value_1: ['cosleft(nright)']
                      },
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
                    data: 'Ecuación en dos variables',
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
                        value_1: ['cosleft(nright)']


                      },
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
                    type: 'text',
                    //label,Answer,Validation
                    data: '(n,cos(n))',
                    formato: {

                    }
                  }



                ]
            },

          ],







        ],

    }

  },
  artifact_3: {
    quizType: 'standard',
    rendering: 'rendering_questions',
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
                type: 'radio',
                //label,Answer,Validation
                data: {
                  label: '¿Es cierto que cos(n)=cos(-n)?',
                  condition: 0,
                  optionList:
                    [

                      'Sí',
                      'No',

                    ],
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
                type: 'radio',
                //label,Answer,Validation
                data: {
                  label: '¿Par o impar?',
                  condition: 0,
                  optionList:
                    [

                      'Par',
                      'Impar',

                    ],
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
                  label: 'Dominio:',

                  condition: ['left(-infty,inftyright)', 'R', 'left(-infty,+inftyright)'],

                  questionType: 'expression'
                }
              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Rango:',
                  condition: ['leftlbrack-1,1rightrbrack'],
                  questionType: 'expression'
                },



              },
            ]
        },
        {
          layout: 'verticaltal',
          nodes:
            [

              {
                type: 'mathfieldSet',
                data: {
                  placeholder: '\\ldots\\left(\\placeholder[value_1]{});\\left(\\placeholder[value_2]{})\\ldots',
                  label: 'Puntos de corte con el eje x:',
                  condition: {
                    value_1: ['-frac{pi}{2},0','frac{-pi}{2},0'],
                    value_2: ['frac{pi}{2}, 0','frac{-pi}{2},0'],


                  },
                  questionType: 'expression'
                }



              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Puntos de corte con el eje y:',
                  condition: ['left(0,1right)'],
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
    rendering: 'rendering_3',
    keyBoardProfile: ['numeric', 'functions', 'symbols'],

    quiz: {
      generalLayout: '',
      formsQuestions: [
        {
          layout: 'vertical',
          nodes:
            [
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Máximo absoluto:',
                  condition: ['1'],

                  questionType: 'expression'
                }
              },

              {
                //tipo de pregunta
                type: 'mathfieldSet',

                data: {
                  placeholder: '\\ldots\\placeholder[value_1]{}\\ldots',

                  label: 'Alcanzado en:',
                  condition: {
                    value_1: ['0'],
                  },

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
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Mínimo absoluto:',
                  condition: ['-1'],
                  questionType: 'expression'
                }


              },

              {
                //tipo de pregunta
                type: 'mathfieldSet',

                data: {
                  placeholder: '\\ldots\\placeholder[value_1]{},\\placeholder[value_2]{}\\ldots',

                  label: 'Alcanzado en:',
                  condition: {
                    value_1: ['-pi'],
                    value_2: ['pi'],
                  },

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
  artifact_7: {
    quizType: 'standard',
    rendering: 'rendering_5',
    keyBoardProfile: ['numeric', 'functions', 'symbols'],

    quiz: {
      generalLayout: '',
      formsQuestions: [
        {
          layout: 'vertical',
          nodes:
            [

              // {
              //   //tipo de pregunta
              //   type: "mathfieldSet",


              //   data: {
              //     placeholder: `\\ldots\\left(\\placeholder[value_1]{})\\ldots`,

              //     label: "Zonas de crecimiento:",
              //     condition: {
              //       value_1: ["-pi,0"],



              //     },

              //     questionType: "expression"
              //   }

              // },
              {
                //tipo de pregunta
                type: 'mathfieldSet',


                data: {
                  placeholder: '\\ldots\\left(-\\pi,\\placeholder[value_1]{});\\left(\\pi,\\placeholder[value_2]{})\\ldots',

                  label: 'Zonas de crecimiento:',
                  condition: {

                    value_1: ['0'],
                    value_2: ['2pi'],


                  },
                  questionType: 'expression'
                }

                /*  placeholder: "\\ldots\\left(\\placeholder[value_1]{},\\placeholder[value_2]{});\\left(\\placeholder[value_3]{},\\placeholder[value_4]{})\\ldots",
                                  label: "Puntos de corte con el eje x:",
                                  condition: {
                                    value_1: ["-frac{pi}{2}"],
                                    value_2: "0",
                                    value_3: "frac{pi}{2}",
                                    value_4: "0", */

              },
              {
                //tipo de pregunta
                type: 'mathfieldSet',


                data: {
                  placeholder: '\\ldots(-2\\pi,\\placeholder[value_1]{});(0,\\placeholder[value_2]{})\\ldots',

                  label: 'Zonas de decrecimiento:',
                  condition: {

                    value_1: ['-pi'],
                    value_2: ['pi'],


                  },

                  questionType: 'expression'
                }

                /*  placeholder: "\\ldots\\left(\\placeholder[value_1]{},\\placeholder[value_2]{});\\left(\\placeholder[value_3]{},\\placeholder[value_4]{})\\ldots",
                                  label: "Puntos de corte con el eje x:",
                                  condition: {
                                    value_1: ["-frac{pi}{2}"],
                                    value_2: "0",
                                    value_3: "frac{pi}{2}",
                                    value_4: "0", */

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
                  placeholder: '\\ldots\\left(\\placeholder[value_1]{})\\ldots',

                  label: 'Partes positivas',
                  condition: {
                    value_1: ['-frac{pi}{2},frac{pi}{2}', 'frac{-pi}{2},frac{pi}{2}'],
                  },

                  questionType: 'expression'
                }



              },

              {
                //tipo de pregunta
                type: 'mathfieldSet',

                data: {
                  placeholder: '\\ldots(-\\frac{3\\pi}{2},\\placeholder[value_1]{});\\left(\\placeholder[value_2]{},\\frac{3\\pi}{2})\\ldots',

                  label: 'Partes negativas',
                  condition: {
                    value_1: ['-frac{pi}{2}', 'frac{-pi}{2}'],
                    value_2: ['frac{pi}{2}']

                  },

                  questionType: 'expression'
                }



              },


            ]
        },

      ],
    }
  },
}
const defAlphabet =
{

  artifact_2: {
    buttonsActive: {
      curve: true
    },
    conditions: {
      alphabetDiagram: {

        mathEcuation: 'cos(n)', //Curva a crear utiliza las expresiones de mathjs
        expression: '\\cos\\left(\\right)',
        xCoords: [
          [

            { xCoord: -3.14, /* axisText: "-\\pi" */ },
            { xCoord: -1.57,/*  axisText: "-\\frac{\\pi}{2}"  */ },
            0, { xCoord: 1.57,/*  axisText: "\\frac{\\pi}{2}" */ },
            { xCoord: 3.14,/*  axisText: "\\pi" */ }
          ],

        ],

      }
    }
  },

}

generateArtifact(def)

const quizGen = new QuizGenerator(defQuiz)
quizGen.generateObject()

new GenerateArtifactsEngineAlphabet(defAlphabet, defBoards)
