class engineFigure extends NodeHtml {
  constructor(def, defBoard) {
    super(defBoard);
    this.defBoard = defBoard;
    this.idTemplate = 'tmpFigure';
    this.conditions = def.conditions;
    this.def = def;
    this.idboard = def.name + "_board";
    this.htmlNode = null;
    this.validation = new FigureValidate();
    this.shapes = this.defBoard.shapes;
    this.selectPoints = [];
    this.pointsReset = [];
    this.allSegments = [];
    this.shapeProperties = [];
    this.pointForLine = [];
    this.connections = [];
    this.shape = {};
    this.allShapes = [];
    this.allPoints = [];
    this.pxline = [];
    this.pointsInter = []
    this.allInputs = [];
    this.allCircle = [];
    this.intersections = [];
    this.isSegmentButtonActive = false;
    this.isCompassButtonActive = true;
    this.compass = null
    this.countLinesOnClick = 0
    this.MathFieldGenerate = []
    if (defBoard.styles) {
      this.defBoard.styles = defBoard.styles;
      if (!defBoard.styles?.boundingbox || !this.defBoard.styles.axis) {
        this.defBoard.styles = this.defBoard.styles || {};
        this.defBoard.styles.boundingbox = [-7, 5, 7, -5];
      }
    } else {
      this.defBoard.styles = {
        boundingbox: [-7, 5, 7, -5],
        axis: false,
        grid:true
      }
    }
  }
  templateInsert = () => {
    if (!document.querySelector("#tmpFigure")) {
      const $templateDefaults = `<template id="tmpFigure">      
          <div class="artifact-base artifact-big">
          <div class='form-figure-top'></div>
            <div id="contentUtilsBoard">
              <div id="jsxbox" class="boardVerticalShort border-board-dark"></div>
            </div>
            <div class='form-figure'></div>
            <div class="all-btn border-board-dark">
              <div class="btn-base border-dark rounded">
                <div id="sectionBtnContent" class="sectionBtn interactive-btn"></div>
                <div class="sectionBtn default-btn gap-2">
                  <button id="myButton" class="segment styleBtn buttonSegment buttonKey" title="Segmento"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="var(--rojo)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0M16 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0M7.5 16.5l9-9"/></svg></button>
                  <button id="pbutton" class="points styleBtn buttonSegment buttonKey" title="points"></button> 
                   
                  <button id="compassButton" class="compass styleBtn buttonSegment buttonKey OpenMainCompass" title="Compás">
                   <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path fill="var(--rojo)" d="M11 2h2v2h.5A1.5 1.5 0 0 1 15 5.5V9l-.44.44l1.64 2.84C17.31 11.19 18 9.68 18 8h2c0 2.42-1.07 4.59-2.77 6.06l3.14 5.44l.13 2.22l-1.87-1.22l-3.07-5.33c-1.06.53-2.28.83-3.56.83s-2.5-.3-3.56-.83L5.37 20.5L3.5 21.72l.13-2.22L9.44 9.44L9 9V5.5A1.5 1.5 0 0 1 10.5 4h.5zM9.44 13.43c.78.37 1.65.57 2.56.57s1.78-.2 2.56-.57L13.1 10.9h-.01c-.62.6-1.56.6-2.18 0h-.01zM12 6a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1"/></svg>
                  </button>
                  <button class="return styleBtn buttonSecundary buttonKey" title="Regresar"></button>
                  <button class="reset styleBtn buttonSecundary buttonKey" title="Reset"></button>
                  <button class="check styleBtn buttonPrimary buttonKey" title="Validar"></button>
                </div>
              </div>
              <div id="compassOptions" class="compass-options hidden">
                <button class="styleBtn buttonSegment buttonKey" id="deleteCircle"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 16 16"><path fill="#f1604d" d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"/></svg></button>
                <button class="styleBtn buttonSegment buttonKey"  id="drawCircle"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.25" fill="none" stroke="#f1604d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg></button>
                <button class="styleBtn buttonSegment buttonKey closedSvg" id="closedMainCompass"></button>
              </div>
            </div>
          </div>
      </template>`;
      this.template ??= $templateDefaults;
      document.body.insertAdjacentHTML('afterend', this.template);
    }
    this.htmlNode ??= document.querySelector(`#${this.idTemplate}`).content.firstElementChild.cloneNode(true);
    return this.htmlNode;
  };
  initEngine() {
    this.BoardContent = this.htmlNode.querySelector("#contentUtilsBoard");
    this.BoardContent.id = this.idboard;
    this.BoardContent.className = `boardFigure`;
    if (this.initBoardBase({ id: this.idboard, ...this.defBoard })) {
      this.shapes?.forEach((shape, i) => {
        this.shape = shape;
        this.createShapes(shape);
      });
    }
    this.setupSegmentButton();
    this.compassButton = this.htmlNode.querySelector("#compassButton");
    if (this.defBoard.Interaction.compass == "none") this.compassButton.style.display = "none"
 
    this.setupCompassButton(this.defBoard.Interaction.compass);
    switch (this.defBoard.Interaction.type ?? 'Segment') {
      case 'Segment':
        this.segmentInteraction();
        break;

      default:
        break;
    }
    this.contenedorInputsTop = this.htmlNode.querySelector(".form-figure-top")
    this.contenedorInputs = this.htmlNode.querySelector(".form-figure")

    if (this.def.tools) {   
      this.def.tools.forEach((tag, iB) => {
        tag.containerTop ? this.contenedorInputsTop.style.display = "flex" : this.contenedorInputs.style.display = "flex"
        if (tag.tag == "input") {
          let input = this.createInput({
            type: "text",
            style: `${tag.style ?? "inputPoint"}`,
            iterator_A: iB,
            value: tag.value,
            readOnly: "none"
          })
          input.fatherBg = input.parentElement
          tag.containerTop ? this.contenedorInputsTop.appendChild(input) : this.contenedorInputs.appendChild(input)
        } else if (tag.tag == "select") {
          let select = this.createSelect({
            style: {
              select: `${tag.style ?? "selectPoint"}`
            },
            valueOption: tag.default
          });
          select.fatherBg = select
          tag.containerTop ? this.contenedorInputsTop.appendChild(select) : this.contenedorInputs.appendChild(select)
        } else if (tag.tag == "inputs") {
          let form = this.createForm({
            formStyle: `${tag?.style?.form??"formEscalas"}`,
            formId: iB,
            value:tag.value
          })
          form.dataset.maxElementCheck = tag.maxElementCheck
          form.checkedInputs = []
          let checks = { id: form.id, checks: [] }
          tag.inputs.forEach((e, i) => {

            let input = this.createInput({
              style: `${e.style.input ?? "inputPointForm"}`,
              iterator_A: i,
              iterator_B:iB,
              type: "checkbox",
              value: e.value.input,
              readOnly: "none"
            })
            input.change = true
            input.correctResponce = e.correctResponce ?? false
            if (e?.value.label) {
              let label = this.createLabel({
                style: `${e.style.label ?? "labelTableCheck "} actionTableLabel`,
                idInput: input.id,
                value: e.value.label
              })
              input.fatherBg = label
              label.appendChild(input)
              form.appendChild(label)
              if (input.correctResponce) {
                checks.checks.push(input)
              }
            } else {
              form.appendChild(input)
            }
          })
          this.entris.push(checks)
          this.selectorInputMultiple({ tag: form, classCheck: "checkTable" })
          tag.containerTop ? this.contenedorInputsTop.appendChild(form) : this.contenedorInputs.appendChild(form)
          this.formS.push(form)
        } else if (tag.tag == "form") {
          const form = this.createForm({
            formStyle: `${tag.style?.form ?? "formInputEscalas"}`,
            formId: ""
          })
          form.innerHTML = tag.value ?? ""
          if (tag.inputs) {
            tag.inputs.forEach(e => {
              let mathfield = e.tag ?? this.createMathField({
                style: `${e.style ?? ""} mathfield`
              })
              form.appendChild(mathfield)
            })
          } else if (tag.spans) {
            tag.spans.forEach(e => {
              let span = this.createSpan({
                SpanText: e.value,
                SpanStyle: e.style?.span ?? ""
              })
            
              let math = e.input ? (
                e.tag ?? this.createMathField({
                  style: `${e.style.input ?? ""} mathfield`
                })
              ) : null

              let select = e.select ? this.createSelect({
                style: {
                  select: e?.style?.select??"select"
                },
                valueOption: e?.default
              }):null

              if (math) {
                span.appendChild(math)
              }else if (select) {
                span.appendChild(select)
              }

              form.appendChild(span)
            })
          }else if(tag.selects){
            tag.selects.forEach(e=>{
              let tag = this.createSelect({
                style: {
                  select: e?.style?.select??"select"
                },
                valueOption: e?.default
              });
              tag.fatherBg = tag.parentElement
              if (e?.text?.span) {
                let span = this.createSpan({
                  SpanStyle:`${e?.style.span??"spanMathfiled"} `,
                  SpanText:e?.text.span
                })
                span.appendChild(tag)
                form.appendChild(span)
              }else{
                e.parent?form.querySelector(`.${e.parent}, #${e.parent}`).appendChild(tag):form.appendChild(tag)
              }
            })
          }
          tag.containerTop ? this.contenedorInputsTop.appendChild(form) : this.contenedorInputs.appendChild(form)
          this.formS.push(form)
        } else {
          let mathfield = this.createMathField({
            style: `${tag.style ?? ""} mathfield `
          })
          mathfield.fatherBg = mathfield
          tag.containerTop ? this.contenedorInputsTop.appendChild(mathfield) : this.contenedorInputs.appendChild(mathfield)
        }
      });
    }

    
    
    this.entrisModifid = [...this.entris]
    this.mathfieldEventsAndLayauts(this.entrisModifid)
    this.initTimer(this.hmlNode);
    this.setupInteractiveButton() 
    this.UX.createAlertInteraction(this)  

  }
  setupSegmentButton() {
    this.segmentButton = this.htmlNode.querySelector("#myButton");

    
    
    
    // Inicializa el estado por defecto
    this.isSegmentButtonActive = false;
  
    // Establece el estilo inicial
  
    if (this.defBoard.buttonSegment===true??true) {
      
     this.segmentButton.addEventListener('click', () => {
        if (this.interactiveStatus) {          
          this.interactiveB.click()
        }
        // Cambia el estado de activación del botón
        this.isSegmentButtonActive = !this.isSegmentButtonActive;
  
        // Aplica estilos basados en el estado actual
        if (this.isSegmentButtonActive) {
         this.segmentButton.style.backgroundColor = "#9e3a32"; // Color más oscuro del botón, presionado
        } else {
         this.segmentButton.style.backgroundColor = "#fff"; // Color original del botón
        }
      });
    } else {
     this.segmentButton.style.display = "none";
    }
  }
  setupCompassButton() {
    this.compassOptions = this.htmlNode.querySelector("#compassOptions");
    this.compassButton ? this.compassButton.addEventListener('click', () => {
      this.validateStatus = false
      this.compassButton.classList.toggle('active', this.isCompassButtonActive);
      if (this.isCompassButtonActive) {
        this.compassOptions.classList.remove('hidden');
        this.setupCompassOptions();
        this.isCompassButtonActive = false;
      }
    }) : null;
  }
  setupCompassOptions() {
    if (this.compass) {
      this.compassOptions.classList.remove('hidden');
      this.compass.setAttribute({ visible: true });
      this.compass.punta_1.setAttribute({ visible: true });
      this.compass.punta_2.setAttribute({ visible: true });
      this.compass.circleExample.setAttribute({ visible: true });
      this.compass.infoBox.setAttribute({ visible: true });
      this.compass.linesCompass.forEach(line => {
        line.setAttribute({ visible: true });
      })
      this.isCompassButtonActive = false;
    } else {
      this.createCompass({
        lengthCompass:this.defBoard.Interaction.compass?.lengthCompass, 
        isStatic:this.defBoard.Interaction.compass?.isStatic, 
        position:this.defBoard.Interaction.compass?.position,
        circlesConcentricSuperPosition:this.defBoard.Interaction.compass?.circlesConcentricSuperPosition,
        styleCircle:this.defBoard.Interaction?.compass.styleCircle
      })
    }
  }
  createCompass(params) {
    const {
      styleCircle,
      lengthCompass=3.5,
      isStatic=false,
      position = [[0, 2], [2.6, -3.2], [-2.6, -3.2]],
      circlesConcentricSuperPosition=true
    }= params



    const closedMainCompass = this.htmlNode.querySelector("#closedMainCompass")
    const drawCircleButton = this.htmlNode.querySelector("#drawCircle");
    const deleteButton = this.htmlNode.querySelector("#deleteCircle");
    const baseCompas = this.addPoint({
      x: position[0][0], y: position[0][1], ref: "baseCompas_0",
      style: {
        label: { visible: false },
        size: lengthCompass / .7 < 6 ? lengthCompass / .7 : 6,
        fixed: isStatic,
        color: '#e63946',
        // name:"0"
      }
    })
    baseCompas.setAttribute({ fillColor: "#212529" })
    const circleBase = this.createShapes({
      type: "circle",
      params: [baseCompas, lengthCompass],
      style: {
        fixed: isStatic,
        visible: false,
        highlight: false
      }
    })
    const punta_1 = this.createShapes({
      type: 'glider',
      params: [position[1][0], position[1][1], circleBase],
      style: {
        label: { visible: false },
        color: '#212529',
        size: lengthCompass / .5 < 4 ? lengthCompass / .5 : 5,
        fixed: isStatic,
      }
    })
    const mp1 = this.createShapes({
      type: 'mirrorpoint', params: [punta_1, baseCompas], style: {
        color: "violet",
        visible: false,
        label: { visible: false },
        fixed: isStatic,
      }
    });
    const cemi = this.createShapes({
      type: 'semicircle', params: [punta_1, mp1], style: {
        strokeColor: 'red',
        visible: false,
        strokeWidth: 2,
        fixed: isStatic,
      }
    });
    const punta_2 = this.createShapes({
      type: 'glider', params: [position[2][0], position[2][1], cemi], style: {
        label: { visible: false },
        size: lengthCompass / .5 < 4 ? lengthCompass / .5 : 5,
        color: '#212529',
        fixed: isStatic,
      }
    });
    const linesCompassProperty = [
      {
        type: "line", ref: "linePunta_2", params: [baseCompas, punta_2], style: {
          strokeWidth: lengthCompass / .4 < 8 ? lengthCompass / .4 : 8,
          straightLast: false,
          straightFirst: false,
          lastArrow: false,
          color: "#91c2d2",
          highlight: false,
          fixed: isStatic,
        }
      },
      {
        type: "line", ref: "linePunta_1", params: [baseCompas, punta_1], style: {
          strokeWidth: lengthCompass / .4 < 8 ? lengthCompass / .4 : 8,
          straightLast: false,
          straightFirst: false,
          lastArrow: false,
          color: "#91c2d2",
          highlight: false,
          fixed: isStatic,
        }
      },
      {
        type: 'line', ref: "lineDistance", params: [punta_1, punta_2], style: {
          straightLast: false,
          straightFirst: false,
          strokeWidth: 2,
          dash: 2,
          visible: true,
          highlight: false,
          fixed: isStatic,
        }
      }
    ]
    const linesCompass = linesCompassProperty.map(line => this.createLine(line))
    const infoBoxProperty = {
      type: "smartlabel",
      refLn: ["lineDistance"],
      style: {
        unit: '',
        cssClass: 'infoBox no-hover actionTableLabel bckground',
        prefix: "D:",
        useMathJax: false,
        fontSize: 12.5,
        highlight: false,
        anchorX: 'middle',
        anchorY: 'middle',
      }
    }
    const infoBox = this.createShapes(infoBoxProperty)
    const circleExample = this.createShapes({
      type: 'circle', params: [punta_1, punta_2], style: {
        strokeColor: '#1d3557',
        visible: true,
        strokeWidth: 2,
        dash: 2,
        highlight: false
      }
    });
    baseCompas.on("down", () => {
      infoBox.setAttribute({ visible: !infoBox.visPropCalc.visible })
      baseCompas?.setAttribute({ color: !infoBox.visPropCalc.visible ? "#0fa3b1" : '#e63946' })
      baseCompas.setAttribute({ fillColor: "#212529" })
    })
    this.compass = baseCompas
    this.compass.circleBase = circleBase
    this.compass.punta_1 = punta_1
    this.compass.mp1 = mp1
    this.compass.cemi = cemi
    this.compass.punta_2 = punta_2
    this.compass.linesCompass = linesCompass
    this.compass.infoBox = infoBox
    this.compass.circleExample = circleExample
    this.compass.indexColorCircle = 0
    this.compass.createcircle = () => {
      const id_0 = this.generateUniqueId(8)
      const id_1 = this.generateUniqueId(8)
      const colorsCircles = ['#3d348b', '#7678ed', '#219ebc', '#f18701', '#780000'];
      const circleProperty = {
        type: "circle",
        points: [
          { x: this.compass.punta_1.X(), y: this.compass.punta_1.Y(), ref: `pointCircle_${id_0}`, style: { visible: false, size: 5, fixed: true, label: { offset: [-15, -25] } } },
          { x: this.compass.punta_2.X(), y: this.compass.punta_2.Y(), ref: `pointCircle_${id_1}`, style: { visible: false, size: 5, fixed: true, label: { offset: [-5, -15] } } },
        ],
        refPt: [`pointCircle_${id_0}`, `pointCircle_${id_1}`],
        style: {
          fixed: true,
          strokeColor: colorsCircles[this.compass.indexColorCircle],
          strokeWidth: 3,
          fillColor: 'transparent',
          fillOpacity: 1,
          ...styleCircle
        }
      }
      const circle = this.createShapes(circleProperty)
      circle.ref = `circle_tagent_${this.compass.indexColorCircle}`

      if (circlesConcentricSuperPosition) {
        const circleIncorrect = this.allCircle.some(cir => {
          return this.gInterPoint(circle.inherits[0].X(), cir.inherits[0].X(), .3)
        })
      }

      this.compass.indexColorCircle = this.compass.indexColorCircle + 1
      circle.manipulation = true
      this.allEventsForReturn.push(circle)
      this.allCircle.push(circle)
    }
    this.compass.deleteCircle = (circle) => {
      if (circle) {
        circle.inherits.forEach(point => {
          this.board?.removeObject(point)
          let index = this.allPoints.indexOf(point)
          index !== -1 ? this.allPoints.splice(index, 1) : null
          let indexInter = this.intersections.indexOf(circle.intersectionFigure)
          indexInter !== -1 ? this.intersections.splice(index, 1) : null
        })
      }
      let index = this.allCircle.indexOf(circle)
      index !== -1 ? this.allCircle.splice(index, 1) : null
      this.compass.indexColorCircle = this.compass.indexColorCircle-1
    }
    drawCircleButton.addEventListener('click', (event) => {
      if (this.compass.indexColorCircle > 5) { this.compass.indexColorCircle = 0 }
      this.compass.createcircle()
    });
    closedMainCompass.addEventListener("click", (event) => {
      this.compassOptions.classList.add('hidden');
      this.compass.setAttribute({ visible: false });
      this.compass.circleBase.setAttribute({ visible: false });
      this.compass.punta_1.setAttribute({ visible: false });
      this.compass.mp1.setAttribute({ visible: false });
      this.compass.cemi.setAttribute({ visible: false });
      this.compass.punta_2.setAttribute({ visible: false });
      this.compass.circleExample.setAttribute({ visible: false });
      this.compass.linesCompass.forEach(line => {
        line.setAttribute({ visible: false });
      })
      this.compass.infoBox.setAttribute({ visible: false });
      this.isCompassButtonActive = true;
    })
    deleteButton.addEventListener("click", (event) => {
      this.compass.deleteCircle(this.allCircle[this.allCircle.length - 1])
    })
    return this.compass
  }
  calculateDistance(pointA, pointB) {
    /**
     * Calcula la distancia entre dos puntos en el plano cartesiano
     * @param {JXG.Point} pointA - Punto A
     * @param {JXG.Point} pointB - Punto B
     * @returns {number} La distancia entre los dos puntos
     */
    return Math.hypot(pointB.X() - pointA.X(), pointB.Y() - pointA.Y());
  }
  setupInteractiveButton() {

    this.interactiveB = this.htmlNode.querySelector("#pbutton");   
     this.pointsInBoard = 0

    if(this.defBoard.buttonInteraction===true??true){
      
      this.interactiveStatus = false;

   this.interactiveB.addEventListener('click', () => {

      if (this.isSegmentButtonActive) {
        this.segmentButton.click()
      }
      
        this.validateStatus = false;
        this.interactiveStatus = !this.interactiveStatus; // Alterna el estado de activado/desactivado
    
        // Cambia estilos del botón y SVG según el estado de `this.interactiveStatus`
        if (this.interactiveStatus) {
         this.interactiveB.style.backgroundColor = "#9e3a32"; // Color más oscuro cuando está activo
        } else {
         this.interactiveB.style.backgroundColor = "#fff"; // Color original cuando está desactivado
        }
    });
  
    if (this.defBoard.OnePoint) {
      this.board.on("down",e=>{

      if (this.interactiveStatus && this.pointsInBoard < this.defBoard.OnePoint ) {
        const getMouseCoords = (e, i = 0) => new JXG.Coords(JXG.COORDS_BY_SCREEN, this.board.getMousePosition(e, i), this.board);
        const coords = getMouseCoords(e);
        const pboard = this.addPoint({
          x: coords.usrCoords[1],
          y: coords.usrCoords[2],
          ref: `point_segment`,
          style: {
            // fixed: true,
            // name: "B",
            label: {offset: [-1, -14]},
          },
        });
        pboard.manipulation=true
        pboard.on("down",()=>this.createInputBelowPoint(pboard,this.defBoard.maxMathfield))
        pboard.on("drag",(event)=>{
          this.iniciarTimer(event);
          this.validateStatus = false
        })
        this.pointsInBoard++
        
        this.segmentInteraction()
        
      }
      })
      
      
    }else{
      this.board?this.board.on('down', (e) => {
        // Llama a `createPointOnClick` solo si el botón está activado (this.interactiveStatus es true)
  
        if (this.interactiveStatus) {
          this.createPointOnClick(e, this.defBoard.withMathfield,this.defBoard.createInpForPnt);
        }
      }):null
    }

    }else{
     this.interactiveB.style.display = "none";
    }
    
  }
  segmentInteraction(){
    
    this.allPoints.forEach((point) => {
      (point.ref=="point_segment")?null:point.off('down')
      point.on('down', () => {
          
          if (!point.name && this.defBoard.createInpForPnt && !this.defBoard.withMathfield) {
            this.createInputBelowPoint(point, this.defBoard.maxMathfield);
          }
        
        if (!this.isSegmentButtonActive) {
          return;
        }
        this.selectPoints.push(point);
        this.validateStatus = false;
        point.setAttribute({ strokeColor: '#217e9d', size: 6 });

        if (this.selectPoints.length === 3) {
          this.resetClickedPoints();
        }
        else if (this.selectPoints.length === 2) {
          const [firstPoint, secondPoint] = this.selectPoints;
          
          
          if (firstPoint.ref == secondPoint.ref) {
            this.resetClickedPoints();
            return this.alertManager.Open({message:'No se puede crear una línea con el mismo punto.'});
          }
          const coordsEqual = (firstPoint.coords.usrCoords[1] === secondPoint.coords.usrCoords[1]) &&
            (firstPoint.coords.usrCoords[2] === secondPoint.coords.usrCoords[2]);
          if (firstPoint.ref === secondPoint.ref && firstPoint.ref !== "" && coordsEqual) {
            // this.showError('No se puede crear una línea con el mismo punto.');
            this.resetClickedPoints();
            return this.alertManager.Open({message:'Esa linea ya existe no puedes volver a crearla'}); 
          }
          if (this.doesLineExist(firstPoint, secondPoint)) {
            this.resetClickedPoints();
            return this.alertManager.Open({message:'Esa linea ya existe no puedes volver a crearla'});
          }
          
          const l = this.createLine( {
            type: "line",ref:`line_segment_${this.countLinesOnClick}`, params: [firstPoint, secondPoint], style: {
              // strokeColor: "orange", // Color de la línea
              strokeWidth: 4,
              straightLast: false,
              straightFirst: false,
              lastArrow: false, // Sin flecha al final de la línea
              color: "#0aa1dd",
              highlight: false
            }
          })  
          l.manipulation = true
          l.refName = l.name
          this.countLinesOnClick++
          this.allSegments.push(l);
          this.allEventsForReturn.push(l)          
          firstPoint.baseLine = l
          secondPoint.baseLine = l        
          this.resetClickedPoints();
        }
      });
    });
  };
  createPointOnClick(e,withMathfield=false,createInpForPnt=false) {
    let lnP
    const getMouseCoords = (e, i = 0) => new JXG.Coords(JXG.COORDS_BY_SCREEN, this.board.getMousePosition(e, i), this.board);
    const coords = getMouseCoords(e);
    const canCreate = !Object.values(this.board.objects).some(el => JXG.isPoint(el) && el.hasPoint(coords.scrCoords[1], coords.scrCoords[2]));
    const maxLinesClick = this.defBoard.maxLinesClick ?? 4;
    if (canCreate && this.pointsInter.length < (maxLinesClick*2)){
      // Crea el punto en el tablero
      const pboard = this.board.create('point', [coords.usrCoords[1], coords.usrCoords[2]],{
        name:"",
        precision: {
          touch: 5,
          touchMax: 4,
          mouse: 4,
          pen: 4,
          hasPoint: 1,
        },
      });
   
      pboard.manipulation=true
      this.allPoints.push(pboard);
      this.pxline.push(pboard);
      // Si hay dos puntos en pxline, crea una línea
      if (this.pxline.length == 2) {
        this.validateStatus = false
        lnP = this.createLine( {
          type: "line",ref:`line_tagent_${this.countLinesOnClick}`, params: this.pxline, style: {
            // strokeColor: "orange", // Color de la línea
            strokeWidth: 4,
            straightLast: false,
            straightFirst: false,
            lastArrow: false, // Sin flecha al final de la línea
            color: "#0aa1dd",
            highlight: false
          }
        })
        lnP.manipulation=true
        this.countLinesOnClick++
        lnP.point1.on("drag",(event)=>{
          this.iniciarTimer(event);
          this.validateStatus = false
        })
        lnP.point2.on("drag",(event)=>{
          this.iniciarTimer(event);
          this.validateStatus = false
        })
        createInpForPnt||withMathfield?(
          
          this.pxline.forEach(p=>{
            p.on("down",()=>this.createInputBelowPoint(p,this.defBoard.maxMathfield,lnP))
          })
        ):null
        
        this.pxline = [];  // Reinicia la lista para empezar con los siguientes puntos
        lnP.manipulation=true
        this.allEventsForReturn.push(lnP)
      }
      this.allPoints.push(pboard);
      this.pointsInter.push(pboard);
      this.segmentInteraction()
    }
  }
  doesLineExist(point1, point2) {
    return this.allSegments.some(line =>
      (line.point1 === point1 && line.point2 === point2) ||
      (line.point1 === point2 && line.point2 === point1)
    );
  }
  setupLineDeletion(line) {
    line.setAttribute({visible:false})
    line.remove()  
  }
  resetClickedPoints() {
    this.selectPoints.forEach(point => {
      point.setAttribute({ strokeColor: this.color.points.color, size: point.originalSize });
    });
    this.selectPoints = [];
    this.getStartAndEndPoints();
    
  }
  getStartAndEndPoints() {
    const startEndPoints = this.allSegments.map(segment => {
      const point1Name = segment.point1.name;
      const point2Name = segment.point2.name;
      const [startX, startY] = segment.point1.coords.usrCoords.slice(1);
      const [endX, endY] = segment.point2.coords.usrCoords.slice(1);
      return {
        start: { name: point1Name, x: startX, y: startY },
        end: { name: point2Name, x: endX, y: endY }
      };
    });
    return startEndPoints;
  }
  resetAllLines() {
    this.allLines = this.allLines.filter(line => {
      if (line.manipulation) {
        this.setupLineDeletion(line)
        return false;
      }
      return true;
    });
    this.pointsInter = []
    this.pxline = []
    this.countLinesOnClick = 0


  }
  resetAllCircles() {
    this.allCircle = this.allCircle.filter(circle => {
      if (circle.manipulation) {
        this.board.removeObject(circle);
        return false;
      }
      return true;
    });
    
    this.compass?this.compass.indexColorCircle = 0:null
  }
  resetAllPoints() {
    this.resetClickedPoints()
    this.allPoints = this.allPoints.filter(point => {
      point.setAttribute({size:point.originalSize})
      if (point.manipulation) {      
        this.board.removeObject(point);
        return false;
      }
      return true;
    });
  }
  resetAllSegments() {
    this.allSegments = this.allSegments.filter(segment => {
      if (segment.manipulation) {
        this.setupLineDeletion(segment)
        return false;
      }
      return true;
    });
  }
  resetForms() {
    this.formS?.forEach(form => {
      form.checkedInputs = []
      form.childNodes.forEach(label => {
        if (label.tagName == "LABEL") {
          label?.classList?.remove("checkTable")
          label?.classList?.remove("passInLibrary");
          label?.classList?.remove("failedInLibrary");
          label.firstElementChild.value = "";
          label.firstElementChild.checked = false
        }
      })
    })
  }
  resetAllInputs() {
      this.inputsBoards.forEach(input => {
        this.board.removeObject(input.newInput);
        this.board.removeObject(input.newInput);
      })
      this.inputsBoards = []

      this.entrisModifid.forEach((entrada) => {
    
        if (entrada.tagName == "SELECT") {
          entrada.selectedIndex = 0
        } else {
  
  
          if(entrada.inputsInteractive){
                entrada.setAttribute("disabled", "")
                entrada.classList.replace("inputLittle", "inputLittle-transparent")
          }
  
          entrada.value = "";
        }
        entrada?.classList?.remove("passInLibrary");
        entrada?.classList?.remove("failedInLibrary");
      });
      

  }
  resetMain() {
    this.isSegmentButtonActive = false;
    this.isCompassButtonActive = true;
    this.interactiveB = this.htmlNode.querySelector("#pbutton");   
    this.pointsInBoard = 0
    
    this.interactiveB.style.backgroundColor = "#fff"; // Color original cuando está desactivado
    this.segmentButton = this.htmlNode.querySelector("#myButton");
    if (this.segmentButton) {
       this.segmentButton.style.backgroundColor = "#fff";
    }

    this.resetAllCircles();
    this.resetAllPoints();
    this.resetAllLines();
    this.resetAllSegments();
    this.resetForms();
    this.resetAllInputs();
    this.resetClickedPoints()
    this.getStartAndEndPoints()
  }
  returnMain() {
    const trash = this.allEventsForReturn.pop();

    if (!trash) return;

    if (trash.newInput) {
      this.inputsBoards = this.inputsBoards.filter(input => input !== trash.mathfield);
      this.MathFieldGenerate = this.MathFieldGenerate.filter(math => math !== trash.mathfield);
      this.board.removeObject(trash.newInput.rendNode);
      this.board.removeObject(trash.newInput);
      trash.mathfield.basePoint = null;
    } else if (trash.elType === "line") {
      this.setupLineDeletion(trash);
      this.allSegments = this.allSegments.filter(segment => segment !== trash);
      this.allLines = this.allLines.filter(line => line !== trash);
      this.countLinesOnClick = this.countLinesOnClick-1
      trash.inherits.forEach(e => {
          if (trash.ref.includes("line_tagent")) {
            e.remove();
            this.pointsInter = this.pointsInter.filter(a => a !== e);
          }
        });
    } else if (trash.elType === "circle") {
      this.compass.deleteCircle(trash);
    }

    this.entrisModifid = this.entrisModifid.filter(entrada => entrada !== trash);
    this.board.update();
  }
}
