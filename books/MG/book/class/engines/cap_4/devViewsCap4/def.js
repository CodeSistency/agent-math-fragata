let def =
{



  artifact_1: {
    quizType: 'table',
    rendering: 'rendering_1',
    // config: "procedural",
    // title: "Hola",
    keyBoardProfile: ['numeric', 'functions'], quiz: {

      cells:
                [
                  [// row
                    {//cell
                      nodes:
                                [
                                  {
                                    //tipo de pregunta
                                    type: 'text',
                                    //label,Answer,Validation
                                    data: 'Tecla',
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

                                      // placeholder: `x=\\frac{-\\placeholder[value_1]{}\\pm\\sqrt{\\placeholder[value_2]{}^2-4\\placeholder[value_3]{}\\placeholder[value_4]{}}}{2\\placeholder[value_5]{}}`,
                                      placeholder: 'f\\left(x\\right)=\\placeholder[value_1]{})',
                                      label: 'Máximo absoluto',
                                      condition: {
                                        value_1: 1,
                                        // value_2: 2
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
                                    data: 'Notacion funcional',
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
                                    type: 'mathfield',
                                    //label,Answer,Validation
                                    data: {
                                      placeholder: 'y=\\placeholder[value]{}',
                                      label: 'Máximo absoluto',
                                      condition: {
                                        value: 1,
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
                                    data: 'Ecuacion en dos variables',
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
                                    type: 'mathfield',
                                    //label,Answer,Validation
                                    data: {
                                      placeholder: 'y=\\placeholder[value]{}',
                                      label: 'Máximo absoluto',
                                      condition: {
                                        value: 1
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
                                    type: 'mathfield',
                                    //label,Answer,Validation
                                    data: {
                                      placeholder: '\\left(x,\\placeholder[value]{}\\right)',
                                      label: 'Máximo absoluto',
                                      condition: {
                                        value: 1
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
  artifact_2: {
    quizType: 'standard',
    rendering: 'rendering_2',
    title: 'Hola Mundo',
    keyBoardProfile: ['numeric', 'functions'], quiz: {
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
                              condition: 'left(-infty,inftyright)',
                              questionType: 'basic'
                            }



                          },



                          {
                            //tipo de pregunta
                            type: 'mathfieldSet',
                            //label,Answer,Validation
                            data: {

                              // placeholder: `x=\\frac{-\\placeholder[value_1]{}\\pm\\sqrt{\\placeholder[value_2]{}^2-4\\placeholder[value_3]{}\\placeholder[value_4]{}}}{2\\placeholder[value_5]{}}`,
                              placeholder: 'f\\left(x\\right)=\\placeholder[value_1]{}',
                              label: 'Máximo absoluto',
                              condition: {
                                value_1: 1,
                                value_2: 2
                              },
                              questionType: 'basic'
                            }



                          },





                          // {
                          //     type: "radio",
                          //     data: {
                          //         label: "¿Pregunta?",
                          //         condition: 1,
                          //         optionList:
                          //             [

                          //                 "Sí",
                          //                 "No",

                          //             ],
                          //         questionType: "basic"

                          //     }



                          // },





                        ]
        },


        {
          layout: 'vertical',
          nodes:
                        [


                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Cortes con el eje x',
                              condition: '0',
                              questionType: 'basic'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Cortes con el eje y',
                              condition: '0',
                              questionType: 'basic'
                            }



                          },

                          {
                            //tipo de pregunta
                            type: 'mathfieldSet',
                            //label,Answer,Validation
                            data: {

                              // placeholder: `x=\\frac{-\\placeholder[value_1]{}\\pm\\sqrt{\\placeholder[value_2]{}^2-4\\placeholder[value_3]{}\\placeholder[value_4]{}}}{2\\placeholder[value_5]{}}`,
                              placeholder: '3\\cdot\\placeholder[value_1]{}+4*(\\placeholder[value_2]{}+3)',
                              label: 'Máximo absoluto',
                              condition: {
                                value_1: 1,
                                value_2: 2
                              },
                              questionType: 'basic'
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
    // config: "procedural",
    //  title: "Hola Mundo",
    keyBoardProfile: ['numeric','functions'],         quiz: {
      generalLayout: '',
      formsQuestions: [
        {
          layout: 'horizontal',
          nodes:[

            {
              //tipo de pregunta
              type: 'text',
              //label,Answer,Validation
              data: 'tal que ArcSin(x) = π/4',
              formato: {

              }
            },
            {
              //tipo de pregunta
              type: 'mathfieldSet',
              //label,Answer,Validation
              data: {

                // placeholder: `x=\\frac{-\\placeholder[value_1]{}\\pm\\sqrt{\\placeholder[value_2]{}^2-4\\placeholder[value_3]{}\\placeholder[value_4]{}}}{2\\placeholder[value_5]{}}`,
                placeholder: 'f\\left(x\\right)=\\placeholder[value_1]{}',
                label: 'Máximo absoluto',
                condition: {
                  value_1: 1,
                  value_2: 2
                },
                questionType: 'basic'
              }



            },



          ]
        }
      ]}},


}

quizGen = new QuizGenerator(def)
quizGen.generateObject()