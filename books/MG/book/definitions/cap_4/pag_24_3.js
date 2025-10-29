let alphabet = { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas
  'cos': {
    point: { coord: [0, 1], visible: true },
    keyCurve: 'cos(x)',

  },
  'tan': {
    point: { coord: [0, 0], visible: true },
    keyCurve: 'tan(x)',
    options: { strokeColor: '#7f7879', strokeWidth: 2 }
  },
  'sin': {
    point: { coord: [0, 0], visible: true },
    keyCurve: 'sin(x)',
    options: {}, interval: []
  },
  'ln': {
    point: { coord: [0, 0], visible: true },
    keyCurve: 'ln(x)',
    options: {}, interval: []
  },

  'abs': {
    point: { coord: [0, 0], visible: true },
    keyCurve: 'abs(x)',

  },

  'entera': {
    point: { coord: [0, 0], visible: true },
    keyCurve: 'floor(x)',
    options: {}, interval: []
  },
  'identidadNegativa': { // Identidad negativa 
    point: { coord: [0, 0], visible: true },
    keyCurve: '-x',
    options: {}, interval: []
  },
  'inversaNumerica': { //inversa numerica
    point: { coord: [0, 0], visible: true },
    keyCurve: '1/x',
    options: {}, interval: []
  },

  'exp': {  //exponencial 
    point: { coord: [0, 1], visible: true },
    keyCurve: 'exp(x)',
    options: {}, interval: []
  }
  ,
  'sqrt': {
    point: { coord: [0, 0], visible: true },
    keyCurve: 'sqrt(x)',
    options: {}, interval: []
  },
}


let defBoards = {
  board_1: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],

        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
      },
      grid: true,
      grid: { style: '#bfbaba' },


      boundingbox: [-4, 4, 4, -4],

    },
    texts: [
      { x: -0.3, y: 2.8, text: '3', style: { fontSize: 12 } },
      { x: -0.3, y: 1.8, text: '2', style: { fontSize: 12 } },
      { x: -0.3, y: 0.8, text: '1', style: { fontSize: 12 } },
      { x: -0.4, y: -1.2, text: '-1', style: { fontSize: 12 } },
      { x: -0.4, y: -2.2, text: '-2', style: { fontSize: 12 } },
      { x: -0.4, y: -3.2, text: '-3', style: { fontSize: 12 } }
    ],


    alphabet,
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

        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',

      },

      grid: { style: '#bfbaba' },

      boundingbox: [-4, 4, 4, -4],



    },
    texts: [
      { x: -0.3, y: 2.8, text: '3', style: { fontSize: 12 } },
      { x: -0.3, y: 1.8, text: '2', style: { fontSize: 12 } },
      { x: -0.3, y: 0.8, text: '1', style: { fontSize: 12 } },
      { x: -0.4, y: -1.2, text: '-1', style: { fontSize: 12 } },
      { x: -0.4, y: -2.2, text: '-2', style: { fontSize: 12 } },
      { x: -0.4, y: -3.2, text: '-3', style: { fontSize: 12 } }
    ],

    alphabet,
  },
  board_3: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],

        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',

      },

      grid: { style: '#bfbaba' },

      boundingbox: [-4, 4, 4, -4],



    },
    texts: [
      { x: -0.3, y: 2.8, text: '3', style: { fontSize: 12 } },
      { x: -0.3, y: 1.8, text: '2', style: { fontSize: 12 } },
      { x: -0.3, y: 0.8, text: '1', style: { fontSize: 12 } },
      { x: -0.4, y: -1.2, text: '-1', style: { fontSize: 12 } },
      { x: -0.4, y: -2.2, text: '-2', style: { fontSize: 12 } },
      { x: -0.4, y: -3.2, text: '-3', style: { fontSize: 12 } }
    ],

    alphabet,




  },
  board_4: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],

        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',

      },

      grid: { style: '#bfbaba' },

      boundingbox: [-4, 4, 4, -4],



    },
    texts: [
      { x: -0.3, y: 2.8, text: '3', style: { fontSize: 12 } },
      { x: -0.3, y: 1.8, text: '2', style: { fontSize: 12 } },
      { x: -0.3, y: 0.8, text: '1', style: { fontSize: 12 } },
      { x: -0.4, y: -1.2, text: '-1', style: { fontSize: 12 } },
      { x: -0.4, y: -2.2, text: '-2', style: { fontSize: 12 } },
      { x: -0.4, y: -3.2, text: '-3', style: { fontSize: 12 } }
    ],

    alphabet,




  },
  board_5: {
    style: {
      axis: [false, true, true],
      valueAxis: {
        yd: [[0, 0],
          [0, 1],],

        xd: [[0, 0],
          [1, 0],],
        colory: '#4f4f4f',
        colorx: '#4f4f4f',
        //JXG.Options.axis.ticks.strokeColor = 'blue'
        gridColor: 'red',

      },

      grid: { style: '#bfbaba' },

      boundingbox: [-4, 4, 4, -4],



    },
    texts: [
      { x: -0.3, y: 2.8, text: '3', style: { fontSize: 12 } },
      { x: -0.3, y: 1.8, text: '2', style: { fontSize: 12 } },
      { x: -0.3, y: 0.8, text: '1', style: { fontSize: 12 } },
      { x: -0.4, y: -1.2, text: '-1', style: { fontSize: 12 } },
      { x: -0.4, y: -2.2, text: '-2', style: { fontSize: 12 } },
      { x: -0.4, y: -3.2, text: '-3', style: { fontSize: 12 } }
    ],
    alphabet,




  },
}

