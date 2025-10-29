const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            style: {form: "formSelectInput flex-row", td: "tdNotlineBottom"},
            value:
              "<div id='div_Ecuacion'class='column max-width'><b>Ecuación</b>7 - 2x = 3</div>",
            inputs: [
              {
                style: {input: "mathBig max-width", span: "column max-width"},
                text: {span: "<b>Fórmula</b>"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {
              form: "formSelectInput flex-row",
              td: "tdNotlineBottom",
              span: "column",
            },
            inputs: [
              {
                style: {input: "mathBig max-width", span: "max-width column"},
                text: {span: "<b>Operación</b>"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {form: "formSelectInput flex-row", td: "tdNotlineBottom"},
            inputs: [
              {
                style: {input: "mathBig", span: "tdNotline column"},
                text: {span: "<b>Incógnita</b>"},
              },
              {
                style: {input: "mathBig", span: "tdNotline column"},
                text: {span: "<b>Solución</b>"},
              },
            ],
          },
        ],
      ],
      conditions: [["7-2x"], ["7-2\\left(\\right)"], ["x"], ["2"]],
      engine: engineTable,
    },
    artifact_2: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            style: {form: "formSelectInput flex-row", td: "tdNotlineBottom"},
            value:
              "<div id='div_Ecuacion'class='column max-width'><b>Ecuación</b>(y - 2) 3 = 3</div>",
            inputs: [
              {
                style: {input: "mathBig max-width", span: "column max-width"},
                text: {span: "<b>Fórmula</b>"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {
              form: "formSelectInput flex-row",
              td: "tdNotlineBottom",
              span: "column",
            },
            inputs: [
              {
                style: {input: "mathBig max-width", span: "max-width column"},
                text: {span: "<b>Operación</b>"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {form: "formSelectInput flex-row", td: "tdNotlineBottom"},
            inputs: [
              {
                style: {input: "mathBig", span: "tdNotline column"},
                text: {span: "<b>Incógnita</b>"},
              },
              {
                style: {input: "mathBig", span: "tdNotline column"},
                text: {span: "<b>Solución</b>"},
              },
            ],
          },
        ],
      ],
      conditions: [
        ["\\left(y-2\\right)3"],
        ["\\left(\\left(\\right)-2\\right)3"],
        ["y"],
        ["3"],
      ],
      engine: engineTable,
    },
    artifact_3: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            style: {form: "formSelectInput flex-row", td: "tdNotlineBottom"},
            value:
              "<div id='div_Ecuacion'class='column max-width'><b>Ecuación</b>5 + z/4 = 7</div>",
            inputs: [
              {
                style: {input: "mathBig max-width", span: "column max-width"},
                text: {span: "<b>Fórmula</b>"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {
              form: "formSelectInput flex-row",
              td: "tdNotlineBottom",
              span: "column",
            },
            inputs: [
              {
                style: {input: "mathBig max-width", span: "max-width column"},
                text: {span: "<b>Operación</b>"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {form: "formSelectInput flex-row", td: "tdNotlineBottom"},
            inputs: [
              {
                style: {input: "mathBig", span: "tdNotline column"},
                text: {span: "<b>Incógnita</b>"},
              },
              {
                style: {input: "mathBig", span: "tdNotline column"},
                text: {span: "<b>Solución</b>"},
              },
            ],
          },
        ],
      ],
      conditions: [["5+z/4"], ["5+\\left(\\right)/4"], ["z"], ["8"]],
      engine: engineTable,
    },
    artifact_4: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            style: {form: "formSelectInput flex-row", td: "tdNotlineBottom"},
            inputs: [
              {
                style: {input: "mathBig max-width", span: "column max-width"},
                text: {span: "<b>Ecuación</b>"},
              },
              {
                style: {input: "displayNone", span: "column max-width"},
                text: {span: "<b>Fórmula</b> 6x + 2"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {
              form: "formSelectInput flex-row",
              td: "tdNotlineBottom",
              span: "column",
            },
            inputs: [
              {
                style: {input: "mathBig max-width", span: "max-width column"},
                text: {span: "<b>Operación</b>"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {form: "formSelectInput flex-row", td: "tdNotlineBottom"},
            inputs: [
              {
                style: {input: "mathBig", span: "tdNotline column"},
                text: {span: "<b>Incógnita</b>"},
              },
              {
                style: {input: "displayNone", span: "tdNotline column"},
                text: {span: "<b>Solución</b> 3"},
              },
            ],
          },
        ],
      ],
      conditions: [["6x+2=20"], ["6\\left(\\right)+2"], ["x"]],
      engine: engineTable,
    },
    artifact_5: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            style: {form: "formSelectInput flex-row", td: "tdNotlineBottom"},
            inputs: [
              {
                style: {input: "mathBig max-width", span: "column max-width"},
                text: {span: "<b>Ecuación</b>"},
              },
              {
                style: {input: "mathBig max-width", span: "column max-width"},
                text: {span: "<b>Fórmula</b>"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {
              form: "formSelectInput flex-row",
              td: "tdNotlineBottom",
              span: "column",
            },
            inputs: [
              {
                style: {input: "displayNone", span: "max-width column"},
                text: {span: "<b>Operación</b> 9 - 2( )"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {form: "formSelectInput flex-row", td: "tdNotlineBottom"},
            inputs: [
              {
                style: {input: "displayNone", span: "tdNotline column"},
                text: {span: "<b>Incógnita</b> z"},
              },
              {
                style: {input: "displayNone", span: "tdNotline column"},
                text: {span: "<b>Solución</b> 4"},
              },
            ],
          },
        ],
      ],
      conditions: [["9-2z=1"], ["9-2z"]],
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
