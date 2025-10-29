const defBoards = {
  board_1: {
    artifact: "lexico_1",
    points: [{text: {value: "a"}}, {text: {value: "b"}}],
    type: 2,
  },
  board_2: {
    artifact: "lexico_2",
    points: [{text: {value: "b"}}, {text: {value: "0"}}],
    type: 2,
  },
  board_3: {
    artifact: "lexico_3",
    points: [{text: {value: "0"}}, {text: {value: "b"}}],
    type: 2,
  },
  board_5: {
    artifact: "example_5",
    points: [{text: {value: "0"}}, {text: {value: "b"}}],
    type: 2,
  },
  board_5: {
    artifact: "artifact_1",
    points: [{text: {value: "a"}}, {text: {value: "b"}}],
    type: 2,
  },
  board_6: {
    artifact: "artifact_2",
    points: [{text: {value: "b"}}, {text: {value: "a"}}],
    type: 2,
  },
};

const def = {
  scrollNav: {
    tittle: "orden",
    lexico:
      "Seleccione los números que podrían ser la letra cuyo valor se desconoce. (Pueden haber varios números, uno solo o inclusive ninguno).",
  },

  artifacts: {
    lexico_1: {
      board: "board_1",
      inputs: [
        {
          tag: "form",
          style: {form: "border-none formInputEscalas"},
          value:
            "<p>El número representado por <b>a</b> es menor que el representado por <b>b</b> <br> <b>a < b</b></p>",
        },
      ],
      engine: EngineEscalas,
    },
    lexico_2: {
      board: "board_2",
      inputs: [
        {
          tag: "form",
          style: {form: "border-none formInputEscalas"},
          value:
            "<p>El número representado  por <b>b</b> es menor a cero, (negativo) <b>b < 0</b></p>",
        },
      ],
      engine: EngineEscalas,
    },
    lexico_3: {
      board: "board_3",
      inputs: [
        {
          tag: "form",
          style: {form: "border-none formInputEscalas"},
          value:
            "<p>El número  representado por <b>b</b> es mayor q cero, (positivo) <b>b > 0</b>",
        },
      ],
      engine: EngineEscalas,
    },
    lexico_4: {
      parent: "class-content",
      nodo: [
        {
          texto:
            'Escribir que <b>a = 47</b> se le da el nombre q <b>a</b>. Igualmente al escribir <b>b = 31</b>, se esta indicando que al numero 31 se va a llamar con el nombre <b>b</b>. Tambien se dice que "el valor  de la letra a es <b>47</b>" o que el "valor de la letra b es <b>31</b>',
        },
      ],
      styleContainer: "note",
      engine: EngineOwner,
    },
    artifact_1: {
      border: true,
      board: "board_5",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a=20"},
        {
          tag: "inputs",
          maxElementCheck: 2,
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: 160, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: 19, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -5, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 20, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: 30, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
            },
          ],
        },
      ],
      conditions: [{checks: ["160", "30"]}],

      engine: EngineEscalas,
    },
    artifact_2: {
      border: true,
      board: "board_6",
      parent: "lexico-content",
      inputs: [
        {tag: "input", style: "inputPoint", value: "a=20"},
        {
          tag: "inputs",
          maxElementCheck: 2,
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: 160, input: ""},
              correctResponce: true,
            },
            {style: {input: "inputTableCheck"}, value: {label: 19, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: -5, input: ""}},
            {style: {input: "inputTableCheck"}, value: {label: 20, input: ""}},
            {
              style: {input: "inputTableCheck"},
              value: {label: 30, input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck", label: "N"},
              value: {label: "N", input: ""},
            },
          ],
        },
      ],
      conditions: [{checks: ["19", "-5"]}],

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

const contentMain = new CreateView(def, defBoards);
