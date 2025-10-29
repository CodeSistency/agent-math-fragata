
const defBoards = {
  board_1: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        // yp: [-3, -2, -1, 1, 2, 3],
        yv: ['-3', '-2', '-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
      },
      grid: true,
      boundingbox: [-4, 4, 4, -4],
  
    },
    inputs:[

      {x:-0.3,y:-1,value:'-1', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },
      {x:-0.3,y:-2,value:'-2', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },
      {x:-0.3,y:-3,value:'-3', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },


      {x:-0.3,y:1,value:'1', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },
      {x:-0.3,y:2,value:'2', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },
      {x:-0.3,y:3,value:'3', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },




      {x:-3.14,y:-0.2,value:'-\\pi', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },
      {x:3.14,y:-0.2,value:'\\pi', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },
        
      {x:-0.7,y:-0.4,value:'\\frac{-\\pi}{4}', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },
      {x:0.7,y:-0.4,value:'\\frac{\\pi}{4}', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },

      {x:-1.57079632679,y:-0.4,value:'\\frac{-\\pi}{2}', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false },

      {x:1.57079632679,y:-0.4,value:'\\frac{\\pi}{2}', style:{fontSize:12, mathClass: 'colorInputAlphabet'},valid:false }
    ],


  },
}

const def = {

  artifact_Example_1: {
  
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
      screen: { defaultText: [{ textValue: 'n', disabled: true }, { textValue: 'sin(n)', disabled: true }] },
      key: { defaultText: [{ textValue: 'sin(\\space\\space)}' }], disabled: true }
    },
    conditions: {
      screen: [[], [], []],
      //    key: []
    }
  },
}

  
const defQuiz = {
  artifact_1: {
    quizType: 'table',
    rendering: 'rendering_1',
    // config: "procedural",
    // title: "Hola",
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
                    /* {
                      type: "mathfield",
                      data: {
                        placeholder:`\\sin\\left(\\placeholder[value]{}\\right)`,
                        condition: {
                          value: "x"
                        },
                        questionType: "basic"
                      }
                    }, */

                    {
                      //tipo de pregunta
                      type: 'mathfield',
                      //label,Answer,Validation
                      data: {
                        label: '',
                        condition: ['sinleft(placeholder{}right)','sinleft(right)'],
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
                          value_1: ['\\sin\\left(n\\right)',' \\sin\\left(\\placeholder{}\\right)']
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
                        placeholder: 'y=\\placeholder[value_1]{}',
                        condition: {
                          value_1: '\\sin\\left(n\\right)'

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
                                  {
                                    //tipo de pregunta
                                    type: 'text',
                                    //label,Answer,Validation
                                    data: '(n,sin(n))',
                                    formato: {

                                    }
                                  }
                 


                                ]
              },
                 
            ],
  
  
  
  
  
          
  
          ],
  
    }
  
  },
  artifact_3: {
    quizType: 'standard',
    rendering: 'rendering_questions',
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
                    label: '¿La curva Seno o "Sin" es simétrica con respecto al eje vertical?',
                    condition: 1,
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
                    label: '¿Es cierto que sin(n)= ‒sin(‒n)?',
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
                    label: '¿Par o impar?',
                    condition: 1,
                    optionList:
                      [
  
                        'Par',
                        'Impar',
  
                      ],
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
    rendering: 'rendering_2',
    keyBoardProfile: ['numeric', 'functions','symbols'],


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
                    label: 'Dominio:',
                    condition: ['left(-infty,inftyright)','R','left(-infty,+inftyright)'],

  
                    questionType: 'expression'
                  }
                },
                {
                  //tipo de pregunta
                  type: 'mathfield',
                  //label,Answer,Validation
                  data: {
                    label: 'Rango:',
                    condition:['leftlbrack-1,1rightrbrack'],
                    questionType: 'expression'
                  },

                  

                },
              ]
        },
        {
          layout: 'vertical',
          nodes:
              [
                /* {
                  //tipo de pregunta
                  type: "mathfield",
                  //label,Answer,Validation
                  data: {
                    label: "Cortes en el eje X:",
                    condition: ["left(-pi,0right);left(0,0right);left(pi,0right)","left(-pi,0right),left(0,0right),left(pi,0right)"],
                    questionType: "expression"
                  }
  
  
  
                }, */

                {
                  //tipo de pregunta
                  type: 'mathfieldSet',
                  //label,Answer,Validation
                  data: {
                    placeholder: '\\ldots\\placeholder[value_1]{};\\placeholder[value_2]{};\\placeholder[value_3]{}\\ldots',
                    label: 'valores de corte con el eje x:',
                    
                    condition: {
                      value_1: '\\-pi',
                      value_2: '0',
                      value_3: '\\pi',
                    },
                    questionType: 'expression'
                  }

                },
                /*   {
                  //tipo de pregunta
                  type: "mathfieldSet",
                  //placeholder: `\\ldots\\left(\\placeholder[value_1]{}\\right);\\left(\\placeholder[value3]{},\\placeholder[value4]{}\\right);\\left(\\placeholder[value5]{},\\placeholder[value6]{}\\right)\\ldots`,
                  placeholder: `\\ldots\\left(\\placeholder[value_1]{}\\right)`,
                  
                  data: {
                      label: "Puntos de corte con el eje x:",
                      condition:{
value_1:"-pi,0",

                      } ,

                      questionType: "expression"
                  }



              }, */
                {
                  //tipo de pregunta
                  type: 'mathfield',
                  //label,Answer,Validation
                  data: {
                    label: 'Valores de corte con el eje y:',
                    condition: ['0'],
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
          layout: 'vertical',
          nodes:
              [
                {
                  //tipo de pregunta
                  type: 'mathfield',
                  //label,Answer,Validation
                  data: {
                    label: 'Máximo absoluto:',
                    condition: ['1'],
  
                    questionType: 'expression'
                  }
                },
                /*   {
                  //tipo de pregunta
                  type: "mathfield",
                  //label,Answer,Validation
                  data: {
                    label: "Alcanzado en:",
                    condition: ["frac{pi}{2}"],
                    questionType: 'expression'
                  }
                }, */
                {
                  //tipo de pregunta
                  type: 'mathfieldSet',
                  //label,Answer,Validation
                  data: {
                    placeholder: '\\ldots\\\placeholder[value_1]{}\\ldots',
                    label: 'Alcanzado en: ',
                    
                    condition: {
                      value_1: '\\frac{\\pi}{2}',
                    },
                    questionType: 'expression'
                  }

                },
                
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
                    label: 'Mínimo absoluto:',
                    condition: ['-1'],
                    questionType: 'expression'
                  }
  
  
                },
                /*    {
                  //tipo de pregunta
                  type: "mathfield",
                  //label,Answer,Validation
                  data: {
                    label: "Alcanzado en:",
                    condition: ["-frac{pi}{2}"],
                    questionType: "expression"
                  }
  
                },
                 */
  
                {
                  //tipo de pregunta
                  type: 'mathfieldSet',
                  //label,Answer,Validation
                  data: {
                    placeholder: '\\ldots\\placeholder[value_1]{}\\ldots',
                    label: 'Alcanzado en: ',
                    
                    condition: {
                      value_1: '\\-frac{\\pi}{2}',
                    },
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
          layout: 'vertical',
          nodes:
              [
                /*                {
                  //tipo de pregunta
                  type: "mathfield",
                  //label,Answer,Validation
                  data: {
                    label: "Zonas de crecimiento:",
                    condition: ['left(-frac{pi}{2},frac{pi}{2}right)'],
  
                    questionType: "expression"
                  }
                }, */
                {
                  //tipo de pregunta
                  type: 'mathfieldSet',
                  //label,Answer,Validation
                  data: {
                    placeholder: '\\ldots\\left(\\placeholder[value_1]{})\\ldots',
                    label: 'Zonas de crecimiento:',
                    
                    condition: {
                      value_1: ['\\-frac{\\pi}{2},\\frac{\\pi}{2}','\\frac{-\\pi}{2},\\frac{\\pi}{2}'],
                    },
                    questionType: 'expression'
                  }

                },
                /* {
                  //tipo de pregunta
                  type: "mathfieldSet",
                  placeholder: `\\ldots\\left(\\placeholder[value_1]{})\\ldots`,


                  data: {
                    label: "Zonas de crecimiento:",
                      condition:{
                        value_1:"-frac{pi}{2},frac{pi}{2}"
                       


                      } ,

                      questionType: "expression"
                  }

              }, */



                /*             {
                  //tipo de pregunta
                  type: "mathfield",
                  //label,Answer,Validation
                  data: {
                    label: "Zonas de decrecimiento:",
                    condition: ['left(-pi,-frac{pi}{2}right)cupleft(frac{pi}{2},piright)'],
                    questionType: 'expression'
                  }
                },
 */
                /* {
                  //tipo de pregunta
                  type: "mathfieldSet",
                  //label,Answer,Validation
                  data: {
                    placeholder: `\\ldots\\left(\\placeholder[value_1]{})\\ldots`,
                    label: "Zonas de crecimiento:",
                    
                    condition: {
                        value_1: "\\-frac{\\pi}{2}",
                    },
                    questionType: "expression"
                  }

                }, */
                {
                  //tipo de pregunta
                  type: 'mathfieldSet',
                  //label,Answer,Validation
                  data: {
                    placeholder: '\\ldots\\left(\\placeholder[value_1]{});\\left(\\placeholder[value_2]{})\\ldots',
                    label: 'Zonas de decrecimiento:',
                    
                    condition: {
                      value_1: '\\-pi,\\-frac{\\pi}{2}',
                      value_2:'\\frac{\\pi}{2},pi'
                    },
                    questionType: 'expression'
                  }

                },
                /*  {
                  //tipo de pregunta
                  type: "mathfield",
                  placeholder: `\\ldots\\left(\\placeholder[value1]{},\\placeholder[value2]{}\\right)\\cup\\left(\\placeholder[value3]{},\\placeholder[value4]{}\\right)\\ldots`,


                  data: {
                    label: "Zonas de decrecimiento:",
                      condition:{
value1:"-pi",
value2:"-frac{pi}{2}",
value3:"frac{pi}{2}",
value4:"-pi",

                      } ,

                      questionType: "expression"
                  }



              },
 */

              ]
        },
        {
          layout: 'vertical',
          nodes:
              [


                {
                  //tipo de pregunta
                  type: 'mathfieldSet',
                  //label,Answer,Validation
                  data: {
                    placeholder: '\\ldots\\left(\\placeholder[value_1]{})\\ldots',
                    label: 'Partes positivas:',
                    
                    condition: {
                      value_1: '0,\\pi',
                    },
                    questionType: 'expression'
                  }

                },


  
                {
                  //tipo de pregunta
                  type: 'mathfieldSet',
                  //label,Answer,Validation
                  data: {
                    placeholder: '\\ldots\\left(\\placeholder[value_1]{})\\ldots',
                    label: 'Partes negativas:',
                    
                    condition: {
                      value_1: '-\\pi,0',
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
const defAlphabet =
{

  artifact_2: {
    buttonsActive: {
      curve: true
    },
    conditions: {
      alphabetDiagram: {

        mathEcuation: 'sin(x)', //Curva a crear utiliza las expresiones de mathjs
        expression: '\\sin\\left(\\right)',
        xCoords: [
          [

            { xCoord: '-\\pi', /* axisText: "-\\pi" */}, { xCoord: '\\frac{-\\pi}{2}', /* axisText: "-\\frac{\\pi}{2}" */} ,0,{ xCoord: '\\frac{\\pi}{2}',/*  axisText: "\\frac{\\pi}{2}" */},{ xCoord: '\\pi', /* axisText: "\\pi" */}
          ],

        ],

      }
    }
  },


}

generateArtifact(def)

const quizGen = new QuizGenerator(defQuiz)
quizGen.generateObject()

new GenerateArtifactsEngineAlphabet(defAlphabet, defBoards)
