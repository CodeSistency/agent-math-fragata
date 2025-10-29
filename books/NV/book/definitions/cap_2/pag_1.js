

const defBoards = {
        board_1: {
            artifact: "artifact_1",
            points: [
              {text:{value:"0",position:[-3.5,1]}},
              { 
                visible:false,       
                inputs:
                 {x:-1.74,
                 y:-2, 
                 style: 
                   {
                    styleMain:"circulo"} 
                  }
                
              },
              {text:{value:"20",position:[0,1]}},
              {
                visible:false,
                inputs:
                {x:1.74,
                 y:-2, 
                 style: 
                   {
                    styleMain:"circulo"} 
                  }
                },
                {inputs:
                   {x:3.5,
                   y:1.3, 
                   style: 
                     {
                      styleMain:"circulo"} 
                    }
                  },
            ],
            type:5
            
        },
        board_2:{
        artifact: "artifact_2",
        points: [
          {
            text:{value:"0",position:"default"},
          },
          {
            text:{value:"10",position:"default"},
          },
          {
            inputs:
             {
              y:-4, 
              style: 
               {
                styleMain:"circulo"} 
                }
               
          },
        ],
        type:1,
        anche:true
        },
        board_3:{
            artifact: "artifact_3",
            points: [
              {
                text:{value:"0",position:"default"},
              },
              {
                  inputs:
                  {
                    y:-4,
                    style: 
                    {
                      styleMain:"circulo"} 
                    }
                
            },
            {
              text:{value:"20",position:"default"},
            },
            
            ],
            
            type:1,
            anche:true
            },
        board_4:{
            artifact: "artifact_4",
            points: [
              {
                text:{value:"0",position:"default"},
              },
              {
                text:{value:"30",position:"default"},
              },
              {
                inputs:
                 {
                 y:-4,
                 style: 
                   {
                    styleMain:"circulo"} 
                    }
                   
              },
            ],
            type:1,
            anche:true
            },
        board_5:{
            artifact: "artifact_5",
            points: [
              {
                text:{value:"0",position:"default"},
              },
              {
                  inputs:
                  {
                    y:-4,
                    style: 
                    {
                      styleMain:"circulo"} 
                    }
                
            },
            {
              text:{value:"30",position:"default"},
            },
            ],
            type:1,
            anche:true
            },
        board_6:{
          artifact: "artifact_6",
          points: [
            {
              text:{value:"0",position:"default"},
            },
            {
              text:{value:"3",position:"default"},
            },
            {},{},{},{},
            {},
          {
            inputs:
            {
              y:-4,
              style: 
              {
                styleMain:"circulo"} 
              }
          },{},{},{},
          ],
          type:1,
          },
        board_7:{
          artifact: "artifact_7",
          points: [
            {
              text:{value:"0",position:"default"},
            },
            {
              text:{value:"4",position:"default"},
            },
            {},
            {},{},{   inputs:
              {
               y:-4,
               style: 
               {
                 styleMain:"circulo"} 
               }
           },
            {
             
          },
            {},
          {},{},{}
          ],
          type:1,
          },
        board_8:{
          artifact: "artifact_8",
          points: [
            {},
            {},
            {},
            {text:{value:"6",position:"default"}},
            {text:{value:"8",position:"default"},},
            {},
            {
                inputs:
                {x:-2.88,
                  y:-4,
                  style: 
                  {
                      mathClass:"circulo"} 
                  }
              
          },
          {},
          {},{},{}
          ],
          type:1,
          },
        board_9:{
          artifact: "artifact_2",
          points: [
            {
              text:{value:"0",position:"default"},
            },
            {
              text:{value:"50",position:"default"},
            },
            {
              inputs:
               {x:-1.45,
               y:-3.6,
               style: 
                 {
                   mathClass:"circulo"} 
                  }
                 
            },
          ],
          type:2,
          anche:true
          },          
        board_10:{
          artifact: "artifact_10",
          points: [
            {
              text:{value:"0",position:"default"},
            },
            {},
            {
              text:{value:"10",position:"default"},
              inputs:
               {x:-4.98,
               y:-3.6,
               style: 
                 {
                   mathClass:"circulo"} 
                  }
                 
            },
          ],
          type:2,
          anche:true
          },
}

const def = {
  scrollNav:{
  
    lexico:"<br> <h1>Escalas</h1> <p>Complete pensando que la recta es como una regla.</p>"
  },
  artifacts: {
      artifact_1: {
        border:true,
        board: 'board_1',
        conditions: [
          ["20"],["20"],["40"]
        ],
        engine: EngineEscalas,
      },
      artifact_2: {
        border:true,
        board: 'board_2',
        conditions: [
            [20]
        ],
        engine: EngineEscalas,
      },
      artifact_3: {
        border:true,
        board: 'board_3',
        conditions: [
            [10]
        ],
        engine: EngineEscalas,
      },
      artifact_4: {
        board: 'board_4',
        conditions: [
            [60]
        ],
        engine: EngineEscalas,
      },
      artifact_5: {
        board: 'board_5',
        conditions: [
            [15]
        ],
        engine: EngineEscalas,
      },
      artifact_6: {
        border:true,
        board: 'board_6',
        conditions: [
            [21]
        ],
        engine: EngineEscalas,
      },
      artifact_7: {
        board: 'board_7',
        conditions: [
            [20]
        ],
        engine: EngineEscalas,
      },
      artifact_raiting:{
        parent:"scroll-container",
        questions:{
          question_1:{
            value:"¿Fue fácil?",
          },
         
        },
        engine: EngineOwner
      } ,
    }
}


  
const contentMain = new CreateView(def, defBoards);
