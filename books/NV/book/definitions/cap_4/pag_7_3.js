
const def = {
    scrollNav:true,
    artifacts: {
      artifact_1: {
        artifactClass:"artifact-big",
        body: [
          [{value:"Se sabe que una ecuación es construida con la fórmula <b>2x + 3</b> y que el resultado de evaluar la fórmula en la solución debe ser <b>13</b>"},{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},
            inputs:[{style:{input:"mathBig",span:"column max-width"},text:{span:'<b>¿Cual es la solución?</b>'}}]
          }],
          [{value:"Dé una ecuación cuya solución sea <b>3</b> y la operación de la fórmula sea <b>( )+2</b>"},{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},
            inputs:[{style:{input:"mathBig max-width",span:"column max-width"}}]
          }]
            ],
            conditions:[
                ["5"],
                ['x+2=5'],
        ],
        engine: engineTable,
      },
      artifact_2: {
        artifactClass:"artifact-big",
        body: [
          [{value:"Se sabe que una ecuación es construida con la fórmula <b>2x - 3</b> y que el resultado de evaluar la fórmula en la solución debe ser <b>5</b>"},{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},
            inputs:[{style:{input:"mathBig",span:"column max-width"},text:{span:'<b>¿Cual es la solución?</b>'}}]
          }],
          [{value:"Dé una ecuación cuya solución sea <b>5</b> y la operación de la fórmula sea <b>5·( )+2</b>"},{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},
            inputs:[{style:{input:"mathBig max-width",span:"column max-width"}}]
          }]
            ],
            conditions:[
                ["4"],
                ['5x+2=27'],
        ],
        engine: engineTable,
      },
      artifact_3: {
        artifactClass:"artifact-big",
        body: [
          [{value:"Se sabe que una ecuación es construida con la fórmula <b>5x + 3</b> y que el resultado de evaluar la fórmula en la solución debe ser <b>18</b>"},{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},
            inputs:[{style:{input:"mathBig",span:"column max-width"},text:{span:'<b>¿Cual es la solución?</b>'}}]
          }],
          [{value:"Dé una ecuación cuya solución sea <b> 6 </b> y la operación de la fórmula sea <b>3·( ) + 2</b>"},{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},
            inputs:[{style:{input:"mathBig max-width",span:"column max-width"}}]
          }]
            ],
            conditions:[
                ["3"],
                ["3x+2=20"],
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
  
  