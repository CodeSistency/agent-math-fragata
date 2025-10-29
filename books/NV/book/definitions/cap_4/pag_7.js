const def = {
  scrollNav: true,
  artifacts: {
    example_1: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            style: {td: "tdNotlineBottom", span: "flex-row"},
            value:
              "<p id='p_Ecuacion'class='column'><b>Ecuación</b> 3x + 6 = 30</p> <p id='p_Formula' class='column'><b class=''>Fórmula</b> 3x + 6</p> ",
          },
        ],
        [
          {
            tag: "form",
            style: {
              form: "formSelectInput column",
              td: "tdNotlineBottom",
              span: "column",
            },
            value: "<p class='column'><b>Operación</b> 3 ( ) + 6</p>",
          },
        ],
        [
          {
            style: {td: "tdNotlineBottom", span: "flex-row"},
            value:
              "<p id='p_Incognita'class='column'><b>Incógnita</b>x</p> <p id='p_Solucion' class='column'><b class=''>Solución</b>8</p> ",
          },
        ],
      ],
      engine: engineTable,
    },
    artifact_1: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            style: {form: "formSelectInput flex-row", td: "tdNotlineBottom"},
            value:
              "<div id='div_Ecuacion'class='column max-width'><b>Ecuación</b>4 (y - 2) = 12</div>",
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
        ["4\\left(y-2\\right)"],
        ["4\\left(\\left(\\right)-2\\right)"],
        ["y"],
        ["5"],
      ],
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
              "<div id='div_Ecuacion'class='column max-width'><b>Ecuación</b>(z / 3) + 5 = 10</div>",
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
        ["\\left(z/3\\right)+5"],
        ["\\left(\\left(\\right)/3\\right)+5"],
        ["z"],
        ["15"],
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
            inputs: [
              {
                style: {input: "mathBig max-width", span: "column max-width"},
                text: {span: "<b>Ecuación</b>"},
              },
              {
                style: {input: "displayNone", span: "column max-width"},
                text: {span: "<b>Fórmula</b>5x + 2"},
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
      conditions: [["5x+2=17"], ["5\\left(\\right)+2"], ["x"]],
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
                text: {span: "<b>Operación</b> 7 ( ) - 3"},
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
                text: {span: "<b>Incógnita</b> w "},
              },
              {
                style: {input: "displayNone", span: "tdNotline column"},
                text: {span: "<b>Solución</b> 4"},
              },
            ],
          },
        ],
      ],
      conditions: [["7w-3=25"], ["7w-3"]],
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
