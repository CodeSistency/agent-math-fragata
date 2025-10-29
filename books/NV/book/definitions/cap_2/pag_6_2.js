const def = {
  scrollNav:true,      
    artifacts: {
      artifact_1: {
        artifactClass:"artifact-big-very-min",
        border:true,
        body: [
          ["<b>Expresión</b>", "<b>Menos <br> Operaciones</b>", "<b>Número</b>"],
          ["3 ‧ 8 - 5", { tag: "input" }, { tag: "input" }],
          ["3 ‧ (8 - 5)", { tag: "input" }, { tag: "input" }],
          ["16 - 3 + 2 / 2", { tag: "input" }, { tag: "input" }],
          ["16 - (3 + 2)", { tag: "input" }, { tag: "input" }],
          ["8 + 8 / 2", { tag: "input" }, { tag: "input" }],
          ["(8 + 8) / 2", { tag: "input" }, { tag: "input" }],

        ],
        conditions: [
          ["24-5"], ["19"], ["3\\cdot3","3.3"], ["9"],
          ["16-3+1"], ["14"], ["16-5"], ["11"], ["8+4"],
          ["12"], ["\\frac{16}{2}", '16/2', '16\\div2'], ["8"],

        ],
        engine: engineTable,
      },
      artifact_2: {
        artifactClass:"artifact-big-very-min",
        body: [
          ["<b>Expresión</b>", "<b>Menos <br> Operaciones</b>", "<b>Número</b>"],
          ["30 / 5 + 15 / 3", { tag: "input" }, { tag: "input" }],
          ["30 / (5 + 15 / 3)", { tag: "input" }, { tag: "input" }],
          ["30 - 5 / 15 + 3", { tag: "input" }, { tag: "input" }],
          ["30 / (6 - 3 + 2)", { tag: "input" }, { tag: "input" }],
          ["30 / (6 - (3 + 2))", { tag: "input" }, { tag: "input" }],
          ["30 / 6 - (3 + 2)", { tag: "input" }, { tag: "input" }],

        ],
        conditions: [
           ["6+5"], ["11"], ["30/10", "\\frac{30}{10}", '30\\div10'],
           ["3"], ["30-0.33+3"], ["32.66", "32.67"], ["30/5", "\\frac{30}{5}", '30\\div5'], 
           ["6"], ["30/1", '30\\div1', "\\frac{30}{1}"], ["30"], 
           ["30/6-5", '30\\div6-5', "\\frac{30}{6-5}"], ["0"],
        ],
        engine: engineTable,
      },
      artifact_3: {
        artifactClass:"artifact-big-very-min",
        body: [
          ["<b>Expresión</b>", "<b>Menos <br> Operaciones</b>", "<b>Número</b>"],
          ["30 / 5 / 2", { tag: "input" }, { tag: "input" }],
          ["60 / 30 + 5 + 2", { tag: "input" }, { tag: "input" }],
          ["30 / 6 / 2 - 2", { tag: "input" }, { tag: "input" }],
          ["30 / (6 / 2 - 2)", { tag: "input" }, { tag: "input" }],

        ],
        conditions: [
           ["6/2", '\\frac62', '6\\div2' ], ["3"], 
           ["2+5+2"],["9"],
           ["5/2-2","\\frac{5}{2-2}"],["0.5","\\frac12"], 
           ["30/1"], ['30'],
           ],
  
        engine: engineTable,
      },
      artifact_4: {
        body: [
          [{style:{td:'pseudoTitle'}, value: "Expresión"}, {style:{td:'pseudoTitle'}, value: "Menos Operaciones"}],
          ["(30 + 6) / ((3 + 15) / 2)", { tag: "input" }],
          ["((30 + 5) / 7) ‧ 8 - 6 / 2", { tag: "input" }],
          [{style:{td:'pseudoTitle'}, value: "Menos Operaciones"}, {style:{td:'pseudoTitle'}, value: "Número"}],
          [{ tag: "input" }, { tag: "input" }],
          [{ tag: "input" }, { tag: "input" }],

        ],
        conditions: [
          ["\\frac{36}{\\left(\\frac{18}{2}\\right)}", '36/\\left(18/2\\right)', 
          '36\\div\\left(18\\div2\\right)'], 
          
          ["35/7\\cdot8-3", "\\left(35/7\\right)\\cdot8-3", "\\frac{35}{7}\\cdot8-3",
          "\\left(\\frac{35}{7}\\right)\\cdot8-3", '5\\cdot8-6/2'],
          ["36/9", '36\\div9', '\\frac{36}{9}'],
          ['4'], 


          ["5\\cdot8-3", '40-3'], 
          
          ['37'],

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
      },
    }
  };
  
  
  
  const contentMain = new CreateView(def);
  