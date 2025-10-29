class SumConstantArtifact extends EngineMaker {

  constructor(definition) {
    super(definition)
    //colocar en true si se va a desarrollar
    this.developProcess = false

    this.id = null
    this.points = []
    this.curves = [] //array de curvas creadas
    this.curveCount = null
    this.validateZero = false,
    this.alphabet = {
      /* Curvas menu */
      'cos': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'cos(x)',

      },
      'tan': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'tan(x)',
        options: {}, interval: []
      },
      'ln': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'ln(x)',
        options: {}, interval: []
      },
      'sin': {
        point: { coord: [0, 0], visible: true },
        keyCurve: 'sin(x)',
        options: {}, interval: []
      }
      ,
      'aSin': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'asin(x)',
        options: {}, interval: []
      },
      'aTan': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'atan(x)',
        options: {}, interval: []
      },
      'aCos': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'acos(x)',
        options: {}, interval: []
      },
      'abs': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'abs(x)',

      },

      'entera': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'trunc(x)',
        options: {}, interval: []
      }
      ,
      'identidad': { /* identidad */
        point: { coord: [0, 1], visible: true },
        keyCurve: 'x',
        options: {}, interval: []
      }
      ,
      'identidadNegativa': { /* Identidad negativa */
        point: { coord: [0, 1], visible: true },
        keyCurve: '-x',
        options: {}, interval: []
      }
      ,
      'inversaNumerica': { /* inversa numerica */
        point: { coord: [0, 1], visible: true },
        keyCurve: 'x^(-1)',
        options: {}, interval: []
      },
      'alCuadrado': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'x^(2)',
        options: {}, interval: []
      },
      'exp': {  /* exponencial */
        point: { coord: [0, 1], visible: true },
        keyCurve: 'exp(x)',
        options: {}, interval: []
      }
      ,
      'sqrt': {
        point: { coord: [0, 1], visible: true },
        keyCurve: 'sqrt(x)',
        options: {}, interval: []
      },
      'constante': {
        point: { coord: [0, 1], visible: true },
        keyCurve: '1',
        options: {}, interval: []
      },

    }
    this.status = true
    this.curveSelected = []
    this.countValidate = { correct: 0, incorrect: 0 }
    this.numberQuestions = 0
    /* this.instructionText = {} */
    this.pointsValidate = []

  }

  initArtifact() {
    super.initArtifact()
    this.curveCount = this.definition?.curveCount ?? 2
    this.alphabet = this.boardDefinition?.alphabet ?? this.alphabet
    this.curveButton = this.definition?.showCurveButton ?? true ? this.node.querySelector('.btnCurve') : null;

    if (this.node) {
      const nodeNotification = this.node.querySelector('.engineSumConstant__notification')
      this.alert = new NotificationAlert(nodeNotification)
    }
    //para hacer visible o no el boton de curvas
    if (this.definition?.buttonZero == false) {
      this.node.querySelector('.asyntote').style.display = 'none'
    }
    if (this.definition?.buttonAsyn == false) {
      this.node.querySelector('.xSlice').style.display = 'none'
    }
    if (this.curveButton) {
      this.curveButton.style.display = 'block';
    } else {
      this.curveButton = this.node.querySelector('.btnCurve');
      this.curveButton.style.display = 'none';
    }
    this.definition.other = []; // declarado de nuevo porque en EngineMaker aparece como others, pero para efectos de gAddPoint es other, en singular.
    this.definition.visibleAsyntote = this.definition.visibleAsyntote ?? false; // declarado para validar la visibilidad de las asymptotas y puntos
    this.definition.visiblexSlice = false // declarado para validar la visibilidad de las asymptotas y puntos
    this.definition.conditions.defaultCurve = this.definition.conditions.defaultCurve ?? ''; //curva por defecto
    this.definition.conditions.multiplyCurves = this.definition.conditions.multiplyCurves ?? '';

    if (this.definition.conditions.defaultCurve) this.definition.conditions?.multiplyCurves.push('constantDefault')

    if (this.elementOfBoards?.asymptotes) {
      this.generateDefaultAsymptotes();
      this.validateZero = true
    } else {
      this.validateZero = false
    }
    if (this.definition?.conditions?.asymptotes) {
      this.generateDefinitionAsymptotes();
    }

    this.curvesMenu()
    this.buttonsClick();
    this.statement()
  }



  functionsCurves(params) {
    if (!params.keyCurve) {
      throw new Error('No se ha difinido la curva');
    }

    let pointDef = { coord: [0, 0], visible: true, altAssymtote: [20], ...params.point }
    let interval = params.interval ?? []
    //se crea el punto ancla
    let point = gAllPointsDefault({
      def: this.definition,
      board: this.boardObject,
      points: [{
        x: pointDef.coord[0] ?? 0,
        y: pointDef.coord[1] ?? 0,
        fillcolor: '#f1604d', //puntos abiertos
        visible: pointDef.visible,
        name: 'P',
        label: {
          visible: false
        }
      }],
    })
    point[0].on('drag', () => {
      this.status = true
    })
    //su une la ecuacion matematica con el punto ancla
    let mathEcuation = params.keyCurve + '+(P.Y()-' + point[0].Y() + ')'
    //se crea la asintota donde se creo el punto
    let asymptote = gAsymptotes({ board: this.boardObject, asymptotes: [{ x: point[0].X(), style: { visible: false } }] })
    //se fija el punto a la asintota
    point[0].makeGlider(asymptote[0][1]);
    //se guardan el punto y la asintota en una variable
    //se crea la curva
    return {
      name: params.keyCurve,
      // curve: this.boardObject.create('functiongraph', [mathEcuation, ...interval], options),
      curve: gExpressionCurve({ board: this.boardObject, expression: mathEcuation, interval, curveStyle: params.options }),
      point: point[0],
      asymptote
    }
  }


  statement() {

    let definitionStatement = this.node.querySelector('.instructionText')


    if (this.definition.instructionText) {

      const expression = document.createElement('math-field')

      expression.classList.add('colorInputAlphabet')

      expression.value = this.definition.instructionText.text
      expression.setAttribute('readonly', 'readonly')


      definitionStatement.appendChild(expression)

      //Si se le agrega estilo al enunciado
      if (this.definition.instructionText.styleClass) {
        expression.classList.add(...this.definition.instructionText.styleClass)
      }

    } else {
      definitionStatement.style.display = 'none';
    }


  }

  //------------------------------Menu desplegable curvas-----------------------------------

  curvesMenu() {

    //Evento que muestra y desaparece el menu 
    this.node.addEventListener('click', (e) => {
      if (e.target.matches('.btnCurve') || e.target.matches('.close-btn')) {
        menu.classList.toggle('artifactCurve__menu--open');
      }

    });

    const template = document.getElementById('tmp-ImagenMenu'); // template para los svg de las curvas
    const menu = this.node.querySelector('.artifactCurve__menu'); //div donde se inserta el menu

    //recorro this.alphabet para pintar los svg de las curvas
    Object.keys(this.alphabet).forEach((curve) => {
      const clone = template.content.firstElementChild.cloneNode(true);
      const imag = clone.querySelector('.svgCurves')
      const condition = this.developProcess ? (true || typeof Android !== 'undefined' && typeof Android.sendData === 'function') : (typeof Android !== 'undefined' && typeof Android.sendData === 'function')

      //Funcion para insertar las imagenes en movil o web 


      //colocar true|| dentro del if para poder ver el html
      if (condition) {
        imag.src = `../../../assets/cap_4/${curve}.svg`; //para q se vea en html sacar esta condicion
      } else {
        imag.setAttribute('src', `/gateway/file/MG/ASS/cap_4/${curve}.svg`); //comentar esta
      }


      menu.querySelector('.funtionContent').appendChild(clone);


      //console.log(curve);

      //Evento al clone para que se cree la curva correspondiente
      clone.addEventListener('click', (e) => {


        if (this.curves.length < this.curveCount) { //un maximo de dos curvas por defecto

          //llamo a la funcion para crear la curva pasandole la curve que a recorrido
          this.curves.push(this.functionsCurves(this.alphabet[curve])) // acceder a this.curves  para el reset
          const keyCurve = this.alphabet[curve].keyCurve

          this.curveSelected.push((this.definition.conditions.defaultCurve && !isNaN(keyCurve)) ? 'constantDefault' : keyCurve)
          if (this.definition.conditions.defaultCurve && !this.curveSelected.includes('constantDefault')) this.curveSelected.push('constantDefault')

          this.status = true
        } else {
          this.alert.createWarningAlert(`Ya has creado ${this.definition.curveCount} curvas`)
        }
        /* if (this.curves.length < this.curveCount) {
    let curveKey = this.alphabet[curve].keyCurve;
    // Verificar si la curva ya ha sido creada
    if (!this.curveSelected.includes(curveKey)) {
        this.curves.push(this.functionsCurves(this.alphabet[curve]));
        this.curveSelected.push(curveKey);
        this.status = true;
    } else {
        console.log('La curva ya ha sido creada anteriormente.');
    }
} */

        menu.classList.toggle('artifactCurve__menu--open'); // quitando clase para que se oculte el menu despues de crear la curva

      })
    });


  }

  buttonsClick() {
    this.node.addEventListener('click', (e) => {
      if (e.target.matches('.xSlice')) {

        this.definition.visiblexSlice = !this.definition.visiblexSlice;
        this.definition.asymptotes.forEach((p) => {
          p[1].setAttribute({ visible: this.definition.visiblexSlice });
        });
        this.definition.change = true;
        this.status = true

      } else if (e.target.matches('.asyntote')) {
        this.definition.visibleAsyntote = !this.definition.visibleAsyntote;
        this.definition.change = true;
        this.status = true

      }
      this.boardObject.update();
    });
  }

  generateAsymptotePoint(asymptote, noValidable = true) {
    const newPoint = gAddPoint(this.definition, this.boardObject, null, asymptote, [0, 0]);

    newPoint.moveTo([0, 0]);

    newPoint.setAttribute({
      label: {
        anchorX: 'middle',
        anchorY: 'top',
        fontsize: noValidable ? 16 : 24,
        offset: [5, 25]
      },
      strokeColor: noValidable ? 'black' : '',
      size: noValidable ? 3 : 5,
      fixed: noValidable,
      name: () => noValidable ? '0' : '',
      visible: () => {
        asymptote.setAttribute({
          visible: () => noValidable ? this.definition.visibleAsyntote : this.definition.visiblexSlice
        });
        return noValidable ? this.definition.visibleAsyntote : this.definition.visiblexSlice;
      }
    });
    if (noValidable) {

    }
    return newPoint
  }

  generateDefaultAsymptotes() {
    const asyns = this.elementOfBoards.asymptotes;
    asyns.forEach(asyn => {
      const asymptote = asyn[1];
      this.definition.mode = 4;
      const pointSlider = this.generateAsymptotePoint(asymptote)
      this.definition.mode = null;
      asymptote.setAttribute({ visible: false });
      pointSlider.on('drag', (p) => {
        this.definition.change = true;
      })
    });

    if (this.definition?.asymptotes) {
      this.definition.asymptotes.push(asyns);
    } else {
      this.definition.asymptotes = asyns
    }
  }

  generateDefinitionAsymptotes() {
    const asyns = this.definition?.conditions?.asymptotes; // Llegan son los objetos de configuracion en conditions de la definicion
    const validableAsymptotes = gAsymptotes({ // se crean nuevas asintotas en base a las configuraciones
      board: this.boardObject,
      asymptotes: asyns,
    })

    this.pointsValidate = validableAsymptotes.map(asyn => {
      const asymptote = asyn[1];
      this.definition.mode = 4;
      const pointSlider = this.generateAsymptotePoint(asymptote, false)
      this.definition.mode = null;
      asymptote.setAttribute({ visible: false, opacity: 0.5 });
      pointSlider.on('drag', (p) => {
        this.status = true
        this.definition.change = true;
        if (this.curveResult?.curve) {            //Eliminando Curva de resultado de los puntos correctos
          this.boardObject.removeObject(this.curveResult.curve)
        }
      })
      return pointSlider;
    });
    //console.log(this.pointsValidate);
    if (this.definition?.asymptotes) {
      this.definition.asymptotes.push(...validableAsymptotes);
    } else {
      this.definition.asymptotes = validableAsymptotes
    }

  }


  /**
   * Validations
   * @returns 
   */
  validation() {
    super.validation()


    let conditions
    if (this.definition.conditions?.sumConstant) {
      conditions = this.definition.conditions?.sumConstant
      this.numberQuestions = [...conditions.mathCurves].length
      if (conditions.mathCurves.length > this.curves.length) {
        this.alert.createWarningAlert('No se han seleccionado la cantidad minima de Curvas')
        return
      }
      if (!this.status) {
        this.alert.createWarningAlert('No se ha cambiado su respuesta')
        return
      }
      this.status = false
      this.countValidate = { correct: 0, incorrect: 0 }
      // console.log(this.validationCurves({
      //   defCurves: ["x", "-x"],
      //   selectedCurves: this.curveSelected
      // }))
      let curveValidates = this.validationCurves({
        defCurves: conditions?.mathCurves,
        selectedCurves: this.curveSelected,
      })
      let pointValidates = this.validationPoints({ defPoints: conditions?.mathCurves, selectedPoints: this.curves })
      // console.log(pointValidates);
      if (pointValidates && curveValidates) {
        this.alert.createSuccessAlert('Excelente')
      } else {
        this.alert.createErrorAlert('Revisa tu respuesta')
      }
    }


    //*******Multiplicación***********//

    if (this.definition.conditions?.multiplyCurves) {
      conditions = this.definition.conditions?.multiplyCurves //cantidad de curvas para aplicar operacion
      if (!this.status) {
        this.alert.createWarningAlert('No se ha cambiado su respuesta')
        return
      }


      if (this.definition.conditions.defaultCurve && !this.curveSelected.includes('constantDefault')) this.curveSelected.push('constantDefault')

      if (conditions.length > this.curveSelected.length) {
        this.alert.createWarningAlert('No se han seleccionado la cantidad minima de Curvas')
        return
      }
      this.status = false
      this.numberQuestions = [...conditions, ...this.definition.conditions?.asymptotes].length
      //valida si selecciona las curvas correctas
      let curvedata = this.validationCurves({
        defCurves: conditions,
        selectedCurves: this.curveSelected,
      })



      this.countValidate = { ...curvedata[1] }
      let correctCurves = curvedata[0]

      /*    console.log(">>", this.definition.conditions?.asymptotes.length === this.pointsValidate.length);
       console.log(">>", this.pointsValidate);
       console.log(this.definition.visiblexSlice); */

      const operationAsym = this.validateZero ? this.definition.visibleAsyntote : true


      if (this.definition.conditions?.asymptotes.length === this.pointsValidate.length
        && this.definition.visiblexSlice && operationAsym) {
        let data = { correct: 0, incorrect: this.pointsValidate.length }

        let heightPoints = this.definition.conditions?.asymptotes.reduce((accum, tall) => {

          const math = this.pointsValidate.findIndex(
            (point) => {
              const noise = tall.noise ?? 0.2

              return (gInterPoint(point.Y(), tall.y, noise)
                &&
                gInterPoint(point.X(), tall.x, noise))
            }
          ) != -1
          if (math == true) {
            data.correct = data.correct + 1
            data.incorrect = data.incorrect - 1
          }
          return math && accum

        }, true);
        this.countValidate.correct = data.correct + this.countValidate.correct
        this.countValidate.incorrect = data.incorrect + this.countValidate.incorrect




        if (heightPoints && correctCurves) {
          let selectOperation = this.definition.conditions.operationType ?? 2
          let basicOperations = ['+', '-', '*', '/']
          //crea la curva producto


          const operation = this.definition.conditions.defaultCurve ? `${this.definition.conditions.defaultCurve}*${this.definition.conditions.multiplyCurves[0] ?? 'x'}` : this.definition.conditions.multiplyCurves.join(basicOperations[selectOperation]);


          this.curveResult = this.functionsCurves({
            keyCurve: operation,
            point: { visible: false }, options: { strokeColor: '#1ab100', strokeWidth: 3 }
          })

          this.alert.createSuccessAlert('Excelente')
        } else {

          //para que se elimine la curva
          if (this.curveResult?.curve) {

            this.boardObject.removeObject(this.curveResult.curve)
          }
          this.alert.createErrorAlert('Revisa tu respuesta')
        }

      } else {

        this.alert.createWarningAlert('Respuesta incompleta')
      }

    }

    if (typeof Android !== 'undefined' && typeof Android?.sendData === 'function') {
      Android.sendData(JSON.stringify(this.cleanData()));
    } else {
      sendData(this.cleanData());
    };
    /*   latexCalc(latex) {
        //toma una operacion en latex y la resuelve
        const computer = new ComputeEngine.ComputeEngine({ numericMode: "machine" })
        return computer.parse(latex).N()._value
    } */



  }

  /**
   * validacion de las curvas a seleccionar
   * @param {*} param0 
   * @returns 
   */
  validationCurves({ defCurves, selectedCurves }) {

    if (selectedCurves?.length !== defCurves?.length) {
      return [false, { correct: 0, incorrect: 0 }]
    }
    const data = { correct: 0, incorrect: selectedCurves.length }

    const isValidTheConstant = this.definition.conditions.defaultCurve

    if (isValidTheConstant && (!defCurves.includes('constantDefault') && !this.curveSelected.includes('constantDefault'))) {

      defCurves.push('---constantDefault')
      this.curveSelected.push('constantDefault')
    }

    const validation = defCurves.every((item) => {
      const curve = item.curve ?? item;
      let selectedStatus = false;

      selectedStatus = (isValidTheConstant && curve == 'constantDefault') ? true : selectedCurves.includes(curve)



      if (selectedStatus == true) {
        data.correct = data.correct + 1
        data.incorrect = data.incorrect - 1
      }

      return selectedStatus
    })

    return [validation, data]
  }
  validationPoints({ defPoints, selectedPoints }) {
    const defPointsCopy = [...defPoints];
    if (defPoints.length === selectedPoints.length) {
      for (let i = defPointsCopy.length - 1; i >= 0; i--) {
        let element = defPointsCopy[i]
        const match = selectedPoints.findIndex((item) => {
          return (gInterPoint(item.point.Y(), element.pointY, element?.noise ?? 0.2) && item.name == element.curve);
        });
        if (match != -1) {
          defPointsCopy.splice(i, 1);

          this.countValidate.correct = this.countValidate.correct + 1
        } else {
          this.countValidate.incorrect = this.countValidate.incorrect + 1

        }
      }
    } else {
      return false;
    }
    return defPointsCopy.length == 0;


  }
  cleanData() {
    const allvalidate = this.countValidate.correct + this.countValidate.incorrect
    this.countValidate.forAnswer = this.numberQuestions - allvalidate
    return {
      typeArtifact: 'Standard',
      artifact: this.numberElement,
      seconds: this.definition.timeInteraction,
      results: { ...this.countValidate }
    }
  }
  reset() {
    super.reset()

    this.pointsValidate.forEach(p => {   //Reseteando coordenadas de punto validados(movibles) a valores (0,0)
      p.moveTo([0, 0]);

    });

    this.definition.visiblexSlice = false;       //Bandera de visibilidad de verticales 
    this.definition.asymptotes?.forEach((p) => {
      p[1].setAttribute({ visible: this.definition.visiblexSlice });
    });

    this.validateZero = Boolean(this.elementOfBoards?.asymptotes)  //Bandera de visibildiad de verticales 
    //this.validateZero = this.elementOfBoards?.asymptotes ? true : false
    Boolean(this.validateZero)

    this.definition.visibleAsyntote = false;   //Bandera de visibildiad de verticales 
    this.definition.change = true;

    if (this.curveResult?.curve) {            //Eliminando Curva de resultado de los puntos correctos
      this.boardObject.removeObject(this.curveResult.curve)
    }

    if (this.curveSelected.length > 0) {   //Eliminando Curva seleccionadas de menu
      this.curves.forEach(c => {
        this.boardObject.removeObject(c.curve)
        this.boardObject.removeObject(c.point)
        this.boardObject.removeObject(c.asymptote)


      })
    }

    this.boardObject.update();

    //Reset de Arrays
    this.curveSelected = []
    this.curves = []
    this.alert.removeAll()      //Notificaciones
    this.correct = 0;
    this.incorrect = 0;
    this.auxResults = []
    this.definition.timeInteraction = 0
    this.definition.conditions.multiplyCurves = this.definition.conditions.multiplyCurves ?? '';
    //if(this.definition.conditions.defaultCurve) this.definition.conditions?.multiplyCurves.push('constantDefault')

  }
}


