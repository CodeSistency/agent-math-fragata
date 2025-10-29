const def = {
  scrollNav: {
    lexico: `Adivine o dertermine "por tanteo" la solución de la ecuación.`,
  },
  artifacts: {
    artifact_1: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            style: {form: "formSelectInput column"},
            value: "5x + 4 = 24",
          },
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "x = ",
            inputs: [{style: {input: "mathSmall"}}],
          },
        ],
        [
          {
            tag: "form",
            style: {form: "formSelectInput column"},
            value: "3y - 1 = 14",
          },
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "y = ",
            inputs: [{style: {input: "mathSmall"}}],
          },
        ],
        [
          {
            tag: "form",
            style: {form: "formSelectInput column"},
            value: "3x + 2 = 8",
          },
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "x = ",
            inputs: [{style: {input: "mathSmall"}}],
          },
        ],
      ],
      conditions: [["4"], ["5"], ["2"]],
      engine: engineTable,
    },
    artifact_2: {
      artifactClass: "artifact-min",
      body: [
        [
          {value: "6 - x = 4"},
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "x = ",
            inputs: [{style: {input: "mathSmall"}}],
          },
        ],
        [
          {value: "2x - 2 = 8"},
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "x = ",
            inputs: [{style: {input: "mathSmall"}}],
          },
        ],
        [
          {value: "15 - 3z = 3"},
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "z = ",
            inputs: [{style: {input: "mathSmall"}}],
          },
        ],
      ],
      conditions: [["2"], ["5"], ["4"]],
      engine: engineTable,
    },
    artifact_3: {
      artifactClass: "artifact-min",
      body: [
        [
          {value: "7y = 21"},
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "y = ",
            inputs: [{style: {input: "mathSmall"}}],
          },
        ],
        [
          {value: "7y + 5 = 26"},
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "y = ",
            inputs: [{style: {input: "mathSmall"}}],
          },
        ],
        [
          {value: "10 - 10z = 0"},
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "z = ",
            inputs: [{style: {input: "mathSmall"}}],
          },
        ],
      ],
      conditions: [["3"], ["3"], ["1"]],
      engine: engineTable,
    },
    artifact_4: {
      artifactClass: "artifact-big",
      body: [
        [
          {
            tag: "form",
            style: {form: "formSelectInput column", td: "tdNotline borderB"},
            value: `Adivine o dertermine "por tanteo" una solución de:`,
            inputs: [
              {
                style: {input: "mathSmall", span: "formSelectInput"},
                text: {span: "<b>3x - 4 = 8</b>"},
              },
            ],
            selects: [
              {
                text: {span: "Compruebe si su respuesta es correcta"},
                default: [
                  {valor: "selecciona"},
                  {valor: "correcta"},
                  {valor: "incorrecta"},
                ],
                style: {select: "selectClase mathBig", span: "column"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {form: "formSelectInput column", td: "tdNotline"},
            value: "¿Cuál es la ecuación?",
            checks: [
              {
                maxElementCheck: 1,
                inputs: [
                  {style: {input: "inputTableCheck"}, value: {label: "2x+3"}},
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "2x+3=4"},
                    correctResponce: true,
                  },
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["4"], ["correcta"], {checks: ["2x+3=4"]}],
      engine: engineTable,
    },
    artifact_5: {
      artifactClass: "artifact-big",
      body: [
        [
          {
            tag: "form",
            style: {form: "formSelectInput letterS"},
            value: "¿Es 3 solución  de <p><b>2x - 4</b> ?</p> <br>",
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "no"}, {valor: "sí"}],
                style: {select: "selectClase mathBig", span: "column"},
              },
            ],
          },
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "<p>¿Por qué?</p>",
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "no tiene igualdad"},
                  {valor: "está restando a x"},
                  {valor: "tiene igualdad"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "¿Es 3 solución  de <p><b>2x - 4 = 1</b> ?</p> <br>",
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "no"}, {valor: "sí"}],
                style: {select: "selectClase mathBig", span: "column"},
              },
            ],
          },
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "<p>¿Por qué?</p>",
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "el resultado es 2"},
                  {valor: "está restando a x"},
                  {valor: "el resultado es 1"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "¿Es 3 solución  de <p><b>2x - 4 = 2</b>?</p> <br>",
            selects: [
              {
                default: [{valor: "selecciona"}, {valor: "no"}, {valor: "sí"}],
                style: {select: "selectClase mathBig", span: "column"},
              },
            ],
          },
          {
            tag: "form",
            style: {form: "formSelectInput"},
            value: "<p>¿Por qué?</p>",
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "el resultado es 2"},
                  {valor: "está restando a x"},
                  {valor: "el resultado es 1"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
      ],
      conditions: [
        ["no"],
        ["no tiene igualdad"],
        ["no"],
        ["el resultado es 2"],
        ["sí"],
        ["el resultado es 2"],
      ],
      engine: engineTable,
    },
    artifact_6: {
      artifactClass: "artifact-big",
      body: [
        [
          {
            tag: "form",
            style: {form: "formSelectInput column", td: "tdNotline borderB"},
            value: `<span id="span1" class="formSelectInput"><p>Entre los números 4, 5, 2 y 3. ¿Cuál de ellos es solución de dos de las siguientes ecuaciones?</p></span>`,
            checks: [
              {
                maxElementCheck: 2,
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "3x+2=6", input: ""},
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "3x+2=7", input: ""},
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "3x+2=8", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "x+1=5", input: ""},
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "x+2=5", input: ""},
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "x+3=5", input: ""},
                    correctResponce: true,
                  },
                ],
              },
            ],
            inputs: [
              {
                parent: "span1",
                style: {input: "mathSmall", span: "column-reverse"},
                text: {span: "<p>¿De cuáles ecuaciónes es solución?</p>"},
              },
            ],
          },
        ],
      ],
      conditions: [{checks: ["3x+2=8", "x+3=5"]}, ["2"]],
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
