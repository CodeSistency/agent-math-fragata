const defBoards = {
    board_1:{
        artifact: "artifact_1",
        type:[
          {type:1,mathfields:[{},{value:"4m",disabled:true}], refLine:"lineBoard_0"},
          {type:1,mathfields:[{value:"2x "},{value:"12",disabled:true}], refLine:"lineBoard_1"},
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
     
    arches_click:{
      semicircleSimpleTop:{heigth: 0.8},
      semicircleSimpleBelow:{heigth: -1},
      semicircleDashTop:{heigth: 2.3},
      semicircleDashBelow:{heigth: -2}
      

    },
      shapes:[ { texts:[  {x:0,y:-1.4,value:"y"},   ],  }  ],
      points_arches: [  { arche: [8, 9, false, false, { heigth:0.8 }, "btn_semicircleSimpleTop", 1, true , "Top",true ] }
      ],

      type:[
        {type:1,mathfields:[{value:"3x "},{value:"12",disabled:true}], refLine:"lineBoard_0"},
        {type:1,mathfields:[{value:" 4 · y", disabled:true,style:"inputEscalaMultiple mathfield"}], refLine:"lineBoard_1"}, ],
      arches_click:{
        semicircleSimpleTop:{heigth: 0.8},
        semicircleSimpleBelow:{heigth: -1},
        semicircleDashTop:{heigth: 2.3},
        semicircleDashBelow:{heigth: -2}
        
  
      },
         
  },
  board_3:{
    artifact: "artifact_3",
    StepsLarge: true,
   
    shapes:[
      {
        texts:[
          {x:-8,y:5,value:"Ojo!"},
        ],
      }
    ],
    type:[
      {type:1,mathfields:[{value:"2 x 2",disabled:true}], refLine:"lineBoard_0"},
      {type:1,mathfields:[{value:"y · 2",disabled:true}],  refLine:"lineBoard_1"},

    ],
    arches_click:{
      semicircleSimpleTop:{heigth: 0.8},
      semicircleSimpleBelow:{heigth: -1},
      semicircleDashTop:{heigth: 2.3},
      semicircleDashBelow:{heigth: -2}
      

    },
    
    
    
},
board_4:{
    artifact: "artifact_4",
    arches_click:{
      semicircleSimpleTop:{heigth: 0.8},
      semicircleSimpleBelow:{heigth: -1},
      semicircleDashTop:{heigth: 2.3},
      semicircleDashBelow:{heigth: -2}
      

    },
    
   
    shapes:[
      {
        texts:[
          {x:-8,y:-1,value:"Ojo!"},
        ],
      }
    ],
    type:[
      {type:1,mathfields:[{value:"3 x 1",disabled:true}], refLine:"lineBoard_0"},
      {type:1,mathfields:[{value:"2 x "},{value:"4m", disabled:true}], refLine:"lineBoard_1"},

    ],
    
    
    
},
 board_5:{
    artifact: "artifact_5",
    StepsLarge: true,
   
    type:[
      {type:1,mathfields:[{value:"2 · ",disabled:false},{value:"12x",disabled:true}], refLine:"lineBoard_0"},
      {type:1,mathfields:[{value:"3 ·",disabled:false},{value:"12y",disabled:true}], refLine:"lineBoard_1"},
    ],
    arches_click:{
      semicircleSimpleTop:{heigth: 0.8},
      semicircleSimpleBelow:{heigth: -1},
      semicircleDashTop:{heigth: 2.3},
      semicircleDashBelow:{heigth: -2}
    },
    
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
          conditions: [
            ["4xm", '4\\cdot m'],["2x6"],
           {curves:{ id:"lineBoard_0", steps: 1, type: "Top", simplifiedPath: true,curves: 4 , input :["m"]  }}, 
            {curves:{id:"lineBoard_1",steps: 1, type: "Top",  simplifiedPath: true,curves: 2, input :["6"]}},
         
        ],
        },
        artifact_2: {
          return: true,
          inputCurve:true,
          board: 'board_2',
          conditions:[
            ["3x4"],["4y"] ,
           {curves:{ id:"lineBoard_0", steps: 1, type: "Top", simplifiedPath: true,curves: 3, input :["4"]   }}, 
           {curves:{id:"lineBoard_1",steps: 1, type: "Top",  simplifiedPath: true,curves: 4, inputCurve:false }},
        
          ],
          engine: EngineEscalas,
        },
        artifact_3: {
          return: true,
          inputCurve:true,
            board: 'board_3',
            conditions:[
              ["4"],["2y", "y2"] , 
           {curves:{ id:"lineBoard_0", steps: 1, type: "Top", simplifiedPath: true,curves: 2 , input :["2"] }}, 
           {curves:{id:"lineBoard_1",steps: 1, type: "Top",  simplifiedPath: true,curves: 2, input :["y"]}},
            ],
            engine: EngineEscalas,
          },
          artifact_4: {
            return: true,
            inputCurve:true,
            board: 'board_4',
            conditions:[
              ["3"],["2x2m"] ,
              {curves:{ id:"lineBoard_0", steps: 1, type: "Top", simplifiedPath: true,curves: 3, input :["1"]  }}, 
              {curves:{id:"lineBoard_1",steps: 1, type: "Top",  simplifiedPath: true,curves: 2, input :["2m"]}},
            ],
            engine: EngineEscalas,
          },
          artifact_5: {
            return: true,
            inputCurve:true,
            board: 'board_5',
            conditions:[
              ['2\\cdot6x'],    ['3\\cdot4y'],

              {curves:{ id:"lineBoard_0", steps: 1, type: "Top", simplifiedPath: true,curves: 2 , input :["6"]}}, 
              {curves:{id:"lineBoard_1",steps: 1, type: "Top",  simplifiedPath: true,curves: 3, input :["4y"]}},
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

       
    
      }
    };
    
    
    
    const contentMain = new CreateView(def,defBoards);
    