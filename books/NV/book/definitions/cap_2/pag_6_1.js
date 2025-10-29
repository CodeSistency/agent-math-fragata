const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      border: true,
      artifactClass: "artifact-big-very-min",
      body: [
        ["<b>Expresión</b>", "<b>Menos <br> Operaciones</b>", "<b>Número</b>"],
        ["( 2 + 5 )  ‧  8", " 7  ‧  8 ", " 56 "],
        [" 2 + 5 ‧  8 ", {tag: "input"}, {tag: "input"}],
        [" 8 + 5 - 2 ", {tag: "input"}, {tag: "input"}],
        [" 5 + 8 / 2 ", {tag: "input"}, {tag: "input"}],
      ],
      conditions: [["2+40"], ["42"], ["13-2"], ["11"], ["5+4"], ["9"]],
      engine: engineTable,
    },
    artifact_2: {
      artifactClass: "artifact-big-very-min",
      body: [
        ["<b>Expresión</b>", "<b>Menos <br> Operaciones</b>", "<b>Número</b>"],
        [" 8 x 5 / 2 ", {tag: "input"}, {tag: "input"}],
        [" 5 + 8 / 2 ", {tag: "input"}, {tag: "input"}],
        [" 8 x 5 / 2 ", {tag: "input"}, {tag: "input"}],
        [" ( 5 + 8 ) / 2 ", {tag: "input"}, {tag: "input"}],
      ],
      conditions: [
        ["\\frac{40}{2}", "40/2"],
        ["20"],
        ["5+4"],
        ["9"],
        ["\\frac{40}{2}", "40/2"],
        ["20"],
        ["\\frac{13}{2}", "13/2"],
        ["6.5"],
      ],
      engine: engineTable,
    },
    artifact_3: {
      artifactClass: "artifact-big-very-min",
      body: [
        [
          {style: {td: "pseudoTitle"}, value: "Expresión"},
          {style: {td: "pseudoTitle"}, value: "Menos Operaciones"},
        ],
        [
          {style: {td: ""}, value: "( 30 x 6 ) / ( 3 + 15 ) / 2 + 4"},
          {tag: "input"},
        ],
        [
          {style: {td: ""}, value: "((30 / 5) + 7  ‧  8 ) - 6 / 2"},
          {tag: "input"},
        ],
        [
          {style: {td: "pseudoTitle"}, value: "Menos Operaciones"},
          {style: {td: "pseudoTitle"}, value: "Número"},
        ],
        [{tag: "input"}, {tag: "input"}],
        [{tag: "input"}, {tag: "input"}],
      ],
      conditions: [
        ["180/18/2+4", "\\frac{180}{18\\div2}+4"],
        ["62-6/2"],
        ["5+4"],
        ["9"],
        ["62-3"],
        ["59"],
      ],
      engine: engineTable,
    },
    artifact_4: {
      artifactClass: "artifact-big-very-min",
      body: [
        ["<b>Expresión</b>", "<b>Menos Operaciones</b>", "<b>Número</b>"],
        [" ( 30 - 16 ) + 2", {tag: "input"}, {tag: "input"}],
        ["30 - 16 + 2", {tag: "input"}, {tag: "input"}],
        [" 30 - ( 16 + 2 )", {tag: "input"}, {tag: "input"}],
        [" 30 - 16 / 2", {tag: "input"}, {tag: "input"}],
      ],
      conditions: [
        ["14+2"],
        ["16"],
        ["14+2"],
        ["16"],
        ["30-18"],
        ["12"],
        ["30-8"],
        ["22"],
      ],
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

const contentMain = new CreateView(def);
