/**
 * Clase que representa el artefacto
 */

class EngineAlpabeth extends EngineMaker {
  constructor(definition = { condition: {} }) {
    super(definition)

    //atributos de implementaciones
    this.validatorObject = new validator();
    this.numberElement = null
    //atributos de partes del dom

    this.diagram = null; //elementos del diagrama
    this.parOdenateContainer = null; //container del par ordenado o elementos
    this.btnCreatePar = null; // boton crear punto del motor
    this.selectorToBtns = '.alphabetEngine__Otherbtn'
    this.prevValidation = {
    }
    this.topRounded = null
    this.bottomRounded = null
    this.key = null
    this.ordenatePar = null
    this.parX = null
    this.parY = null
    this.resolution = null
    this.buttonPoint = null
    this.condition = null
    this.buttonCreateCurve = null/////
    this.curva = []
    this.alert = null
    this.validateButton = null/////
    this.buttonReset = null/////
    this.coordPoints = []
    this.axisText = []
    this.numberQuestions = 0
    this.responsenumber = 0
    this.isChange = false;
    this.asymptote = [];
  }

  initArtifact() {
    super.initArtifact()
    if (!this.node) {
      console.log('recuerde agregar el template con setTemplate()'); return
    }
    this.eventBoard(false);
 
    this.setAttributesWhithDomNodes()
    this.resolution = []
    this.condition = this.definition.conditions?.alphabetDiagram

    if (this.definition.conditions?.alphabetDiagram) {
      this.diagramController()
    }


    this.alert = this.alert ?? new NotificationAlert(this.node)

  } 
    
  eventBoard(mode, p) {
     
    this.textCoord = this.boardObject.create('text', [0, this.boardObject.attr.boundingbox[1] - 0.8, ''], {
      anchorY: 'middle',
      anchorX: 'middle',
      digits: 6,
      fixed: true,
      visible: mode,
      fillColor: '#076382',
      cssstyle: 'background-color:#daf5ff;padding:5px;border-radius:.8rem;border:2px solid #217e9d;font-weight:400;fill:#fff',
      fontSize: 18,
      fontColor:'#0aa1dd',
      highlightstrokecolor:'#fff',
      intl: {
        enabled: false,
        options: {
          style: 'unit',
          unit: 'celsius'
        }
      }
    });
  } 
    
  showAndHiddeText(mode, p) {

    const x = Number.isInteger(p.X()) ? p.X() : p.X().toFixed(6)
    const y = Number.isInteger(p.Y()) ? p.Y() : p.Y().toFixed(6)

    this.textCoord.setAttribute({ visible: mode, });
    this.textCoord.setText(`(${x + ',' + y})`);
  }




  setAttributesWhithDomNodes() {

    this.containerQuestions = this.node.querySelector('.alphabetEngine__diagram');

    this.topRounded = this.containerQuestions.querySelector('.roundedPositionTop')
    this.bottomRounded = this.containerQuestions.querySelector('.roundedPositionBottom')
    this.key = this.containerQuestions.querySelector('.alphabetEngine__square')

    this.ordenatePar = this.node.querySelector('.alphabetEngine__ordenatePars')
    this.parX = this.ordenatePar.querySelector('.alphabetEngine__ordenatePar-mathfield[data-par=\'x\']')
    this.parY = this.ordenatePar.querySelector('.alphabetEngine__ordenatePar-mathfield[data-par=\'y\']')
    this.buttonPoint = this.node.querySelector('.createPointBtn')
    this.buttonCreateCurve = this.node.querySelector('.curve');////////////////////
    this.validateButton = this.node.querySelector('.buttonPrimary')
    this.buttonReset = this.node.querySelector('.reset');////////////////////


  }


  diagramDefault() {
    const { defaultValue } = this.condition;
    //ponen disabled todos los inputs
    this.opacityInputs(this.key, this.bottomRounded, this.parY, this.parX, this.buttonPoint, this.topRounded, this.buttonCreateCurve);
    //reemplaza sus valores por los que se puso en la definicion
    this.topRounded.firstElementChild.value = defaultValue.topRounded ?? 0;
    this.key.firstElementChild.value = defaultValue.key ?? 'f()';
    this.bottomRounded.firstElementChild.value = defaultValue.bottomRounded ?? 'f(0)';
    gExpressionCurve({
      board: this.boardObject,
      expression: defaultValue?.curve?.mathEcuation,
      curveStyle: defaultValue?.curve?.curveStyle
    })
    this.parX.value = defaultValue.ordenatePar.x ?? 'x';
    this.parY.value = defaultValue.ordenatePar.y ?? 'f(0)';

    return null;
  }

