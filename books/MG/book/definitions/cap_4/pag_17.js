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
      boundingbox: [-4, 6, 4, -2],
    },
  },
}

const defDiagram =
{

  artifact_2: {
    buttonsActive: {
      curve: true
    },
    conditions: {
      alphabetDiagram: {
        mathEcuation: 'abs(x)', //Curva a crear utiliza las expresiones de mathjs
        expression: '\\left\\vert\\left(\\right)\\right\\vert',
        xCoords: [
          [
            -3, -2, -1, 0, 1, 2, 3
          ],
        ],

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

                  {
                    //tipo de pregunta
                    type: 'mathfield',
                    //label,Answer,Validation
                    data: {
                      label: '',
                      condition: ['\\vert\\placeholder[]{}\\vert', "\\vert\\left(\\right)\\vert", '\\vert\\left(\\placeholder{}\\right)\\vert']
                      ,
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
                        value_1: ['\\vert n\\vert', "\\vert\\left(n\\right)\\vert"]
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
                        value_1: ['\\vert n\\vert', "\\vert\\left(n\\right)\\vert"]

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
                        value_1: '\\vert n\\vert'
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
    quizType: 'inline',
    rendering: 'rendering_2',
    config: 'procedural',
    keyBoardProfile: ['numeric', 'functions', "symbols"],         // validationBehaviour:"sequential",

    quiz: {
      formsQuestions: [
        {
          //layout: "horizontal",
          nodes:
            [
              {
                //tipo de pregunta
                type: 'text',
                //label,Answer,Validation
                data: 'A la derecha del eje vertical el valor absoluto es como la identidad',
                formato: {
                  fontSize: '1rem',
                  fontStyle: 'italic',


                }
              },
              {
                //tipo de pregunta
                type: 'text',
                //label,Answer,Validation
                data: ' por lo tanto: ',
                formato: {
                  fontSize: '1rem',
                  fontStyle: 'italic',

                }
              },
              {
                //tipo de pregunta
                type: 'text',
                //label,Answer,Validation
                data: 'Si  x ≥ 0, |x| = ',
                formato: {
                  fontSize: '1rem',
                  fontStyle: 'italic',

                }
              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  condition: ['x'],
                  questionType: 'expression'
                }



              },
              {
                //tipo de pregunta
                type: 'text',
                //label,Answer,Validation
                data: 'A la izquierda del eje vertical el valor absoluto es como cambio de signo',
                formato: {
                  fontSize: '1rem',
                  fontStyle: 'italic',


                }
              },
              {
                //tipo de pregunta
                type: 'text',
                //label,Answer,Validation
                data: ' por lo tanto: ',
                formato: {
                  fontSize: '1rem',
                  fontStyle: 'italic',

                }
              },
              {
                //tipo de pregunta
                type: 'text',
                //label,Answer,Validation
                data: 'Si  x < 0, |x| = ',
                formato: {
                  fontSize: '1rem',
                  fontStyle: 'italic',

                }
              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  condition: ['-x'],
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
    rendering: 'rendering_3',
    keyBoardProfile: ['numeric', 'functions', "symbols"],
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
                  condition: ['left(-infty,inftyright)', 'left(-infty,+inftyright)', 'R'],

                  questionType: 'expression'
                }
              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Rango:',
                  condition: ['lbrack0,inftyright)', 'lbrack0,+inftyright)'],
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
    rendering: 'rendering_4',
    keyBoardProfile: ['numeric', 'functions', "symbols"],
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
                  condition: ['nexists'],

                  questionType: 'expression'
                }
              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Alcanzado en:',
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
                  label: 'Mínimo absoluto:',
                  condition: ['0'],
                  questionType: 'expression'
                }



              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Alcanzado en:',
                  condition: ['0'],
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
    rendering: 'rendering_5',
    keyBoardProfile: ['numeric', 'functions', "symbols"],
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
                  condition: ['left(0,inftyright)', 'left(0,+inftyright)'],

                  questionType: 'expression'
                }
              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Zonas de decrecimiento:',
                  condition: ['left(-infty,0right)'],
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
                  condition: ['left(-infty,inftyright)-lbrace0rbrace', 'left(-infty,+inftyright)-lbrace0rbrace',
                    'left(-infty,inftyright)-lbrack0,0rbrack', 'left(-infty,+inftyright)-lbrack0,0rbrack', 'left(-infty,0right);left(0,inftyright)', 'left(-infty,0right)cupleft(0,inftyright)',
                    'R-lbrack0,0rbrack', 'R-lbrace0rbrace',],
                  questionType: 'expression'
                }



              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Partes negativas:',
                  condition: ['nexists'],
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
      screen: { defaultText: [{ textValue: 'n', disabled: true }, { textValue: '\\left\\vert n\\right\\vert', disabled: true }] },
      key: { defaultText: [{ textValue: '\\left\\vert\\left(\\right) \\right\\vert', disabled: true }] }
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

new GenerateArtifactsEngineAlphabet(defDiagram, defBoards)