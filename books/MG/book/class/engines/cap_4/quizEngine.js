

class Container {
  constructor() {
    this.preguntas = []
    this.isChanged = false
    this.interactionTime
    this.seconds = 0
    this.mainCard;
    this.config = null
    this.modal
    this.isAnArtifact = false
    this.setKeyBoard = this.setKeyBoard.bind(this);
    this.cotentContainer;
    this.keyBoardProfile = 'default'
    this.qualifySumary = {
      total: 0,
      correct: 0,
      incorrect: 0,
      forAnswer: 0
    }
    //  this.preguntas = [];
    //this.keyBoardProfile = "default"
    this.contentContainer = null
    this.validation = null
    this.contenedor = null
    this.lastNode = null
    this.result = {}
    this.updateValorChange = this.updateValor.bind(this);
  }
  defModal() {
    const container = document.querySelector('.container') || document.body;
    const modalContainer = document.querySelector('.modal-container');

    if (!modalContainer) {
      const modal = document.createElement('div');
      modal.classList.add('modal-container');
      modal.innerHTML = `
        <div class="modal">
          <div class="modalButton">
          
            <div class="closeButton" id="closeButton">✖</div>
          </div>


          <div class="modal_header">
            <p>¿Pantalla Pequeña? Agrega tu respuesta aquí:</p>
          </div>
          <div class="modal_question"></div>
        </div>
      `;
      container.appendChild(modal);

      const closeButton = modal.querySelector('#closeButton');
      const modalReference = modal;

      const closeModal = (event) => {
        if (event.target === closeButton || event.key === 'Escape') {
          modalReference.style.display = 'none';
        }
      };

      document.addEventListener('click', closeModal);
      document.addEventListener('keydown', closeModal);

      this.modal = modal;
    } else {
      console.log('Modal ya definido');
      this.modal = modalContainer;
    }
  }
  // Función para esconder el modal
  updateValor(value) {
    this.isChanged = value;
  }
  validationProcess() {
    if (this.isChanged === true) {

      this.qualifySumary.total = this.preguntas.length
      this.qualifySumary.correct = 0
      this.qualifySumary.incorrect = 0
      this.qualifySumary.forAnswer = 0
      this.preguntas.forEach(questionElement => {
        let evaluate = questionElement.questionObject.validate()
        if (evaluate === true) {
          this.qualifySumary.correct++

        }
        else if (evaluate === false) {
          this.qualifySumary.incorrect++
        }
        else if (evaluate == undefined) {
          this.qualifySumary.forAnswer++
        }

      });
      this.updateValor(false)

      if (typeof Android !== 'undefined' && typeof Android.sendData === 'function') {
        Android.sendData(JSON.stringify(this.beforeToSend()));

      } else {
        sendData(this.beforeToSend())

      }


    }
    else {
      console.warn('no ha habido algun cambio, Por lo tanto no se enviará otra interacción')
    }

  }
  resetProcess() {
    this.qualifySumary.total = this.preguntas.length
    this.qualifySumary.correct = 0
    this.qualifySumary.incorrect = 0
    this.qualifySumary.forAnswer = 0

    this.preguntas.forEach(questionElement => {

      questionElement.questionObject.reset()


    });

  }
  createContainer(artifactArguments) {
    let artifactNamePattern = /^artifact_\d+$/;
    this.isAnArtifact
    if (artifactNamePattern.test(artifactArguments.key)) {
      this.isAnArtifact = true;
    }

    this.config = artifactArguments.value?.config
    this.keyBoardProfile = artifactArguments.value.keyBoardProfile

    this.contenedor = artifactArguments.value.rendering !== undefined
      ? artifactArguments.value.rendering
      : 'container'

    this.artifactName = artifactArguments.key
    this.interval;
    document.addEventListener('click', function (e) {
      const card = e.target.closest('.QContainer');

      if (card?.id === this.artifactName && e.target.classList.contains('button__validation--validate')) {
        this.validationProcess()

      }
      else if (card?.id === this.artifactName && e.target.classList.contains('button__validation--reset')) {

        this.resetProcess()
      }

      e.stopPropagation();

    }.bind(this)); // Establece el valor de 'this' en el objeto específico


    let cardTemplate =
      `
<template id="qCardTemplate">
<div class="QContainer" id="artifactName">
<div class="QContainer_tittle"></div>
<div class="quiz">
    <!-- Content Goes Here -->
</div>
<div class="buttons">
    <div class="button button__validation button__validation--reset">↺</div>
    <div class="button button__validation button__validation--validate">✓</div>
</div>
<div class="QContainer_footer"></div>
</div>
</template>
`




    document.body.insertAdjacentHTML('beforeend', cardTemplate)
    let containerTemplate = document.querySelector('#qCardTemplate')
    this.mainCard = containerTemplate.content.firstElementChild.cloneNode(true);



    if (artifactArguments.value?.size) {
      this.mainCard.querySelector('div').classList.add(artifactArguments.value.size)
    }
    this.mainCard.setAttribute('id', this.artifactName)
    this.mainCard.dataset.artifact = this.artifactName

    if (artifactArguments.value.title != undefined) {
      this.mainCard.querySelector('.QContainer_tittle').textContent = artifactArguments.value.title
    }
    this.cotentContainer = this.mainCard.querySelector('.quiz')

    if (artifactArguments.value.quizType == 'table') {
      this.mainCard.querySelector('.quiz').classList.add('QContainer_table')
    }
    else if (artifactArguments.value.quizType == 'inline') {
      this.mainCard.querySelector('.quiz').classList.add('quiz__inlineDisplay')

    }
    document.querySelector('#' + `${this.contenedor}`)
      ? document.querySelector('#' + `${this.contenedor}`).appendChild(this.mainCard)
      : document.querySelector('.' + `${this.contenedor}`)
        ? document.querySelector('.' + `${this.contenedor}`).appendChild(this.mainCard)
        : document.body.appendChild(this.mainCard);


    this.mainCard.addEventListener('mouseenter', (e) => {
      clearInterval(this.interval);
      this.Gtime()
    })
    this.mainCard.addEventListener('mouseleave', (e) => {
      clearInterval(this.interval);
    })
    if (this.isAnArtifact == false) {
      let parent = this.mainCard
      let child = parent.querySelector('.buttons')
      let child2 = parent.querySelector('.QContainer_footer')
      parent.removeChild(child);
      parent.removeChild(child2);
    }
  }
  Gtime() {

    if (this.isAnArtifact) {
      this.interval = setInterval(() => {
        this.seconds++;
      }, 1000);
    }

    //return this.seconds
  }
  procedural(step, preguntas, componente = null) {

    switch (step) {
      case 1:

        if (preguntas.length < 1) {


          componente.questionObject.isValidable = true
          this.lastNode = componente
        }
        else {

          componente.questionObject.isValidable = false
        }

        break;
      case 2:

        if (preguntas.length > 0) {
          if (this.lastNode == null) {
            this.lastNode = componente

          }
          else {
            try {

              if (componente.questionObject != undefined && componente.questionObject != null) {


                this.lastNode.questionObject.metodoEnlazado = this.lastNode.questionObject.nextNodeTrigger.bind(componente.questionObject)

                this.lastNode = componente
              }
              else {
                this.lastNode = componente

              }
            } catch (error) {
              console.log(error)
            }



          }


        }

      default:
        break;
    }

  }
  createSection(QuestionsData) {
    let section = document.createElement('div')
    section.setAttribute('id', `${QuestionsData.artifactName}_section_${QuestionsData.key}`)
    section.classList.add('quiz_section', `quiz_section--${QuestionsData.layout}`)

    this.cotentContainer.appendChild(section)
    return section
  }
  filterNodoObject(componente, callProcedural, nodoData, eventoInput = null, col = null) {
    if (col != null) {
      col.appendChild(nodoData[0])
    }
    else { }
    let arrayAux = []
    const tiposDeseados = ['math-field', 'textfield', 'select', 'input[type="radio"]:checked', 'input'];

    tiposDeseados.find((tipo) => {
      const nodoHijo = this.contentContainer ? this.contentContainer.querySelector(tipo) : (col && col.querySelector(tipo));
      if (nodoHijo != null) {


        if (!nodoHijo.querySelector('option')) {

          if (eventoInput != null) {
            // eventoInput();
            nodoHijo.addEventListener('click', eventoInput);
          }

        }

        arrayAux.push(nodoHijo);
        arrayAux.push(nodoData[1]);
      }

    });
    if (!(componente.questionObject instanceof TextoGenerator)) {

      componente.questionObject.updateValorIsChange(this);

      if (callProcedural) {
        this.procedural(2, this.preguntas, componente);
      }
    }
    if (!(componente.questionObject instanceof TextoGenerator)) {
      this.preguntas.push(componente);

    }
    arrayAux = [];
  }
  addComponente(componente) {

    let callProcedural = false;
    if (this.config === 'procedural') {
      callProcedural = true;
    }
    componente.questionObject.callProcedural = callProcedural;
    if (callProcedural) {
      this.procedural(1, this.preguntas, componente);
    }

    let nodoData = componente.questionObject.crearNodo();
    if (componente.questionObject instanceof MathField) {
      componente.questionObject.setKeyBoard(this)


    }

    if (componente.innerContainer != undefined || componente.innerContainer != null) {
      componente.innerContainer.appendChild(nodoData[0]);

    } else {
      this.cotentContainer.appendChild(nodoData[0]);

    }

    this.filterNodoObject(componente, callProcedural, nodoData)

  }
  setValidationMessage(message) {
    this.footerText = message
  }
  getValidationMessage(message) {
    this.footer.textContent = this.footerText
    this.footer.classList.add('fade-in')

  }
  beforeToSend() {

    this.result = {}
    this.result.typeArtifact = 'Standard';
    this.result.artifact = Number(this.artifactName.split('_').at(-1));
    this.result.time = this.seconds
    let { correct, incorrect, forAnswer } = this.qualifySumary
    this.result.results = { correct, incorrect, forAnswer }
    // this.result.date = new Date()
    return this.result
  }
  getQuestionList() {
    return this.preguntas
  }
  setKeyBoard(keyboardProfile) {

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


}
class ContenedorCompuesto extends Container {
  constructor(rows = null, cols = null) {
    super()
    this.preguntas = [];

    this.rows = rows
    this.cols = cols
    this.table = document.createElement('table');
    // this.addTable(this.table)
    this.auxNodo;
    this.auxEvent;
    this.auxRow = 1
    this.auxCols = 1
    this.originalNodo

    this.defModal();
  }