  diagramController() {
    if (!this.condition.defaultValue) {
      this.topRounded.style.cursor = 'pointer'
      this.opacityInputs(this.bottomRounded, this.parY, this.parX, this.buttonPoint, this.key, this.buttonCreateCurve)
      this.diagramEvents()
      return
    }

    this.diagramDefault()
    return;
  } 

  diagramEvents() {
    const absReplace = /\\operatorname{abs}\\left\(([^()]*(?:(?:(?:\\left\([^()]*\\right\))|[^()])*)*)\\right\)/g;
    const floorReplace = /\\operatorname{floor}\\left\(([^()]*(?:(?:(?:\\left\([^()]*\\right\))|[^()])*)*)\\right\)/g;
    const result = this.condition.expression.replace(absReplace, '|$1|').replace(floorReplace, ' [$1]');
    this.key.firstElementChild.value = result
    this.touchTop()
    this.touchBottom()
    this.coordsHover()
    this.coordsClick()
    this.pointButton()
    this.createCurve()/////////////////////
    this.reset()
  }

  touchTop() {
    this.topRounded.firstElementChild.addEventListener('click', (event) => {

      let xCoords = this.condition.xCoords.flat()
      let countResolution = this.resolution.flat().length
      let topValue = this.topRounded.firstElementChild.value;
      //validacion
      if (xCoords.length == 0 || countResolution >= xCoords.length || topValue != '') {
        return
      }

      let xCoord = typeof xCoords[countResolution] == 'object' ? xCoords[countResolution].xCoord : xCoords[countResolution]
      this.parX.typePoint = xCoords[countResolution].typePoint ?? false
      this.parX.axisText = xCoords[countResolution].axisText ?? ''
      this.parX.pointText = xCoords[countResolution].pointText ?? ''
      this.parX.pointStyle = xCoords[countResolution].pointStyle ?? ''


      //asignando valor a toprounded
      this.topRounded.firstElementChild.value = xCoord
      //quitando estilos disabled a bottom rounded
      this.opacityInputs(this.key)
    })

  }

  touchBottom() {
    this.key.firstElementChild.addEventListener('click', () => {
      let { xCoords, expression } = this.condition
      let countResolution = this.resolution.flat().length
      let topValue = this.topRounded.firstElementChild.value
      let bottomValue = this.bottomRounded.firstElementChild.value
      if (topValue == '' && countResolution < xCoords.flat().length) {
        this.alert.createWarningAlert('Observa que paso te falta')
        return
      }

      if (countResolution >= xCoords.flat().length || bottomValue != '') {
        return
      }
      //Combina el latex con el numero
      let ecuation = this.expressionCombination(expression, topValue)

      //hace la operacion
      let yCoord = this.latexCalc(ecuation)

      //divide el numero por si es decimal

      let decimalLength = String(yCoord).split('.')
      //si el decimal es mayor a 5 le pone un tamano de 6, si no da NaN se coloca ∄
      //y si no es ninguno de los anteriores se deja como esta
      yCoord = decimalLength[1]?.length > 5 ? yCoord.toFixed(6) : isNaN(yCoord) || yCoord == 'Infinity' ? '∄' : yCoord

      //se le coloca el valor a bottomRounded
      this.bottomRounded.firstElementChild.value = yCoord

      //se quita el estilo disabled a los inputs parx y pary
      this.opacityInputs(this.parY, this.parX,)
    })
    return null;
  }
  coordsClick() {

    this.parX.addEventListener('click', (e) => {

      let bottomValue = this.bottomRounded.firstElementChild.value
      //evalua si bottomRounded esta vacio y si parY y Top value tienen el mismo valor
      if (bottomValue == '' && this.resolution.flat().length < this.condition.xCoords.flat().length) {
        this.alert.createWarningAlert('Observa que paso anterior indica')
        return
      }
      if (this.parX.value != 'x' || bottomValue == '') {
        return
      }
      //da valor a parX
      this.parX.value = this.topRounded.firstElementChild.value
      //llama funcion que valida para cambiar estilo disabled a el boton buttonPoint
      disabledButton()
    })

    this.parY.addEventListener('click', (e) => {

      let bottomValue = this.bottomRounded.firstElementChild.value
      if (bottomValue == '' && this.resolution.flat().length < this.condition.xCoords.flat().length) {
        this.alert.createWarningAlert('Observa que paso anterior indica')
        return
      }
      if (this.parY.value != 'y' || bottomValue == '') {
        return
      }
      //divide el numero por si es decimal
      let decimalLength = String(bottomValue).split('.')
      //si el decimal es mayor a 2 le pone un tamano de 2, si no da NaN se coloca ∄
      //y si no es ninguno de los anteriores se deja como esta
      this.parY.value = decimalLength[1]?.length > 2 ? parseFloat(bottomValue).toFixed(2) : isNaN(bottomValue) ? '∄' : bottomValue
      //llama funcion que valida para cambiar estilo disabled a el boton buttonPoint
      disabledButton()
    })

    const disabledButton = () => {

      //evalua si bottomRounded y parY comparten valor, asi como con topRounded y parX
      if (this.parX.value == 'x' || this.parY.value == 'y') {

        return
      }
      //cambia de color a buttonPoint
      this.opacityInputs(this.buttonPoint)
      //            this.alert.createWarningAlert('Puedes crear los puntos')

    }

    return null;
  }


