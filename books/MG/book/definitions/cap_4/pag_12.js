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
      boundingbox: [-0.5, 5.5, 5.5, -0.5],
      points: [    //       [x, y, visible, 'titulo', fixed],
        ,
        [0.5, 0.707107, true, '', true],
        [1, 1, true, '', true],
        [2, 1.414214, true, '', true],
        [3, 1.732051, true, '', true],
        [4, 2, true, '', true],
        [5, 2.236068, true, '', true],
      ],
    },
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
        mathEcuation: 'sqrt(x)', //Curva a crear utiliza las expresiones de mathjs
        expression: '\\sqrt{\\left(\\right)}',
        xCoords: [
          [
            0,0.5, 1, 2, 4
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
    keyBoardProfile: ['numeric', 'functions','symbols'],
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
                                           
                                      condition: ['sqrt{placeholder{}}','sqrt{left(right)}'],
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
                                    data: {
                                      placeholder: 'f\\left(n\\right)=\\placeholder[value_1]{}',
                                      condition: {
                                        value_1: ['\\sqrt{n}','sqrt1']
                                      },
                                      questionType: 'basic'
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
                                        value_1: '\\sqrt{n}',
                                        // value2:1,
                                        // value3:1

                                      },
                                      //questionType: "basic"
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
                                        value_1: '\\sqrt{n}'
                                      },
                                      questionType: 'basic'
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
    //  config: "procedural",
    //  title: "Hola Mundo",
    keyBoardProfile: ['numeric', 'functions',"symbols"], 
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
                            //label,Answer,Validation
                            data: {
                              label: `Si &nbsp n>
                                    <math>
                                        <mroot>
                                            <mn>n</mn>
                                            <mn></mn>
                                        </mroot>
                                    </math> ¿En qué intervalo está el n? `,
                              condition: 'left(1,inftyright)',
                              questionType: 'expression'
                            }



                          },

                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: `Si &nbsp n<
                                    <math>
                                        <mroot>
                                            <mn>n</mn>
                                            <mn></mn>
                                        </mroot>
                                    </math> ¿En qué intervalo está el n? `,
                              condition: 'left(0,1right)',
                              questionType: 'expression'
                            }



                          },
                          // {
                          //     type: "mathfield",
                          //     placeholder: `x=\\placeholder[value1]{},x=\\placeholder[value2]{}`,
                          //     data: {
                          //         label: `¿Cuáles son los x que satisfacen &nbsp x=
                          //         <math>
                          //             <mroot>
                          //                 <mn>x</mn>
                          //                 <mn></mn>
                          //             </mroot>
                          //         </math>`,
                          //         condition: {
                          //             value1:"0",
                          //             value2:"1"
                          //         },
                          //     }
                          {
                            //tipo de pregunta
                            type: 'mathfieldSet',
                            //label,Answer,Validation
                            data: {
                              placeholder: 'n=\\placeholder[value_1]{},n=\\placeholder[value_2]{}',
                              label: `¿Cuáles son los x que satisfacen &nbsp x=
                                            <math>
                                                <mroot>
                                                    <mn>x</mn>
                                                    <mn></mn>
                                                </mroot>
                                            </math>`,
                              condition: {
                                value_1: '0',
                                value_2: '1'
                              },
                              questionType: 'basic'
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
      screen: { defaultText: [{ textValue: 'n', disabled: true }, { textValue: '\\sqrt{n}', disabled: true }] },
      key: { defaultText: [{ textValue: '\\sqrt{}', disabled: true }] }
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