let isActiveCounter = false;
let targetActive = '';
/* Modulo I que Genera Artefactos */
function generateArtifact(def) {
  const template = document.querySelector('#template'),
      mainArtifact = document.querySelector('#mainArtifact');
  let fragment = new DocumentFragment();

  /* Recorre el objeto def de la definicion por cada artefacto que se encuentre dentro de el */

  for (let artifact of Object.keys(def)) {
    /* Caracterizacion del Artefacto tipo: Simple */
    /* Establece las caracteristicas que debe de tener el artifacto por defecto si en la definicion se encuentra un artefacto vacio  */

    let defDefault = {
      dataInteraction: {
        correct: 0,
        incorrect: 0,
        forAnswer: 0,
      },
      renderContainer : def[artifact].renderContainer || false,
      changeWidth:def[artifact].changeWidth || false,
      borderNone: def[artifact].borderNone || false,
      timeInteraction: 0,
      statusValidate: false,
      change: false,
      variableX: def[artifact].variableX ?? '2',
      buttonsActive: def[artifact].buttonsActive || false,
      inputActive: def[artifact].inputActive || false,
      noiseDecimal: def[artifact].noiseDecimal || 0.000001,
      minDecimal: def[artifact].minDecimal || 0,
      characteristicsArtifact: def[artifact]?.characteristicsArtifact || {
        typeForm: def[artifact]?.characteristicsArtifact?.typeForm || false,
        arrow: {
          count: def[artifact]?.characteristicsArtifact?.arrow?.count || 2,
          direction:
            def[artifact]?.characteristicsArtifact?.arrow?.direction || 'down',
          size: {
            width:
              def[artifact]?.characteristicsArtifact?.arrow?.size?.width ??
              '40px',
            height:
              def[artifact]?.characteristicsArtifact?.arrow?.size?.height ??
              '100px',
          },
          style: {
            marginLeft:
              def[artifact]?.characteristicsArtifact?.arrow?.style.marginLeft ??
              'margin-left:4px',
          },
        },
        width: def[artifact]?.characteristicsArtifact?.width || 'auto',
        height: def[artifact]?.characteristicsArtifact?.height || 'auto',
        typeDiv:
          def[artifact]?.characteristicsArtifact?.typeDiv != undefined
            ? def[artifact]?.characteristicsArtifact?.typeDiv
            : [
              {
                rounded: {
                  count: 3,
                  border: '1px solid black',
                  formClas: 'rounded',
                  inputEnable: true,
                  size: {
                    width: '200px',
                    height: '50px',
                  },
                },
              },
              {
                square: {
                  count: 2,
                  border: '1px solid black',
                  formClas: 'square',
                  inputEnable: true,
                  size: {
                    width: '100px',
                    height: '50px',
                  },
                },
              },
            ],
      },
      conditions: def[artifact].conditions || {},
    };

    let containerToRender = null;
    const clone = template.content.firstElementChild.cloneNode(true);
    if(defDefault.renderContainer){
      containerToRender = document.querySelector(defDefault.renderContainer)
    }


    clone.classList.add(artifact);
    clone.setAttribute('data-ejercicio', artifact);
    clone.addEventListener('mouseenter', () => {
      gTime(def[artifact]);
      targetActive = clone.dataset.ejercicio;
    });
    clone.addEventListener('mouseleave', () => {
      gTime(def[artifact], false, false);
      targetActive = '';
    });
    def[artifact] = { ...def[artifact], ...defDefault };

    //fragment.appendChild(clone);

    //mainArtifact.appendChild(fragment);
    
    
    artifactDefault(
      defDefault,
      artifact,
      clone,
      def[artifact].typeForm,
      targetActive,
      containerToRender
    );  
  }
}
/* Estado de los botones, funciona para desactivar o activar los botones de los artefactos*/
function stateButton(artifact, input,defDefault) {
  if (def.inputActive) {
  }
  
  input.addEventListener('change', (e) => {
    def[artifact].change = true

  });
  input.addEventListener('blur', (e) => {
    gTime(def[artifact], false, false);
    isActiveCounter = false;
  });

  input.addEventListener('input', (e, updateValue) => {
    if (e.data != null && !isActiveCounter) {
      isActiveCounter = true;
      def[artifact].statusValidate = false;
      gTime(def[artifact], true);
    }
  });

  input.addEventListener('beforeinput', (e) => {
    const targetRanges = e.getTargetRanges();
  });
}
/* Modulo IV - Crear texto en la pagina */
function pageText(tag, divContenText, clone, refArtifact) {
  const { typeTag, content, classContent } = tag;
  const { property, textValue } = content;
  const { typeText, defaultClass, change } = property;
  switch (typeTag) {
    case typeTag:
      let content = '';
      let addonsContent = '';

      textValue.forEach((element, index) => {
        if (element.hasOwnProperty('addons')) {
          content += `
                    <div class="${element.addons.classAddons ?? ''}">
                    \n<${typeTag} class="${defaultClass ?? ''} ${element.class ?? ''
}" ${element.atribute ?? ''}>
                    ${element.text ?? ''}
                    </${typeTag}>
                    
                    ${element.addons.keyboardActive
              ? pageTextArtifactButtons(clone)
              : ''
}
                    </div>`;
        } else {
          content += `\n<${typeTag} class="${defaultClass ?? ''} ${element.class ?? ''
          }" ${element.atribute ?? ''}>${element.text ?? ''}</${typeTag}>`;
        }
      });
      const templateString = `
                <div class="${classContent ?? 'contentTitleParagraph'}">
                ${content}
                </div>`;
      clone.insertAdjacentHTML('beforeend', templateString);
      break;
  }
}
function generarTabla(params = {}) {
  let mathArray = [];
  let tablet = params.def.characteristicsArtifact.tablet;
  let contenedorTablet = document.createElement('div');
  params.clone.style.margin = '8px';
  params.clone.style.width =
    params.def.characteristicsArtifact?.width ?? '320px';
  contenedorTablet.classList.add('borderDefault');
  
  // Crea la tabla y su tbody
  let tabla = document.createElement('table');
  let tbody = document.createElement(tablet.typeParent);
  tabla.classList.add('table', 'table-bordered');
  tabla.appendChild(tbody);
  // Itera sobre el objeto tablet
  tablet.typeChild.forEach((child) => {
    let tr = document.createElement(child.nodeChild.tag);
    if(params?.def?.borderNone){
      tr.classList.add('mathTr')
    }

    child?.nodeChild?.style ? tr.style.cssText = child?.nodeChild?.style : false

  
    child.nodeChild.child.forEach((childElement) => {
      let td = document.createElement(childElement.tag);
      childElement?.style ? td.style.cssText = childElement?.style : false
      childElement?.tag?.style ? td.style.cssText = childElement?.tag?.style : false


  
      // Agrega el elemento al array solo si es un math-field dentro de un td      
      if (childElement.hasOwnProperty('child')) {
        
        let math = document.createElement(childElement.child.tag);
        math.style.cssText = childElement?.child?.style ?? false
        if (childElement.child?.tag === 'math-field' && td.tagName === 'TD') {
          mathArray.push(math);
          
        }
        math.setAttribute('virtual-keyboard-mode', 'onfocus');
        math.setAttribute('keypress-sound', 'none');
        math.classList.add('mathSize','fontTabla');
        math.style.width = '285px !important;'
      
        childElement.child.disabled ?
          (math.disabled = childElement.child.disabled) :
          false;
        math.value = childElement?.child?.value;
        if(math.getAttribute('disabled') !== null){
          math.classList.add('element');          
        }
        if(params?.def?.changeWidth){
          math.classList.add('mathSizeWidth')
        }
        
        keyBoard(math)
        td.appendChild(math);
        stateButton(params.artifact, math,params.def)
      } else {
        td.textContent = childElement?.textDefault ?? 'Por defecto';
      }
  
      tr.appendChild(td);
    });
  
    tbody.appendChild(tr);
  });

  contenedorTablet.appendChild(tabla);

  params.def.buttonsActive ? divControllerButton({ ...params, contenedorTablet, mathArray }) : false;
  params.clone.appendChild(contenedorTablet);
}