  pointButton() {
    this.buttonPoint.addEventListener('click', () => {
      if ((this.parX.value == 'x' || this.parY.value == 'y') && this.resolution.flat().length < this.condition.xCoords.flat().length) {
        this.alert.createWarningAlert('te faltan pasos antes de los Puntos')
        return
      }
      if (this.parX.value == 'x' || this.parY.value == 'y') {
        return
      }
      this.pushCurve()

      this.pointCreate(this.latexCalc(this.parX.value), this.parY.value)
      this.isChange = true

      //cambiando estilo de disabled a algunos inputs
      this.opacityInputs(this.key, this.parY, this.parX, this.buttonPoint);
      //cambiando los valores a vacios de los inputs
      this.topRounded.firstElementChild.value = '';
      this.bottomRounded.firstElementChild.value = '';
      this.parX.value = 'x';
      this.parY.value = 'y';

      //si ya no hay mas opciones, pone los inputs que faltan en disabled
      let { xCoords } = this.condition;
      if (this.resolution.flat().length == xCoords.flat().length) {
        this.alert.createWarningAlert('El siguiente paso es crear la curva')
        this.opacityInputs(this.topRounded, this.buttonCreateCurve)
      }
    })

    return null;
  }
  pushCurve() {
    let countResolution = this.resolution.length
    let resolutionArray = this.resolution[countResolution - 1]
    let coordsArray = this.condition.xCoords[countResolution - 1]
    //si resolution esta vacio o el array en el que esta parado ya no se le van agregar mas, crea otro array vacio
    if (countResolution == 0 || resolutionArray.length == coordsArray.length) {
      this.resolution.push([])
      countResolution = this.resolution.length
    }
    //agrega la coordenada

    this.resolution[countResolution - 1].push([this.latexCalc(this.parX.value), this.parY.value])
  }
  coordsHover() {

    this.ordenatePar.addEventListener('mouseover', (e) => {
      let dataSet = e.target.dataset.par
      if (this.bottomRounded.firstElementChild.value == '') {
        return
      }
      //agraga un clase con un color de background a topROunded y bottomRounded cuando el raton
      //pase por parX o ParY
      if (dataSet == 'x') {
        this.topRounded.firstElementChild.classList.add('ordenateParMouseOver')
      }
      if (dataSet == 'y') {
        this.bottomRounded.firstElementChild.classList.add('ordenateParMouseOver')
      }
    })

    this.ordenatePar.addEventListener('mouseout', (e) => {
      let dataSet = e.target.dataset.par
      if (this.bottomRounded.firstElementChild.value == '') {
        return
      }
      //quita las clases de un color en el background, cuando el raton sale
      if (dataSet == 'x') {
        this.topRounded.firstElementChild.classList.remove('ordenateParMouseOver')
      }
      if (dataSet == 'y') {
        this.bottomRounded.firstElementChild.classList.remove('ordenateParMouseOver')
      }
    })

    return null;
  }

  opacityInputs(...inputs) {
    inputs.forEach((item) => {
      //agarra las clases y evalua si opacityInputs está
      let classContains = item.classList.contains('opacityInputs')

      //sino la encuentra, la agrega y quita la clases que pone el cursor en pointer
      item.classList.add(!classContains ? 'opacityInputs' : 'pointerInputs');
      item.classList.remove(!classContains ? 'pointerInputs' : 'opacityInputs');
    })

    return null;

  }

