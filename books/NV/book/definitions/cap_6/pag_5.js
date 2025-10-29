const defBoards = {
 
    board_1:{
      artifact: "artifact_1",
      type:[
        {type:1,mathfields:[{value:"4",disabled:true},{}], refLine:"lineBoard_0"},
        {arrow:true,type:1,mathfields:[{},{}], refLine:"lineBoard_1"},
        {arrow:true,type:1,mathfields:[{value:"-3x-4", disabled:true},{}], refLine:"lineBoard_2"},
      ],
      arches_click:{
        semicircleSimpleTop:{heigth: 0.8},
        semicircleSimpleBelow:{heigth: -0.8},
        semicircleDashTop:{heigth: 2.3},
        semicircleDashBelow:{heigth: -2}
      },
    
    },
    board_2:{
      artifact: "artifact_2",
      type:[
        {type:1,mathfields:[{},{}], refLine:"lineBoard_0"},
        {arrow:true,type:1,mathfields:[{},{}], refLine:"lineBoard_1"},
        {arrow:true,type:1,mathfields:[{value:"3x-4", disabled:true},{}], refLine:"lineBoard_2"},
      ],
      arches_click:{
        semicircleSimpleTop:{heigth: 0.8},
        semicircleSimpleBelow:{heigth: -0.8},
        semicircleDashTop:{heigth: 2.3},
        semicircleDashBelow:{heigth: -2}
      },
    
    },
    board_3:{
      artifact: "artifact_4",
      type:[
        {type:1,mathfields:[{},{}], refLine:"lineBoard_0"},
        {arrow:true,type:1,mathfields:[{},{}], refLine:"lineBoard_1"},
        {arrow:true,type:1,mathfields:[{},{}], refLine:"lineBoard_2"},
        {arrow:true,type:1,mathfields:[{value:"-3x-4", disabled:true},{}], refLine:"lineBoard_3"},

      ],
      arches_click:{
        semicircleSimpleTop:{heigth: 0.8},
        semicircleSimpleBelow:{heigth: -0.8},
        semicircleDashTop:{heigth: 2.3},
        semicircleDashBelow:{heigth: -2}
      },
    
    },
    board_4:{
      artifact: "artifact_4",
      type:[
        {type:1,mathfields:[{},{}], refLine:"lineBoard_0"},
        {arrow:true,type:1,mathfields:[{},{}], refLine:"lineBoard_1"},
        {arrow:true,type:1,mathfields:[{},{}], refLine:"lineBoard_2"},
        {arrow:true,type:1,mathfields:[{value:"-4x-3", disabled:true},{}], refLine:"lineBoard_3"},

      ],
      arches_click:{
        semicircleSimpleTop:{heigth: 0.8},
        semicircleSimpleBelow:{heigth: -0.8},
        semicircleDashTop:{heigth: 2.3},
        semicircleDashBelow:{heigth: -2}
      },
    
    },
  }
  
  
  const def = {
    scrollNav:true,
    artifacts: {
      lexico_1: {
        
        nodo: [
          {texto: "Orden de ejecución del camino", etiqueta:"h3",atributos: { style: 'text-align:justify' } },
          {texto: "Convertir o simplificar una trayecctoria a número, lea la trayectoria de derecha a izquierda.", atributos: { style: 'text-align:justify;' }  }
        ],
  
        recursos: [ {
          recurso: {
              styles: { boundingbox: [-2.5, 3, 2.5, -1.7], axies: { y: { visible: false }, x: { visible: false }}},
              styleRecurso: ['lexico_example_figure_large'],
              grafico: [{
                  linea:
                    [ {punto_1: [-1.75, 0], punto_2: [-1.75, 1.08],stylesLine: { strokeWidth: 2, strokeColor: '#076382' , firstArrow:true}, },
                      {punto_1: [-0.10, 0], punto_2: [-0.10, 1.08], stylesLine: { strokeWidth: 2, strokeColor: '#076382',firstArrow:true }, },
                      {punto_1: [1.60, 0], punto_2: [1.60, 1.08], stylesLine: { strokeWidth: 2, strokeColor: '#076382',firstArrow:true }, },
                    ],
                  texto: [
                    { x: -2.2, y: 2, mensaje: "Poner en",stylesText:{cssClasses:'textJSX',}  },
                    { x: -2.15, y: 1.5, mensaje: "la figura",stylesText:{cssClasses:'textJSX',}  },
                    { x: -0.75, y: 2, mensaje: "Repetir tres",stylesText:{cssClasses:'textJSX',} },
                    {x: -0.90, y: 1.5, mensaje: "veces la figura",stylesText:{cssClasses:'textJSX',} },
                    { x:1.10, y: 2, mensaje: "voltear la",stylesText:{cssClasses:'textJSX',}},
                    { x:1.30, y: 1.5, mensaje: "figura",stylesText:{cssClasses:'textJSX',}},
                    { x:-2.19, y: -0.50, mensaje: "-3x4",stylesText:{cssClasses:'textJSX',} },
                    {x:-0.35, y: -0.50, mensaje: "-3x4",stylesText:{cssClasses:'textJSX',}  },
                    { x:1.53, y: -0.50, mensaje: "-3x4",stylesText:{cssClasses:'textJSX',}   },
                  ],
            }]}}
          
          
          ],
  
  
  
  
                  
  
  
        styleContainer: "note",
        engine: EngineOwner
       },
      artifact_1: {
        return: true,
        board: 'board_1',
        conditions:[
          ["4"],
          ["3x4", '3\\cdot4'],
          ["12"],
          ["-12"],
          {curves:{ id:"lineBoard_0", steps: 1, type: "Top", curves: 1  }}, 
          {curves:{id:"lineBoard_1",steps: 1, type:"Top", simplifiedPath: true,curves: 3}},
          {curves:{id:"lineBoard_2",steps: 1, type:"Below", simplifiedPath: true,curves: 3}},
        ],
        engine: EngineEscalas,
      },
      artifact_2: {
        return: true,
        board: 'board_2',
        conditions:[
          ["4"],
          ["4"],
          ["-4"],
          ["-4"],
          ["-12"],
          {curves:{ id:"lineBoard_0", steps: 1, type: "Top", curves: 1  }}, 
          {curves:{id:"lineBoard_1",steps: 1, type:"Below", curves: 1}},
          {curves:{id:"lineBoard_2",steps: 1, type:"Below", simplifiedPath: true,curves: 3}},
        ],
        engine: EngineEscalas,
      },
      artifact_3: {
        return: true,
        board: 'board_3',
        conditions:[
          ["4"],
          ["4"],
          ["-4"],
          ["-4"],
          ["3x-4","3\\cdot-4"],
          ["-12"],
          ["12"] ,
          {curves:{ id:"lineBoard_0", steps: 1, type: "Top", curves: 1  }}, 
          {curves:{id:"lineBoard_1",steps: 1, type:"Below", curves: 1}},
          {curves:{id:"lineBoard_2",steps: 1, type:"Below", simplifiedPath: true,curves: 3}},
          {curves:{id:"lineBoard_3",steps: 1, type:"Top", simplifiedPath: true,curves: 3}},
        ],
        engine: EngineEscalas,
      },
      artifact_4: {
        return: true,
        board: 'board_4',
        conditions:[
          ["3"],
          ["3"],
          ["-3"],
          ["-3"],
          ["4x-3","4\\cdot-3"],
          ["-12"],
          ["12"],
          {curves:{ id:"lineBoard_0", steps: 1, type: "Top", curves: 1  }}, 
          {curves:{id:"lineBoard_1",steps: 1, type:"Below",curves: 1}},
          {curves:{id:"lineBoard_2",steps: 1, type:"Below", simplifiedPath: true,curves: 4}},
          {curves:{id:"lineBoard_3",steps: 1, type:"Top", simplifiedPath: true,curves: 4
          }},
        ],
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
  },
};

const contentMain = new CreateView(def, defBoards);