  addCell(question, row, col) {

    this.addComponente(question)

  }

  showQuestionModal() {
    if (this.modal.style.display == 'block') {
      this.modal.style.display = 'none'
    }
    else {

      this.modal.style.display = 'block'
      this.modal.querySelector('.modal').style.display = 'flex'
    }

    const mathFieldElement = this.auxNodo.querySelector('math-field');
    if ((this.auxNodo.firstElementChild.nodeName == 'INPUT' && this.auxNodo.firstElementChild.type === 'text') && this.auxNodo.firstElementChild.type != undefined) {
      this.auxNodo.querySelector('input').focus()
      // Código para elementos input
    } else if (this.auxNodo.firstElementChild.nodeName == 'MATH-FIELD') {

      this.auxNodo.mathVirtualKeyboardPolicy = 'sandboxed';

      this.auxNodo.addEventListener('focusin', () => mathVirtualKeyboard.show());
      this.auxNodo.addEventListener('focusout', () => mathVirtualKeyboard.hide());

      mathFieldElement.addEventListener('focus', () => {
        mathVirtualKeyboard.layouts = this.setKeyBoard(this.keyBoardProfile)
        mathVirtualKeyboard.visible = true;
      });

    }




  }

  addHeaderComponent(componente, isHeader = null) {
    let callProcedural = this.config === 'procedural';
    componente.forEach(rowElement => {
      let row = document.createElement('tr');
      this.table.appendChild(row);

      rowElement.forEach(colElement => {
        let col = isHeader ? document.createElement('th') : document.createElement('td');
        row.appendChild(col);

        colElement.forEach(question => {
          question.questionObject.callProcedural = callProcedural;

          if (callProcedural) {

            if (!(question.questionObject instanceof TextoGenerator)) {
              this.procedural(1, this.preguntas, question);

            }
          }
          let nodo = question.questionObject.crearNodo('simple');
          if (question.questionObject instanceof MathField) {
            question.questionObject.setKeyBoard(this)
          }
          // col.appendChild(nodo[0]);

          let eventoInput = () => {
            if (screen.width <= 500) {
              const hasRadioInput = (nodo[0].querySelector('input[type="radio"]'))
              if (!hasRadioInput) {
                this.fillTheModal(nodo[0]);
                this.showQuestionModal();
              }

            }
          };


          if (question.questionObject.hasOwnProperty('reset')) {

          }

          this.filterNodoObject(question, callProcedural, nodo, eventoInput, col)

        });

      });

    })
  }