  disabledInputs(...inputs) {
    inputs.forEach((item) => {

      //sino la encuentra, la agrega y quita la clases que pone el cursor en pointer
      item.classList.remove('pointerInputs');
      item.classList.add('opacityInputs');
    })
    return null;
  }

  expressionCombination(expression, number) {
    //combina una expresion de parentesis vacios con un numero(en teoria podria ser otra expresion)
    let result = expression
      .replace('\\left(x\\right)', `\\left(${number}\\right)`)
      .replace('\\left(\\right)', `\\left(${number}\\right)`)
    return result
  }
  latexCalc(latex) {
    //toma una operacion en latex y la resuelve
    const computer = new ComputeEngine.ComputeEngine({ numericMode: 'machine' })
    return computer.parse(latex).N()._value
  }
  //Crea los puntos utilizando la funcuion  gAllPointsDefault del modulo general
  pointCreate(coordX, coordY) {
    /*  this.parX.typePoint  //punto abierto false *
            this.parX.axisText  //texto en el eje x *
            this.parX.pointText  //texto en el punto 
            */

    if (coordX == '∄' || coordY == '∄') {
      this.alert.createWarningAlert('El punto no Existe')
            
      if (coordX !== '∄' && coordY == '∄') {
        this.asymptote.push(gAsymptotes({
          board: this.boardObject,
          asymptotes: [
            { 
              x: coordX !== '∄' ? coordX : coordY, 
              style: { 
                visible: true ,
                color : '#FF2525',
                dash: 2,
                strokeWidth:3
              } 
            }
          ] 
        }))
      }
      return
    }
    const pointCreated = gAllPointsDefault({
      def: this.definition,
      board: this.boardObject,
      points: [{
        x: coordX,
        y: coordY,
        fillcolor: this.parX.typePoint ? 'white' : '#f1604d', //puntos abiertos
        visible: true,
        name: this.parX.pointText,
        label: {
          offset: [19, 0],
          fixed: true,
          autoPosition: false,
          anchorX: 'middle',
          anchorY: 'middle',
        }

      }],
    })


    pointCreated[0].on('down', () => { this.showAndHiddeText(true, pointCreated[0]), console.clear(); });
    pointCreated[0].on('up', () => {
      this.showAndHiddeText(false, pointCreated[0]);
    });
    this.coordPoints.push(pointCreated);
       

    //para los valores en x de los puntos axisText
    if (this.parX.axisText) {

      const newInput = createInputs({
        board: this.boardObject,
        inputs: [{
          valid: true,
          x: coordX, y: -0.4,
          value: this.parX.axisText,
          style: { mathClass: 'colorInputAlphabet' },

        }]
      })
      this.axisText.push(newInput[0])
    }

  }

  // Crear la curva
  createCurve() {

    this.buttonCreateCurve.addEventListener('click', () => {

      //  comprueba si los dos arrays apalanados tienen la misma cantidad de elementos
      if (this.resolution.flat().length !== this.condition.xCoords.flat().length) {
        this.alert.createWarningAlert('te falta crear puntos')

        return
      }


      if (this.curva && this.curva.length > 0) return

      this.resolution.forEach((item) => {

        // Se verifica si el primer y segundo elemento de cada subarray no son ∄
        const curveX = item.filter((element) => {
          if (element[0] != '∄' && element[1] != '∄') return element

        })

        //Se crea la curva segun la expresion que se le pasa en la definicion mathEcuation


        this.curva.push(gExpressionCurve({ board: this.boardObject, expression: this.definition.conditions.alphabetDiagram.mathEcuation }))

      });
      this.alert.createWarningAlert('Valida el ejercicio')
      this.isChange = true;

      // para opacar el boton de createCurve hasta que esten creados todos los puntos definidos
      this.opacityInputs(this.buttonCreateCurve)
    }
    )
  }
  validationAlert() {
    let { xCoords } = this.condition;

    if (this.resolution.flat().length == xCoords.flat().length && this.curva.length) {
      this.alert.createSuccessAlert('Excelente')
    }
    if (this.resolution.flat().length == xCoords.flat().length && !this.curva.length) {
      this.alert.createWarningAlert('Crea la curva para validar')
    }
    if (this.resolution.flat().length != xCoords.flat().length) {
      this.alert.createWarningAlert('Te faltan puntos por agregar')
    }

    // this.numberQuestions = xCoords.flat().length + 1//nro de puntos + accion de crear la curva

  }

