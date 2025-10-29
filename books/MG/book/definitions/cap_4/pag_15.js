let defBoards = {
  board_1: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-3, -2, -1, 1, 2, 3],
        yv: ['-3', '-2', '-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
      },
      grid: true,
      boundingbox: [-3, 3, 3, -3],
    },

    inputs: [
      { x: -3.14, y: -0.2, value: '-\\pi', style: { fontSize: 12, mathClass: 'colorInputAlphabet' }, valid: false },
      { x: 3.14, y: -0.2, value: '\\pi', style: { fontSize: 12, mathClass: 'colorInputAlphabet' }, valid: false },

      { x: -0.7, y: -0.4, value: '\\frac{-\\pi}{4}', style: { fontSize: 12, mathClass: 'colorInputAlphabet' }, valid: false },
      { x: 0.7, y: -0.4, value: '\\frac{\\pi}{4}', style: { fontSize: 12, mathClass: 'colorInputAlphabet' }, valid: false },

      { x: -1.57079632679, y: -0.4, value: '\\frac{-\\pi}{2}', style: { fontSize: 12, mathClass: 'colorInputAlphabet' }, valid: false },

      { x: 1.57079632679, y: -0.4, value: '\\frac{\\pi}{2}', style: { fontSize: 12, mathClass: 'colorInputAlphabet' }, valid: false }
    ],

    curves: [
      {
        dash: 2,
        points: [[-10, 1.57], [10, 1.57]],
        opacity: 0.3

      },

      {
        dash: 2,
        points: [[-10, -1.57], [10, -1.57]],
        opacity: 0.3

      },
    ],

  },
}

const def2 =
{

  artifact_2: {
    buttonsActive: {
      curve: true
    },
    conditions: {
      alphabetDiagram: {
        mathEcuation: 'atan(x)', //Curva a crear utiliza las expresiones de mathjs
        expression: '\\tan^{-1}\\left(\\right)',
        xCoords: [
          [
            -2, { xCoord: -1.57 }, -1, { xCoord: -0.79 }, 0, 0.39, { xCoord: 0.7 }, { xCoord: 1 }, { xCoord: 1.57 }, 2
          ],
        ],

        //{ xCoord: "4", axisText: "π" },
        // defaultValue:{
        //     curve: {
        //         mathEcuation: "x^(2)",
        //       },
        // }
      },
    }
  },


}

const defQuiz = {
  artifact_1: {
    quizType: 'table',
    rendering: 'rendering_1',
    // config: "procedural",
    // title: "",
    keyBoardProfile: ['numeric', 'functions', 'symbols'],

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
                  /*  {
                       type: "mathfield",
                       data: {
                           placeholder: `\\tan^{-1}\\left(\\placeholder[value]{}\\right)`,
                           condition: {
                               value: `tan^{-1}left(right)`
                           },
                           questionType: "expression"
                       }
                   }, */
                  {
                    //tipo de pregunta
                    type: 'mathfield',
                    //label,Answer,Validation
                    data: {
                      label: '',
                      condition: ['tan^{-1}left(placeholder{}right)', 'tan^{-1}left(right)'],
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
                        value_1: '\\tan^{-1}\\left(n\\right)'
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
                        value_1: '\\tan^{-1}\\left(n\\right)'


                        // value2:1,
                        // value3:1

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
                    type: 'mathfieldSet',
                    //label,Answer,Validation
                    data: {
                      placeholder: '\\left(x,\\placeholder[value_1]{})',
                      condition: {
                        value_1: '\\tan^{-1}\\left(n\\right)'

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
    rendering: 'rendering_questions',
    config: '',
    keyBoardProfile: ['numeric', 'functions', 'symbols'],
    // validationBehaviour:"sequential",

    quiz: {
      formsQuestions: [
        {
          //layout: "horizontal",
          nodes:
            [

              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: `¿Cuál es el número x al que
                                  <math>
                                  <msup>
                                      <mi>tan</mi>
                                      <mn>-1</mn>
                                  </msup>
                                  </math>(x)  = π/4?`,
                  condition: '1',

                  questionType: 'expression'
                }
              },
            ]
        }
      ]
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
                  condition: ['left(-infty,inftyright)'],

                  questionType: 'expression'
                }
              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Rango:',
                  condition: ['left(-frac{pi}{2},frac{pi}{2}right)', 'left(frac{-pi}{2},frac{pi}{2}right)'],
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
                  label: 'Puntos de corte con el eje x:',
                  condition: ['left(0,0right)'],
                  questionType: 'expression'
                }



              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Puntos de corte con el eje y:',
                  condition: ['left(0,0right)'],
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
          layout: 'horizontal',
          nodes:
            [
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Máximo absoluto:',
                  condition: ['nexists',],

                  questionType: 'expression'
                }
              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Alcanzado en:',
                  condition: ['nexists',],
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
                  label: 'Mínimo absoluto:',
                  condition: ['nexists',],
                  questionType: 'expression'
                }



              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Alcanzado en:',
                  condition: ['nexists',],
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
          layout: 'horizontal',
          nodes:
            [
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Zonas de crecimiento:',
                  condition: ['left(-infty,inftyright)'],
                  questionType: 'expression'
                }
              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Zonas de decrecimiento:',
                  condition: ['nexists',],
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
                  label: 'Partes positivas:',
                  condition: ['left(0,inftyright)'],
                  questionType: 'expression'
                }

              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Partes negativas:',
                  condition: ['left(-infty,0right)'],

                  questionType: 'expression'
                }
              },

            ]
        },

      ],
    }
  },
}

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
      screen: { defaultText: [{ textValue: 'n', disabled: true }, { textValue: '\\tan^{-1}\\left(n\\right)', disabled: true }] },
      key: { defaultText: [{ textValue: '\\tan^{-1}\\left(\\right)', disabled: true }] }
    },
    conditions: {
      screen: [[], [], []],
      //    key: []
    }
  },
}

const quizGen = new QuizGenerator(defQuiz)
quizGen.generateObject()

generateArtifact(def)

new GenerateArtifactsEngineAlphabet(def2, defBoards)