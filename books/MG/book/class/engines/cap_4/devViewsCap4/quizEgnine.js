let def =
{

    
  //     quizType: "table",
  //     rendering: "example_rendering",
  //     // config: "procedural",
  //     // title: "Hola",
  //     keyBoardProfile: ["numeric","functions"],        quiz: {

  //         cells:
  //             [
  //                 [// row
  //                     {//cell
  //                         nodes:
  //                             [
  //                                 {
  //                                     //tipo de pregunta
  //                                     type: "text",
  //                                     //label,Answer,Validation
  //                                     data: "Tecla",
  //                                     formato: {

  //                                     }
  //                                 }



  //                             ]
  //                     },

  //                     {
  //                         nodes:
  //                             [
  //                                 {
  //                                     //tipo de pregunta
  //                                     type: "text",
  //                                     //label,Answer,Validation
  //                                     data: `<math display="block" class="tml-display" style="display:block math;">
  //                                     <mrow>
  //                                       <mo fence="true" form="prefix">(</mo>
  //                                       <mo fence="true" form="postfix">)</mo>
  //                                     </mrow>
  //                                   </math>`,
  //                                     formato: {

  //                                     }
  //                                 }



  //                             ]
  //                     },

  //                 ],

  //                 [// row
  //                     {//cell
  //                         nodes:
  //                             [
  //                                 {
  //                                     //tipo de pregunta
  //                                     type: "text",
  //                                     //label,Answer,Validation
  //                                     data: "Notacion funcional",
  //                                     formato: {

  //                                     }
  //                                 }



  //                             ]
  //                     },

  //                     {
  //                         nodes:
  //                             [
  //                                 {
  //                                     //tipo de pregunta
  //                                     type: "text",
  //                                     //label,Answer,Validation
  //                                     data: `<math display="block" class="tml-display" style="display:block math;">
  //                                     <mrow>
  //                                       <mi>f</mi>
  //                                       <mrow>
  //                                         <mo fence="true" form="prefix">(</mo>
  //                                         <mi>x</mi>
  //                                         <mo fence="true" form="postfix">)</mo>
  //                                       </mrow>
  //                                       <mo>=</mo>
  //                                       <mi>x</mi>
  //                                     </mrow>
  //                                   </math>`,
  //                                     formato: {

  //                                     }
  //                                 }



  //                             ]
  //                     },

  //                 ],



  //                 [// row
  //                     {//cell
  //                         nodes:
  //                             [
  //                                 {
  //                                     //tipo de pregunta
  //                                     type: "text",
  //                                     //label,Answer,Validation
  //                                     data: "Ecuacion en dos variables",
  //                                     formato: {

  //                                     }
  //                                 }



  //                             ]
  //                     },

  //                     {
  //                         nodes:
  //                             [
  //                                 {
  //                                     //tipo de pregunta
  //                                     type: "text",
  //                                     //label,Answer,Validation
  //                                     data: `<math display="block" class="tml-display" style="display:block math;">
  //                                     <mrow>
  //                                       <mi>y</mi>
  //                                       <mo>=</mo>
  //                                       <mi>x</mi>
  //                                     </mrow>
  //                                   </math>`,
  //                                     formato: {

  //                                     }
  //                                 }



  //                             ]
  //                     },

  //                 ],



  //                 [// row
  //                     {//cell
  //                         nodes:
  //                             [
  //                                 {
  //                                     //tipo de pregunta
  //                                     type: "text",
  //                                     //label,Answer,Validation
  //                                     data: "Pares ordenados",
  //                                     formato: {

  //                                     }
  //                                 }



  //                             ]
  //                     },

  //                     {
  //                         nodes:
  //                             [
  //                                 {
  //                                     //tipo de pregunta
  //                                     type: "text",
  //                                     //label,Answer,Validation
  //                                     data: `          <math display="block" class="tml-display" style="display:block math;">
  //                                     <mrow>
  //                                       <mo fence="true" form="prefix">(</mo>
  //                                       <mi>x</mi>
  //                                       <mo separator="true">,</mo>
  //                                       <mi>x</mi>
  //                                       <mo fence="true" form="postfix">)</mo>
  //                                     </mrow>
  //                                   </math>`,
  //                                     formato: {

  //                                     }
  //                                 }



  //                             ]
  //                     },

  //                 ],

  //             ],

  //     }

  // },

  artifact_1: {
    quizType: 'table',
    rendering: 'rendering_1',
    // config: "procedural",
    // title: "Hola",
    keyBoardProfile: ['numeric','functions'],         quiz: {

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
                                    type: 'mathfield',
                                    //label,Answer,Validation
                                    data: {
                                      placeholder: 'x=\\frac{-\\placeholder[value1]{}\\pm\\sqrt{\\placeholder[valuew]{}^2-4\\placeholder[value3]{}\\placeholder[value4]{}}}{2\\placeholder[value5]{}} ',
                                      label: 'Máximo absoluto',
                                      condition: {
                                        value1: 1,
                                        value2: 1
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
                                  // {
                                  //     type: "mathfield",
                                  //     data: {
                                  //         placeholder: `y=\\placeholder[value]{}`,
                                  //         label: "Máximo absoluto",
                                  //         condition: {
                                  //             value: 1,
                                         

                                  //         },
                                  //     }



                                  // },
                                  {
                                    type: 'mathfieldSet',
                                    data: {
        
                                      placeholder: 'f\\left(x\\right)=\\placeholder[value_1]{}\\placeholder[value_2]{}',
                                      label: 'Máximo absoluto',
                                      condition: {
                                        value_1: ['x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}',6],
                                        value_2: 2
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
    config: 'procedural',
    title: 'Hola Mundo',
    keyBoardProfile: ['numeric','functions'],         quiz: {
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
                            type: 'radio',
                            data: {
                              label: '¿Pregunta?',
                              condition: 1,
                              optionList:
                                        [

                                          'Sí',
                                          'No',

                                        ],
                              questionType: 'basic'

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
              type: 'mathfield',
              //label,Answer,Validation
              data: {
                label: '',
                condition: 'nexists',
                questionType: 'basic'
              }



            },

                

          ]
        }
      ]}},

  artifact_5: {
    quizType: 'table',
    rendering: 'rendering_5',
    //config: "procedural",
    //title: "Hola",
    keyBoardProfile: ['interval'],
    quiz: {
      header: [


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
                              questionType: 'basic'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Alcanzado en',
                              condition: 'nexists',
                              questionType: 'basic'
                            }



                          },



                        ]
        },

      ],

        

             
                    
    }
  },
                
                
  artifact_4: {
    quizType: 'standardd',
    rendering: 'rendering_4',
    config: 'procedural',
    //  title: "Hola Mundo",
    keyBoardProfile: ['numeric','functions'],         quiz: {
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
                              condition: 'left(-infty,inftyright)',
                              questionType: 'basic'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Zonas de decrecimiento',
                              condition: 'nexists',
                              questionType: 'basic'
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
                              condition: 'left(0,inftyright)',
                              questionType: 'basic'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Partes negativas',
                              condition: 'left(-infty,0right)',
                              questionType: 'basic'
                            }



                          },



                        ]
        },





      ],

    }



  },

  artifact_5: {
    quizType: 'table',
    rendering: 'rendering_5',
    //config: "procedural",
    //title: "Hola",
    keyBoardProfile: ['numeric','functions'],         quiz: {
      header: [





        [//row
          {//cell 


            nodes:
                            [
                              {
                                //tipo de pregunta
                                type: 'text',
                                //label,Answer,Validation
                                data: 'Hola ',
                                formato: {
                                  fontSize: '1rem',
                                  fontStyle: 'italic',

                                }
                              }
                            ]
          },
          {//cell 


            nodes:
                            [
                              {
                                //tipo de pregunta
                                type: 'text',
                                //label,Answer,Validation
                                data: 'Hola ',
                                formato: {

                                }
                              }
                            ]
          },
          {//cell 


            nodes:
                            [
                              {
                                //tipo de pregunta
                                type: 'text',
                                //label,Answer,Validation
                                data: `<math xmlns='http://www.w3.org/1998/Math/MathML'>
                                            <mrow>
                                             <mi>cos</mi>
                                             <mo>&#8289;</mo>
                                             <mo>(</mo>
                                             <msup>
                                              <mi>x</mi>
                                              <mn>3</mn>
                                             </msup>
                                             <mo>)</mo>
                                            </mrow>
                                           </math>`,
                                formato: {
                                  fontSize: '0.9rem',
                                  fontStyle: 'italic',

                                }
                              }
                            ]
          },
          {//cell 


            nodes:
                            [
                              {
                                //tipo de pregunta
                                type: 'text',
                                //label,Answer,Validation
                                data: 'Hola ',
                                formato: {

                                }
                              }
                            ]
          }
        ],



      ],
      cells:
                [
                  [// row
                    {//cell
                      nodes:
                                [
                                  {
                                    type: 'simple',
                                    data: {
                                      label: 'raul1',
                                      condition: 'raul',
                                      questionType: 'basic'
                                    }
                                  },
                                  {
                                    type: 'select',
                                    data: {
                                      label: 'raul2',
                                      condition: 1,
                                      optionList:
                                                [
                                                  '',
                                                  'Opcion 1',
                                                  'Opcion 2',
                                                  'Opcion 3'
                                                ],

                                    }



                                  },


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
                                      label: 'f(x)s',
                                      condition: 'raul',
                                      questionType: 'basic'
                                    }
                                  },
                                  {
                                    type: 'select',
                                    data: {
                                      label: 'raul2',
                                      condition: 1,
                                      optionList:
                                                [
                                                  '',
                                                  'Opcion ee',
                                                  'Opcion 2',
                                                  'Opcion 3'
                                                ],

                                    }



                                  },


                                ]
                    },
                    {
                      nodes:
                                [
                                  {
                                    type: 'simple',
                                    data: {
                                      label: 'raul1',
                                      condition: 'raul',
                                      questionType: 'basic'
                                    }
                                  },
                                  {
                                    type: 'select',
                                    data: {
                                      label: 'raul2',
                                      condition: 1,
                                      optionList:
                                                [
                                                  '',
                                                  'Opcion 1',
                                                  'Opcion 2',
                                                  'Opcion 3'
                                                ],

                                    }



                                  },


                                ]
                    },
                    {
                      nodes:

                      // {
                      //     //tipo de pregunta
                      //     type: "radio",
                      //     //label,Answer,Validation
                      //     data: {
                      //         label: "¿Pregunta?",
                      //         condition: 0,
                      //         optionList:
                      //             [

                      //                 `<math xmlns='http://www.w3.org/1998/Math/MathML'>
                      //                 <mrow>
                      //                  <mi>cos</mi>
                      //                  <mo>&#8289;</mo>
                      //                  <mo>(</mo>
                      //                  <msup>
                      //                   <mi>x</mi>
                      //                   <mn>3</mn>
                      //                  </msup>
                      //                  <mo>)</mo>
                      //                 </mrow>
                      //                </math>
                      //                `,
                      //                 `No
                      //                `,

                      //             ],
                      //         questionType: "basic"

                      //     }



                      // },


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
                                    data: 'Hola como está mi nombre ',
                                    formato: {
                                      fontSize: '1rem',
                                      fontStyle: 'italic',

                                    }
                                  }


                                ]
                    },

                    {
                      nodes:
                                [
                                  {
                                    type: 'simple',
                                    data: {
                                      label: 'raul1',
                                      condition: 'raul',
                                      questionType: 'basic'
                                    }
                                  },
                                  {
                                    type: 'select',
                                    data: {
                                      label: 'raul2',
                                      condition: 1,
                                      optionList:
                                                [
                                                  '',
                                                  'Opcion 1',
                                                  'Opcion 2',
                                                  'Opcion 3'
                                                ],

                                    }



                                  },


                                ]
                    },
                    {
                      nodes:
                                [
                                  {
                                    type: 'simple',
                                    data: {
                                      label: 'raul1',
                                      condition: 'raul',
                                      questionType: 'basic'
                                    }
                                  },
                                  {
                                    type: 'select',
                                    data: {
                                      label: 'raul2',
                                      condition: 1,
                                      optionList:
                                                [
                                                  '',
                                                  'Opcion 1',
                                                  'Opcion 2',
                                                  'Opcion 3'
                                                ],

                                    }



                                  },


                                ]
                    },
                    {
                      nodes:
                                [
                                  {
                                    type: 'simple',
                                    data: {
                                      label: 'raul1',
                                      condition: 'raul',
                                      questionType: 'basic'
                                    }
                                  },
                                  {
                                    type: 'select',
                                    data: {
                                      label: 'raul2',
                                      condition: 1,
                                      optionList:
                                                [
                                                  '',
                                                  'Opcion 1',
                                                  'Opcion 2',
                                                  'Opcion 3'
                                                ],

                                    }



                                  },


                                ]
                    },
                  ]




                ],

    }

  },

  artifact_6: {
    quizType: 'inline',
    rendering: 'rendering_6',
    config: 'procedural',
    keyBoardProfile: ['numeric','functions'],         // validationBehaviour:"sequential",

    quiz: {
      formsQuestions: [
        {
          //layout: "horizontal",
          nodes:
                        [

                          {
                            //tipo de pregunta
                            type: 'simple',
                            //label,Answer,Validation
                            data: {
                              label: 'raul1',
                              condition: 'raul',
                              questionType: 'basic'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'text',
                            //label,Answer,Validation
                            data: 'Hola Puede pasar',
                            formato: {
                              fontSize: '1rem',
                              fontStyle: 'italic',

                            }
                          },
                          {
                            //tipo de pregunta
                            type: 'select',
                            //label,Answer,Validation
                            data: {
                              label: 'raul2',
                              condition: 1,
                              optionList:
                                        [
                                          '',
                                          'Opcion 1',
                                          'Opcion 2',
                                          'Opcion 3'
                                        ],
                              questionType: 'basic'

                            }

                          },
                          {
                            //tipo de pregunta
                            type: 'text',
                            //label,Answer,Validation
                            data: 'Hola Puede pasar',
                            formato: {
                              fontSize: '1rem',
                              fontStyle: 'italic',

                            }
                          },
                          {
                            //tipo de pregunta
                            type: 'radio',
                            //label,Answer,Validation
                            data: {
                              label: '¿Pregunta?',
                              condition: 1,
                              optionList:
                                        [

                                          '<math><mrow><mi>cos</mi><mo>&#8289;</mo><mo>(</mo><msup><mi>x</mi><mn>3</mn></msup><mo>)</mo></mrow></math>',
                                          'No',

                                        ],
                              questionType: 'basic'

                            }



                          },



                        ]
        }
      ]
    }
  },
}

quizGen = new QuizGenerator(def)
quizGen.generateObject()