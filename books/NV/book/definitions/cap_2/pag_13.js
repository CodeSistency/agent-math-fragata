
const textUtils= {
  artifacts:{
    lexico_1:{
      nodo:[
        {texto:"¿Qué nombre con letras, darle al número 20, si al 13 lo designamos con la letra <b>a</b> y al 7 con la letra <b>b</b>? Al darse cuenta que 20 es la suma de 13 con 7, es razonable que el nombre del 20 sea <b>a + b</b>.", atributos:{style:"text-align:justify"} },
       
      
        
      ],
      styleContainer: "note",
      engine: EngineOwner
    },
    lexico_2:{
      nodo:[
        {texto:"Tomando en cuenta que la suma de números es conmutativa, es decir que también 20 es igual a 7 mas 13, otro posible nombre para 20 es <b>b + a</b>. El número 26 debería llamarse <b>2a</b> porque 26 es el doble de 13, es decir el doble de <b>a</b>.", atributos:{style:"text-align:justify"} },
       
      
        
      ],
      styleContainer: "note",
      engine: EngineOwner
    },
    lexico_3:{
      nodo:[
        {texto:"Pero <b>si exigimos la condición</b> de que el nombre no contenga números, sino solo letras y operaciones con ellas se puede escribir <b>26 = a + a</b> en vez de <b>26 = 2a</b> que incluye el 2 en el nombre. Igualmente el número <b>40 = (a + b) + (a + b)</b> en vez de <b>2(a + b).</b>", atributos:{style:"text-align:justify"}},
        
      
      ],
      styleContainer: "note",
      engine: EngineOwner
    },
    lexico_4:{
      nodo:[
        {texto:"<b>Muy útil:</b> saber un nombre para el 1 y para el cero.   ",  atributos:{style:"text-align:justify"} },
        
      ],
      styleContainer: "note",
      engine: EngineOwner
    },
   
  }
  }
  