function generateTree(params = {}) {
  let { def, clone } = params;
  let { contenedor } = def.characteristicsArtifact.tree;
  let { tag, classStyle, child } = contenedor;



  let content = createHtmlElement({ tag, classStyle });
  bucleItem({ content, child, parameters: params });
  clone.style.width = def.characteristicsArtifact.width ?? 'auto';
  clone.appendChild(content);
  let nodoLeft = Array.from(clone.querySelectorAll('#nodoLeft'));
  let nodoRight = Array.from(clone.querySelectorAll('#nodoRight'));
  let nodoOperator = Array.from(clone.querySelectorAll('#nodoOperator'));
  let nodoResult = Array.from(clone.querySelectorAll('#nodoResult'));

  console.log(params.def);

  params.def.buttonsActive ? divControllerButton({
    ...params,
    content,
    nodoLeft: nodosValidate(nodoLeft),
    nodoRight: nodosValidate(nodoRight),
    nodoOperator: nodosValidate(nodoOperator),
    nodoResult: nodosValidate(nodoResult)
  }) : false;

}



function createHtmlElement(childElement = {}) {

  const { tag, classStyle, item } = childElement;
  const element =  document.createElement(tag)
  element.className = classStyle;
  //item?.defaultValue ? element.value = item?.defaultValue  ?? 'defecto' : false
  //item?.disabled ? element.disabled = item?.disabled : false
  //item?.writeCss ? element.style. cssText= item?.writeCss : false

  if(tag === 'math-field'){

    element.setAttribute('virtual-keyboard-mode', 'onfocus'); 

    if(item?.defaultValue){
      element.value = item?.defaultValue  ?? 'defecto'
      element.disabled = item?.disabled ?? false
    }

    if(item?.writeCss){
      element.style.cssText= item?.writeCss  ?? false
    }
    keyBoard(element)
    stateButton(childElement.parameters.artifact, element,childElement.parameters.def)    
  }
  
  element.style.cssText= item?.writeCss  ?? false

  if(childElement?.id !== undefined){
    element.setAttribute('id',childElement?.id)
    element.setAttribute('data-nodo',childElement?.id)
  }

  return element;
  
}

