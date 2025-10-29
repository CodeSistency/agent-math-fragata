const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      body: [
        [
          {value: "18/3", style: {td: "width-100"}},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
        [
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["dos +"], ["3"], ["3"]],
      engine: engineTable,
    },
    artifact_2: {
      body: [
        [
          {value: "-18/3", style: {td: "width-100"}},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
        [
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["un-"], ["3"], ["-3"]],
      engine: engineTable,
    },
    artifact_3: {
      body: [
        [
          {value: "-18/-9", style: {td: "width-100"}},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
        [
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["dos-"], ["2"], ["2"]],
      engine: engineTable,
    },
    artifact_4: {
      body: [
        [
          {value: "16/-4", style: {td: "width-100"}},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
        [
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["un-"], ["4"], ["-4"]],
      engine: engineTable,
    },
    artifact_5: {
      body: [
        [
          {value: "16/-2", style: {td: "width-100"}},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
        [
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["un-"], ["8"], ["-8"]],
      engine: engineTable,
    },
    artifact_6: {
      body: [
        [
          {value: "-16/-8", style: {td: "width-100"}},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
        [
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
          {tag: "form", inputs: [{style: {input: "mathBig", span: "spanRow"}}]},
        ],
      ],
      conditions: [["dos-"], ["2"], ["2"]],
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