const def =
{
  artifact_1: {
    buttonAsyn: false,
    buttonZero: false,

    curveCount: 1, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */

    instructionText: {
      text: 'y=2+|x|',
      styleClass: []
    },

    conditions: {
      sumConstant: {

        mathCurves: [{
          curve: 'abs(x)',
          pointY: 2,
          noise: 0.1
        }
        ],

      },




    }
  },
  artifact_2: {
    buttonAsyn: false,
    buttonZero: false,

    curveCount: 1, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */

    instructionText: {
      text: 'Ojo! \\hspace{0.3cm} y-|x|-2=0',
      styleClass: []
    },

    conditions: {
      sumConstant: {

        mathCurves: [{
          curve: 'abs(x)',
          pointY: 2,
          noise: 0.1
        }
        ],
      },
    }
  },
  artifact_3: {
    buttonAsyn: false,
    buttonZero: false,

    curveCount: 1, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */

    instructionText: {
      text: 'y=1+\\frac{1}{x}',
      styleClass: []
    },

    conditions: {
      sumConstant: {

        mathCurves: [{
          curve: '1/x',
          pointY: 1,
          noise: 0.1
        },
        ],

      },




    }
  },
  artifact_4: {
    buttonAsyn: false,
    buttonZero: false,

    curveCount: 1, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */

    instructionText: {
      text: 'y=1+[x]',
      styleClass: []
    },

    conditions: {
      sumConstant: {

        mathCurves: [{
          curve: 'floor(x)',
          pointY: 1,
          noise: 0.1
        },
        ],

      },




    }
  },
  artifact_5: {
    buttonAsyn: false,
    buttonZero: false,

    curveCount: 1, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */

    instructionText: {
      text: 'y=e^{(\\hspace{0.2cm})}-1',
      styleClass: []
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




    }
  },
  artifact_6: {
    buttonAsyn: false,
    buttonZero: false,

    curveCount: 1, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */

    instructionText: {
      text: 'Ojo! \\hspace{0.3cm} 1-(\\hspace{0.2cm})',
      styleClass: []
    },

    conditions: {
      sumConstant: {

        mathCurves: [{
          curve: '-x',
          pointY: 1,
          noise: 0.1
        },
        ],

      },




    }
  },


}


new GenerateSumConstant(def, defBoards);

// console.log(new GenerateSumConstant(def, defBoards))






