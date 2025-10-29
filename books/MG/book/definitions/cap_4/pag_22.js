const defBoards = {
  board_0: {
    artifact: 'artifact_1',
    style: {
      grid: true,
      height: '550px',
      width: '600px',
      boundingbox: [-3.4, 5, 6.7, -5],
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0], [0, 1]] /*dirección del eje y*/,
        xd: [[0, 0], [1, 0]],
      },
    },
    expressionCurve: 'sin(x)',

    points: [
      //[-2, 6, false, "Lejos del eje x", true, "black"],
      [0, 1.2, true, '1', true, 'black'],


      // [-5, 0.5, false, "Cerca de 1", true, "black"],
      //[-3, 1.2, false, "Cerca de 1",false, "black"],


      [0, -1, true, '-1', true, 'black'],
      //[-2, 0, false, "Cerca del eje x", true, "black"],

    ],
    lines: [
      { points: [[-7.1416, 1], [7, 1]], dash: 3, opacity: 0.5 },
      { points: [[-7.1416, -1], [7, -1]], dash: 3, opacity: 0.5 },

      // { points: [[0, 8], [0, -8]], dash: 0, opacity: 0.5 },

      { points: [[-3.1416, 8], [-3.1416, -8]], dash: 3, opacity: 0.5 },
      { points: [[0, 8], [0, -8]], dash: 3, opacity: 0.5 ,style: { strokeColor: 'red'}},
      { points: [[3.1416, 8], [3.1416, -8]], dash: 3, opacity: 0.5 },
      { points: [[6.3, 8], [6.3, -8]], dash: 3, opacity: 0.5 },



    ],

    texts: [
      { x: 0.1, y: -0.1, text: '0', style: { fontSize: 12 } },
      { x: -3, y: 0, text: '-π', style: { fontSize: 12 } },
      { x: 3.3, y: 0, text: 'π', style: { fontSize: 12 } },
      { x: -1.5, y: -0.2, text: '-π/2', style: { fontSize: 12 } },
      { x: 1.5, y: -0.2, text: 'π/2', style: { fontSize: 12 } },
      { x: 6.1, y: 0.5, text: '2π', style: { fontSize: 12 } },

      { x: 4.7, y: 0.2, text: '3π/2', style: { fontSize: 12 } },
      { x: -4.7, y: 0.2, text: '-3π/2', style: { fontSize: 12 } },
      { x: 4.9, y: -1.3, text: 'Sin(&nbsp;)', style: { fontSize: 14 } },
      { x: 0.2, y: 4, text: 'Eje Y', style: { fontSize: 14 } },



    ]

  },
}




const rDef = {


  artifact_1: {

    debug: false,
    helpMsg: true,
    //useAsymptotes:true,
    validateCurves: true,
    buttonsActive: { curves: true },
    showStripes: true,
    curveMod: {
      color: 'red',
      interactive: true,
    },
    inputsDefault: [[[-0.35, 2], true, '', 1], [[2, -0.2], false, '2', 2]],

    conditions: {

      /* 
              { x: -4, y: -2, visible: true, name: 'a', fixed: true, color: "black" },
        { x: 0, y: -1, visible: true, name: 'b', fixed: true, color: "black" },
       // { x: 0.8, y: -0.2, visible: true, name: 'c', fixed: true, color: "black" },
        { x: 1, y: 0, visible: true, name: 'd', fixed: true, color: "black" },
      //  { x: 1.1, y: 0.2, visible: true, name: 'e', fixed: true, color: "black" },
        { x: 1.45, y: 1, visible: true, name: 'f', fixed: true, color: "black" },
        { x: 1.6, y: 1.5, visible: true, name: 'g', fixed: true, color: "black" },
        */

      zones: [[-2, -5], [-3, -4], [2, 5], [3, 4]], //zonas corre


      inverseCurve: [ //puntos
        { //curva
          id: 1,
          points: [[-1.57079, -1], [-0.4, -0.4, true], [-0.9, -0.8, false], [-2.2, -0.8, false], [-2.75, -0.4, true], [-0.1, -0.1, false], [-3, -0.1, false]],
          //zones: [[-1,-6],[-2,-5]]
        },
        { //curva
          id: 2,
          points: [[1.57, 1, true], [0.95, 0.8, true], [2.2, 0.8, true], [0.4, 0.4, true], [2.75, 0.4, true], [0.15, 0.15, false], [2.95, 0.15, false],],
          //zones: [[3,4],[1,6]]
        },
        { //curva
          // id:3,
          points: [[1.57, 1, true], [0.95, 0.8, true], [2.2, 0.8, true], [0.4, 0.4, true], [2.75, 0.4, true], [0.15, 0.15, true], [2.95, 0.15, true],],
          points: [[4.712, -1, true], [5.35, -0.8, true], [4.1, -0.8, true], [3.505, -0.4, true], [5.9, -0.4, true], [3.25, -0.1, false], [6.2, -0.1, false]],
          //zones: [[-1,-6],[-2,-5]]
        },
      ],





    },
  }
}



