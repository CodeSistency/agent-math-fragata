const allDef = {
  scrollNav: {
    lexico:
      " <h2>Ecuaciones</h2> <h5>Las inversas no siempre son lo que uno cree.</h5><p>Complete realizando las operaciones, para ver si dan lo esperado.</p>",
  },
  artifacts: {
    artifact_1: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: "8", right: "8"}, // Cada objeto representa una fila con dos valores
          {left: "10-()", right: ""},
          {left: "", right: ""},
        ],
        // bottom: "2",
      },
      form: [
        {
          tag: "radius",
          maxElementCheck: 1,
          value: "<div><p class='tittle-form'>¿Sorpresa?</p></div>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
        {
          tag: "radius",
          maxElementCheck: 1,
          value: "<div><p class='tittle-form'>¿Fácil?</p></div>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
      ],

      conditions: [
        {checks: ["Sí", "No"]},
        {checks: ["Sí", "No"]},
        ["10+\\left(\\right)"],
        ["2"],
        ["2"],
      ],
      engine: DiagramVertical,
    },
    artifact_2: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: "12", right: "12"}, // Cada objeto representa una fila con dos valores
          {left: "()-10", right: ""},
          {left: "", right: ""},
        ],
        // bottom: "2",
      },
      form: [
        {
          tag: "radius",
          maxElementCheck: 1,
          value: "<div><p class='tittle-form'>¿Sorpresa?</p></div>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
        {
          tag: "radius",
          maxElementCheck: 1,
          value: "<div><p class='tittle-form'>¿Fácil?</p></div>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
      ],

      conditions: [
        {checks: ["Sí", "No"]},
        {checks: ["Sí", "No"]},
        ["\\left(\\right)+10"],
        ["2"],
        ["2"],
      ],
      engine: DiagramVertical,
    },
    artifact_3: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: "12", right: "12"}, // Cada objeto representa una fila con dos valores
          {left: "()/3", right: ""},
          {left: "", right: ""},
        ],
        // bottom: "2",
      },
      form: [
        {
          tag: "radius",
          maxElementCheck: 1,
          value: "<div><p class='tittle-form'>¿Sorpresa?</p></div>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
        {
          tag: "radius",
          maxElementCheck: 1,
          value: "<div><p class='tittle-form'>¿Fácil?</p></div>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
      ],

      conditions: [
        {checks: ["Sí", "No"]},
        {checks: ["Sí", "No"]},
        ['3\\cdot\\left(\\right)'],
        ["4"],
        ["4"],
      ],
      engine: DiagramVertical,
    },
    artifact_4: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: "8", right: "8"}, // Cada objeto representa una fila con dos valores
          {left: "10+()", right: ""},
          {left: "", right: ""},
        ],
        // bottom: "2",
      },
      form: [
        {
          tag: "radius",
          maxElementCheck: 1,
          value: "<div><p class='tittle-form'>¿Sorpresa?</p></div>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
        {
          tag: "radius",
          maxElementCheck: 1,
          value: "<div><p class='tittle-form'>¿Fácil?</p></div>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
      ],

      conditions: [
        {checks: ["Sí", "No"]},
        {checks: ["Sí", "No"]},
        ["10-\\left(\\right)"],
        ["18"],
        ["18"],
      ],
      engine: DiagramVertical,
    },
    artifact_5: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: "2", right: "2"}, // Cada objeto representa una fila con dos valores
          {left: "12\\cdot\\left(\\right)", right: ""},
          {left: "", right: ""},
        ],
        // bottom: "2",
      },
      form: [
        {
          tag: "radius",
          maxElementCheck: 1,
          value: "<div><p class='tittle-form'>¿Sorpresa?</p></div>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
        {
          tag: "radius",
          maxElementCheck: 1,
          value: "<div><p class='tittle-form'>¿Fácil?</p></div>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
      ],

      conditions: [
        {checks: ["Sí", "No"]},
        {checks: ["Sí", "No"]},
        ["\\frac{\\left(\\right)}{12}", '\\left(\\right)/12'],
        ["24"],
        ["24"],
      ],
      engine: DiagramVertical,
    },
    artifact_6: {
      parent: "containerBasePage",
      visual: "complete", // o 'left', , 'complete'
      inputs: {
        // top: "4",
        main: [
          {left: "12", right: "12"}, // Cada objeto representa una fila con dos valores
          {left: "24/()", right: ""},
          {left: "", right: ""},
        ],
        // bottom: "2",
      },
      form: [
        {
          tag: "radius",
          maxElementCheck: 1,
          value: "<div><p class='tittle-form'>¿Sorpresa?</p></div>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
        {
          tag: "radius",
          maxElementCheck: 1,
          value: "<div><p class='tittle-form'>¿Fácil?</p></div>",
          inputs: [
            {
              style: {input: "inputTableCheck"},
              value: {label: "Sí", input: ""},
              correctResponce: true,
            },
            {
              style: {input: "inputTableCheck"},
              value: {label: "No", input: ""},
            },
          ],
        },
      ],

      conditions: [
        {checks: ["Sí", "No"]},
        {checks: ["Sí", "No"]},
        ["24\\cdot\\left(\\right)"],
        ["2"],
        ["2"],
      ],
      engine: DiagramVertical,
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
const contentMain = new CreateView(allDef);
