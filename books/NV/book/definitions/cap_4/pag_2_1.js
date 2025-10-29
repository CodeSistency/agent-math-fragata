const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>()-15</p></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "p-10"},
          },
        ],
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Tipo</b></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput column", td: "p-10"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "Sorprendente"},
                  {valor: "Difícil"},
                  {valor: "Fácil"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación Inversa</b></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "p-10"},
            checks: [
              {
                maxElementCheck: 1,
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {
                      label: "15·()",
                      input: "",
                    },
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()-15", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "15-()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()+15", input: ""},
                    correctResponce: true,
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "15+()", input: ""},
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["fácil"], {checks: ["()+15"]}],
      engine: engineTable,
    },
    artifact_2: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>21-()</p></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "p-10"},
          },
        ],
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Tipo</b></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput column", td: "p-10"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "Sorprendente"},
                  {valor: "Difícil"},
                  {valor: "Fácil"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación Inversa</b></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "p-10"},
            checks: [
              {
                maxElementCheck: 1,
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {
                      label: "()+21",
                      input: "",
                    },
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()·21", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "21+()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "21-()", input: ""},
                    correctResponce: true,
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()-21", input: ""},
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["sorprendente"], {checks: ["21-()"]}],
      engine: engineTable,
    },
    artifact_3: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>()+42</p></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "p-10"},
          },
        ],
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Tipo</b></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput column", td: "p-10"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "Sorprendente"},
                  {valor: "Difícil"},
                  {valor: "Fácil"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación Inversa</b></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "p-10"},
            checks: [
              {
                maxElementCheck: 1,
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {
                      label: "42+()",
                      input: "",
                    },
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "42·()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "42-()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()-42", input: ""},
                    correctResponce: true,
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()·42", input: ""},
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["fácil"], {checks: ["()-42"]}],
      engine: engineTable,
    },
    artifact_4: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>13+()</p></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "p-10"},
          },
        ],
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Tipo</b></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput column", td: "p-10"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "Sorprendente"},
                  {valor: "Difícil"},
                  {valor: "Fácil"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación Inversa</b></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "p-10"},
            checks: [
              {
                maxElementCheck: 1,
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {
                      label: "13-()",
                      input: "",
                    },
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()-13", input: ""},
                    correctResponce: true,
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "13+()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()·13", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()+13", input: ""},
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["difícil"], {checks: ["()-13"]}],
      engine: engineTable,
    },
    artifact_5: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>13-()</p></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "p-10"},
          },
        ],
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Tipo</b></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput column", td: "p-10"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "Sorprendente"},
                  {valor: "Difícil"},
                  {valor: "Fácil"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación Inversa</b></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "p-10"},
            checks: [
              {
                maxElementCheck: 1,
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {
                      label: "13-()",
                      input: "",
                    },
                    correctResponce: true,
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()-13", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "13+()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()·13", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()+13", input: ""},
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["sorprendente"], {checks: ["13-()"]}],
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
