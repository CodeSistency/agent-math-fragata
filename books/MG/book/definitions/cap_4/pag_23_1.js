let alphabet = { // alfabeto de todas las cuvas si no se agrega se muestran todas las curvas

  'constante': {
    point: { coord: [0, 1], visible: false },
    keyCurve: '1',
    options: { strokeColor: '#7f7879', strokeWidth: 2 }
    , interval: []
  },
    
  'identidad': { /* identidad */
    point: { coord: [0, 0], visible: false },
    keyCurve: 'x',
    options: { strokeColor: '#7f7879', strokeWidth: 2 }
  }
  ,
  'identidadNegativa': { /* Identidad negativa */
    point: { coord: [0, 0], visible: false },
    keyCurve: '-x',
    options: { strokeColor: '#7f7879', strokeWidth: 2 }
  }
  ,
  // 'inversaNumerica': { /* inversa numerica */
  //   point: { coord: [0, 0], visible: true },
  //   keyCurve: "x^(-1)",
  //   options: { strokeColor: "#7f7879", strokeWidth: 2 }
  // },
  // 'alCuadrado': {
  //   point: { coord: [0, 0], visible: true },
  //   keyCurve: "x^(2)",
  //   options: { strokeColor: "#7f7879", strokeWidth: 2 }
  // },
  'exp': {
    point: { coord: [0, 1], visible: false },
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
   
  
    alphabet,
    asymptotes: [
      // { x: -3, validate: true },
      { x: 0, },
      // { x: 0, validate: true },
      
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
      },
      grid: true,
      grid: { style: '#bfbaba' },
  
  
      boundingbox: [-4, 4, 4, -4],
  
    },

    alphabet  
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
  
      boundingbox: [-4, 4, 4, -4],
  
  
  
    },
    lines: [
      {
        points: [
          [-4, -1],
          [4, -1],
        ],
      },
  
    ],
    alphabet,
  
  
  
  
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
  
      boundingbox: [-4, 4, 4, -4],
  
  
  
    },
    lines: [
      {
        points: [
          [-4, -2],
          [4, -2],
        ],
      },
  
    ],
    alphabet,
  
  
  
  
  },
}
  
const def =
  {
    artifact_1: {
  
      curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
      showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */
      buttonAsyn: true,
 
      
      instructionText: {
        text: '\\left(\\space\\right)^2=\\left(\\space\\right)\\cdot\\left(\\space\\right)',
        
        styleClass: []
      },
  
      conditions: {
  
        
        multiplyCurves: ['x', 'x',],
        asymptotes: [
          { x: -1, y: 1 },
          { x: 1, y: 1 },
          { x: -1.5, y: 2.2 },
          { x: 1.5, y: 2.2 },
            
        ]
      }
    },
    artifact_2: {
      visibleAsyntote:true,
      curveCount: 2, //Cantidad de cuvas que se necesita que se cree, por defecto esta 2
      showCurveButton: true, /* propiedad para mostrar boton para el menu de curvas */
        
      instructionText: {
        text: '\\left(\\space\\right)^{-1}=\\frac{1}{\\left(\\space\\right)}',
        styleClass: []
      },
      
      conditions: {
      

        operationType:3,
        multiplyCurves: ['1', 'x',],
        asymptotes: [
          { x: -1, y: -1 },
          { x: -2, y: -0.5 },
          { x: -0.5, y: -2 },
          
          { x: 1, y: 1 },
          { x: 2, y: 0.5 },
          { x: 0.5, y: 2 },
        ]
      }
    },
    
  }
  
  
new GenerateSumConstant(def, defBoards);
  
// console.log(new GenerateSumConstant(def, defBoards))
  
  
  
  
  
  
  