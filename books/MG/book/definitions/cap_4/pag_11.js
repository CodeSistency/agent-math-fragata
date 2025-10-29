const defBoards = {
  board_1: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-4, -3, -2, -1, 1, 2, 3],
        yv: ['-4', '-3', '-2', '-1', '1', '2', '3'],

        xd: [[0, 0],
          [1, 0],],
      },
      grid: true,
      boundingbox: [-2, 4, 7, -5],

    },

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

        mathEcuation: 'ln(x)', //Curva a crear utiliza las expresiones de mathjs
        expression: '\\ln\\left(\\right)',
        xCoords: [
          [
            -1, 0, 0.125, 0.25, 0.5, 1, 2, 4

          ],

        ],

      }
    }
  },


}
const defQuiz = {
  artifact_1: {
    quizType: 'table',
    rendering: 'rendering_1',
    // config: "procedural",
    // title: "Hola",
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

                  {
                    //tipo de pregunta
                    type: 'mathfield',
                    //label,Answer,Validation
                    data: {
                      label: '',
                      condition: ['lnleft(placeholder{}right)', 'lnleft(right)'],
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
                      placeholder: 'f\\left(n\\right)=\\placeholder[value_1]{}',
                      condition: {
                        value_1: 'lnleft(nright)'
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
                        value_1: 'lnleft(nright)'
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
                      placeholder: '\\left(n,\\placeholder[value_1]{})',
                      condition: {
                        value_1: 'lnleft(nright)'
                      },
                      questionType: 'expression'
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
    title: 'Con respecto a la bisectriz:',
    rendering: 'rendering_2',
    keyBoardProfile: ['numeric', 'functions'],
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
                  label: '¿La curva de Ln() es simétrica,con respecto a la bisectriz, a la curva de <math><msup><mi>e</mi><mn>()</mn></msup></math>?',
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
                  label: '¿La exponencial y el logaritmo neperiano son inversas entre ellas?',
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
      ],
    }
  },
  artifact_4: {
    quizType: 'standard',
    title: 'Con respecto a la bisectriz:',
    rendering: 'rendering_3',
    keyBoardProfile: ['numeric', 'functions'],
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
                  label: 'Ln(2)=',
                  condition: ['0.693147', '0.693148'],
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
                type: 'mathfield',
                data: {
                  label: 'Ln(1/2)=',

                  condition: ['-0.693147', '-0.693148'],
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
                type: 'mathfield',
                data: {
                  label: `<math> <mfrac>
    <mn>1</mn>
    <mn>
    <math><msup><mi>e</mi><mn>1</mn></msup></math>
    </mn>
   </mfrac></math> =`,

                  condition: ['0.367879'],
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
    title: 'Con respecto a la bisectriz:',
    rendering: 'rendering_4',
    keyBoardProfile: ['numeric', 'functions'],
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
                  label: 'Ln(4)=',
                  condition: ['1.386294', '1.386295'],
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
                type: 'mathfield',
                data: {
                  label: 'Ln(1/4)=',

                  condition: ['-1.386294', '-1.386295'],
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
                type: 'mathfield',
                data: {
                  label: `<math> <mfrac>
    <mn>1</mn>
    <mn>
    <math><msup><mi>e</mi><mn>2</mn></msup></math>
    </mn>
   </mfrac></math> =`,

                  condition: ['0.135335', '0.135336'],
                  questionType: 'expression'
                }
              },



            ]
        },
      ],
    }
  },

}
const def = {

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
      screen: { defaultText: [{ textValue: 'n', disabled: true }, { textValue: '\\ln\\left(n\\right)', disabled: true }] },
      key: { defaultText: [{ textValue: '\\ln\\left(\\right)' }], disabled: true }
    },
    conditions: {
      screen: [[], [], []],
      //    key: []
    }
  },
}

const quizGen = new QuizGenerator(defQuiz)
quizGen.generateObject()

new GenerateArtifactsEngineAlphabet(defAlphabet, defBoards)
generateArtifact(def)