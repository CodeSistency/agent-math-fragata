const defBoards = {

  board_1: {
    // artifact: "artifact_2",
    style: {
      grid: true,
    
      boundingbox: [-4, 8, 4, -2],
      axis: [false, true, true],
      reflectionAxie: { B: false },
      valueAxis: {
        yd: [[0, 0], [0, 1]], /*dirección del eje y*/
        xd: [[0, 0], [1, 0]],
        colory: '#000000',
        colorx: '#000000'
      }
    },
        

    curves: [

      {
        strokeColor: 'purple',
        
        points: [

          [-3.5, 2],[-2.3,2.5],[-1.3,2] ,[-0.4,1.7],[0,2],[1, 3], [2,2],[2.5,1], [3, 0],

        ]
      },
      

    ],

    texts: [
      { x: 2.6, y: 3, text: 'K()', style: { fontSize: 20 } },]
  },
  /* 
    
        points: [
            {x:1,y:0, visible:true, name:'',size:3, fixed:true},
          
        ], */

      
  board_2: {
    // artifact: "artifact_2",
    style: {
      grid: false,
    
      boundingbox: [-4, 5, 4, -4],
      axis: [false, true, true],
      reflectionAxie: { B: false },
      valueAxis: {
        yd: [[0, 0], [0, 1]], /*dirección del eje y*/
        xd: [[0, 0], [1, 0]],
        colory: '#000000',
        colorx: '#000000'
      }
    },

    
    points: [
      {x:1.5,y:0, visible:true, name:'',size:3, fixed:true},
      {y:1.5,x:0, visible:true, name:'',size:3, fixed:true},
          
    ],
    texts: [
      { x: -1.2, y: 1.5, text: 'K(n)', style: { fontSize: 20 } },]
  },
  board_3: {
    // artifact: "artifact_2",
    style: {
      grid: false,
    
      boundingbox: [-4, 5, 4, -4],
      axis: [false, true, true],
      reflectionAxie: { B: false },
      valueAxis: {
        yd: [[0, 0], [0, 1]], /*dirección del eje y*/
        xd: [[0, 0], [1, 0]],
        colory: '#000000',
        colorx: '#000000'
      }

    },
    lines: [
      {
        points: [
          [1.5,2.5],
          [1.5, 0],
        ],
        dash: 2,
      },
      {
        points: [
          [2, 1.5],
          [0, 1.5],
        ],
        dash: 2,
      },
    ],
    
    points: [
      {x:1.5,y:1.5, visible:true, name:'',size:3, fixed:true},

    ],
    texts: [
      { x: -0.7, y: 1.5, text: 'K(n)', style: { fontSize: 20 } },
      { x: 1.6, y: -0.4, text: 'n', style: { fontSize: 20 } }
    ]
  },
};

const defLayout = {
  artifact_example1:{
    parentContainer: '.boardElement1',
    typeLayout:'',
    classes: '',
    typeLayout:'',
    style : ' width:90%;max-width: 400px;',
    addHtml:'',
    containers:[
      {
        id:'board1',
        boardName: 'board_1',
        boardObject: defBoards.board_1,
        attributes:[['board', 'board_0'],[]],
        classes:'borderDefault',    
        style:'width:100%;height:400px;',
        typeElement:'',
      },
  
    ]
  },
}