function bucleItem(params = {}) {
  
  let { content, child } = params
  
  if(params.child !== undefined){
    for (let item of child) {
        
      if(item[Object.keys(item)]?.id){
        let element = item[Object.keys(item)] !== undefined ? 
      createHtmlElement({ tag: item[Object.keys(item)]?.tag, classStyle: item[Object.keys(item)]?.classStyle,id: item[Object.keys(item)]?.id, item: item[Object.keys(item)],parameters:params.parameters }) :
      createHtmlElement({ tag: item?.tag, classStyle: item?.classStyle,item: item[Object.keys(item)],parameters:params.parameters})
        content.appendChild(element)
        bucleItem({ content: element, child: item[Object.keys(item)]?.child,parameters:params.parameters})
      }else{
        if(item[Object.keys(item)]?.defaultValue){
          let element = item[Object.keys(item)] !== undefined ? 
        createHtmlElement({ tag: item[Object.keys(item)]?.tag, classStyle: item[Object.keys(item)]?.classStyle, defaultValue: item[Object.keys(item)]?.defaultValue, disabled:item[Object.keys(item)]?.disabled, item: item[Object.keys(item)],parameters:params.parameters}) :
        createHtmlElement({ tag: item?.tag, classStyle: item?.classStyle,item: item[Object.keys(item)],parameters:params.parameters})
          content.appendChild(element)
          bucleItem({ content: element, child: item[Object.keys(item)]?.child,parameters:params.parameters })
        }else{        

          let element = item[Object.keys(item)] !== undefined ? 
        createHtmlElement({ tag: item[Object.keys(item)]?.tag, classStyle: item[Object.keys(item)]?.classStyle, item: item[Object.keys(item)],parameters:params.parameters}) :
        createHtmlElement({ tag: item?.tag, classStyle: item?.classStyle, item: item,parameters:params.parameters })
          content.appendChild(element)
          bucleItem({ content: element, child: item[Object.keys(item)]?.child,parameters:params.parameters })
        }
      
      }

    
    }
  }

}
function nodosValidate(nodo){  
  let nodoArray = []
  

  let nodoFromArray = Array.from(nodo).map(item => {
    Array.from(item.querySelectorAll('math-field')).map(math => { 
      nodoArray.push(math)
  
    })
  })
 
  return nodoArray

}

