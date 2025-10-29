const defBoards = {
    board_1: {
        artifact: "artifact_1",
        boundingbox: [-15, 5, 15, -3],
        shapes:[{texts:[{x:-10,y:2.8, value:"Escala =", style:{fontSizeResponsive:14}}]}],
        points: [{inputs:{x: -5.5,y: 2.8,style:{styleMain: "inputCuadrado",}}},{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        points_arches: [{ arche: [2, 8, false, false, { heigth: -2 }] },],
        contenedorInputs:"contentInputsCap6",
        type: 7,
    },
    board_2: {
        artifact: "artifact_2",
        shapes:[{texts:[{x:-10.50,y:-3, value:"Escala = 3", style:{fontSizeResponsive:14}}]}],
        boundingbox: [-15, 5, 15, -5],
        points: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        type: 7,
        arches_click: {semicircleSimpleTop: { heigth: 2.5 },semicircleSimpleBelow: { heigth: -2.5 }},
        contenedorInputs:"contentInputsCap6",
    },
    board_3: {
        artifact: "artifact_3",
        shapes:[{texts:[{x:-10.50,y:-3.5, value:"Escala = 4", style:{fontSizeResponsive:14}}]}],
        boundingbox: [-15, 3, 15, -5],
        points: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        points_arches: [{ arche: [2, 6, false, false, { heigth: -2 }] },],
        contenedorInputs:"contentInputsCap6",
        type: 7,
    },
    board_4: {
        artifact: "artifact_4",
        shapes:[{texts:[{x:-10.50,y:-2, value:"Escala = 10", style:{fontSizeResponsive:14}}]}],
        boundingbox: [-15, 3, 15, -3],
        points: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        points_arches: [{ arche: [2, 7, false, false, { heigth: 2 }] },],
        contenedorInputs:"contentInputsCap6",
        type: 7,
    },
    board_5: {
        artifact: "artifact_5",
        shapes:[{texts:[{x:-10,y:2.8, value:"Escala =", style:{fontSizeResponsive:14}}]}],
        boundingbox: [-15, 5, 15, -3],
        points: [{ inputs:   {  x: -5.5, y: 2.8, style:  { styleMain: "inputCuadrado",  }}}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        points_arches: [{ arche: [0, 5, false, false, { heigth: -2 }] },],
        type: 7,
    },
    board_6: {
        artifact: "artifact_6",
        shapes:[{texts:[{x:-10,y:2.8, value:"Escala =", style:{fontSizeResponsive:14}}]}],
        boundingbox: [-15, 5, 15, -3],
        points: [{inputs:{x: -5.5,y: 2.8,style:{ styleMain: "inputCuadrado",}}}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        contenedorInputs:"contentInputsCap6",
        points_arches: [{ arche: [0, 6, false, false, { heigth: -2 }] },],
        type: 7,
    },
    board_7: {
        artifact: "artifact_7",
        shapes:[{texts:[{x:-10.50,y:-3, value:"Escala = 4", style:{fontSizeResponsive:14}}]}],
        boundingbox: [-15, 5, 15, -5],
        points: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        type: 7,
        arches_click: { semicircleSimpleTop: { heigth: 2.5 },semicircleSimpleBelow: { heigth: -2.5 }, },
        contenedorInputs:"contentInputsCap6",
    },

}

const def = {
    scrollNav: {
        lexico: "Siempre tome en cuenta: tamaño y signo", tittle: "Multiplicación y División de Enteros "
    },
    artifacts: {
        artifact_1: {
            board: 'board_1',
            inputs: [ { tag: "input", style: "inputPoint_cap6 borderRadius", value: "-42" },],
            conditions: [['7']],
            engine: EngineEscalas,
        },
        artifact_2: {
            return: true,
            board: 'board_2',
            inputs: [{ tag: "input", style: "inputPoint_cap6 borderRadius", value: "-12" },],
            conditions: [{ curves: { id: "artifact_2_board", steps: 4, type: "Below", curves: 1 } }   ],
            engine: EngineEscalas,
        },
        artifact_3: {
            board: 'board_3',
            inputs: [ { style: "inputPoint_cap6 borderRadius", value: "" },  ],
            conditions: [['-16']],
            engine: EngineEscalas,
        },
        artifact_4: {
            board: 'board_4',
            inputs: [  { style: "inputPoint_cap6 borderRadius", value: "" }, ],
            conditions: [['50']],
            engine: EngineEscalas,
        },
        artifact_5: {
            board: 'board_5',
            inputs: [{ tag: "input", style: "inputPoint_cap6 borderRadius", value: "-25" },],
            conditions: [['5']],
            engine: EngineEscalas,
        },
        artifact_6: {
            board: 'board_6',
            inputs: [{ tag: "input", style: "inputPoint_cap6 borderRadius", value: "-3" },],
            conditions: [['0.5']],
            engine: EngineEscalas,
        },
        artifact_7: {
            return: true,
            board: 'board_7',
            inputs: [{ tag: "input", style: "inputPoint_cap6 borderRadius", value: "-12" },],
            conditions: [  { curves: { id: "artifact_7_board", steps: 3, type: "Below", curves: 1 } }  ],
          
            engine: EngineEscalas,
        },
        artifact_raiting: {
            parent: "scroll-container",
            questions: {
                question_1: {
                    value: "¿Fue fácil?",
                },

            },
            engine: EngineOwner
        },


    }
}
const contentMain = new CreateView(def, defBoards);
