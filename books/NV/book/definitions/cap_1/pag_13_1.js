const def = {
  scrollNav:true,

    artifacts: {
      artifact_1: {
        parent: 'main-content',
        subInputType: 3, 
        small: true,
        valuesDefault: [
          {
            type: 3,
  
            valueA: "",
            valueB: "",
            operador1: "",
            valueC: "y8",
  
            content: "body",
            id: "jsxgraph3",
          },
        ],
        conditions: [["y"],["8"],["x","X","·", '\\cdot']],
        tmp: "tmp",
        boundingbox: [-5, 8, 5, -3],
        engine: EngineDiagrama,
      },
      artifact_2: {
        parent: 'main-content',
        subInputType: 3, 
        small: true,
        valuesDefault: [
          {
            type: 3,
  
            valueA: "",
            valueB: "",
            operador1: "",
            valueC: "5/y",
  
            content: "body",
            id: "jsxgraph4",
          },
        ],
        conditions: [["5"],["y"],["/"]],
        tmp: "tmp",
        boundingbox: [-5, 8, 5, -3],
        engine: EngineDiagrama,
      },
      artifact_3: {
        parent: 'main-content',
        subInputType: 3, 
        exampleElement: true,
        small: true,
        valuesDefault: [
          {
            type: 3,
  
            valueA: "",
            valueB: "",
            operador1: "",
            valueC: "7+y",
  
            content: "body",
            id: "jsxgraph5",
          },
        ],
        conditions: [["7"],["y"],["+"]],
        tmp: "tmp",
        boundingbox: [-5, 8, 5, -3],
        engine: EngineDiagrama,
      },
      artifact_4: {
        parent: 'main-content',
        subInputType: 3, 
        small: true,
        valuesDefault: [
          {
            type: 3,
  
            valueA: "",
            valueB: "",
            operador1: "",
            valueC: "2-x",
  
            content: "body",
            id: "jsxgraph2",
          },
        ],
        conditions: [["2"],["x"],["-"]],
        tmp: "tmp",
        boundingbox: [-5, 8, 5, -3],
        engine: EngineDiagrama,
      },
      artifact_5: {
        parent: 'main-content',
        subInputType: 3, 
        small: true,
        valuesDefault: [
          {
            type: 3,
  
            valueA: "",
            valueB: "",
            operador1: "",
            valueC: "2x",
  
            content: "body",
            id: "jsxgraph6",
          },
        ],
        conditions: [["2"],["x"],["\\cdot","x","X","·"]],
        tmp: "tmp",
        boundingbox: [-5, 8, 5, -3],
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
  