const defBoards = {  
  board_1:{
      artifact: "artifact_1",
      arches_click:{
        semicircleSimpleTop:true,
        semicircleSimpleBelow:{heigth: -1},
        semicircleDashTop:{heigth: 2.3},
        semicircleDashBelow:{heigth: -2}
      },
      shapes:[
        {
          texts:[
            {x:-3.5,y:4.65,value:"5"},
          ],
        }
      ],
      type:[
        {type:1,mathfields:[{value:"2 x 5",disabled:true}], refLine:"lineBoard_0"},
        {type:1,mathfields:[{value:"3x4",disabled:true}], refLine:"lineBoard_1"},

      ],
      
      points_arches: [ 
        { arche: [1, 2, false, false, { heigth:1 }, 
          "btn_semicircleSimpleTop", 1, true , "Top", true] }
      ]
,
      
      
  },
  board_2:{
    artifact: "artifact_2",
    
    type:[
      {type:1,mathfields:[{value:"2 · x",disabled:true}], refLine:"lineBoard_0"},
      {type:1,mathfields:[{value:" 1 x 3", disabled:true}], refLine:"lineBoard_1"},],
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
      lexico_1: {
        nodo: [  { texto: "Cualquier camino tiene un <b>camienzo</b> y un <b>fin</b>.", atributos: { style: 'text-align:justify' }   }, ],
        recursos: [{
            recurso: {
              styleRecurso: ['intervalsSquare'],
              grafico: [{
                texto: [ { x: -3.4, y:-2, mensaje: 'Comienzo' }, { x: 2.4, y: -2, mensaje: 'Fin' },   ],
                linea:   [{punto_1: [-3,0], punto_2: [3, 0]}, ],
                circle:[
                  { punto_1:[-2.6,0], punto_2:[0,0], type:"semicircle",stylesPoint_1:{visible:true} },
                  { punto_1:[0,0], punto_2:[2.6,0], type:"semicircle",stylesPoint_2:{visible:true} },
                  { punto_1:[0,0], punto_2:[0,0],stylesPoint_2:{visible:true} },
  
                ],
              }],
  
            },
          },
  
        
        ],
  
  
        styleContainer: "note",
        engine: EngineOwner
      },
      lexico_2: {
        nodo: [ {  texto: "Y se puede ir del comienzo al fin en un solo paso. Ese sería el <b>camino simplificado</b>, sin escalas. La trayectoria del camino simplificado se llama trayectoria simplificada.",atributos: { style: 'text-align:justify' }},  ],
        recursos: [ { recurso: {
                styleRecurso: ['trajectoryContainer'],
                grafico: [{
                    texto: [
                        { x: -3.9, y: 2, mensaje: '<math-field contenteditable="false" class="squareInterval" style=" width:90px; height:65px;font-size:16px  ;">\\text{Trayectoria</math-field>' },
                        { x: -1.3, y: 2, mensaje: '<math-field contenteditable="false" class="squareInterval" style=" width:185px; height:65px;font-size:16px  ;">\\text{Camino}</math-field>' },
                        { x: -3.9, y: -2, mensaje: '<div style="width:90px;height:65px" class="squareInterval"></div>' },
                        { x: -1.3, y: -2, mensaje: '<div style="width:185px;height:65px" class="squareInterval"></div>' },
                        { x: 0.1, y:-1.6, mensaje: '3',styleText:{fontSize:16, cssClass:""} },
                        { x: 2.2, y: -1.6, mensaje: '3',styleText:{fontSize:16, cssClass:""} },
                        { x: -3.1, y: -2, mensaje: '2 x 3' ,styleText:{fontSize:16, cssClass:""}}, ],
                      linea: [ {punto_1: [-1,-3], punto_2: [3.5, -3]},  ],
                circle:[
                  { punto_1:[-0.8,-3], punto_2:[1.3,-3], type:"semicircle",stylesPoint_1:{visible:true} },
                  { punto_1:[1.3,-3], punto_2:[3.3,-3], type:"semicircle",stylesPoint_2:{visible:true} },
                  { punto_1:[1.3,-3], punto_2:[1.3,-3],stylesPoint_2:{visible:true} },
                ],  }], }, },
          {recurso: {
                styleRecurso: ['trajectoryContainer'],
                grafico: [{
                    texto: [
                        { x: -3.9, y: 2, mensaje: '<math-field contenteditable="false" class="squareInterval" style=" width:185px; height:65px;font-size:16px;">\\begin{center} \\begin{array}{c} \\text{Camino} \\\\ \\text{Simplificado} \\end{array} \\end{centermath-field>' },
                        { x: 1.3, y: 2, mensaje: '<math-field contenteditable="false" class="squareInterval" style=" width:95px; height:65px;font-size:16px  ;">\\begin{center} \\begin{array}{c} \\text{Trayectoria} \\\\ \\text{Simplificada} \\end{array} \\end{center</math-field>' },
                        { x: -3.9, y: -2, mensaje: '<div style="width:185px;height:65px" class="squareInterval"></div>' },
                        { x: 1.3, y: -2, mensaje: '<div style="width:95px;height:65px" class="squareInterval"></div>' },
                        { x: -1.34, y:-1.6, mensaje: '6' },
                        { x: 2.5, y: -2, mensaje: '6' },  ],
                      linea:  [ {punto_1: [-3.5,-3], punto_2: [1., -3]},],
                circle:[
                  { punto_1:[0.8,-3], punto_2:[0.8,-3], type:"semicircle",stylesPoint_2:{visible:true} },
                  { punto_1:[-1.22,-3], punto_2:[-1.22,-3],stylesPoint_2:{visible:true} },
                ],
                ellipse:[  { punto_1:[-3.3,-3], punto_2:[-1.23,-2.12],punto_3:[0.8,-3], type:"circumcirclearc",stylesPoint_1:{visible:true,fixed:false }, styles:{dash:2}   },  ],  }],  },  }, 
        ],
        styleContainer: "note",
        engine: EngineOwner
      },
      lexico_3: {
          nodo: [ 
          {  texto: "Cuando no hay letras en la trayectoria, la trayectoria simplificada es un número.", atributos: { style: 'text-align:justify' }   },
          {texto: "Convención: el simplificado lo trazaremos en punteado en la misma recta del camino.",atributos: { style: 'text-align:justify' }  }, ],
        recursos: [{
            recurso: {
            styles: {  boundingbox: [-4, 2, 4, -2], axies: {y: { visible: false },   x: { visible: false }    }, },
            styleRecurso: ['intervalsSquare'],
                grafico: [
                  {texto: [
                        { x: -3.9, y: 0, mensaje: '<math-field contenteditable="false" class="squareInterval" style=" width:50px; height:80px;font-size:16px;">\\text{2 x 7</math-field>' },
                        { x: 2.6, y:0, mensaje: '<math-field contenteditable="false" class="squareInterval" style=" width:50px; height:80px;font-size:16px;">\\text{14}</math-field>' },
                        { x:-2.5, y:0, mensaje: '<div style="width:185px;height:80px" class="squareInterval"></div>' },
                        { x: -0.6, y:0.2, mensaje: '7' , styleText:{fontSize:16, cssClass:""}}, ],
                linea: [ {punto_1: [-2.3,-0.5], punto_2: [2.3, -0.5]},],
                points:[ {x:-2,y:-0.5},   {x:-1.19,y:-0.5},  {x:-0.39,y:-0.5}, {x:0.44,y:-0.5},  {x:1.28,y:-0.5},  {x:2.02,y:-0.5}],
                   ellipse:[
                    { punto_1:[-1.19,-0.5], punto_2:[-0.97,-0.07],punto_3:[-0.39,-0.5], type:"circumcirclearc", }, 
                    { punto_1:[-0.39,-0.5], punto_2:[-0.17,-0.07],punto_3:[0.44,-0.5], type:"circumcirclearc", },
                    { punto_1:[-1.19,-0.5], punto_2:[-0.97,0.5],punto_3:[0.44,-0.5], type:"circumcirclearc", styles:{dash:2}    }, 
                  ],  }], },  },  ],
        styleContainer: "note",
        engine: EngineOwner
      },
      lexico_4: {
        nodo: [ { texto: 'Cuando no hay letras, la simplificada la pondremos sin el punto ( . ) o con el "por" ( x ) de la multiplicación.', atributos: { style: 'text-align:justify' } },  ],
        recursos: [{ recurso: {
                styles: {  boundingbox: [-4, 2, 4, -2], axies: {y: { visible: false },   x: { visible: false }    }, },
                styleRecurso: ['intervalsSquare'],
                grafico: [{
                    texto: [
                        { x: -3.9, y: 0, mensaje: '<div contenteditable="false" class="squareInterval" style=" width:50px;height:80px;">3 · y</div>' },
                        { x: 2.6, y:0, mensaje: '<divcontenteditable="false" class="squareInterval" style=" width:50px; height:80px;">3y</div>' },
                        { x:-2.45, y:0, mensaje: '<div style="width:185px;height:80px" class="squareInterval"></div>' },
                        { x: -0.1, y:0.4, mensaje: 'y' }, 
                       ],
                      linea: [   {punto_1: [-2,-0.5], punto_2: [2, -0.5]},  ],
                points:[ {x:-1.75,y:-0.5},   {x:-1.1,y:-0.5},  {x:-0.4,y:-0.5},  {x:0.4,y:-0.5},     {x:1.1,y:-0.5},    {x:1.75,y:-0.5}  ],

                 ellipse:[ 
                  {  punto_1:[-1.1,-0.5], punto_2:[-0.8,-0.01],   punto_3:[-0.4,-0.5],  type:"circumcirclearc",  }, 
                  {  punto_1:[-0.4,-0.5],   punto_2:[0,-0.01],punto_3:[0.4,-0.5], type:"circumcirclearc",  },
                  {  punto_1:[0.40,-0.5],  punto_2:[0.8,-0.01], punto_3:[1.1,-0.5], type:"circumcirclearc",  },
                  {  punto_1:[-1.1,-0.5], punto_2:[0,0.77],  punto_3:[1.1,-0.5],  type:"circumcirclearc", styles:{dash:2}  }, 
                ],}],}, },
        ],
        styleContainer: "note",
        engine: EngineOwner
      },
      artifact_1: {
        return: true,
        inputCurve:true,
        board: 'board_1',
        engine: EngineEscalas,
        conditions: [
          ["10"],["12"], 
         {curves:{ id:"lineBoard_0",   steps: 1, type: "Top",   simplifiedPath: true, curves: 2 , inputCurve:false }}, 
          {curves:{id:"lineBoard_1",steps: 1, type:"Top",  simplifiedPath: true,curves: 3, input :["4"]}},
      ],
      },
      artifact_2: {
        return: true,
        inputCurve:true,
        board: 'board_2',
        conditions:[
          ["2x"],["3"] ,
          {curves:{ id:"lineBoard_0",   steps: 1, type: "Top",   simplifiedPath: true, curves: 2 , input :["x"]  }}, 
          {curves:{id:"lineBoard_1",steps: 1, type:"Top",curves: 1, input :["3"]}},
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
  