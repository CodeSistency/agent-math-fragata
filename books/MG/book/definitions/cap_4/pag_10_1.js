let def2 =
{
  artifact_1: {
    quizType: 'standard',
    rendering: 'rendering_5',
    //  config: "procedural",
    //  title: "Hola Mundo",
    keyBoardProfile: ['numeric', 'functions','symbols'], quiz: {
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
                              label: 'Dominio',
                              condition: ['left(-infty,inftyright)', 'left(-infty,+inftyright)', 'R'],
                              questionType: 'expression'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Rango',
                              condition: 'left(0,inftyright)',
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
                              condition: 'nexists',
                              questionType: 'expression'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Puntos de corte con el eje y',
                              condition: 'left(0,1right)',
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
    rendering: 'rendering_6',
    // config: "procedural",
    //  title: "Hola Mundo",
    keyBoardProfile: ['numeric', 'functions','symbols'], quiz: {
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

  artifact_3: {
    quizType: 'standard',
    rendering: 'rendering_7',

    keyBoardProfile: ['numeric', 'functions','symbols'], quiz: {
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
                              label: 'Zonas de crecimiento',
                              condition: ['left(-infty,inftyright)', 'left(-infty,+inftyright)', 'R'],
                              questionType: 'expression'
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
          layout: 'horizontal',
          nodes:
                        [


                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Partes positivas',
                              condition: ['left(-infty,inftyright)', 'left(-infty,+inftyright)', 'R'],
                              questionType: 'expression'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Partes negativas',
                              condition: 'nexists',
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
      //boundingbox: [-5, 7, 3, -1],
      boundingbox: [-4, 4, 4, -3],


    },

    expressionCurve: 'exp(x)'

  },
}

const def3 =
{

  artifact_example_1: {
    parentContainer: '.example_2',
    typeLayout: '',
    classes: '',
    typeLayout: '',
    style: 'max-width: 600px;  display:flex; justify-content:center; height:300px',
    addHtml: '',
    containers: [
      {
        id: 'board1',
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

const quizGen = new QuizGenerator(def2)
quizGen.generateObject()


// generateArtifact(def)

createLayouts(def3)
