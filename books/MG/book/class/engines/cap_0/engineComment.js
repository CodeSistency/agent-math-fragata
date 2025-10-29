let main = document.querySelector('#container');
let template = document.querySelector('#template');



function generator(){
  let fragment = new DocumentFragment();
  for(index of Object.keys(def)){

    let defDefault = {
      simpleText:{
        textSimple: def[index].simpleText?.textSimple || false,
        textSimple_1: def[index].simpleText?.textSimple_1 || false,
      },
      subtituloText:{
        textSub: def[index].subtituloText?.textSub || false,
      },
      subTextSimpleText:{
        textSubDouble: def[index].subTextSimpleText?.textSubDouble || false,
        textSimpleDouble: def[index].subTextSimpleText?.textSimpleDouble || false,
      }
    }
    let clone = template.content.firstElementChild.cloneNode(true);
    let content = clone.querySelector('.content_2')

    addDiv(def, content);


    fragment.appendChild(clone);
    def[index] = defDefault;
        
  }
  console.log(def)
  main.appendChild(fragment)
    


}

function addDiv(def, content){
  for(el of def[index]){

    //Parrafo Principal
    if(el[0] == 1){
      let div = document.createElement('div');
      let p = document.createElement('p');
      p.textContent = el[1];
      div.appendChild(p);
      content.appendChild(div);
      div.classList.add('contenedor');
      p.classList.add('parrafo');
    }
    //Parrafo con Segundo
    if(el[0] == 2){
      let div = document.createElement('div');
      let tittle = document.createElement('h4');
      let p = document.createElement('p');
      let text = document.createElement('p');
      let example = document.createElement('p');
      let TextExample = document.createElement('div')
      tittle.textContent = el[1];
      p.textContent = el[2];
      text.textContent = el[3];
      example.textContent = el[4];            
      div.classList.add('contenedor');
      tittle.classList.add('parrafo');
      tittle.classList.add('subtitulo');
      p.classList.add('parrafo');
      text.classList.add('parrafo');
      example.classList.add('parrafo');
      console.log(example)
      TextExample.classList.add('Contentext');

      TextExample.appendChild(text);
      TextExample.appendChild(example)
      div.appendChild(tittle);
      div.appendChild(p);
      div.appendChild(TextExample);
      content.appendChild(div);
    }
        
  }
}