/* Modulo III  Crea el esqueleto de los artefactos, por defecto y tambien los modificados FUNCION PRINCIPAL */
function artifactDefault(defDefault, artifact, clone, typeForm, targetActive,container = null) {
  let stateChange = false;
  let targetInput = '';
  let screenDivArray = [];
  let keyDivArray = [];
  let equationArray = [];
  let solutionArray = [];

  //clone.classList.add('artifactShadowBoxHover')

  /* Nota: mejorar la logica de typediv antes estaba negada !def[artifact].characteristicsArtifact.hasOwnProperty('typeDiv') */
  if (def[artifact]?.characteristicsArtifact.hasOwnProperty('typeDiv')) {
    def[artifact].characteristicsArtifact.typeForm !== undefined ?
      clone.classList.add(`${def[artifact].characteristicsArtifact.typeForm}`) :
      clone.classList.add('artifactGrid');

    /* Funcionalidad para mostrar un input de Verdadero y Falso, 
   esto no se va  a usar solo fue una funcionalidad que se uso para abordar el examen del capitulo 3 */

    if (def[artifact].modeDouble) {
      for (let [key, value] of Object.entries(defDefault.characteristicsArtifact.typeDiv)) {
        Object.keys(value).map((type, index) => {
          for (let countType = 0; countType < value[type].count; countType++) {
            let mathLatex = document.createElement('math-field');
            mathLatex.setAttribute('virtual-keyboard-mode', 'onfocus');
            mathLatex.setAttribute('keypress-sound', 'none');
            mathLatex.classList.add('math', 'element');
            mathLatex.setAttribute('data-type', type);
            mathLatex.style.width = value[type].size.width;
            mathLatex.style.height = value[type].size.height;
            mathLatex.style.border = value[type].border;
            type.match(/rounded/gi) ?
              ((mathLatex.style.borderRadius = '4rem'),
              mathLatex.classList.add(`roundedArtic-${countType}`, `screenDouble-${countType}`),
              stateButton(artifact, mathLatex,defDefault),
              screenDivArray.push(mathLatex),
              keyBoard(mathLatex)
                
                ) :
              ((mathLatex.style.borderRadius = '0.2rem'),
              mathLatex.classList.add(`square-${countType}`),
              stateButton(artifact, mathLatex,defDefault),
              keyDivArray.push(mathLatex),
              keyBoard(mathLatex)
                
                );
            clone.appendChild(mathLatex);
          }
        });
      }
      if (def[artifact].hasOwnProperty('equationsEnd')) {
        def[artifact].equationsEnd.forEach((item, index) => {
          let input = document.createElement('math-field');
          input.classList.add('math', 'element');
          input.setAttribute('virtual-keyboard-mode', 'onfocus');
          input.setAttribute('keypress-sound', 'none');
          input.classList.add(`${Object.keys(item)[0]}-${index}`);
          input.style.width = item[Object.keys(item)]?.size?.width ?? '300px';
          input.style.height = item[Object.keys(item)]?.size?.height ?? '50px';
          if(item[Object.keys(item)[0]]?.writeCss){
            input.style.cssText= item[Object.keys(item)[0]]?.writeCss
            
          }
          input.style.border = '1px solid black';
          input.style.borderRadius = '0.2rem';
          input.classList[2].match(/solution/gi) ?
            (clone.appendChild(input),
            stateButton(artifact, input,defDefault),
            solutionArray.push(input),
            keyBoard(input)
                
              ) :
            (clone.appendChild(input),
            stateButton(artifact, input,defDefault),
            equationArray.push(input),
            keyBoard(input)
                          
              );
          item[Object.keys(item)].defaultText.hasOwnProperty('disabled') ?
            ((input.disabled = item[Object.keys(item)]?.defaultText?.disabled),
            (input.value = item[Object.keys(item)]?.defaultText?.textValue ?? 'defecto')) :
            (input.value = item[Object.keys(item)]?.defaultText?.textValue ?? 'defecto');
        });
      }
      
    } else {
      for (let [key, value] of Object.entries(defDefault.characteristicsArtifact.typeDiv)) {
        Object.keys(value).map((type) => {
          for (let countType = 0; countType < value[type].count; countType++) {
            let mathLatex = document.createElement('math-field');
            mathLatex.setAttribute('virtual-keyboard-mode', 'onfocus');
            mathLatex.setAttribute('keypress-sound', 'none');
            mathLatex.classList.add('math', 'element');
            mathLatex.setAttribute('data-type', type);
            mathLatex.style.width = value[type].size.width;
            mathLatex.style.height = value[type].size.height;
            mathLatex.style.border = value[type].border;
            type.match(/rounded/gi) ?
              ((mathLatex.style.borderRadius = '2rem'),
              mathLatex.classList.add(`roundedArtic-${countType}`),
              stateButton(artifact, mathLatex,defDefault),
              screenDivArray.push(mathLatex),
              keyBoard(mathLatex)
                
                ) :
              ((mathLatex.style.borderRadius = '0.2rem'),
              mathLatex.classList.add(`square-${countType}`),
              stateButton(artifact, mathLatex,defDefault),
              keyDivArray.push(mathLatex),
              keyBoard(mathLatex)
                
                );
            clone.appendChild(mathLatex);
          }
        });
      }
      if (def[artifact].hasOwnProperty('equationsEnd')) {
        def[artifact].equationsEnd.forEach((item, index) => {
          let input = document.createElement('math-field');
          input.classList.add('math', 'element');
          input.setAttribute('virtual-keyboard-mode', 'onfocus');
          input.setAttribute('keypress-sound', 'none');
          input.classList.add(`${Object.keys(item)[0]}-${index}`);
          input.style.width = item[Object.keys(item)]?.size?.width ?? '320px';
          input.style.height = item[Object.keys(item)]?.size?.height ?? '50px';
          input.style.border = '1px solid black';
          input.style.borderRadius = '0.2rem';
        input.classList[2].match(/solution/gi) ?
          (clone.appendChild(input),
          stateButton(artifact, input,defDefault),
          solutionArray.push(input),
          keyBoard(input)
            ) :
          (clone.appendChild(input),
          stateButton(artifact, input,defDefault),
          equationArray.push(input),
          keyBoard(input)
            );
        item[Object.keys(item)].defaultText.hasOwnProperty('disabled') ?
          ((input.disabled = item[Object.keys(item)]?.defaultText?.disabled),
          (input.value = item[Object.keys(item)]?.defaultText?.textValue ?? 'defecto')) :
          (input.value = item[Object.keys(item)]?.defaultText?.textValue ?? 'defecto');

        if(item[Object.keys(item)]?.defaultText?.writeCss){
          input.style.cssText = item[Object.keys(item)]?.defaultText.writeCss;
        }
        });
      }
    }
    

    if (def[artifact].hasOwnProperty('defaultinput')) {
      screenDivArray.map((math, index) => {
        if (def[artifact]?.defaultinput?.screen?.defaultText[index] !== '') {
          math.value = def[artifact]?.defaultinput?.screen?.defaultText[index]?.textValue ?? '';
          math.disabled = def[artifact]?.defaultinput?.screen?.defaultText[index]?.disabled ?? def[artifact]?.defaultinput?.screen?.disabled;
          if(def[artifact]?.defaultinput?.screen?.defaultText[index]?.writeCss){
            math.style.cssText = def[artifact]?.defaultinput?.screen?.defaultText[index]?.writeCss;
          }
        }
      });
      if (def[artifact].defaultinput.hasOwnProperty('key')) {
        keyDivArray.map((math, index) => {
          if (def[artifact]?.defaultinput?.key[index] !== '') {
            math.value = def[artifact]?.defaultinput?.key?.defaultText[index]?.textValue ?? '';
            math.disabled = def[artifact]?.defaultinput?.key?.defaultText[index]?.disabled ?? def[artifact]?.defaultinput?.key?.disabled;

            if(def[artifact]?.defaultinput?.key?.defaultText[index]?.writeCss){
              math.style.cssText = def[artifact]?.defaultinput?.key?.defaultText[index]?.writeCss;
            }
            
          }
        });
      }
    }

    if (def[artifact].arrowUpDown) {
      for (let countArrow = 0; countArrow < def[artifact].characteristicsArtifact.arrow.count; countArrow++) {
        let arrow = document.createElement('div');
        if (countArrow === 0) {
          arrow.style = def[artifact]?.characteristicsArtifact?.arrow?.styleArrowDown ?? 'margin:4px; text-align:center;';
          arrow.classList.add('arrowDown'),
          arrow.setAttribute('data-type', 'arrow-down'),
          arrow.classList.add(`arrowD-${countArrow}`);
          arrow.style = 'margin:4px; text-align:center !important;';
        } else if (countArrow === 1) {
          arrow.style = def[artifact]?.characteristicsArtifact?.arrow?.styleArrowUp ?? 'margin:4px; text-align:center;';
          arrow.classList.add('arrowUp'),
          arrow.setAttribute('data-type', 'arrow-up'),
          arrow.classList.add(`arrowD-${countArrow}`);
        } else {
          if (countArrow === 3 || countArrow === 5 || countArrow === 7) {
            arrow.classList.add('arrowUp'),
            arrow.setAttribute('data-type', 'arrow-up'),
            arrow.classList.add(`arrowD-${countArrow}`);
            arrow.style = 'margin:4px; text-align:center !important;';
          } else {
            arrow.classList.add('arrowDown'),
            arrow.setAttribute('data-type', 'arrow-down'),
            arrow.classList.add(`arrowD-${countArrow}`);
            arrow.style = 'margin:4px; text-align:center !important;';
          }
        }

        clone.appendChild(arrow);
      }
    } else {
      if (defDefault.characteristicsArtifact.hasOwnProperty('arrow')) {
        for (let countArrow = 0; countArrow < defDefault.characteristicsArtifact.arrow.count; countArrow++) {
          let arrow = document.createElement('div');
          def[artifact].characteristicsArtifact.arrow.direction == 'down' ?
            (arrow.classList.add('arrowDown'),
            arrow.setAttribute('data-type', 'arrow-down'), 
            arrow.classList.add(`arrowD-${countArrow}`), arrow.style = 'margin:4px; text-align:center;') :
            (arrow.classList.add('arrowUp'),
            arrow.setAttribute('data-type', 'arrow-up'),
            arrow.classList.add(`arrowD-${countArrow}`), arrow.style = 'margin:4px; text-align:center;');
          clone.appendChild(arrow);
        }
      }
    }
    

    clone.style.width = defDefault.characteristicsArtifact.width;
    clone.style.height = defDefault.characteristicsArtifact.height;
    clone.style.margin = '8px';
    clone.classList.add('paddingMath');
    def[artifact].characteristicsArtifact.border != undefined ?
      def[artifact].characteristicsArtifact.border :
      clone.classList.add('borderDefault');
      
    if(!container)contenedor.appendChild(clone);
    else {
      container.appendChild(clone)}
   
    divControllerButton({ clone, screenDivArray, keyDivArray, def: def[artifact], artifact, artifact, equationArray, solutionArray, })

  } else {

    if (def[artifact].characteristicsArtifact.hasOwnProperty('page')) {
      contenedor.classList.remove('mainContent');
      contenedor.classList.add('contentText');
      let divContenText = document.createElement('div');
      divContenText.classList.add('contentText');
      def[artifact].characteristicsArtifact.page.map(
        (textObject, textIndex) => {
          pageText(textObject, divContenText, clone, def[artifact]);
          contenedor.appendChild(clone);
        }
      );
    }
    if (def[artifact].characteristicsArtifact.hasOwnProperty('tablet')) {
      contenedor.classList.add('mainContent');
      let divContenText = document.createElement('div');
      divContenText.classList.add('contentText');
      generarTabla({ divContenText, clone, def: def[artifact], artifact });
      contenedor.appendChild(clone);
    }
    if (def[artifact].characteristicsArtifact.hasOwnProperty('tree')) {
      contenedor.classList.add('mainContent');
      generateTree({ clone, def: def[artifact], artifact })
      contenedor.appendChild(clone);

    }

  }
}
function refactValidate(params = {}) {

  let computerEngine = new ComputeEngine.ComputeEngine({
    numericMode: 'machine',
  });
  

  params.def.conditions[params.key].forEach((conditions, inputIndex) => {
    const input = params.validate[inputIndex]
   
   
    
    if (params.mode) {
      if (conditions.length > 0) {
        //if (input.getAttribute("disabled") !== "" && input.value !== "") {
        if (!input.hasAttribute('disabled') && input.value !== '') {
          if (validateInput({ conditions, input, computerEngine, ...params })) {
            input.setAttribute('data-pass', 'pass');
            input.classList.add('pass');
            input.classList.remove('failed');
            input.removeAttribute('data-failed');
            input.removeAttribute('data-forAnswer');
            params.def.dataInteraction.correct++;
          } else {
            if(Array.from(input.classList).includes('failed')){
              input.classList.add('bounce')
              setTimeout(()=>{
                input.classList.remove('bounce')
              },1000)
            }
            input.classList.add('failed');
            input.classList.remove('pass');
            input.setAttribute('data-failed', 'failed');
            input.removeAttribute('data-pass');
            input.removeAttribute('data-forAnswer');
            params.def.dataInteraction.incorrect++;
          }
        } else {
          input.setAttribute('data-forAnswer', 'forAnswer');
          input.removeAttribute('data-pass');
          input.removeAttribute('data-failed');
          input.classList.remove('pass');
          input.classList.remove('failed');
          params.def.dataInteraction.forAnswer++;
        }
      }
    } else {
      //console.log(input)
      //if (input.getAttribute("disabled") !== "" && input.value !== "") {
      if (!input.hasAttribute('disabled') && input.value !== '') {
        if (input.value != '') {
          input.value = '';
          input.classList.remove('pass');
          input.classList.remove('failed');
          params.def.dataInteraction.correct = 0;
          params.def.dataInteraction.incorrect = 0;
          params.def.dataInteraction.forAnswer = 0;
        }
      }
    }
  });


}
function validateInput(params = {}) {
  let expreVarX = /\b[x|\w*x\w]\b/gi;
  let noiseDecimal = params.def.noiseDecimal;
  let minDecimalRegex = /[,.]/gi;
  let noise = 0.1;
  let input = params.computerEngine.parse(
    params.input.value.replace(new RegExp(expreVarX), (match) =>
      match === 'x' ? params.def.variableX : match
    )
  );

  return params.conditions.some((valueCondition) => {
    
    if (typeof valueCondition === 'number') {

      if (params.def.depure) {
        console.log(
          Array.isArray(input.N()._value)
            ? input.evaluate()._value
            : input.N()._value
        );
      }

      if(params.def.minDecimal > 0){
    
        // colocarlos en una funcion de utils del capitulo general
        if(String(valueCondition).split(minDecimalRegex).at(-1).length > 1 &&  params.input.value.split(minDecimalRegex).at(-1).length < params.def.minDecimal){
          return false
        }
        
        return gInterPoint(
         Array.isArray(input.N()._value) ? input.evaluate()._value : input.N()._value,
         valueCondition, noiseDecimal, params.def.minDecimal
        );

      }

      return gInterPoint(
        Array.isArray(input.N()._value)
          ? input.evaluate()._value
          : input.N()._value,
        valueCondition, noiseDecimal, params.def.minDecimal
      );

    } else {
      if (params.def.depure) {
        console.log(
          valueCondition ===
          params.input.value.replace(new RegExp(/\\|\$/gi), '')
        );
      }

      /* if(params.def.minDecimal > 0){
        if(String(valueCondition).split(minDecimalRegex).at(-1).length > 1 && params.input.value.split(minDecimalRegex).at(-1).length < params.def.minDecimal){
          return false
        }
        //console.log(Number(params.input.value.replace(new RegExp(/\\|\$/gi), "").replace(new RegExp("[' ']", "g"), "")).toFixed(params.def.minDecimal) !== 'NaN')
        console.log(Number(valueCondition.replace(new RegExp("[' ']", "g"), "")).toFixed(params.def.minDecimal) !== NaN)
        console.log(Number(valueCondition.replace(new RegExp("[' ']", "g"), "")).toFixed(params.def.minDecimal) !== "NaN")
        
        

        // colocarlos en una funcion de utils del capitulo general
        
        if (Number(params.input.value.replace(new RegExp(/\\|\$/gi), "").replace(new RegExp("[' ']", "g"), "")).toFixed(params.def.minDecimal) <= Number(valueCondition.replace(new RegExp("[' ']", "g"), "")).toFixed(params.def.minDecimal) + noise &&
          Number(params.input.value.replace(new RegExp(/\\|\$/gi), "").replace(new RegExp("[' ']", "g"), "")).toFixed(params.def.minDecimal) >= Number(valueCondition.replace(new RegExp("[' ']", "g"), "")).toFixed(params.def.minDecimal) - noise
       ) {
          return true;
       } else {
          return false;
       }

      }    */

      return (
        gClearInputLatex(valueCondition).replace(new RegExp('[\' \']', 'g'), '') === gClearInputLatex(params.input.value).replace(new RegExp(/\\|\$/gi), '').replace(new RegExp('[\' \']', 'g'), '')
      );
      /* return (
        valueCondition.replace(new RegExp("[' ']", "g"), "") === params.input.value.replace(new RegExp(/\\|\$/gi), "").replace(new RegExp("[' ']", "g"), "")
      ); */
    }
  });
}
function divControllerButton(params = {}) {
  let divControllerButton = document.createElement('div');
  let buttonValidate = document.createElement('button');
  let buttonReset = document.createElement('button');
  divControllerButton.classList.add('divControllerButton');

  if(params.def.buttonsActive){
    buttonValidate.classList.add(
      'check',
      'buttonPrimary',
      'button-marg',
      'buttonKey'
    );
    buttonReset.classList.add(
      'reset',
      'buttonSecundary',
      'button-marg',
      'buttonKey'
    );
  
    buttonValidate.addEventListener('click', () => {
      mn({ ...params, mode: true });
    });
  
    buttonReset.addEventListener('click', () => {
      mn({ ...params, mode: false });
    });
  
    divControllerButton.appendChild(buttonReset);
    divControllerButton.appendChild(buttonValidate);  

  }else{
    divControllerButton.style.border = 'none'
  }
  
  params.contenedorTablet ?
  params.contenedorTablet.appendChild(divControllerButton) :
  params.content ?
  params.content.appendChild(divControllerButton) :
  params.clone.appendChild(divControllerButton) ;

}

