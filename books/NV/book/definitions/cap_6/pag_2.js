const defBoards = {

  board_1: {
    artifact: "artifact_1",
    shapes: [{ texts: [{ x: -2.1, y: 8.2, value: "7" },] }],
    type: [
      { type: 2, mathfields: [{ value: "2x7", disabled: true }], refLine: "null" },
      { type: 2, mathfields: [{ value: "3x6", disabled: true }], refLine: "lineBoard_0" },
      { type: 2, mathfields: [{ value: "2·y", disabled: true }], refLine: "lineBoard_1" },
    ],
    points_arches: [{ arche: [1, 2, false, false, { heigth: 1 }] }, { arche: [2, 3, false, false, { heigth: 1 }] }],
    arches_click: { semicircleSimpleTop: { heigth: 1 }, semicircleSimpleBelow: { heigth: -1 }, },
  },
  board_2: {
    artifact: "artifact_2",
    shapes: [
      {
        texts: [
          { x: 12, y: 4.5, value: "Ojo!" },
        ],
      }
    ],
    type: [
      { type: 2, mathfields: [{ value: "6x3", disabled: true }], refLine: "lineBoard_0" },
      { type: 2, mathfields: [{ value: "4x4", disabled: true }], refLine: "lineBoard_1" },
    ],
    arches_click: { semicircleSimpleTop: { heigth: 1 }, semicircleSimpleBelow: { heigth: -1 }, },
  },
  board_3: {

    artifact: "artifact_3",
    shapes: [
      {
        texts: [
          { x: 12, y: -1.5, value: "Ojo!" },
        ],
      }
    ],
    type: [
      { type: 2, mathfields: [{ value: "3·z", disabled: true }], refLine: "lineBoard_0" },
      { type: 2, mathfields: [{ value: "y·2", disabled: true }], refLine: "lineBoard_1" },
    ],
    arches_click: { semicircleSimpleTop: { heigth: 1 }, semicircleSimpleBelow: { heigth: -1 }, },
  },


}


const def = {
  scrollNav: true,

  artifacts: {
    lexico_1: {
      nodo: [
        {texto: "Con varios pasos se forman un <b>camino</b>.", atributos: { style: 'text-align:justify' } },
        { texto: 'La <b>trayectoria</b> describe el camino.', atributos: { style: 'text-align:justify' }   },
        { texto: 'Los primeros caminos que vamos a estudiar tienen todos los pasos del mismo tamaño.',atributos: { style: 'text-align:justify' }  },
      ],
      recursos: [
        {recurso: {
            styleRecurso: ['trajectoryContainer'],
            grafico: [{
              texto: [
                { x: -3.9, y: 2, mensaje: '<math-field contenteditable="false" class="squareInterval" style=" width:90px; height:65px; font-size: 16px;">\\text{Trayectoria</math-field>' },
                { x: -1.3, y: 2, mensaje: '<math-field contenteditable="false" class="squareInterval" style=" width:185px; height:65px; font-size: 16px;">\\text{Camino}</math-field>' },
                { x: -3.9, y: -2, mensaje: '<div style="width:90px;height:65px;" class="squareInterval"></div>' },
                { x: -1.3, y: -2, mensaje: '<div style="width:185px;height:65px" class="squareInterval"></div>' },
                { x: 0.1, y: -1.5, mensaje: '3' ,styleText:{fontSize:16,cssClass:""} },
                { x: 2.2, y: -1.5, mensaje: '3',styleText:{fontSize:16,cssClass:""} },
                { x: -3.1, y: -2, mensaje: '2 x 3' , styleText:{fontSize:16, cssClass:""}},
              ],
              linea: [ { punto_1: [-1, -3], punto_2: [3.5, -3] }, ],
              circle: [
                { punto_1: [-0.8, -3], punto_2: [1.3, -3], type: "semicircle", stylesPoint_1: { visible: true } },
                { punto_1: [1.3, -3], punto_2: [3.3, -3], type: "semicircle", stylesPoint_2: { visible: true } },
                { punto_1: [1.3, -3], punto_2: [1.3, -3], stylesPoint_2: { visible: true } },
              ],
            }],
          },
        },


      ],


      styleContainer: "note",
      engine: EngineOwner
    },
    lexico_2: {


      nodo: [

        {
          texto: '<b>Nota sobre la notación:</b> A veces se utiliza <b>punto</b> y otras <b>x</b> para indicar "veces". Así <b>2 ·</b> o <b>2 x</b> indica <b>2</b> cuando son números se prefiere <b>x</b> para no confundir con decimales. Cuando son letras y/o números prefiere el <b>punto</b>. Ejemplo:',
          atributos: { style: 'text-align:justify' }

        },
        {
          texto: '<b>3·x</b> significa repetir <b>3</b> veces el paso de tamaño x.',
          atributos: { style: 'text-align:justify' }

        },
        {
          texto: 'Se ve que en este caso el x debe interpretarse como tamaño y no como signo de multiplicación.',
          atributos: { style: 'text-align:justify' }

        },
      ],


      styleContainer: "note",
      engine: EngineOwner
    },
    artifact_1: {
      return: true,
      inputCurve: true,
      board: 'board_1',
      description: "Basta con ponerle a un solo paso su tamaño encima, porque los pasos son del mismo tamaño.",
      engine: EngineEscalas,
      conditions: [
        { curves: { id: "lineBoard_0", steps: 1, type: "Top", curves: 3, input: ["6"] } },
        { curves: { id: "lineBoard_1", steps: 1, type: "Top", curves: 2, input: ["y"] } },

      ],
    },
    artifact_2: {
      return: true,
      inputCurve: true,
      board: 'board_2',
      description: "Basta con ponerle a un solo paso su tamaño encima, porque los pasos son del mismo tamaño.",
      engine: EngineEscalas,
      conditions: [
        { curves: { id: "lineBoard_0", steps: 1, type: "Top", curves: 3, input: ["6"] } },
        { curves: { id: "lineBoard_1", steps: 1, type: "Top", curves: 4, input: ["4"] } },
      ],
    },
    artifact_3: {
      return: true,
      inputCurve: true,
      board: 'board_3',
      description: "Basta con ponerle a un solo paso su tamaño encima, porque los pasos son del mismo tamaño.",
      engine: EngineEscalas,
      conditions: [
        { curves: { id: "lineBoard_0", steps: 1, type: "Top", curves: 3, input: ["z"] } },
        { curves: { id: "lineBoard_1", steps: 1, type: "Top", curves: 2, input: ["y"] } },
      ],
    },
    artifact_raiting: {
      parent: "scroll-container",
      questions: {
        question_1: {
          value: "¿Fue fácil?",
        },

      },
      engine: EngineOwner
    },



  }
};



const contentMain = new CreateView(def, defBoards);
