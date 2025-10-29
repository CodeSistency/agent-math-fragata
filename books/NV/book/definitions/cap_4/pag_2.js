const textUtils = {
  artifacts: {
    lexico_1: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>2·()</p></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "p-10"},
          },
        ],
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Tipo</b><p>Difícil</p></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "p-10"},
          },
        ],
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación Inversa</b><div style="display:flex; gap:25px;"><span style="padding:5px;">2/()</span> <span class="checkTable">()/2</span> <span style="padding:5px;">()+2</span> <span style="padding:5px;">()-2</span> <span style="padding:5px;">()·2</span></div></div>',
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "p-10"},
          },
        ],
      ],
      engine: engineTable,
    },
  },
};

const def = {
  scrollNav: {
    lexico:
      "Complete clasificando según el tipo y seleccionando la operación correspondiente.",
  },
  artifacts: {
    artifact_1: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>10 / ()</p></div>',
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
                    value: {label: "10·()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()·10", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()/10", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "10-()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "10/()", input: ""},
                    correctResponce: true,
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["sorprendente"], {checks: ["10/()"]}],
      engine: engineTable,
    },
    artifact_2: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>8 + ()</p></div>',
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
                      label: "8+()",
                      input: "",
                    },
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "8-()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()/8", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "8·()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()-8", input: ""},
                    correctResponce: true,
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["difícil"], {checks: ["()-8"]}],
      engine: engineTable,
    },
    artifact_3: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>16+()</p></div>',
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
                      label: "16+()",
                      input: "",
                    },
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "16-()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()+16", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "16·()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()-16", input: ""},
                    correctResponce: true,
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["difícil"], {checks: ["()-16"]}],
      engine: engineTable,
    },
    artifact_4: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>7·()</p></div>',
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
                      label: "()+7",
                      input: "",
                    },
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()/7", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "7·()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "7/()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()·7", input: ""},
                    correctResponce: true,
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["difícil"], {checks: ["()/7"]}],
      engine: engineTable,
    },
    artifact_5: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>()·11</p></div>',
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
                      label: "11·()",
                      input: "",
                    },
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "11/()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()-11", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "11+()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()/11", input: ""},
                    correctResponce: true,
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["fácil"], {checks: ["()/11"]}],
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
const contentMain = new CreateView(textUtils);
contentMain.initVIew(def);
