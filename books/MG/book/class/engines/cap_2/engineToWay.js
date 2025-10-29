//> INICIO________/\/\____/\/\________/\/\/\________/\/\___________/\/\________/\/\_________/\/\______/\/\_________/\/\_________/\/\__________ ...

//Documentación e información de Definiciones: https://docs.google.com/document/d/1EhjchD7XvrH148LPJC4sK1WNrSmJOPsBXtVtwLx28So/edit?usp=sharing 
//EJEMPLO: https://jsfiddle.net/h2gr9y34/2/
//Documentación de la librería: https://cortexjs.io/mathlive/

//CREAR RAMA EN REPOSITORIO


let etwInputsCreated = {};
let etwPreviousElementValidated = {};
let previousBoardFocusRef = null;

//=========================================================| Función Principal |==================================================================

function etwMain(etwDefParam, etwDefBoardsParam) {

  const tmp = document.querySelector('#tmp-way');
  const divs = document.querySelectorAll('.elementEtw');
  let count = 1;
  let exampleCount = 1;

  for (let key in etwDefParam) {

    const clone = tmp.content.firstElementChild.cloneNode(true);
    const container = document.querySelector(`.elementEtw[data-artifact = "${key}"]`);
    const numberArtifacts = count;

    if (!container) continue;

    const $board = clone.querySelector('.etwBoard');
    const btnAll = clone.querySelector('.btn-all');
    const btnHelp = clone.querySelector('.help-btn');

    //const helpMsg = clone.querySelector(".etwArtifact__help-msg")
    const btnCloseHelp = clone.querySelector('.etwArtifact__help-msg-btnClose');
    const fieldName = clone.querySelector('.etwArtifact__elements');
    const containerTitle = clone.querySelector('.etwArtifact__title');


    const id = (key.includes('example')) || (!key.includes('artifact')) ? 'example' + exampleCount : 'etwBoard-' + count;

    $board.setAttribute('id', id);

    const boardSelect = container.dataset.board || allDef[container.dataset?.artifact || 'artifact_0'].defBoard || 'board_0';
    const ref = container.dataset.artifact || defBoards[boardSelect || 'board_0']?.artifact || 'artifact_0';


    clone.id = ref;
    fieldName.id = `${ref}-otherElements`;
    containerTitle.id = `${ref}-titleElements`;
    btnHelp.id = `${ref}-btnHelp`;

    //btnCloseHelp.id = `${ref}-btnCloseHelp`



    etwInputsCreated[ref] = {
      board: $board,
      inputsRef: [],
      fieldInputWayName: false
    };

    if (!etwDefBoardsParam[boardSelect]) {
      console.warn('<!> board undefined <!>');
      return;
    }

    const artifactDefault = {
      debug: false,
      statusValidate: false,
      statusChange:false,
      pointsData: [[]],
      timeInteraction: 0,
      ...etwDefParam[ref],
      conditions: {
        valueInputs: etwDefParam[ref].conditions.valueInputs || [null, null],
        valueWayName: etwDefParam[ref].conditions.valueWayName || false,
      },
      buttonsActive: {
        validate: true,
        ...etwDefParam[ref].buttonsActive
      }
    };

    const style = etwDefBoardsParam[boardSelect].style;

    container.style =
      'width: ' +
      (style.maxWidth || '') +
      'px; height: ' +
      (style.maxHeight || '') +
      'px;';

    btnAll.addEventListener('click', (e) => {
      if (e.target.classList.contains('check')) {
        gTime(etwDefParam[ref], false, false);
        etwDefValidation(ref, numberArtifacts, etwPreviousElementValidated, ref, etwDefParam, etwDefBoardsParam, clone);
        e.stopPropagation();
      } else if (e.target.classList.contains('reset')) {
        etwDefReset(ref, board, etwInputsCreated, etwDefParam, etwDefBoardsParam, clone);
      }
    });

    if (!artifactDefault.buttonsActive.validate) {
      btnAll.style.display = 'none';
    };

    clone.addEventListener('click', (e) => {
      etwDefParam[ref].statusValidate = false;
      gTime(etwDefParam[ref], true);
    });

    clone.addEventListener('mouseenter', () => {
      gTime(etwDefParam[ref], true);
    });

    clone.addEventListener('mouseleave', () => {
      gTime(etwDefParam[ref], false, false);
    });


    etwDefParam[ref] = artifactDefault;
    //const board = etwDefBoard(etwDefParam, etwDefBoardsParam, ref, boardSelect, id, style,);

    container.appendChild(clone);
    const { board } = gBoard(etwDefParam[ref], etwDefBoardsParam[boardSelect], id, style);

    elementOfArtifact(ref, etwDefParam, etwDefBoardsParam, board, id, clone);

    if (!key.includes('example')) {

      count++;
    }
    exampleCount++;
  }


}