let def = {

  artifact_1: {
  
    variableX:'7',
    buttonsActive: true,
    characteristicsArtifact: {
      typeForm: 'artifactGrid',
      width:'250px',
      height: 'auto',
      arrow: {
        count: 1,
        direction: 'down'
      },
      typeDiv: [
        {
          rounded: {
            count: 2,
            border: '1px solid black',
            formClas: 'rounded',
            inputEnable: true,
            size: {
              width: '150px',
              height: '50px'
            }
          }
        },
        {
          square: {
            count: 1,
            border: '1px solid black',
            formClas: 'square',
            inputEnable: true,
            size: {
              width: '100px',
              height: '50px'
            }
          }
        }
      ]
    
    },
    defaultinput: {
      screen: {defaultText:[{textValue:'1' ,disabled:true}, {textValue:'',disabled:false}] },
      key:{defaultText:[{textValue:'K()', disabled:true}]}
    },
    conditions: {
      screen: [[], ['3']],
      //    key: []
    }
  },
  artifact_2: {
  
    variableX:'7',
    buttonsActive: true,
    characteristicsArtifact: {
      typeForm: 'artifactGrid',
      width:'250px',
      height: 'auto',
      arrow: {
        count: 1,
        direction: 'down'
      },
      typeDiv: [
        {
          rounded: {
            count: 2,
            border: '1px solid black',
            formClas: 'rounded',
            inputEnable: true,
            size: {
              width: '150px',
              height: '50px'
            }
          }
        },
        {
          square: {
            count: 1,
            border: '1px solid black',
            formClas: 'square',
            inputEnable: true,
            size: {
              width: '100px',
              height: '50px'
            }
          }
        }
      ]
      
    },
    defaultinput: {
      screen: {defaultText:[{textValue:'2' ,disabled:true}, {textValue:'',disabled:false}] },
      key:{defaultText:[{textValue:'K()', disabled:true}]}
    },
    conditions: {
      screen: [[], [2]],
      //    key: []
    }
  },
  artifact_3: {
  
    variableX:'7',
    buttonsActive: true,
    characteristicsArtifact: {
      typeForm: 'artifactGrid',
      width:'250px',
      height: 'auto',
      arrow: {
        count: 1,
        direction: 'down'
      },
      typeDiv: [
        {
          rounded: {
            count: 2,
            border: '1px solid black',
            formClas: 'rounded',
            inputEnable: true,
            size: {
              width: '150px',
              height: '50px'
            }
          }
        },
        {
          square: {
            count: 1,
            border: '1px solid black',
            formClas: 'square',
            inputEnable: true,
            size: {
              width: '100px',
              height: '50px'
            }
          }
        }
      ]
      
    },
    defaultinput: {
      screen: {defaultText:[{textValue:'0' ,disabled:true}, {textValue:'',disabled:false}] },
      key:{defaultText:[{textValue:'K()', disabled:true}]}
    },
    conditions: {
      screen: [[], [2]],
      //    key: []
    }
  },
  artifact_4: {
  
    variableX:'7',
    buttonsActive: true,
    characteristicsArtifact: {
      typeForm: 'artifactGrid',
      width:'250px',
      height: 'auto',
      arrow: {
        count: 1,
        direction: 'down'
      },
      typeDiv: [
        {
          rounded: {
            count: 2,
            border: '1px solid black',
            formClas: 'rounded',
            inputEnable: true,
            size: {
              width: '150px',
              height: '50px'
            }
          }
        },
        {
          square: {
            count: 1,
            border: '1px solid black',
            formClas: 'square',
            inputEnable: true,
            size: {
              width: '100px',
              height: '50px'
            }
          }
        }
      ]
      
    },
    defaultinput: {
      screen: {defaultText:[{textValue:'3' ,disabled:true}, {textValue:'',disabled:false}] },
      key:{defaultText:[{textValue:'K()', disabled:true}]}
    },
    conditions: {
      screen: [[], ['0']],
      //    key: []
    }
  },
  artifact_5: {
  
    variableX:'7',
    buttonsActive: true,
    characteristicsArtifact: {
      typeForm: 'artifactGrid',
      width:'250px',
      height: 'auto',
      arrow: {
        count: 1,
        direction: 'down'
      },
      typeDiv: [
        {
          rounded: {
            count: 2,
            border: '1px solid black',
            formClas: 'rounded',
            inputEnable: true,
            size: {
              width: '150px',
              height: '50px'
            }
          }
        },
        {
          square: {
            count: 1,
            border: '1px solid black',
            formClas: 'square',
            inputEnable: true,
            size: {
              width: '100px',
              height: '50px'
            }
          }
        }
      ]
      
    },
    defaultinput: {
      screen: {defaultText:[{textValue:'' ,disabled:false}, {textValue:'1',disabled:true}] },
      key:{defaultText:[{textValue:'K()', disabled:true}]}
    },
    conditions: {
      screen: [['2.5'], []],
      //    key: []
    }
  },
  artifact_6: {
  
    variableX:'7',
    buttonsActive: true,
    characteristicsArtifact: {
      typeForm: 'artifactGrid',
      width:'250px',
      height: 'auto',
      arrow: {
        count: 1,
        direction: 'down'
      },
      typeDiv: [
        {
          rounded: {
            count: 2,
            border: '1px solid black',
            formClas: 'rounded',
            inputEnable: true,
            size: {
              width: '150px',
              height: '50px'
            }
          }
        },
        {
          square: {
            count: 1,
            border: '1px solid black',
            formClas: 'square',
            inputEnable: true,
            size: {
              width: '100px',
              height: '50px'
            }
          }
        }
      ]
      
    },
    defaultinput: {
      screen: {defaultText:[{textValue:'' ,disabled:false}, {textValue:'0',disabled:true}] },
      key:{defaultText:[{textValue:'K()', disabled:true}]}
    },
    conditions: {
      screen: [['3'], [], []],
      //    key: []
    }
  },
}
  


generateArtifact(def)            
createLayouts(defLayout)
