

const def = {
  scrollNav:{
    lexico:"No olvide poner los paréntesis en caso de necesidad."
  },
    artifacts: {
      
      artifact_1: {
        parent: 'main-content',
        subInputType: 3, 
        valuesDefault: [
          {
            type: 2,
  
            valueA: "",
            valueB: "",
            operador1: "",
            valueC: "",
            valueD: "",
            operador2: "",
            valueE: "5\\cdot(y-12)",
  
  
            content: "body",
            id: "jsxgraph2",
          },
        ],
        conditions: [["5"],["y"],["-"],["12"],["y-12", '\\left(y-12\\right)'],["\\cdot"]],
        tmp: "tmp",
        engine: EngineDiagrama,
        exampleElement: true,
      },
      artifact_2: {
        parent: 'main-content',
        subInputType: 3,
        helpArtifact:{
          message: "Puedes cambiar los números de lugar y seguir obteniendo la misma respuesta. "
        },
        point :[{
          coordenada: [0.9, -6.2],
          texto: "Ojo! Conmutatividad!",
          
      }],
        valuesDefault: [
          {
            type: 2,
  
            valueA: "",
            valueB: "",
            operador1: "",
            valueC: "",
            valueD: "",
            operador2: "",
            valueE: "\\left(3\\cdot y\\right)+12",
  
  
            content: "body",
            id: "jsxgraph",
          },
        ],
        conditions: [["12"], ["3"], ['\\cdot'], ['y'], ['\\left(3\\cdot y\\right)', '3\\cdot y', '\\left(y\\cdot 3\\right)', 'y\\cdot 3'], ['+']],
        tmp: "tmp",
        engine: EngineDiagrama,
      },
      artifact_3: {
        parent: 'main-content',
        subInputType: 3, 
        valuesDefault: [
          {
            type: 1,
  
            valueA: "20",
            valueB: "x",
            operador1: "-",
            valueC: "4",
            valueD: "",
            operador2: "/",
            valueE: "",
  
  
            content: "body",
            id: "jsxgraph3",
          },
        ],
        conditions: [["20-x"], ['\\left(20-x\\right)/4']],
        tmp: "tmp",
        engine: EngineDiagrama,
      },
      artifact_4: {
        parent: 'main-content',
        subInputType: 3, 
        valuesDefault: [
          {
            type: 2,
  
            valueA: "20",
            valueB: "x",
            operador1: "-",
            valueC: "4",
            valueD: "",
            operador2: "/",
            valueE: "",
  
  
            content: "body",
            id: "jsxgraph4",
          },
        ],
        conditions: [["x-4"],["20/(x-4)", '20/\\left(x-4\\right)']],
        tmp: "tmp",
        engine: EngineDiagrama,
      },
  
      artifact_5: {
        parent: 'main-content',
        subInputType: 3, 
        valuesDefault: [
          {
            type: 2,
  
            valueA: "",
            valueB: "",
            operador1: "",
            valueC: "",
            valueD: "",
            operador2: "",
            valueE: "5+y-12",
  
  
            content: "body",
            id: "jsxgraph6",
          },
        ],
        conditions: [["5"],["y"],["-"],["12"],["y-12"],["+"]],
        tmp: "tmp",
        engine: EngineDiagrama,
      },
      artifact_6: {
        parent: 'main-content',
        helpArtifact:{
          message: "Puedes cambiar los números de lugar y seguir obteniendo la misma respuesta. "
        },
        subInputType: 3,
        point :[{
          coordenada: [0.7, -6.2],
          texto: "Ojo! Conmutatividad!",
          
      }],
        valuesDefault: [
          {
            type: 2,
  
            valueA: "",
            valueB: "",
            operador1: "",
            valueC: "",
            valueD: "",
            operador2: "",
            valueE: "\\left(3\\div y\\right)+5",
  
  
            content: "body",
            id: "jsxgraph5",
          },
        ],
        conditions: [["5"], ["3"], ['/', '÷','\\div'], ["y"], 
        ["\\frac{3}{y}", "\\left(\\frac{3}{y}\\right)", '3/y', '\\left(3/y\\right)', '3\\div y', '\\left(3\\div y\\right)'], ['+']],
        tmp: "tmp",
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
    },
  };

  

  const contentMain = new CreateView(def);

  
