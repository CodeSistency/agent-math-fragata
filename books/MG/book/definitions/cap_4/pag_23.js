const defBoards = {
  board_0: {
    artifact: 'artifact_10',
    style: {
      grid: true,
      height: '550px',
      width: '600px',
      boundingbox: [-6, 7, 5, -6],
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0], [0, 1]] /*dirección del eje y*/,
        xd: [[0, 0], [1, 0]],
      },
    },
        
      
    expressionCurve: 'cos(x)',
    points: [
      //[-2, 6, false, "Lejos del eje x", true, "black"],
      [0, 1.2, true, '1', true, 'black'],
    
  
      // [-5, 0.5, false, "Cerca de 1", true, "black"],
      //[-3, 1.2, false, "Cerca de 1",false, "black"],
  
  
      [0, -1, true, '-1', true, 'black'],
      //[-2, 0, false, "Cerca del eje x", true, "black"],
  
    ],
    lines: [
      { points: [[-7, -1], [7, -1]], dash: 2, opacity:0.5 },
      { points: [[-1.58, 8], [-1.58, -8]], dash: 2, opacity:0.5 },
      { points: [[1.58, 8], [1.58, -8]], dash: 2, opacity:0.5 },
      { points: [[-4.7, 8], [-4.7, -8]], dash: 2, opacity:0.5 },
      { points: [[4.7, 8], [4.7, -8]], dash: 2, opacity:0.5 },
        
    ],
      
    texts: [
      { x: 3, y: -0.2, text: 'π', style: { fontSize: 12 } },
      { x: -3.25, y: -0.2, text: '-π', style: { fontSize: 12 } },

      { x: 0.6, y: -4, text: 'Sec(x) = 1/Cos(x)', style: { fontSize: 16 } },
      { x: 1.6, y: 0.2, text: 'π/2', style: { fontSize: 12 } },

      { x: -1.5, y: -0.2, text: '-π/2', style: { fontSize: 12 } },

      { x: 4.2, y: 0.2, text: '3π/2', style: { fontSize: 12 } },
      { x: -4.6, y: 0.2, text: '-3π/2', style: { fontSize: 12 } },


    ]

  },
}
  
  


const rDef = {

  
  artifact_1: {

    debug:false,
    helpMsg:true,
    //useAsymptotes:true,
    validateCurves:true, 
    buttonsActive: { curves: true },
    showStripes:true,
    curveMod: {
      color: 'red',
      interactive: true,
    },
    inputsDefault:[[[-0.35, 2], true, '', 1], [[2, -0.2], false, '2', 2]],
  
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

      zones:[[-2,-5],[-3,-4],[2,5],[3,4]], //zonas corre


      inverseCurve: [ //puntos
        { //curva
          id:1,
          points:[[-3.14 ,-1], [-2.1,-0.5],[-4,-0.68],[-1.7,-0.08,false],[-4.6,-0.15,false],[-3.2,-1,false],[-2.8,-0.95,false]],
          //zones: [[-1,-6],[-2,-5]]
        },
        { //curva
          id:2,
          points:[[-1,0.55],[0, 1],[1,0.5],[-0.6,0.8],[0.6,0.8],[-1.5,0.1,false],[1.5,0.1,false]],
          //zones: [[3,4],[1,6]]
        },
        { //curva
          id:3,
          points:[[3.14 ,-1],[3.7 ,-0.85], [2.5,-0.8],[1.95,-0.4],[4.2,-0.5],[1.65,-0.1,false],[4.6,-0.1,false]],
          //zones: [[-1,-6],[-2,-5]]
        },
      ],
    

              

         
    },
  }}
  


