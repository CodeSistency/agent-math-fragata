const defBoards = {
  board_1: {
    artifact: "artifact_1",
    // shapes:[
    //   {
    //     texts:[
    //       {x:-8,y:-8,value:"Ojo!"}
    //     ],
    //   }
    // ],
    type: [
      {type: 3, mathfields: [{value: "2", disabled: true}]},
      {type: 3, mathfields: [{value: "-2", disabled: true}]},
      {type: 3, mathfields: [{value: "3 x -2", disabled: true}]},
      {type: 3, mathfields: [{value: "3 x -2", disabled: true}]},
    ],
    typeAux: [
      {type: 3, mathfields: [{value: "2", disabled: true}]},
      {type: 3, mathfields: [{value: "3 x 2", disabled: true}]},
      {type: 3, mathfields: [{value: "-3 x 2", disabled: true}]},
      {type: 3, mathfields: [{value: "3 x 2", disabled: true}]},
    ],
    points_arches: [
      {arche: [1, 2, false, false, {heigth: 1}], changeCurves: true},
      {arche: [5, 6, false, false, {heigth: -1}], changeCurves: true},
      {arche: [8, 9, false, false, {heigth: -1}], changeCurves: true},
      {arche: [9, 10, false, false, {heigth: -1}], changeCurves: true},
      {arche: [10, 11, false, false, {heigth: -1}], changeCurves: true},
      {arche: [12, 13, false, false, {heigth: 1}], changeCurves: true},
      {arche: [13, 14, false, false, {heigth: 1}], changeCurves: true},
      {arche: [14, 15, false, false, {heigth: 1}], changeCurves: true},
      // siquiente
      {arche: [17, 18, false, false, {heigth: 1}], changeCurves: true},
      {arche: [21, 22, false, false, {heigth: -1}], changeCurves: true},
      {arche: [24, 25, false, false, {heigth: -1}], changeCurves: true},
      {arche: [25, 26, false, false, {heigth: -1}], changeCurves: true},
      {arche: [26, 27, false, false, {heigth: -1}], changeCurves: true},
      {arche: [28, 29, false, false, {heigth: 1}], changeCurves: true},
      {arche: [29, 30, false, false, {heigth: 1}], changeCurves: true},
      {arche: [30, 31, false, false, {heigth: 1}], changeCurves: true},
    ],
    arches_click: {
      semicircleSimpleTop: true,
      semicircleSimpleBelow: true,
      semicircleDashTop: {heigth: 2.5},
      semicircleDashBelow: {heigth: -2.5},
      curveflip: true,
    },
  },
  board_2: {
    artifact: "artifact_1",
    type: [
      {
        type: 1,
        message: {value: "Voltear verticalmente"},
        refLine: "lineBoard_0",
      },
      {
        arrow: true,
        type: 1,
        message: {value: "2 veces replicar"},
        refLine: "lineBoard_1",
      },
      {
        arrow: true,
        type: 1,
        message: {value: "Voltear verticalmente"},
        refLine: "lineBoard_2",
      },
      {arrow: true, type: 1, refLine: "lineBoard_3"},
    ],
    arches_click: {
      semicircleSimpleTop: true,
      semicircleSimpleBelow: true,
      semicircleDashTop: {heigth: 2.5},
      semicircleDashBelow: {heigth: -2.5},
      curveflip: true,
    },
  },
};

const def = {
  scrollNav: true,

  artifacts: {
    artifact_1: {
      board: "board_1",
      // inputCurve:true,
      // inputs: [
      //   {
      //     tag: "form",
      //     style:{form:"formExample"},
      //     spans:[
      //       {value:"¿Estan los dos debajo de la recta?",select:true,default:[
      //         { valor: 'selecciona' },
      //         { valor: 'si' },
      //         { valor: 'no' }],   style:{span:"max-width spanRow center",select: "selectClase mathBig"}},
      //       {value:"¿Cuántos pasos tienen los caminos de la tercera fila?",select:true,default:[
      //           { valor: 'selecciona' },
      //           { valor: 'si' },
      //           { valor: 'no' }],   style:{span:"max-width spanRow center",select: "selectClase mathBig"}},
      //       {value:"¿Son iguales?",select:true,default:[
      //         { valor: 'selecciona' },
      //         { valor: 'si' },
      //         { valor: 'no' }],   style:{span:"max-width spanRow center",select: "selectClase mathBig"}}
      //     ]
      //   },
      //   {
      //     tag: "form",
      //     value:"Debido a que los caminos son iguales podems escribir q sus trayectorias son iguales <b>3x-2=-3x2</b>",
      //     style:{form:"formExample spanRow"}
      //   },
      //   {
      //     tag: "form",
      //     style:{form:"formExample"},
      //     spans:[
      //       {value:"¿Has notado que el camino que corresponde ala trayectoria <b>-3x-2</b> está por encima de la resta y es el mismo que corresponde ala trayectoria <b>3x2</b>?",select:true,default:[
      //           { valor: 'selecciona' },
      //           { valor: 'si' },
      //           { valor: 'no' }],   style:{span:"spanRow center",select: "selectClase mathBig"}},
      //       {value:"por ello podemos escribir que <b>-3x-2+3x2</b> y pos eso decimos que la multiplicación de -3 por -2 es:<b>6</b>",style:{span:"max-width spanRow center"}}
      //     ]
      //   },
      // ],
      conditions: [["14x"], ["16"], ["2"], ["3"]],

      engine: EngineEscalas,
    },
    artifact_2: {
      board: "board_2",
      conditions: [
        [16],
        [16],
        [16],
        [16],
        [16],
        [16],
        {
          curves: {
            id: "lineBoard_0",
            steps: 1,
            type: "Top",
            simplifiedPath: true,
            curves: 2,
          },
        },
        {
          curves: {
            id: "lineBoard_1",
            steps: 1,
            type: "Top",
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
            curves: 4,
          },
        },
        {
          curves: {
            id: "lineBoard_3",
            steps: 1,
            type: "Top",
            simplifiedPath: true,
            curves: 1,
          },
        },
      ],
      engine: EngineEscalas,
    },
  },
};

const contentMain = new CreateView(def, defBoards);
