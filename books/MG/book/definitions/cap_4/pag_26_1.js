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
      'exp': {  //exponencial 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'exp(x)',
        options: {}, interval: []
      },

      'identidadNegativa': { /* Identidad negativa */
        point: { coord: [0, 1], visible: false },
        keyCurve: '-x',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },

      'sin': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'sin(x)',
        options: {}, interval: []
      },
      'inversaNumerica': { /* inversa numerica */
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x^(-1)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },

    },
    asymptotes: [
      // { x: -3, validate: true },
      { x: -0.5, },
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
      'exp': {  //exponencial 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'exp(x)',
        options: {}, interval: []
      },
      'identidad': { // identidad 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x',
        options: {}, interval: []
      },
      'entera': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'floor(x)',
        options: {}, interval: []
      },

      'sin': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'sin(x)',
        options: {}, interval: []
      }

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
      'exp': {  //exponencial 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'exp(x)',
        options: {}, interval: []
      },

      'identidad': { // identidad 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x',
        options: {}, interval: []
      },

      'cos': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'cos(x)',

      },
      'inversaNumerica': { /* inversa numerica */
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x^(-1)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },

    },
    asymptotes: [
      // { x: -3, validate: true },
      { x: -1.8, },
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
      'exp': {  //exponencial 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'exp(x)',
        options: {}, interval: []
      },


      'inversaNumerica': { /* inversa numerica */
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x^(-1)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      },
      'cos': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'cos(x)',

      },

      'tan': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'tan(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      }


    },
    asymptotes: [
      // { x: -3, validate: true },
      { x: -0.5, },
      // { x: 0, validate: true },

    ],


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
      'exp': {  //exponencial 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'exp(x)',
        options: {}, interval: []
      },


      'sin': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'sin(x)',
        options: {}, interval: []
      },
      'cos': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'cos(x)',

      },

      'tan': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'tan(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
      }


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
      'exp': {  //exponencial 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'exp(x)',
        options: {}, interval: []
      },


      'sin': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'sin(x)',
        options: {}, interval: []
      },
      'cos': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'cos(x)',

      },

      'identidad': { // identidad 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x',
        options: {}, interval: []
      },


    },
    asymptotes: [
      // { x: -3, validate: true },
      { x: 0, },
      // { x: 0, validate: true },

    ],


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



      'sin': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'sin(x)',
        options: {}, interval: []
      },

      'exp': {  //exponencial 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'exp(x)',
        options: {}, interval: []
      },
      'cos': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'cos(x)',

      },

      'identidad': { // identidad 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'x',
        options: {}, interval: []
      },


    },
    asymptotes: [
      // { x: -3, validate: true },
      { x: 1.6, },
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
    alphabet: { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas



      'sin': {
        point: { coord: [0, 0], visible: false },
        keyCurve: 'sin(x)',
        options: {}, interval: []
      },

      'exp': {  //exponencial 
        point: { coord: [0, 1], visible: false },
        keyCurve: 'exp(x)',
        options: {}, interval: []
      },
      'cos': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'cos(x)',

      },
      'tan': {
        point: { coord: [0, 1], visible: false },
        keyCurve: 'tan(x)',
        options: { strokeColor: '#7f7879', strokeWidth: 2 }
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
      text: 'f(x)=\\exponentialE^{x}+\\sin\\left(x\\right)'
    },


    conditions: {
      operationType: 0,
      multiplyCurves: ['exp(x)', 'sin(x)'],
      noise:0.2,
      asymptotes: [
        { x: -3.2, y: 0 },
        { x: -1.65, y: -0.76 },
        { x: 1, y: 3.5 },

      ]
    }
  },


  artifact_2: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'f(x)=x+\\sin\\left(x\\right)'
    },
    conditions: {
      operationType: 0,
      noise:0.2,
      multiplyCurves: ['x', 'sin(x)'],
      asymptotes: [
        { x: -4, y: -3.30 },
        { x: -2, y: -2.86 },

        { x: 2, y: 2.95 },

        { x: 4, y: 3.30 },


      ]
    }
  },


  artifact_3: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'f(x)=\\exponentialE^{x}+\\cos\\left(x\\right)'
    },
    conditions: {
      operationType: 0,
      noise:0.2,
      multiplyCurves: ['exp(x)', 'cos(x)'],
      asymptotes: [
        { x: -3, y: -1 },
        { x: 1, y: 3.31 },

      ]
    }
  },


  artifact_4: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'f(x)=\\exponentialE^{x}+\\tan\\left(x\\right)'
    },


    conditions: {
      operationType: 0,
      noise:0.2,

      multiplyCurves: ['exp(x)', 'tan(x)'],
      asymptotes: [
        { x: -4, y: -1 },
        { x: -1, y: -1 },
        { x: 1.7, y: 0 },

      ]
    }
  },

  artifact_5: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'f(x)=\\exponentialE^{x}\\cdot\\sin\\left(x\\right)'
    },


    conditions: {
      operationType: 2,

      multiplyCurves: ['exp(x)', 'sin(x)'],
      noise:0.2,
      asymptotes: [
        { x: -4, y: 0 },
        { x: -1.2, y: -0.37 },
        { x: 3.1, y: 0 },

      ]
    }
  },

  artifact_6: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'f(x)=x\\cdot\\sin\\left(x\\right)'
    },


    conditions: {
      operationType: 2,
      multiplyCurves: ['x', 'sin(x)'],
      noise: 0.15,

      asymptotes: [
        { x: 3.1, y: 0 },
        { x: -2, y: 1.76 },
        { x: -3.1, y: 0 },

      ]
    }
  },

  artifact_7: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'f\\left(x\\right)=\\exponentialE^{x}\\cdot\\cos\\left(x\\right)'
    },


    conditions: {
      operationType: 2,
      noise:0.2,

      multiplyCurves: ['exp(x)', 'cos(x)'],
      asymptotes: [
        { x: -1.5, y: 0 },
        { x: 0.6, y: 1.5 },
        { x: -3, y: 0 },
        // { x: 5, y: 0 },

      ]
    }
  },

  artifact_8: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'f\\left(x\\right)=\\exponentialE^{x}\\cdot\\tan\\left(x\\right)'
    },


    conditions: {
      operationType: 2,
      noise:0.2,

      multiplyCurves: ['exp(x)', 'tan(x)'],
      asymptotes: [
        { x: -4.7, y: 1 },
        { x: -1.8, y: 1 },
        { x: 3.2, y: 1 },

      ]
    }
  },
}


new GenerateSumConstant(def, defBoards)



