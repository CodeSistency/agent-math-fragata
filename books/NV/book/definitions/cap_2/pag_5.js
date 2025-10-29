const def = {
    scrollNav:true,
    artifacts: {
      artifact_1: {
        artifactClass:"artifact-big",
        body: [
        [
            {tag:"form",value:"<p id='p1' class='column gap-0'> <span id='span3' class='spanTableCheck' > <b>Expresión</b> x + 2 - 3 </span> <span id='span1' class='spanTableCheck' ><b>¿Cuántas Operaciones Hay?</b></span> <span id='span2' class='spanTableCheck'> <b>¿Hay Paréntesis?</b></span> </p>",style:{form:"formInputBig"},
            style:{form:"formSelectInput",td:"tdNotline p-0"},
            checks:[{maxElementCheck:2, parent:"span1", inputs:[
                    {style:{input:"inputTableCheck"},value:{label:"Sumas",input:""},correctResponce:true},
                    {style:{input:"inputTableCheck"},value:{label:"Restas",input:""},correctResponce:true},
                    {style:{input:"inputTableCheck"},value:{label:"Multiplicaciones",input:""}, },
                    {style:{input:"inputTableCheck"},value:{label:"Divisiones",input:""}},
                  ]}],
            selects:[{  parent:"span2",default:[
              { valor: 'selecciona' }, 
              { valor: 'sí' }, 
              { valor: 'no' }],   style:{select: "selectClase mathBig"}}],
            },
        ]
    ],
        conditions: [
          {checks:["Sumas","Restas"]},
          ["no"],
          ],
        engine: engineTable,
      },
      artifact_2: {
        artifactClass:"artifact-big",
        body: [
        [
            {tag:"form",value:"<p id='p1' class='column gap-0'> <span id='span3' class='spanTableCheck' > <b>Expresión</b> 2 · (5 + 8) </span> <span id='span1' class='spanTableCheck' ><b>¿Cuántas Operaciones Hay?</b></span> <span id='span2' class='spanTableCheck'> <b>¿Hay Paréntesis?</b></span> </p>",style:{form:"formInputBig"},
            style:{form:"formSelectInput",td:"tdNotline p-0"},
            checks:[{maxElementCheck:2, parent:"span1", inputs:[
                    {style:{input:"inputTableCheck"},value:{label:"Sumas",input:""},correctResponce:true},
                    {style:{input:"inputTableCheck"},value:{label:"Restas",input:""}},
                    {style:{input:"inputTableCheck"},value:{label:"Multiplicaciones",input:""}, correctResponce:true},
                    {style:{input:"inputTableCheck"},value:{label:"Divisiones",input:""}},
                  ]}],
            selects:[{  parent:"span2",default:[
              { valor: 'selecciona' }, 
              { valor: 'sí' }, 
              { valor: 'no' }],   style:{select: "selectClase mathBig"}}],
            },
        ]
    ],
        conditions: [
          {checks:["Sumas","Multiplicaciones"]},
          ["sí"],
          ],
        engine: engineTable,
      },
      artifact_3: {

        artifactClass:"artifact-big",
        body: [
        [
            {tag:"form",value:"<p id='p1' class='column gap-0'> <span id='span3' class='spanTableCheck' > <b>Expresión</b> x / (2 - 3) </span> <span id='span1' class='spanTableCheck' ><b>¿Cuántas Operaciones Hay?</b></span> <span id='span2' class='spanTableCheck'> <b>¿Hay Paréntesis?</b></span> </p>",style:{form:"formInputBig"},
            style:{form:"formSelectInput",td:"tdNotline p-0"},
            checks:[{maxElementCheck:2, parent:"span1", inputs:[
                    {style:{input:"inputTableCheck"},value:{label:"Sumas",input:""}},
                    {style:{input:"inputTableCheck"},value:{label:"Restas",input:""}, correctResponce:true},
                    {style:{input:"inputTableCheck"},value:{label:"Multiplicaciones",input:""}},
                    {style:{input:"inputTableCheck"},value:{label:"Divisiones",input:""},correctResponce:true},
                  ]}],
            selects:[{  parent:"span2",default:[
              { valor: 'selecciona' }, 
              { valor: 'sí' }, 
              { valor: 'no' }],   style:{select: "selectClase mathBig"}}],
            },
        ]
    ],
        conditions: [
          {checks:["Divisiones","Restas"]},
          ["sí"],
          ],
        engine: engineTable,
      },
      artifact_4: {
        artifactClass:"artifact-big",
        body: [
        [
            {tag:"form",value:"<p id='p1' class='column gap-0'> <span id='span3' class='spanTableCheck' > <b>Expresión</b> 7 - 2(x / y) </span> <span id='span1' class='spanTableCheck' ><b>¿Cuántas Operaciones Hay?</b></span> <span id='span2' class='spanTableCheck'> <b>¿Hay Paréntesis?</b></span> </p>",style:{form:"formInputBig"},
            style:{form:"formSelectInput",td:"tdNotline p-0"},
            checks:[{maxElementCheck:3, parent:"span1", inputs:[
                    {style:{input:"inputTableCheck"},value:{label:"Sumas",input:""}},
                    {style:{input:"inputTableCheck"},value:{label:"Restas",input:""}, correctResponce:true},
                    {style:{input:"inputTableCheck"},value:{label:"Multiplicaciones",input:""}, correctResponce:true},
                    {style:{input:"inputTableCheck"},value:{label:"Divisiones",input:""},correctResponce:true},
                  ]}],
            selects:[{  parent:"span2",default:[
              { valor: 'selecciona' }, 
              { valor: 'sí' }, 
              { valor: 'no' }],   style:{select: "selectClase mathBig"}}],
            },
        ]
    ],
        conditions: [
          {checks:["Restas","Multiplicaciones", "Divisiones"]},
          ["sí"],
          ],
        engine: engineTable,
      },
      artifact_5: {
        artifactClass:"artifact-big",
        body: [
        [
            {tag:"form",value:"<p id='p1' class='column gap-0'> <span id='span3' class='spanTableCheck' > <b>Expresión</b> x - (7 - 2(x / y)) </span> <span id='span1' class='spanTableCheck' ><b>¿Cuántas Operaciones Hay?</b></span> <span id='span2' class='spanTableCheck'> <b>¿Hay Paréntesis?</b></span> </p>",style:{form:"formInputBig"},
            style:{form:"formSelectInput",td:"tdNotline p-0"},
            checks:[{maxElementCheck:3, parent:"span1", inputs:[
                    {style:{input:"inputTableCheck"},value:{label:"Sumas",input:""}},
                    {style:{input:"inputTableCheck"},value:{label:"Restas",input:""}, correctResponce:true},
                    {style:{input:"inputTableCheck"},value:{label:"Multiplicaciones",input:""}, correctResponce:true},
                    {style:{input:"inputTableCheck"},value:{label:"Divisiones",input:""},correctResponce:true},
                  ]}],
            selects:[{  parent:"span2",default:[
              { valor: 'selecciona' }, 
              { valor: 'sí' }, 
              { valor: 'no' }],   style:{select: "selectClase mathBig"}}],
            },
        ]
    ],
        conditions: [
          {checks:["Restas","Multiplicaciones", "Divisiones"]},
          ["sí"],
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
  
  const textUtils= {
    artifacts:{
      lexico_1:{
        nodo:[
          {
            texto:"Paréntesis y prioridad", etiqueta: "h1", 
            atributos:{style: 'text-align:center'} 
          },
          {
            texto:"<b style='font-size: 12'>Expresiones con paréntesis</b>", 
         atributos:{style: 'text-align:justify'} 
          },
          {
            texto:"3 (x + 2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3 (x + 2) + x - (7 - 2(x / y))", etiqueta: "p", 
         atributos:{style: 'text-align:justify'} 
          },
          {
            texto:"<b style='font-size: 12'>Expresiones sin paréntesis</b", 
         atributos:{style: 'text-align:justify'} 
          },
          {
            texto:"7 - 2 + 3 - 6 / 2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2 ‧ 5 + 8", etiqueta: "p", 
         atributos:{style: 'text-align:justify'} 
          },
          {
            texto:"Los paréntesis sirven para indicar cuáles operaciones deben ser realizadas primero.", etiqueta: "p", 
         atributos:{style: 'text-align:justify'} 
          },
        ],
        styleContainer: "note",
        engine: EngineOwner
      },
      
    }
  }
  
  const contentMain = new CreateView(textUtils);
contentMain.initVIew(def)
  
