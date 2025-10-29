

let defBoards = {
  board_1: {
    artifact: 'artifact_1',
    style: {
      grid: true,
      grid: { style: '#bfbaba' },
      maxHeight: 400,
      maxWidth: 400,
      boundingbox: [-6, 6, 6, -6],
      axis: [false, true, true],
      valueAxis: {
        yp: [-3, -2, -1, 1, 2, 3],
        yv: ['-3', '-2', '-1', '1', '2', '3'],
        xp: [-3, -2, -1, 1, 2, 3],
        xv: ['-3', '-2', '-1', '1', '2', '3'],
        yd: [
          [0, 0],
          [0, 1],
        ] /*dirección del eje y*/,
        xd: [
          [0, 0],
          [1, 0],
        ],
        colory: '#000000',
        colorx: '#000000',
      },
    },

    alphabet: { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas
      'sin': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'sin(x)',
        options: { strokeColor: '#7f7879' , strokeWidth:2}
      },
      'identidadNegativa': { /* Identidad negativa */
        point: { coord: [0, 1], visible: false },
        keyCurve: '-x',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      }
      ,
      'inversaNumerica': { /* inversa numerica */
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x^(-1)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'constante': {
        point: { coord: [0, 1], visible: false },
        keyCurve: '2',
        options: { strokeColor: '#7f7879' , strokeWidth:2}
      },
      'alCuadrado': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x^(2)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
    },
    asymptotes: [

      { x: -3.14, },
      { x: 3.14 },
      { x: 0 },

    ],
  },


};





/*  */
const def =
{
  artifact_1: {

    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */

    instructionText: {
      text: '2\\cdot\\sin\\left(\\space\\right)',
      styleClass: ['producto']

    },


    conditions: {
      multiplyCurves: ['2', 'sin(x)'],

      asymptotes: [
        { x: -4.71, y: 2 },
        { x: -1.57, y: -2 },

        { x: 4.71, y: -2 },
        { x: 1.57, y: 2 },

      ]




    }
  },


}

const defQuiz = {

  artifact_2: {
    quizType: 'standard',
    rendering: 'rendering_1',
    keyBoardProfile: ['numeric', 'symbols', 'functions'],

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

    keyBoardProfile: ['numeric', 'symbols', 'functions'],

                            data: {
                              placeholder: '',

                              label: 'La curva producto de 2 y Sen( ) se designa con:',
                              condition: ['2cdotsinleft(right)', '2cdotsinleft(placeholder{}right)',
                                  '2sinleft(placeholder{}right)', '2sinleft(right)', 'sinleft(right)cdot2',
                                  'sinleft(placeholder{}right)cdot2'],


                              

                              questionType: 'expression'
                            }

                          },

                          {
                            //tipo de pregunta
                            type: 'mathfieldSet',

                            data: {
                              placeholder: 'ƒ\\left(x\\right)=\\placeholder[value_1]{}',

                              label: 'En notación funcional:',
                              condition: {
                                value_1: ['2cdotsinleft(xright)', '2cdotsinleft(xright)',
                                  '2sinleft(xright)', '2sinleft(xright)', 'sinleft(xright)cdot2',
                                  'sinleft(xright)cdot2'],

                              },

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
                            type: 'mathfieldSet',

                            data: {
                              placeholder: 'y=\\placeholder[value_1]{}',

                              label: 'Y en forma de ecuación en dos variables:',
                              condition: {
                                value_1: ['2cdotsinleft(xright)', '2cdotsinleft(xright)',
                                  '2sinleft(xright)', '2sinleft(xright)', 'sinleft(xright)cdot2',
                                  'sinleft(xright)cdot2'],





                              },

                              questionType: 'expression'
                            }



                          },

                          {
                            //tipo de pregunta
                            type: 'mathfieldSet',

                            data: {
                              placeholder: '(x,\\placeholder[value_1]{})',

                              label: 'Usando pares ordenados:',
                              condition: {
                                value_1: ['2cdotsinleft(xright)', '2cdotsinleft(xright)',
                                  '2sinleft(xright)', '2sinleft(xright)', 'sinleft(xright)cdot2',
                                  'sinleft(xright)cdot2'],





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

//new GenerateSumConstant(def, defBoards);
new GenerateSumConstant(def, defBoards)
const quizGen = new QuizGenerator(defQuiz)
quizGen.generateObject()


/*  */