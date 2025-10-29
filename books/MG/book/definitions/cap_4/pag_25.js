

/* Alfabeto de curvas
'cos': {
      point: { coord: [0, 1], visible: false },
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
      keyCurve: "trunc(x)",
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
    artifact: 'artifact_1',
    style: {
      grid: true,
      grid: { style: '#bfbaba' },
      maxHeight: 400,
      maxWidth: 400,
      boundingbox: [-6, 6, 6, -6],
      axis: [false, true, true],
      valueAxis: {
        yp: [-3, -2, -1, 1, 2, 3, 4, -4],
        yv: ['-3', '-2', '-1', '1', '2', '3', '4', '-4'],
        xp: [-3, -2, -1, 1, 2, 4, -4],
        xv: ['-3', '-2', '-1', '1', '2', '4', '-4'],
        yd: [
          [0, 0],
          [0, 1],
        ] /*dirección del eje y*/,
        xd: [
          [0, 0],
          [1, 0],
        ],
        colory: '#000000',
        colorx: '#000000',
      },
    },
    inputs: [
      { x: 3.15, y: -0.2, value: '\\pi', style: { fontSize: 15, mathClass: 'colorInputAlphabet' }, valid: false },


    ],

    alphabet: { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas
      'sin': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'sin(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'identidadNegativa': { /* Identidad negativa */
        point: { coord: [0, 1], visible: false },
        keyCurve: '-x',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      }
      ,
      'inversaNumerica': { /* inversa numerica */
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x^(-1)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'constante': {
        point: { coord: [0, 1], visible: false },
        keyCurve: '2',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },

    },
    asymptotes: [

      { x: -3.14, },
      { x: 3.14 },
      { x: 0 },

    ],
  },
  board_2: {
    artifact: 'artifact_2',
    style: {
      grid: true,
      grid: { style: '#bfbaba' },
      maxHeight: 400,
      maxWidth: 400,
      boundingbox: [-6, 6, 6, -6],
      axis: [false, true, true],
      valueAxis: {
        yp: [-3, -2, -1, 1, 2, 3, 4, -4],
        yv: ['-3', '-2', '-1', '1', '2', '3', '4', '-4'],
        xp: [-3, -2, -1, 1, 3, 4, -4],
        xv: ['-3', '-2', '-1', '1', '3', '4', '-4'],
        yd: [
          [0, 0],
          [0, 1],
        ] /*dirección del eje y*/,
        xd: [
          [0, 0],
          [1, 0],
        ],
        colory: '#000000',
        colorx: '#000000',
      },
    },
    inputs: [
      { x: 1.57, y: -0.6, value: '\\frac{\\pi}{2}', style: { fontSize: 15, mathClass: 'colorInputAlphabet' }, valid: false },


    ],
    alphabet: { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas

      'identidadNegativa': { /* Identidad negativa */
        point: { coord: [0, 1], visible: false },
        keyCurve: '-x',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      }
      ,

      'sqrt': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'sqrt(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },

      'tan': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'tan(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'cos': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'cos(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
    },
    asymptotes: [

      { x: -4.7 },
      { x: -1.5 },
      { x: 4.7 },
      { x: 1.5 },

    ],
  },
  board_3: {
    artifact: 'artifact_3',
    style: {
      grid: true,
      grid: { style: '#bfbaba' },
      maxHeight: 400,
      maxWidth: 400,
      boundingbox: [-5, 5, 5, -5],
      axis: [false, true, true],
      valueAxis: {
        yp: [-3, -2, -1, 1, 2, 3, 4, -4],
        yv: ['-3', '-2', '-1', '1', '2', '3', '4', '-4'],
        xp: [-3, -2, -1, 1, 3, 4, -4],
        xv: ['-3', '-2', '-1', '1', '3', '4', '-4'],
        yd: [
          [0, 0],
          [0, 1],
        ] /*dirección del eje y*/,
        xd: [
          [0, 0],
          [1, 0],
        ],
        colory: '#000000',
        colorx: '#000000',
      },
    },
    inputs: [
      { x: 1.57, y: -0.6, value: '\\frac{\\pi}{2}', style: { fontSize: 15, mathClass: 'colorInputAlphabet' }, valid: false },


    ],

    alphabet: { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas

      'aTan': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'atan(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },


      'cos': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'cos(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }

      },
      'sqrt': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'sqrt(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },

      'tan': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'tan(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
    },
    asymptotes: [

      { x: 0 },
      { x: -3.2 },
      { x: 3.2 },


    ],
  },
  board_4: {
    artifact: 'artifact_4',
    style: {
      grid: true,
      grid: { style: '#bfbaba' },
      maxHeight: 400,
      maxWidth: 400,
      boundingbox: [-5, 5, 5, -5],
      axis: [false, true, true],
      valueAxis: {
        yp: [-3, -2, -1, 1, 2, 3, 4, -4],
        yv: ['-3', '-2', '-1', '1', '2', '3', '4', '-4'],
        xp: [-3, -2, -1, 1, 2, 4, -4, 3],
        xv: ['-3', '-2', '-1', '1', '2', '4', '-4', '3'],
        yd: [
          [0, 0],
          [0, 1],
        ] /*dirección del eje y*/,
        xd: [
          [0, 0],
          [1, 0],
        ],
        colory: '#000000',
        colorx: '#000000',
      },
    },

    alphabet: { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas

      'exp': {  //exponencial 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'exp(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },

      'identidad': { // identidad 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'inversaNumerica': { //inversa numerica
        point: { coord: [0, 1], visible: true },
        keyCurve: 'x^(-1)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'sin': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'sin(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }


      },

    },

  },
  board_5: {
    artifact: 'artifact_5',
    style: {
      grid: true,
      grid: { style: '#bfbaba' },
      maxHeight: 400,
      maxWidth: 400,
      boundingbox: [-5, 5, 5, -5],
      axis: [false, true, true],
      valueAxis: {
        yp: [-3, -2, -1, 1, 2, 3, 4, -4],
        yv: ['-3', '-2', '-1', '1', '2', '3', '4', '-4'],
        xp: [-3, -2, -1, 1, 2, 4, -4, 3],
        xv: ['-3', '-2', '-1', '1', '2', '4', '-4', '3'],
        yd: [
          [0, 0],
          [0, 1],
        ] /*dirección del eje y*/,
        xd: [
          [0, 0],
          [1, 0],
        ],
        colory: '#000000',
        colorx: '#000000',
      },
    },

    alphabet: { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas
      'sin': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'sin(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      }
      ,
      'aSin': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'asin(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'tan': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'tan(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'aTan': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'atan(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },



    },
    asymptotes: [

      { x: -3.2 },
      { x: 0 },
      { x: 3.2 },



    ],
  },

  board_6: {
    artifact: 'artifact_6',
    style: {
      grid: true,
      grid: { style: '#bfbaba' },
      maxHeight: 400,
      maxWidth: 400,
      boundingbox: [-5, 5, 5, -5],
      axis: [false, true, true],
      valueAxis: {
        yp: [-3, -2, -1, 1, 2, 3, 4, -4],
        yv: ['-3', '-2', '-1', '1', '2', '3', '4', '-4'],
        xp: [-3, -2, -1, 1, 2, 4, -4, 3],
        xv: ['-3', '-2', '-1', '1', '2', '4', '-4', '3'],
        yd: [
          [0, 0],
          [0, 1],
        ] /*dirección del eje y*/,
        xd: [
          [0, 0],
          [1, 0],
        ],
        colory: '#000000',
        colorx: '#000000',
      },
    },

    alphabet: { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas
      'cos': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'cos(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      }
      ,
      'aCos': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'acos(x)',

        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'tan': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'tan(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'aTan': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'atan(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },



    },
    asymptotes: [
      { x: -1.5 },
      { x: 1.5 },
      { x: -4.8 },
      { x: 4.8 },





    ],
  },

}








/*  */
const def =
{
  artifact_1: {
    curveCount: 1,

    instructionText: {
      text: '2\\cdot\\sin\\left(\\space\\right)',
      styleClass: ['producto']

    },


    conditions: {
      defaultCurve: '2', //curva que se va a poner por defecto,
      multiplyCurves: ['sin(x)'],

      asymptotes: [
        { x: -4.71, y: 2 },
        { x: -1.57, y: -2 },

        { x: 4.71, y: -2 },
        { x: 1.57, y: 2 },

      ]




    }
  },
  artifact_2: {
    curveCount: 1,
    instructionText: {
      text: '3\\cdot\\cos\\left(\\space\\right)',
      styleClass: ['producto']

    },


    conditions: {
      defaultCurve: '3',
      multiplyCurves: ['cos(x)'],

      asymptotes: [
        { x: -3, y: -3 },
        { x: 0, y: 3 },
        { x: 3, y: -3 },

      ]




    }
  },
  artifact_3: {
    curveCount: 1,
    instructionText: {
      text: '2\\cdot\\tan\\left(\\space\\right)',
      styleClass: ['producto']

    },


    conditions: {
      defaultCurve: '2',
      multiplyCurves: ['tan(x)'],

      asymptotes: [
        { x: -3.9, y: -2 },
        { x: -2.1, y: 4 },
        { x: -0.8, y: -2 },
        { x: 1.1, y: 4 },
        { x: 2.1, y: -4 },
        { x: 4.2, y: 4 },



      ]




    }
  },
  artifact_4: {
    curveCount: 1,
    buttonZero: false,
    visibleAsyntote: true,
    instructionText: {
      text: '2\\cdot\\exponentialE^{\\left(\\space\\left)\\right\\right}',
      styleClass: ['producto']

    },


    conditions: {
      defaultCurve: '2',
      multiplyCurves: ['exp(x)'],

      asymptotes: [
        { x: -1, y: 0.7 },
        { x: 0, y: 2 },
        { x: 0.7, y: 4 },


      ]




    }
  },
  artifact_5: {
    curveCount: 1,
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2


    instructionText: {
      text: '-\\sin\\left(\\space\\right)',
      styleClass: ['producto']

    },

    conditions: {
      defaultCurve: '-1', //curva que se va a poner por defecto,
      multiplyCurves: ['sin(x)'],
      asymptotes: [
        { x: -4.5, y: -1 },
        { x: -1.5, y: 1 },
        { x: 1.5, y: -1 },
        { x: 4.5, y: 1 },

      ]
    }
  },
  artifact_6: {
    curveCount: 1,
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2


    instructionText: {
      text: '-\\cos\\left(\\space\\right)',
      styleClass: ['producto']

    },

    conditions: {
      defaultCurve: '-1', //curva que se va a poner por defecto,
      multiplyCurves: ['cos(x)'],
      asymptotes: [
        { x: -3, y: 1 },
        { x: 0, y: -1 },
        { x: 3, y: 1 },


      ]
    }
  },


}


//new GenerateSumConstant(def, defBoards);

new GenerateSumConstant(def, defBoards)