function mn(params) {
  
  params.def.dataInteraction.correct = 0;
  params.def.dataInteraction.incorrect = 0;
  params.def.dataInteraction.forAnswer = 0;
  
  if (params.def.conditions['equation'])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.equationArray,
      key: 'equation',
    });
  if (params.def.conditions['key'])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.keyDivArray,
      key: 'key',
    });
  if (params.def.conditions['screen'])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.screenDivArray,
      key: 'screen',
    });
  if (params.def.conditions['solution'])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.solutionArray,
      key: 'solution',
    });
  if (params.def.conditions['table'])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.mathArray,
      key: 'table',
    });
    
    
    

  /* Arboles Binarios */
  if (params.def.conditions['nodoLeft'])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.nodoLeft,
      key: 'nodoLeft',
    });
  if (params.def.conditions['nodoRight'])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.nodoRight,
      key: 'nodoRight',
    });
  if (params.def.conditions['nodoOperator'])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.nodoOperator,
      key: 'nodoOperator',
    });
  if (params.def.conditions['nodoResult'])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.nodoResult,
      key: 'nodoResult',
    });
         
  if(params.mode === false){
    return
  }

  

  if (typeof Android !== 'undefined' && typeof Android.sendData === 'function') {
    if(params.def.change){
      Android.sendData(JSON.stringify(cleanDataEngine({ ...params })));
      params.def.change = false;
    }
    
  } else {
    if(params.mode === true && params.def.depure === true){
      cleanDataEngine({ ...params })
      //console.log('aqui',cleanDataEngine({ ...params }))
    }

    if(params.def.change){
      console.warn({
        messageError:
              'Esta funcion no se encuentra definida o no esta en el mismo ambito',
      });
      sendData(cleanDataEngine({ ...params }));
      params.def.change = false;
    }
  }
}
function cleanDataEngine(params = {}) {
  let validate = params.clone.querySelectorAll('math-field')
  let { artifact, def } = params;

  let auxResult = {};
  let orderInput = {};

  validate.forEach((item) => {
    if (!item.hasAttribute('disabled')) {
      orderInput[[item.classList[2]]] = item.value;
    }
  });

  auxResult = { results: def.dataInteraction };
  auxResult.artifact = Number(targetActive.split('_').at(-1));
  auxResult.typeArtifact = 'Standard';
  auxResult.seconds = def.timeInteraction;
  auxResult.elementArtifact = { inputs: { orderInput } };

  return auxResult;
}
function keyBoard(math){
  // const cap_3 = {
  //   MG_KEYBOARD_LAYER: {
  //     numeros: {
  //       rows: [
  //         [],
  //         [
  //           { class: 'small', label: '1', key: '1', },
  //           { class: 'small', label: '2', key: '2' },
  //           { class: 'small', label: '3', key: '3' },
  //           { class: 'small', label: '4', key: '4' },
  //           { class: 'small', label: '5', key: '5' },

  //           {
  //             class: 'action',
  //             label: '<svg><use xlink:href=\'#svg-arrow-left\' /></svg>',
  //             command: ['performWithFeedback', 'moveToPreviousChar'],
  //           },

  //           {
  //             class: 'action',
  //             label: '<svg><use xlink:href=\'#svg-arrow-right\' /></svg>',
  //             command: ['performWithFeedback', 'moveToNextChar'],
  //           },
  //         ],
  //         [
  //           { class: 'small', label: '6', key: '6' },
  //           { class: 'small', label: '7', key: '7' },
  //           { class: 'small', label: '8', key: '8' },
  //           { class: 'small', label: '9', key: '9' },
  //           { class: 'small', label: '0', key: '0' },
  //           { class: 'small', label: '=', key: '='},
  //           {
  //             class: 'action font-glyph bottom right',
  //             label: '&#x232b;',
  //             command: ['performWithFeedback', 'deleteBackward'],
  //           },
  //         ],
  //         [
  //           { class: 'small', label: '+', key: '+' },
  //           { class: 'small', latex: '-', key: '-' },
  //           { class: 'small', label:'*', key:'*'},
  //           { class: 'small', insert:'\\frac{\\placeholder{}}{\\placeholder{}}'},
  //           { class: 'small', label: '.', key: '.' },
  //           { class: 'small', label: ',', key: ',' },
  //           { class: 'small', label: ';', key: ';' },

  //         ],
  //       ],
  //     },
  //     funciones: {

  //       rows: [
  //         [],
  //         [
  //           {  class: 'small', insert: '\\sin'},
  //           {  class: 'small', insert: '\\cos'},
  //           {  class: 'small', insert: '\\tan'},
  //           {  class: 'small', insert: '\\ln'},
  //           {  class: 'small', insert: '\\placeholder{}^{\\placeholder{}}'},
  //           {  class: 'small', insert: '\\placeholder{}^2'},
  //           {
  //             class: 'action',
  //             label: '<svg><use xlink:href=\'#svg-arrow-left\' /></svg>',
  //             command: ['performWithFeedback', 'moveToPreviousChar'],
  //           },

  //           {
  //             class: 'action',
  //             label: '<svg><use xlink:href=\'#svg-arrow-right\' /></svg>',
  //             command: ['performWithFeedback', 'moveToNextChar'],
  //           },
            
  //         ], [
  //           { class: 'small w15', insert: '\\sin^{-1}'},
  //           { class: 'small w15', insert: '\\cos^{-1}'},
  //           { class: 'small w15', insert: '\\tan^{-1}'},
  //           { class: 'small', insert: '\\exponentialE'},
  //           { class: 'small', insert: '\\sqrt{\\placeholder{}}'},
  //           { class: 'small', label: '(', key: '(' },
  //           { class: 'small', label: ')', key: ')' },            
  //           {
  //             class: 'action font-glyph bottom right',
  //             label: '&#x232b;',
  //             command: ['performWithFeedback', 'deleteBackward'],
  //           },
  //         ],
  //         [
  //           { class: 'small w15', insert: 'f'},
  //           { class: 'small w15', insert: 'f^{-1}'},
  //           { class: 'small w15', insert: 'g'},
  //           { class: 'small w15', insert: 'g^{-1}'},
  //           { class: 'small w15', insert: 'k'},
  //           { class: 'small w15', insert: 'k^{-1}'},
  //           { class: 'small w15', insert: 'h'},
  //           { class: 'small w15', insert: 'h^{-1}'},
  //         ],
  //       ],
  //     },
  //     alfabeto: {
  //       rows: [
  //         [],
  //         [
  //           { class: 'small', label: 'a', key: 'a' },
  //           { class: 'small', label: 'b', key: 'b' },
  //           { class: 'small', label: 'c', key: 'c' },
  //           { class: 'small', label: 'd', key: 'd' },
  //           {
  //             class: 'action',
  //             label: '<svg><use xlink:href=\'#svg-arrow-left\' /></svg>',
  //             command: ['performWithFeedback', 'moveToPreviousChar'],
  //           }, {
  //             class: 'action',
  //             label: '<svg><use xlink:href=\'#svg-arrow-right\' /></svg>',
  //             command: ['performWithFeedback', 'moveToNextChar'],
  //           },
  //         ], [
  //           { class: 'small', label: 'x', key: 'x' },
  //           { class: 'small', label: 'y', key: 'y' },
  //           { class: 'small', label: 'z', key: 'z' },
  //           { class: 'small', latex:'\\emptyset '},
  //           { class: 'small', label: '∄', key: '∄'},
  //           {
  //             class: 'action font-glyph bottom right',
  //             label: '&#x232b;',
  //             command: ['performWithFeedback', 'deleteBackward']
  //           }
  //         ],
  //         [ {class: 'small', insert:'\\pi'},{}, {},{}, {},{},]
  //       ],
  //     },

  //   },
  //   MG_KEYBOARD: {
  //     numeros: {
  //       label: '123',
  //       layer: 'numeros',
  //     },
       
  //     alfabeto: {
  //       label: 'Alfabeto',
  //       layer: 'alfabeto',
  //     },
  //     funciones: {
  //       label: 'ƒ()',
  //       layer: 'funciones',
  //     },
  //   },
  //   virtualKeyboards: 'numeros funciones alfabeto'
  // };
  
  const keyboardsLayouts = {
    numeric: {

      label: 'Números',
      rows: [

        ['1', '2', '3', '4',{ label: '[(]', shift: '\\lfloor', variants: ['\\lfloor', '\\lbrack', '\\lbrace', '\\vert'] },{ label: '[backspace]', width: 1 }],
        [ '5','6','7', '8',{ label: '[)]', shift: '\\rfloor', variants: ['\\rfloor', '\\rbrack', '\\rbrace', '\\vert'] },'-'],
        [  '9', '0','.', ',','[left]', '[right]'],
        // ["+", "-", { latex: "\\cdot", label: "*" }, "\\frac", ".", ",", "[left]", "[right]"],
      ]
    },

    functions: {

      label: 'Funciones',
      rows: [
        [{latex: '\\vert\\placeholder[]{}\\vert'},{ latex: 'f\\left(x\\right)', width: 2 }, { label: 'tan()', latex: '\\tan\\left(#?\\right)', shift: '\\tan^{-1}\\left(#?\\right)', width: 2 }, '\\sqrt{#?}',{ label: '[backspace]', width: 1 }],
        [ { label: 'cos()', latex: '\\cos\\left(#?\\right)', shift: '\\cos^{-1}\\left(#?\\right)', width: 2 },{ label: 'sin()', latex: '\\sin\\left(#?\\right)', shift: '\\sin^{-1}\\left(#?\\right)', width: 2 }, { label: 'ln()', latex: '\\ln\\left(#?\\right)' }, { label: '[shift]', width: 1 }],
        [{  latex:'\\frac{\\placeholder{}}{\\placeholder{}} '} ,'\\exponentialE^{#?}', { latex: 'x^2', }, '\\frac{1}{()}','[left]', '[right]']

      ],

    },


    symbols: {
      label: 'Símbolos',
      rows: [

        [{ label: '/', latex:'\\frac{\\placeholder{}}{\\placeholder{}} '} ,'-','+', 'n', { latex: '\\cdot', label: '*' }, { latex: '\\lbrace', shift: '\\vert' }, { latex: '\\rbrace', shift: '\\vert' }, { latex: '\\cup', shift: '\\cap', variants: ['\\cap'] }, { label: '[backspace]', width: 1 }],
        [{ label: 'R', variants: ['Z'], shift: 'Z' },'x', 'y', '=',{ label: 'aᵇ', latex: '#@^{#?}' },   '\\nexists', '\\pi', '\\infty',{ label: '[shift]', width: 1 }],
        [';', '\\lfloor', '\\rfloor', 'c','\\lbrack', '\\rbrack',{ label: '', latex: '\\cdot' },'[left]', '[right]',],
      ]

    },


  }

  math.addEventListener('keydown', (e) => {
    e.preventDefault();
    e.target.blur();
  });


  math.addEventListener('click', (e) => {
    /* document.querySelectorAll('math-field').forEach((element) => {
      element.blur();
    }); */
    
    math.mathVirtualKeyboardPolicy = "sandboxed";
    
    mathVirtualKeyboard.layouts = [keyboardsLayouts.numeric,keyboardsLayouts.functions,keyboardsLayouts.symbols],
    mathVirtualKeyboard.visible = true;

    
    /*  e.target.setOptions({
      customVirtualKeyboardLayers: cap_3.MG_KEYBOARD_LAYER,
      customVirtualKeyboards: cap_3.MG_KEYBOARD,
      virtualKeyboards: cap_3.virtualKeyboards
    });
 */
  });


  return math
}


function setKeyBoard(keyboardProfile) {

  let validKeyboard;
  let buildInKeyboards = ['default', 'numeric', 'symbols', 'minimalist', 'compact', 'numeric-only']
  let result = [];

  if (keyboardProfile != undefined) {
    keyboardProfile.forEach(element => {
      if (keyboardsLayouts[element]) {
        result.push(keyboardsLayouts[element]);
      }
    });


    if (result.length > 0) {
      return result;

      // return validKeyboard = keyboardsLayouts[keyboardProfile]
    }
    else if (keyboardProfile.every(item => buildInKeyboards.includes(item))) {
      return keyboardProfile;
    }
    else {
      console.error('Teclado solicidato No existente')
      return ['minimalist']
    }
  } else {
    console.warn('Teclado No definido')

    return ['minimalist']
  }


}
