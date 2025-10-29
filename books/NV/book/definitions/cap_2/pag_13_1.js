const def = {
  scrollNav:true,    
    artifacts: {
        
          artifact_1: {
            body: [
              [" 3 = x "," 7= b ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"9 ="}}]}],
              [" 3 = x "," 7 = b ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"49 ="}}]}],
              [" 12 = a "," 7 = b ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"18="}}]}],
            ],
            conditions:[
                ["x\\cdot x", "x+x+x","b+x-x/x", "x+b-x/x", "b+x-b/b", "x+b-b/b" , 'b+x-\\left(x/x\\right)', 'b+x-\\left(b/b\\right)', 'x+b-\\left(x/x\\right)', 'x+b-\\left(b/b\\right)', "b+b-x+x+x/x", "x/x+b+b-x+x" ],

                ["b\\cdot b", 'x\\cdot b+x\\cdot b+b', 'b\\cdot x+b\\cdot x+b', 'b+x\\cdot b+x\\cdot b', 'b+b\\cdot x+b\\cdot x'],


                ['a+b-\\left(\\frac{a}{a}\\right)', 'a+b-\\left(\\frac{b}{b}\\right)', 'a+b-a/a','a-a/a+b'
                  ,'a+b-a/a', 'a-a/a+b',
                  'a-b/b+b',
                  'a+b-a/a',
                 'a+b-b/b', ]
              
            ],
            engine: engineTable,
          },
          artifact_2: {
            body: [
              [" 100= z", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"102="}}]}],
              [" 100 = z ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"10000="}}]}],
              [" 1 = z ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"3="}}]}],

      
            ],
            conditions:[
                ['z+\\left(z/z+z/z\\right)','z+\\left(\\left(z/z\\right)+\\left(z/z\\right)\\right)','z+z/z+z/z' ],
                ["z\\cdot z"],
                ["z+z+z",'\\left(z+z+z\\right)\\cdot z', 'z\\cdot\\left(z+z+z\\right)']

            ],
            engine: engineTable,
          },
          artifact_3: {
            body: [
              [" 10 = x", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"29="}}]}],
              [" 10 = x ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"100="}}]}],
              [" 2 = x ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"6="}}]}],

      
            ],
            conditions:[
                ["x+x+x-x/x", 'x+x+x-\\left(x/x\\right)' ],
                ["x\\cdot x"],
                ["x+x+x", 'x\\cdot x+x', 'x+x\\cdot x']

            ],
            engine: engineTable,
          },
          artifact_4: {
            body: [
              [" 12 = a", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"6="}}]}],
              [" 10 = a ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"99="}}]}],
              [" 10 = a ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"30="}}]}],
            ],
            conditions:[
                ['a/\\left(a/a+a/a\\right)', 'a/\\left(\\left(a/a\\right)+\\left(a/a\\right)\\right)'],
                ['a\\cdot a-a/a'],
                ["a+a+a"]
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

  
  
  
 