  fillTheModal(originalNodo) {
    let modalQuestion = this.modal.querySelector('.modal_question');
    let lastNode = modalQuestion.querySelector('*');
    if (lastNode && lastNode.parentNode === modalQuestion) {
      modalQuestion.removeChild(lastNode);
    }
    // Verificar si el nodo original contiene un input de tipo radio
    const hasRadioInput = originalNodo.querySelector('input[type="radio"]');

    // Asignar el nodo auxiliar solo si no hay un input de tipo radio
    if (!hasRadioInput) {
      this.auxNodo = originalNodo.cloneNode(true);
      this.auxNodo.addEventListener(('input'), (e) => {
        this.isChanged = true
      })
      this.originalNodo = originalNodo;


      const input = this.auxNodo.querySelector('input');
      const mathField = this.auxNodo.querySelector('math-field');

      if (input) {
        input.value = this.originalNodo.querySelector('input').value;
      } else if (mathField) {

        let mathfieldSet = originalNodo.querySelectorAll('math-field')

        let auxiliarmathfieldSet = this.auxNodo.querySelectorAll('math-field')
        if (auxiliarmathfieldSet.length > 1) {

          auxiliarmathfieldSet.forEach((element, key) => {
            element.value = mathfieldSet[key].value

            element.addEventListener(('input'), (e) => {
              mathfieldSet[key].value = element.value
            })
          })

        }

        // else {
        //   console.log("AAAAAAAAAAAAAAAAAAAAAAAA")

        //   // Aquí puedes agregar la lógica que deseas ejecutar si hay solo un elemento math-field
        // }


        mathField.value = this.originalNodo.querySelector('math-field').value;
      }

      modalQuestion.appendChild(this.auxNodo);

      modalQuestion.addEventListener('input', () => {
        try {
          this.originalNodo.querySelector('input').value = this.auxNodo.querySelector('input').value;
        } catch (e) {
          this.originalNodo.querySelector('math-field').value = this.auxNodo.querySelector('math-field').value;
        }
      });
    } else {
      console.log('El nodo original contiene un input de tipo radio, no se llenará el nodo auxiliar.');
    }
  }

  addTable() {

    for (var i = 0; i < this.rows; i++) {
      let row = document.createElement('tr');
      for (var j = 0; j < this.cols; j++) {
        let cell = document.createElement('td');
        row.appendChild(cell);
      }
      this.table.appendChild(row);
    }
    this.cotentContainer.appendChild(this.table)

  }


}
class ContenedorInline extends Container {
  constructor() {
    super()
    this.cotentContainer = document.createElement('div')
    this.cotentContainer.classList.add('quiz__inlineDisplay')
    this.elementOrder = 1
    this.setOfNodes = document.createElement('div')
  }


  addComponente(componente) {
    this.setOfNodes.classList.add('setOfNodes');

    let callProcedural = this.config === 'procedural';
    let arrayAux = [];

    if (callProcedural) {
      this.procedural(1, this.preguntas, componente);
    }

    componente.isValidable = this.preguntas.length < 1;

    componente.questionObject.callProcedural = callProcedural;

    let nodoData = componente.questionObject.crearNodo('simple');
    nodoData[0].classList.add('simpleNode');
    nodoData[0].setAttribute('data-question', `${this.preguntas.length}`);

    try {
      nodoData[0].querySelector('input').classList.add('inlineDisplay--input');
    } catch (error) { }

    nodoData[0].setAttribute('style', `order: ${this.elementOrder}; margin: 0.1rem; display: flex; align-items: center`);

    if (this.setOfNodes.childNodes.length < 2) {
      this.setOfNodes.appendChild(nodoData[0]);
    } else {
      this.cotentContainer.appendChild(this.setOfNodes);
      this.setOfNodes = document.createElement('div');
      this.setOfNodes.classList.add('setOfNodes');
      this.setOfNodes.appendChild(nodoData[0]);
    }

    this.cotentContainer.appendChild(this.setOfNodes);
    this.elementOrder += 1;


    this.filterNodoObject(componente, callProcedural, nodoData)
    if (componente.questionObject instanceof MathField) {
      componente.questionObject.setKeyBoard(this)


    }

  }

  // validationProcess() {
  //   this.qualifySumary.total = this.preguntas.length
  //   this.qualifySumary.correct = 0
  //   this.qualifySumary.incorrect = 0
  //   this.qualifySumary.forAnswer = 0
  //   let auxValidationValue
  //   this.preguntas.forEach(questionElement => {


  //     if (auxValidationValue == true) {
  //       questionElement.isValidable = true

  //       auxValidationValue = false

  //     }

  //     let vali = questionElement.questionObject.validate()

  //     if (vali) {
  //       this.qualifySumary.correct += 1
  //       auxValidationValue = true


  //     }
  //     else if (vali === false) {
  //       this.qualifySumary.incorrect += 1
  //       auxValidationValue = true

  //     }
  //     else if (vali == undefined) {
  //       this.qualifySumary.forAnswer += 1
  //     }



  //   });
  //   this.beforeToSend()
  // }


  validationHandler() {
    console.log(this.preguntas)

  }


}
class Pregunta {
  constructor(texto, validacion) {
    this.texto = texto;
    this.validacion = validacion;
    this.validationState = undefined
    this.nextNodeTrigger = this.changeValidableState
    this.isValidable = true
    this.metodoEnlazado;
    this.lastValue;
    this.funcionDeActualizacionEnContenedor
    this.modal;

  }



  updateValorIsChange(objeto) {
    if (objeto.isChanged == false) {
      this.funcionDeActualizacionEnContenedor = objeto.updateValor.bind(objeto, true);

    }
  }
  set setNodeTrigger(newState) {

    this.nextNodeTrigger = newState
  }

  changeValidableState() {
    console.log('aaa', this.nodo)

    this.isValidable = true


    if (this.isValidable) {

      try {
        this.nodo.disabled = false;
        this.nodo.removeAttribute('read-only');
        this.nodo.removeAttribute('only-read');
        this.nodo.classList.remove('quiz__default__input__math-field--disabled');
        const radioInputs = this.nodo.querySelectorAll('input[type="radio"]');
        radioInputs.forEach((element) => {
          element.disabled = false;
        });
      } catch (error) {
        try {
          this.nodo.forEach(element => {
            element.removeAttribute('read-only');
            element.removeAttribute('only-read');
            element.removeAttribute('disabled');

            element.classList.remove('quiz__default__input__math-field--disabled');


          });
        } catch (error) {

        }
        console.error('Error:', error);
      }
    }

  }
  basicValidation() {
    if (this.nodo.value === '') {
      this.validationState = undefined
    }
    else if (this.nodo.value == this.validacion) {
      this.validationState = true

    }
    else if (this.nodo.value != this.validacion)
      this.validationState = false

    else {
      console.error('Revisa el estado de la propiedad "validationState" (No está contemplado)')
    }



    this.qualify(this.validationState)
    return this.validationState

  }