const def = {
  scrollNav:{
  
    lexico:"<br><h3>Adivinanzas</h3><p>No necesariamente tiene que utilizar las dos letras en el nombre.</p>"
  },
    artifacts: {
        example_1: {
          prueba_t:true,
          parent:"lexico_1",
          
            body: [
              [" 13 = a ", " 7 = b ", "20 = a + b "],
            ],
            engine: engineTable,
           
          },
          example_2: {
            prueba_t:true,
          parent:"lexico_2",
            
            body: [
                [" 13 = a ", " 7 = b ", "26 = 2a "],
            ],
            engine: engineTable,
          },
          example_3: {
            prueba_t:true,
          parent:"lexico_3",
            
            body: [
              [" 13 = a ", " 7 = b ", "40= (a+b) + (a+b)"],
            ],
            engine: engineTable,
          },
          example_4: {
            prueba_t:true,
          parent:"lexico_4",
            
            body: [
              [" a  ≠ 0 ", " 1 = a/a ", "0=a-a"," 2=a/a + a/a"],
      
            ],
            engine: engineTable,
          },
          artifact_1: {
            artifactClass:"artifact-big-very-min",
            
            border:true,
            body: [
              [" 13 = a "," 7 = b ", {tag:"form",style:{form:"formRow"}, inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"6 ="}}]}],
              [" 13 = a "," 7 = b ",{tag:"form",style:{form:"formRow"}, inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"12 ="}}]}],
              [" 10 = x "," 3 = b ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"7="}}]}],

      
            ],
            conditions:[
              ["a-b", "b-b/b", 'a-\\left(b/b\\right)', "b-a/a", 'b-\\left(a/a\\right)'],
              ["a-b/b",'a-\\left(b/b\\right)', "a-a/a", 'a-\\left(a/a\\right)', 'a/a+a/a\\left(a-b\\right)', 'b/b+b/b\\left(a-b\\right)','\\left(a-b\\right)+\\left(a-b\\right)'  ],
              ["x-b", "b+b+b/b",'b+b+\\left(b/b\\right)', "b+b+x/x",'b+b+\\left(x/x\\right)']

            ],
            engine: engineTable,
          },
          artifact_2: {
            artifactClass:"artifact-big-very-min",
            body: [
              [" 11 = x "," 5= y ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"27 ="}}]}],
              [" 11 = x "," 5 = y ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"1="}}]}],
              [" 10 = x "," 7 = y ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"57="}}]}],

      
            ],
            conditions:[
              ["x+x+y"],
              ["x-y-y",'\\left(x+y\\right)/\\left(x+y\\right)','\\left(y+x\\right)/\\left(y+x\\right)',"x/x","y/y","\\frac{\\left(y\\cdot x\\right)}{\\left(x\\cdot y\\right)}","\\frac{\\left(x\\cdot y\\right)}{\\left(y\\cdot x\\right)}"],
              ["x+x+x+x+x+y","y+x+x+x+x+x", 'x\\cdot y-x-x+y','\\left(x\\cdot y\\right)-x-x+y']

            ],
            engine: engineTable,
          },
          artifact_3: {
            artifactClass:"artifact-big-very-min",
            body: [
              [" 10 = x"," 7 = y ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"17="}}]}],
              [" 10 = x "," 3 = b ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"7="}}]}],
              [" 12 = x "," 5 = a ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"7="}}]}],

      
            ],
            conditions:[
              ["x+y","y+x"],
              ["x-b"],
              ["x-a"]
            ],
            engine: engineTable,
          },
          artifact_4: {
            artifactClass:"artifact-big-very-min",
            body: [
              [" 12 = a "," 2 = x ", {tag:"form",inputs:[{style:{input:"mathSmall",span:"spanRow"},text:{span:"16="}}]}],
              [" 3 = x "," 2 = y ", {tag:"form",inputs:[{style:{input:"mathSmall",span:"spanRow"},text:{span:"6="}}]}],
              [" 1 = b "," 30 = a ", {tag:"form",inputs:[{style:{input:"mathSmall",span:"spanRow"},text:{span:"16="}}]}],

      
            ],
            conditions:[
              ["a+x+x", "x+x+a", 'a+x\\cdot x', 'a+\\left(x\\cdot x\\right)', 'x\\cdot x+a'],
              ['y+\\left(y\\cdot y\\right)','y+y\\cdot y',"x\\cdot y","y\\cdot x", "x+x","y+y+y", "x+y+y/y", "y+x+y/y", "x+y+x/x", "y+x+x/x", 'x+y+\\left(y/y\\right)', 'y+x+\\left(y/y\\right)', 'x+y+\\left(x/x\\right)', 'y+x+\\left(x/x\\right)', "x/x+x+y", "x/x+y+x", "y/y+x+y", "y/y+y+x"],
              ['a/\\left(b+b\\right)+b', 'a/\\left(b+b+b\\right)+\\left(a/\\left(b+b+b+b+b\\right)\\right)', 'b+a/\\left(b+b\\right)', "a-b-b-b-b-b-b-b-b-b-b-b-b-b-b", 'a/\\left(a/a+a/a\\right)+b']

            ],
            engine: engineTable,
          },
          artifact_5: {
            artifactClass:"artifact-big-very-min",
            body: [
              [" 30 = x "," 7 = b ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"16 ="}}]}],
              [" 1 = b "," 30 = a ", {tag:"form",style:{form:"formRow"}, inputs:[{style:{input:"mathBig",span:"spanRow border-none"},
              text:{span:"14 ="}},{style:{input:"displayNone",span:"spanRow"},text:{span:"- b"}}]}],
              [" 3 = x "," 7 = b ", {tag:"form",inputs:[{style:{input:"mathBig",span:"spanRow"},text:{span:"21="}}]}],

      
            ],
            conditions:[
                ["x-b-b", 'x-\\left(b+b\\right)', 'x/\\left(x/x+x/x\\right)+x/x','x/\\left(x/x+x/x\\right)+x/x', 'x/\\left(b/b+x/x\\right)+b/b', 'x/\\left(b/b+x/x\\right)+x/x', 'x/\\left(x/x+b/b\\right)+b/b', 'x/\\left(x/x+b/b\\right)+x/x'],
               
                ["a/\\left(b+b\\right)",'a\\div\\left(b+b\\right)'],


                ["x\\cdot b","b\\cdot x", 'x\\cdot x\\cdot x-x+x', 'x\\cdot x\\cdot x-\\left(x+x\\right)', "b+b+b", "x+x+x+x+x+x+x", 'x\\cdot x+x\\cdot x+3']

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
  
const contentMain = new CreateView(textUtils);
contentMain.initVIew(def)
  
  
 