class EngineDiagrama extends NodeHtml {
  constructor(def) {
    super();
    this.boundingbox = def.boundingbox ?? [-7, 7, 7, -9.5],
    this.radio = def.radio,
    this.conditions = def.conditions;
    this.artifacts = def.artifacts;
    this.point= def.point
   this.superiorInput= def.superiorInput
    this.lastInput = def.lastInput
    this.small = def.small
   this.subInputType= def.subInputType
   this.subOperation= def.subOperation
    this.valueDefaults = def.valuesDefault;
    this.inputsValidate = [];
    this.validation = new ValidationDiagrama();
    this.idTemplate = def.tmp;
    this.entris2 = [];
    this.styleDefaul={
      lines:{
        color: "#217e9d", 

      },
    
    };
    this.def = def;
  
  }
  templateInsert = () => {
    
    if (!document.querySelector("#tmp")&&this.def.tmp == "tmp") {
      const tmp1 = ` <template id="tmp">
      <div class="artifact-base artifact-min " >
        <div class="boards boards-min "></div>
  
        <div class="all-btn w-100 border-board-dark">
          <div class="btn-base border-dark rounded">
            <div class="sectionBtn interactive-btn"> </div>
            <div class="sectionBtn default-btn gap-2">
              <button class="reset styleBtn buttonSecundary buttonKey " title="Reset"></button>
              <button class="check styleBtn buttonPrimary buttonKey " title="Validar"></button>
            </div>
          </div>
        </div>
  
      </div>
    </template>`;
    !this.tmp1?document.body.insertAdjacentHTML('afterend', tmp1):null
    this.tmp1 ??= tmp1;
    }else if (!document.getElementById("tmp2")&&this.def.tmp == "tmp2") {

      const tmp2 = `<template id="tmp2">
      <div class="artifact-base artifact-min-double artifact-Big">
            <div class="opContainerBottom"><p class="answer">Operación: <b class="topOperation"></b></p></div>

        <div class="boards board-double"></div>
       <div class="brtop">
       <p class="textMarginRl textMarge textMarginR2 textMarginR3 textMarginR4">
         ¿Dio el mismo resultado?
         </p> 
     </div>

     <div class="brtop ">
       <p class="textMarginRl selectDia">

         Entonces: 
       </p>
       

     </div>

     <div class="brtop">
       <p class="textMarginRl selectGrama">
         La Operación:

       </p>
     </div>  
        <div class="all-btn w-100 border-board-dark">
          <div class="btn-base border-dark rounded">
            <div class="sectionBtn interactive-btn"> </div>
            <div class="sectionBtn default-btn gap-2">
              <button class="reset styleBtn buttonSecundary buttonKey" title="Reset"></button>
              <button class="check styleBtn buttonPrimary buttonKey" title="Validar"></button>
            </div>
          </div>
        </div>
  
      </div>
    </template>`;
    !this.tmp2?document.body.insertAdjacentHTML('afterend', tmp2):null;
    this.tmp2 ??= tmp2
    }else if (!document.getElementById("tmp3")&&this.def.tmp == "tmp3") {
    const tmp3 = ` <template id="tmp3">
      <div class="artifact-base artifact-min">
        <div class="boards boards-min "></div>
        <div class="opContainerTop"><p class="answer"><b class="topOperation"></b></p></div>

        <div class="all-btn w-100 border-board-dark" style="display: none;">

          </div>
        </div>
  
      </div>
    </template>`;
    !this.tmp3?document.body.insertAdjacentHTML('afterend', tmp3):null
    this.tmp3 ??= tmp3;
    }

    this.htmlNode ??= document.querySelector(`#${this.idTemplate}`)?.content.firstElementChild?.cloneNode(true);

    //this.htmlNode = this.tmp?.content?.firstElementChild?.cloneNode(true)
    return this.htmlNode;
  };

