const textUtils= {
  artifacts:{
   lexico_1:{
      nodo:[
        {
          texto:"Cuando hay paréntesis.", etiqueta: "h2", 
          atributos:{style: 'text-align:justify'} 
        },
        {
          texto:"<b>Regla de paréntesis:</b> En una expresión de <b>dos operaciones con paréntesis</b> se hace primero la operación que está dentro del paréntesis.", etiqueta: "p", 
          atributos:{style: 'text-align:justify'} 
        },
       
        
      ],
      
      engine: EngineOwner,
      styleContainer: "note",
    },
    
    lexico_2:{
      nodo:[
        {
          texto:"Cuando no hay paréntesis.",etiqueta:"h2",
          atributos:{style: 'text-align:justify'} 
        },
        {
          texto:" <b>Regla 1:</b> En una expresión sin paréntesis de dos operaciones que no son ni multiplicación ni división se efectúan las operaciones de izquierda a derecha.",
          atributos:{style: 'text-align:justify'} 
        },
        {
          texto:"<b>Regla 2:</b> En una expresión <b>sin paréntesis</b> de <b>dos operaciones que no son ni suma ni resta</b> se efectúan las operaciones de izquierda a derecha.",
          atributos:{style: 'text-align:justify'} 
        },
       
        
      ],
      engine: EngineOwner,
      styleContainer: "note",
    },
   lexico_3:{
      nodo:[
        {
          texto:"<b>Regla de prioridad:</b> En una expresión de <b>varias operaciones sin paréntesis, donde aparecen suma ( o resta ) y producto ( o división)</b>,se hace primero el producto ( o la división) para transformarla en una que tenga sólo sumas o restas. Luego se aplica la regla 1.",
          atributos:{style: 'text-align:justify'} 
        }
      ],
      engine: EngineOwner,
      styleContainer: "note",
    },
    lexico_4:{
      nodo:[
        {
          texto:`Note que en las expresiones <b>7 - 2 x 3</b> y <b>7 - ( 2 x 3 )</b> las operaciones se hacen en el mismo orden. Y esto se debe a la regla de prioridad. A veces en vez de escribir <b>3 x 2</b> se escribirá <b>3 ‧ 2</b>  en la medida  en que el contexto permita no confundirlo con <b>3,2</b>. Es preferible escribir <b>3 x 200</b> que <b>3.200</b>, porque esta última expresión puede confundirse con "tres mil doscientos".`
          ,atributos:{style: 'text-align:justify'} 
        },
      ],
      engine: EngineOwner,
      styleContainer: "note",
    }
  }
}


const def = {
    scrollNav:true,
    artifacts: {
     example_1: {

        body: [
          [" ( 7 - 2 ) x 3 = 5 x 3 = 15 ", " 7 - ( 2 x 3) = 7 - 6 = 1 "],
  
        ],
        engine: engineTable,
        prueba_t:true,
        parent:"lexico_1",
        
      },
          example_2: {
            body: [
                ["  7 - 2  + 3 = 5 + 3 = 8 ", " 7 - 2 - 3 = 5 - 3 = 2 "],
      
            ],
            engine: engineTable,
            prueba_t:true,
        parent:"lexico_2"
           
            
          },
          example_3: {
            body: [
              ["  7 + 2 + 3 = 9 + 3 = 12 ", " 7 + 2 - 3 = 9 - 3 = 6 "],
      
            ],
            engine: engineTable,
            prueba_t:true,
        parent:"lexico_2"
          },
          example_4: {
            body: [
              ["  7 x 2 x 3 = 14 x 3 = 42 ", " 7 / 2 x 3 = 3,5 x 3 = 10,5 "],
      
            ],
            engine: engineTable,
            prueba_t:true,
            parent:"lexico_3"
          },
          example_5: {
            body: [
              ["  7 x 2 / 3 = 14 x 3 = 4,666... ", " 7 / 2 / 3 = 3.5 / 3 = 1,166..."],
      
            ],
            engine: engineTable,
            prueba_t:true,
            parent:"lexico_3"
          },
          example_6: {

            valuesDefault: [
              {
                type: 5,
      
                valueA: " ",
                valueB: " ",
                operador1: " ",
                valueC: " ",
                valueD: " ",
                operador2: " ",
                valueE: " ",
      
      
                content: "body",
                id: "jsxgraph",
              },
            ],
            point :[{
              coordenada: [3,-4.5],
              texto: "Arriba del Diagrama",
              SizeText: 14
          },{
          coordenada: [3,-7.5],
              texto: "Abajo del Diagrama",
              SizeText: 14
          }],
          
            tmp: "tmp",
            engine: EngineDiagrama,
          },
          artifact_1: {
           artifactClass:"artifact-big-very-min",
            body: [
              [{tag:"form",style:{form:"flex-row"},
              value:" ¿Cuál es la primera operación que se hace en un diagrama? <br> ¿La de más arriba o la de más abajo? <br>", selects:[{default: [{ valor: 'selecciona' }, { valor: "Arriba" }, { valor: 'Abajo' }], style:{select:"selectClase mathBig"}}] }],
              [{tag:"form",style:{form:"flex-row"},
              value:' ¿Cuál es la primera operación que se hace en una expresión? <br> ¿La de "más dentro" de los paréntesis o la que no lo está? <br>', selects:[{default: [{ valor: 'selecciona' }, { valor: "la de más dentro" }, { valor: 'La que no lo está' }],style:{select:"selectClase mathBig"}}] }],
            ],
            conditions: [
              ["arriba"],["la de más dentro"]
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
  
  
  const contentMain = new CreateView(textUtils);
  contentMain.initVIew(def)
