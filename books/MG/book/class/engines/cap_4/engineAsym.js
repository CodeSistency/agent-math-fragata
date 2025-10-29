class SumConstantArtifact extends EngineMaker {

  constructor(definition) {
    super(definition)
    this.id = null
    this.points = [[]]
    this.curves = [] //array de curvas creadas
    this.curveCount = null
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
  
  }
  
  initArtifact() {
    super.initArtifact()
    this.curveCount = this.definition?.curveCount ?? 2
    this.alphabet = this.boardDefinition?.alphabet ?? this.alphabet
    this.curveButton = this.definition?.showCurveButton ?? true ? this.node.querySelector('.btnCurve') : null;
  
    //para hacer visible o no el boton de curvas
    if (this.curveButton) {
      this.curveButton.style.display = 'block';
    } else {
      this.curveButton = this.node.querySelector('.btnCurve');
      this.curveButton.style.display = 'none';
    }
    this.generateDefaultAsymptotes();
    this.curvesMenu()
    this.buttonsClick();
  }

  buttonsClick() {
    this.node.addEventListener('click', (e) => {
      if (e.target.matches('.xSlice') || e.target.matches('.close-btn')) {
        this.definition.visiblexSlice = !this.definition.visiblexSlice;
        this.definition.asymptotes.forEach((p) => {
          p[1].setAttribute({ visible: this.definition.visiblexSlice });
        });
        this.definition.change = true;
      } else if (e.target.matches('.asyntote') || e.target.matches('.close-btn')) {
        this.definition.visibleAsyntote = !this.definition.visibleAsyntote;
        this.definition.change = true;
      }
      this.boardObject.update();
    });
  }
  
  generateDefaultAsymptotes () {
    if (this.elementOfBoards?.asymptotes) {
      const asyns = this.elementOfBoards.asymptotes;
      console.log('D P', this.definition.points)
      this.definition.other = []; // declarado de nuevo porque en EngineMaker aparece como others, pero para efectos de gAddPoint es other, en singular.
      this.definition.visibleAsyntote = false // declarado para validar la visibilidad de las asymptotas y puntos
      this.definition.visiblexSlice = false // declarado para validar la visibilidad de las asymptotas y puntos
      this.definition.points = asyns.map(asyn => {
        const asymptote = asyn[1];
        this.definition.mode = 4;
        const pointSlider = gAddPoint(this.definition, this.boardObject, null, asymptote, [0,0]);
        pointSlider.moveTo([0, 0]);
        pointSlider.setAttribute({
          label: {
            anchorX: 'middle',
            anchorY: 'top',
            fontsize: 24,
            offset: [5, 35]
          },
          size: 5,
          fixed: !asymptote.validate,
          // name: () =>  pointSlider.Y() == 0 ? '0': '',
          name: () => !asymptote.validate ? '0': '',
          visible: () => {
            if (!asymptote.validate) {
              asymptote.setAttribute({
                visible: () => this.definition.visibleAsyntote
              });
              return this.definition.visibleAsyntote;
            } else {
              return this.definition.visiblexSlice;
            }
          }
        });
        this.definition.mode = null;
        asymptote.setAttribute({ visible: false });
        pointSlider.on('drag', (p) => {
          this.definition.change = true;
        })
        if (asymptote.validate) return pointSlider;
      }).filter(p => p);
      this.definition.asymptotes = asyns;
    }
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
        // visible: pointDef.visible, comentado para que no aparezca el punto y no se pueda mover la curva
        visible: false,
        name: 'P',
        label: {
          visible: false
        }
      }],
    })
    // point[0].on("drag", () => {
    //   this.status = true
    // })
    //su une la ecuacion matematica con el punto ancla
    let mathEcuation = params.keyCurve + '+(P.Y()-' + point[0].Y() + ')'
    //se crea la asintota donde se creo el punto
    //   let asymptote = gAsymptotes({ board: this.boardObject, asymptotes: [{ x: point[0].X(), style: { visible: false } }] })
    //se fija el punto a la asintota
    //   point[0].makeGlider(asymptote[0][1]);
    //se guardan el punto y la asintota en una variable
    //se crea la curva
    return {
      name: params.keyCurve,
      // curve: this.boardObject.create('functiongraph', [mathEcuation, ...interval], options),
      curve: gExpressionCurve({ board: this.boardObject, expression: mathEcuation, interval, curveStyle: params.options }),
      point: point[0],
      // asymptote
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
  
  
      //Funcion para insertar las imagenes en movil o web 
  
      //colocar true|| dentro del if para poder ver el html
      if (true || typeof Android !== 'undefined' && typeof Android.sendData === 'function') {
        imag.src = `../../../assets/cap_4/${curve}.svg`; //para q se vea en html sacar esta condicion
      } else {
        imag.setAttribute('src', `${ip}asset/:cap_4/:${curve}.svg`); //comentar esta
      }
  
  
      menu.querySelector('.funtionContent').appendChild(clone);
  
  
      //console.log(curve);
  
      //Evento al clone para que se cree la curva correspondiente
      clone.addEventListener('click', (e) => {
  
  
        if (this.curves.length < this.curveCount) { //un maximo de dos curvas por defecto
  
          //llamo a la funcion para crear la curva pasandole la curve que a recorrido
          this.curves.push(this.functionsCurves(this.alphabet[curve])) // acceder a this.curves  para el reset
          this.curveSelected.push(this.alphabet[curve].keyCurve)
          this.status = true
        }
  
        menu.classList.toggle('artifactCurve__menu--open'); // quitando clase para que se oculte el menu despues de crear la curva
  
      })
    });
  
  
  }
  
  validation() {
    super.validation()
    if (this.definition.conditions?.sumConstant) {
      let conditions = this.definition.conditions?.sumConstant
      if (conditions.mathCurves.length > this.curves.length) {
        return
      }
      if (!this.status) {
        console.log(this.status)
      }
      this.status = false
      // console.log(this.validationCurves({
      //   defCurves: ["x", "-x"],
      //   selectedCurves: this.curveSelected
      // }))
      let curveValidates = this.validationCurves({
        defCurves: conditions?.mathCurves,
        selectedCurves: this.curveSelected,
      })
      let pointValidates = this.validationPoints({ defPoints: conditions?.mathCurves, selectedPoints: this.curves })
  
    }
  }
  validationCurves({ defCurves, selectedCurves }) {
    if (selectedCurves?.length !== defCurves?.length) {
      return
    }
    return defCurves.every((item) => {
      return selectedCurves.includes(item.curve ?? item)
    })
  }
  validationPoints({ defPoints, selectedPoints }) {
    const defPointsCopy = [...defPoints];
    if (defPoints.length === selectedPoints.length) {
      for (let i = defPointsCopy.length - 1; i >= 0; i--) {
        let element = defPointsCopy[i]
        const match = selectedPoints.findIndex((item) => {
          return (gInterPoint(item.point.Y(), element.pointY, element?.noise) && item.name == element.curve);
        });
        if (match != -1) {
          defPointsCopy.splice(i, 1);
        }
      }
    } else {
      return false;
    }
    return defPointsCopy.length == 0;
  
  
  }
  reset() {
    super.reset()
    console.log('reset()');
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
    console.log();
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
  
  
  