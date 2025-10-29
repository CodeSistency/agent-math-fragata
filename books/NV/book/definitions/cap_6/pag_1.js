const textUtils = {
  artifacts: {
    lexico_1: {
      nodo: [
        {texto: "<b>Convenciones</b>", atributos: {style: "text-align:center"}},
        {
          texto:
            "  Siempre que el paso vaya de izquierda a derecha se dibujará por encima de la recta. Su trayectoría se designará con el número entero positivo, se representa su tamaño.",
          atributos: {style: "text-align:justify"},
        },
      ],
      styleContainer: "note",
      engine: EngineOwner,
    },
    lexico_2: {
      nodo: [
        {
          texto:
            "En caso contrario, cuando se pone por debajo de la recta, el paso va de derecha a izquierda. Su <b>trayectoria</b> se designará poniéndole un menos delante del número que indica su tamaño.",
          atributos: {style: "text-align:justify"},
        },
      ],
      styleContainer: "note",
      engine: EngineOwner,
    },
    lexico_3: {
      nodo: [
        {
          texto: "<b>Simplificaciones</b>",
          atributos: {style: "text-align:center"},
        },
        {
          texto:
            "Dado que lo que nos interesa son las separeciones y no tanto las posiciones, en las figuras que siguen daremos solo la escala (separación entre dos puntos consecutivos) sin dar las posiciones. <p>Escala = 1 significa que dos puntos consecutivos están separados por una distancia de 1.",
          atributos: {style: "text-align:justify"},
        },
      ],
      styleContainer: "note",
      engine: EngineOwner,
    },
    lexico_4: {
      nodo: [
        {
          texto:
            "Otra manera de decir esto es poniéndole a dos puntos consecutivos sus posiciones. Restando la posición de la derecha menos la de la izquierda se obtiene la distancia que los separa, es decir la escala de la recta.",
          atributos: {style: "text-align:justify"},
        },
      ],
      styleContainer: "note",
      engine: EngineOwner,
    },
  },
};

const defBoards = {
  board_1: {
    artifact: "example_1",
    boundingbox: [-15, 3, 15, -3],
    contenedorInputs:"contentInputsCap6",
    points: [
      {text: {value: "-5", position: [-13.5, -1]}},
      {text: {value: "-4", position: [-11.05, -1]}},
      {text: {value: "-3", position: [-8.59, -1]}},
      {text: {value: "-2", position: [-6.14, -1]}},
      {text: {value: "-1", position: [-3.68, -1]}},
      {text: {value: "0", position: [-1.23, -1]}},
      {text: {value: "1", position: [1.23, -1]}},
      {text: {value: "2", position: [3.68, -1]}},
      {text: {value: "3", position: [6.14, -1]}},
      {text: {value: "4", position: [8.59, -1]}},
      {text: {value: "5", position: [11.05, -1]}},
      {text: {value: "6", position: [13.5, -1]}},
    ],
    points_arches: [{arche: [1, 7, false, false, {heigth: 1.5}]}],
    contenedorInputs:"contentInputsCap6",
    type: 9,
  },
  board_2: {
    artifact: "example_2",
    boundingbox: [-15, 3, 15, -3],
    points: [
      {text: {value: "-5", position: [-13.5, 1]}},
      {text: {value: "-4", position: [-11.05, 1]}},
      {text: {value: "-3", position: [-8.59, 1]}},
      {text: {value: "-2", position: [-6.14, 1]}},
      {text: {value: "-1", position: [-3.68, 1]}},
      {text: {value: "0", position: [-1.23, 1]}},
      {text: {value: "1", position: [1.23, 1]}},
      {text: {value: "2", position: [3.68, 1]}},
      {text: {value: "3", position: [6.14, 1]}},
      {text: {value: "4", position: [8.59, 1]}},
      {text: {value: "5", position: [11.05, 1]}},
      {text: {value: "6", position: [13.5, 1]}},
    ],
    contenedorInputs:"contentInputsCap6",
    points_arches: [{arche: [1, 7, false, false, {heigth: -1.5}]}],
    type: 9,
  },
  board_3: {
    artifact: "example_3",
    boundingbox: [-15, 3, 15, -3],
    points: [
      {text: {value: "", position: [-13.5, 1]}},
      {text: {value: "", position: [-11.05, 1]}},
      {text: {value: "", position: [-8.59, 1]}},
      {text: {value: "", position: [-6.14, 1]}},
      {text: {value: "", position: [-3.68, 1]}},
      {text: {value: "", position: [-1.23, 1]}},
      {text: {value: "", position: [1.23, 1]}},
      {text: {value: "", position: [3.68, 1]}},
      {text: {value: "", position: [6.14, 1]}},
      {text: {value: "", position: [8.59, 1]}},
      {text: {value: "", position: [11.05, 1]}},
      {text: {value: "", position: [13.5, 1]}},
    ],
    contenedorInputs:"contentInputsCap6",
    points_arches: [{arche: [2, 8, false, false, {heigth: -1.5}]}],
    type: 9,
  },
  board_4: {
    artifact: "example_4",
    boundingbox: [-15, 3, 15, -3],
    points: [
      {text: {value: "", position: [-13.5, 1]},},
      {text: {value: "", position: [-11.05, 1]}},
      {text: {value: "", position: [-8.59, 1]}},
      {text: {value: "", position: [-6.14, 1]}},
      {text: {value: "", position: [-3.68, 1]}},
      {text: {value: "", position: [-1.23, 1]}},
      {text: {value: "", position: [1.23, 1]}},
      {text: {value: "", position: [3.68, 1]}},
      {text: {value: "", position: [6.14, 1]}},
      {text: {value: "0", position: [8.59, 1]}},
      {text: {value: "1", position: [11.05, 1]}},
      {text: {value: "", position: [13.5, 1]}},
    ],
    contenedorInputs:"contentInputsCap6",
    points_arches: [{arche: [2,8, false,false, {heigth: -1.5},] },],
    type: 9,
  },
  board_5: {
    artifact: "artifact_1",
    boundingbox: [-15, 3, 15, -3],
    points: [ {},{},{},{},{},{},{},{},{},{},{}, {}, ],
    contenedorInputs:"contentInputsCap6",
    points_arches: [{arche: [2, 8, false, false, {heigth: -1.5}]}],
    type: 7,
  },
  board_6: {
    artifact: "artifact_2",
    boundingbox: [-15, 3, 15, -3],
    points: [ {},{},{},{},{},{},{},{},{},{},{},{}],
    contenedorInputs:"contentInputsCap6",
    points_arches: [{arche: [2, 7, false, false, {heigth: 1.5}]}],
    type: 7,
  },
  board_7: {
    artifact: "artifact_3",
    boundingbox: [-15, 3, 15, -3],
    points: [{},{},{},{},{},{},{},{},{},{},{},{}],
    contenedorInputs:"contentInputsCap6",
    points_arches: [{arche: [2, 8, false, false, {heigth: -1.5}]}],
    type: 7,
  },
  board_8: {
    artifact: "artifact_4",
    boundingbox: [-15, 3, 15, -3],
    points: [{},{},{},{},{},{},{},{},{},{},{},{}],
    contenedorInputs:"contentInputsCap6",
    points_arches: [{arche: [2, 6, false, false, {heigth: 1.5}]}],
    type: 7,
  },
};

