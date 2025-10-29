const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      artifactClass: "artifact-big",
      body: [
        [
          {
            tag: "form",
            value:
              "<p id='p1' class='column gap-0'> <span id='span3' class='spanTableCheck' > <b>Expresión</b> 7 - 2 + 3 - 6</span> <span id='span1' class='spanTableCheck' ><b>¿Cuántas Operaciones Hay?</b></span> <span id='span2' class='spanTableCheck'> <b>¿Hay Paréntesis?</b></span> </p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline p-0"},
            checks: [
              {
                maxElementCheck: 2,
                parent: "span1",
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Sumas", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Restas", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Multiplicaciones", input: ""},
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Divisiones", input: ""},
                  },
                ],
              },
            ],
            selects: [
              {
                parent: "span2",
                default: [{valor: "selecciona"}, {valor: "si"}, {valor: "no"}],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
      ],
      conditions: [{checks: ["Sumas", "Restas"]}, ["no"]],
      engine: engineTable,
    },
    artifact_2: {
      artifactClass: "artifact-big",
      body: [
        [
          {
            tag: "form",
            value:
              "<p id='p1' class='column gap-0'> <span id='span3' class='spanTableCheck' > <b>Expresión</b> 7 - (2 + 3) - 6</span> <span id='span1' class='spanTableCheck' ><b>¿Cuántas Operaciones Hay?</b></span> <span id='span2' class='spanTableCheck'> <b>¿Hay Paréntesis?</b></span> </p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline p-0"},
            checks: [
              {
                maxElementCheck: 2,
                parent: "span1",
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Sumas", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Restas", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Multiplicaciones", input: ""},
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Divisiones", input: ""},
                  },
                ],
              },
            ],
            selects: [
              {
                parent: "span2",
                default: [{valor: "selecciona"}, {valor: "si"}, {valor: "no"}],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
      ],
      conditions: [{checks: ["Sumas", "Restas"]}, ["si"]],
      engine: engineTable,
    },
    artifact_3: {
      artifactClass: "artifact-big",
      body: [
        [
          {
            tag: "form",
            value:
              "<p id='p1' class='column gap-0'> <span id='span3' class='spanTableCheck' > <b>Expresión</b> 7 / ((2 + 8) - 6)</span> <span id='span1' class='spanTableCheck' ><b>¿Cuántas Operaciones Hay?</b></span> <span id='span2' class='spanTableCheck'> <b>¿Hay Paréntesis?</b></span> </p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline p-0"},
            checks: [
              {
                maxElementCheck: 3,
                parent: "span1",
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Sumas", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Restas", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Multiplicaciones", input: ""},
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Divisiones", input: ""},
                    correctResponce: true,
                  },
                ],
              },
            ],
            selects: [
              {
                parent: "span2",
                default: [{valor: "selecciona"}, {valor: "si"}, {valor: "no"}],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
      ],
      conditions: [{checks: ["Sumas", "Restas", "Divisiones"]}, ["si"]],
      engine: engineTable,
    },
    artifact_4: {
      artifactClass: "artifact-big",
      body: [
        [
          {
            tag: "form",
            value:
              "<p id='p1' class='column gap-0'> <span id='span3' class='spanTableCheck' > <b>Expresión</b> (7 + x)/(8 - 6)</span> <span id='span1' class='spanTableCheck' ><b>¿Cuántas Operaciones Hay?</b></span> <span id='span2' class='spanTableCheck'> <b>¿Hay Paréntesis?</b></span> </p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline p-0"},
            checks: [
              {
                maxElementCheck: 3,
                parent: "span1",
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Sumas", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Restas", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Multiplicaciones", input: ""},
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Divisiones", input: ""},
                    correctResponce: true,
                  },
                ],
              },
            ],
            selects: [
              {
                parent: "span2",
                default: [{valor: "selecciona"}, {valor: "si"}, {valor: "no"}],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
      ],
      conditions: [{checks: ["Sumas", "Restas", "Divisiones"]}, ["si"]],
      engine: engineTable,
    },
    artifact_5: {
      artifactClass: "artifact-big",
      body: [
        [
          {
            tag: "form",
            value:
              "<p id='p1' class='column gap-0'> <span id='span3' class='spanTableCheck' > <b>Expresión</b> 7 + (x / (8 - 6))</span> <span id='span1' class='spanTableCheck' ><b>¿Cuántas Operaciones Hay?</b></span> <span id='span2' class='spanTableCheck'> <b>¿Hay Paréntesis?</b></span> </p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline p-0"},
            checks: [
              {
                maxElementCheck: 3,
                parent: "span1",
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Sumas", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Restas", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Multiplicaciones", input: ""},
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Divisiones", input: ""},
                    correctResponce: true,
                  },
                ],
              },
            ],
            selects: [
              {
                parent: "span2",
                default: [{valor: "selecciona"}, {valor: "si"}, {valor: "no"}],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
      ],
      conditions: [{checks: ["Sumas", "Restas", "Divisiones"]}, ["si"]],
      engine: engineTable,
    },
    artifact_6: {
      artifactClass: "artifact-big",
      body: [
        [
          {
            tag: "form",
            value:
              "<p id='p1' class='column gap-0'> <span id='span3' class='spanTableCheck' > <b>Expresión</b> 3 ‧ 45 - (30 - 15)</span> <span id='span1' class='spanTableCheck' ><b>¿Cuántas Operaciones Hay?</b></span> <span id='span2' class='spanTableCheck'> <b>¿Hay Paréntesis?</b></span> </p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline p-0"},
            checks: [
              {
                maxElementCheck: 2,
                parent: "span1",
                inputs: [
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Sumas", input: ""},
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Restas", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Multiplicaciones", input: ""},
                    correctResponce: true,
                  },
                  {
                    style: {input: "inputTableCheck"},
                    value: {label: "Divisiones", input: ""},
                  },
                ],
              },
            ],
            selects: [
              {
                parent: "span2",
                default: [{valor: "selecciona"}, {valor: "si"}, {valor: "no"}],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
      ],
      conditions: [{checks: ["Restas", "Multiplicaciones"]}, ["si"]],
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
