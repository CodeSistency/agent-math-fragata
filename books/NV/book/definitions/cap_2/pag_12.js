const def = {
  scrollNav:{
    lexico:'Operaciones conmutativas y no conmutativas'
  },
  artifacts: {
    example_1: {
      border:true,
      subInputType: 3, 
      lastInput: true,
      valuesDefault: [
        {
          type: 3,
          valueA: "5",
          valueB: "3",
          valueC: "5 + 3",
          valueD: "8",
          operador1: "+",
          id: "jsxgraph",
          content: "body",
        },

        {
          type: 3,
          valueA: "3",
          valueB: "5",
          valueC: "3 + 5",
          valueD: "8",
          operador1: "+",
          id: "jsxgraph_2",
          content: "body",
        },
      ],
      operacion: 'Suma',
      textContent: ' 5 + 3 = 3 + 5 ',
      textContentB: ' suma es conmutativa ',
      radio: true,
      checkDisable: true,
      radioDisabled: true,
      tmp: "tmp2",
      engine: EngineDiagrama,
    },
    artifact_1: {
      subInputType: 3, 
      lastInput: true,
      valuesDefault: [
        {
          type: 3,
          valueA: "5",
          valueB: "3",
          valueC: "",
          valueD: "",
          operador1: "-",
          id: "jsxgraph_4",
          content: "body",
        },

        {
          type: 3,
          valueA: "3",
          valueB: "5",
          valueC: "",
          valueD: "",
          operador1: "-",
          id: "jsxgraph_3",
          content: "body",
        },
      ],
      conditions: [["5-3"], ["2"], ["3-5"], ["-2"],['5 - 3 ≠ 3 - 5'] ,['resta es no conmutativa'],{checks:["No"]}],
      optionsToSelect: [['Selecciona'], ['5 - 3 ≠ 3 - 5'], ['5 - 3 = 3 - 5']],
      optionsToSelect2: [['Selecciona'], ['resta es no conmutativa'], ['resta es conmutativa']],
      operacion: [['Resta']],
      radio: true,
      tmp: "tmp2",
      engine: EngineDiagrama,
    },
    artifact_2: {
      subInputType: 3, 
      lastInput: true,
      valuesDefault: [
        {
          type: 3,
          valueA: "5",
          valueB: "3",
          operador1: "",
          valueC: "",
          valueD: "",

          id: "jsxgraph_5",
          content: "body",
        },

        {
          type: 3,
          valueA: "3",
          valueB: "5",
          operador1: "",
          valueC: "",
          valueD: "",

          id: "jsxgraph_6",
          content: "body",
        },
      ],
      conditions: [["\\cdot"], ["5\\cdot3"], ["15"], ["\\cdot"], ["3\\cdot5"], ['15'],['5 · 2 = 3 · 5'],['multiplicación es conmutativa'],{checks:["Si"]}],
      optionsToSelect: [['Selecciona'], ['5 · 2 = 3 · 5'], ['5 · 2 ≠ 3 · 5']],
      optionsToSelect2: [['Selecciona'], ['multiplicación es no conmutativa'], ['multiplicación es conmutativa']],
      operacion: [['Multiplicación']],
      radio: true,
      tmp: "tmp2",
      engine: EngineDiagrama,
    },
    artifact_3: {
      subInputType: 3, 
      lastInput: true,
      valuesDefault: [
        {
          type: 3,
          valueA: "6",
          valueB: "3",
          operador1: "",
          valueC: "",
          valueD: "",

          id: "jsxgraph_7",
          content: "body",
        },

        {
          type: 3,
          valueA: "3",
          valueB: "6",
          operador1: "",
          valueC: "",
          valueD: "",

          id: "jsxgraph_8",
          content: "body",
        },
      ],
      conditions: [["/",'\\div'], ["6/3", '6\\div3'], ["2"], ["/", '\\div'], ["3/6",'3\\div6'], ["0.5"], ['6 / 3 ≠ 3 / 6'], ['división es no conmutativa'],{checks:["No"]}],
      optionsToSelect: [['Selecciona'], ['6 / 3 = 3 / 6'], ['6 / 3 ≠ 3 / 6']],
      optionsToSelect2: [['Selecciona'], ['división es no conmutativa'], ['división es conmutativa']],
      operacion: [['División']],
      radio: true,
      tmp: "tmp2",
      engine: EngineDiagrama,
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
