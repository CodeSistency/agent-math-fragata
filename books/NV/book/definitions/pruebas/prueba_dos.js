const defBoards = {
  // board_1: {
  //   artifact: "artifact_1",

  //   points: [{
  //     text: { value: "0", position: [-6.14, -1] }
  //   }, {}, {},{}, {}, {}, {}, {}, {}, {}, {}, {}],

  //   // points_arches: [ { arche: [2, 6, true, false, { heigth: 1 }] },],

  //   arches_click:{
  //     semicircleSimpleTop:true,
  //     semicircleSimpleBelow:true,

  //     semicircleDashTop: true,
  //     semicircleDashBelow: true
  //   },

  //   type: 7,
  // },

  board_2: {
    artifact: "artifact_2",

    points: [
      {
        text: {value: "0", position: [-6.14, -1]},
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],

    arches_click: {
      semicircleSimpleTop: true,
      semicircleSimpleBelow: true,
    },
    type: 7,
  },

  board_3: {
    artifact: "artifact_3",

    points: [
      {},
      {},
      {
        // inputs:{y:-1.5, style:{disabled:true, styleMain:"inputLittle-transparent"}}
      },
      {},
      {},
      {},
    ],

    // points_arches: [ { arche: [2, 6, true, false, { heigth: 1 }] },],

    arches_click: {
      semicircleSimpleTop: true,
      semicircleSimpleBelow: true,
      semicircleDashTop: {heigth: 4},
      semicircleDashBelow: true,
    },

    type: 10,
  },

  // board_2: {
  //   artifact: "artifact_2",

  //   points: [
  //     {}, {}, {}, {}, {}, {}, {},
  //     {}, {}, {}, {},],

  //   points_arches: [
  //     { arche: [2, 7, true, false, { heigth: 0.3, inputs: true }] },
  //     { arche: [7, 10, true, false, { heigth: 0.3, inputs: true }] },
  //   ],

  //   type: 8,
  // },

  // board_3: {
  //   artifact: "artifact_3",

  //   points: [
  //     {},

  //     {inputs:{y:-1.5, style:{disabled:true, styleMain:"inputLittle-transparent"}} },

  //    {},

  //   {text: { value: "0", position: [-6.14, -1] }},
  //  {text: { value: "1", position: [-3.68, -1] }},
  //   {}, { }, { },{},
  //    { inputs:{y:-1.5, style:{disabled:true, styleMain:"inputLittle-transparent"}}},
  //    { }, {}, {}

  //   ],

  //   type: 7,
  // },
  // board_4: {
  //   artifact: "artifact_4",

  //   points: [
  //     {
  //       inputs:{
  //       y:-0.45,  style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      }
  //     },
  //      {
  //       inputs:{
  //       y:-0.45,  style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      }
  //     },
  //       {
  //         inputs:{
  //         y:-0.45, style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //        }
  //       },
  //       {
  //         inputs:{
  //         y:-0.45,  style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //        }
  //       },
  //        {
  //         inputs:{
  //         y:-0.45, style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //        }
  //       },
  //     {
  //       inputs:{
  //       y:-0.45, value:"-1", style:{ disabled:true, styleMain:"inputLittle"}
  //      }
  //      },
  //       {
  //         inputs:{
  //         y:-0.45, style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //        }
  //       },
  //        {
  //         inputs:{
  //         y:-0.45, style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //        }
  //       },
  //        {
  //         inputs:{
  //         y:-0.45, style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //        }
  //       },],

  //   points_arches: [
  //     { arche: [0, 5, true, false, { heigth: 0.3}] },
  //     { arche: [5, 8, true, false, { heigth: 0.3 }] },
  //   ],

  //   type: 8,
  // },

  // board_5: {
  //   artifact: "artifact_5",

  //   points: [
  //     { inputs:{
  //       y:-1.5, value:"-5", style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //     }},
  //     {  inputs:{
  //       y:-1.5, value:"-4", style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //     }},
  //     {  inputs:{
  //       y:-1.5, value:"3", style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //     } },
  //     { inputs:{
  //       y:-1.5, value:"3", style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //     }},
  //     {  inputs:{
  //       y:-1.5, value:"-1", style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      } },
  //     {  inputs:{
  //       y:-1.5, value:"0", style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      } },
  //     { inputs:{
  //       y:-1.5, value:"1", style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      }  },
  //     { inputs:{
  //       y:-1.5, value:"2", style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      }  },
  //     {inputs:{
  //       y:-1.5, value:"-3", style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      }  },
  //      { inputs:{
  //       y:-1.5, value:"4", style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      }  },
  //     { inputs:{
  //       y:-1.5, value:"5", style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      }  },
  //     { inputs:{
  //       y:-1.5, value:"6", style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      }  }],

  //   type: 7,
  // },
  // board_7: {
  //   artifact: "artifact_5",

  //   points: [
  //     { },
  //     { },
  //     { },
  //     { inputs:{
  //       y:-0.5, value:"-7", style:{ disabled:true, styleMain:"inputLittle"}
  //     }},
  //     {  inputs:{
  //       y:-0.5, style:{disabled:true,  styleMain:"inputLittle-transparent"}
  //      } },
  //     {  inputs:{
  //       y:-0.5, style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      } },
  //     { inputs:{
  //       y:-0.5,  style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      }  },
  //     { inputs:{
  //       y:-0.5, style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      }  },
  //     {inputs:{
  //       y:-0.5, style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      }  },
  //      { },
  //     { },
  //     { }],
  //     points_arches: [
  //       { arche: [3, 8, true, false, { heigth: 0.3}] },

  //     ],

  //   type: 8,
  // },

  // board_6: {
  //   artifact: "artifact_4",

  //   points: [
  //     {},
  //      {},
  //       {},
  //       {},
  //        {},
  //     { inputs:{
  //       value: "-1",y:-0.45, style:{ disabled:true, styleMain:"inputLittle-transparent"}
  //      }},
  //       {},
  //        {},
  //        {},],

  //   points_arches: [
  //     { arche: [0, 5, true, false, { heigth: 0.3}] },
  //     { arche: [5, 8, true, false, { heigth: 0.3 }] },
  //   ],

  //   type: 8,
  // },
};

const def = {
  scrollNav: true,
  artifacts: {
    // artifact_1: {
    //   border: true,
    //   board: 'board_1',

    //   // inputs:[
    //     // cuando se va a escribir en el input
    //     // {tag:"input",style:"inputPoint_cap6",value:"a=20"},

    //     // cuando se usa mathfield para la validación
    //       // {style:"inputPoint_cap6", value:"dos"},

    //   // ],
    //   conditions: [["-6"], ["-5"], ["-4"], ["-3"]],
    //   engine: EngineEscalas,
    // },

    artifact_2: {
      border: true,
      board: "board_2",

      inputs: [
        // cuando se va a escribir en el input
        // {tag:"input",style:"inputPoint_cap6",value:"a=20"},

        // cuando se usa mathfield para la validación
        {style: "inputPoint_cap6", value: "dos"},
      ],
      // inputCurve:true,

      // las curvas reciben
      conditions: [
        // validación de inputs
        ["-12"],
        ["3"],
        // validación de pasos - curvas
        {
          curves: {
            id: "artifact_2_board",
            steps: 1,
            type: "btn_semicircleSimpleTop",
            curves: 4,
          },
        },

        //  {curves:{type: "semicircleSimpleTop",steps: 4 , curves:1}}
      ],
      engine: EngineEscalas,
    },

    artifact_3: {
      border: true,
      board: "board_3",

      inputs: [
        // cuando se va a escribir en el input
        // {tag:"input",style:"inputPoint_cap6",value:"a=20"},

        // cuando se usa mathfield para la validación
        {style: "inputPoint_cap6", value: "dos"},
      ],
      // inputCurve:true,
      // downPoint: {activeInput:[2]},
      // las curvas reciben
      conditions: [
        // validación de inputs
        ["-12"],
        //  ["11"],

        // validación de pasos - curvas
        {
          curves: {
            id: "artifact_3_board",
            steps: 1,
            type: "btn_semicircleSimpleBelow",
            simplifiedPath: true,
            curves: 4,
          },
        },
        //  {curves:{type: "semicircleSimpleTop",steps: 4 , curves:1}}
      ],
      engine: EngineEscalas,
    },
    // artifact_2: {
    //   board: 'board_2',
    //   conditions: [],
    //   engine: EngineEscalas,
    // },

    // artifact_3: {
    //   board: 'board_3',
    //   downPoint: {activeInput:[1,9], replaceTouchInput:["inputLittle-transparent", "inputLittle"] },
    //   // downPoint: {heigth:-1.4},
    //   conditions: [["-2"], ["6"]],
    //   engine: EngineEscalas,
    // },
    // artifact_4: {
    //   board: 'board_4',
    //   // enableInput:[0,1,2,3,4,6,7,8],
    //   downPoint: {activeInput:[0,1,2,3,4,5,6,7,8], replaceTouchInput:["inputLittle-transparent", "inputLittle"] },

    //   // downPoint: true,
    //   conditions: [["-6"], ["-5"], ["-4"], ["-3"], ["-2"], ["0"], ["1"], ["2"],["5"], ["3"]],
    //   engine: EngineEscalas,
    // },
    // artifact_5: {
    //   board: 'board_5',
    //   enableInput: [2,3,8],
    //   conditions: [["-3"], ["-2"], ["3"]],
    //   engine: EngineEscalas,
    // },
    // artifact_6: {
    //   board: 'board_6',
    //   // downPoint: true,
    //   conditions: [["-3"], ["-2"], ["3"]],
    //   engine: EngineEscalas,
    // },
    // artifact_7: {
    //   board: 'board_7',
    //   downPoint: {activeInput:[3,4,5,6,7,8], replaceTouchInput:["inputLittle-transparent", "inputLittle"] },

    //   conditions: [["-6"], ["-5"], ["-4"], ["-3"], ["-2"], ["5"]],
    //   engine: EngineEscalas,
    // },
  },
};
const contentMain = new CreateView(def, defBoards);