class GenerateSumConstant {
  static implement = null;

  constructor(allDefinitionArtifacts = {}, allDefinitionBoard = {}, selectorTmp = '#engineSumConstant-tmp') {
    if (GenerateSumConstant.implement) {
      return GenerateSumConstant.implement
    }
    this.allDefinitionArtifacts = allDefinitionArtifacts;
    this.allDefinitionBoard = allDefinitionBoard;
    this.tmp = null;
    this.selectorTmp = selectorTmp;
    this.fragment = new DocumentFragment();
    this.#main(this.allDefinitionArtifacts, this.allDefinitionBoard);
    this.countArtifact = 0;
    this.countExample = 0;
    GenerateSumConstant.implement = this;

  }

  #main() {
    if (GenerateSumConstant.mainCalled) return

    this.tmp = this.#getDOMTemplate('engineSumConstant-tmp');
    let count = 1
    let exampleCount = 1


    for (let key in this.allDefinitionArtifacts) {
      const clone = this.tmp.content.firstElementChild.cloneNode(true)
      const container = document.querySelector(`.artifactSumConstant[data-artifact='${key}']`)

      if (!container) {
        console.warn('<!> este artefacto no es llamado en la vista');
        !key.includes('example') ? count++ : exampleCount++;
        continue
      }

      this.#createArtifact(key, clone, container, count, exampleCount);

      !key.includes('example') ? count++ : exampleCount++;

    }