  resetMain() {
    this.formS.forEach(form=>{
      form.checkedInputs = []
      form.childNodes.forEach(label=>{
        label?.classList?.remove("checkTable")
        label?.classList?.remove("passInLibrary");
        label?.classList?.remove("failedInLibrary");
        label.firstElementChild.value = "";
        label.firstElementChild.checked = false
      })
    })
    this.entrisModifid.forEach((entrada) => {
      
      if (entrada.tagName=="SELECT") {
        entrada.selectedIndex = 0
        entrada.classList?.remove("passInLibrary");
        entrada.classList?.remove("failedInLibrary");
      }else{
        entrada.value = "";
      }
      entrada?.fatherBg?.classList?.remove("passInLibrary");
      entrada?.fatherBg?.classList?.remove("failedInLibrary");
    });
    this.entrisModifid = []
    this.entrisModifid = [...this.entris]
  }

  initEngine() {

    this.tmp = document?.querySelector(`#${this.idTemplate}`);
    this.contentBoards = this.htmlNode?.querySelector(".boards");
    this.content = document?.querySelector("body");

    this.initTimer(this.htmlNode);

    if (this.valueDefaults) {
      this.valueDefaults.forEach((value) => {
        this.boardTypes(value.type, value);

        let board = document.createElement("div");

        if (this.def?.class){
          board.classList.add('boards-base', "board-min");
        }else {
          board.classList.add('boards-base', "board-min");
        }

        board.id = value.id;
        // board.classList.add('boards-base', "board-min", 'utils', 'default-border');
        this.contentBoards.appendChild(board);
        board = JXG.JSXGraph.initBoard(value.id, {
          showcopyright: false,
          shownavigation: false,
          boundingbox: this.boundingbox ?? [-7, 7, 7, -9.5],
          pan: {
            enabled: false, // Allow panning
            needTwoFingers: true, // panning is done with two fingers on touch devices
            needShift: true, // mouse panning needs pressing of the shift key
          },
          zoom: {
            needShift: false,
            pinchHorizontal: false,
            pinchVertical: false,
            pinchSensitivity: 0,
            min: 1000,
            max: 0,
            factorX: 0,
            factorY: 0,
            wheel: false,
          },
        });

        this.board = board;

        this.lines.forEach((element) => {
          if (Array.isArray(element)) {
            this.linesPoint(element, {}, board);
          } else {
            this.linesPoint(element.position, element.styles, board);
          }
        });

        this.array.forEach((element) => {
          //destructurado
          const { x, y, value, inputType } = element;
          //aqui
          //agrega a loss inputs a validar
          this.inputsValidate.push(...this.defineInput(x, y, value, inputType));
        });
      });
      
    }
    if(this.def.point){
        this.textSVG()
    }
    if (this.def.optionsToSelect) {
      this.contentSelect = this.htmlNode?.querySelector(".selectDia");
      this.contentSelect2 = this.htmlNode?.querySelector(".selectGrama");
      let selectD = this.createSelect({
        style: {
          select: "selectOperacion",

        },
        valueOption: this.def.optionsToSelect

      });
      let selectF = this.createSelect({
        style: {
          select: "selectOperacion",

        },
          valueOption: this.def.optionsToSelect2,
      });

      this.contentSelect?.appendChild(selectD);
      this.contentSelect2?.appendChild(selectF);
    }
    if(this.def.textContent){
      this.contentText = this.htmlNode?.querySelector(".selectDia");
      this.contentText2 = this.htmlNode?.querySelector(".selectGrama");

      let textA = this.createTopParagraph({
        style: {
          content: this.def.textContent,
       
        },
      });
      let textB = this.createTopParagraph({
        style: {
          content: this.def.textContentB,
        
        },
      });

      this.contentText?.appendChild(textA);
      this.contentText2?.appendChild(textB);
    }
    if (this.def.operacion) {
      this.contentUpperText = this.htmlNode?.querySelector('.topOperation')
    
      let topParagraph = this.createTopParagraph({
        style: {
          content: this.def.operacion,
        },
      });

  this.contentUpperText?.appendChild(topParagraph)
    }
    if (this.def.radio) {
      const contenedorInputs = this.htmlNode.querySelector(".brtop")
      const checksParams = {
        tag:"inputs",maxElementCheck:1,inputs:[
        
        {style:{input:"inputTableCheck"},value:{label:"Si",input:""}},
        {style:{input:"inputTableCheck"},value:{label:"No",input:""},correctResponce:true},
      ]}

      let form = this.createForm({
        formStyle: "formDiagrama",
        formId:1
      })
      form.dataset.maxElementCheck = checksParams.maxElementCheck
      form.checkedInputs = []
      let checks = { id: form.id, checks: [] }
      
      const checkDisable= this.def.checkDisable??false
      checksParams.inputs.forEach((e, i) => {
        let input = this.createInput({
          style: `${e.style.input ?? "inputPointForm"}`,
          iterator_A: i,
          type: "checkbox",
          value: e.value.input,
          readOnly: "none"
        })
        input.change = true
        input.correctResponce = e.correctResponce ?? false


        if (checkDisable) { 
          console.log('entro');
          
       
          input.classList.remove('actionTableLabel'); 
          input.style.pointerEvents = 'none';  
          input.disabled = true;  
      
          const labels = document.querySelectorAll('.actionTableLabel');
          labels.forEach(label => {
              label.style.pointerEvents = 'none';
          });
      }

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
      contenedorInputs.appendChild(form)
      this.formS.push(form)

    } 

    this.entrisModifid = [...this.entris]
    this.mathfieldEventsAndLayauts(this.entrisModifid)
  }
 
  boardTypes(inputType = 1, valueDefault) {
    const {
      valueA,
      valueB,
      valueC,
      valueD,
      valueE,
      valueF,
      operador1,
      operador2,

    } = valueDefault;
   
 
    //dejalo quieto
    switch (inputType) {
      case 1:
        this.lines = [
          {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [5, 3],
              [5, -4.2],
            ],
          },
          {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [-0, 1.5],
              [-0, 3],
            ],
          },
          {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [-5, 1.5],
            [-0, 1.5],
            ],
          },
          {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [-2.5, -4.2],
              [5, -4.2],
            ],
          },
         
          {
            styles: { lastArrow: true, ...this.styleDefaul.lines },
            position: [
              [1.3, -4.2],
              [1.3, -5.7],
            ],
          },
          {
            styles: { lastArrow: true, ...this.styleDefaul.lines },
            position: [
              [-2.5, 1.5],
              [-2.5, -0],
            ],
          },
          {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [-5, 1.5],
              [-5, 3],
            ],
          },
          {
            styles: { 
              ...this.styleDefaul.lines},
            position:  [
              [-2.5, -4.2],
              [-2.5, -2.7],
            ],
          },
        ];

        this.array = [
          { x: -5, y: 4.6, value: valueA },
          { x: 0, y: 4.6, value: valueB },
          { x: -2.5, y: 2.7, value: operador1, inputType: 2 },
          { x: 5, y: 4.6, value: valueC },
          { x: -2.5, y: -1.6, value: valueD, inputType: this.subInputType },
          { x: 1.3, y: -3, value: operador2, inputType: 2 },
          { x: 1.3, y: -7.3, value: valueE, inputType: this.subInputType},
          this.superiorInput ? { x: 0, y: 8, value: valueF, inputType: 4} : undefined
        ].filter(element => element !== undefined);

        break;
      case 2:
        this.lines = [
          {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [5, 3],
              [5, 1.5],
            ],
          },
          {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [-0.4, 1.5],
              [-0.4, 3],
            ],
          },
          {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [-0.4, 1.5],
              [5, 1.5],
            ],
          },
          {
            styles: { 
              ...this.styleDefaul.lines},
            position:  [
              [-5, -4.2],
              [2.3, -4.2],
            ],
          },
         
          {
            styles: { lastArrow: true,  ...this.styleDefaul.lines },
            position: [
              [-1.3, -4.2],
              [-1.3, -5.7],
            ],
          },
          {
            styles: { lastArrow: true,   ...this.styleDefaul.lines },
            position: [
              [2.3, 1.5],
              [2.3, -0],
            ],
          },
          {
            styles: { 
              ...this.styleDefaul.lines},
            position:[
              [-5, 3],
              [-5, -4.2],
            ],
          },
          {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [2.3, -4.2],
              [2.3, -2.7],
            ],
          },

        ];
        this.array = [
          { x: -5, y: 4.6, value: valueA },
          { x: -0.4, y: 4.6, value: valueB },
          { x: 2.3, y: 2.7, value: operador1, inputType: 2 },
          { x: 5, y: 4.6, value: valueC },
          { x: 2.3, y: -1.6, value: valueD, inputType: this.subInputType },
          { x: -1.3, y: -3, value: operador2, inputType: 2 },
          { x: -1.3, y: -7.3, value: valueE, inputType: this.subInputType },
          this.superiorInput ? { x: 0, y: 8, value: valueF, inputType: 4} : undefined
        ].filter(element => element !== undefined);

        break;
      case 3:
        this.lines = [
          
         this.small == true ? {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [-3.2, 4.5],
              [-3.2, 1.8],
            ],
          } :  {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [-3.2, 2.8],
              [-3.2, 0.8],
            ],

          },
         
         this.small == true ? {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [3.2, 4.5],
              [3.2, 1.8],
            ],
          } : {
              styles: { 
              ...this.styleDefaul.lines},
            position: [
              [3.2, 2.8],
              [3.2, 0.8],
            ],

            }, this.small == true ? {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [-3.2, 1.8],
              [3.2, 1.8],
            ],
          } :  {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [-3.2, 0.8],
              [3.2, 0.8],
            ],

          },
          
         this.small == true ? {
            styles: { 
              lastArrow: true,
              ...this.styleDefaul.lines},
            position: [
              [0, 1.8],
              [0, 0.3],
            ],
          } : {
            styles: { 
              lastArrow: true,
              ...this.styleDefaul.lines},
            position: [
              [0, 0.8],
              [0, -1.0],
            ],
          },
          this.lastInput == true ? {
            styles: { 
              lastArrow: true,
              ...this.styleDefaul.lines},
            position: [
              [0, -3.5],
              [0, -5.6],
            ],
          } : undefined,

        ].filter(element => element !== undefined);
        this.array = [

        this.small == true ? { x: -3.2, y: 5.4, value: valueA } : { x: -3.2, y: 4.4, value: valueA },
        this.small == true ? { x: 3.2, y: 5.4, value: valueB } : { x: 3.2, y: 4.4, value: valueB },
        this.small == true ? { x: 0, y: 3, value: operador1, inputType: 2 } : { x: 0, y: 2, value: operador1, inputType: 2 },
        this.small == true ? { x: 0, y: -1.1, value: valueC, inputType: this.subInputType } : { x: 0, y: -2.3, value: valueC, inputType: this.subInputType },
        this.lastInput == true ? { x: 0, y: -7.4, value: valueD } : undefined,
        ].filter(element => element !== undefined);
        break;
      case 4:
        this.lines = [
          {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [-3.2, 4],
              [-3.2, 1.8],
            ],
          },
          {
            styles: { 
              ...this.styleDefaul.lines},
            position: [
              [-3.2, 4],
              [-3.2, 1.8],
            ],
          },
          {
            styles: { 
              ...this.styleDefaul.lines},
            position:  [
              [3.2, 4],
              [3.2, 1.8],
            ],
          },
          {
            styles: { 
              ...this.styleDefaul.lines},
            position:   [
              [-3.2, 1.8],
              [3.2, 1.8],
            ],
          },
         /// Intentando hacer el Z-INDEX 
          {
            styles: { lastArrow: true, ...this.styleDefaul.lines },
            position: [
              [0, 1.8],
              [0, 0.8],
            ],
          },
          {
            styles: { lastArrow: true, ...this.styleDefaul.lines },
            position: [
              [0, -2.5],
              [0, -1.5],
            ],
          },
          {
            styles: { lastArrow: true, ...this.styleDefaul.lines },
            position: [
              [1.5, 7],
               [2.2, 6],
            ],
          },
          {
            styles: { lastArrow: true, ...this.styleDefaul.lines },
            position: [
              [-1.5, 7],
               [-2.2, 6],
            ],
          },

        ];
        this.array = [
          { x: -3.2, y: 5.1, value: valueA },
          { x: 3.2, y: 5.1, value: valueB },
          this.subOperation ? { x: 0, y: 4.1, value: this.subOperation, inputType: 2 } : undefined,
          { x: 0, y: 3, value: operador1, inputType: 2 },
          { x: 0, y: -0.5, value: valueC },

        ].filter(element => element !== undefined);
        break;
        case 5:
          this.lines = [
            {
              styles: { 
                ...this.styleDefaul.lines},
              position: [
                [5, 3],
                [5, 1.5],
              ],
            },
            {
              styles: { 
                ...this.styleDefaul.lines},
              position: [
                [-0.4, 1.5],
                [-0.4, 3],
              ],
            },
            {
              styles: { 
                ...this.styleDefaul.lines},
              position: [
                [-0.4, 1.5],
                [5, 1.5],
              ],
            },
            {
              styles: { 
                ...this.styleDefaul.lines},
              position:  [
                [-5, -4.2],
                [2.3, -4.2],
              ],
            },
           
            {
              styles: { lastArrow: true,  ...this.styleDefaul.lines },
              position: [
                [-1.3, -4.2],
                [-1.3, -5.7],
              ],
            },
            {
              styles: { lastArrow: true,   ...this.styleDefaul.lines },
              position: [
                [2.3, 1.5],
                [2.3, -0],
              ],
            },/*eyey*/ 
            {
              styles: { lastArrow: true,  ...this.styleDefaul.lines },
              position: [
                [3, -7],
                [0.4, -7],
              ],
            },
            {
              styles: { lastArrow: true,   ...this.styleDefaul.lines },
              position: [
                [5.8, -3],
                [5.8, 3],
              ],
            },/**/ 
            {
              styles: { 
                ...this.styleDefaul.lines},
              position:[
                [-5, 3],
                [-5, -4.2],
              ],
            },
            {
              styles: { 
                ...this.styleDefaul.lines},
              position: [
                [2.3, -4.2],
                [2.3, -2.7],
              ],
            },
  
          ];
          this.array = [
            { x: -5, y: 4.6, value: valueA },
            { x: -0.4, y: 4.6, value: valueB },
            { x: 2.3, y: 2.7, value: operador1, inputType: 2 },
            { x: 5, y: 4.6, value: valueC },
            { x: 2.3, y: -1.6, value: valueD, inputType: this.subInputType },
            { x: -1.3, y: -3, value: operador2, inputType: 2 },
            { x: -1.3, y: -7.3, value: valueE, inputType: this.subInputType },
            this.superiorInput ? { x: 0, y: 8, value: valueF, inputType: 4} : undefined
          ].filter(element => element !== undefined);
  
          break;
      //si
      default:
        break;
    }
    
  }

  linesPoint(position, style, board) {
    
    board.create("line", position, {
      strokecolor: "blue",
      strokeWidth: 2,
      straightFirst: false,
      straightLast: false,
      fixed: true,
      highlight: false,
      ...style,
    });
  }
  //aqui
  defineInput(x, y, text, inputType = 1) {
    /* toma las caracteristicas por input individual retorna un array */
    return this.createInputs({
      inputs: [
        {
          x,
          y,
          value: text,
          style: {
            disabled: (text !== '' && text?.style?.disabled != false || this.conditions?.keyBoard),
            mathClass:
              (inputType == 1 ? `inputCircle` : inputType == 2 ? `inputSquare` : inputType == 3 ? `inputXpansion` : inputType == 4 ? `inputFormula` : `inputForText`) + (text !== " " ? " " : " show"),
              
          },
        },
      ],
    });
  }

  createRadio(params) {
    let radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.classList = params.style.select;
    radio.id = params.style.val;
    radio.value = params.style.val;
    radio.name = params.style.name;
    radio.disabled = params.style.disabled;
    radio.addEventListener('click', () => {
      radio.classList.add('regularColor')
    })
 
    this.entris2.push(radio);
   
    return radio;
  }

  createTopParagraph(params) {
    let topParagraph = document.createElement("p");
    topParagraph.classList.add('answer')
    topParagraph.textContent = params.style?.content;
    if(this.def.textContent){
      topParagraph.classList.remove('answer')
      topParagraph.classList.add('textSelect')
      topParagraph.textContent = params.style?.content;

    }
    return topParagraph;
  }

}