//funcion para crear elementos por artefactos

function elementOfArtifact(refParam, etwDefParam, etwDefBoardsParam, board, id, artifact) {
  //const content = etwDefParam[refParam].conditions.textOfHelp
  const keyboard = {
    'keyboard': {
      MG_KEYBOARD_LAYER: {

        styles: 'margin: 0 auto;',
        operadores: {
          styles: '',
          rows: [
            [], [
              {
                class: 'small',
                latex: 'g\\left(\\right)',
                insert: 'g\\left(\\right)',
              },
              { class: 'small', latex: 'g^{-1}' },
              { class: 'small', latex: 'f^{-1}' },
              {
                class: 'small',
                latex: 'f\\left(\\right)',
                insert: 'f\\left(\\right)',
              },
              { label: '+', key: '+' },
              { label: '-', key: '-' },
              { label: '*', key: '*' },
              { latex: '#@^{#?}' },

            ],
            [

              {
                class: 'small',
                latex: '\\placeholder{}^{1}',
              },
              {
                class: 'small',
                latex: '\\placeholder{}^{-1}',
              },
              { latex: '(' },
              { latex: ')' },
              { class: 'small', latex: '\\frac{#@}{#0}', key: '/' },
              {
                class: 'action',
                label: '<svg><use xlink:href=\'#svg-arrow-left\' /></svg>',
                command: ['performWithFeedback', 'moveToPreviousChar'],
              }, {
                class: 'action',
                label: '<svg><use xlink:href=\'#svg-arrow-right\' /></svg>',
                command: ['performWithFeedback', 'moveToNextChar'],
              }, {
                class: 'action font-glyph bottom right',
                label: '&#x232b;',
                command: ['performWithFeedback', 'deleteBackward']
              },
            ],
            /////////////////

          ],
        },
        numeros: {
          styles: '',
          rows: [
            []
            , [
              { label: '1', key: '1' },
              { label: '2', key: '2' },
              { label: '3', key: '3' },
              { label: '4', key: '4' },
              { label: '5', key: '5' },
              { label: '6', key: '6' },

              {
                class: 'action font-glyph bottom right',
                label: '&#x232b;',
                command: ['performWithFeedback', 'deleteBackward']
              }
            ], [
              { label: '7', key: '7' },
              { label: '8', key: '8' },
              { label: '9', key: '9' },
              { label: '.', key: '.' },
              { label: ',', key: ',' },
              { label: '0', key: '0' },

              {
                class: 'action',
                label: '<svg><use xlink:href=\'#svg-arrow-left\' /></svg>',
                command: ['performWithFeedback', 'moveToPreviousChar'],
              }, {
                class: 'action',
                label: '<svg><use xlink:href=\'#svg-arrow-right\' /></svg>',
                command: ['performWithFeedback', 'moveToNextChar'],
              },
            ],
          ],
        },
        variables: {
          styles: '',
          rows: [
            [

            ], [
              { label: 'a', key: 'a' },
              { label: 'b', key: 'b' },
              { label: 'c', key: 'c' },
              { latex: 'd', key: 'd' },
              { latex: 'e', key: 'e' },
              { latex: 'f', key: 'f' },
              { latex: 'g', key: 'g' },
              { latex: 'h', key: 'h' },
              { latex: 'i', key: 'i' },

            ], [

              { latex: 'j', key: 'j' },
              { latex: 'k', key: 'k' },
              { latex: 't', key: 't' },
              { label: 'x', key: 'x' },
              { label: 'y', key: 'y' },
              { label: 'z', key: 'z' },


              {
                class: 'action',
                label: '<svg><use xlink:href=\'#svg-arrow-left\' /></svg>',
                command: ['performWithFeedback', 'moveToPreviousChar'],
              }, {
                class: 'action',
                label: '<svg><use xlink:href=\'#svg-arrow-right\' /></svg>',
                command: ['performWithFeedback', 'moveToNextChar'],
              }, {
                class: 'action font-glyph bottom right',
                label: '&#x232b;',
                command: ['performWithFeedback', 'deleteBackward']
              }
            ],
          ],
        },
        simbolos1: {
          styles: '',
          rows: [
            [

            ], [
              { latex: 'e', key: 'e' },
              { label: '∄', insert: '\\nexists' },
              { latex: '\\pi' },

              { latex: '\\empty' },
              { latex: '\\infty' },

              { label: '≠', insert: '≠' },

            ],
            [
              { latex: '<' },
              { latex: '>' },
              { latex: '\\leq' },

              { latex: '\\geq' },
              {
                class: 'action',
                label: '<svg><use xlink:href=\'#svg-arrow-left\' /></svg>',
                command: ['performWithFeedback', 'moveToPreviousChar'],
              }, {
                class: 'action',
                label: '<svg><use xlink:href=\'#svg-arrow-right\' /></svg>',
                command: ['performWithFeedback', 'moveToNextChar'],
              }, {
                class: 'action font-glyph bottom right',
                label: '&#x232b;',
                command: ['performWithFeedback', 'deleteBackward']
              }
            ],


          ],
        },
      },
      MG_KEYBOARD: {
        operadores: {
          label: 'Operadores',

          layer: 'operadores',
        },
        numeros: {
          label: 'Números',

          layer: 'numeros',
        },
        variables: {
          label: 'Variables',

          layer: 'variables',
        },
        simbolos1: {
          label: 'Simbolos',

          layer: 'simbolos1',
        }
      },
      virtualKeyboards: 'operadores numeros variables simbolos1'
    }
  };




  if (etwDefParam[refParam].showTitle) {
    etwTitleofArtifact(refParam, id, etwDefParam, etwDefBoardsParam);
  }

  if (etwDefParam[refParam].inputsDefault) {

    etwInputsDefault(etwDefParam[refParam].inputsDefault, board, refParam, id, etwDefParam, keyboard);
  }

  if (etwDefParam[refParam].showWayNameInput) {
    etwInputName(refParam, id, etwDefParam, etwDefBoardsParam, keyboard);
  }

  if (etwDefParam[refParam].showText) {
    //va con textOfExample
    etwShowText(refParam, id, etwDefParam, etwDefBoardsParam);
  }

  if (etwDefParam[refParam].helpMsg) {
    document.querySelector(`#${refParam} .help-btn`).classList.remove('d-none');
    const content = etwDefParam[refParam].textOfHelp;

    gHelpMsg(etwDefParam[refParam], artifact, refParam);
  }

}

