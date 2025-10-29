const textUtils = {
  artifacts: {
    lexico_1: {
      engine: EngineOwner,
      styleContainer: "note",
    },
  },
};

const def = {
  scrollNav: true,
  artifacts: {
    example_1: {
      body: [
        ["Número faltante", "Signo de la simplificada"],
        ["Tamaño del simplificado", "Trayectoria simplificada"],
      ],
      engine: engineTable,
      prueba_t: true,
      parent: "lexico_1",
    },
    /*nuevos*/
    artifact_1: {
      border: true,
      body: [
        [
          {
            tag: "form",
            style: {form: "formRowCap6"},
            inputs: [
              {
                style: {input: "mathBigCap6", span: "spanRowCap6 border-none"},
                text: {span: "("},
              },
              {
                style: {input: "displayNone", span: "spanRowCap6"},
                text: {span: ") · 3"},
              },
            ],
          },
          "+",
        ],
        [
          " 6 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["2"], ["6"]],
      engine: engineTable,
    },
    artifact_2: {
      border: true,
      body: [
        [
          {
            tag: "form",
            style: {form: "formRowCap6"},
            inputs: [
              {
                style: {input: "mathBigCap6", span: "spanRowCap6 border-none"},
                text: {span: "("},
              },
              {
                style: {input: "displayNone", span: "spanRowCap6"},
                text: {span: ") · 3"},
              },
            ],
          },
          "-",
        ],
        [
          " 6 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-2"], ["-6"]],
      engine: engineTable,
    },
    /**/
    artifact_3: {
      border: true,
      body: [
        [
          {
            tag: "form",
            style: {form: "formRowCap6"},
            inputs: [
              {
                style: {input: "mathBigCap6", span: "spanRowCap6 border-none"},
                text: {span: "-2 · ("},
              },
              {
                style: {input: "displayNone", span: "spanRowCap6"},
                text: {span: ")"},
              },
            ],
          },
          "+",
        ],
        [
          " 10 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-5"], ["10"]],
      engine: engineTable,
    },
    artifact_4: {
      body: [
        [
          {
            tag: "form",
            style: {form: "formRowCap6"},
            inputs: [
              {
                style: {input: "mathBigCap6", span: "spanRowCap6 border-none"},
                text: {span: "("},
              },
              {
                style: {input: "displayNone", span: "spanRowCap6"},
                text: {span: ") · 2"},
              },
            ],
          },
          "+",
        ],
        [
          " 16 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["8"], ["16"]],
      engine: engineTable,
    },
    artifact_5: {
      body: [
        [
          {
            tag: "form",
            style: {form: "formRowCap6"},
            inputs: [
              {
                style: {input: "mathBigCap6", span: "spanRowCap6 border-none"},
                text: {span: "4 · ("},
              },
              {
                style: {input: "displayNone", span: "spanRowCap6"},
                text: {span: ")"},
              },
            ],
          },
          "+",
        ],
        [
          " 12 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["3"], ["12"]],
      engine: engineTable,
    },
    artifact_raiting: {
      parent: "scroll-container",
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
