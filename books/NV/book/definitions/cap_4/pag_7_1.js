
const def = {
    scrollNav:true,
    artifacts: {
      artifact_1: {
        artifactClass:"artifact-min",
        body: [
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},value:"<div id='div_Ecuacion'class='column max-width'><b>Ecuación</b>3x - 6 = 30</div>",
            inputs:[{style:{input:"mathBig max-width",span:"column max-width"},text:{span:'<b>Fórmula</b>'}}]
          }],
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom",span:"column"},
            inputs:[{style:{input:"mathBig max-width",span:"max-width column"},text:{span:'<b>Operación</b>'}}]
          }],
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},
            inputs:[{style:{input:"mathBig",span:"tdNotline column"},text:{span:'<b>Incógnita</b>'}},{style:{input:"mathBig", span:"tdNotline column"},text:{span:'<b>Solución</b>'}}]
          }],
            ],
            conditions:[
                ["3x-6"],
                ['3\\left(\\right)-6'],
                ["x"],
                ["12"]
        ],
        engine: engineTable,
      },
      artifact_2: {
        artifactClass:"artifact-min",
        body: [
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},value:"<div id='div_Ecuacion'class='column max-width'><b>Ecuación</b>4 (y + 2) = 12</div>",
            inputs:[{style:{input:"mathBig max-width",span:"column max-width"},text:{span:'<b>Fórmula</b>'}}]
          }],
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom",span:"column"},
            inputs:[{style:{input:"mathBig max-width",span:"max-width column"},text:{span:'<b>Operación</b>'}}]
          }],
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},
            inputs:[{style:{input:"mathBig",span:"tdNotline column"},text:{span:'<b>Incógnita</b>'}},{style:{input:"mathBig", span:"tdNotline column"},text:{span:'<b>Solución</b>'}}]
          }],
            ],
            conditions:[
                ['4\\left(y+2\\right)'],
                ['4\\left(\\left(\\right)+2\\right)'],
                ["y"],
                ["1"]
        ],
        engine: engineTable,
      },
      artifact_3: {
        artifactClass:"artifact-min",
        body: [
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},value:"<div id='div_Ecuacion'class='column max-width'><b>Ecuación</b>(z / 3) - 5 = 10</div>",
            inputs:[{style:{input:"mathBig max-width",span:"column max-width"},text:{span:'<b>Fórmula</b>'}}]
          }],
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom",span:"column"},
            inputs:[{style:{input:"mathBig max-width",span:"max-width column"},text:{span:'<b>Operación</b>'}}]
          }],
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},
            inputs:[{style:{input:"mathBig",span:"tdNotline column"},text:{span:'<b>Incógnita</b>'}},{style:{input:"mathBig", span:"tdNotline column"},text:{span:'<b>Solución</b>'}}]
          }],
          
            ],
            conditions:[
                ['\\left(z/3\\right)-5'],
                ['\\left(\\left(\\right)/3\\right)-5'],
                ["z"],
                ["45"]
        ],
        engine: engineTable,
      },
      artifact_4: {
        artifactClass:"artifact-min",
        body: [
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},
          inputs:[{style:{input:"mathBig max-width",span:"column max-width"},text:{span:'<b>Ecuación</b>'}},{style:{input:"displayNone",span:"column max-width"},text:{span:'<b>Fórmula</b> 5x + 3'}}]
          }],
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom",span:"column"},
            inputs:[{style:{input:"mathBig max-width",span:"max-width column"},text:{span:'<b>Operación</b>'}}]
          }],
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},
            inputs:[
              {style:{input:"mathBig",span:"tdNotline column"},text:{span:'<b>Incógnita</b>'}},{style:{input:"displayNone", span:"tdNotline column"},text:{span:'<b>Solución</b> 1'}}]
          }],
            ],
            conditions:[
                ["5x+3=8"],
                ['5\\left(\\right)+3'],
                ["x"],
        ],
        engine: engineTable,
      },
      artifact_5: {
        artifactClass:"artifact-min",
        body: [
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},
            inputs:[{style:{input:"mathBig max-width",span:"column max-width"},text:{span:'<b>Ecuación</b>'}},{style:{input:"mathBig max-width",span:"column max-width"},text:{span:'<b>Fórmula</b>'}}]
          }],
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom",span:"column"},
            inputs:[{style:{input:"displayNone",span:"max-width column"},text:{span:'<b>Operación</b> 7() - 3'}}]
          }],
          [{ tag:"form", style:{ form: "formSelectInput flex-row", td:"tdNotlineBottom"},
            inputs:[{style:{input:"displayNone",span:"tdNotline column"},text:{span:'<b>Incógnita</b>h'}},{style:{input:"displayNone", span:"tdNotline column"},text:{span:'<b>Solución</b> 5'}}]
          }],
            ],
            conditions:[
                ["7h-3=32"],
                ["7h-3"],
                
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
  
  