//======================================================|| Creacion de Inputs por Defecto ||============================================


function etwInputsDefault(inputsRef, boardRef, refParam, idBoard, etwDefParam, keyboard) {

  //::::::::::::::::::::::::::::::::::::::| creacion de campo |:::::::::::::::::::::::::::::::::    

  inputsRef.forEach((input, i) => {

    let id = 'input-' + i + '-' + idBoard;
    let readOrWritte = input[1] ? '' : 'readonly'; // establece si los inputs pueden ser editados o no
    let contenido = input[2] ? input[2] : ''; // almacena el contenido pasado como parametro


    const mathFieldtoCreate = boardRef.create( //creación del input
      'text',
      [
        input[0][0],
        input[0][1],
        `<math-field virtual-keyboard-mode='onfocus' fonts-directory='fonts' keypress-sound = "none"  ${readOrWritte} class="input-for-way" id =${id}> </math-field>`
      ],
      { fixed: true, fontSize: 28, anchorX: 'middle' }
    );

    //::::::::::::::::::::::::::::::::::::| configuración de los campos |:::::::::::::::::::::::::::::::::::::::::::::::::::    

    const campo = document.querySelector(`#input-${i}-${idBoard}`);
    campo.textContent = contenido;

    mathFieldtoCreate.on('over', function (event) {
      const elementx = boardRef.getAllUnderMouse();
      if (elementx.findIndex(
        (p) => {
          return !Array.isArray(p) && p.id !== mathFieldtoCreate.id;
        }) !== -1) {
        return;
      };
      mathFieldtoCreate.visProp.cssstyle = 'z-index:4;';
    }, true);

    mathFieldtoCreate.on('out', function (event) {
      mathFieldtoCreate.visProp.cssstyle = 'z-index:3;';
    }, true);

    gStyleMath(campo);

    const optionsKeyboard = getKeyboardMath(window.screen.width, keyboard['keyboard']);

    campo.setOptions({
      'customVirtualKeyboardLayers': optionsKeyboard[0],
      'customVirtualKeyboards': optionsKeyboard[1],
      'virtualKeyboards': optionsKeyboard[2],

    });

    // campo.setAttribute('keypress-sound',"none");

    //::::::::::::::::::::::| logica para que no se valide si es por defecto y guardado en variable global |::::::::::::::::::::::::::::::::::::::::::::::::

    let informationInput = [input[3], campo];

    if (readOrWritte === 'readonly') { //logica para que no se valide si es por defecto           
      informationInput.push(false);
      campo.classList.add('input-for-way--default');
    } else {
      informationInput.push(true);
    }
    //::::::::::::::::::::::::::::::::::::| añadidura de los eventos a los inputs |::::::::::::::::::::::::::::::::::::::::
    /* 
        campo.addEventListener('keydown', (evt) => { //evento para bloquear el teclado a excepción de las teclas direccionales y boton para borrar
    
          if (evt.key !== 'Backspace' && evt.key !== 'ArrowLeft' && evt.key !== 'ArrowRight') {
            evt.preventDefault();
          }
        }, { capture: true }); */

    campo.addEventListener('focus', () => {
      if (etwDefParam[refParam].timeInteraction > 0) gTime(etwDefParam[refParam], true);
    });

    if (informationInput[2] !== false) {
      campo.addEventListener('input', () => {
        etwDefParam[refParam].statusValidate = false;
        gTime(etwDefParam[refParam], true);
      });
    }

    campo.addEventListener('blur', () => {
      gTime(etwDefParam[refParam], false, false);
    });

    campo.addEventListener('change', ()=>{
      etwDefParam[refParam].statusChange = true
    })

    etwInputsCreated[refParam].inputsRef.push(informationInput);
  });

}

