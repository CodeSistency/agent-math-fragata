

const def = {
  scrollNav:{lexico: 'Recuerde que si la suma o resta no lleva paréntesis, se hace por la reglas de prioridad el producto o la división primero. Ponga paréntesis (en caso de necesidad) para que dé el número indicado.'},
  artifacts: {
    artifact_1: {
      artifactClass:"artifact-big-very-min",
      border:true,
      body:
     [ ["8 - 5 - 2", "1" ],
      [{tag:"form",style:{form:"formFlex"}, 
      selects:[
              {default:[{ valor: 'selecciona' }, { valor: '8 - 5 - 2' }, { valor: '(8 - 5) - 2' }, { valor: '8 (- 5 - 2)' }, { valor: '8 - (5 - 2)' }],   style:{select: "selectClaseDos"}},
             
              ]},"5"
          
      ],
    ],
      conditions: [
         
        ["8 - (5 - 2)"],
          
      ],
      engine: engineTable,
    },

    artifact_2: {
      artifactClass:"artifact-big-very-min",
      border:true,
      body:
     [      [{tag:"form",style:{form:"formFlex"}, 
     selects:[
             {default:[{ valor: 'selecciona' }, { valor: '24 + 2 · 3' }, { valor: '(24 + 2) · 3' }, { valor: '24 + (2 · 3)' }, { valor: '24 - (2 · 3)' }],   style:{select: "selectClaseDos"}},
            
             ]},"78"
         
     ],
      [{tag:"form",style:{form:"formFlex"}, 
      selects:[
              {default:[{ valor: 'selecciona' }, { valor: '24 + 2 · 3' }, { valor: '(24 + 2) · 3' }, { valor: '(24 · 2) · 3' }, { valor: '24 + (2 · 3)' }],   style:{select: "selectClaseDos"}},
             
              ]},"30"
          
      ],
    ],
      conditions: [
         
        ["(24 + 2) · 3"],
        ["24 + 2 · 3"],

      ],
      engine: engineTable,
    },
 
    artifact_3: {
      artifactClass:"artifact-big-very-min",
      border:true,
      body:
     [      [{tag:"form",style:{form:"formFlex"}, 
     selects:[
      {default:[{ valor: 'selecciona' }, { valor: '8 · (3 + 2)' }, { valor: '8 · 3 + 2' }, { valor: '(8 · 3) + 2' }, { valor: '8 + 3 + 2' }],   style:{select: "selectClaseDos"}},
            
             ]},"26"
         
     ],
      [{tag:"form",style:{form:"formFlex"}, 
      selects:[
              {default:[{ valor: 'selecciona' }, { valor: '8 · (3 + 2)' }, { valor: '8 · 3 + 2' }, { valor: '(8 · 3) + 2' }, { valor: '8 + 3 + 2' }],   style:{select: "selectClaseDos"}},
             
              ]},"40"
          
      ],
    ],
      
      conditions: [
         
        ["8 · 3 + 2", '(8 · 3) + 2'],
        ["8 · (3 + 2)"],

      ],
      engine: engineTable,
    },

    artifact_4: {
      artifactClass:"artifact-big-very-min",
      body:
      
     [      [{tag:"form",style:{form:"formFlex"}, 
     selects:[
      {default:[{ valor: 'selecciona' }, { valor: '21 / (3 + 4)' }, { valor: '21 / 3 + 4' }, { valor: '(21 / 3) + 4' }, { valor: '21 / (3 · 4)' }],   style:{select: "selectClaseDos"}},
            
             ]},"3"
         
     ],
      [{tag:"form",style:{form:"formFlex"}, 
      selects:[
              {default:[{ valor: 'selecciona' }, { valor: '16 - (5 - 2)' }, { valor: '16 (- 5 - 2)' }, { valor: '16 - 5 - 2' }],   style:{select: "selectClaseDos"}},
             
              ]},"9"
          
      ],
    ],
      conditions: [   
        ["21 / (3 + 4)"],
        ["16 - 5 - 2"],
      ],
      engine: engineTable,
    },

    artifact_5: {
      artifactClass:"artifact-big-very-min",
      body:
     [      [{tag:"form",style:{form:"formFlex"}, 
     selects:[
      {default:[{ valor: 'selecciona' }, { valor: '21 / (3 + 4)' }, { valor: '21 / 3 + 4' }, { valor: '(21 / 3) + 4' }, { valor: '21 / (3 · 4)' }],   style:{select: "selectClaseDos"}},
            
             ]},"11"
         
     ],
      [{tag:"form",style:{form:"formFlex"}, 
      selects:[
              {default:[{ valor: 'selecciona' }, { valor: '16 - (5 - 2)' }, { valor: '16 (- 5 - 2)' }, { valor: '16 - 5 - 2' }],   style:{select: "selectClaseDos"}},
             
              ]},"13"
          
      ],
    ],
      conditions: [   
        ["21 / 3 + 4", '(21 / 3) + 4'],
        ['16 - (5 - 2)'],
      ],
      engine: engineTable,
    },
     
    artifact_6: {
      artifactClass:"artifact-big-very-min",
      body:
     [      [{tag:"form",style:{form:"formFlex"}, 
     selects:[
      {default:[{ valor: 'selecciona' }, { valor: '21 + 6 / 3' }, { valor: '(21 + 6) / 3' }, { valor: '21 + (6 / 3)' }],   style:{select: "selectClaseDos"}},
            
             ]},"9"
         
     ],
      [{tag:"form",style:{form:"formFlex"}, 
      selects:[
              {default:[{ valor: 'selecciona' }, { valor: '16 - (5 + 2)' }, { valor: '16 (- 5 + 2)' }, { valor: '16 - 5 + 2' }],   style:{select: "selectClaseDos"}},
             
              ]},"13"
          
      ],
    ],
      
      conditions: [
         
        ["(21 + 6) / 3"],
        ["16 - 5 + 2"],

      ],
      engine: engineTable,
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
};



const contentMain = new CreateView(def);
