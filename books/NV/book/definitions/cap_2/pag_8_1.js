const def = {
  scrollNav: true,
  // parent: "main",
  artifacts: {
    artifact_1: {
      artifactClass: "artifact-big-very-min",
      body: [
        [
          {value: "Si", style: {td: "veryLowTd"}},
          "¿Quién es <br> t - s?",
          {
            tag: "select",
            default: [
              {valor: "selecciona"},
              {valor: "3"},
              {valor: "-3"},
              {valor: "7-4"},
            ],
          },
        ],
        [
          {value: "s = 4", style: {td: "veryLowTd"}},
          "¿Quién es <br> t - k?",
          {
            tag: "select",
            default: [
              {valor: "selecciona"},
              {valor: "5"},
              {valor: "-5"},
              {valor: "7-2"},
            ],
          },
        ],
        [
          {value: "t = 7", style: {td: "veryLowTd"}},
          "¿Quién es t<sup>k</sup>?",
          {
            tag: "select",
            default: [
              {valor: "selecciona"},
              {valor: "49"},
              {valor: "14"},
              {valor: "42"},
            ],
          },
        ],
        [
          {value: "k = 2", style: {td: "veryLowTd"}},
          "¿Es cierto que 2·s = 8?",
          {
            tag: "select",
            default: [{valor: "selecciona"}, {valor: "sí"}, {valor: "no"}],
          },
        ],
      ],
      type: 2,
      conditions: [["3", "7-4"], ["5", "7-2"], ["49"], ["sí"]],
      engine: engineTable,
    },
    artifact_2: {
      artifactClass: "artifact-big-very-min",
      body: [
        [
          {value: " Si <br> s = 4", style: {td: "veryLowTd"}},
          "¿Es cierto que 3·k = 14?",
          {
            tag: "select",
            default: [{valor: "selecciona"}, {valor: "no"}, {valor: "sí"}],
          },
        ],
        [
          {value: "t = 7", style: {td: "veryLowTd"}},
          "¿Quién es <br> 2·t - k?",
          {
            tag: "select",
            default: [
              {valor: "selecciona"},
              {valor: "12"},
              {valor: "10"},
              {valor: "2·7-2"},
            ],
          },
        ],
        [
          {value: "k = 2", style: {td: "veryLowTd"}},
          "¿Quién es <br> 2·t + 10?",
          {
            tag: "select",
            default: [
              {valor: "selecciona"},
              {valor: "24"},
              {valor: "34"},
              {valor: "2·7+10"},
            ],
          },
        ],
      ],
      type: 2,
      conditions: [["no"], ["12", "2·7-2"], ["24", "2·7+10"]],
      engine: engineTable,
    },
    artifact_3: {
      artifactClass: "artifact-big-very-min",
      body: [
        [
          {value: "Si", style: {td: "veryLowTd"}},
          "¿Quién es a·b·c?",
          {
            tag: "select",
            default: [
              {valor: "selecciona"},
              {valor: "13"},
              {valor: "30"},
              {valor: "3·2·5"},
            ],
          },
        ],
        [
          {value: "a = 3", style: {td: "veryLowTd"}},
          "¿Quién es a·b+c?",
          {
            tag: "select",
            default: [
              {valor: "selecciona"},
              {valor: "11"},
              {valor: "21"},
              {valor: "3·2+5"},
            ],
          },
        ],
        [
          {value: "b = 2", style: {td: "veryLowTd"}},
          "¿Quién es a·(b+c)?",
          {
            tag: "select",
            default: [
              {valor: "selecciona"},
              {valor: "21"},
              {valor: "14"},
              {valor: "3·(2+5)"},
            ],
          },
        ],
        [
          {value: "c = 5", style: {td: "veryLowTd"}},
          "¿Quién es a·b + a·c?",
          {
            tag: "select",
            default: [
              {valor: "selecciona"},
              {valor: "21"},
              {valor: "18"},
              {valor: "3·2+3·5"},
            ],
          },
        ],
      ],
      type: 2,
      conditions: [
        ["30", "3·2·5"],
        ["11", "3·2+5"],
        ["21", "3·(2+5)"],
        ["21", "3·2+3·5"],
      ],
      engine: engineTable,
    },
    artifact_4: {
      artifactClass: "artifact-big-very-min",
      body: [
        [
          {value: "Si <br> a = 3", style: {td: "veryLowTd"}},
          "¿Es cierto que <br> a+2·b = c?",
          {
            tag: "select",
            default: [{valor: "selecciona"}, {valor: "no"}, {valor: "sí"}],
          },
        ],
        [
          {value: "b = 2", style: {td: "veryLowTd"}},
          "¿Quién es b<sup>a</sup>?",
          {
            tag: "select",
            default: [{valor: "selecciona"}, {valor: "8"}, {valor: "6"}],
          },
        ],
        [
          {value: "c = 5", style: {td: "veryLowTd"}},
          "¿Es cierto que <br> a·(b + c) = a·b + a·c?",
          {
            tag: "select",
            default: [{valor: "selecciona"}, {valor: "sí"}, {valor: "no"}],
          },
        ],
      ],
      type: 2,
      conditions: [["no"], ["8"], ["sí"]],
      engine: engineTable,
    },
    artifact_5: {
      artifactClass: "artifact-big-very-min",

      body: [
        [
          {value: "Si", style: {td: "veryLowTd"}},
          "¿Quién es <br> b<sup>a + 1</sup>?",
          {
            tag: "select",
            default: [{valor: "selecciona"}, {valor: "16"}, {valor: "9"}],
          },
        ],
        [
          {value: "a = 3", style: {td: "veryLowTd"}},
          "¿Quién es <br> b<sup>a</sup> + 1",
          {
            tag: "select",
            default: [{valor: "selecciona"}, {valor: "9"}, {valor: "16"}],
          },
        ],
        [
          {value: "b = 2", style: {td: "veryLowTd"}},
          "¿Es cierto que <br> b<sup>a + 1</sup> = b<sup>a</sup> + 1?",
          {
            tag: "select",
            default: [{valor: "selecciona"}, {valor: "no"}, {valor: "sí"}],
          },
        ],
      ],
      type: 2,
      conditions: [["16"], ["9"], ["no"]],
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
