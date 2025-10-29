const defBoards = {
  //modelo 1
  board_1: {
    artifact: "artifact_1",
    points: [
      {
        
      }, {
        text: { value: "0" }
      }, {
        text: { value: "10" }
      }, {
        text: { value: "a" }
      }, {}, {}
    ],
    type: 2,
  },
  board_2: {
    artifact: "artifact_2",
    points: [
      {}, {
        text: { value: "0" }
      }, { text: { value: "10" }
      }, {}, { text: { value: "a" }
      }, {}
    ],
    type: 2,
  },
  board_3: {
    artifact: "artifact_3",
    points: [
      {
        
      }, {
        text: { value: "0" }
      }, {
        text: { value: "20" }
      }, {}, {
        text: { value: "a" }
      }, {}
    ],
    type: 2,
  },
  board_4: {
    artifact: "artifact_4",
    points: [
      {}, {
        text: { value: "0" }
      }, {
        text: { value: "c" }
      }, {
        text: { value: "10" }
      }, {}, {}
    ],
    type: 2,
  },
 
  board_5: {
    artifact: "artifact_5",
    points: [
       {
        text: { value: "0" }
      }, {
        text: { value: "c" }
      }, {}, {}, {
        text: { value: "20" }}
    ],
    type: 2,
  },
}

const def = {
  scrollNav:{
    lexico: "De acuerdo a la posición de la letra en la recta, asígnele su valor."
  },
  artifacts: {
    artifact_1: {
      border:true,
      board: 'board_1',
      inputs: [
        {
          tag: "form", style: {
            form: "formInputBig"
          }, value: "a=", inputs: [
            { style: "mathSmall" }
          ]
        }
      ],
      conditions: [
        ["20"]
      ],
      engine: EngineEscalas,
    },
    artifact_2: {
      border:true,
      board: 'board_2',
      inputs: [
        {
          tag: "form", style: {
            form:  "formInputBig"
          }, value: "a=", inputs: [
            { style: "mathSmall" }
          ]
        }
      ],
      conditions: [
        ["30"]
      ],
      engine: EngineEscalas,
    },
    artifact_3: {
      board: 'board_3',
      inputs: [
        {
          tag: "form", style: {
            form:  "formInputBig"
          }, value: "a=", inputs: [
            { style: "mathSmall" }
          ]
        }
      ],
      conditions: [
        ["60"]
      ],
      engine: EngineEscalas,
    },
    artifact_4: {
      board: 'board_4',
      inputs: [
        {
          tag: "form", style: {
            form:  "formInputBig"
          }, value: "c=", inputs: [
            { style: "mathSmall" }
          ]
        }
      ],
      conditions: [
        ["5"]
      ],
      engine: EngineEscalas,
    },
    artifact_5: {
      board: 'board_5',
      inputs: [
        {
          tag: "form", style: {
            form:  "formInputBig"
          }, value: "c=", inputs: [
            { style: "mathSmall" }
          ]
        }
      ],
      conditions: [
        ["5"]
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
}


  
const contentMain = new CreateView(def, defBoards);