//====================================================|| Creacion de Titulos de artefactos ||=============================================================

function etwTitleofArtifact(refParam, id, etwDefParam, etwDefBoardsParam) {
  const element = document.getElementById(`${refParam}-titleElements`);
  const content = etwDefParam[refParam].artifactTitle;

  const containerTitle = document.createElement('h5');

  containerTitle.textContent = content;
  containerTitle.classList.add('p-1');

  element.appendChild(containerTitle);

}

//====================================================|| Creacion de Mensajes de Ejemplo ||=============================================================

function etwShowText(refParam, idRef, etwDefParam, etwDefBoardsParam) {

  const element = document.getElementById(`${refParam}-otherElements`);
  const content = etwDefParam[refParam].textOfExample;

  let contentText = document.createElement('p');
  contentText.classList.add('p-1');

  if (typeof content === 'string') {
    contentText.textContent = content;
  }

  if (typeof content === 'object') {

    let contentTitle = document.createElement('strong');
    let contentInfo = document.createElement('span');

    contentInfo.appendChild(document.createTextNode(content.info || '<insertar texto en definicion>'));
    contentTitle.appendChild(document.createTextNode(content.title || '<insertar titulo>'));

    contentText.appendChild(contentTitle);
    contentText.appendChild(contentInfo);
  }

  element.appendChild(contentText);
}

//========================================|| creacion de inputs de nombre del camino ||============================================

function etwInputName(refParam, idRef, etwDefParam, etwDefBoardsParam, keyboard) {

  const element = document.getElementById(`${refParam}-otherElements`);

  let mathField = document.createElement('math-field');
  let titleMath = document.createElement('p');

  mathField.setAttribute('virtual-keyboard-mode', 'onfocus');
  mathField.classList.add('fieldNameInput');
  titleMath.textContent = 'Nombre del Camino';
  titleMath.classList.add('titleWayName');


  element.appendChild(titleMath);
  element.appendChild(mathField);
  const field = element.querySelector('math-field');


  const validationObject = etwDefParam[refParam].conditions.valueWayName;

  if (!Array.isArray(validationObject)) {

    const keyboardOptions = getKeyboardMath(window.screen.width, keyboard['keyboard']);

    field.setOptions({
      'customVirtualKeyboardLayers': keyboardOptions[0],
      'customVirtualKeyboards': keyboardOptions[1],
      'virtualKeyboards': keyboardOptions[2]
    });

    field.addEventListener('focus', () => {
      gTime(etwDefParam[refParam], true);
    });

    field.addEventListener('input', () => {
      gTime(etwDefParam[refParam], true);
    });

    field.addEventListener('blur', () => {
      gTime(etwDefParam[refParam], false, false);
    });
    field.addEventListener('change', ()=>{
      etwDefParam[refParam].statusChange = true
    })

    etwInputsCreated[refParam].fieldInputWayName = mathField;
    return;
  }
  field.setAttribute('readonly', '');
  field.textContent = validationObject[0] ?? '';

  return;

}


