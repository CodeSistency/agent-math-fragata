const def = {
  scrollNav: true,
  artifacts: {
    example_1: {
      body: [
        ["División", "Signo de los resultado"],
        ["Tamaño del resultado", "Resultado"],
      ],
      engine: engineTable,
    },
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
                text: {span: ") / 6"},
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
      conditions: [["1"], ["6"]],
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
                text: {span: ") / 6"},
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
      conditions: [["-1"], ["-6"]],
      engine: engineTable,
    },
    artifact_3: {
      body: [
        [
          {
            tag: "form",
            style: {form: "formRowCap6"},
            inputs: [
              {
                style: {input: "mathBigCap6", span: "spanRowCap6 border-none"},
                text: {span: "12 / ("},
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
          " 6 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-2"], ["6"]],
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
                text: {span: "45 / ("},
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
          " 9 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["5"], ["9"]],
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
                text: {span: "45 / ("},
              },
              {
                style: {input: "displayNone", span: "spanRowCap6"},
                text: {span: ")"},
              },
            ],
          },
          "-",
        ],
        [
          " 9 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-9"], ["-5"]],
      engine: engineTable,
    },
    artifact_6: {
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
                text: {span: ") / 9"},
              },
            ],
          },
          "-",
        ],
        [
          " 4 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-36"], ["-4"]],
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
