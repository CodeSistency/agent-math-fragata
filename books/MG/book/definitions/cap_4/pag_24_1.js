let alphabet = { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas
  'sqrt': {
    point: { coord: [0, 0], visible: true },
    keyCurve: 'sqrt(x)',
    options: {}, interval: []
  }
  ,
  'identidad': { /* identidad */
    point: { coord: [0, 0], visible: true },
    keyCurve: 'x',
    options: { strokeColor: '#7f7879', strokeWidth: 2 }
  }
  ,
  'identidadNegativa': { /* Identidad negativa */
    point: { coord: [0, 0], visible: true },
    keyCurve: '-x',
    options: { strokeColor: '#7f7879', strokeWidth: 2 }
  }
  ,
  'inversaNumerica': { /* inversa numerica */
    point: { coord: [0, 0], visible: true },
    keyCurve: 'x^(-1)',
    options: { strokeColor: '#7f7879', strokeWidth: 2 }
  },
  'alCuadrado': {
    point: { coord: [0, 0], visible: true },
    keyCurve: 'x^(2)',
    options: { strokeColor: '#7f7879', strokeWidth: 2 }
  },
  'exp': {
    point: { coord: [0, 1], visible: true },
    keyCurve: 'exp(x)',
    options: {}, interval: []
  }
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
      text: 'y=x-1',
      styleClass: []
    },

    conditions: {
      sumConstant: {

        mathCurves: [{
          curve: 'x',
          pointY: -1,
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
      text: 'y=1-x',
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
  artifact_3: {
    buttonAsyn: false,
    buttonZero: false,

    curveCount: 1, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */

    instructionText: {
      text: '1.5+x',
      styleClass: []
    },

    conditions: {
      sumConstant: {

        mathCurves: [{
          curve: 'x',
          pointY: 1.5,
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
      text: 'Ojo! \\hspace{0.3cm}-1+x+y=0',
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
  artifact_5: {
    buttonAsyn: false,
    buttonZero: false,
    curveCount: 1, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */

    instructionText: {
      text: 'e^{(\\hspace{0.2cm})}+1',
      styleClass: []
    },

    conditions: {
      sumConstant: {

        mathCurves: [{
          curve: 'exp(x)',
          pointY: 2,
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
      text: '(\\hspace{0.2cm})^2 +1',
      styleClass: []
    },

    conditions: {
      sumConstant: {

        mathCurves: [{
          curve: 'x^(2)',
          pointY: 1,
          noise: 0.1
        },
        ],

      },




    }
  },
  artifact_7: {
    buttonAsyn: false,
    buttonZero: false,

    curveCount: 1, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */

    instructionText: {
      text: '(\\hspace{0.2cm})^2 -1',
      styleClass: []
    },

    conditions: {
      sumConstant: {

        mathCurves: [{
          curve: 'x^(2)',
          pointY: -1,
          noise: 0.1
        },
        ],

      },




    }
  },
  artifact_8: {
    buttonAsyn: false,
    buttonZero: false,

    curveCount: 1, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */

    instructionText: {
      text: '\\sqrt{(\\hspace{0.2cm})}-2',
      styleClass: []
    },

    conditions: {
      sumConstant: {

        mathCurves: [{
          curve: 'sqrt(x)',
          pointY: -2,
          noise: 0.1
        },
        ],

      },




    }
  },

}


new GenerateSumConstant(def, defBoards);

// console.log(new GenerateSumConstant(def, defBoards))






