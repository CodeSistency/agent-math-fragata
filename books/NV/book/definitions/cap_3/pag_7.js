const textUtils = {
  artifacts: {
    lexico_1: {
      nodo: [
        {
          texto: "<b>Evaluar una operación en un número</b>",
        },
        {
          texto:
            "Ejemplo: evaluar la operación 2·() en el número 3 consiste en poner el 3 dentro de los paŕentesis y calcular la expresión resultante. Es decir, primero 2·(3) y luego al calcular 2·3 se obtiene 6.",
          atributos: {style: "text-align:justify"},
        },
      ],

      engine: EngineOwner,
      styleContainer: "note",
    },

    lexico_2: {
      nodo: [
        {
          texto: "<b>Evaluar una operación en una variable</b>",
        },
        {
          texto:
            "Ejemplo: si se quiere evaluar la operación 5 + () en la variable y, lo que se hace es poner dentro de los paréntesis de la operación 5 + () la variable y. Es decir, 5 + (y).",
          atributos: {style: "text-align:justify"},
        },
      ],
      engine: EngineOwner,
      styleContainer: "note",
    },
    lexico_3: {
      nodo: [
        {
          texto: "<b>Evaluar una fórmula</b>",
        },
        {
          texto:
            "Evaluar una fórmula en un número consiste en cambiar (sustituir) la variable de la fórmula por el número y luego hacer el cálculo. Ejemplo: para evaluar la fórmula 5 + y en el número 3, es decir en y = 3, primero se cambia la y por el 3, obteniendo 5 + 3 y luego, al hacer el cálculo, se obtiene 8.",
          atributos: {style: "text-align:justify"},
        },
      ],
      engine: EngineOwner,
      styleContainer: "note",
    },
  },
};

const def = {
  scrollNav: {
    tittle: "Evaluar",
  },
  artifacts: {
    example_1: {
      body: [["Evalúe la operación 2·() en 3", " 2·(3) = 6 "]],
      engine: engineTable,
      prueba_t: true,
      parent: "lexico_1",
    },
    example_2: {
      body: [["Evalúe la operación 5 + () en y", "5 + (y)"]],
      engine: engineTable,
      prueba_t: true,
      parent: "lexico_2",
    },

    example_3: {
      body: [["Evalúe la fórmula 5 + y en y = 3", "5 + 3 = 8"]],
      engine: engineTable,
      prueba_t: true,
      parent: "lexico_3",
    },
    artifact_1: {
      artifactClass: "artifact-min",
      border: true,
      body: [
        [
          "Evalúe la fórmula <br> 5 + y en y = 3",
          {tag: "input", style: "inputLarge"},
          {tag: "input", style: "inputLarge"},
        ],
        [
          "Evalúe la fórmula <br> 5 - y en y = 3",
          {tag: "input", style: "inputLarge"},
          {tag: "input", style: "inputLarge"},
        ],
      ],
      conditions: [["5+3"], ["8"], ["5-3"], ["2"]],
      engine: engineTable,
    },
    artifact_2: {
      artifactClass: "artifact-min",
      border: true,
      body: [
        [
          "Evalúe la operación <br> 2·() en 3",
          {tag: "input", style: "inputLarge"},
          {tag: "input", style: "inputLarge"},
        ],
        [
          "Evalúe la operación <br> 2·() en z",
          {tag: "input", style: "inputLarge"},
          {tag: "input", style: "inputLarge"},
        ],
        [
          "Evalúe la fórmula <br> x + y en y = 3",
          {tag: "input", style: "inputLarge"},
          {tag: "input", style: "inputLarge"},
        ],
      ],
      conditions: [
        ["2\\cdot\\left(3\\right)", "2\\left(3\\right)"],
        ["6"],
        ["2\\cdot\\left(z\\right)", "2\\left(z\\right)"],
        ["2z"],
        ["x+3"],
        ["x+3"],
      ],
      engine: engineTable,
    },
    artifact_3: {
      artifactClass: "artifact-min",
      body: [
        [
          "Evalúe la operación <br> () / 3 -2 en 18",
          {tag: "input", style: "inputLarge"},
          {tag: "input", style: "inputLarge"},
        ],
        [
          "Evalúe la fórmula <br> 6 + () / 6 en 18",
          {tag: "input", style: "inputLarge"},
          {tag: "input", style: "inputLarge"},
        ],
      ],
      conditions: [
        ["\\frac{\\left(18\\right)}{3-2}", "\\left(18\\right)/3-2"],
        ["18"],

        ["\\frac{6+\\left(18\\right)}{6}", "6+\\left(18\\right)/6"],
        ["9"],
      ],
      engine: engineTable,
    },
    artifact_4: {
      artifactClass: "artifact-big",
      body: [
        [
          "¿Cuánto vale la operación <br> 2()+3 evaluada en 5?",
          {tag: "input", style: "inputLarge"},
        ],
        [
          "¿Cuál es el resultado de evaluar la fórmula 2x+3 cuando se le da el valor 6 a la variable x?",
          {tag: "input", style: "inputLarge"},
        ],
        ["¿Cúal es la operación en 2x+3?", {tag: "input", style: "inputLarge"}],
      ],
      conditions: [["13"], ["15"], ["2\\left(6\\right)+3"]],
      engine: engineTable,
    },
    artifact_5: {
      artifactClass: "artifact-big",
      body: [
        [
          "¿Cuánto vale la operación 2()+3 evaluada en 7?",
          {tag: "input", style: "inputLarge"},
        ],
        ["¿Cuál es la variable en 5-3 y?", {tag: "input", style: "inputLarge"}],
        ["¿Cúal es la operación?", {tag: "input", style: "inputLarge"}],
      ],
      conditions: [["17"], ["y"], ["5-3\\left(y\\right)"]],
      engine: engineTable,
    },

    artifact_6: {
      artifactClass: "artifact-big",
      body: [
        [
          "¿Cuánto vale la operación 2()-3 evaluada en 3?",
          {tag: "input", style: "inputLarge"},
        ],
        ["¿Cuál es la variable en 5 z-3?", {tag: "input", style: "inputLarge"}],
        ["¿Cúal es la operación?", {tag: "input", style: "inputLarge"}],
      ],
      conditions: [["3"], ["z"], ["5\\left(z\\right)-3"]],
      engine: engineTable,
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

const contentMain = new CreateView(textUtils);
contentMain.initVIew(def);
