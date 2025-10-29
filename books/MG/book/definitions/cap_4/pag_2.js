const defBoards = {

  board_1: {
    // artifact: "artifact_2",
    style: {
      grid: true,
    
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

    

  },
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



let def = {

  artifact_example_1: {
  
    variableX:'7',
    buttonsActive: false,
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
      screen: {defaultText:[{textValue:'1' ,disabled:true}, {textValue:'1',disabled:true}] },
      key:{defaultText:[{textValue:'f()', disabled:true}]}
    },
    conditions: {
      screen: [[], [-7], [7]],
      //    key: []
    }
  },
  artifact_example_2: {
  
    variableX:'7',
    buttonsActive: false,
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
      screen: {defaultText:[{textValue:'2' ,disabled:true}, {textValue:'-2',disabled:true}] },
      key:{defaultText:[{textValue:'f()', disabled:true}]}
    },
    conditions: {
      screen: [[], [-7], [7]],
      //    key: []
    }
  },
  artifact_example_3: {
  
    variableX:'7',
    buttonsActive: false,
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
      screen: {defaultText:[{textValue:'0' ,disabled:true}, {textValue:'3',disabled:true}] },
      key:{defaultText:[{textValue:'f()', disabled:true}]}
    },
    conditions: {
      screen: [[], [-7], [7]],
      //    key: []
    }
  },
  artifact_example_4: {
  
    variableX:'7',
    buttonsActive: false,
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
      screen: {defaultText:[{textValue:'3' ,disabled:true}, {textValue:'0',disabled:true}] },
      key:{defaultText:[{textValue:'f()', disabled:true}]}
    },
    conditions: {
      screen: [[], [-7], [7]],
      //    key: []
    }
  },
  artifact_example_5: {
  
    variableX:'7',
    buttonsActive: false,
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
      screen: {defaultText:[{textValue:'-3' ,disabled:true}, {textValue:'1',disabled:true}] },
      key:{defaultText:[{textValue:'f()', disabled:true}]}
    },
    conditions: {
      screen: [[], [-7], [7]],
      //    key: []
    }
  },
  artifact_example_6: {
  
    variableX:'7',
    buttonsActive: false,
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
      screen: {defaultText:[{textValue:'-2' ,disabled:true}, {textValue:'0',disabled:true}] },
      key:{defaultText:[{textValue:'f()', disabled:true}]}
    },
    conditions: {
      screen: [[], [-7], [7]],
      //    key: []
    }
  },
}
  

const definitionOperation = {
  artifact_1: {//fino

    maxCurves: 8,
    buttonsActive: { points: true, infinities: true },
    conditions: {
            
      reciprocalCurves: {
        text:'Coordenadas de los puntos',
        curves: [
          {
            points: [
              [1, 1],
              [2,-2],
              [0,3],
              [3,0],
              [-3,1],
              [-2,0]

                       
            ],
          },
            
        ],
      },
    },
  },
}

generateArtifact(def)            

mainOperation(defBoards, definitionOperation);
