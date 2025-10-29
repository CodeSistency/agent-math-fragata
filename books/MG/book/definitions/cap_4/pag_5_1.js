
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
      boundingbox: [-8, 4, 8, -4],

    },
    points: [
      [0.33, 3, true, '', true],
      [1, 1, true, '', true],
      [3, 0.33, true, '', true],
      [-0.33, -3, true, '', true],
      [-1, -1, true, '', true],
      [-3, -0.33, true, '', true],
    ],

    expressionCurve: '1/x'

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
    quizType: 'inline',
    rendering: 'rendering_1',
    //config: "procedural",
    keyBoardProfile: ['numeric', 'functions','symbols'],   // validationBehaviour:"sequential",

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
                data: `Si &nbsp; x ∈ [1, <span style="font-size:20px;">∞</span> ), &nbsp; <math> <mfrac>
  <mn>1</mn>
  <mn>x</mn>
 </mfrac></math>  &nbsp; ∈ `,
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
                  condition: 'left(0,1rbrack',
                  questionType: 'expression'
                }



              },

              {
                //tipo de pregunta
                type: 'text',
                //label,Answer,Validation
                data: `Si &nbsp; x ∈ (0, 1], &nbsp; <math> <mfrac>
  <mn>1</mn>
  <mn>x</mn>
 </mfrac></math>  &nbsp; ∈ `,
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
                  condition: ['lbrack1,inftyright)', 'lbrack1,+inftyright)'],
                  questionType: 'expression'
                }



              },




            ]
        },

      ]
    }
  },
  artifact_2: {
    quizType: 'inline',
    rendering: 'rendering_2',
    //config: "procedural",
    keyBoardProfile: ['numeric', 'functions','symbols'],
    // validationBehaviour:"sequential",

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
                data: 'Si &nbsp; -1 < x < 0  entonces ',
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
                  condition: '-infty',
                  questionType: 'expression'
                }



              },

              {
                //tipo de pregunta
                type: 'text',
                //label,Answer,Validation
                data: `<  &nbsp; <math> <mfrac>
  <mn>1</mn>
  <mn>x</mn>
 </mfrac></math>  &nbsp; <`,
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
                  condition: ['-1'],
                  questionType: 'expression'
                }



              },




            ]
        },

      ]
    }
  },
  artifact_3: {
    quizType: 'inline',
    rendering: 'rendering_3',
    //config: "procedural",
    keyBoardProfile: ['numeric', 'functions','symbols'],
    // validationBehaviour:"sequential",

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
                data: 'Si &nbsp; -<span style="font-size:20px;">∞</span> < x < -1  entonces ',
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
                  condition: '-1',
                  questionType: 'expression'
                }



              },

              {
                //tipo de pregunta
                type: 'text',
                //label,Answer,Validation
                data: `<  &nbsp; <math> <mfrac>
  <mn>1</mn>
  <mn>x</mn>
 </mfrac></math>  &nbsp; <`,
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
                  condition: ['0'],
                  questionType: 'expression'
                }



              },




            ]
        },

      ]
    }
  },
  artifact_4: {
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
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: '¿Cuáles son los puntos de la curva que tienen la abscisa igual a la ordenada?',
                  condition: ['left(1,1right),left(-1,-1right)', 'left(-1,-1right),left(1,1right)', 'left(1,1right);left(-1,-1right)', 'left(-1,-1right);left(1,1right)'],

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
                  label: `<br> ¿Cuál es la solucion de x=&nbsp; <math> <mfrac>
    <mn>1</mn>
    <mn>x</mn>
   </mfrac></math>  &nbsp; ?`,
                  condition: ['-1,1', '1,-1', 'lbrace-1,1rbrace', 'lbrack-1,-1rbrackcuplbrack1,1rbrack'],
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
                  label: `¿Es verdad que &nbsp;- <math> <mfrac>
    <mn>1</mn>
    <mn>x</mn>
   </mfrac></math>  &nbsp;=&nbsp; <math> <mfrac>
    <mn>1</mn>
    <mn>-x</mn>
   </mfrac></math>  &nbsp; ?`,
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
                  label: 'Las curvas con f(-x) =&nbsp; -f(x) &nbsp; son simétricas con respecto a (0,0)  y se llaman impares. \n <br> ¿Es 1/() una función impar?',
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
}
const quizGen = new QuizGenerator(defQuiz)
quizGen.generateObject()
createLayouts(def)
// new GenerateArtifactsEngineAlphabet(def, defBoards)
