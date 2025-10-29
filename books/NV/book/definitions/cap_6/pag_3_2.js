const defBoards = {
    board_1:{
      artifact: "artifact_1",
      shapes:[   { texts:[  {x:8,y:-8,value:"Ojo!"} ],  }  ],
      type:[
        {type:1,mathfields:[{value:"\\cdot y"},{value:"3y",disabled:true}], refLine:"lineBoard_0"},
        {type:1,mathfields:[{value:"2x-5",disabled:true}], refLine:"lineBoard_1"},
      ],
      arches_click:{
        semicircleSimpleTop:{heigth: 0.8},
        semicircleSimpleBelow:{heigth: -1},
        semicircleDashTop:{heigth: 2.3},
        semicircleDashBelow:{heigth: -2}
        
  
      },
      
         
    },
    board_2:{
        artifact: "artifact_2",
        shapes:[
          {
            texts:[
              {x:8,y:2,value:"Ojo!"},
              {x:8,y:-4,value:"Ojo!"},
              {x:3.3,y:-1.2,value:"5y"}
            ],
          }
        ],
        type:[
          {type:1,mathfields:[{},{value:"-8",disabled:true}], refLine:"lineBoard_0"},
          {type:1,mathfields:[{},{value:"15y",disabled:true}], refLine:"lineBoard_1",},],
          arches_click:{
            semicircleSimpleTop:{heigth: 0.8},
            semicircleSimpleBelow:{heigth: -1},
            semicircleDashTop:{heigth: 2.3},
            semicircleDashBelow:{heigth: -2} },
         
            points_arches: [   { arche: [9, 10, false, false, { heigth:0.8 }, "btn_semicircleSimpleTop", 1, true , "Top" , true],}]
             
    },
    board_3:{
        artifact: "artifact_3",
        shapes:[ {  texts:[ {x:-8.5,y:-2,value:"Ojo!"},  ],}  ],
        type:[
          {type:1,mathfields:[{value:"3x-4",disabled:true}], refLine:"lineBoard_0"},
          {type:1,mathfields:[{value:"3x"},{value:"9",disabled:true}], refLine:"lineBoard_1"},
        ],
        arches_click:{
          semicircleSimpleTop:{heigth: 0.8},
          semicircleSimpleBelow:{heigth: -1},
          semicircleDashTop:{heigth: 2.3},
          semicircleDashBelow:{heigth: -2}  },
           
    
    },
    board_4:{
      artifact: "artifact_4",
      shapes:[  {texts:[{x:-0.2,y:-1.2,value:"5y"}, {x:8.5,y:-2,value:"Ojo!"} ], }],
      type:[
        {type:1,mathfields:[{value:"·4"},{value:"y8",disabled:true}], refLine:"lineBoard_0"},
        {type:1,mathfields:[{},{value:"-15y",disabled:true}], refLine:"lineBoard_1"},],

      arches_click:{
        curveflip:true,
        semicircleSimpleTop:{heigth: 0.8},
        semicircleSimpleBelow:{heigth: -0.8},
        semicircleDashTop:{heigth: 2.3},
        semicircleDashBelow:{heigth: -2}},

        points_arches: [ { arche: [8, 9, false, false, { heigth:0.8 },

          "btn_semicircleSimpleTop", 1, true , "Top" , true],  } ]
  },
       
  }
  
  
  const def = {
    scrollNav:true,
    artifacts: {
      artifact_1: {
        return: true,
        inputCurve:true,
        board: 'board_1',
        engine: EngineEscalas,
        conditions:[
          ["3\\cdot y"],["-10x"] ,
          {curves:{ id:"lineBoard_0", steps: 1, type: "Top", simplifiedPath: true, curves: 3  , input:["y"]}}, 
          {curves:{id:"lineBoard_1",steps: 1, simplifiedPath: true, type:"Below",curves: 2, input:["5"]}},
        ]
      },
      artifact_2: {
        return: true,
        inputCurve:true,
        board: 'board_2',
        conditions:[
          ["2x-4", '2\\cdot-4'],["3\\cdot5y", "3x5y"] ,
          {curves:{ id:"lineBoard_0", steps: 1, type: "Below", simplifiedPath: true, curves: 2 , input :["4"] }}, 
          {curves:{id:"lineBoard_1",steps: 1, simplifiedPath: true, type:"Top",curves: 3, inputCurve:false}},
        ],
        engine: EngineEscalas,
      },
      artifact_3: {
        return: true,
        inputCurve:true,
        board: 'board_3',
        engine: EngineEscalas,
        conditions: [
            ["-12"],["3x3","3\\cdot 3"],
            {curves:{ id:"lineBoard_0", steps: 1, type: "Below", simplifiedPath: true, curves: 3 , input :["4"] }}, 
          {curves:{id:"lineBoard_1",steps: 1, simplifiedPath: true, type:"Top",curves: 3, input :["3"]}},
        ],
      },
      artifact_4: {
        return: true,
        inputCurve:true,
        board: 'board_4',
        engine: EngineEscalas,
        conditions: [
            ['2y\\cdot4', 'y2\\cdot4'], ['3\\cdot-5y', '3x-5y'],
            {curves:{ id:"lineBoard_0", steps: 1, type: "Top", simplifiedPath: true, curves: 2, input :["4"] }}, 
            {curves:{id:"lineBoard_1",steps: 1, simplifiedPath: true, type:"Below",curves: 3,inputCurve:false}},
            

        ],
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
  };
  
  
  
  const contentMain = new CreateView(def,defBoards);
  