const defQuiz = {

  artifact_2: {
    quizType: 'standard',
    rendering: 'rendering_1',
    //  config: "procedural",
    //  title: "Hola Mundo",
    keyBoardProfile: ['numeric'],
    quiz: {
      generalLayout: '',
      formsQuestions: [
        {
          layout: 'vertical',
          nodes:
            [
              {
                type: 'select',
                data: {
                  label: `Señale la respuesta correcta sobre las diferencias que usted nota entre las curvas de &nbsp; Sin(2· (&nbsp;))&nbsp; y &nbsp; <math class="tml-display" style="display: math;">
  <mrow>
    <mrow>
      <mi>sin</mi>
      <mo>⁡</mo>
    </mrow>
    <mrow>
      <mo fence="true" form="prefix">( </mo>
      <mfrac>
        <mrow>
          <mo fence="true" form="prefix">(</mo>
          <mo fence="true" form="prefix"> </mo>
          <mo fence="true" form="postfix">)</mo>
        </mrow>
        <mn>2</mn>
      </mfrac>
      <mo fence="true" form="postfix"> )</mo>
    </mrow>
  </mrow>
</math>`,
                  condition: 2,
                  optionList:
                    [
                      '',
                      'Las dos curvas son iguales',
                      'La diferencia principal es que una función se comprime horizontalmente mientras que la otra se expande verticalmente',
                    ],

                }



              },


              {
                type: 'select',
                data: {
                  label: `Señale cómo se imagina la forma de la curva de Sin(3· (&nbsp;))&nbsp; y &nbsp; <math class="tml-display" style="display: math;">
  <mrow>
    <mrow>
      <mi>sin</mi>
      <mo>⁡</mo>
    </mrow>
    <mrow>
      <mo fence="true" form="prefix">( </mo>
      <mfrac>
        <mrow>
          <mo fence="true" form="prefix">(</mo>
          <mo fence="true" form="prefix"> </mo>
          <mo fence="true" form="postfix">)</mo>
        </mrow>
        <mn>3</mn>
      </mfrac>
      <mo fence="true" form="postfix"> )</mo>
    </mrow>
  </mrow>
</math`,
                  condition: 1,
                  optionList:
                    [
                      '',
                      'La función 3(sen()) Se contrae en un factor de 3 y la función sen(()/3) se expande en un factor 3',
                      'La función 3(sen()) y la función sen(()/3) se contraen en un mismo factor',
                      'La función 3(sen()) y la función sen(()/3) son iguales'
                    ],

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
    keyBoardProfile: ['numeric', 'functions', 'symbols'],


    quiz: {
      generalLayout: '',
      formsQuestions: [
        {
          layout: 'vertical',
          nodes:
            [
              {
                //tipo de pregunta
                type: 'mathfieldSet',
                //label,Answer,Validation
                /* data: {
                  label: "Dominio:",
                  condition: ["left(-infty,inftyright)","R","left(-infty,+inftyright)"],


                  questionType: "expression"
                } */

                /* data: {
                  placeholder: "(-2\\pi,\\placeholder[value_1]{})\\cup(\\frac{\\pi}{2}\\placeholder[value_2]{})",

                  label: "Zonas de decrecimiento:",
                  condition: {
                   
                    value_1: "-pi",
                    value_2: "pi",
               

                  },

                  questionType: "expression"
                } */
                data: {
                  placeholder: '\\ldots(-\\pi,\\placeholder[value_1]{})\\cup(0,\\placeholder[value_2]{})\\cup(\\pi,\\placeholder[value_3]{})\\ldots',
                  label: 'Dominio',

                  condition: {
                    value_1: '0',
                    value_2: '\\pi',
                    value_3: '2\\pi',
                  },
                  questionType: 'expression'
                }


              },
              {
                //tipo de pregunta
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Rango:',
                  condition: ['left(-infty,-1rbrackcuplbrack1,inftyright)', 'R-\\left(-1,1\\right)', ' \\left(-\\infty,\\infty\\right)-\\left(-1,1\\right)'],
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
                type: 'mathfield',
                //label,Answer,Validation
                data: {
                  label: 'Puntos de corte con el eje x:',
                  condition: ['nexists'],
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
                  label: 'Puntos de corte con el eje y:',
                  condition: ['nexists'],
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
    keyBoardProfile: ['numeric', 'functions', 'symbols'],


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
                  condition: ['nexists'],

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
                  placeholder: '\\placeholder[value_1]{}',
                  label: 'Alcanzado en: ',

                  condition: {
                    value_1: 'nexists',
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
                  condition: ['nexists'],
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
                  placeholder: '\\placeholder[value_1]{}',
                  label: 'Alcanzado en: ',

                  condition: {
                    value_1: 'nexists',
                  },
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
    rendering: 'rendering_4',
    keyBoardProfile: ['numeric', 'functions', 'symbols'],


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
                //label,Answer,Validation
                data: {
                  label: 'Puntos máximos No absolutos:',
                  placeholder: '\\ldots\\left(\\frac{-\\pi}{2},\\placeholder[value_1]{});\\left(\\placeholder[value_2]{})\\ldots',
                  condition: {
                    value_1: ['-1'], //"\\frac{-\\pi}{2},-1", "-\\frac{\\pi}{2},-1"
                    value_2: ['\\frac{3\\pi}{2},-1'],
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
              // {
              //   //tipo de pregunta
              //   // type: "mathfield",
              //   // //label,Answer,Validation
              //   // data: {
              //   //   label: "Puntos mínimos No absolutos:",
              //   //   condition: ["1"],
              //   //   questionType: "expression"
              //   // }

              // },

              {
                //tipo de pregunta
                type: 'mathfieldSet',
                //label,Answer,Validation
                data: {
                  placeholder: '\\ldots\\left(\\placeholder[value_1]{})\\ldots',
                  label: 'Puntos mínimos No absolutos:',

                  condition: {
                    value_1: ['\\frac{\\pi}{2},1'],
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
    rendering: 'rendering_5',
    keyBoardProfile: ['numeric', 'functions', 'symbols'],


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
                  placeholder: '\\ldots\\left(\\placeholder[value_1]{});\\left(\\placeholder[value_2]{});\\left(\\placeholder[value_3]{})\\ldots',
                  label: 'Zonas de crecimiento:',

                  condition: {
                    value_1: ['\\-pi,\\-frac{\\pi}{2}', '-\\pi,\\frac{-\\pi}{2}'],
                    value_2: ['\\frac{\\pi}{2},\\pi'],
                    value_3: ['\\pi,\\frac{3\\pi}{2}']
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
                  placeholder: '\\ldots\\left(\\placeholder[value_1]{});\\left(\\placeholder[value_2]{});\\left(\\placeholder[value_3]{})\\ldots',
                  label: 'Zonas de decrecimiento:',

                  condition: {
                    value_1: ['\\-frac{\\pi}{2},0', '\\frac{-\\pi}{2},0'],
                    value_2: ['0,\\frac{\\pi}{2}', '0,\\frac{\\pi}{2}'],
                    value_3: ['\\frac{3\\pi}{2},2\\pi']
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
                    value_1: ['0,\\pi'],
                  },
                  questionType: 'expression'
                }

              },



              {
                //tipo de pregunta
                type: 'mathfieldSet',
                //label,Answer,Validation
                data: {
                  placeholder: '\\ldots\\left(\\placeholder[value_1]{});\\left(\\placeholder[value_2]{})\\ldots',
                  label: 'Partes negativas:',

                  condition: {
                    value_1: ['-\\pi,0'],
                    value_2: ['\\pi,2\\pi'],
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



const element = colorInitMain(rDef, defBoards)
const quizGen = new QuizGenerator(defQuiz)
quizGen.generateObject()



//mainOperation(defBoards, rDef);