//=========================================|| **VALIDACION** ||=================================================

function etwDefValidation(ref, numBoard, previousValuesParam, id, etwDefParam, etwDefBoardsParam,clone) {

  let diferentPreviousElementOnInput = false;
  let inputsOfBoard = etwInputsCreated[ref].inputsRef;
  let inputWayName = etwInputsCreated[ref].fieldInputWayName;
  let stateInputs = [];
  let definitioValueInputs = etwDefParam[ref].conditions.valueInputs;
  let definitionValueWayName = etwDefParam[ref].conditions.valueWayName;

  //ordenando inputs definidos para que coincidan entre ellos utilizando el id especificado

  inputsOfBoard.sort();
  definitioValueInputs.sort();

  //:::::::::::::::::::::::::::::|| Validacion de los inputs del nombre del camino ||:::::::::::::::::::::::::::::::::::::

  if (definitionValueWayName !== false) {

    const informationInput = [inputWayName]; //información del input

    //inputWayName.value = inputWayName.value.replace(new RegExp(regex),'') //eliminando '\' para validar

    if (definitionValueWayName === inputWayName.value) {
      informationInput.push('correct');
    }
    else {
      informationInput.push('incorrect');
    }
    informationInput.push('wayName');
    stateInputs.push(informationInput);
  }
  else {
    //caso: si contiene input way name pero no se ha creado la definicion
    if (inputWayName) {
      console.warn('|Advertencia: EL board contiene un input para el nombre de camino y la propiedad "valueWayName" no se ha creado o esta vacia en la definicion\nsi declaraste la propiedad puedes revisar si está afuera de conditions');
    }

  }
  //:::::::::::::::::::::::::::::|| Validacion de los inputs del board ||:::::::::::::::::::::::::::::::::::::::::::::::::

  inputsOfBoard.map((item) => { //validacion de los inputs de los boards

    let valueOfBoardInput = item[1].value;
    const isToValidate = item[2];
    const informationInput = [item[1]];

    if (isToValidate) {

      let encontrado = definitioValueInputs.filter((e) => e[0] === item[0]);

      if (encontrado.length === 0) {
        console.warn(`🤔🤔🤔🤔... 🤦‍♂️🤦‍♂️🤦‍♂️ el input definido en el objeto etwDefBoards con el id ${item[0]} no tiene validación disponible en etwDef>${ref}  `);
        return;
      }


      //logica que sera optimizada más adelante

      if (Array.isArray(encontrado[0][1])) {
        const res = encontrado[0][1].some(value => value == valueOfBoardInput);
        informationInput.push(res ? 'correct' : 'incorrect');

      } else {


        if (encontrado[0][1] == valueOfBoardInput) {
          informationInput.push('correct');
        }
        else {
          informationInput.push('incorrect');
        }
      }
    }
    else { // caso: si el input es por defecto

      informationInput.push('default');
    }

    informationInput.push('boardInput');
    stateInputs.push(informationInput);

  });


  //::::::::::::::::::::::::|| Lógica para que envie data solo si es distinto los inputs ||:::::::::::::::::::::::::::::::::::::::::

  stateInputs.forEach((item, index) => {

    const actualValue = item[0].value;
    const previousValues = previousValuesParam[ref] ? previousValuesParam[ref][index] : null;

    //verifica si algun valor cambia
    if (actualValue !== previousValues) {
      diferentPreviousElementOnInput = true; //bandera para enviar data
    }
  });


  //Se ejecuta si alguno de los valores de los inputs se cambia o si la bandera es true
  if (diferentPreviousElementOnInput === true) {

    //copiar en objeto global por valor de los valores del board en distintos niveles del array
    previousValuesParam[ref] = stateInputs.map((item, index) => {
      let subItem = item.map((subItem) => subItem);
      return subItem[0].value;
    });


    if (typeof window.Android !== 'undefined' && typeof window.Android.sendData === 'function') {
      console.log('-- Mobile version --');

      if(etwDefParam[ref].statusChange) window.Android.sendData(JSON.stringify(rCleanData(ref, stateInputs, numBoard, etwDefParam)));
    }
    else {
      console.log('-- Web version --');
      // rCleanData(ref, stateInputs, numBoard, etwDefParam)
      if(etwDefParam[ref].statusChange) sendData(rCleanData(ref, stateInputs, numBoard, etwDefParam));
    }

    //rCleanData(ref, stateInputs, numBoard, etwDefParam)
    //sendData(rCleanData(ref, stateInputs, numBoard, etwDefParam));
  }

  if(!etwDefParam[ref].statusChange) {
    gAlerts({
      def: etwDefParam[ref],
      id,
      type: 2,
      timer: 2,
      text: 'No hay cambios',
      size: 26,
    });
    return}
  addColorOfDefinition(stateInputs);
  etwDefParam[ref].statusValidate = true;
  etwDefParam[ref].statusChange = false;

  const incorrectResponse = stateInputs.every((e) => e[1] !== 'incorrect' && e != '');


  if (stateInputs.length > 0) {
    if (incorrectResponse) {
     
      gAlerts({
        def: etwDefParam[ref],
        id,
        text: 'Excelente',
        size: 26
      });
    } 
    else {
      
      const alert = clone.querySelector('.passInLibrary')
      
      if(alert) alert.remove()

      gAlerts({
        def: etwDefParam[ref],
        id,
        type: 2,
        timer: 2,
        text: 'Algunas respuestas no son correctas',
        size: 26,
      });
    }
  }
 
}

