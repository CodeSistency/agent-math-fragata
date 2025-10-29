let defBoards = {
  board_1: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-3, -2, -1, 1, 2, 3],
        yv: ['-3', '-2', '-1', '1', '2', '3'],
        xp: [-3, -2, -1, 1, 2, 3],
        xv: ['', '', '-1', '1', '', ''],
        xd: [[0, 0],
          [1, 0],],
      },
      grid: true,
      boundingbox: [-4, 5, 4, -2],
    },
    inputs:[
      {x:0.3,y:-1.57,value:'\\frac{-\\pi}{2}', style:{fontSize:16, mathClass: 'colorInputAlphabet'},valid:false },

      {x:0.3,y:1.57,value:'\\frac{\\pi}{2}', style:{fontSize:16, mathClass: 'colorInputAlphabet'},valid:false }
    ],

    curves: [
      {
        dash: 2,
        points: [[-10,1.57], [10,1.57]],
        opacity:0.3,
        strokeWidth:3,
                
        strokeColor:'#076382',
      }, 
        
      {
        dash: 2,
        points: [[-10,-1.57], [10,-1.57]],
        opacity:0.3,
        strokeWidth:3,
                
        strokeColor:'#076382',
      }, 
    ],

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
        mathEcuation: 'asin(x)', //Curva a crear utiliza las expresiones de mathjs
        expression: '\\sin^{-1}\\left(\\right)',
        xCoords: [
          [
            -1,{xCoord:-0.78,axisText:'-\\frac{\\pi}{4}'},-0.39,0,0.39,{xCoord:0.70,pointText:'π/4'},1 
          ],
        ],

        //{ xCoord: "4", axisText: "π" },
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
    keyBoardProfile: ['numeric','functions','symbols'],
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
                                  /* {
                                        type: "mathfield",
                                        data: {
                                            placeholder: `\\sin^{-1}\\left(\\placeholder[value]{}\\right)`,
                                            condition: {
                                                value: "x"
                                            },
                                            questionType: "expression"
                                        }
                                    }, */
                                  {
                                    //tipo de pregunta
                                    type: 'mathfield',
                                    //label,Answer,Validation
                                    data: {
                                      label: '',
                                      condition: ['sin^{-1}left(placeholder{}right)','sin^{-1}left(right)'],
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
                    //label,Answer,Validation
                    data: {
                      placeholder: 'f(n)=\\placeholder[value_1]{}',
                      condition: {
                        value_1: 'sin^{-1}left(nright)'
                      },
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
                                      placeholder: 'y=\\placeholder[value_1]{}}',
                                      condition: {
                                        value_1:'sin^{-1}left(nright)'
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
                                        value_1: 'sin^{-1}left(nright)'
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
    rendering: 'rendering_questions',
    config: '',
      
    keyBoardProfile: ['numeric','functions','symbols'],

    quiz: {
      formsQuestions: [
        {
          //layout: "horizontal",
          nodes:
                        [
                            
                          {
                            //tipo de pregunta
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: `¿Cuál es el número n al que <math>
                                  <msup>
                                      <mi>sin</mi>
                                      <mn>-1</mn>
                                  </msup>
                                  </math>(n)  = π/4 ?`,
                              condition: ['0.707107','0.7','0.71','0.70'],
                
                              questionType: 'expression'
                            }
                          },
                        ]
        }
      ]
    }
  },
  artifact_4: {
    quizType: 'standard',
    rendering: 'rendering_2',
        
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
                      label: 'Dominio:',
                      condition: ['leftlbrack-1,1rightrbrack'],
    
                      questionType: 'expression'
                    }
                  },
                  {
                    //tipo de pregunta
                    type: 'mathfield',
                    //label,Answer,Validation
                    data: {
                      label: 'Rango:',
                      condition: ['leftlbrack-frac{pi}{2},frac{pi}{2}rightrbrack','leftlbrackfrac{-pi}{2},frac{pi}{2}rightrbrack'],
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
                      condition: ['left(0,0right)'],
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
  artifact_5: {
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
                      label: 'Máximo absoluto:',
                      condition: ['frac{pi}{2}'],
    
                      questionType: 'expression'
                    }
                  },
                  {
                    //tipo de pregunta
                    type: 'mathfield',
                    //label,Answer,Validation
                    data: {
                      label: 'Alcanzado en:',
                      condition: ['1'],
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
                      condition: ['-frac{pi}{2}','frac{-pi}{2}'],
                      questionType: 'expression'
                    }
    
    
    
                  },
                  {
                    //tipo de pregunta
                    type: 'mathfield',
                    //label,Answer,Validation
                    data: {
                      label: 'Alcanzado en:',
                      condition: ['-1'],
                      questionType: 'expression'
                    }
    
    
    
                  },
    
    
    
                ]
        },
    
      ],
    }
  },
  artifact_6: {
    quizType: 'standard',
    rendering: 'rendering_4',
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
                      label: 'Puntos máximos No absolutos:',
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
                      label: 'Puntos mínimos No absolutos:',
                      condition: ['nexists'],
                      questionType: 'expression'
                    }
                  },
                ]
        },
    
      ],
    }
  },



  artifact_7: {
    quizType: 'standard',
    rendering: 'rendering_5',
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
                      label: 'Zonas de crecimiento:',
                      condition: ['leftlbrack-1,1rbrackright',],
    
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
                      condition: ['left(0,1rightrbrack'],
                      questionType: 'expression'
                    }
    
    
    
                  },
                  {
                    //tipo de pregunta
                    type: 'mathfield',
                    //label,Answer,Validation
                    data: {
                      label: 'Partes negativas:',
                      condition: ['leftlbrack-1,0right)'],
                      questionType: 'expression'
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
      screen: { defaultText: [{ textValue: 'n', disabled: true }, { textValue: '\\sin^{-1}\\left(n\\right)', disabled: true }] },
      key: { defaultText: [{ textValue: '\\sin^{-1}\\left(\\right)', disabled: true }] }
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