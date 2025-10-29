const def = {
  scrollNav: {
    tittle: "Diagramas binarios y paréntesis",
  },
  artifacts: {
    lexico_1: {
      border: true,
      parent: "lexico-content",
      exampleElement: true,
      point: [
        {
          coordenada: [-1.56, 6.9],
          texto: "Sumandos",
          SizeText: 16,
        },
        {
          coordenada: [-1, -3.1],
          texto: "Suma",
          SizeText: 16,
        },
      ],

      valuesDefault: [
        {
          type: 4,

          valueA: "12",
          valueB: "3",
          operador1: "+",
          valueC: "15",

          content: "body",
          id: "jsxgraph5",
        },
      ],
      operacion: [["ADICIÓN"]],
      tmp: "tmp3",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    lexico_2: {
      border: true,
      parent: "lexico-content",
      point: [
        {
          coordenada: [-3.9, 7.2],
          texto: "Minuendo",
          SizeText: 16,
        },
        {
          coordenada: [0.6, 7.2],
          texto: "Sustraendo",
          SizeText: 16,
        },
        {
          coordenada: [-1, -3.1],
          texto: "Resta",
          SizeText: 16,
        },
      ],
      exampleElement: true,
      valuesDefault: [
        {
          type: 4,

          valueA: "12",
          valueB: "3",
          operador1: "-",
          valueC: "9",

          content: "body",
          id: "jsxgraph6",
        },
      ],
      operacion: [["SUSTRACCIÓN"]],
      tmp: "tmp3",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    lexico_3: {
      parent: "lexico-content",
      subOperation: "\\times",
      border: true,
      point: [
        {
          coordenada: [-1.4, 6.9],
          texto: "Factores",
          SizeText: 16,
        },
        {
          coordenada: [-1.6, -3.1],
          texto: "Producto",
          SizeText: 16,
        },
      ],
      exampleElement: true,
      valuesDefault: [
        {
          type: 4,

          valueA: "12",
          valueB: "3",
          operador1: ".",
          valueC: "36",

          content: "body",
          id: "jsxgraph7",
        },
      ],
      operacion: [["MULTIPLICACIÓN"]],
      tmp: "tmp3",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    lexico_4: {
      parent: "lexico-content",
      border: true,
      subOperation: "÷",
      point: [
        {
          coordenada: [-3.3, 7.2],
          texto: "Dividendo",
          SizeText: 16,
        },
        {
          coordenada: [0.7, 7.2],
          texto: "Divisor",
          SizeText: 16,
        },
        {
          coordenada: [-1.4, -3.1],
          texto: "Cociente",
          SizeText: 16,
        },
      ],
      valuesDefault: [
        {
          type: 4,

          valueA: "12",
          valueB: "3",
          operador1: "/",
          valueC: "4",

          content: "body",
          id: "jsxgraph8",
        },
      ],
      exampleElement: true,
      operacion: [["DIVISIÓN"]],
      tmp: "tmp3",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    example_1: {
      parent: "main-content",
      //nueva funcion de bordes
      border: true,
      small: true,
      exampleElement: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "6",
          valueB: "4",
          operador1: ".",
          valueC: "24",

          content: "body",
          id: "jsxgraph1",
        },
      ],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_1: {
      parent: "main-content",
      small: true,
      border: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "24",
          valueB: "3",
          operador1: "+",
          valueC: "",

          content: "body",
          id: "jsxgraph2",
        },
      ],
      conditions: [["27"]],
      boundingbox: [-5, 8, 5, -3],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_2: {
      parent: "main-content",
      small: true,
      border: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "24",
          valueB: "3",
          operador1: "-",
          valueC: "",

          content: "body",
          id: "jsxgraph3",
        },
      ],
      conditions: [["21"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    artifact_3: {
      parent: "main-content",
      small: true,
      valuesDefault: [
        {
          type: 3,

          valueA: "24",
          valueB: "3",
          operador1: "÷",
          valueC: "",

          content: "body",
          id: "jsxgraph4",
        },
      ],

      conditions: [["8"]],
      tmp: "tmp",
      boundingbox: [-5, 8, 5, -3],
      engine: EngineDiagrama,
    },
    /// main-contentss

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

const contentMain = new CreateView(def);
