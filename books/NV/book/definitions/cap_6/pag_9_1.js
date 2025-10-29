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
                text: {span: "12 / ("},
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
          " 3 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-4"], ["-3"]],
      engine: engineTable,
    },
    artifact_2: {
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
          " 4 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["3"], ["4"]],
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
                text: {span: ") / 13"},
              },
            ],
          },
          "-",
        ],
        [
          " 13 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-1"], ["-13"]],
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
                text: {span: "-75 / ("},
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
          " 3 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["25"], ["-3"]],
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
                text: {span: "-75 / ("},
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
          " 3 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["-25"], ["3"]],
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
                text: {span: ") / -7"},
              },
            ],
          },
          "-",
        ],
        [
          " 7 ",
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["1"], ["-7"]],
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
