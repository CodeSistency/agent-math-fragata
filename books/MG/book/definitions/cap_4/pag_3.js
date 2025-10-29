let def ={
  example_artifact_1: {
  
    variableX:'7',
    buttonsActive: false,
    characteristicsArtifact: {
      typeForm: 'artifactGrid',
      width:'250px',
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
      screen: {defaultText:[{textValue:'n' ,disabled:true}, {textValue:'n',disabled:true}] },
      key:{defaultText:[{textValue:'(\\space\\space)', disabled:true}]}
    },
    conditions: {
      screen: [[], [], []],
      //    key: []
    }
  },
}

let def2 =
{
  artifact_example_2: {
    quizType: 'table',
    rendering: 'example_rendering',
    // config: "procedural",
    // title: "Hola",
    keyBoardProfile: ['numeric','functions','symbols'],
    quiz: {

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
                                    type: 'text',
                                    //label,Answer,Validation
                                    data: `<math display="block" class="tml-display" style="display:block math;">
                                        <mrow>
                                          <mo fence="true" form="prefix">( </mo>
                                          <mo fence="true" form="postfix"> )</mo>
                                        </mrow>
                                      </math>`,
                                    formato: {

                                    }
                                  }
                 


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
                                    type: 'text',
                                    //label,Answer,Validation
                                    data: 'ƒ(n) = n',
                                    formato: {

                                    }
                                  }
                 


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
                                    type: 'text',
                                    //label,Answer,Validation
                                    data: 'y = n',
                                    formato: {

                                    }
                                  }
                 


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
                                    type: 'text',
                                    //label,Answer,Validation
                                    data:'(n,n)',
                                    formato: {

                                    }
                                  }
                          


                                ]
                    },
                 
                  ],

                ],

    }

  },
  

    
    
  artifact_1: {
    quizType: 'standard',
    rendering: 'rendering_1',
    //  config: "procedural",
    //  title: "Hola Mundo",
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
                              label: 'Dominio',
                              condition: ['left(-infty,inftyright)','R'],
                              questionType: 'expression'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Rango',
                              condition: ['left(-infty,inftyright)','R'],
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
                              condition: 'left(0,0right)',
                              questionType: 'expression'
                            }



                          },
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: 'Puntos de cortes con el eje y',
                              condition: 'left(0,0right)',
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
    rendering: 'rendering_2',
    // config: "procedural",
    //  title: "Hola Mundo",
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

  artifact_4: {
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
                          label: 'Zonas de crecimiento',
                          condition: ['left(-infty,inftyright)','R'],
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
                          condition: 'left(0,inftyright)',
                          questionType: 'expression'
                        }



                      },
                      {
                        //tipo de pregunta
                        type: 'mathfield',
                        //label,Answer,Validation
                        data: {
                          label: 'Partes negativas',
                          condition: 'left(-infty,0right)',
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
      boundingbox: [-5, 4, 5, -4],
  
    },
  
  },
}

const def3=
  {
  
    artifact_2: {
      buttonsActive: {
        curve: true
      },
      conditions: {
        alphabetDiagram: {
  
          mathEcuation: 'x', //Curva a crear utiliza las expresiones de mathjs
          expression: '\\left(\\right)',
          xCoords: [
            [
              -3,  -2,    ,0,  2, 3,
            ],
  
          ],
  
        }
      }
    },
  
  
  }

const quizGen = new QuizGenerator(def2)
quizGen.generateObject()


generateArtifact(def)

new GenerateArtifactsEngineAlphabet(def3, defBoards)