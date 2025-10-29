
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
      boundingbox: [-2, 4, 7, -5],

    },
    points: [
      [0.125, -2.1, true, '', true],
      [0.25, -1.4, true, '', true],
      [0.5, -0.7, true, '', true],
      [1, 0, true, '', true],
      [2, 0.7, true, '', true],
      [3, 1.1, true, '', true],
      [4, 1.4, true, '', true],

    ],

    expressionCurve: 'ln(x)'

  },
}

const def =
{
  artifact_example1: {
    parentContainer: '.example_1',
    typeLayout: '',
    classes: '',
    typeLayout: '',
    style: 'max-width: 600px;',
    addHtml: '',
    containers: [
      {
        id: 'board1',
        boardName: 'board_1',
        boardObject: defBoards.board_1,
        attributes: [['board', 'board_0'], []],
        classes: '',
        style: 'width:100%;height:300px; border-radius:10px;border:2px solid #217e9d ; ',
        typeElement: '',
      },

    ]
  },


}
const defQuiz = {
  artifact_1: {
    quizType: 'standard',
    rendering: 'rendering_1',
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
                type: 'radio',
                //label,Answer,Validation
                data: {
                  label: `¿Es siempre cierto que Ln(<math> <mfrac>
    <mn>1</mn>
    <mn>n</mn>
   </mfrac>
   </math>)=-Ln(n) ?`,
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
  artifact_2: {
    quizType: 'standard',
    rendering: 'rendering_2',
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
                  condition: ['left(0,inftyright)', 'left(0,+inftyright)',],

                  questionType: 'expression'
                }
              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Rango:',
                  condition: ['left(-infty,inftyright)', 'left(-infty,+inftyright)', 'R'],
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
                  condition: ['left(1,0right)'],
                  questionType: 'expression'
                }



              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Puntos de corte con el eje y:',
                  condition: ['nexists'],
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

      ],
    }
  },
  artifact_4: {
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
                  label: 'Zonas de crecimiento:',
                  condition: ['left(0,+inftyright)', 'left(0,inftyright)', 'R'],

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
                  condition: ['left(1,inftyright)', 'left(1,+inftyright)'],
                  questionType: 'expression'
                }



              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Partes negativas:',
                  condition: ['left(0,1right)'],
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
// new GenerateArtifactsEngineAlphabet(def, defBoards)