  removeCurves() {
    if (this.curva && this.curva.length > 0) {
      this.boardObject.removeObject(this.curva)
    }
    this.curva = []
  }

  reset() {
    this.buttonReset.addEventListener('click', () => {
      this.removeCurves()

      this.coordPoints.forEach((elements) => {
        this.boardObject.removeObject(elements)
      })

      this.axisText.forEach((elements) => {
        this.boardObject.removeObject(elements.newInput)
      })

      this.asymptote.forEach((elements) => {
        this.boardObject.removeObject(elements)
      }) 

      this.coordPoints = []
      this.axisText = []
      this.resolution = []
      this.alert.removeAll()

      this.topRounded.firstElementChild.value = '';
      this.bottomRounded.firstElementChild.value = '';
      this.parX.value = 'x';
      this.parY.value = 'y';
      this.disabledInputs(this.key, this.topRounded, this.bottomRounded, this.parX, this.parY, this.buttonPoint, this.buttonCreateCurve)
      this.opacityInputs(this.topRounded,)

      this.correct = 0;
      this.incorrect = 0;
      this.auxResults = []
      this.definition.timeInteraction = 0
      this.isChange = false;
      this.asymptote = []

    }
    )
  }


  /**
       * metodo que se utiliza si es un ejemplo
       * @returns 
       */
  isExample() {

    const btns = this.node.querySelector('.btn-all')
    if (!btns) console.warn('el contenedo btn-all no existe');
    btns.style.display = 'none'
    return true
  }
  extractElements() {

  }

  /**
       * metodo conectado al boton de validar
       */
  validation() {
    super.validation()
    this.validationAlert()   //Llamado de mensaje de alerta al dar click en validar
    if (this.isChange) {
      const { xCoords } = this.condition
      this.numberQuestions = xCoords.flat().length + (this.definition.buttonsActive.curve ? 1 : 0)
      this.responsenumber = this.resolution.flat().length + (this.curva.length ? 1 : 0);
      const data = this.cleanData()
      if (typeof window.Android !== 'undefined' && typeof window.Android.sendData === 'function') {
        console.log('-- Mobile version --');
        window.Android.sendData(JSON.stringify(data));
      } else {
        console.log('-- web version --');
        //console.log(data);
        sendData(data);

      }
      this.isChange = false
    }
  }

  cleanData() {
    const data = {
      // typeArtifact: 'Standard',
      typeArtifact:this.definition.typeArtifact == "Evaluation" ?  'Evaluation' :  'Standard',
      artifact: this.numberElement,
      seconds: this.definition.timeInteraction,
      elementArtifact: {
        points: this.coordPoints.map(p => {
          return [
            parseFloat(p[0].coords.usrCoords[2].toFixed(3)),
            parseFloat(p[0].coords.usrCoords[1].toFixed(3)),
          ]
        })
      },
    };

    let correct = this.responsenumber
    let incorrect = 0;
    let forAnswer = this.numberQuestions - (this.responsenumber) //numero de preguntas - numero de respuestas (numero de punto creados)

    data.results = {
      correct,
      incorrect,
      forAnswer,
    };

    console.log("engineAlphabert",data)
    return data;

  }

  ;
}


/**
 * clase cuyos métodos deben validar las preguntas
 */
class validator {
  constructor(conditions = {}) {

  }
}

class GraphicElements {

  constructor(node = null) {
    this.node = node
  }

}
class GenerateArtifactsEngineAlphabet {
  static implement = null;

  constructor(allDefinitionArtifacts = {}, allDefinitionBoard = {}, selectorTmp = '#tmp-alphabet') {
    if (GenerateArtifactsEngineAlphabet.implement) {
      return GenerateArtifactsEngineAlphabet.implement
    }
    this.allDefinitionArtifacts = allDefinitionArtifacts;
    this.allDefinitionBoard = allDefinitionBoard;
    this.tmp = null;
    this.selectorTmp = selectorTmp;
    this.fragment = new DocumentFragment();
    this.#main(this.allDefinitionArtifacts, this.allDefinitionBoard);
    this.countArtifact = 0;
    this.countExample = 0;
    GenerateArtifactsEngineAlphabet.implement = this;
  }

  #main() {
    if (GenerateArtifactsEngineAlphabet.mainCalled) return

    this.tmp = this.#getDOMTemplate('tmp-alphabet');
    let count = 1
    let exampleCount = 1