//==============================================| Función Para Agregar Color de Validación |===================================================

function addColorOfDefinition(inputValidated) {
  inputValidated.forEach((input) => {
    const stateAnswer = input[1];
    const element = input[0];

    if (stateAnswer !== 'default') {
      if (stateAnswer === 'correct') {

        if (element.classList.contains('failed')) element.classList.remove('failed');
        element.classList.add('pass');

      }
      else {

        if (element.classList.contains('pass')) element.classList.remove('pass');

        element.classList.add('failed');
        setTimeout(() => {
          element.classList.remove('failed');
        }, 2000);

      }
    }

  });
}
//===================================================| Función Para Resetear Inputs |=================================================

function etwDefReset(ref, board, etwInputsCreatedParam,etwDefParam,etwDefBoardsParam,clone) {
  let inputs = etwInputsCreatedParam[ref].inputsRef;
  etwDefParam[ref].statusChange = false

  const alert = clone.querySelector('.passInLibrary')
  if(alert) alert.remove()

  inputs.map((item) => {
    const isEditable = item[2];

    if (isEditable) {
      item[1].value = ' ';
      if (item[1].classList.contains('pass')) item[1].classList.remove('pass');
      if (etwDef[ref].textAlert) etwDef[ref].textAlert.remove();

      etwDef[ref].textAlert = null;
    }
  });

}

//===================================================| Función Para Crear Estructura de Data |==================================================================

function rCleanData(refParam, stateInputs, numBoard, etwDefParam) { //modificar para que sea standar o example

  //obtención de elementos del board
  let dataResult = {};
  /* let inputBoardValidated = stateInputs.filter((element) => element[1] !== 'default' && element[2] === 'boardInput');
  let inputWayName = stateInputs.filter((element) => element[1] !== 'default' && element[2] === 'wayName'); */
  let correctResponse = stateInputs.filter((element) => element[1] == 'correct' && element[0].value != '');
  let incorrectResponse = stateInputs.filter((element) => element[1] == 'incorrect' && element[0].value != '');
  let forAnswer = stateInputs.filter((element) => element[0].value === '');
  /* 
  dataResult.elementArtifact = { inputValue: {} };

  inputBoardValidated.forEach((item, index) => {
    dataResult.elementArtifact.inputValue[`input_${index + 1}`] = item[0].value || '';
  });
 */
  /*  if (inputWayName.length > 0) {
    dataResult.elementArtifact.inputWayNameValue = inputWayName[0][0].value;
  } */

  dataResult.artifact = numBoard;
  // dataResult.typeArtifact = 'Standard';
  etwDefParam[refParam].typeArtifact == "Evaluation" ? (dataResult.typeArtifact = 'Evaluation') : (dataResult.typeArtifact = 'Standard')

  dataResult.results = { correct: correctResponse.length, incorrect: incorrectResponse.length, forAnswer: forAnswer.length };
  dataResult.timeInteraction = etwDefParam[refParam].timeInteraction;
console.log("rCleanData",dataResult)
  return dataResult;
  //console.log(`dataResult ${refParam}:\n`, dataResult); //cambiar 'console.log' por 'return dataResult' en microservicio

}

//>FIN ...__/\___/\/ ___________________________________________________________________________________________________________________________|