    document.body.appendChild(this.fragment)
    GenerateSumConstant.mainCalled = true;
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

  /**
   * Obtener Template y si no esta agregar el correspondiente a la clase
   * @param {*} idTmp 
   * @returns 
   */
  #addTmpToDOM(idTmp = '') {

    const tmp = `<template id='${idTmp}'>
    <div class="engineSumConstant">
      <div class="engineSumConstantContainer">
        <div
          class="engineSumConstant__notification transitionNotification"
          data-show="false"
        >
        </div>
        <div
          class="engineSumConstant__Board"
          id="boad1"
          data-board="board_"
          data-artifact="artifact_"
        ></div>
    
        <div class="engineSumConstant__btnContainer btn-all">
          <div class="engineSumConstant__Otherbtn"></div>
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
    </div>
    </template>`

    document.body.insertAdjacentHTML('afterend', tmp)
    return `${idTmp}`
  }

  #createArtifact(key, clone, container, count, exampleCount) {
    const boardSelect = container.dataset.board || 'board_0';
    const id = (key.includes('example')) || (!key.includes('artifact')) ? 'example' + exampleCount : '.engineSumConstant-' + count;

    const artifact = new SumConstantArtifact(this.allDefinitionArtifacts[key])

    artifact.setTemplate(clone)
    if (key.includes('example')) artifact.isExample()

    const containerBoard = clone.querySelector('.engineSumConstant__Board')
    containerBoard.id = `${id}-board`

    clone.id = key
    container.appendChild(clone)
    artifact.idToBoard = `${id}-board`

    artifact.setBoard(this.allDefinitionBoard[boardSelect])
    artifact.initArtifact()
    artifact.numberElement = count
    return true
  }

}

