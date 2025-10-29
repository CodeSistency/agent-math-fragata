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
      boundingbox: [-0.5, 5, 5, -0.5],

    },
    points: [    //       [x, y, visible, 'titulo', fixed],
      ,
      [0.5, 0.707107, true, '', true],
      [1, 1, true, '', true],
      [2, 1.414214, true, '', true],
      [3, 1.732051, true, '', true],
      [4, 2, true, '', true],
      [5, 2.236068, true, '', true],
    ],

    expressionCurve: 'sqrt(x)'

  },
}

const def =
{
  artifact_example1: {
    parentContainer: '.example_1',  //div board
    typeLayout: '',
    classes: '',
    typeLayout: '',
    style: 'max-width: 600px;  display:flex; justify-content:center; height:300px',
    addHtml: '',
    containers: [
      {
        id: 'board1',    //NOMBRE BOARD
        boardName: 'board_1',
        boardObject: defBoards.board_1,
        attributes: [['board', 'board_0'], []],
        classes: 'adaptativeBoard',
        style: 'border-radius:10px;border:2px solid #217e9d ; ',
        typeElement: '',
      },

    ]
  },


}

const defQuiz = {
  artifact_1: {
    quizType: 'standard',
    rendering: 'rendering_1',
    keyBoardProfile: ['numeric','functions','symbols'],
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
                              condition: ['lbrack0,infty)'],

                              questionType: 'expression'
                            }
                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Rango:',
                              condition: ['lbrack0,infty)'],
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
                              label: 'Puntos de corte con el eje x',
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
  artifact_2: {
    quizType: 'standard',
    rendering: 'rendering_2',
    keyBoardProfile: ['numeric','functions','symbols'],
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
  artifact_3: {
    quizType: 'standard',
    rendering: 'rendering_3',
    keyBoardProfile: ['numeric','functions','symbols'],
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
  artifact_4: {
    quizType: 'standard',
    rendering: 'rendering_4',
    keyBoardProfile: ['numeric','functions','symbols'],
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
                              condition: ['left(0,inftyright)'],

                              questionType: 'expression'
                            }
                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Zonas de decrecimiento:',
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




const quizGen = new QuizGenerator(defQuiz)
quizGen.generateObject()
createLayouts(def)
