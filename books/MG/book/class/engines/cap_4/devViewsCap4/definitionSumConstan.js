/* Alfabeto de curvas
'cos': {
      point: { coord: [0, 1], visible: true },
      keyCurve: "cos(x)",

    },
    'tan': {
      point: { coord: [0, 1], visible: true },
      keyCurve: "tan(x)",
       options: { strokeColor: "#7f7879" , strokeWidth:2}
    },
    'ln': {
      point: { coord: [0, 1], visible: true },
      keyCurve: "ln(x)",
      options: {}, interval: []
    },
    'sin': {
      point: { coord: [0, 0], visible: true },
      keyCurve: "sin(x)",
      options: {}, interval: []
    }
    ,
    'aSin': {
      point: { coord: [0, 1], visible: true },
      keyCurve: "asin(x)",
      options: {}, interval: []
    },
    'aTan': {
      point: { coord: [0, 1], visible: true },
      keyCurve: "atan(x)",
      options: {}, interval: []
    },
    'aCos': {
      point: { coord: [0, 1], visible: true },
      keyCurve: "acos(x)",
      options: {}, interval: []
    },
    'abs': {
      point: { coord: [0, 1], visible: true },
      keyCurve: "abs(x)",

    },

    'entera': {
      point: { coord: [0, 1], visible: true },
      keyCurve: "floor(x)",
      options: {}, interval: []
    }
    ,
    'identidad': { // identidad 
    point: { coord: [0, 1], visible: true },
    keyCurve: "x",
    options: {}, interval: []
  }
  ,
  'identidadNegativa': { // Identidad negativa 
    point: { coord: [0, 1], visible: true },
    keyCurve: "-x",
    options: {}, interval: []
  }
  ,
  'inversaNumerica': { //inversa numerica
    point: { coord: [0, 1], visible: true },
    keyCurve: "x^(-1)",
    options: {}, interval: []
  },
  'alCuadrado': {
    point: { coord: [0, 1], visible: true },
    keyCurve: "x^(2)",
    options: {}, interval: []
  },
  'exp': {  //exponencial 
    point: { coord: [0, 1], visible: true },
    keyCurve: "exp(x)",
    options: {}, interval: []
  }
  ,
  'sqrt': {
    point: { coord: [0, 1], visible: true },
    keyCurve: "sqrt(x)",
    options: {}, interval: []
  },
  'constante': {
    point: { coord: [0, 1], visible: true },
    keyCurve: "1",
    options: {}, interval: []
  }, */



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
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
      },
      grid: true,
      grid: { style: '#bfbaba' },

      boundingbox: [-4, 4, 4, -4],

    },
    expressionCurve:'sin(x)',

    alphabet: { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas
      'entera': {
        point: { coord: [0, 1], visible: true }, //se puede cambiar coord donde queremos que se crre la curva inicial
        keyCurve: 'floor(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      }
      ,
      'identidad': { /* identidad */
        point: { coord: [0, 0], visible: true },
        keyCurve: 'x',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      }
      ,
      'identidadNegativa': { /* Identidad negativa */
        point: { coord: [0, 1], visible: true },
        keyCurve: '-x',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      }
      ,
      'inversaNumerica': { /* inversa numerica */
        point: { coord: [0, 1], visible: true },
        keyCurve: 'x^(-1)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'alCuadrado': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'x^(2)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'sin': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'sin(x)',
        options: {}, interval: []
      }
    },
    asymptotes: [
      // { x: -3, validate: true },
      { x: -1.5, },
      // { x: 0, validate: true },
      { x: 1.5 },
      // { x: 3, validate: true },
    ],

  },
  board_2: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],
        yp: [-1, 1, 2, 3],
        yv: ['-1', '1', '2', '3'],
        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',

      },

      grid: { style: '#bfbaba' },

      boundingbox: [-5, 5, 5, -5],



    },
    alphabet: { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas
   
      'sin': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'sin(x)',
        options: {}, interval: []
      }
      ,
      'identidad': { /* identidad */
        point: { coord: [0, 0], visible: false },
        keyCurve: 'x',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'constante': {
        point: { coord: [0, 1], visible: true },
        keyCurve: '1',
        options: {}, interval: []
      },
      
      'identidadNegativa': { /* Identidad negativa */
        point: { coord: [0, 1], visible: false },
        keyCurve: '-x',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      }
      ,
    
    },
   


  },
}

const def =
{
  artifact_1: {

    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */

    instructionText: {
      text: 'y=1+\\frac{1}{x}',
      styleClass: ['ejemplo']
    },

    conditions: {
      sumConstant: {

        mathCurves: [{
          curve: 'x',
          pointY: 2,
          noise: 1
        },
        {
          curve: '-x',
          pointY: 2,
          noise: 1
        }],

      },




    }
  },

  artifact_2: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2

    instructionText: {
      text: 'f(x)=\\exponentialE^{x}\\cdot\\sin\\left(x\\right)'
    },


    conditions: {

      multiplyCurves: ['x^(-1)', 'x^(2)',],
      asymptotes: [
        { x: -1, y: -1 },
        { x: -2, y: -2 },
        { x: -3, y: -3 },
    
      ]
    }
  },
  artifact_3: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    visibleAsyntote:true,

    instructionText: {
      text: '-\\sin\\left(x\\right)'
    },

    conditions: { 
      defaultCurve : '-1', //curva que se va a poner por defecto,
      multiplyCurves: ['sin(x)'],
      asymptotes: [
        { x: -1, y: -1 },
      ]
    }
  },
}


//new GenerateSumConstant(def, defBoards);

console.log(new GenerateSumConstant(def, defBoards))






