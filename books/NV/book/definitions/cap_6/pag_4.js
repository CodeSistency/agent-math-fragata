const defBoards = {
  board_1: {
    artifact: "example_1",
    type: [
      {
        type: 1,
        message: {value: "Voltear verticalmente"},
        mathfields: [
          {value: "2", disabled: true},
          {value: "2", disabled: true},
        ],
      },
      {
        arrow: true,
        type: 1,
        message: {value: "3 veces replicar"},
        mathfields: [
          {value: "-2", disabled: true},
          {value: "-2", disabled: true},
        ],
      },
      {
        arrow: true,
        type: 1,
        message: {value: "Voltear verticalmente"},
        mathfields: [
          {value: "3x-2", disabled: true},
          {value: "-6", disabled: true},
        ],
      },
      {
        arrow: true,
        type: 1,
        mathfields: [
          {value: "-3x-2", disabled: true},
          {value: "6", disabled: true},
        ],
      },
    ],
    points_arches: [
      {arche: [1, 2, false, false, {heigth: 0.8}]},
      {arche: [7, 8, false, false, {heigth: -0.8}]},

      {arche: [13, 16, true, false, {heigth: -0.8}]},
      {arche: [13, 16, false, true, {heigth: -2}]},

      {arche: [19, 22, true, false, {heigth: 0.8}]},

      {arche: [19, 22, false, true, {heigth: 2}]},
    ],
  },
  board_2: {
    artifact: "artifact_1",
    type: [
      {
        type: 1,
        message: {value: "Voltear verticalmente"},
        mathfields: [{value: "5", disabled: true}, {}],
        refLine: "null",
      },
      {
        arrow: true,
        type: 1,
        message: {value: "3 veces replicar"},
        mathfields: [{}, {}],
        refLine: "lineBoard_0",
      },
      {
        arrow: true,
        type: 1,
        message: {value: "Voltear verticalmente"},
        mathfields: [{}, {}],
        refLine: "lineBoard_1",
      },
      {arrow: true, type: 1, mathfields: [{}, {}], refLine: "lineBoard_2"},
    ],
    points_arches: [{arche: [3, 4, false, false, {heigth: 0.8}]}],
    arches_click: {
      semicircleSimpleTop: true,
      semicircleSimpleBelow: {heigth: -1},
      semicircleDashTop: {heigth: 2.3},
      semicircleDashBelow: {heigth: -2},
    },
  },
  board_3: {
    artifact: "artifact_2",
    type: [
      {
        type: 1,
        message: {value: "Voltear verticalmente"},
        mathfields: [{value: "a", disabled: true}, {}],
        refLine: "null",
      },
      {
        arrow: true,
        type: 1,
        message: {value: "2 veces replicar"},
        mathfields: [{}, {}],
        refLine: "lineBoard_0",
      },
      {
        arrow: true,
        type: 1,
        message: {value: "Voltear verticalmente"},
        mathfields: [{}, {}],
        refLine: "lineBoard_1",
      },
      {arrow: true, type: 1, mathfields: [{}, {}], refLine: "lineBoard_2"},
    ],
    points_arches: [{arche: [1, 2, false, false, {heigth: 0.8}]}],
    arches_click: {
      semicircleSimpleTop: true,
      semicircleSimpleBelow: {heigth: -1},
      semicircleDashTop: {heigth: 2.3},
      semicircleDashBelow: {heigth: -2},
    },
  },
  board_4: {
    artifact: "artifact_3",
    type: [
      {
        type: 1,
        message: {value: "Voltear verticalmente"},
        mathfields: [{value: "-b", disabled: true}, {}],
        refLine: "null",
      },
      {
        arrow: true,
        type: 1,
        message: {value: "2 veces replicar"},
        mathfields: [{}, {}],
        refLine: "lineBoard_0",
      },
      {
        arrow: true,
        type: 1,
        message: {value: "Voltear verticalmente"},
        mathfields: [{}, {}],
        refLine: "lineBoard_1",
      },
      {arrow: true, type: 1, mathfields: [{}, {}], refLine: "lineBoard_2"},
    ],
    points_arches: [{arche: [2, 3, false, false, {heigth: -0.8}]}],
    arches_click: {
      semicircleSimpleTop: true,
      semicircleSimpleBelow: {heigth: -1},
      semicircleDashTop: {heigth: 2.3},
      semicircleDashBelow: {heigth: -2},
    },
  },
  board_5: {
    artifact: "artifact_4",
    type: [
      {
        type: 1,
        message: {value: "2 veces replicar"},
        mathfields: [{value: "-b", disabled: true}, {}],
        refLine: "null",
      },
      {
        arrow: true,
        type: 1,
        message: {value: "Voltear verticalmente"},
        mathfields: [{}, {}],
        refLine: "lineBoard_0",
      },
      {
        arrow: true,
        type: 1,
        message: {value: "Voltear verticalmente"},
        mathfields: [{}, {}],
        refLine: "lineBoard_1",
      },
      {arrow: true, type: 1, mathfields: [{}, {}], refLine: "lineBoard_2"},
    ],
    points_arches: [{arche: [2, 3, false, false, {heigth: -0.8}]}],
    arches_click: {
      semicircleSimpleTop: true,
      semicircleSimpleBelow: {heigth: -1},
      semicircleDashTop: {heigth: 2.3},
      semicircleDashBelow: {heigth: -2},
    },
  },
};

