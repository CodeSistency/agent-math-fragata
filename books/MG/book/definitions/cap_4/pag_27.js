let alphabet = { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas
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
  'ln': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'ln(x)',
    options: {}, interval: []
  },
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
  'sqrt': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'sqrt(x)',
    options: {}, interval: []
  },
  'inversaNumerica': { //inversa numerica
    point: { coord: [0, 1], visible: false },
    keyCurve: 'x^(-1)',
    options: {}, interval: []
  },
}
let alphabet_2 = {
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
  'tan': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'tan(x)',
    options: { strokeColor: '#7f7879', strokeWidth: 2 }
  },
  'ln': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'ln(x)',
    options: {}, interval: []
  },
  'sqrt': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'sqrt(x)',
    options: {}, interval: []
  },
  'sin': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'sin(x)',

  },
  'abs': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'abs(x)',

  },
  'cos': {
    point: { coord: [0, 1], visible: false },
    keyCurve: 'cos(x)',

  },
  
}

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
    alphabet,
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
    alphabet,
    asymptotes: [
      // { x: -3, validate: true },
      { x: 1, },
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
    alphabet: alphabet_2,
    asymptotes: [
      // { x: -3, validate: true },
      { x: 1.57, },
      { x: 0, },

      { x: -1.57, },

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
    alphabet: alphabet_2,
    asymptotes: [
      // { x: -3, validate: true },
      { x: -3.14, },
      { x: 0, },
      { x: 3.14, },

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
    alphabet,
    asymptotes: [
      // { x: -3, validate: true },
      { x: 0.25, },


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
    alphabet,


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
    alphabet: alphabet_2,
    asymptotes: [
      // { x: -3, validate: true },
      { x: 3.17, },
      { x: 0, },
      { x: -3.17, }
    ],


  },


  board_9: {
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
    alphabet,
    asymptotes: [
      // { x: -3, validate: true },
      // { x: 0, validate: true },

    ],


  },
}


const def =
{


  artifact_1: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'f(x)=\\exponentialE^{x}\\cdot\\tan\\left(x\\right)'
    },


    conditions: {

      multiplyCurves: ['exp(x)', 'tan(x)'],
      asymptotes: [
        { x: -4.5, y: -0.1 },

        { x: -1.2, y: -0.7 },
        { x: 1, y: 4 },
        { x: -2, y: 0.3 },

      ]
    }
  },


  artifact_2: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'Ojo! \\hspace{1cm} y=Ln(x)+e^x'
    },


    conditions: {
      operationType: 0,

      multiplyCurves: ['exp(x)', 'ln(x)'],
      asymptotes: [
        { x: 1, y: 3 },
        { x: 1.35, y: 4 },
      ]
    }
  },


  artifact_3: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'y=Ln(x)\\cdot e^x'
    },
    conditions: {

      multiplyCurves: ['exp(x)', 'ln(x)'],
      asymptotes: [
        { x: 0.2, y: -2 },
        { x: 1.5, y: 2 },
        { x: 1.9, y: 4 },

      ]
    }
  },


  artifact_4: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'y=x\\sqrt{x}'
    },


    conditions: {

      multiplyCurves: ['x', 'sqrt(x)'],
      asymptotes: [
        { x: 0.5, y: 0.3 },
        { x: 1, y: 1},
        { x: 2.5, y: 4 },

      ]
    }
  },

  artifact_5: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'y=|x|cos(x)'
    },


    conditions: {
      multiplyCurves: ['abs(x)', 'cos(x)'],
      asymptotes: [
        { x: -3.4, y: -3.2 },
        { x: -0.9, y: 0.5 },
        { x: 0.9, y: 0.5 },
        { x: 3.4, y: -3.2 },
      ]
    }
  },

  artifact_6: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: '-()\\cdot ( )^2'
    },


    conditions: {

      multiplyCurves: ['-x', 'x^(2)'],
      asymptotes: [
        { x: -1.5, y: 3 },
        { x: -1, y: 1 },
        { x: -0.5, y: 0.2 },
        { x: 1.5, y: -3 },
        { x: 1, y: -1 },
        { x: 0.5, y: -0.2 },


      ]
    }
  },

  artifact_7: {
    visibleAsyntote: true,
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    buttonZero: false,
    instructionText: {
      text: 'f\\left(x\\right)=Ln(x)-x'
    },


    conditions: {
      operationType: 0,

      multiplyCurves: ['-x', 'ln(x)'],
      asymptotes: [
        { x: 0.5, y: -1.15 },
        { x: 1, y: -1 },
        { x: 2, y: -1.2 },

        { x: 3, y: -1.9 },
        { x: 4, y: -2.6 },

      ]
    }
  },

  artifact_8: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    instructionText: {
      text: 'sin(x)-x'
    },


    conditions: {
      operationType: 0,

      multiplyCurves: ['sin(x)', '-x'],
      asymptotes: [
        { x: 1.5, y: -0.5 },
        { x: -1.5, y: 0.5 },
        //{ x: 1, y: -0.18},
        // { x: -1, y: 0.16 },
        // { x: -1.92, y: -1},
        // { x: 1.92, y: 1 },

      ]
    }
  },

  artifact_9: {
    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    visibleAsyntote:true,
    instructionText: {
      text: 'Ojo! \\hspace{1cm} \\frac{1}{x}+\\exponentialE^x'
    },


    conditions: {
      operationType: 0,

      multiplyCurves: ['x^(-1)', 'exp(x)'],
      asymptotes: [
        { x: -0.69, y: -1 }
        // { x: -0.56, y: -1 },

      ]
    }
  },


}


new GenerateSumConstant(def, defBoards)



