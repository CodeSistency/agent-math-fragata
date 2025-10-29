

const def = {
  scrollNav:{lexico: 'Recuerde que si la suma o resta no lleva paréntesis, se hace por la reglas de prioridad el producto o la división primero. Ponga paréntesis (en caso de necesidad) para que dé el número indicado.'},
  artifacts: {
    artifact_1: {
      artifactClass:"artifact-big-very-min",
        body:
        [[{
          tag: "form", style: { form: "formFlex" },
          selects: [
            { default: [{ valor: 'selecciona' }, { valor: '3 · 4 / 2' }, { valor: '3 · (4 / 2)' }, { valor: '2 / 4 · 3' }, { valor: '2 / (4 · 3)' }], style: { select: "selectClaseDos" } },

          ]
        }, "6"

        ],
        [{
          tag: "form", style: { form: "formFlex" },
          selects: [
            { default: [{ valor: 'selecciona' }, { valor: '13 + 2 - 1' }, { valor: '13 + (2 - 1)' }, { valor: '13 + (-2 - 1)' }, { valor: '13 + 1 - 2' }], style: { select: "selectClaseDos" } },

          ]
        }, "14"

        ],
        ],

      conditions: [

        ["3 · 4 / 2", "3 · (4 / 2)"],


        ["13 + 2 - 1",'13 + (2 - 1)'],

      ],
      engine: engineTable,
    },

    artifact_2: {
      artifactClass:"artifact-big-very-min",
      body:
        [[{
          tag: "form", style: { form: "formFlex" },
          selects: [
            { default: [{ valor: 'selecciona' }, { valor: '11 · 3 + 2' }, { valor: '11 · (3 + 2)' }, { valor: '11 · (3 - 2)' }, { valor: '11 · 3 - 2' }], style: { select: "selectClaseDos" } },

          ]
        }, "35"

        ],
        [{
          tag: "form", style: { form: "formFlex" },
          selects: [
            { default: [{ valor: 'selecciona' }, { valor: '12 - 10 - 1' }, { valor: '12 - (-10 - 1)' }, { valor: '12 - (10 - 1)' }, { valor: '-12 -10 - 1' }], style: { select: "selectClaseDos" } },

          ]
        }, "1"

        ],
        ],

      conditions: [

        ["11 · 3 + 2"],
        ["12 - 10 - 1"],

      ],
      engine: engineTable,
    },

    artifact_3: {
      artifactClass:"artifact-big-very-min",
      body:
        [[{
          tag: "form", style: { form: "formFlex" },
          selects: [
            { default: [{ valor: 'selecciona' }, { valor: '12 - 10 - 1' }, { valor: '12 - (-10 - 1)' }, { valor: '12 - (10 - 1)' }, { valor: '-12 - 10 - 1' }], style: { select: "selectClaseDos" } },

          ]
        }, "3"

        ],
        [{
          tag: "form", style: { form: "formFlex" },
          selects: [
            { default: [{ valor: 'selecciona' }, { valor: '27 / 9 / 3' }, { valor: '27 / (9 / 3)' }, { valor: '27 - 9 / 3' }, { valor: '27 / 9 - 3' }], style: { select: "selectClaseDos" } },

          ]
        }, "1"

        ],
        ],

      conditions: [
        ["12 - (10 - 1)"],
        ["27 / 9 / 3"],
      ],
      engine: engineTable,
    },

    artifact_4: {
      artifactClass:"artifact-big-very-min",
      body:
        [[{
          tag: "form", style: { form: "formFlex" },
          selects: [
            { default: [{ valor: 'selecciona' }, { valor: '(11 + 2) · 3' }, { valor: '11 + 2 · 3' }, { valor: '11 + (3 + 2)' }, { valor: '(11 · 2) · 3' }], style: { select: "selectClaseDos" } },

          ]
        }, "39"

        ],
        [{
          tag: "form", style: { form: "formFlex" },
          selects: [
            { default: [{ valor: 'selecciona' }, { valor: '(11 - 2) · 3' }, { valor: '11 - 2 · 3' }, { valor: '(11 · 2) · 3' }, { valor: '11 · 2 + 3' }], style: { select: "selectClaseDos" } },

          ]
        }, "27"

        ],
        ],

      conditions: [

        ["(11 + 2) · 3"],
        ["(11 - 2) · 3"],

      ],
      engine: engineTable,
    },

    artifact_5: {
      artifactClass:"artifact-big-very-min",
      body:
        [[{
          tag: "form", style: { form: "formFlex" },
          selects: [
            { default: [{ valor: 'selecciona' }, { valor: '20 / 2 / 2' }, { valor: '20 / (2 / 2)' }, { valor: '20 - (2 · 2)' }, { valor: '20 + (2 - 2)' }], style: { select: "selectClaseDos" } },

          ]
        }, "5"

        ],
        [{
          tag: "form", style: { form: "formFlex" },
          selects: [
            { default: [{ valor: 'selecciona' }, { valor: '20 / 2 / 2' }, { valor: '20 / (2 / 2)' }, { valor: '20 - (2 · 2)' }, { valor: '20 · (2 - 2)' }], style: { select: "selectClaseDos" } },

          ]
        }, "20"

        ],
        ],

      conditions: [

        ["20 / 2 / 2"],
        ["20 / (2 / 2)"],

      ],
      engine: engineTable,
    },

    artifact_6: {
      artifactClass:"artifact-big-very-min",
      body:
        [[{
          tag: "form", style: { form: "formFlex" },
          selects: [
            { default: [{ valor: 'selecciona' }, { valor: '11 - 2 · 3' }, { valor: '(11 - 2) · 3' }, { valor: '11 - 2 - 3' }], style: { select: "selectClaseDos" } },

          ]
        }, "5"

        ],
        [{
          tag: "form", style: { form: "formFlex" },
          selects: [
            { default: [{ valor: 'selecciona' }, { valor: '12 - 6 - 6' }, { valor: '12 - (6 - 6)' }, { valor: '12 + (- 6 - 6)' }], style: { select: "selectClaseDos" } },

          ]
        }, "12"

        ],
        ],

      conditions: [

        ["11 - 2 · 3"],
        ["12 - (6 - 6)"],

      ],
      engine: engineTable,
    },
    artifact_raiting:{
      parent:"scroll-container",
      questions:{
        question_1:{
          value:"¿Fue fácil?",
        },
       
      },
      engine: EngineOwner
    } ,

  }
};




const contentMain = new CreateView(def);