const def = {
  scrollNav: {
    lexico:
      "<p>Si tenía un signo menos delante, al voltear desaparece. Si no lo había, al voltear aparece.</p>",
  },
  artifacts: {
    example_1: {
      description:
        "<h3>Cambio de trayectoria al voltear verticalmente un camino</h3><p>Si tenía un signo menos delante, al voltear desaparece. Si no lo había, al voltear aparece.</p>",
      board: "board_1",
      engine: EngineEscalas,
    },
    artifact_1: {
      return: true,
      border: true,
      board: "board_2",
      conditions: [
        ["5"],
        ["-5"],
        ["-5"],
        ["3x-5", "3\\cdot-5"],
        ["-15"],
        ["-3x-5", "-3\\cdot-5"],
        ["15"],
        {curves: {id: "lineBoard_0", steps: 1, type: "Below", curves: 1}},
        {
          curves: {
            id: "lineBoard_1",
            steps: 1,
            type: "Below",
            simplifiedPath: true,
            curves: 3,
          },
        },
        {
          curves: {
            id: "lineBoard_2",
            steps: 1,
            type: "Top",
            simplifiedPath: true,
            curves: 3,
          },
        },
      ],
      engine: EngineEscalas,
    },
    artifact_2: {
      return: true,
      board: "board_3",
      conditions: [
        ["a"],
        ["-a"],
        ["-a"],
        ["2\\cdot-a", "2x-a"],
        ["-2\\cdot-a", "-2a"],
        ["-2\\cdot-a", "-2x-a"],
        ["2a", "2\\cdota"],
        {curves: {id: "lineBoard_0", steps: 1, type: "Below", curves: 1}},
        {
          curves: {
            id: "lineBoard_1",
            steps: 1,
            type: "Below",
            simplifiedPath: true,
            curves: 2,
          },
        },
        {
          curves: {
            id: "lineBoard_2",
            steps: 1,
            type: "Top",
            simplifiedPath: true,
            curves: 2,
          },
        },
      ],
      engine: EngineEscalas,
    },
    artifact_3: {
      return: true,
      board: "board_4",
      conditions: [
        ["-b"],
        ["b"],
        ["b"],
        ["2xb", "2\\cdot b"],
        ["2b"],

        ["-2\\cdot-b"],
        ["2b"],
        {curves: {id: "lineBoard_0", steps: 1, type: "Top", curves: 1}},
        {
          curves: {
            id: "lineBoard_1",
            steps: 1,
            type: "Top",
            simplifiedPath: true,
            curves: 2,
          },
        },
        {
          curves: {
            id: "lineBoard_2",
            steps: 1,
            type: "Below",
            simplifiedPath: true,
            curves: 2,
          },
        },
      ],
      engine: EngineEscalas,
    },
    artifact_4: {
      return: true,
      board: "board_5",
      conditions: [
        ["-b"],
        ["2x-b", "2\\cdot-b"],
        ["-2b", "2cdot-b"],
        ["-2\\cdot-b", "-2x-b"],
        ["2\\cdot b", "2b"],
        ["-2xb", "-2cdot b"],
        ["-2cdot b", "-2b"],
        {curves: {id: "lineBoard_0", steps: 1, type: "Below", curves: 2}},
        {
          curves: {
            id: "lineBoard_1",
            steps: 1,
            type: "Top",
            simplifiedPath: true,
            curves: 2,
          },
        },
        {
          curves: {
            id: "lineBoard_2",
            steps: 1,
            type: "Below",
            simplifiedPath: true,
            curves: 2,
          },
        },
      ],
      engine: EngineEscalas,
    },
    artifact_5: {
      border: true,
      artifactClass: "artifact-short",
      body: [
        [
          {
            tag: "form",
            style: {td: "tdNotline"},
            selects: [
              {
                style: {
                  select: "selectInput",
                  span: "spanTableCheck",
                  select: "selectClase mathBig",
                },
                text: {
                  span: "En los ejercicios anteriores busque las trayectorias que tiene un solo signo de menos ¿Qué signo tienen sus respectivas trayectorias simplificadas ?",
                },
                default: [
                  {valor: "selecciona"},
                  {valor: "negativo"},
                  {valor: "positivo"},
                  {valor: "ninguno"},
                ],
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {td: "tdNotline"},
            selects: [
              {
                style: {
                  select: "selectInput",
                  span: "spanTableCheck",
                  select: "selectClase mathBig",
                },
                text: {
                  span: "Busque las trayectorias que tiene el signo de menos.¿Que signo tienen sus respectivas trayectorias simplificadas?",
                },
                default: [
                  {valor: "selecciona"},
                  {valor: "negativo"},
                  {valor: "positivo"},
                  {valor: "ninguno"},
                ],
              },
            ],
          },
        ],
        [
          {
            tag: "form",
            style: {td: "tdNotline"},
            selects: [
              {
                style: {
                  select: "selectInput",
                  span: "spanTableCheck disabled-border",
                  select: "selectClase mathBig",
                },
                text: {
                  span: "¿Cuántas veces se volteó para llegar a las que tienen dos signos negativos?",
                },
                default: [
                  {valor: "selecciona"},
                  {valor: "dos"},
                  {valor: "tres"},
                  {valor: "cinco"},
                  {valor: "uno"},
                  {valor: "seis"},
                ],
              },
            ],
          },
        ],
      ],
      conditions: [["negativo"], ["positivo"], ["dos"]],
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

const contentMain = new CreateView(def, defBoards);