const defQuiz = {
   
    
  artifact_2: {
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
                    placeholder: '\\ldots(\\frac{-3\\pi}{2},\\placeholder[value_1]{})\\cup(\\frac{-\\pi}{2},\\placeholder[value_2]{})\\cup(\\frac{\\pi}{2},\\placeholder[value_3]{})\\ldots',
                    label: 'Dominio',
                    
                    condition: {
                      value_1:[ '-\\frac{\\pi}{2}','\\frac{-\\pi}{2}'],
                      value_2: ['\\frac{\\pi}{2}'],
                      value_3: ['\\frac{3\\pi}{2}'],
                    },
                    questionType: 'expression'
                  },
                  


                },
                {
                  //tipo de pregunta
                  type: 'mathfield',
                  //label,Answer,Validation
                  data: {
                    label: 'Rango:',
                    condition:['left(-infty,-1rightrbrackcupleftlbrack1,inftyright)'],
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
                    //placeholder: `\\ldots\\left(\\placeholder[value_1]{});\\left(\\placeholder[value_2]{});\\left(\\placeholder[value_3]{})\\ldots`,
                    label: 'Puntos de corte con el eje x:',
                    
                    condition:['nexists'],
                    questionType: 'expression'
                  }

        
                },
             
                {
                  //tipo de pregunta
                  type: 'mathfield',
                  //label,Answer,Validation
                  data: {
                    label: 'Puntos de corte con el eje y:',
                    condition: ['left(0,1right)'],
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
                    condition:['nexists'],

  
                    questionType: 'expression'
                  }
                },
           
                {
                  //tipo de pregunta
                  type: 'mathfield',
                  //label,Answer,Validation
                  data: {
                  
                    label: 'Alcanzado en: ',
                    
                    condition:['nexists'],

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
                    condition:['nexists'],

                    questionType: 'expression'
                  }
  
  
                },

  
                {
                  //tipo de pregunta
                  type: 'mathfield',
                  //label,Answer,Validation
                  data: {
                    label: 'Alcanzado en: ',
                    
                    condition:['nexists'],

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
                  type: 'mathfieldSet',

                  //label,Answer,Validation
                  data: {
                    label: 'Puntos máximos No absolutos:',
                    placeholder: '\\ldots\\left(\\placeholder[value_1]{});\\left(\\placeholder[value_2]{})\\ldots',
                    condition: {
                      value_1:[ '-pi,-1'],
                      value_2:[ 'pi,1'],

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
                  type: 'mathfield',
                  //label,Answer,Validation
                  data: {
                    label: 'Puntos mínimos No absolutos:',
                    condition: ['left(0,1right)',"1"],

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
                    placeholder: '\\ldots\\left(\\placeholder[value_1]{});\\left(\\placeholder[value_2]{});\\left(\\placeholder[value_3]{})\\ldots',
                    label: 'Zonas de crecimiento:',
                    
                    condition: {
                      value_1: ['-\\frac{3\\pi}{2},-\\pi','\\frac{-3\\pi}{2},-\\pi'],
                      value_2: ['0,\\frac{\\pi}{2}'],
                      value_3: ['\\frac{\\pi}{2},3'],
                    },
                    questionType: 'expression'
                  }

                },
            
                {
                  //tipo de pregunta
                  type: 'mathfieldSet',
                  //label,Answer,Validation
                  data: {
                    placeholder: '\\ldots\\left(\\placeholder[value_1]{});\\left(\\placeholder[value_2]{});\\left(\\placeholder[value_3]{})\\ldots',
                    label: 'Zonas de decrecimiento:',
                    
                    condition: {
                      value_1: ['-\\pi,-\\frac{\\pi}{2}','-\\pi,\\frac{-\\pi}{2}'],
                      value_2:['-\\frac{\\pi}{2},0','\\frac{-\\pi}{2},0'],
                      value_3:['\\pi,\\frac{3\\pi}{2}']

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
                  type: 'mathfieldSet',
                  //label,Answer,Validation
                  data: {
                    placeholder: '\\ldots\\left(\\placeholder[value_1]{})\\ldots',
                    label: 'Partes positivas:',
                    
                    condition: {
                      value_1: ['-\\frac{\\pi}{2},\\frac{\\pi}{2}','\\frac{-\\pi}{2},\\frac{\\pi}{2}'],
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
                      value_1:[ '-\\frac{3\\pi}{2},-\\frac{\\pi}{2}','\\frac{-3\\pi}{2},\\frac{-\\pi}{2}','-\\frac{3\\pi}{2},\\frac{-\\pi}{2}','\\frac{-3\\pi}{2},-\\frac{\\pi}{2}'],
                      value_2:[ '\\frac{\\pi}{2},\\frac{3\\pi}{2}'],

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



colorInitMain(rDef, defBoards)
const quizGen = new QuizGenerator(defQuiz)
quizGen.generateObject()

//new GenerateArtifactsEngineAlphabet(defAlphabet, defBoards)


//mainOperation(defBoards, rDef);
  