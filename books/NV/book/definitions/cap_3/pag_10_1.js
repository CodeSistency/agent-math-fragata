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
              "<p id='p1' class='p-10 column'><b>Pregunta</b> ¿Cúal es la operación inversa de sumarle algo a ocho? Respuesta en castellano:</p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline"},
            selects: [
              {
                parent: "p1",
                default: [
                  {valor: "selecciona"},
                  {valor: "ocho menos algo"},
                  {valor: "ocho más algo"},
                  {valor: "algo por ocho"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
            inputs: [
              {
                text: {span: "<b>Operación</b>"},
                style: {input: "mathBig rounde", span: "spanTable"},
              },
              {
                text: {span: "<b>Inversa</b>"},
                style: {input: "mathBig rounde", span: "spanTable"},
              },
            ],
          },
        ],
      ],
      conditions: [
        ["8+\\left(\\right)"],
        ["8-\\left(\\right)"],
        ["ocho menos algo"],
      ],
      engine: engineTable,
    },
    artifact_2: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              "<p id='p1' class='p-10 column'><b>Pregunta</b> ¿Cúal es la operación inversa de dividir cuarenta entre algo? Respuesta en castellano: <b>Ojo!</b></p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline"},
            selects: [
              {
                parent: "p1",
                default: [
                  {valor: "selecciona"},
                  {valor: "cuarenta por algo"},
                  {valor: "cuarenta más algo"},
                  {valor: "cuarenta entre algo"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
            inputs: [
              {
                text: {span: "<b>Operación</b>"},
                style: {input: "mathBig rounde", span: "spanTable"},
              },
              {
                text: {span: "<b>Inversa</b>"},
                style: {input: "mathBig rounde", span: "spanTable"},
              },
            ],
          },
        ],
      ],
      conditions: [
        [
          "\\frac{40}{\\left(\\right)}",
          "40/\\left(\\right)",
          "40\\div\\left(\\right)",
        ],
        [
          "\\frac{40}{\\left(\\right)}",
          "40/\\left(\\right)",
          "40\\div\\left(\\right)",
        ],
        ["cuarenta entre algo"],
      ],
      engine: engineTable,
    },
    artifact_3: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              "<p id='p1' class='p-10 column'><b>Pregunta</b> ¿Cúal es la operación inversa de dividir algo entre cuarenta? Respuesta en castellano:</p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline"},
            selects: [
              {
                parent: "p1",
                default: [
                  {valor: "selecciona"},
                  {valor: "cuarenta por algo"},
                  {valor: "algo mas cuarenta"},
                  {valor: "algo por cuarenta"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
            inputs: [
              {
                text: {span: "<b>Operación</b>"},
                style: {input: "mathBig rounde", span: "spanTable"},
              },
              {
                text: {span: "<b>Inversa</b>"},
                style: {input: "mathBig rounde", span: "spanTable"},
              },
            ],
          },
        ],
      ],
      conditions: [
        [
          "\\frac{40}{\\left(\\right)}",
          "\\frac{\\left(\\right)}{40}",
          "\\left(\\right)/40",
          "\\left(\\right)\\div40",
        ],
        ["40\\cdot\\left(\\right)", "40\\left(\\right)"],
        ["cuarenta por algo"],
      ],
      engine: engineTable,
    },
    artifact_4: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              "<p id='p1' class='p-10 column'><b>Pregunta</b> ¿Cúal es la operación inversa de siete menos algo? Respuesta en castellano:</p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline"},
            selects: [
              {
                parent: "p1",
                default: [
                  {valor: "selecciona"},
                  {valor: "algo por siete"},
                  {valor: "siete menos algo"},
                  {valor: "siete más algo"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
            inputs: [
              {
                text: {span: "<b>Operación</b>"},
                style: {input: "mathBig rounde", span: "spanTable"},
              },
              {
                text: {span: "<b>Inversa</b>"},
                style: {input: "mathBig rounde", span: "spanTable"},
              },
            ],
          },
        ],
      ],
      conditions: [
        ["7-\\left(\\right)"],
        ["7+\\left(\\right)"],
        ["siete más algo"],
      ],
      engine: engineTable,
    },
    artifact_5: {
      artifactClass: "artifact-min",
      trClass: "tdNotFirtsLineTop tr",
      body: [
        [
          {
            tag: "form",
            value: "¿Cúal es la operación inversa de multiplicar algo por 100?",
            style: {form: "formInputBig"},
            style: {td: "tdNotlineBottom", form: "formMeduim "},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "100 por algo"},
                  {valor: "algo entre 100"},
                  {valor: "100 más algo"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            value: "¿Cúal es la operación inversa de dividir uno entre algo?",
            style: {form: "formInputBig"},
            style: {td: "tdNotlineBottom", form: "formMeduim "},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "uno por algo"},
                  {valor: "uno entre algo"},
                  {valor: "algo por uno"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            value: "¿Cúal es la operación inversa de restarle algo a diez?",
            style: {form: "formInputBig"},
            style: {td: "tdNotlineBottom", form: "formMeduim "},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "diez más algo"},
                  {valor: "algo más diez"},
                  {valor: "diez menos algo"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
      ],
      conditions: [["algo entre 100"], ["uno entre algo"], ["diez más algo"]],
      engine: engineTable,
    },
    artifact_6: {
      artifactClass: "artifact-min",
      trClass: "tdNotFirtsLineTop tr",
      body: [
        [
          {
            tag: "form",
            value: "¿Cúal es la operación inversa de dividir trece entre algo?",
            style: {form: "formInputBig"},
            style: {td: "tdNotlineBottom", form: "formMeduim "},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "trece más algo"},
                  {valor: "trece por algo"},
                  {valor: "trece entre algo"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            value: "¿Cúal es la operación inversa de restar nueve?",
            style: {form: "formInputBig"},
            style: {td: "tdNotlineBottom", form: "formMeduim "},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "algo por nueve"},
                  {valor: "sumar nueve"},
                  {valor: "restar nueve"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            value: "¿Cúal es la operación inversa de sumar quince?",
            style: {form: "formInputBig"},
            style: {td: "tdNotlineBottom", form: "formMeduim "},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "multiplicar quince"},
                  {valor: "restar quince"},
                  {valor: "sumar quince"},
                ],
                style: {select: "selectClase mathBig"},
              },
            ],
          },
        ],
      ],
      conditions: [["trece entre algo"], ["sumar nueve"], ["restar quince"]],
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
