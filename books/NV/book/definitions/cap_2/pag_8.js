const def = {
  scrollNav:{
  
    lexico:"<h3>Adivinanzas<h3>"
  },
  artifacts: {
    artifact_1: {
      artifactClass:"artifact-big-very-min",
      body: [
        [{value:"Al <b>7</b> lo llamamos <b>a<b>", style:{td:"LowTd"}}, "¿Quién es <br> a + b?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "12" }, { valor: '7+5' }, { valor: '10' }] }],
        [{value:"Al <b>5</b> lo llamamos <b>b</b>", style:{td:"LowTd"}}, "¿Quién <br> es a·b?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "35" }, { valor: '7·5' }, { valor: '30' }] }],
        [{value:"void",style:{td:"LowTd"}},"Quién es <br> a - b?", { tag: "select", default: [{ valor: 'selecciona' },{ valor: '-2' }, { valor: '2' },{ valor: '7-5' }] }],
      ],
      type: 2,
      conditions: [
        ["12","7+5"],
        ["35","7·5"],
        ["2","7-5"],
      ],
      engine: engineTable,
    },
    artifact_2: {
      artifactClass:"artifact-big-very-min",
      body: [
        [{value:"Si <br> a = 3", style:{td:"veryLowTd"}}, "¿Quién es <br>  c + b?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "9" }, { valor: '5' },{ valor: '7+2' }] }],
        [{value:"b = 2", style:{td:"veryLowTd"}}, "¿Quién es a·c?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "21" }, { valor: '6' },{ valor: '3·7' }] }],
        [{value:"c = 7", style:{td:"veryLowTd"}}, "¿Quién es <br> a + b + c?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "10" }, { valor: '12' },{ valor: '3+2+7' }] }],
      ],
      type: 2,
      conditions: [
        ["9","7+2"],
        ["21","3·7"],
        ["12","3+2+7"],
      ],
      engine: engineTable,
    },
    artifact_3: {
      artifactClass:"artifact-big-very-min",
      body: [
        [{value:"Al <b>36</b> lo llamamos <b>n</b>",style:{td:"LowTd"}}, "¿Quién es <br> p·q + r?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "36" }, { valor: '5·7+1' }, { valor: '40' }] }],
        [{value:"Al <b>5</b> lo llamamos <b>p</b>",style:{td:"LowTd"}}, "¿Quién es p·(q + r)?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "36" }, { valor: '5·(7+1)' }, { valor: '40' }] }],
        [{value:"Al <b>7</b> lo llamamos <b>q</b>",style:{td:"LowTd"}}, "¿Cierto que p·q + r = n?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "sí" }, { valor: 'no' }] }],
        [{value:"Al <b>1</b> lo llamamos <b>r</b>",style:{td:"LowTd"}}, "¿Cierto que p(q + r) = n?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "sí" }, { valor: 'no' }] }],
      ],
      type: 2,
      conditions: [
        ["36","5·7+1"],
        ["40","5·(7+1)"],
        ["sí"],
        ["no"],
      ],
      engine: engineTable,
    },
    artifact_4: {
      artifactClass:"artifact-big-very-min",
      body: [
        [{value:"Si",style:{td:"veryLowTd"}}, "¿Quién es <br> b + b?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "10" },  { valor: '4' },{ valor: '5+5' }] }],
        [{value:"a = 1",style:{td:"veryLowTd"}}, "¿Quién es 2·b?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "10" }, { valor: '20' }, { valor: '2·5' }] }],
        [{value:"b = 5",style:{td:"veryLowTd"}}, "¿Cierto que <br> 2·b = b + b + b?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "sí" }, { valor: 'no' }] }],
        [{value:"c = 2",style:{td:"veryLowTd"}}, "¿Cierto que <br> 2·b = b + b?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "sí" }, { valor: 'no' }] }],
      ],
      type: 2,
      conditions: [
        ["10","5+5"],
        ["10","2·5"],
        ["no"],
        ["sí"],
      ],
      engine: engineTable,
    },
    artifact_5: {
      artifactClass:"artifact-big-very-min",
      body: [
        [{value:"Si",style:{td:"veryLowTd"}}, "¿Quién es <br> a + 2·b?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "8" }, { valor: '2+2·3' }, { valor: '12' }] }],
        [{value:"a = 2",style:{td:"veryLowTd"}}, "¿Es cierto que <br> a + 2·b = 3·a?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "sí" }, { valor: 'no' }] }],
        [{value:"b = 3",style:{td:"veryLowTd"}}, "¿Quién es a<sup>a</sup>?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "4" }, { valor: '8' },  { valor: '2' }] }],
      ],
      type: 2,
      conditions: [
        ["8","2+2·3"],
        ["no"],
        ["4"],
      ],
      engine: engineTable,
    },
    artifact_6: {
      artifactClass:"artifact-big-very-min",
      body: [
        [{value:"Si",style:{td:"veryLowTd"}}, "¿Quién es a<sup>b</sup>?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "8" }, { valor: '6' }] }],
        [{value:"a = 2",style:{td:"veryLowTd"}}, "¿Quién es b<sup>a</sup>?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "9" }, { valor: '6' }] }],
        [{value:"b = 3",style:{td:"veryLowTd"}}, "¿Quién es a<sup>a</sup>?", { tag: "select", default: [{ valor: 'selecciona' }, { valor: "4" }, { valor: '2' }] }],
      ],
      type: 2,
      conditions: [
        ["8"],
        ["9"],
        ["4"],
        
      ],
      engine: engineTable,
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

