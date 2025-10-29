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
      boundingbox: [-5, 3.8, 5, -4.3],

    },
    points: [    //       [x, y, visible, 'titulo', fixed],
      [-3, -4, true, '', true,true],
      [-2, -3, true, '', true,true],
      [-1, -2, true, '', true,true],
      [0, -1, true, '', true,true],
      [1, 0, true, '', true,true],
      [2, 1, true, '', true,true],
      [3, 2, true, '', true,true],
      [4, 3, true, '', true,true],



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
        mathEcuation: 'floor(x)', //Curva a crear utiliza las expresiones de mathjs
        expression: '\\operatorname{floor}\\left(\\left(\\right)\\right)',
        xCoords: [
          [
            -3, -2, -1,0.15,1,2,3.15]  //-3.15 y -0.15  se borraron por peticion en testing de la prof Rosmelis que los puntos de la curva no están bien ubicados
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
    // title: "Hola",
    keyBoardProfile: ['numeric','functions', 'symbols'],
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
                                      condition: ['lbrackrbrack', '\\lbrack\\left(\\right)\\rbrack'],
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
                                        value_1: ['lbracknrbrack']
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
                                        value_1: ['lbracknrbrack'],
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
                                      placeholder: '\\left(n,\\placeholder[value_1]{})',
                                      condition: {
                                        value_1: ['lbracknrbrack']
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
    rendering: 'rendering_2',
    keyBoardProfile: ['numeric', 'functions','symbols'],
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
                              label: '¿[3.15]&nbsp=&nbsp3?',
                              condition: '0',
                              optionList:
                                        [
                                          'Si',
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
                              label: '¿[0.15]&nbsp=&nbsp 0?',

                              condition: '0',
                              optionList:
                                        [
                                          'Si',
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
    rendering: 'rendering_3',
    keyBoardProfile: ['numeric', 'functions','symbols'],
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
                              label: '¿[-3.15]&nbsp = &nbsp-3?',
                              condition: '1',
                              optionList:
                                        [
                                          'Si',
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
                              label: '¿[-0.15]&nbsp=&nbsp -0?',

                              condition: '1',
                              optionList:
                                        [
                                          'Si',
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
  artifact_5: {
    quizType: 'standard',
    rendering: 'rendering_4',
    keyBoardProfile: ['numeric', 'functions','symbols'],
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
                              label: '¿[-3.15]&nbsp=&nbsp -4?',
                              condition: '0',
                              optionList:
                                        [
                                          'Si',
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
                              label: '¿[-0.15]&nbsp=&nbsp -1?',

                              condition: '0',
                              optionList:
                                        [
                                          'Si',
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
  artifact_6: {
    quizType: 'standard',
    rendering: 'rendering_5',
    keyBoardProfile: ['numeric', 'functions','symbols'],
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
                              label: 'Si un número es entero (No tiene decimales) <br> ¿Su parte entera es él mismo?',
                              condition: '0',
                              optionList:
                                        [
                                          'Si',
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
      screen: { defaultText: [{ textValue: 'n', disabled: true }, { textValue: '\\left\\lbrack n\\right\\rbrack', disabled: true }] },
      key: { defaultText: [{ textValue: '\\left\\lbrack \\left(\\right)\\right\\rbrack', disabled: true }] }
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