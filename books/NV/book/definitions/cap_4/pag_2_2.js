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
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>()-13</p></div>',
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
                    correctResponce: true,
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["fácil"], {checks: ["()+13"]}],
      engine: engineTable,
    },
    artifact_2: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>()+13</p></div>',
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
                    correctResponce: true,
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["fácil"], {checks: ["()-13"]}],
      engine: engineTable,
    },
    artifact_3: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>9·()</p></div>',
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
                      label: "()·9",
                      input: "",
                    },
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "9/()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "9-()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()/9", input: ""},
                    correctResponce: true,
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()+9", input: ""},
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["difícil"], {checks: ["()/9"]}],
      engine: engineTable,
    },
    artifact_4: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>()/18</p></div>',
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
                      label: "()·18",
                      input: "",
                    },
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "18·()", input: ""},
                    correctResponce: true,
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()/18", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()+18", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "18/()", input: ""},
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["fácil"], {checks: ["()·18"]}],
      engine: engineTable,
    },
    artifact_5: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>18/()</p></div>',
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
                      label: "18·()",
                      input: "",
                    },
                    correctResponce: true,
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()·18", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()/18", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()-18", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "18/()", input: ""},
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["sorprendente"], {checks: ["18/()"]}],
      engine: engineTable,
    },

    artifact_6: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              '<div style="display:flex;gap: 8px;flex-direction: column;"><b>Operación</b><p>()·45</p></div>',
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
                      label: "45+()",
                      input: "",
                    },
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()-45", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "45·()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "45-()", input: ""},
                  },

                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "()/45", input: ""},
                    correctResponce: true,
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["fácil"], {checks: ["()/45"]}],
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
