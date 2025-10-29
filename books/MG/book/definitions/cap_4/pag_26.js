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
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',

      },

      grid: { style: '#bfbaba' },

      boundingbox: [-5, 5, 5, -5],



    },
    alphabet: { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas
      'identidad': { // identidad 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x',
        options: {}, interval: []
      },
      'abs': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'abs(x)',
      },
      'identidadNegativa': { // Identidad negativa 
        point: { coord: [0, 1], visible: false },
        keyCurve: '-x',
        options: {}, interval: []
      },
      'alCuadrado': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x^(2)',
        options: {}, interval: []
      },
    },
    asymptotes: [
      // { x: -3, validate: true },
      { x: 0, },
      // { x: 0, validate: true },

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
      'identidadNegativa': { // Identidad negativa 
        point: { coord: [0, 0], visible: false },
        keyCurve: '-x',
        options: {}, interval: []
      },
      'identidad': { // identidad 
        point: { coord: [0, 0], visible: false },
        keyCurve: 'x',
        options: {}, interval: []
      },
      'alCuadrado': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'x^(2)',
        options: {}, interval: []
      },
      'abs': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'abs(x)',
      },
    },
    asymptotes: [
      // { x: -3, validate: true },
      { x: 0, },
      // { x: 0, validate: true },

    ],


  },
  board_3: {
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
      'identidad': { // identidad 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x',
        options: {}, interval: []
      },
      'alCuadrado': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x^(2)',
        options: {}, interval: []
      },
      'abs': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'abs(x)',

      },
      'identidadNegativa': { // Identidad negativa 
        point: { coord: [0, 1], visible: true },
        keyCurve: '-x',
        options: {}, interval: []
      },
    },
    asymptotes: [
      // { x: -3, validate: true },
      { x: 0, },
      // { x: 0, validate: true },

    ],


  },
  board_4: {
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
      'identidad': { // identidad 
        point: { coord: [0, 0], visible: false },
        keyCurve: 'x',
        options: {}, interval: []
      },
      'alCuadrado': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x^(2)',
        options: {}, interval: []
      },
      'inversaNumerica': { /* inversa numerica */
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x^(-1)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },

      'identidadNegativa': { // Identidad negativa 
        point: { coord: [0, 1], visible: false },
        keyCurve: '-x',
        options: {}, interval: []
      },
    },



  },
  board_5: {
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
      'abs': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'abs(x)',

      },
      'alCuadrado': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x^(2)',
        options: {}, interval: []
      },
      'exp': {  //exponencial 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'exp(x)',
        options: {}, interval: []
      },
      'identidadNegativa': { // Identidad negativa 
        point: { coord: [0, 1], visible: false },
        keyCurve: '-x',
        options: {}, interval: []
      },

    },
    asymptotes: [
      // { x: -3, validate: true },
      { x: 0, },
      // { x: 0, validate: true },

    ],


  },
  board_6: {
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
      'inversaNumerica': { //inversa numerica
        point: { coord: [0, 0], visible: true },
        keyCurve: 'x^(-1)',
        options: {}, interval: []
      },
      'abs': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'abs(x)',

      },
      'constante': {
        point: { coord: [0, 1], visible: true },
        keyCurve: '1',
        options: {}, interval: []
      },
      'identidadNegativa': { // Identidad negativa 
        point: { coord: [0, 1], visible: true },
        keyCurve: '-x',
        options: {}, interval: []
      },
    },

    lines: [
      {
        points: [
          [-8, -1],
          [8, -1],
        ],
      },

    ],

    // asymptotes: [
    //   // { x: -3, validate: true },
    //   { x: 1, },
    //   // { x: 0, validate: true },

    // ],


  },
  board_7: {
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


      'inversaNumerica': { //inversa numerica
        point: { coord: [0, 0], visible: false },
        keyCurve: 'x^(-1)',
        options: {}, interval: []
      },

      'abs': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'abs(x)',

      },
      'identidadNegativa': { // Identidad negativa 
        point: { coord: [0, 1], visible: false },
        keyCurve: '-x',
        options: {}, interval: []
      },
      'alCuadrado': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x^(2)',
        options: {}, interval: []
      },

    },
    asymptotes: [
      // { x: -3, validate: true },
      { x: -1, },
      // { x: 0, validate: true },

    ],


  },
  board_8: {
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



    // lines: [
    //   {
    //     points: [
    //       [-8, -1],
    //       [8, -1],
    //     ],
    //   },

    // ],
    alphabet: { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas
      'identidadNegativa': { // Identidad negativa 
        point: { coord: [0, 1], visible: true },
        keyCurve: '-x',
        options: {}, interval: []
      },
      'alCuadrado': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'x^(2)',
        options: {}, interval: []
      },
      'exp': {  //exponencial 
        point: { coord: [0, 1], visible: true },
        keyCurve: 'exp(x)',
        options: {}, interval: []
      },
      'identidad': { /* identidad */
        point: { coord: [0, 1], visible: true },
        keyCurve: 'x',
        options: {}, interval: []
      }

    },
    asymptotes: [
      // { x: -3, validate: true },
      { x: 0, },
      // { x: 0, validate: true },

    ],


  },
}


