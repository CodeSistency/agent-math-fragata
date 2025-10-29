/* Alfabeto de curvas
'cos': {
      point: { coord: [0, 1], visible: true },
      keyCurve: "cos(x)",

    },
    'tan': {
      point: { coord: [0, 1], visible: true },
      keyCurve: "tan(x)",
      options: {}, interval: []
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
      grid: true,
      boundingbox: [-5, 5, 5, -5],

    },


    alphabet: { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas
      'entera': {
        point: { coord: [0, 1], visible: true }, //se puede cambiar coord donde queremos que se crre la curva inicial
        keyCurve: 'trunc(x)',
        options: {}, interval: []
      }
      ,
      'identidad': { /* identidad */
        point: { coord: [0, 0], visible: true },
        keyCurve: 'x',
        options: {}, interval: []
      }
      ,
      'identidadNegativa': { /* Identidad negativa */
        point: { coord: [0, 1], visible: true },
        keyCurve: '-x',
        options: {}, interval: []
      }
      ,
      'inversaNumerica': { /* inversa numerica */
        point: { coord: [0, 1], visible: true },
        keyCurve: 'x^(-1)',
        options: {}, interval: []
      },
      'alCuadrado': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'x^(2)',
        options: {}, interval: []
      },
    },
    asymptotes: [
      { x: -3, validate: true },
      { x: -1.5, },
      { x: 0, validate: true },
      { x: 1.5 },
      { x: 3, validate: true },
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
      },
      grid: true,
      boundingbox: [-5, 5, 5, -5],

    },
    asymptotes: [
      { x: -3, validate: true },
      { x: -1.5, },
      { x: 0, validate: true },
      { x: 1.5 },
      { x: 3, validate: true },
    ],


  },
}

const def =
{
  artifact_1: {

    curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
    showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */

    conditions: {
      mult: {
        mathCurves: ['x', 'x-1'],
      },
      // assymptotes: [
      //   { x: -3, name: '+' },
      //   { x: 0, name: '+' },
      //   { x: 3, name: '+' },
      // ]
    }
  },

  artifact_2: {


    conditions: {

    }
  },
}
console.log(defBoards)

//new GenerateSumConstant(def, defBoards);

console.log(new GenerateSumConstant(def, defBoards))





