const def = {
  scrollNav: {
    lexico: "<h2>Adivinanzas</h2>",
  },
  artifacts: {
    artifact_1: {
      artifactClass: "artifact-big-very-min",
      border: true,
      parent: "lexico-content",
      body: [
        [
          "<b>a</b> es menor que <strong>b</strong>. Los dos números son <b>5</b> y <b>3</b>.",
          {
            tag: "form",
            inputs: [
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <strong>a</strong>?"},
              },
            ],
          },
        ],
        [
          "<strong>a</strong> es menor que <strong>b</strong> y el número <strong>c</strong> esta entre <strong>a</strong> y <strong>b</strong>. Los tres números son <b>7</b>, <b>15</b> y <b>3</b>.",
          {
            tag: "form",
            inputs: [
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <strong>a</strong>?"},
              },
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <strong>b</strong>?."},
              },
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <strong>c</strong>?"},
              },
            ],
          },
        ],
      ],
      conditions: [["3"], ["3"], ["15"], ["7"]],
      engine: engineTable,
    },
    artifact_2: {
      parent: "lexico-content",
      artifactClass: "artifact-big-very-min",
      body: [
        [
          "<b>z</b> es mayor que <b>x</b>. Los dos números son <b>7</b> y <b>8</b>.",
          {
            tag: "form",
            inputs: [
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <b>z</b>?"},
              },
            ],
          },
        ],
        [
          "<b>b</b> es mayor que <b>a</b> y el número <b>c</b> es mayor que <b>b</b>. Los tres números son <b>11</b>, <b>100</b> y <b>50</b>.",
          {
            tag: "form",
            inputs: [
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <b>a</b>?"},
              },
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <b>b</b>?"},
              },
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <b>c</b>?"},
              },
            ],
          },
        ],
      ],
      conditions: [["8"], ["11"], ["50"], ["100"]],
      engine: engineTable,
    },
    artifact_3: {
      artifactClass: "artifact-big-very-min",
      parent: "lexico-content",
      body: [
        [
          "<b>6 · n</b> es <b>24</b>.",
          {
            tag: "form",
            inputs: [
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <b>n</b>?"},
              },
            ],
          },
        ],
        [
          "<b>a · b</b> es <b>40</b>. ¿Quién es <b>a</b> si <b>b</b> es 5?",
          {
            tag: "form",
            inputs: [
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <b>a</b>?"},
              },
            ],
          },
        ],
        [
          "<b>k</b> es menor que <b>f</b>. Los dos números son <b>12</b> y <b>20</b>.",
          {
            tag: "form",
            inputs: [
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <b>k</b>?"},
              },
            ],
          },
        ],
        [
          "Se sabe que <b>a<sup>e</sup> = 8</b>. Además, se sabe que la letra <b>a</b> vale <b>2</b>.",
          {
            tag: "form",
            inputs: [
              {
                style: {input: "mathSmall"},
                text: {span: "¿Cuánto vale <b>e</b>?"},
              },
            ],
          },
        ],
      ],
      conditions: [["4"], ["8"], ["12"], ["3"]],
      engine: engineTable,
    },
    artifact_4: {
      artifactClass: "artifact-big-very-min",
      parent: "lexico-content",
      body: [
        [
          "<b>m · n</b> es <b>50</b>. ¿Quién es <b>m</b> si <b>n</b> es 5?",
          {
            tag: "form",
            inputs: [
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <b>m</b>?"},
              },
            ],
          },
        ],
        [
          "<b>z</b> es mayor <b>y</b>. Los dos números son <b>17</b> y <b>28</b>.",
          {
            tag: "form",
            inputs: [
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <b>y</b>?"},
              },
            ],
          },
        ],
        [
          "Se sabe que <b>a<sup>e</sup> = 16</b>. Además, se sabe que <b>a</b> vale <b>2</b>.",
          {
            tag: "form",
            inputs: [
              {
                style: {input: "mathSmall"},
                text: {span: "¿Cuánto vale <b>e</b>?"},
              },
            ],
          },
        ],
        [
          "<strong>b</strong> es mayor que <strong>c</strong> y <strong>a</strong> mayor que <strong>b</strong>. Los tres números son 12, 100 y 21.",
          {
            tag: "form",
            inputs: [
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <strong>a</strong>?"},
              },
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <strong>b</strong>?"},
              },
              {
                style: {input: "mathSmall"},
                text: {span: "¿Quién es <strong>c</strong>?"},
              },
            ],
          },
        ],
      ],
      conditions: [["10"], ["17"], ["4"], ["100"], ["21"], ["12"]],
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
