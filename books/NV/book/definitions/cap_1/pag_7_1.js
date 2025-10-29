const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      description:
        'El vértice "apunta" al menor número. Complete con una de las letras.',
      artifactClass: "artifact-big-very-min",
      body: [
        [
          "B < A ¿Quién es el menor?",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "A"}, {valor: "B"}],
                style: {select: "selectClaseDos"},
              },
            ],
          },
        ],

        [
          "B < A ¿Quién es el mayor?",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "A"}, {valor: "B"}],
                style: {select: "selectClaseDos"},
              },
            ],
          },
        ],

        [
          "A < B ¿Quién es el mayor?",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "A"}, {valor: "B"}],
                style: {select: "selectClaseDos"},
              },
            ],
          },
        ],
      ],

      conditions: [["b"], ["a"], ["b"]],
      engine: engineTable,
    },

    artifact_2: {
      description:
        'El vértice "apunta" al menor número. Complete con una de las letras.',
      artifactClass: "artifact-big-very-min",

      body: [
        [
          "J es menor que K",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "J"}, {valor: "K"}],
                style: {select: "selectClase"},
              },
              {
                style: {span: "spanFlex", select: "selectClase"},
                text: {span: "<"},
                default: [{valor: "selecciona"}, {valor: "J"}, {valor: "K"}],
              },
            ],
          },
        ],
        [
          "A es menor que K",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "A"}, {valor: "K"}],
                style: {select: "selectClase"},
              },
              {
                style: {span: "spanFlex", select: "selectClase"},
                text: {span: ">"},
                default: [{valor: "selecciona"}, {valor: "A"}, {valor: "K"}],
              },
            ],
          },
        ],
        [
          "A es menor que B",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "A"}, {valor: "B"}],
                style: {select: "selectClase"},
              },
              {
                style: {span: "spanFlex", select: "selectClase"},
                text: {span: ">"},
                default: [{valor: "selecciona"}, {valor: "A"}, {valor: "B"}],
              },
            ],
          },
        ],
      ],
      conditions: [["j"], ["k"], ["k"], ["a"], ["b"], ["a"]],
      engine: engineTable,
    },

    artifact_3: {
      description:
        'El vértice "apunta" al menor número. Complete con una de las letras.',
      artifactClass: "artifact-big-very-min",
      body: [
        [
          "A > B ¿Quién es el menor?",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "A"}, {valor: "B"}],
                style: {select: "selectClaseDos"},
              },
            ],
          },
        ],

        [
          "B > A ¿Quién es el menor?",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "A"}, {valor: "B"}],
                style: {select: "selectClaseDos"},
              },
            ],
          },
        ],

        [
          "B > A ¿Quién es el mayor?",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "A"}, {valor: "B"}],
                style: {select: "selectClaseDos"},
              },
            ],
          },
        ],
      ],

      conditions: [["b"], ["a"], ["b"]],
      engine: engineTable,
    },

    artifact_4: {
      description:
        'El vértice "apunta" al menor número. Complete con una de las letras.',
      artifactClass: "artifact-big-very-min",

      body: [
        [
          "H es mayor que F",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "H"}, {valor: "F"}],
                style: {select: "selectClase"},
              },
              {
                style: {span: "spanFlex", select: "selectClase"},
                text: {span: ">"},
                default: [{valor: "selecciona"}, {valor: "H"}, {valor: "F"}],
              },
            ],
          },
        ],
        [
          "H es mayor que F",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "H"}, {valor: "F"}],
                style: {select: "selectClase"},
              },
              {
                style: {span: "spanFlex", select: "selectClase"},
                text: {span: "<"},
                default: [{valor: "selecciona"}, {valor: "H"}, {valor: "F"}],
              },
            ],
          },
        ],
        [
          "A es mayor que B",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "A"}, {valor: "B"}],
                style: {select: "selectClase"},
              },
              {
                style: {span: "spanFlex", select: "selectClase"},
                text: {span: "<"},
                default: [{valor: "selecciona"}, {valor: "A"}, {valor: "B"}],
              },
            ],
          },
        ],
      ],
      conditions: [["h"], ["f"], ["f"], ["h"], ["b"], ["a"]],
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
