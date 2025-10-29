const def = {
  scrollNav: {
    lexico: "No olvide poner los paréntesis en caso de necesidad.",
  },
  artifacts: {
    example_1: {
      border: true,
      subInputType: 3,
      parent: "main-content",
      valuesDefault: [
        {
          type: 1,

          valueA: "x",
          valueB: "3",
          operador1: "+",
          valueC: "5",
          valueC: "4",
          valueD: "x + 3",
          operador2: ".",
          valueE: "( x + 3 ) \\cdot 4",

          content: "body",
          id: "jsxgraph2",
        },
      ],
      tmp: "tmp",
      engine: EngineDiagrama,
      exampleElement: true,
    },
    artifact_1: {
      border: true,
      subInputType: 3,
      parent: "main-content",
      valuesDefault: [
        {
          type: 2,

          valueA: "4",
          valueB: "x",
          operador1: "+",
          valueC: "6",
          valueD: "",
          operador2: "-",
          valueE: "",

          content: "body",
          id: "jsxgraph",
        },
      ],
      conditions: [
        ["x+6", "\\left(x+6\\right)"],
        ["4-\\left(x+6\\right)", "4-x+6"],
      ],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_2: {
      parent: "main-content",
      subInputType: 3,
      valuesDefault: [
        {
          type: 1,

          valueA: "x",
          valueB: "y",
          operador1: "+",
          valueC: "z",
          valueD: "",
          operador2: "-",
          valueE: "",

          content: "body",
          id: "jsxgraph3",
        },
      ],
      conditions: [
        ["x+y", "\\left(x+y\\right)"],
        ["\\left(x+y\\right)-z", "x+y-z"],
      ],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_3: {
      parent: "main-content",
      subInputType: 3,
      valuesDefault: [
        {
          type: 2,

          valueA: "4",
          valueB: "x",
          operador1: "-",
          valueC: "6",
          valueD: "",
          operador2: ".",
          valueE: "",

          content: "body",
          id: "jsxgraph4",
        },
      ],
      conditions: [
        ["x-6", "\\left(x-6\\right)"],
        ["4\\cdot\\left(x-6\\right)", "4\\left(x-6\\right)"],
      ],
      tmp: "tmp",
      engine: EngineDiagrama,
    },

    artifact_4: {
      parent: "main-content",
      subInputType: 3,
      valuesDefault: [
        {
          type: 1,

          valueA: "y",
          valueB: "12",
          operador1: "+",
          valueC: "4",
          valueD: "",
          operador2: "-",
          valueE: "",

          content: "body",
          id: "jsxgraph6",
        },
      ],
      conditions: [
        ["y+12", "\\left(y+12\\right)"],
        ["\\left(y+12\\right)-4", "y+12-4"],
      ],
      tmp: "tmp",
      engine: EngineDiagrama,
    },
    artifact_5: {
      border: true,
      parent: "main-content",
      subInputType: 3,
      valuesDefault: [
        {
          type: 2,

          valueA: "",
          valueB: "",
          operador1: "",
          valueC: "",
          valueD: "",
          operador2: "",
          valueE: "4/ (y-12)",

          content: "body",
          id: "jsxgraph5",
        },
      ],
      conditions: [
        ["4"],
        ["y"],
        ["-"],
        ["12"],
        ["\\left(y-12\\right)", "y-12"],
        ["/", "÷"],
      ],
      tmp: "tmp",
      engine: EngineDiagrama,
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

const contentMain = new CreateView(def);