const def =
{

  artifact_1: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'y=x+\\left|x\\right|'
    },


    conditions: {
      operationType: 0,

      multiplyCurves: ['x', 'abs(x)'],
      asymptotes: [
        { x: -3, y: 0 },
        { x: -1, y: 0 },
        { x: 1, y: 2 },

      ]
    }
  },
  artifact_2: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2

    instructionText: {
      text: 'y=\\left|x\\right|-x'
    },

    conditions: {
      operationType: 0,
      noise: 0.3,

      multiplyCurves: ['abs(x)', '-x'],
      asymptotes: [

        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: -1, y: 2 }
      ]
    }
  },
  artifact_3: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'y=\\left|x\\right|+x^2'
    },
    conditions: {
      operationType: 0,
      noise: 0.3,

      multiplyCurves: ['abs(x)', 'x^(2)'],
      asymptotes: [
        { x: -1, y: 2 },
        { x: 1, y: 2 },

      ]
    }
  },
  artifact_4: {
    buttonAsyn: true,
    buttonZero: false,
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'y=\\left(\\right)+\\frac{1}{\\left(\\right)}'
    },


    conditions: {
      operationType: 0,
      noise: 0.25,
      multiplyCurves: ['x', 'x^(-1)'],
      asymptotes: [
        { x: -3, y: -3.4 },
        { x: -1, y: -2 },
        { x: 1, y: 2 },
        { x: 3, y: 3.4 },

      ]
    }
  },
  artifact_5: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'y=\\left| ㅤ  \\right|+\\exponentialE^{\\left(ㅤ\\right)}'
    },
    conditions: {
      operationType: 0,
      noise: 0.25,
      multiplyCurves: ['exp(x)', 'abs(x)'],
      asymptotes: [
        { x: -1, y: 1.3 },
        { x: 1, y: 3.6 },

      ]
    }
  },
  artifact_6: {
    buttonAsyn: false,
    buttonZero: 0,
    curveCount: 1, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'y=\\frac{1}{x}-1'
    },
    conditions: {
      noise:0.2,

      sumConstant: {

        mathCurves: [{
          curve: 'x^(-1)',
          pointY: -1,
          noise: 0.3
        },
        ],

      },

      // operationType: 1,

      // multiplyCurves: ["x^(-1)", "1"],
      // asymptotes: [

      //   { x: -1, y: -2 },

      // ]
    }
  },
  artifact_7: {

    buttonAsyn: true,

    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'y=\\frac{1}{x}+x^2'
    },


    conditions: {
      operationType: 0,
      noise: 0.25,
      multiplyCurves: ['x^(-1)', 'x^(2)'],
      asymptotes: [
        { x: -2, y: 3.4 },
        // {x:-0.7,y:-1},
        // { x: 0, y: 0 },
        // {x:0.7,y:3},
        { x: 1, y: 2 },
        { x: 2, y: 4.3 },

      ]
    }
  },
  artifact_8: {
    buttonAsyn: false,
    buttonZero: false,

    curveCount: 1, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'f\\left(x\\right)=e^{x}-1'
    },
    conditions: {
      sumConstant: {

        mathCurves: [{
          curve: 'exp(x)',
          pointY: 0,
          noise: 0.1
        },
        ],

      },


      // operationType: 1,

      // multiplyCurves: ["exp(x)", "1"],
      // asymptotes: [
      //   { x: 2, y: 0 },
      //   { x: 0, y: 0 },
      //   { x: -2, y: 0 },

      // ]
    }
  },
}

new GenerateSumConstant(def, defBoards)