  qualify(validationState) {
    if (validationState == true) {
      this.nodo.classList.remove('input__math-field--incorect')
      this.nodo.classList.add('input__math-field--success')

    }
    else if (validationState == false) {
      this.nodo.classList.remove('input__math-field--success')
      this.nodo.classList.add('input__math-field--incorect')

    }
    else {
      this.nodo.classList.remove('input__math-field--incorect')
      this.nodo.classList.remove('input__math-field--success')

    }

  }
  reset() {
    let tempNodo
    if (this.nodo.querySelector('input[type ="radio"]:checked')) {
      tempNodo = this.nodo.querySelector('input[type ="radio"]:checked')
      tempNodo.checked = false
      tempNodo.classList.remove('input__radio--success')
      tempNodo.classList.remove('input__radio--incorect')
    }
    else if (this.nodo?.selectedIndex) {
      this.nodo.selectedIndex = 0
      this.nodo.classList.remove('input__math-field--incorect')
      this.nodo.classList.remove('input__math-field--success')
    }
    else {
      this.nodo.value = ''
      if (this.placeholder != undefined || this.placeholder != null) {
        this.nodo.value = this.placeholder

      }
      this.nodo.classList.remove('input__math-field--incorect')
      this.nodo.classList.remove('input__math-field--success')
    }

  }

  addNodeEvents() {
    this.nodo.addEventListener('blur', () => {
      if (this.isValidable == true) {
        if (this.hasOwnProperty('metodoEnlazado')) {
          this.metodoEnlazado()
        }

      }
    })

    this.nodo.addEventListener('input', () => {
      this.funcionDeActualizacionEnContenedor()
    })
    if (this.isValidable === true) {


      this.nodo.addEventListener('blur', () => {

        if (this.hasOwnProperty('metodoEnlazado')) {
          this.metodoEnlazado()
        }

      })
    }

  }
  // ContadorPreguntas
}
class PreguntaSimple extends Pregunta {

  constructor(element) {

    super(element.texto, element.validacion);
    this.arrayAux1 = []
    this.texto = element.data.label
    this.validacion = element.data.condition
    this.metodoValidacion = element.data.questionType
    this.myType = element.type


  }
  reset() {
    this.nodo.value = ''
    this.nodo.classList.remove('input__math-field--success')
    this.nodo.classList.remove('input__math-field--incorect')

  }
  crearNodo(myType = null) {
    const label = document.createElement('label');
    label.innerHTML = this.texto
    this.nodo = document.createElement('input');

    this.nodo.classList.add('quiz__default__input')
    this.nodo.setAttribute('type', 'text'); // O tipo de input según la necesidad

    const contenedor = document.createElement('div');

    if (myType == 'simple') {
      this.nodo.classList.add('input--simple')
    }
    else {
      contenedor.appendChild(label);
      contenedor.classList.add('QuestionElement')
      // Retornar el contenedor que contiene la pregunta

    }


    if (this.isValidable == false) {
      this.nodo.setAttribute('disabled', 'true')
      this.nodo.setAttribute('read-only', 'true')
      this.nodo.classList.add('quiz__default__input__math-field--disabled')

    }


    this.addNodeEvents()

    contenedor.appendChild(this.nodo);

    this.arrayAux1.push(contenedor)
    this.arrayAux1.push(this.validacion)





    return this.arrayAux1;
  }

  validate() {
    if (this.lastValue != this.nodo.value) {

      this.funcionDeActualizacionEnContenedor()

      this.lastValue = this.nodo.value
      if (this.metodoValidacion == 'basic') {

        return this.basicValidation()


      }
      else if (this.metodoValidacion == 1) {
        console.log('this is an alternative')
      }
    }
    else {
      console.log('No ha cambiado nada de la respuesta')
      return this.basicValidation()

    }





  }

}
class TextoGenerator {
  constructor(contenido) {
    this.arrayAux1 = []
    this.texto = contenido.data
    this.formato = contenido.formato


  }
  crearNodo(type = null) {
    this.nodo

    // Crear el nodo de la pregunta en el DOM

    this.nodo = document.createElement('p');
    this.nodo.classList.add('inline_text')
    this.nodo.innerHTML = this.texto
    if (this?.formato) {
      this.nodo.setAttribute('style', `font-size:${this.formato.fontSize}; font-style:${this.formato.fontStyle}`)
    }


    // Retornar el contenedor que contiene la pregunta


    this.arrayAux1.push(this.nodo)
    this.arrayAux1.push(this.validacion)


    return this.arrayAux1;
  }
}
class MathField extends Pregunta {
  constructor(quiestionData) {
    super();
    this.arrayAux1 = []
    this.popUp = quiestionData.data.popUp
    this.texto = quiestionData.data.label
    this.validacion = quiestionData.data.condition
    this.metodoValidacion = quiestionData.data.questionType
    this.keyBoardProfile = quiestionData.keyBoardProfile
    this.placeholder = quiestionData.placeholder
    this.noise = quiestionData.data.noise || 0
    this.myType = null

  }

  setKeyBoard(objeto) {
    this.setKeyBoard = objeto.setKeyBoard
  }
  crearNodo(myType = null) {

    const label = document.createElement('label');
    label.innerHTML = this.texto
    this.nodo = document.createElement('math-field');
    this.nodo.classList.add('quiz__default__input', 'quiz__default__input__math-field')
    this.nodo.value = this.placeholder
    if (this.placeholder != undefined) {
      this.nodo.classList.add('placeholder__input')
    }
    this.lastValue = this.placeholder
    const contenedor = document.createElement('div');
    if (myType == 'simple') {
      this.nodo.classList.add('input--simple')
      contenedor.classList.add('QuestionElement')
    }
    else {
      contenedor.appendChild(label);
      contenedor.classList.add('QuestionElement')
      // Retornar el contenedor que contiene la pregunta
    }
    contenedor.appendChild(this.nodo);


    this.arrayAux1.push(contenedor)
    this.arrayAux1.push(this.validacion)
    this.addNodeEvents()
    return this.arrayAux1;
  }
  addNodeEvents() {
    if (this.isValidable == false) {
      this.nodo.setAttribute('read-only', 'true')
      this.nodo.setAttribute('disabled', 'true')

      this.nodo.classList.add('quiz__default__input__math-field--disabled')
      this.nodo.mathVirtualKeyboardPolicy = 'sandboxed';
    }


    if (this.callProcedural == true) {
      this.nodo.addEventListener('blur', () => {
        this.addSpecificNodeEvent()

        if (this.isValidable == true) {
          if (this.hasOwnProperty('metodoEnlazado')) {
            this.metodoEnlazado()
          }

        }

      })

      this.nodo.addEventListener('click', () => {
        this.addSpecificNodeEvent()
        // this.metodoEnlazado()


      })
    }
    this.addSpecificNodeEvent()

    this.nodo.addEventListener('input', () => {
      console.log('Este nodo está siendo editado')
      this.funcionDeActualizacionEnContenedor()

    })
  }
  addSpecificNodeEvent() {
    this.nodo.mathVirtualKeyboardPolicy = 'sandboxed';
    if (this.isValidable == false) {
      this.nodo.setAttribute('read-only', 'true')
      this.nodo.setAttribute('disabled', 'true')

      this.nodo.classList.add('quiz__default__input__math-field--disabled')

    } else {
      this.nodo.addEventListener('focus', (e) => {
        mathVirtualKeyboard.layouts = this.setKeyBoard(this.keyBoardProfile)
        mathVirtualKeyboard.visible = true;
      });


      this.nodo.addEventListener('focusout', () =>
        mathVirtualKeyboard.hide()
      );


    }
  }

