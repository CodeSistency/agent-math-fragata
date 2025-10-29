const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
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
                text: {span: ") · 6"},
              },
            ],
          },
          "-",
        ],
        [
          " 54 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-9"], ["-54"]],
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
                text: {span: "8 · ("},
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
          " 54 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-9"], ["-54"]],
      engine: engineTable,
    },
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
                text: {span: "-5 · ("},
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
          " 45 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["9"], ["-45"]],
      engine: engineTable,
    },
    artifact_4: {
      border: true,
      body: [
        [
          {
            tag: "form",
            style: {form: "formRowCap6"},
            inputs: [
              {
                style: {input: "mathBigCap6", span: "spanRowCap6 border-none"},
                text: {span: "-5 · ("},
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
          " 45 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-9"], ["45"]],
      engine: engineTable,
    },
    artifact_5: {
      border: true,
      body: [
        [
          {
            tag: "form",
            style: {form: "formRowCap6"},
            inputs: [
              {
                style: {input: "mathBigCap6", span: "spanRowCap6 border-none"},
                text: {span: "5 · ("},
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
          " 45 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-9"], ["-45"]],
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
