const def = {
  scrollNav:true,
  artifacts: {
    artifact_1: {
      subInputType: 3, 
      lastInput: true,
      superiorInput:  true,
      subInputType: 1,
      boundingbox: [-7, 9, 7, -9.5],
      valuesDefault: [
        {
          type: 2,
          valueA: "8",
          valueB: "4",
          valueC: "2",
          valueD: "", 
          valueE: "",
          valueF: "8+(4+2)",
          operador1: "+",
          operador2: "+",
          id: "jsxgraph",
          content: "body",
        },

        {
          type: 1,
          valueA: "8",
          valueB: "4",
          valueC: "2",
          valueD: "",
          valueE: "",
          valueF: "(8+4)+2",
          operador1: "+",
          operador2: "+",
          id: "jsxgraph_2",
          content: "body",
        },
      ],
      operacion: 'Suma',
      optionsToSelect: [['Selecciona'],['8 + (4 + 2) = (8 + 4) + 2'], ['8 + (4 + 2) ≠ (8 + 4) + 2']],
      optionsToSelect2: [['Selecciona'],['suma es asociativa'], ['suma no es asociativa']],
      radio: true,
      radioDisabled: false,
      tmp: "tmp2",
      conditions: [["6"], ["14"], ["12"], ["14"],['8 + (4 + 2) = (8 + 4) + 2'], ['suma es asociativa'],{checks:["Si"]}],
      engine: EngineDiagrama,
    },
    artifact_2: {
      subInputType: 3, 
      lastInput: true,
      superiorInput:  true,
      subInputType: 1,
      boundingbox: [-7, 9, 7, -9.5],
      valuesDefault: [
        {
          type: 2,
          valueA: "8",
          valueB: "4",
          valueC: "2",
          valueD: "", 
          valueE: "",
          valueF: "",
          operador1: "-",
          operador2: "-",
          id: "jsxgraph_3",
          content: "body",
        },

        {
          type: 1,
          valueA: "8",
          valueB: "4",
          valueC: "2",
          valueD: "",
          valueE: "",
          valueF: "",
          operador1: "-",
          operador2: "-",
          id: "jsxgraph_4",
          content: "body",
        },
      ],
      operacion: 'Resta',
      conditions: [["2"], ["6"], ["8-\\left(4-2\\right)"], ["4"], ["2"], ['\\left(8-4\\right)-2'], ['8 - (4 - 2) ≠ (8 - 4) - 2'], ['resta no es asociativa'],{checks:["No"]}],
      optionsToSelect: [["Selecciona"], ['8 - (4 - 2) = (8 - 4) - 2'], ['8 - (4 - 2) ≠ (8 - 4) - 2']],
      optionsToSelect2: [["Selecciona"], ['resta es asociativa'], ['resta no es asociativa']],
      radio: true,
      radioDisabled: false,
      tmp: "tmp2",
      engine: EngineDiagrama,
    },
    artifact_3: {
      subInputType: 3, 
      lastInput: true,
      superiorInput:  true,
      subInputType: 1,
      boundingbox: [-7, 9, 7, -9.5],
      valuesDefault: [
        {
          type: 2,
          valueA: "8",
          valueB: "4",
          valueC: "2",
          valueD: "", 
          valueE: "",
          valueF: "",
          operador1: "",
          operador2: "",
          id: "jsxgraph_5",
          content: "body",
        },

        {
          type: 1,
          valueA: "8",
          valueB: "4",
          valueC: "2",
          valueD: "",
          valueE: "",
          valueF: "",
          operador1: "",
          operador2: "",
          id: "jsxgraph_6",
          content: "body",
        },
      ],
      operacion: 'Multiplicación',
      conditions: [["\\cdot","."], ["8"], ["\\cdot","."], ["64"], ["8\\cdot\\left(4\\cdot2\\right)"], ["\\cdot","."], ['32'], ['\\cdot',"."], ['64'], ["\\left(8\\cdot4\\right)\\cdot2"], ['8 · (4 · 2) = (8 · 4) · 2'],[ 'multiplicación es asociativa'],{checks:["Si"]}],
      optionsToSelect: [["Selecciona"], ['8 · (4 · 2) = (8 · 4) · 2'], ['8 · (4 · 2) ≠ (8 · 4) · 2']],
      optionsToSelect2: [["Selecciona"], ['multiplicación es asociativa'], ['multiplicación no es asociativa']],
      radio: true,
      radioDisabled: false,
      tmp: "tmp2",
      engine: EngineDiagrama,
    },

    artifact_4: {
      subInputType: 3, 
      lastInput: true,
      superiorInput:  true,
      subInputType: 1,
      boundingbox: [-7, 9, 7, -9.5],
      valuesDefault: [
        {
          type: 2,
          valueA: "8",
          valueB: "4",
          valueC: "2",
          valueD: "", 
          valueE: "",
          valueF: "",
          operador1: "",
          operador2: "",
          id: "jsxgraph_7",
          content: "body",
        },

        {
          type: 1,
          valueA: "8",
          valueB: "4",
          valueC: "2",
          valueD: "",
          valueE: "",
          valueF: "",
          operador1: "",
          operador2: "",
          id: "jsxgraph_8",
          content: "body",
        },
      ],
      operacion: 'División',
      conditions: [["/",'\\div'], ["2"], ["/",'\\div'], ["4"], ["8/\\left(4/2\\right)",'8\\div\\left(4\\div2\\right)'], ["/",'\\div'], ['2'], ['/','\\div'], ['1'], ["\\left(8/4\\right)/2", '\\left(8\\div4\\right)\\div2', '8\\div4\\div2', ], ['8 / (4 / 2) ≠ (8 / 4) / 2'], ['división no es asociativa'],{checks:["No"]}],
      optionsToSelect: [["Selecciona"], ['8 / (4 / 2) = (8 / 4) / 2'], ['8 / (4 / 2) ≠ (8 / 4) / 2']],
      optionsToSelect2: [["Selecciona"], ['división es asociativa'], ['división no es asociativa']],
      radio: true,
      radioDisabled: false,
      tmp: "tmp2",
      engine: EngineDiagrama,
    },

          example_1: {
            parent: 'example',
            valuesDefault: [
              {
                type: 2,
      
                valueA: " ",
                valueB: " ",
                operador1: " ",
                valueC: " ",
                valueD: " ",
                operador2: " ",
                valueE: " ",
      
      
                content: "body",
                id: "jsxgraph_9",
              },
            ],
            tmp: "tmp",
            prueba_t:true,
            parent:"lexico_1",
            engine: EngineDiagrama,
    },
    example_2: {
            valuesDefault: [
              {
                type: 1,
      
                valueA: " ",
                valueB: " ",
                operador1: " ",
                valueC: " ",
                valueD: " ",
                operador2: " ",
                valueE: " ",
      
      
                content: "body",
                id: "jsxgraph_10",
              },
            ],
            tmp: "tmp",
            engine: EngineDiagrama,
            prueba_t:true,
            parent:"lexico_2",

    },
    artifact_raiting:{
      parent:"scroll-container",
      questions:{
        question_1:{
          value:"¿Fue fácil?",
        },
       
      },
      engine: EngineOwner,
     
    }
  },

};
const textUtils= {
  artifacts:{
    lexico_1:{
      nodo:[
        {
          texto:"Primera posición del diagrama <br>  Operación con paréntesis", etiqueta: "h3",
        },
        
      ],
    

      styleContainer: "note",
      engine: EngineOwner
    },
    lexico_2:{
      nodo:[
        {
          texto:"Segunda posición del diagrama <br> Operación sin paréntesis", etiqueta: "h3", 
        },
        
      ],
      styleContainer: "note",
      engine: EngineOwner
    },


  }
 

}


  const contentMain = new CreateView(textUtils)
  contentMain.initVIew(def)

  