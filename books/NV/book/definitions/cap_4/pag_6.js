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
              "<p class='column'><b>Posible Solución</b> x = 2</p> <p class='column'><b class=''>Ecuación</b> 3x + 2 = 4</p> ",
          },
        ],
        [
          {
            style: {td: "tdNotlineBottom", span: "column"},
            value:
              "<p><b>Procedimiento</b><div class='grid-row'><p>Se evalúa</p><span class='gap-10'><b class='borderStyle'>3x + 2 en x = 2</b><p class='borderStyle'>3 . 2 + 2 = 6 + 2 = 8</p></span></p></div> <b>La evaluación da 8 en vez de 4</b></p>",
          },
        ],
        [
          {
            style: {td: "tdNotline", span: "column"},
            value: "<b>Conclusión</b><p>No es solución</p>",
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
            style: {td: "tdNotlineBottom", span: "flex-row"},
            value:
              "<p class='column'><b>Posible Solución</b> x = 2</p> <p class='column'><b class=''>Ecuación</b> 3x - 2 = 4</p> ",
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
            value: "<p><b>Procedimiento</b></p>",
            inputs: [{style: {input: "mathBig max-width"}}],
          },
        ],
        [
          {
            tag: "form",
            style: {
              form: "formSelectInput column",
              td: "tdNotline",
              span: "column",
            },
            value: "<b>Conclusión</b> ¿Es Solución?",
            checks: [
              {
                maxElementCheck: 1,
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
          },
        ],
      ],
      conditions: [["3\\cdot2-2=4"], {checks: ["Sí"]}],
      engine: engineTable,
    },
    artifact_2: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            style: {td: "tdNotlineBottom", span: "flex-row"},
            value:
              "<p class='column'><b>Posible Solución</b> x = 4</p> <p class='column'><b>Ecuación</b> 5x + 2 = 24</p> ",
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
            value: "<p><b>Procedimiento</b></p>",
            inputs: [{style: {input: "mathBig max-width"}}],
          },
        ],
        [
          {
            tag: "form",
            style: {
              form: "formSelectInput column",
              td: "tdNotline",
              span: "column",
            },
            value: "<b>Conclusión</b> ¿Es Solución?",
            checks: [
              {
                maxElementCheck: 1,
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
          },
        ],
      ],
      conditions: [["5\\cdot4+2=22"], {checks: ["No"]}],
      engine: engineTable,
    },
    artifact_3: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            style: {td: "tdNotlineBottom", span: "flex-row"},
            value:
              "<p class='column'><b>Posible Solución</b>y = 3</p> <p class='column'><b>Ecuación</b> 3y - 1 = 14</p> ",
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
            value: "<p><b>Procedimiento</b></p>",
            inputs: [{style: {input: "mathBig max-width"}}],
          },
        ],
        [
          {
            tag: "form",
            style: {
              form: "formSelectInput column",
              td: "tdNotline",
              span: "column",
            },
            value: "<b>Conclusión</b> ¿Es Solución?",
            checks: [
              {
                maxElementCheck: 1,
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
          },
        ],
      ],
      conditions: [["3\\cdot3-1=8"], {checks: ["No"]}],
      engine: engineTable,
    },
    artifact_4: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            style: {
              form: "formSelectInput column",
              td: "tdNotlineBottom",
              span: "column",
            },
            value: "<p>¿Cuál es la fórmula de la ecuación <br> 3x - 2 = 4?</p>",
            inputs: [{style: {input: "mathBig max-width"}}],
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
            value: "<p>¿Cuál es la fórmula de la ecuación <br> 3y - 2 = 4?</p>",
            inputs: [{style: {input: "mathBig max-width"}}],
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
            value:
              "<p>En la ecuación 4y + 4 = 5, ¿Con que letra se designa la incóngnita?</p>",
            inputs: [{style: {input: "mathBig max-width"}}],
          },
        ],
      ],
      conditions: [["3x-2"], ["3y-2"], ["y"]],
      engine: engineTable,
    },
    artifact_5: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            style: {
              form: "formSelectInput column",
              td: "tdNotlineBottom",
              span: "column",
            },
            value: "<p>¿Una fórmula tiene solución?</p>",
            checks: [
              {
                maxElementCheck: 1,
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Sí", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "A veces", input: ""},
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "No", input: ""},
                  },
                ],
              },
            ],
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
            value: "<p>¿Una Ecuación tiene solución?</p>",
            checks: [
              {
                maxElementCheck: 1,
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Sí", input: ""},
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "A veces", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "No", input: ""},
                  },
                ],
              },
            ],
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
            value:
              "<p>En la ecuación 5 = 3x - 2 ¿De qué lado de la igualdad está la fórmula?</p>",
            inputs: [{style: {input: "mathBig max-width"}}],
          },
        ],
      ],
      conditions: [
        {checks: ["Sí"]},
        {checks: ["A veces"]},
        ["dere\\ch o", "dere\\ch a"],
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
