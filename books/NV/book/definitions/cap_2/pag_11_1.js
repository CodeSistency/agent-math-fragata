
  const def = {
    scrollNav:{lexico: 'Recuerde que si la suma o resta no lleva paréntesis, se hace por la reglas de prioridad el producto o la división primero. Ponga paréntesis (en caso de necesidad) para que dé el número indicado.'},
  artifacts: {
    artifact_1: {
      artifactClass:"artifact-big-very-min",
      body:
     [      [{tag:"form",style:{form:"formFlex"}, 
     selects:[
             {default:[{ valor: 'selecciona' }, { valor: '8 / 2 + 2' }, { valor: '8 / (2 + 2)' }, { valor: '8 / 2 - 2' }, { valor: '8 · 2 - 2' }],   style:{select: "selectClaseDos"}},
            
             ]},"2"
         
     ],
      [{tag:"form",style:{form:"formFlex"}, 
      selects:[
        {default:[{ valor: 'selecciona' }, { valor: '8 / 2 + 2' }, { valor: '8 / (2 + 2)' }, { valor: '8 / 2 - 2' }, { valor: '8 · 2 - 2' }],   style:{select: "selectClaseDos"}},
             
              ]},"6"
          
      ],
    ],
      
      conditions: [
         
        ["8 / (2 + 2)", '8 / 2 - 2'],
        ["8 / 2 + 2"],

      ],
      engine: engineTable,
    },
    artifact_2: {
      artifactClass:"artifact-big-very-min",
      body:
     [      [{tag:"form",style:{form:"formFlex"}, 
     selects:[
      {default:[{ valor: 'selecciona' }, { valor: '8 + 2 / 2' }, { valor: '(8 + 2) / 2' }, { valor: '8 / 2 - 2' }, { valor: '8 · 2 + 2' }],   style:{select: "selectClaseDos"}},
            
             ]},"5"
         
     ],
      [{tag:"form",style:{form:"formFlex"}, 
      selects:[
        {default:[{ valor: 'selecciona' }, { valor: '8 + 2 / 2' }, { valor: '(8 + 2) / 2' }, { valor: '8 / 2 - 2' }, { valor: '8 · 2 + 2' }],   style:{select: "selectClaseDos"}},
             
              ]},"9"
          
      ],
    ],
      
      conditions: [
         
        ["(8 + 2) / 2"],
        ["8 + 2 / 2"],

      ],
      engine: engineTable,
    },
 
    artifact_3: {
      artifactClass:"artifact-big-very-min",
      body:
     [      [{tag:"form",style:{form:"formFlex"}, 
     selects:[
      {default:[{ valor: 'selecciona' }, { valor: '9 - (5 - 2)' }, { valor: '9 - 5 - 2' }, { valor: '9 + (5 + 2)' }, { valor: '9 + 5 + 2' }],   style:{select: "selectClaseDos"}},
            
             ]},"6"
         
     ],
      [{tag:"form",style:{form:"formFlex"}, 
      selects:[
        {default:[{ valor: 'selecciona' }, { valor: '9 - (5 - 2)' }, { valor: '9 - 5 - 2' }, { valor: '9 + (5 + 2)' }, { valor: '9 + 5 + 2' }],   style:{select: "selectClaseDos"}},
             
              ]},"2"
          
      ],
    ],
      conditions: [   
        ["9 - (5 - 2)"],
        ["9 - 5 - 2"],
      ],
      engine: engineTable,
    },

    artifact_4: {
      artifactClass:"artifact-big-very-min",
      body:
     [      [{tag:"form",style:{form:"formFlex"}, 
     selects:[
      {default:[{ valor: 'selecciona' }, { valor: '11 - (3 + 2)' }, { valor: '11 - 3 + 2' }, { valor: '11 + (3 - 2)' }, { valor: '11 + 3 - 2' }],   style:{select: "selectClaseDos"}},
            
             ]},"6"
         
     ],
      [{tag:"form",style:{form:"formFlex"}, 
      selects:[
              {default:[{ valor: 'selecciona' }, { valor: '27 / (9 / 3)' }, { valor: '27 / 9 / 3' },  { valor: '27 - (9 / 3)' }, { valor: '27 / (9 - 3)' }],   style:{select: "selectClaseDos"}},
             
              ]},"9"
          
      ],
    ],
      conditions: [
        ["11 - (3 + 2)"],
        ["27 / (9 / 3)"],
      ],
      engine: engineTable,
    },

    artifact_5: {
      artifactClass:"artifact-big-very-min",
      body:
     [      [{tag:"form",style:{form:"formFlex"}, 
     selects:[
      {default:[{ valor: 'selecciona' }, { valor: '(14 - 4) / 2' }, { valor: '14 - 4 / 2' }, { valor: '(14 - 4) · 2' }, { valor: '(14 - 4) - 2' }],   style:{select: "selectClaseDos"}},
            
             ]},"5"
         
     ],
      [{tag:"form",style:{form:"formFlex"}, 
      selects:[
              {default:[{ valor: 'selecciona' }, { valor: '11 - (3 + 2)' }, { valor: '11 - 3 + 2' }, { valor: '11 + 3 - 2' }, { valor: '11 + (3 - 2)' }],   style:{select: "selectClaseDos"}},
             
              ]},"10"
          
      ],
    ],
      
      conditions: [
         
        ["(14 - 4) / 2"],
        ["11 - 3 + 2"],

      ],
      engine: engineTable,
    },
     
    artifact_6: {
      artifactClass:"artifact-big-very-min",
      body:
     [      [{tag:"form",style:{form:"formFlex"}, 
     selects:[
      {default:[{ valor: 'selecciona' }, { valor: '11 · 3 + 2' }, { valor: '11 · (3 + 2)' }, { valor: '11 · (-3 + 2)' }],   style:{select: "selectClaseDos"}},
            
             ]},"55"
         
     ],
      [{tag:"form",style:{form:"formFlex"}, 
      selects:[
              {default:[{ valor: 'selecciona' }, { valor: '14 - 4 / 2' }, { valor: '(14 - 4) / 2' }, { valor: '14 + 4 / 2' }],   style:{select: "selectClaseDos"}},
             
              ]},"12"
          
      ],
    ],
      
      conditions: [
         
        ["11 · (3 + 2)"],
        ["14 - 4 / 2"],

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

