let defBoards = {
  board_1: {
    artifact: 'artifact_3',
    style: {
      grid: true,
      grid: { style: '#DDDDDD' },
      maxHeight: 300,
      maxWidth: 300,
      boundingbox: [-5, 6, 5, -4],
      axis: [false, true, true],
      valueAxis: {
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

    points: [
      [0, 1, true, '1', true, 'black'],
      [1, -0, true, '1', true, 'black'],
           
    
      //puntos
      
    ],

    curves: [
      {
        //2-12 ejercicio 11
        interactive: true,
        strokeColor: 'darkorange',
        points: [
          [-3, -3],
          [3, 3],
        ],
      },
      {
        interactive: true,
        strokeColor: '#31363F',
        points: [
          [-3, 2],
          [3, 2],
        ],
      },
    ],

  },
}



const defQuiz = {
  artifact_1: {
    quizType: 'inline',
    rendering: 'rendering_2',
    //config: "procedural",
    keyBoardProfile: ['numeric', 'symbols'],   // validationBehaviour:"sequential",
    
    quiz: {
      formsQuestions: [
        {
          layout: 'horizontal',
          nodes:
                [
                  {
                    //tipo de pregunta
                    type: 'text',
                    //label,Answer,Validation
                    data: '¿Qué nombre le puede dar a la recta paralela al eje x?',
                    formato: {
                    
                      fontStyle: 'italic',
    
                    }
                  },
    
                  {
                    //tipo de pregunta
                    type: 'mathfield',
                    //label,Answer,Validation
                    data: {
                      condition: '2',
                      questionType: 'expression'
                    }
    
    
    
                  },
    
                 
    
    
    
    
                ]
        },
    
      ]
    }
  }, 

  artifact_2: {
    quizType: 'standard',
    rendering: 'rendering_1',
    keyBoardProfile: ['numeric', 'symbols'],

    quiz: {
      generalLayout: '',
      formsQuestions: [
        {
          layout: 'horizontal',
          nodes:
                        [

                          {
                            //tipo de pregunta
                            type: 'mathfieldSet',
                            fontStyle: 'italic',


                            data: {
                              placeholder: '\\placeholder[value_1]{}',

                              label: 'Por lo tanto la curva suma se puede designar con:',
                              condition: {
                                value_1: ['left(right)+2', '2+left(right)'],



                              },

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
                                value_1: ['x+2', '2+x'],



                              },

                              questionType: 'expression'
                            }

                          },

                          {
                            //tipo de pregunta
                            type: 'mathfieldSet',

                            data: {
                              placeholder: 'y=\\placeholder[value_1]{}',

                              label: 'Y en forma de ecuación en dos variables:',
                              condition: {
                                value_1: ['x+2', '2+x'],



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
                                value_1: ['x+2', '2+x'],



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

/*  */
const rDef = {

  artifact_3: {
    debug: false,
    defBoard: 'board_1',

    buttonsActive: { curve: true, asymptotes: false, config: false },
    curveMod: {
      color: 'black',
      interactive: true,
    },

    conditions: {
      text: 'texto error definido 2',
      operation: {
        curves: [[0, 1]],
        type: 1, //suma: 1 / Multipicacion: 2
        //noise: 15,

      },
    },
  },

};



const quizGen = new QuizGenerator(defQuiz)
quizGen.generateObject()




mainOperation(defBoards, rDef);




/*  */