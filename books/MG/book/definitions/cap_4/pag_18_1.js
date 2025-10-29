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
      boundingbox: [-4.3, 3.8, 4.1, -4.3],

    },
    points: [    //       [x, y, visible, 'titulo', fixed],
      //puntos abiertos
      [-3, -4, true, '', true,true],
      [-2, -3, true, '', true,true],
      [-1, -2, true, '', true,true],
      [0, -1, true, '', true,true],
      [1, 0, true, '', true,true],
      [2, 1, true, '', true,true],
      [3, 2, true, '', true,true],
      [4, 3, true, '', true,true],

      //puntos cerrados
      [-4, -4, true, '', true,false],
      [-3, -3, true, '', true,false],
      [-2, -2, true, '', true,false],
      [-1, -1, true, '', true,false],
      [0, 0, true, '', true,false],
      [1, 1, true, '', true,false],
      [2, 2, true, '', true,false],
      [3, 3, true, '', true,false],
    ],
    expressionCurve: 'floor(x)'

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
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Dominio:',
                              condition: ['left(-infty,inftyright)','R','left(-infty,+inftyright)'],

                              questionType: 'expression'
                            }
                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Rango:',
                              condition: ['Z'],
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
                              condition: ['left(0,0right)'/*'lbrack0,1)',"left(0.1,0right);left(0.2,0right);left(0.3,0right);left(0.4,0right);left(0.5,0right);left(0.6,0right);left(0.7,0right);left(0.8,0right);left(0.9,0right)","left(0.1,0right),left(0.2,0right),left(0.3,0right),left(0.4,0right),left(0.5,0right),left(0.6,0right),left(0.7,0right),left(0.8,0right),left(0.9,0right)"*/],
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
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Zonas de crecimiento:',
                              condition: ['nexists'],

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
                              condition: ['left(0,infty)'],
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




const quizGen = new QuizGenerator(defQuiz)
quizGen.generateObject()
createLayouts(def)