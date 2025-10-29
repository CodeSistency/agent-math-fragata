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
      boundingbox: [-3.7, 5.5, 3.7, -1.5],
    },
    /* inputs:[
            {x:0.3,y:3.2,value:'\\pi}', style:{fontSize:20, mathClass: "colorInputAlphabet"},valid:false }
        ], */
    texts:[{x:0.2,y:3.2, text:'π', style:{fontSize:14}},
    ],
    curves: [
      {
        dash: 2,
        points: [[-10,3.14], [10,3.14]],
        opacity:0.3

      }, 
        
      {
        dash: 2,
        points: [[-10,-3], [10,-3]],
        opacity:0.3

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
        mathEcuation: 'acos(x)', //Curva a crear utiliza las expresiones de mathjs
        expression: '\\cos^{-1}\\left(\\right)',
        xCoords: [
          [
            -1,{xCoord:-0.78,axisText:'-\\frac{\\pi}{4}'},-0.39,0,0.39,{xCoord:0.71,pointText:'π/4'},1 
          ],
        ],


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
                                      label: '',
                                      condition: ['cos^{-1}left(placeholder{}right)','cos^{-1}left(right)'],
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
                        value_1: '\\cos^{-1}\\left(n\\right)'
                      },
                      questionType: 'expression'
                    }

                  },

                  /* {
                    //tipo de pregunta
                    type: "mathfield",
                    //label,Answer,Validation
                    data: {
                      placeholder: `f(x)=\\placeholder[value]{}`,
                      condition: {
                        value: 'cos^{-1}left(xright)'
                      },
                      questionType: "expression"
                    }

                  }, */



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
                                        value_1: '\\cos^{-1}\\left(n\\right)'
                
                                        // value2:1,
                                        // value3:1
                  
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
                                    data: 'Pares ordenados',
                                    formato: {

                                    }
                                  }
                                ]
                    },

                    {
                      nodes:
                                [
                                  /* {
                                        //tipo de pregunta
                                        type: "mathfield",
                                        //label,Answer,Validation
                                        data: {
                                            placeholder: `\\left(x,\\placeholder[value]{})\\right`,
                                            label: "Máximo absoluto",
                                            condition: {
                                                value: 'cos^{-1}left(xright)'
                                            },
                                            questionType: "basic"
                                        }
                                    }, */


                                  {
                                    //tipo de pregunta
                                    type: 'mathfieldSet',
                                    //label,Answer,Validation
                                    data: {
                                      placeholder:'\\left(n,\\placeholder[value_1]{})',
                                      condition: {
                                        value_1:'\\cos^{-1}\\left(n\\right)'
                                             
                                      },
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
                            type: 'mathfield',
                            //label,Answer,Validation
                            data: {
                              label: `¿Cuál es el número n al que
                                  <math>
                                  <msup>
                                      <mi>cos</mi>
                                      <mn>-1</mn>
                                  </msup>
                                  </math>(n)  = π/4?`,

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
                      condition: ['leftlbrack0,pirightrbrack'],
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
                      condition: ['left(0,1.57right)','left(0,frac{pi}{2}right)'],
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
                      label: 'Máximo absoluto:',
                      condition: ['pi'],
    
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
                      condition: ['0'],
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
    
      ],
    }
  },
  artifact_6: {
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
                      label: 'Zonas de crecimiento:',
                      condition: ['nexists',],
    
                      questionType: 'expression'
                    }
                  },
                  {
                    //tipo de pregunta
                    type: 'mathfield',
                    //label,Answer,Validation
                    data: {
                      label: 'Zonas de decrecimiento:',
                      condition: ['left(-1,1right)',],
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
                      condition: ['leftlbrack-1,1right)'],
                      questionType: 'expression'
                    }

                  },
                  {
                    //tipo de pregunta
                    type: 'mathfield',
                    //label,Answer,Validation
                    data: {
                      label: 'Partes negativas:',
                      condition: ['nexists',],

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
      screen: { defaultText: [{ textValue: 'n', disabled: true }, { textValue: '\\cos^{-1}\\left(n\\right)', disabled: true }] },
      key: { defaultText: [{ textValue: '\\cos^{-1}\\left(n\\right)', disabled: true }] }
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