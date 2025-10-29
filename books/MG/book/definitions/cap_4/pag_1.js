const defBoards = {

  board_1: {
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
          
    ],
    texts: [
      { x: 1.6, y: -0.4, text: 'n', style: { fontSize: 20 } },]
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
      { x: -1, y: 1.5, text: 'K(n)', style: { fontSize: 20 } },
      { x: 1.6, y: -0.4, text: 'n', style: { fontSize: 20 } }
    ]
  },
};

const defLayout = {
  artifact_example_1:{
    parentContainer: '.example_1',
    typeLayout:'',
    classes: '',
    typeLayout:'',
    style : 'max-width: 600px;',
    addHtml:'',
    containers:[
      {
        id:'board1',
        boardName: 'board_1',
        boardObject: defBoards.board_1,
        attributes:[['board', 'board_0'],[]],
        classes:'',    
        style:'width:100%;height:300px; border-bottom:1px solid #000',
        typeElement:'',
      },
      {
        classes:'',
        parentContainer:'',
        textContent: 'Seleccione un punto n del eje horizontal x',
        style:'padding:5px; font-weight:700',
      }
    ]
  },
  artifact_example_2:{
    parentContainer: '.example_2',
    typeLayout:'',
    classes: 'borderDefault',
    typeLayout:'',
    style : 'max-width: 600px;',

    addHtml:'',
    containers:[
      {
        id:'board2',
        boardName: 'board_2',
        boardObject: defBoards.board_2,
        attributes:[['board', 'board_0'],[]],
        classes:'',    
        style:'width:100%;height:300px; border-bottom:1px solid #000',
        typeElement:'',
      },
      {
        classes:'',
        parentContainer:'',
        textContent: 'Sitúe sobre el eje vertical el punto de altura K(n)',
        style:'padding:5px; font-weight:700',
      }
    ]
  },

  artifact_example_3:{
    parentContainer: '.example_3',
    typeLayout:'',
    classes: ' ',
    typeLayout:'',
    style : 'max-width: 600px;',
    addHtml:'',
    containers:[
      {
        id:'board3',
        boardName: 'board_1',
        boardObject: defBoards.board_3,
        attributes:[['board', 'board_0'],[]],
        classes:'borderDefault',    
        style:'width:100%;height:300px;',
        typeElement:'',
      },
    ]
  },
}

let def = {

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
      screen: {defaultText:[{textValue:'n' ,disabled:true}, {textValue:'K(n)',disabled:true}] },
      key:{defaultText:[{textValue:'K()', disabled:true}]}
    },
    conditions: {
      screen: [[], [-7], [7]],
      //    key: []
    }
  },}
  

generateArtifact(def)            
createLayouts(defLayout)
