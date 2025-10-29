const def = {
  scrollNav: true,
  artifacts: {
    lexico_1: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              "<p id='p1' class='p-10 column'><b>Pregunta</b> ¿Cuál es la operación inversa de dividir entre doce? Respuesta en castellano: multiplicar 12 por algo</p><b class='p-10 mathBig2'>() / 12</b><b class='p-10 mathBig'>12 . ()</b>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline"},
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
            value:
              "<p id='p1' class='p-10 column'><b>Pregunta</b> ¿Cúal es la operación inversa de siete menos algo? Respuesta en castellano: <b>Ojo!</b></p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline"},
            selects: [
              {
                parent: "p1",
                default: [
                  {valor: "selecciona"},
                  {valor: "siete menos algo"},
                  {valor: "siete más algo"},
                  {valor: "siete por algo"},
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
    artifact_2: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              "<p id='p1' class='p-10 column'><b>Pregunta</b> ¿Cúal es la operación inversa de sumar seis a algo? Respuesta en castellano:</p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline"},
            selects: [
              {
                parent: "p1",
                default: [
                  {valor: "selecciona"},
                  {valor: "seis menos algo"},
                  {valor: "seis más algo"},
                  {valor: "seis entre algo"},
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
        ["6+\\left(\\right)"],
        ["6-\\left(\\right)"],
        ["seis menos algo"],
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
              "<p id='p1' class='p-10 column'><b>Pregunta</b> ¿Cúal es la operación inversa de multiplicar cuarenta por algo? Respuesta en castellano:</p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline"},
            selects: [
              {
                parent: "p1",
                default: [
                  {valor: "selecciona"},
                  {valor: "algo entre cuarenta"},
                  {valor: "cuarenta entre algo"},
                  {valor: "cuarenta por algo"},
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
        ["40\\cdot\\left(\\right)"],
        ["\\frac{\\left(\\right)}{40}", "\\left(\\right)/40"],
        ["algo entre cuarenta"],
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
              "<p id='p1' class='p-10 column'><b>Pregunta</b> ¿Cúal es la operación inversa de restarle a nueve algo? Respuesta en castellano: <b>Ojo!</b></p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline"},
            selects: [
              {
                parent: "p1",
                default: [
                  {valor: "selecciona"},
                  {valor: "nueve menos algo"},
                  {valor: "nueve más algo"},
                  {valor: "nueve por algo"},
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
        ["9-\\left(\\right)"],
        ["9+\\left(\\right)"],
        ["nueve más algo"],
      ],
      engine: engineTable,
    },
    artifact_5: {
      artifactClass: "artifact-min",
      body: [
        [
          {
            tag: "form",
            value:
              "<p id='p1' class='p-10 column'><b>Pregunta</b> ¿Cúal es la operación inversa de cinco más algo? Respuesta en castellano:</p>",
            style: {form: "formInputBig"},
            style: {form: "formSelectInput", td: "tdNotline"},
            selects: [
              {
                parent: "p1",
                default: [
                  {valor: "selecciona"},
                  {valor: "cinco menos algo"},
                  {valor: "cinco más algo"},
                  {valor: "algo por cinco"},
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
        ["5+\\left(\\right)"],
        ["5-\\left(\\right)"],
        ["cinco menos algo"],
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
