const def = {
  scrollNav: true,
  artifacts: {
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
                text: {span: "2 · ("},
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
      conditions: [["12"], ["12"]],
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
                text: {span: "2 · ("},
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
          " 12 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-6"], ["-12"]],
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
                text: {span: "("},
              },
              {
                style: {input: "displayNone", span: "spanRowCap6"},
                text: {span: ") · 4"},
              },
            ],
          },
          "-",
        ],
        [
          " 12 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-3"], ["-12"]],
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
                text: {span: "-3 · ("},
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
          " 15 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["5"], ["-15"]],
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
                text: {span: "6 · ("},
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
          " 54 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["9"], ["54"]],
      engine: engineTable,
    },
    /**/
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