const def = {
  scrollNav: {
    lexico: "Siempre tome en cuenta: tamaño y signo",
    tittle: "Multiplicación y División de Enteros ",
  },
  artifacts: {
    example_1: {
      board: "board_1",
      prueba_t: true,
      parent: "lexico_1",
      inputs: [{tag: "input", style: "inputPoint_cap6 borderRadius", value: "6"}],
      point: [{coordenada: [-4.5, 1.6],texto: "6", SizeText: 18,}],
      engine: EngineEscalas,
    },
    example_2: {
      prueba_t: true,
      board: "board_2",
      parent: "lexico_2",
      inputs: [{tag: "input", style: "inputPoint_cap6 borderRadius", value: "-6"}],
      point: [
        {
          coordenada: [-4.5, -2.6],
          texto: "6",
          SizeText: 18,
        },
      ],
      engine: EngineEscalas,
    },
    example_3: {
      prueba_t: true,
      board: "board_3",
      parent: "lexico_3",
      inputs: [
        {tag: "input", style: "inputPoint_cap6 borderRadius", value: "-6"},
      ],
      engine: EngineEscalas,
      point: [
        {
          coordenada: [-14.5, -2.6],
          texto: "Escala = 1",
          SizeText: 16,
        },
      ],
    },
    example_4: {
      prueba_t: true,
      board: "board_4",
      parent: "lexico_4",
      inputs: [{tag: "input", style: "inputPoint_cap6 borderRadius", value: "-6"}],
      engine: EngineEscalas,
    },
    artifact_1: {
      border: true,
      board: "board_5",
      inputs: [{style: "inputPoint_cap6 borderRadius", value: ""}],
      conditions: [["-12"]],
      point: [
        {
          coordenada: [-14.5, -2.6],
          texto: "Escala = 2",
          SizeText: 16,
        },
      ],
      engine: EngineEscalas,
    },
    artifact_2: {
      border: true,
      board: "board_6",
      inputs: [{style: "inputPoint_cap6 borderRadius", value: ""}],
      conditions: [["12"]],
      point: [
        {
          coordenada: [-14.5, -2.6],
          texto: "Escala = 3",
          SizeText: 16,
        },
      ],
      engine: EngineEscalas,
    },
    artifact_3: {
      board: "board_7",
      inputs: [{style: "inputPoint_cap6 borderRadius", value: ""}],
      conditions: [["-30"]],
      point: [
        {
          coordenada: [-14.5, -2.6],
          texto: "Escala = 5",
          SizeText: 16,
        },
      ],
      engine: EngineEscalas,
    },
    artifact_4: {
      board: "board_8",
      inputs: [{style: "inputPoint_cap6 borderRadius", value: ""}],
      conditions: [["8"]],
      point: [
        {
          coordenada: [-14.5, -2.6],
          texto: "Escala = 2",
          SizeText: 16,
        },
      ],
      engine: EngineEscalas,
    },
    artifact_raiting: {
      parent: "scroll-container",
      questions: {
        question_1: {
          value: "¿Fue fácil?",
        },
      },
      engine: EngineOwner,
    },
  },
};
const contentMain = new CreateView(textUtils, defBoards);
contentMain.initVIew(def);