    for (let key in this.allDefinitionArtifacts) {
      const clone = this.tmp.content.firstElementChild.cloneNode(true)
      const container = document.querySelector(`.alphabetEngine[data-artifact='${key}']`)

      if (!container) {
        console.warn('<!> este artefacto no es llamado en la vista');
                !key.includes('example') ? count++ : exampleCount++;
                continue
      }

      this.#createArtifact(key, clone, container, count, exampleCount);

            !key.includes('example') ? count++ : exampleCount++;

    }


    GenerateArtifactsEngineAlphabet.mainCalled = true;
    return null;
  }

  /**
   * Obtener Template y si no esta agregar el correspondiente a la clase
   * @param {*} selector 
   * @param {*} newTmp 
   * @param {*} i 
   * @returns 
   */
  #getDOMTemplate(selector = null, newTmp = false, i = 0) {

    if (!selector) return null;
    const tmp = document.querySelector(`#${selector}`, `.${selector}`);

    if (!tmp) {
      const query = this.#addTmpToDOM(selector);
      return this.#getDOMTemplate(query, '', i++);
    }
    return tmp;
  }

  #addTmpToDOM(idTmp = '') {

    const tmp = `<template id="${idTmp}">
            <div class="alphabetEngineContainer">
              <div
                class="alphabetEngine__notification transitionNotification"
                data-show="false"
              >
                <!-- Selección de franjas inadecuada -->
              </div>
      
              <div
                class="alphabetEngine__Board"
                id="boad1"
                data-board="board_"
                data-artifact="artifact_"
              ></div>
              <div class="alphabetEngine__questions">
                <div class="alphabetEngine__diagram">
                  <div class="alphabetEngine__rounded roundedPositionTop">
                    <math-field
                      readonly
                      class="alphabetEngine__rounded-math-field"
                    ></math-field>
                  </div>
                  <div class="alphabetEngine__square">
                    <math-field
                      readonly
                      class="alphabetEngine__square-math-field"
                    ></math-field>
                  </div>
                  <div class="arrowDown arrowDown--cap4"></div>
                  <div class="alphabetEngine__rounded roundedPositionBottom">
                    <math-field
                      class="alphabetEngine__rounded-math-field"
                      readonly
                    ></math-field>
                  </div>
                </div>
      
                <div class="alphabetEngine__btnsPars">
                  <div class="alphabetEngine__ordenatePars">
                    <div class="alphabetEngine__ordenatePar-input">
                      <span class="textOrdenatePar">(</span
                      ><math-field
                        readonly
                        class="alphabetEngine__ordenatePar-mathfield"
                        data-par="x"
                        >x</math-field
                      ><spa class="textOrdenatePar">,</spa>
                      <math-field
                        readonly
                        class="alphabetEngine__ordenatePar-mathfield"
                        data-par="y"
                        >y</math-field
                      ><span class="textOrdenatePar">)</span>
                    </div>
                  </div>
                  <div class="alphabetEngine__createPars">
                    <button class="createPointBtn">Crear punto</button>
                  </div>
                </div>
              </div>
              <div class="alphabetEngine__btnContainer btn-all">
                <div class="alphabetEngine__Otherbtn"></div>
                <div>
                  <button
                    class="help-btn button-marg buttonSecundary buttonKey d-none"
                  ></button>
                  <button
                    class="reset button-marg buttonSecundary buttonKey"
                  ></button>
                  <button class="check button-marg buttonPrimary buttonKey"></button>
                </div>
              </div>
            </div>
          </template>`

    document.body.insertAdjacentHTML('afterend', tmp)
    return `${idTmp}`
  }


  #createArtifact(key, clone, container, count, exampleCount) {
    const boardSelect = container.dataset.board || 'board_0';
    const id = (key.includes('example')) || (!key.includes('artifact')) ? 'example' + exampleCount : 'alphabetBoard-' + count;

    const artifact = new EngineAlpabeth(this.allDefinitionArtifacts[key])

    artifact.setTemplate(clone)
    if (key.includes('example')) artifact.isExample()

    const containerBoard = clone.querySelector('.alphabetEngine__Board')
    containerBoard.id = `${id}-board`

    clone.id = key
    container.appendChild(clone)
    artifact.idToBoard = `${id}-board`

    artifact.setBoard(this.allDefinitionBoard[boardSelect])
    artifact.initArtifact()
    artifact.numberElement = parseInt(key.replace(new RegExp('[a-zA-Z_]+'), ''))

    return true
  }

}
