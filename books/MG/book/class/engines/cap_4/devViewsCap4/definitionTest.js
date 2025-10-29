let defBoards = {
  board_1: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-1, 1, 2, 3],
        yv: ['-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
      },
      grid: false,
      boundingbox: [-8, 4, 8, -2],

    },

  },
}

const def =
{

  artifact_1: {
    buttonsActive: {
      curve: true
    },
    /* Alfabeto de curvas
     'cos': {
      
        keyCurve: "cos(x)",

      },
      'tan': {
      
        keyCurve: "tan(x)",
        options: {}, interval: []
      },
      'ln': {
      
        keyCurve: "ln(x)",
        
      },
      'sin': {
        point: { coord: [0, 0], visible: true },
        keyCurve: "sin(x)",
        
      }
      ,
      'aSin': {
      
        keyCurve: "asin(x)",
        
      },
      'aTan': {
      
        keyCurve: "atan(x)",
        
      },
      'aCos': {
      
        keyCurve: "acos(x)",
        
      },
      'abs': {
      
        keyCurve: "abs(x)",

      },

      'entera': {
      
        keyCurve: "trunc(x)",
        
      }
      ,
      'identidad': { //identidad
    
      keyCurve: "x",
      
    }
    ,
    'identidadNegativa': { //Identidad negativa
    
      keyCurve: "-x",
      
    }
    ,
    'inversaNumerica': { //inversa numerica
    
      keyCurve: "x^(-1)",
      
    },
    'alCuadrado': {
    
      keyCurve: "x^(2)",
      
    },
    'exp': {  //exponencial
    
      keyCurve: "exp(x)",
      
    }
    ,
    'sqrt': {
    
      keyCurve: "sqrt(x)",
      
    },
    'constante': {
    
      keyCurve: "1",
      
    },
   
  }*/

    conditions: {
      alphabetDiagram: {

        mathEcuation: 'abs(x)', //Curva a crear utiliza las expresiones de mathjs
        expression: '|{\\left(\\right)}|',
        xCoords: [
          [
            { xCoord: 1, axisText: '\\cos\\left(x\\right)', pointText: 'aee' },
            { xCoord: '\\pi', axisText: 'π/2', pointText: 'b' },
            { xCoord: '4', axisText: 'π' },

          ],

        ],
        
      }
    }
  },
  artifact_2: {
    buttonsActive: {
      curve: true
    },
    conditions: {
      alphabetDiagram: {
        mathEcuation: 'sqrt(x)', //Curva a crear utiliza las expresiones de mathjs
        expression: '\\sqrt{\\left(\\right)}',
        xCoords: [[2, '\\pi', { xCoord: '3.5', axisText: 'cos', pointText: 'x', pointStyle: 'color:\'gray\'' }, 4]],

      }
    },
  },
  artifact_3: {
    buttonsActive: {
      curve: true
    },
    conditions: {
      alphabetDiagram: {
        mathEcuation: 'ln(x)', //Curva a crear utiliza las expresiones de mathjs
        expression: '\\ln\\left(\\right)',
        xCoords: [[-2, '\\pi', { xCoord: '3.5', axisText: 'cos', pointText: 'x', pointStyle: 'color:\'gray\'' }, 4]],
      }
    },
  },
}


/* apInit(def, defBoards) */

new GenerateArtifactsEngineAlphabet(def, defBoards)