  calculate(valor) {

    var ce = new ComputeEngine.ComputeEngine({
      numericMode: 'machine'
    });
    var result = ce.parse(valor).N().valueOf();
    return result;
  }

  gInterPoint(value, compare) {
    var noise = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.1;
    var minDecimal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
    if (typeof value === 'number' && typeof compare === 'number') {
      if (parseFloat(value.toFixed(minDecimal)) <= parseFloat(compare.toFixed(minDecimal)) + noise && parseFloat(value.toFixed(minDecimal)) >= parseFloat(compare.toFixed(minDecimal)) - noise) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  validate() {
    if ((Object.prototype.toString.call(this.validacion) === '[object Object]') && (this.nodo.value != this.lastValue)) {
      this.localIsChanged = false
      return this.placeholderValidation()
    }

    else if (Object.prototype.toString.call(this.validacion) != '[object Object]') {

      if (this.metodoValidacion == 'basic') {
        return this.basicValidation()
      }
      else if (this.metodoValidacion == 'expression') {


        return this.expressionValidation()
      }
      else if (this.metodoValidacion == 'operate') {
        return this.operatorValidation(this.noise)
      }
    }
  }

  placeholderValidation() {

    for (let key in this.validacion) {
      const receivedValue = this.nodo.getPromptValue(key);
      let noSpaceText = receivedValue.replace(/\s/g, '');
      let noSlashText = noSpaceText.replace(/\\/g, '')

      if (Array.isArray(this.validacion[key])) {
        let multiAnswer = this.validacion[key]

        this.validationState = multiAnswer.some((element) => {
          return element == noSlashText
        })

        if (this.validationState == false) {
          this.qualify(this.validationState)

          return this.validationState
        }
      }
      else {

        if (noSlashText == this.validacion[key]) {
          if (this.validationState == false) {

          }
          this.validationState = true
        } else {
          this.validationState = false
          this.qualify(this.validationState)

          return this.validationState

        }
      }







    }

    this.qualify(this.validationState)
    return this.validationState


  }
  basicValidation() {
    console.log('Validación básica')

    let noSpaceText = this.nodo.value.replace(/\s/g, '');
    let noSlashText = noSpaceText.replace(/\\/g, '')
    if (noSlashText === '') {
      this.validationState = undefined
    }
    else if (noSlashText == this.validacion) {
      this.validationState = true

    }
    else if (noSlashText != this.validacion)
      this.validationState = false

    else {
      console.error('Revisa el estado de la propiedad "validationState" (No está contemplado)')
    }



    this.qualify(this.validationState)
    return this.validationState

  }

  expressionValidation() {
    /**
     * Aquí se valida si la expresión ingresada esté presente en una o mas alternativas de estas
     * Son expresiones Estáticas, cadenas de string que no pueden resolverse y no tienen variaciones por décimas
     * **/
    let noSpaceText = this.nodo.value.replace(/\s/g, '');
    let noSlashText = noSpaceText.replace(/\\/g, '')
    let MiscEntry = noSlashText.replace(/left\.|right\./g, '')
    let processedEntry = MiscEntry.replace(/(?:left|right)/g, '');
    let processedCondition = ''
    if (this.nodo.value == '') {

      this.validationState = undefined

    }
    else {
      if (Array.isArray(this.validacion)) {
        processedCondition = this.validacion.map((element) => {
          return element.replace(/(?:left|right|left\.|right\.|\s|\\)/g, '')
        })

        this.validationState = processedCondition.some((element) => {
          return element == processedEntry
        }
        )

      }
      else {
        processedCondition = this.validacion.replace(/(?:left|right|left\.|right\.|\s|\\)/g, '')

        this.validationState = (processedEntry == processedCondition)

      }
      this.qualify(this.validationState)
      return this.validationState
    }

  }
  operatorValidation(noise = 0) {
    console.log('OperatorValidation')
    /**
     * Aquí se validan Valores numéricos que pueden o no soportar pequeñas o grandes variaciones así como varias respuestas válidas
     */
    let latexExpression = this.nodo.value

    if (latexExpression == '') {
      return undefined
    }
    let calculated = this.calculate(latexExpression)




    if (noise < 1) {
      console.log('No se tolera inexactitud');
      if (Array.isArray(this.validacion)) {
        // Comprobar si algún elemento coincide con el valor calculado
        const isCalculatedValid = this.validacion.some((element) => {
          return this.gInterPoint(calculated, element, noise);
        });
        // Realizar acciones en función del resultado
        if (isCalculatedValid) {
          this.validationState = true
          this.qualify(this.validationState)

          return this.validationState    // Realizar alguna acción si el cálculo no es válido
        }
        this.validationState = false      // Realizar alguna acción si el cálculo no es válido
        this.qualify(this.validationState)
        return this.validationState    // Realizar alguna acción si el cálculo no es válido
      }
      if (this.gInterPoint(calculated, this.validacion, noise)) {

        this.validationState = true      // Realizar alguna acción si el cálculo no es válido
        this.qualify(this.validationState)

        return this.validationState
      }

      this.validationState = false      // Realizar alguna acción si el cálculo no es válido
      this.qualify(this.validationState)

      return this.validationState

    }





  }

  operatorByOrder() {
    /**
     * Validación de valores u expresiones separadas por algún identificador, vease ("," , ";") y se proceden a resolver y 
     * verificar si coinciden con los valores esperados y/o aproximados
     */





  }

}

class MathfieldSet extends Pregunta {
  constructor(quiestionData) {

    super()

    this.expression = quiestionData.placeholder
    this.data = quiestionData.data
    this.nodeSet = document.createElement('div')
    this.validacion = quiestionData.data.condition
    this.mathfielCollection = []
    this.texto = quiestionData.data.label

    this.nodo = []
    this.keyBoardProfile = quiestionData.keyBoardProfile

  }

  crearNodo(params) {

    const regex = /^value_/;
    Object.keys(this.validacion).forEach((key) => {
      if (!regex.test(key)) {
        console.warn(`La clave "${key}" no cumple con la estructura "value_n".`);
      }
    });
    if (this.texto) {
      this.nodeSet.classList.add('questionSet__block')
      let Container = document.createElement('div')
      const label = document.createElement('label');
      label.innerHTML = this.texto
      Container.appendChild(label)
      this.nodeSet.appendChild(Container);
    }
    else {
      this.nodeSet.classList.add('questionSet')
    }
    // Retornar el contenedor que contiene la pregunta
    let separatedElements = this.separateElements(this.expression)
    this.createInputs(separatedElements)
    let dataSet = []
    dataSet.push(this.nodeSet)

    this.addNodeEvents()

    return dataSet
  }

  setKeyBoard(keyboardProfile) {

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

  addNodeEvents() {

    this.mathfielCollection = this.nodeSet.querySelectorAll('math-field:not([read-only])')
    if (this.isValidable == false) {
      this.mathfielCollection.forEach(element => {
        element.setAttribute('read-only', 'true')
        element.setAttribute('disabled', 'true')
        element.classList.add('quiz__default__input__math-field--disabled')
        element.mathVirtualKeyboardPolicy = 'sandboxed';

        element.addEventListener('input', () => {
          console.log('Este nodo está siendo editado')
          this.funcionDeActualizacionEnContenedor()

        })
        element.addEventListener('focus', (e) => {
          mathVirtualKeyboard.layouts = this.setKeyBoard(this.keyBoardProfile)
          mathVirtualKeyboard.visible = true;
        });


        element.addEventListener('focusout', () =>
          mathVirtualKeyboard.hide()
        );


      })
    }

    else {


      this.mathfielCollection.forEach(element => {

        element.addEventListener('input', () => {
          console.log('Este nodo está siendo editado')
          this.funcionDeActualizacionEnContenedor()

        })
        element.addEventListener('focus', (e) => {
          mathVirtualKeyboard.layouts = this.setKeyBoard(this.keyBoardProfile)
          mathVirtualKeyboard.visible = true;
        });


        element.addEventListener('focusout', () =>
          mathVirtualKeyboard.hide()
        );
      })

    }
    this.mathfielCollection.forEach(element => {

      element.addEventListener('blur', () => {
        if (this.isValidable == true) {
          if (this.hasOwnProperty('metodoEnlazado')) {
            this.metodoEnlazado()
          }

        }
      })


    })




    if (this.isValidable == true) {
      if (this.hasOwnProperty('metodoEnlazado')) {
        this.metodoEnlazado()
      }

    }






    // this.mathfielCollection.forEach(element => {
    //   element.addEventListener("input", () => {
    //     this.funcionDeActualizacionEnContenedor()
    //   })
    // });


  }
  separateElements(element) {


    const regex = /\\placeholder\[(.*?)\]\{}/g;
    const processedElements = element.split(regex).filter(Boolean)






    // Dividir el string y mantener los elementos que coinciden con la expresión regular

    return processedElements
  }

  createInputs(list) {
    let inputContainer = document.createElement('div')
    inputContainer.classList.add('questionSet')
    list.forEach(element => {
      let nodo = document.createElement('math-field')
      nodo.classList.add('quiz__default__input', 'quiz__default__input__math-field')
      let valueRegex = /^value_\d+$/
      if (valueRegex.test(element)) {
        nodo.dataset.question = element;
        this.nodo.push(nodo)
      } else {
        nodo.setAttribute('read-only', true)
        nodo.value = element
        // nodo.setAttribute("style", "outline:0px; display:flex; align-items:center; justify-content:; width:min-content")
      }

      inputContainer.appendChild(nodo)


    });
    this.nodeSet.appendChild(inputContainer)

  }

  processInput(input) {
    if (typeof input === 'string') {
      let noSpaceText = input.replace(/\s/g, '');
      let noSlashText = noSpaceText.replace(/\\/g, '');
      let MiscEntry = noSlashText.replace(/left\.|right\./g, '')
      let processedEntry = MiscEntry.replace(/(?:left|right)/g, '');


      return processedEntry;
    } else if (Array.isArray(input)) {
      return input.map(item => this.processInput(item));
    }
  }


  validate() {

    this.validationState = null
    let finalValidation = []
    let processedCondition
    let processedEntry


    for (let key in this.validacion) {
      this.mathfielCollection.forEach(element => {

        if (element.dataset.question == key) {


          processedCondition = this.processInput(this.validacion[key])
          processedEntry = this.processInput(element.value)

          console.log('condition :', processedCondition, 'entry: ', processedEntry)

          if (processedEntry == '' || processedEntry == undefined || processedEntry == null) {
            finalValidation.push(null)

          } else {




            if (Array.isArray(processedCondition)) {

              if (processedCondition.includes(processedEntry)) {
                finalValidation.push(true)
              }
              else {
                finalValidation.push(false)
              }

            }
            else {
              if (processedCondition == processedEntry) {
                finalValidation.push(true)
              }
              else {
                finalValidation.push(false)
              }
            }


          }



          // if (processedEntry == processedCondition) {
          //   finalValidation.push(true)

          // } 

          // else if (processedEntry != processedCondition && processedEntry != "") {

          //   if ((Array.isArray(processedCondition) && processedCondition.includes(parseFloat(processedEntry)) || processedCondition == processedEntry)) {
          //     finalValidation.push(true)
          //   } else {
          //     finalValidation.push(false)
          //   }
          // } else {
          //   finalValidation.push(null)
          // }




        }
      });
    }


    if (finalValidation.includes(null) || finalValidation.includes(undefined)) {
      this.validationState = null;
    } else if (finalValidation.includes(false)) {
      this.validationState = false;
    } else {
      this.validationState = finalValidation.every(item => item === true);
    }
    this.qualify(finalValidation)
    return this.validationState

  }
  reset() {
    this.mathfielCollection.forEach((element, index) => {
      element.classList.remove('input__math-field--incorect')
      element.classList.remove('input__math-field--success')
      element.value = ''
    })

  }
  qualify(validationState) {

    this.mathfielCollection.forEach((element, index) => {
      if (validationState[index] == true) {
        element.classList.add('input__math-field--success')
        element.classList.remove('input__math-field--incorect')
      }
      else if (validationState[index] == false) {
        element.classList.add('input__math-field--incorect')
        element.classList.remove('input__math-field--success')
      }
      else {
        element.classList.remove('input__math-field--incorect')
        element.classList.remove('input__math-field--success')
      }
    })




  }
}

class Select extends Pregunta {
  constructor(quiestionData) {

    super()
    this.optionList = quiestionData.data.optionList
    this.condition = quiestionData.data.condition
    this.texto = quiestionData.data.label
  }

  validate() {
    // this.updateValor()


    if ((this.lastValue == this.nodo.selectedIndex) && (this.nodo.selectedIndex == 0)) {
      console.warn('mismo valor')

    } else {

      if ((this.metodoValidacion == 'basic' || this.metodoValidacion == undefined) && (this.nodo.selectedIndex != 0)) {

        this.funcionDeActualizacionEnContenedor()
        this.qualify(this.validationState)


        this.lastValue = this.nodo.selectedIndex
        return this.basicValidation()
      }

    }

  }
  basicValidation() {
    if (this.nodo.selectedIndex == this.condition) {
      this.validationState = true
      this.qualify(this.validationState)

      return true
    }
    else {
      this.validationState = false
      this.qualify(this.validationState)

      return false
    }
  }

  crearNodo(myType = null) {
    this.nodo
    this.arrayAux1 = [];
    this.profile = 'simple'
    const label = document.createElement('label');
    label.innerHTML = this.texto;

    this.nodo = document.createElement('select');


    this.optionList.forEach((element) => {
      const option = document.createElement('option');
      option.value = element;
      option.text = element;
      this.nodo.appendChild(option);
    })

    this.addNodeEvents()

    if (this.isValidable == false) {
      this.nodo.disabled = true
      this.nodo.classList.add('quiz__default__input__math-field--disabled')
    }


    this.nodo.classList.add('quiz__default__input')
    this.nodo.classList.add('quiz__default__select')

    const contenedor = document.createElement('div');


    if (myType == 'complete') {
      contenedor.appendChild(label);
      contenedor.classList.add('QuestionElement')
    }

    if (myType == 'simple') {
      this.nodo.classList.add('input--simple')
    }
    else {
      contenedor.appendChild(label);
      contenedor.classList.add('QuestionElement')


    }
    contenedor.appendChild(this.nodo);
    this.arrayAux1.push(contenedor)
    this.arrayAux1.push(this.validacion)


    this.lastValue = this.nodo.selectedIndex
    return this.arrayAux1;
  }

  addNodeEvents() {
    this.nodo.addEventListener('input', () => {
      this.funcionDeActualizacionEnContenedor()
    })
    this.nodo.addEventListener('input', () => {
      try {
        this.metodoEnlazado()

      } catch (error) {

      }

    })

    this.nodo.addEventListener('focusin', () => {
      // mathVirtualKeyboard.layouts = (keyboardsLayouts[this.keyBoardProfile] || this.keyBoardProfile);
    });
  }
}
class Radio extends Pregunta {
  constructor(quiestionData) {
    super()
    this.optionList = quiestionData.data.optionList
    this.condition = quiestionData.data.condition
    this.texto = quiestionData.data.label
    this.qustionID = quiestionData.questionId

  }
  validate() {
    if (this.nodo.querySelector('input[type ="radio"]:checked') != undefined) {
      if (this.lastValue == this.nodo.querySelector('input[type ="radio"]:checked')) {
        console.warn('mismo valor');
        this.lastValue = this.nodo.querySelector('input[type ="radio"]:checked');
        return this.basicValidation();
      }

      this.funcionDeActualizacionEnContenedor();
      this.qualify(this.validationState);

      this.lastValue = this.nodo.querySelector('input[type ="radio"]:checked');
      return this.basicValidation();
    }
    else {

      return this.basicValidation();
    }

  }
  basicValidation() {
    let nodoData = this.nodo.querySelector('input[type ="radio"]:checked')
    if (nodoData != null) {

      if (nodoData.dataset['index'] == this.condition) {
        this.validationState = true
        this.qualify(this.validationState)

        return this.validationState
      }
      else {
        this.validationState = false
        this.qualify(this.validationState)

        return this.validationState
      }

    }
    this.validationState = undefined
    this.qualify(this.validationState)

  }
  crearNodo(myType = null) {
    this.nodo
    this.arrayAux1 = [];
    this.profile = 'simple'
    const label = document.createElement('label');
    label.innerHTML = this.texto;
    this.nodo = document.createElement('div');
    this.nodo.classList.add('radioset__container')
    this.optionList.forEach((element, index) => {
      let radioSet = document.createElement('div')
      radioSet.classList.add('radioSet')
      let label = document.createElement('label');
      const option = document.createElement('input');
      label.innerHTML = element
      option.value = element
      option.dataset.index = index
      label.setAttribute('for', `${this.qustionID}`);
      option.setAttribute('name', `${this.qustionID}`);
      option.classList.add('input__radio')

      option.type = 'radio';


      radioSet.appendChild(label)
      radioSet.appendChild(option)


      this.nodo.appendChild(radioSet);
    })


    if (this.isValidable == false) {
      this.nodo.querySelectorAll('input[type ="radio"]').forEach((element) => {
        element.disabled = true
      })
      this.nodo.disabled = true
    }


    const contenedor = document.createElement('div');


    if (myType == 'complete') {
      contenedor.appendChild(label);
      contenedor.classList.add('QuestionElement')
    }

    if (myType == 'simple') {
      this.nodo.classList.add('input--simple')
    }
    else {
      contenedor.appendChild(label);
      contenedor.classList.add('QuestionElement')


    }


    contenedor.appendChild(this.nodo);
    this.arrayAux1.push(contenedor)
    this.arrayAux1.push(this.validacion)


    this.addNodeEvents()


    this.lastValue = this.nodo.selectedIndex
    return this.arrayAux1;
  }
  addNodeEvents() {
    this.nodo.addEventListener('input', () => {
      try {
        if (this.hasOwnProperty('metodoEnlazado')) {
          this.metodoEnlazado()
        }

      } catch (error) {

      }

    })

    this.nodo.addEventListener('input', () => {
      this.funcionDeActualizacionEnContenedor()
    })
  }


  qualify(validationState) {
    let radioNodeToValidate = this.nodo.querySelector('input[type ="radio"]:checked')
    let restOfNodes = this.nodo.querySelectorAll('input[type ="radio"]')


    if (validationState === true) {
      restOfNodes.forEach((element) => {
        element.classList.remove('input__radio--incorect')
      })
      radioNodeToValidate.classList.add('input__radio--success')

    }
    else if (validationState === false) {

      restOfNodes.forEach((element) => {
        element.classList.remove('input__radio--success')
      })

      radioNodeToValidate.classList.add('input__radio--incorect')

    }
    else {

      restOfNodes.forEach((element) => {
        element.classList.remove('input__radio--success')
        element.classList.remove('input__radio--incorect')
      })



    }

  }
}
class QuizGenerator {
  constructor(definition) {
    this.definition = definition
    this.autoIncrement = 0
  }

  generateObject() { //Objeto contenedor de todas las preguntas

    let artifact
    let artifactArguments = {
      'key': undefined, //artifactName
      'artifactObject': undefined, //Artifact Object
      'value': undefined, //values to ArtifactObject
      //"value.keyboardProfile": value.keyboardProfile
    }

    for (let [key, value] of Object.entries(this.definition)) {
      artifactArguments.key = key //nombre del artefacto
      artifactArguments.value = value

      switch (value.quizType) {

        case 'standard':


          artifactArguments.artifactObject = new Container()

          artifactArguments.artifact = artifact
          this.createAndAddQuestion(artifactArguments)


          break;
        case 'table':
          artifactArguments.artifactObject = new ContenedorCompuesto()



          artifactArguments.artifact = artifact
          this.createAndAddQuestion(artifactArguments)
          artifactArguments.artifactObject.addTable()

          break;
        case 'inline':

          artifactArguments.artifactObject = new ContenedorInline()
          //       artifactArguments.artifact = artifact

          this.createAndAddQuestion(artifactArguments)

          break;
        // ...
        default:

          console.log('default standard')
        // Código a ejecutar si no hay ningún caso que coincida con el valor de expression
      }
    }

  }

  createAndAddQuestion(artifact) {
    // console.log(2)
    let QuestionsData = {
    }
    let sectionData = {
    }

    QuestionsData.keyBoardProfile = artifact.value.keyBoardProfile
    artifact.artifactObject.createContainer(artifact)

    if (artifact.value.quiz?.formsQuestions) {

      artifact.value.quiz.formsQuestions.forEach((element, idxNumber) => {
        if (artifact.value.quizType == 'standard' && (element.layout != undefined || element.layout != '')) {

          sectionData.layout = element.layout
          sectionData.idxNumber = idxNumber
          sectionData.artifactName = artifact.key
          sectionData.section = artifact.artifactObject.createSection(sectionData)


        }



        QuestionsData.element = element
        QuestionsData.artifactName = artifact.key
        QuestionsData.artifactObject = artifact.artifactObject
        QuestionsData.section = sectionData.section
        artifact.QuestionsData = QuestionsData

        this.generateQuestion(QuestionsData)


      });



    }
    else {
      QuestionsData.artifactObject = artifact.artifactObject
      QuestionsData.artifactName = artifact.artifactObject.key
      QuestionsData.element = artifact.value.quiz.cells
      QuestionsData.header = artifact.value.quiz.header

      this.generateQuestion(QuestionsData)

    }




  }
  generateQuestion(artifactArguments) {

    //console.log(3)

    if (artifactArguments.element?.nodes) {

      this.generateQuestionsFromNodes(artifactArguments)

    }
    else {

      if (artifactArguments?.header) {


        this.generateQuestionsFromArray(artifactArguments, true)

      }
      else {

        this.generateQuestionsFromArray(artifactArguments, false)

      }
    }
  }

  questionFilter(QuestionElement) {
    let question
    switch (QuestionElement.type) {


      case 'simple':

        question = new PreguntaSimple(QuestionElement)

        return question

        break

      case 'select':

        question = new Select(QuestionElement)

        return question

        break

      case 'mathfield':

        question = new MathField(QuestionElement);

        return question

        break

      case 'text':

        question = new TextoGenerator(QuestionElement);
        return question


        break


      case 'radio':
        question = new Radio(QuestionElement);
        return question


        break
      case 'mathfieldSet':
        question = new MathfieldSet(QuestionElement);
        return question







    }


  }
  generateQuestionsFromNodes(artifactArguments) {


    let dataToBuild = {

    }
    artifactArguments.element.nodes.forEach((questionNode) => {

      questionNode.artifactName = artifactArguments.artifactName
      questionNode.questionId = `${artifactArguments.artifactObject.artifactName}_question_${this.autoIncrement}`
      questionNode.keyBoardProfile = artifactArguments.keyBoardProfile
      if (questionNode.placeholder) {
        questionNode.placeholder = questionNode.placeholder || null

      } else {
        questionNode.placeholder = questionNode.data?.placeholder || null

      }
      dataToBuild.questionObject = this.questionFilter(questionNode)
      dataToBuild.artifactObject = artifactArguments.artifactObject
      dataToBuild.layout = artifactArguments.layout
      dataToBuild.artifactName = artifactArguments.artifactName
      dataToBuild.innerContainer = artifactArguments.section
      dataToBuild.artifactObject.addComponente(dataToBuild)

      dataToBuild = {

      }
      this.autoIncrement += 1

    })
  }
  generateQuestionsFromArray(artifactArguments, isHeader = null) {

    let dataToBuild = {

    }

    dataToBuild.keyBoardProfile = arguments.keyBoardProfile
    let arrayOfNodes = []

    if (isHeader === true) {
      artifactArguments.header.forEach((setOfQuestionRows) => {
        let arrayOfRow = []


        setOfQuestionRows.forEach((questionNodeSet) => {
          let arrayOfCols = []

          if (Array.isArray(questionNodeSet.nodes)) {

            questionNodeSet.nodes.forEach((questionNode) => {

              dataToBuild.questionObject = this.questionFilter(questionNode)
              arrayOfCols.push(dataToBuild)
              dataToBuild = {

              }
            })
          }
          else {

            questionNodeSet.nodes.artifactName = artifactArguments.artifactName

            dataToBuild.questionObject = this.questionFilter(questionNodeSet.nodes)

            arrayOfCols.push(dataToBuild)
            dataToBuild = {

            }
          }


          arrayOfRow.push(arrayOfCols)



        });

        arrayOfNodes.push(arrayOfRow)

      })

      artifactArguments.artifactObject.addHeaderComponent(arrayOfNodes, true)
      arrayOfNodes = []
    }


    artifactArguments.element.forEach((setOfQuestionRows) => {
      let arrayOfRow = []


      setOfQuestionRows.forEach((questionNodeSet) => {
        let arrayOfCols = []

        if (Array.isArray(questionNodeSet.nodes)) {

          questionNodeSet.nodes.forEach((questionNode) => {

            questionNode.keyBoardProfile = artifactArguments.keyBoardProfile

            if (questionNode.placeholder) {
              questionNode.placeholder = questionNode.placeholder || null

            } else {
              questionNode.placeholder = questionNode.data?.placeholder || null

            }
            dataToBuild.questionObject = this.questionFilter(questionNode)
            arrayOfCols.push(dataToBuild)
            dataToBuild = {

            }
          })
        }
        else {

          questionNodeSet.nodes.artifactName = artifactArguments.artifactName
          questionNodeSet.nodes.keyBoardProfile = artifactArguments.keyBoardProfile
          dataToBuild.questionObject = this.questionFilter(questionNodeSet.nodes)

          arrayOfCols.push(dataToBuild)
          dataToBuild = {

          }
        }


        arrayOfRow.push(arrayOfCols)



      });
      arrayOfNodes.push(arrayOfRow)
    })
    //  artifactArguments.artifactObject.addHeaderComponent(arrayOfNodes,false)

    artifactArguments.artifactObject.addHeaderComponent(arrayOfNodes, false)



  }


  addToContainerProcess(quiestionData) {



  }
}
