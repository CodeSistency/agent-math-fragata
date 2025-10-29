const textUtils= {
  artifacts:{   
    lexico_1:{
      parent:"class-content",
      nodo:[
        {texto:'Escribir <b>a = 13</b>, indica que al número 13 lo llamamos <b>a</a>.'},
        {texto:'Del mismo modo, al escribir <b>b = 47</b>, se está indicando que al número 47 se le asigna el nombre <b>b</b>.'},
        {texto:'También se dice que "el <b>valor</b> de la letra <b>a</b> es 13" o que "el valor de la letra <b>b</b> es 47".'},
        {texto:'<b>Regla</b>'} , 
        {texto:'El número representado por <b>a</b> es menor que el número representado por <b>b</b>, porque <b>a</b> está a la izquierda de <b>b</b>.'},
       
],
      recursos:[{
          recurso:{
            styleRecurso: ['containerGraphics'],
            grafico: [{
                            texto: [{x: -2.9 ,y: 1.6, mensaje: "a" }, {x: 2.7 ,y: 1.6, mensaje: "b"}],  
                            linea: 
                              [
                                {punto_1: [-2.8,0], punto_2: [2.8, 0], stylesPoint_1:{visible:true}, stylesPoint_2:{visible:true},}
                              ],
                          }],
          }
        }],
      styleContainer:"note",
      engine: EngineOwner
    },
    
  }
  }
  

const defBoards = {
    board_1: {
      artifact: "artifact_1",
      points: [
        {text:{value:"a"}},{text:{value:"b"}}
      ],
      slider:[{},{}],
      type:2
    },
    board_2: {
        artifact: "artifact_2",
        points: [
          {text:{value:"b"}},{text:{value:"a"}}
        ],
        type:2
    },
    board_3: {
      artifact: "artifact_3",
      points: [
        {text:{value:"a"}},{text:{value:"b"}}
      ],
      type:2
    },  
    board_4: {
      artifact: "artifact_4",
      points: [
        {visible:false},{visible:false},{text:{value:"a"}},{visible:false},{text:{value:"b"}}
      ],
      type:2
    },  
   
   
    
  }
  
  
  const def = {
    scrollNav:{
      lexico:'Selecciona los números que podrían ser la letra cuyo valor se desconoce. (Pueden haber varios números, uno solo o inclusive ninguno).'},
    artifacts: {
      artifact_1: {
        border:true,
        board: 'board_1',
        parent: 'lexico-content',
        inputs:[
          {tag:"input",style:"inputPoint jhyh",value:"a=20"},
          {tag:"inputs", style:{form:"formEcalasCap1"},maxElementCheck:2,inputs:[
            {style:{input:"inputTableCheck"},value:{label:160,input:""},correctResponce:true},
            {style:{input:"inputTableCheck"},value:{label:19,input:""}},
            {style:{input:"inputTableCheck"},value:{label:5,input:""}},
            {style:{input:"inputTableCheck"},value:{label:20,input:""}},
            {style:{input:"inputTableCheck"},value:{label:30,input:""},correctResponce:true},
          ]}],
        conditions: [
          {checks:["160","30"]}
        ],
  
        engine: EngineEscalas,
      },
      artifact_2: {
        board: 'board_2',
        border:true,
        parent: 'lexico-content',
        inputs:[
          {tag:"input",style:"inputPoint",value:"a=20"},
          {tag:"inputs", style:{form:"formEcalasCap1"},maxElementCheck:2,inputs:[
            {style:{input:"inputTableCheck"},value:{label:160,input:""},correctResponce:true},
            {style:{input:"inputTableCheck"},value:{label:19,input:""}},
            {style:{input:"inputTableCheck"},value:{label:5,input:""}},
            {style:{input:"inputTableCheck"},value:{label:20,input:""}},
            {style:{input:"inputTableCheck"},value:{label:30,input:""},correctResponce:true},
          ]}],
        conditions: [
          {checks:["5","19"]}
        ],
  
        engine: EngineEscalas,
      },
      artifact_3: {
        board: 'board_3',
        parent: 'lexico-content',
        inputs:[
          {tag:"input",style:"inputPoint",value:"b=20"},
          {tag:"inputs", style:{form:"formEcalasCap1"},maxElementCheck:2,inputs:[
            {style:{input:"inputTableCheck"},value:{label:160,input:""}},
            {style:{input:"inputTableCheck"},value:{label:19,input:""},correctResponce:true},
            {style:{input:"inputTableCheck"},value:{label:5,input:""},correctResponce:true},
            {style:{input:"inputTableCheck"},value:{label:20,input:""}},
            {style:{input:"inputTableCheck"},value:{label:30,input:""}},
          ]}],
        conditions: [
          {checks:["5","19"]}
        ],
  
        engine: EngineEscalas,
      },
      artifact_4: {
        board: 'board_4',
        parent: 'lexico-content',
        inputs:[
          {tag:"input",style:"inputPoint",value:"a=151"},
          {tag:"inputs", style:{form:"formEcalasCap1"},maxElementCheck:1,inputs:[
            {style:{input:"inputPointForm"},value:{label:160,input:""},text:{},correctResponce:true},
            {style:{input:"inputPointForm"},value:{label:19,input:""},text:{}},
            {style:{input:"inputPointForm"},value:{label:5,input:""},text:{}},
            {style:{input:"inputPointForm"},value:{label:20,input:""},text:{}},
            {style:{input:"inputPointForm"},value:{label:30,input:""}},
          ]}]      ,
        conditions: [
          {checks:["160"]}
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
  };
  
  
  

 
const contentMain = new CreateView(textUtils, defBoards);
contentMain.initVIew(def)