class EngineEscalas extends NodeHtml {
  constructor(def, defBoard) {
    super(defBoard);
    this.board = null
    this.defBoard = defBoard;
    this.idTemplate = 'tmpPoint';
    this.conditions = def.conditions;
    this.def = { ...def };
    this.idboard = def.name + "_board";
    this.htmlNode = null;
    this.contenedorInputs = null
    this.defboardType(this.defBoard);
    this.validation = new EscalasValidate()
    this.allInputs = []
    this.inputsInteractive = []
    this.semicircleSimpleActiveTop = false
    this.semicircleSimpleActiveBelow = false
    this.semicircleDashActiveTop = false
    this.semicircleDashActiveBelow = false
    this.curveActiveTwist = false
    this.validationItems = { curveValidation: [], simplifiedPathCurve: [] }
    this.point = def.point
    this.shapes = this.defBoard.shapes;
    this.point_select = [];
    this.inputsBoards = [];
    this.MathFieldGenerate = [];
    this.pointsReset = [];
    this.boardsCurveValidation = {};
    this.inputsCurves = []
    this.mainBtnsCurvesActive = false
    this.interactiveFigures=[]



  }
  templateInsert = () => {
    if (!document.querySelector("#tmpPoint")) {
      const $templateDefaults = `<template id="tmpPoint">      
            <div class="artifact-base artifact-Big">
              <div id="contentInputBoard">
                    <div id="jsxbox" class="bordeEscala" border-board-dark"></div>
                    <div class="contentInputs"></div>
              </div>

                    <div class="all-btn border-board-dark">
                    <div class="btn-base border-dark rounded">
                        <div class="sectionBtn interactive-btn"> </div>

                        <div class="sectionBtn default-btn gap-2">
                        <button id="buttonMainCurves" class=" styleBtn buttonMainCurves buttonKey OpenMainCurves" title="Curvas"></button>
                        <button class="return styleBtn buttonSecundary buttonKey" title="Deshacer"></button>
                        <button class="reset styleBtn buttonSecundary buttonKey" title="Resetear"></button>
                        <button class="check styleBtn buttonPrimary buttonKey" title="Validar"></button>
                        </div>

                        
                        <div id="curvesOptions" class="curves-options">
                  
                       </div>
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
    this.BoardContent = this.htmlNode.querySelector("#jsxbox")
    this.inputBoardContent = this.htmlNode.querySelector("#contentInputBoard")
    this.inputBoardContent.classList.add(this.defBoard.contentBoardInputClass)
    this.BoardContent.id = this.idboard
    this.BoardContent.classList.add(this.defBoard.classPoint ?? "BoardContent")
    this.contenedorInputs = this.htmlNode.querySelector(".contentInputs")

    if(!this?.defBoard?.arches_click){
      const buttonMenu = this.htmlNode.querySelector("#buttonMainCurves")
      buttonMenu.style.display = "none"
    }

    if(!this.def?.return){
      const buttonReturn = this.htmlNode.querySelector(".return")
      buttonReturn.style.display = "none"

    }

    

    this.defBoard.contenedorInputs ? this.contenedorInputs.classList.add(this.defBoard.contenedorInputs) : ""

    if (this.initBoardBase({ id: this.idboard, ...this.defBoard })) {
      // creacion de shapes en caso de nesesidad
      this.shapes ? this.shapes.forEach((shape, i) => {
        this.shape = shape;
        this.createShapes(shape);

        shape?.pointsExtents ? this.createExtruture(shape.pointsExtents) : null

      }) : null

      if (this.def.inputs) {
        this.def.inputs.forEach((tag, i) => {
          if (tag.tag == "input") {
            let input = this.createInput({
              type: "text",
              style: `${tag.style ?? "inputPoint"}`,
              iterator_A: i,
              value: tag.value,
              readOnly: "none"
            })
            input.fatherBg = input.parentElement
            this.contenedorInputs.appendChild(input)
          } else if (tag.tag == "select") {
            let select = this.createSelect({
              style: {
                select: `${tag.style ?? "selectPoint"}`
              },
              valueOption: tag.default
            });
            select.fatherBg = select
            this.contenedorInputs.appendChild(select)
          } else if (tag.tag == "inputs") {
            let form = this.createForm({
              formStyle: `${tag?.style?.form ?? "formEscalas"}`,
              formId: i
            })


            form.dataset.maxElementCheck = tag.maxElementCheck
            form.checkedInputs = []
            let checks = { id: form.id, checks: [] }
            tag.inputs.forEach((e, i) => {
              let input = this.createInput({
                style: `${e.style.input ?? "inputPointForm"}`,
                iterator_A: i,
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
            this.contenedorInputs.appendChild(form)
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
                    select: e?.style?.select ?? "select"
                  },
                  valueOption: e?.default
                }) : null

                if (math) {
                  span.appendChild(math)
                } else if (select) {
                  span.appendChild(select)
                }

                form.appendChild(span)
              })
            } else if (tag.selects) {
              tag.selects.forEach(e => {
                let tag = this.createSelect({
                  style: {
                    select: e?.style?.select ?? "select"
                  },
                  valueOption: e?.default
                });
                tag.fatherBg = tag.parentElement
                if (e?.text?.span) {
                  let span = this.createSpan({
                    SpanStyle: `${e?.style.span ?? "spanMathfiled"} `,
                    SpanText: e?.text.span
                  })
                  span.appendChild(tag)
                  form.appendChild(span)
                } else {
                  e.parent ? form.querySelector(`.${e.parent}, #${e.parent}`).appendChild(tag) : form.appendChild(tag)
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

            this.contenedorInputs.appendChild(mathfield)
          }
        });

      }
    }

    if (this.def.point) {
      this.textSVG()
    }

    this.createInputPoint(this.defBoard?.points);

    if (this.def.downPoint) {

      this.createInputPointActive(this.points, this.def)
      this.allInputsCreate.forEach(e => {
        if (e.value == "") {
          this.entris.push(e)

        }
      })


    }
    if (this.def.enableInput) {
      // obtengo los inputs que necesitaré para la validación
      this.def?.enableInput?.map(index => {
        const input = this.allInputsCreate[index]

        if (input == undefined) {
          return

        }

        if (input.value !== "") {
          input.addValue = true
        } else {
          input.inputsInteractive = false
        }
        this.entris.push(input)

        return input
      });
      this.enableInput(this.points)
    }

    this.createExtruture()
    
    if (this.def.board.points_arches) { this.createArches(this.def.board.points_arches) }

    this.UX.createAlertInteraction(this)
    this.entrisModifid = [...this.entris]
    this.initTimer(this.hmlNode);
    this.mathfieldEventsAndLayauts(this.entrisModifid)


  }

  setupCurvesButton(){
    this.btnSectionInteractive = this.htmlNode.querySelector("#curvesOptions");


    if(this.mainBtnsCurvesActive){
      this.btnSectionInteractive.style.display = "flex"
    }else{
      if (this.defBoard?.arches_click) {
      
        const { semicircleSimpleTop, semicircleSimpleBelow, semicircleDashTop, semicircleDashBelow, curveflip } = this.defBoard.arches_click
    
        this.btnSectionInteractive.style.display = "flex"

        let btn_semicircleSimpleTop
        let btn_semicircleSimpleBelow
        let btn_semicircleDashTop
        let btn_semicircleDashBelow
        let curveflipBtn
    
        let allBtns = []
    
        const DesactiveEvents = (button = null) => {
    
    
    
          this.points.forEach(point => {
            point.off('down');
            point.downPoint = false;
            point.eventEvaluate = "";
    
    
            allBtns.forEach(btn => {
              if (button?.id !== btn.id) {
    
                // Filtrar las clases que contienen "active"
                const removeClasses = Array.from(btn.classList).filter(clas => clas.includes("active"));
    
    
                // Eliminar la clase "checkActionButton"
                btn.classList.remove("checkActionButton");
                this[btn.evaluationBolean] = false;
    
                // Eliminar las clases encontradas
                removeClasses.forEach(clas => {
                  if (clas) { // Verifica que la clase no esté vacía antes de intentar eliminarla
                    btn.classList.remove(clas);
                  }
                });
              }
            })
    
    
    
    
    
          });
        }
    
    
    
        // BOTON SEMICIRCLESIMPLETOP
        if (semicircleSimpleTop) {
    
          btn_semicircleSimpleTop = document.createElement("button");
          btn_semicircleSimpleTop.className = "btnSemicircle buttonKey btn_semicircleSimpleTop";
          btn_semicircleSimpleTop.id = "btn_semicircleSimpleTop"
          this.btnSectionInteractive.appendChild(btn_semicircleSimpleTop);
    
    
          btn_semicircleSimpleTop.addEventListener("click", () => {
            DesactiveEvents(btn_semicircleSimpleTop)
    
            if (!this.semicircleSimpleActiveTop) {
              this.semicircleSimpleActiveTop = true
              this.buttonArches({
                points: this.points,
                heigth: semicircleSimpleTop?.heigth,
                propertyEvaluate: this.semicircleSimpleActiveTop,
                typeCurve: btn_semicircleSimpleTop.id,
                typeDirection:"Top"
              })
              btn_semicircleSimpleTop.classList.add("checkActionButton", "btn_semicircleSimpleTop-active")
            } else {
              DesactiveEvents()
            }
          })
          btn_semicircleSimpleTop.evaluationBolean = "semicircleSimpleActiveTop"
          allBtns.push(btn_semicircleSimpleTop)
    
    
        }
        // BOTON SEMICIRCLEBELOW
        if (semicircleSimpleBelow) {
    
          btn_semicircleSimpleBelow = document.createElement("button");
          btn_semicircleSimpleBelow.classList.add("btnSemicircle", "buttonKey", "btn_semicircleSimpleBelow");
          btn_semicircleSimpleBelow.id = "btn_semicircleSimpleBelow"
          this.btnSectionInteractive.appendChild(btn_semicircleSimpleBelow);
    
    
    
          btn_semicircleSimpleBelow.addEventListener("click", () => {
            DesactiveEvents(btn_semicircleSimpleBelow)
            if (!this.semicircleSimpleActiveBelow) {
              this.semicircleSimpleActiveBelow = true
              this.buttonArches({
                points: this.points,
                heigth: semicircleSimpleBelow?.heigth ?? -1,
                propertyEvaluate: this.semicircleSimpleActiveBelow,
                typeCurve: btn_semicircleSimpleBelow.id,
                typeDirection:"Below"
              })
              btn_semicircleSimpleBelow.classList.add("checkActionButton", "btn_semicircleSimpleBelow-active")
            } else {
              DesactiveEvents()
            }
          })
          btn_semicircleSimpleBelow.evaluationBolean = "semicircleSimpleActiveBelow"
    
          allBtns.push(btn_semicircleSimpleBelow)
    
        }
        // BOTON SEMICIRCLEDASHTOP
        if (semicircleDashTop) {
    
          // se crea el boton
          btn_semicircleDashTop = document.createElement("div");
          btn_semicircleDashTop.classList.add("btnSemicircle", "buttonKey", "btn_semicircleDashTop");
          btn_semicircleDashTop.id = "btn_semicircleDashTop"
          this.btnSectionInteractive.appendChild(btn_semicircleDashTop);
    
          // Se llama la función del boton
          btn_semicircleDashTop.addEventListener("click", () => {
            DesactiveEvents(btn_semicircleDashTop)
            if (!this.semicircleDashActiveTop) {
              this.semicircleDashActiveTop = true
              this.buttonArches({
                points: this.points,
                heigth: semicircleDashTop.heigth ? semicircleDashTop?.heigth : 2.7,
                propertyEvaluate: this.semicircleDashActiveTop,
                dash: true,
                typeCurve: btn_semicircleDashTop.id,
                typeDirection:"Top"
              })
              btn_semicircleDashTop.classList.add("checkActionButton", "btn_semicircleDashTop-active")
    
            } else {
              DesactiveEvents()
    
            }
          })
          btn_semicircleDashTop.evaluationBolean = "semicircleDashActiveTop"
          allBtns.push(btn_semicircleDashTop)
        }
        // BOTON SEMICIRCLEDASHBELOW
        if (semicircleDashBelow) {
    
          // se crea el boton
          btn_semicircleDashBelow = document.createElement("div");
          btn_semicircleDashBelow.classList.add("btnSemicircle", "buttonKey", "btn_semicircleDashBelow");
          btn_semicircleDashBelow.id = "btn_semicircleDashBelow"
          this.btnSectionInteractive.appendChild(btn_semicircleDashBelow);
    
    
          // Se llama la función del boton
          btn_semicircleDashBelow.addEventListener("click", () => {
            DesactiveEvents(btn_semicircleDashBelow)
            if (!this.semicircleDashActiveBelow) {
              this.semicircleDashActiveBelow = true
              this.buttonArches({
                points: this.points,
                heigth: semicircleDashBelow?.heigth ?? -2.7,
                propertyEvaluate: this.semicircleDashActiveBelow,
                dash: true,
                typeCurve: btn_semicircleDashBelow.id,
                typeDirection:"Below"
              })
              btn_semicircleDashBelow.classList.add("checkActionButton", "btn_semicircleDashBelow-active")
            } else {
              DesactiveEvents()
    
            }
          })
          btn_semicircleDashBelow.evaluationBolean = "semicircleDashActiveBelow"
          allBtns.push(btn_semicircleDashBelow)
    
    
    
    
    
    
        }
        if (curveflip) {
          curveflipBtn = document.createElement("button");
          curveflipBtn.classList.add("btnSemicircle", "buttonKey", "btn_curveflipBtn");
          curveflipBtn.id = "curveflipBtn";
          this.btnSectionInteractive.appendChild(curveflipBtn)
    
          curveflipBtn.addEventListener("click", () => {
            DesactiveEvents(curveflipBtn)
            if (!this.curveActiveTwist) {
              this.curveActiveTwist = true
              curveflipBtn.classList.add("checkActionButton", "btn_curveflipBtn-active")
            } else {
              DesactiveEvents()
            }
          })
          curveflipBtn.evaluationBolean = "curveActiveTwist"
          allBtns.push(curveflipBtn)
    
    
        }

        const closedMainCurves = document.createElement("button")
        closedMainCurves.className = "styleBtn buttonMainCurves buttonKey closedSvg"
        closedMainCurves.addEventListener("click",(()=>{
          this.btnSectionInteractive.style.display = "none"
        }))
        this.btnSectionInteractive.appendChild(closedMainCurves)
        this.mainBtnsCurvesActive = true


        
      }
    }

    
    
  }
  defboardType(defBoard) {

    if (!defBoard.styles) {

      if (Array.isArray(defBoard.type)) {
        if (defBoard.type.length < 2) {
          console.error("Para utilizar el type multiple. La definicion debe tener al menos dos elementos");
          return;
        }

        // Definición de estilos comunes
        const commonStyles = {
          axies: {
            y: { visible: false },
            x: { visible: false }
          }
        };

        // Determinar el tipo de tablero y los estilos según la longitud de defBoard.type
        if (defBoard.type.length == 3) {
          this.defBoard.classPoint = "BoardTriple";
          this.typeBoard = this.defBoard.styles = {
            boundingbox: this.defBoard.boundingbox ?? [-30, 10, 30, -10],
            ...commonStyles
          };
        } else if (defBoard.type.length == 2) {
          this.defBoard.classPoint = "BoardDouble";
          this.typeBoard = this.defBoard.styles = {
            boundingbox: this.defBoard.boundingbox ?? [-30, 6.5, 30, -6.5],
            ...commonStyles
          };
        } else {
          this.defBoard.classPoint = "BoardMultiple";
          this.typeBoard = this.defBoard.styles = {
            boundingbox: this.defBoard.boundingbox ?? [-30, 13.9, 30, -13.9],
            ...commonStyles
          };
        }
        this.defBoard.contentBoardInputClass = "classContentBoardInputBoardColunm"



        // Crear la estructura después de definir los estilos
        this.createExtruture();
        return this.typeBoard;

      } else if (defBoard.type == 1) {
        this.typeBoard = this.defBoard.styles = {
          boundingbox: this.defBoard.boundingbox ?? [-10, 6, 0, -10],
          axies: {
            y: { visible: false },
            x: {
              ticks: {
                visible: false
              }
            }
          }
        },
          this.defBoard.classPoint = "BoardContent2"


        return this.typeBoard;


      } else if (defBoard.type == 2) {
        this.typeBoard = this.defBoard.styles = {
          boundingbox: this.defBoard.boundingbox ?? [-10, 10, 0, -10],
          axies: {
            y: { visible: false },
            x: {
              ticks: {
                visible: false
              }
            }
          }
        }
        this.arrows = defBoard.arrows ?? [];
        this.defBoard.contentBoardInputClass = "classContentBoardInput"
        this.defBoard.anche ? this.defBoard.classPoint = "BoardContentAnche2" : this.defBoard.classPoint = "BoardContent"
        return this.typeBoard;



      } else if (defBoard.type == 3) {
        this.typeBoard = this.defBoard.styles = {
          boundingbox: this.defBoard.boundingbox ?? [-5, -6.5, 5, 6],
          axies: {
            y: { visible: false },
            x: {
              ticks: {
                visible: false
              }
            }
          }
        }
        this.defBoard.contenedorInputs = "column"
        if (this.defBoard.slim) {
          this.defBoard.classPoint = "BoardContentBroadSlimp"
        } else {
          this.defBoard.classPoint = "BoardContentBroad"
        }
        return this.typeBoard;



      } else if (defBoard.type == 4) {
        this.typeBoard = this.defBoard.styles = {
          boundingbox: this.defBoard.boundingbox ?? [-5, -10, 5, 5],
          axies: {
            y: { visible: false },
            x: {
              ticks: {
                visible: false
              }
            }
          }
        }
        this.defBoard.classPoint = "BoardContent2";

        return this.typeBoard;


      } else if (defBoard.type == 5) {
        this.typeBoard = this.defBoard.styles = {
          boundingbox: this.defBoard.boundingbox ?? [-5, -5, 5, 3],
          axies: {
            y: { visible: false },
            x: {
              ticks: {
                visible: false
              }
            }
          }
        }
        this.defBoard.classPoint = "BoardContentBroadSlimp";

        return this.typeBoard;


      } else if (defBoard.type == 6) {
        this.typeBoard = this.defBoard.styles = {
          boundingbox: this.defBoard.boundingbox ?? [-6, -4, 6, 3],
          axies: {
            y: { visible: false },
            x: {
              ticks: {
                visible: false
              }
            }
          }
        }
        this.defBoard.contentBoardInputClass = `${this.defBoard.contentBoardInputClass ?? "classContentBoardInputBoard"}`
        if (this.defBoard.anche) {
          this.defBoard.classPoint = "BoardContentInvestedAnche";
        } else if (this.defBoard.ExtraAnche) {
          this.typeBoard = this.defBoard.styles = {
            boundingbox: this.defBoard.boundingbox ?? [-8, -5.5, 8, 4],
            axies: {
              y: { visible: false },
              x: {
                ticks: {
                  visible: false
                }
              }
            }
          }
          this.defBoard.classPoint = "BoardContentInvestedExtraAnche";

        }
        else {
          this.defBoard.classPoint = "BoardContentInvested";
        }
        return this.typeBoard;


      } else if (defBoard.type == 7) {

        this.typeBoard = this.defBoard.styles = {
          boundingbox: this.defBoard.boundingbox ?? [-15, 3, 15, -3],
          axies: {
            y: { visible: false },
            x: {
              ticks: {
                visible: false
              },
              lastArrow: false,
            }
          }
        },
          this.defBoard.contentBoardInputClass = "classContentBoardInput",
          this.defBoard.classPoint = "contentBoardArc"
        
        return this.typeBoard;


      } else if (defBoard.type == 8) {
        this.typeBoard = this.defBoard.styles = {
          boundingbox: this.defBoard.boundingbox ?? [-15, 1.5, 15, -1],
          axies: {
            y: { visible: false },
            x: {
              ticks: {
                visible: false
              },
              lastArrow: false,
            }
          },

        },
          this.defBoard.classPoint = "contentBoardStructure"

        return this.typeBoard;
      }
      else if (defBoard.type == 9) {
        this.typeBoard = this.defBoard.styles = {
          boundingbox: this.defBoard.boundingbox ?? [-8, 1, 8, -1.5],
          axies: {
            y: { visible: false },
            x: {
              ticks: {
                visible: false
              },
              lastArrow: false,
            }
          },

        },
          this.defBoard.classPoint = "contentBoardExample",
          this.defBoard.contentBoardInputClass = "classContentBoardInput"

        return this.typeBoard;


      } else if (defBoard.type == 10) {

        this.typeBoard = this.defBoard.styles = {
          boundingbox: this.defBoard.boundingbox ?? [-15, 4.5, 15, -4],
          axies: {
            y: { visible: false },
            x: {
              ticks: {
                visible: false
              },
              lastArrow: false,
            }
          }
        },
          this.defBoard.contentBoardInputClass = "classContentBoardInput",
          this.defBoard.classPoint = "contentBoardArc2"
        return this.typeBoard;


      }





    }
  }
  createExtruture(pointsExtents) {
    if (this.defBoard.type) {
      if (Array.isArray(this.defBoard.type)) {
        if (!pointsExtents) {
          if (this.board) {
            const boundingbox = this.board.getBoundingBox()
            let a = boundingbox[0]
            let b = boundingbox[2]
            let ay = boundingbox[1] - 3.5
            let by = boundingbox[3] + 3.5

            const allExtructure = []

            this.defBoard.type?.forEach((e, i) => {
              this.createExtructureAuxiliarShapes({
                types: this.defBoard.type,
                // readjustment0,
                minBoard: e,
                i,
                a,
                b,
                ay,
                by,
              })
            })
            this.defBoard.typeAux?.forEach((e, i) => {
              this.createExtructureAuxiliarShapes({
                types: this.defBoard.type,
                readjustment: 10.2,
                readjustmentMathfield: 24.5,
                minBoard: e,
                i,
                a,
                b,
                ay,
                by
              })
            })

          }
        } else {
          const { points, spaceExtremeLine, lines } = pointsExtents ? pointsExtents : extructure?.pointsExtents
          let linesToUse = this.allLines?.filter(line => lines?.some(ref => ref === line.ref)) ?? [];// busqueda de lineas definidas para la creacion de la forma Jsx que vienen desde la shape como: refLn
          linesToUse = lines?.map(ref => linesToUse.find(line => line.ref === ref)).filter(Boolean) ?? [];
          linesToUse.forEach(ln => {
            this.createPoints({ line: ln, pointsLine: points, spaceExtremeLine: spaceExtremeLine })
          })
        }
      } else {
        switch (this.defBoard.type) {
          case 3:
            this.linesArrows = [
              {
                p2_x: this.points[0].X(),
                p2_y: -2,
                p1_x: this.points[1].X() - .85,
                p1_y: -2, type: "arrow"
              },
              { p2_x: this.points[0].X(), p2_y: -2, p1_x: this.points[0].X(), p1_y: -0, type: "line" },
              { p2_x: this.points[this.points.length - 1].X(), p2_y: -2, p1_x: this.points[1].X() + .85, p1_y: -2, type: "arrow" },
              { p2_x: this.points[this.points.length - 1].X(), p2_y: -2, p1_x: this.points[this.points.length - 1].X(), p1_y: -0, type: "line" },
            ]
            this.linesArrows.forEach(location => {
              this.createArrow({
                position_p2_x: location.p2_x,
                position_p2_y: location.p2_y,
                position_p1_x: location.p1_x,
                position_p1_y: location.p1_y
              }, location.type)
            })
            break;
          case 5:
            this.linesArrows = [
              { p2_x: this.points[0].X(), p2_y: -2, p1_x: this.points[1].X() - .85, p1_y: -2, type: "arrow" },
              { p2_x: this.points[0].X(), p2_y: -2, p1_x: this.points[0].X(), p1_y: -0, type: "line" },
              { p2_x: this.points[2].X(), p2_y: -2, p1_x: this.points[1].X() + .85, p1_y: -2, type: "arrow" },
              { p2_x: this.points[2].X(), p2_y: -2, p1_x: this.points[2].X(), p1_y: -0, type: "line" },
              { p2_x: this.points[2].X(), p2_y: -2, p1_x: this.points[3].X() - .85, p1_y: -2, type: "arrow" },
              { p2_x: this.points[2].X(), p2_y: -2, p1_x: this.points[1].X() + .85, p1_y: -2, type: "arrow" },
              { p2_x: this.points[this.points.length - 1].X(), p2_y: -2, p1_x: this.points[3].X() + .85, p1_y: -2, type: "arrow" },
              { p2_x: this.points[this.points.length - 1].X(), p2_y: -2, p1_x: this.points[this.points.length - 1].X(), p1_y: -0, type: "line" },
            ]
            this.linesArrows.forEach(location => {
              this.createArrow({
                position_p2_x: location.p2_x,
                position_p2_y: location.p2_y,
                position_p1_x: location.p1_x,
                position_p1_y: location.p1_y
              }, location.type)
            })
            break;
          case 6:
            this.linesArrows = [
              { p2_x: this.points[0].X(), p2_y: -2, p1_x: this.points[1].X() - 3, p1_y: -2, type: "arrow" },
              { p2_x: this.points[0].X(), p2_y: -2, p1_x: this.points[0].X(), p1_y: -0, type: "line" },
              { p2_x: this.points[this.points.length - 1].X(), p2_y: -2, p1_x: this.points[1].X() + 3, p1_y: -2, type: "arrow" },
              { p2_x: this.points[this.points.length - 1].X(), p2_y: -2, p1_x: this.points[this.points.length - 1].X(), p1_y: -0, type: "line" },
            ]
            this.linesArrows.forEach(location => {
              this.createArrow({
                position_p2_x: location.p2_x,
                position_p2_y: location.p2_y,
                position_p1_x: location.p1_x,
                position_p1_y: location.p1_y
              }, location.type)
            })
            break;
          case 8:
            const extremes = this.def.board.points_arches;
            extremes.forEach(extreme => {
              // crecion de la estructura de las líneas
              const { arche } = extreme
              const [extreme_initial, extreme_end] = arche;
              this.linesArrows = [
                {
                  p2_x: this.points[extreme_initial].X(),
                  p2_y: 0.8,
                  p1_x: this.points[extreme_initial].X(),
                  p1_y: 0, type: "line"
                },
                {
                  p2_x: this.points[extreme_end].X(),
                  p2_y: 0.8,
                  p1_x: this.points[extreme_end].X(),
                  p1_y: 0, type: "line"
                },
                {
                  p2_x: this.points[extreme_initial].X(),
                  p2_y: 0.8,
                  p1_x: (this.points[extreme_end].X()),
                  p1_y: 0.8, type: "line",
                  styles: {
                    firstArrow: true,
                    lastArrow: true,
                  }
                },
              ]
              this.linesArrows.forEach(location => {
                this.createArrow({
                  position_p2_x: location.p2_x,
                  position_p2_y: location.p2_y,
                  position_p1_x: location.p1_x,
                  position_p1_y: location.p1_y
                }, location.type, location.styles)
              })
              // creación de los inputs de la estructura
              this.createInputs({
                inputs: [
                  {
                    x: (this.points[extreme_initial].X() + this.points[extreme_end].X()) / 2,
                    y: 0.8,
                    style:
                    {
                      styleMain: "inputLargeStructure",
                    }
                  },
                ]
              })
            })
            break
          default:
            return;
        }
      }
    }
  }
  createExtructureAuxiliarShapes(params) {
    const { types = [], readjustment = 0, readjustmentMathfield = 0, minBoard = {}, i = 0, a, b, ay, by, } = params

    let { arrow = false, message, mathfields = [{}, {}], type = 1, refLine } = minBoard;

    // Calcular las posiciones x e y
    let x = (a && b) ? this.calulateExtents({ a, b, i, quantity: types.length }) : 0;
    let y = (ay && by) ? this.calulateExtents({ a: ay, b: by, i, quantity: types.length }) : 0;

    const pId = this.generateUniqueId(3)
    const p2Id = this.generateUniqueId(3)
    const pIdL = this.generateUniqueId(3)
    const p2IdL = this.generateUniqueId(3)
    const lnId = this.generateUniqueId(3)
    const lnIdL = this.generateUniqueId(3)




    let extructure = {
      type: "foreignobject",
      pointsExtents: {
        lines: [refLine ?? `lineBoard_${lnId}`],
        points: [{}, {}, {}, {}, {}, {}],
        spaceExtremeLine: 1,
      },
      points: [
        { x: -9.5, y, ref: `point_${pId}`, style: { visible: false, fixed: false, size: 5, name: 'C', label: { offset: [-4, -15] } } },
        { x: 9.5, y, ref: `point_${p2Id}`, style: { visible: false, fixed: false, size: 5, name: 'D', label: { offset: [-4, -15] } } },
      ],
      lines: [
        { refPt: [`point_${pId}`, `point_${p2Id}`], ref: refLine ?? `lineBoard_${lnId}`, style: { strokewidth: 2 }, type: "segment" },
      ],
      texts: [
        { x: message?.x ? message.x : a + 8.2, y: message?.y ? message.y : y - 3.5, value: message?.value ?? "" }
      ],
      ref: "boardSimulate_0",
      style: {
        fixed: true,
        strokeColor: "#3d348b",
        strokeWidth: 3,
        fillColor: 'transparent',
        fillOpacity: 1
      }
    }
    if (type == 1) {
      extructure.params = [
        '<div style="width:100%;height:100%;background-color: transparent; padding: 10px; border-radius: 15px;border:solid 1px #217e9d;"></div>',
        [-10, y - 2.8],
        [20, 5.5]
      ],
        extructure.mathfields = [
          {
            visible: false,
            inputs: [
              { x: -12.33, y, style: { styleMain: `${mathfields[0]?.style ?? "inputEscalaMultiple mathfield"}`, disabled: mathfields[0]?.disabled ?? false }, value: `${mathfields[0]?.value ?? ""}` },
              { x: 12.33, y, style: { styleMain: `${mathfields[1]?.style ?? "inputEscalaMultiple mathfield"}`, disabled: mathfields[1]?.disabled ?? false }, value: `${mathfields[1]?.value ?? ""}` }
            ]
          },
        ]
      if (arrow) {
        extructure.points = [
          { x: 0, y: y + 4.15, ref: `point_${pIdL}`, style: { visible: false, fixed: false, size: 5, name: 'F', label: { offset: [-4, -15] } } },
          { x: 0, y: y + 2.6, ref: `point_${p2IdL}`, style: { visible: false, fixed: false, size: 5, name: 'G', label: { offset: [-4, -15] } } },
          ...extructure.points
        ]
        extructure.lines = [
          { refPt: [`point_${pIdL}`, `point_${p2IdL}`], ref: `lineArrow_${lnIdL}L`, style: { strokewidth: 2, lastArrow: { type: 1, size: 6 } }, type: "segment" },
          ...extructure.lines
        ]
      }
    } else if (type == 2) {
      extructure.points = [
        { x: -9.5, y, ref: `point_${pId}`, style: { visible: false, fixed: false, size: 5, name: 'C', label: { offset: [-4, -15] } } },
        { x: 14, y, ref: `point_${p2Id}`, style: { visible: false, fixed: false, size: 5, name: 'D', label: { offset: [-4, -15] } } },
      ],
        extructure.params = [
          '<div style="width:100%;height:100%;background-color: transparent; padding: 10px; border-radius: 15px;border:solid 1px #217e9d;"></div>',
          [-10, y - 2.7],
          [24.5, 5.5]
        ],
        extructure.mathfields = [
          {
            visible: false,
            inputs: [
              { x: -12.4, y, style: { styleMain: `${mathfields[0]?.style ?? "inputEscalaMultiple mathfield"}`, disabled: mathfields[0]?.disabled ?? false }, value: `${mathfields[0]?.value ?? ""}` },
            ]
          },
        ]

    }
    else if (type == 3) {
      extructure.pointsExtents = {
        lines: [minBoard?.lineRef ? minBoard?.lineRef : `lineBoard_${lnId}`],
        points: [{}, {}, {}, {}],
        spaceExtremeLine: 1,
      },
        extructure.points = [
          { x: (-9.3 + readjustment), y, ref: `point_${pId}`, style: { visible: false, fixed: false, size: 5, name: 'C', label: { offset: [-4, -15] } } },
          { x: (-1 + readjustment), y, ref: `point_${p2Id}`, style: { visible: false, fixed: false, size: 5, name: 'D', label: { offset: [-4, -15] } } },
        ],
        extructure.params = [
          '<div style="width:100%;height:100%;background-color: transparent; padding: 10px; border-radius: 15px;border:solid 1px #217e9d;"></div>',
          [(-9.9 + readjustment), y - 2.7],
          [9.5, 5.5]
        ],

        extructure.mathfields = [
          {
            visible: false,
            inputs: [
              { x: (-12.3 + readjustmentMathfield), y, style: { styleMain: `${mathfields[0]?.style ?? "inputEscalaMultiple mathfield"}`, disabled: mathfields[0]?.disabled ?? false }, value: `${mathfields[0]?.value ?? ""}` },
            ]
          },
        ]

    }
    this.createShapes(extructure)
    const { points, spaceExtremeLine, lines } = extructure?.pointsExtents
    let linesToUse = this.allLines?.filter(line => lines?.some(ref => ref === line.ref)) ?? [];// busqueda de lineas definidas para la creacion de la forma Jsx que vienen desde la shape como: refLn
    this.createPoints({ line: linesToUse[0], pointsLine: points, spaceExtremeLine: spaceExtremeLine })

  }
  buttonArches(params) {
    let { points, heigth = 1, indexPoints = [], propertyEvaluate, dash = false, typeCurve, typeDirection } = params

    points.forEach(point => {
      point.off('down')
      point.downPoint ? point.downPoint = false : null


    })

    const resetItems = () => {
      this.point_select[0].setAttribute({
        strokeColor: "#D55E00",
        size: 3
      })
      this.point_select[1].setAttribute({
        strokeColor: "#D55E00",
        size: 3
      })
      this.point_select = [];
      indexPoints = [];
    }

    points.forEach((point, i) => {
      // Verificar si el punto ya ha sido activado
      if (!propertyEvaluate) return
      if (point.eventEvaluate == typeCurve) return

      // Verificar si el evento ya ha sido agregado
      point.eventEvaluate = typeCurve;

      point.on("down", () => {

        // si la curva ya está validada y se vuelve a interactuar en el board se reestablece el color
        const curves = this.interactiveFigures.filter(e => e.elType == "circumcirclearc");
        if(curves.some(curve=>curve.getAttribute('strokeColor')!=="#0aa1dd")){
            curves.forEach(curve=>curve.setAttribute(({  strokeColor: '#0aa1dd'})))
        }
       
        // si la referencia del punto es null no se puede hacer click
        if(point.refLineBoard=="null")return

        this.validateStatus = false;
        point.pointDown = true;

        point.setAttribute({
          strokeColor: "#217e9d",
          size: 4.5
        });
        this.point_select.push(point);
        indexPoints.push(i);

        if (this.point_select.length > 1) {
          const validationParents = this.validationItems.curveValidation.some(curve => {
            return (curve.parents[0] == this.point_select[0].id && curve.parents[2] == this.point_select[1].id) ||
              (curve.parents[0] == this.point_select[1].id && curve.parents[2] == this.point_select[0].id);
          });

          const validationPoint = this.point_select[0].id == this.point_select[1].id;
          const validationHeigth = this.point_select[0].Y() !== this.point_select[1].Y();

          if (validationPoint || validationParents || validationHeigth) {
            resetItems();
            return;
          }

          this.createArches([{
            arche: [
              this.point_select[0],
              this.point_select[1], false, dash,
              { heigth }, typeCurve, indexPoints[1] - indexPoints[0], true, typeDirection
            ]
          }])

          resetItems();

        }
      });

    });


  }
  createArches(extremes) {


    extremes.forEach(definitionArches => {

      const [extremeInitial, extremeEnd, typeCurve, dashActive, object, name, stepsValidation, interactive, typeDirection, createDef] = definitionArches.arche;
      const { heigth } = object

      if (typeCurve) {

        for (let i = 0; i < extremeEnd - extremeInitial; i++) {

          const point1 = this.points[extremeInitial + i]

          const point2 = this.board.create('point', [((this.points[extremeInitial + i].X() + this.points[((extremeInitial + i) + 1)].X()) / 2), point1.Y() + heigth],
            {
              fixed: true,
              highlight: false,
              visible: false,
              name: "",
            });

          const point3 = this.points[((extremeInitial + i) + 1)]

          const curve = this.board.create('circumcirclearc', [point1, point2, point3], dashActive ? { dash: 2, highlight: false, strokeColor: '#0aa1dd',strokeWidth: 1.8 } : { highlight: false, strokeColor: '#0aa1dd',strokeWidth: 1.8 })
          curve.createDef = createDef;
          this.TwistCurveEvent({ curve, PointExtrem: point1  })
        }
      } else {


        const point1 = this.points[extremeInitial] ?? extremeInitial
        const point3 = this.points[extremeEnd] ?? extremeEnd


        const point2 = this.board.create('point', [((point1.X() + point3.X()) / 2), point1.Y() + heigth],
          {
            fixed: true,
            highlight: false,
            strokeWidth: 5,
            visible: false,
            name: "",
          });
        point2.offsetY = 1.4
        point2.heightInitial= point1.Y() + heigth

        const curve = this.board.create('circumcirclearc', [point1, point2, point3], dashActive ? { dash: 2, highlight: false, strokeColor: '#0aa1dd', strokeWidth: 1.8} : { highlight: false, strokeColor: '#0aa1dd',strokeWidth: 1.8 })

        curve.typeCurveValidation = name;
        curve.refLineBoardCurve = point1.refLineBoard
        curve.stepsValidation = stepsValidation;
        curve.refNumCurve = point1.refNumIndex + point3.refNumIndex;
        curve.extremesCoords = [point1.X().toFixed(), point3.X().toFixed()].sort((a, b) => a - b)
        curve.extremesMedium = point2
        curve.extremesPoints = [point1, point3]
        curve.interactive = interactive ?? false
        curve.typeDirection= typeDirection
        curve.createDef = createDef;

        this.TwistCurveEvent({ curve, PointExtrem: point1  })
        if (curve.interactive) {
          if ((name == "btn_semicircleDashTop") || (name == "btn_semicircleDashBelow")) {
            this.validationItems.simplifiedPathCurve.push(curve)
          } else {
            this.validationItems.curveValidation.push(curve)
          }

        }

        this.interactiveFigures.push(curve)

        // FILTRACION DE CURVAS NORMALES
        this.points.forEach(point => {
          if (!this.boardsCurveValidation.hasOwnProperty(point.refLineBoard)) {
            this.boardsCurveValidation[point.refLineBoard] = [] } });

        if (this.boardsCurveValidation.hasOwnProperty(curve.refLineBoardCurve) && curve.interactive) {
          this.boardsCurveValidation[curve.refLineBoardCurve].push(curve) } }

    })

    this.def?.conditions?.forEach((e, i) => {
      if (e?.curves && this.def?.inputCurve && this.validationItems.curveValidation.length > 0) {  this.createInputCurve(this)  }
    })
  }
  TwistCurveEvent(params){
    const {curve,PointExtrem} = params
    curve.on("down",(e)=>{
      this.validateStatus = false;
      if (e.target.tagName =="DIV" && this.curveActiveTwist) {
        const diferent = Math.abs(PointExtrem.Y()-curve.extremesMedium.Y())
          if (PointExtrem.Y()>curve.extremesMedium.Y()) {
            curve.typeCurveValidation = "btn_semcircleSimpleTop"
            curve.typeDirection = "Top"
            curve.TwistCurveEventUsed = true  

            setTimeout(() => {
              curve.setAttribute({ visible: false });
            }, 480);      
            setTimeout(() => {
              curve.setAttribute({ visible: true });
            },600);     
             
            curve.extremesMedium.moveTo([curve.extremesMedium.X(),(PointExtrem.Y()+diferent)], 1000,{
              easing: 'easeInOutQuad', // Easing opcional
              repeat: 1,               // Repetir la animación una vez
              callback: function() {
                curve.update()
              }});
            return
          }else if (PointExtrem.Y()<curve.extremesMedium.Y()) {
            curve.typeCurveValidation = "btn_semcircleSimpleBelow"
            curve.typeDirection = "Below"
            curve.TwistCurveEventUsed = true  

            setTimeout(() => {
              curve.setAttribute({ visible: false });
            }, 480);      
            setTimeout(() => {
              curve.setAttribute({ visible: true });
            }, 600);      

            curve.extremesMedium.moveTo([curve.extremesMedium.X(),(PointExtrem.Y()-diferent)], 1000,{
              easing: 'easeInOutQuad', // Easing opcional
              repeat: 1,               // Repetir la animación una vez
              callback: function() {
                curve.update()
              }});

        }
      }
    })
  }
  createInputCurve(definition) {
    const { def } = definition;
    const { conditions } = def;
    conditions.forEach(condition => {
      if (condition.curves) {
        // validacion de la cantidad de pasos
        const fullCurves = this.boardsCurveValidation[condition.curves.id].length == condition.curves.curves;
        const oneStep = this.boardsCurveValidation[condition.curves.id].every(e => e.stepsValidation == condition.curves.steps || e.stepsValidation == -condition.curves.steps)
        // validacion de los pasos continuos
        this.boardsCurveValidation[condition.curves.id]?.forEach((curve, index, array) => {
        curve.parents.some((refPoint) => {array.forEach(cur => { if (curve.id !== cur.id) { if (cur.parents.some(e => e == refPoint)) { cur.continuesCreateInputs = true } } })  }) });
        const isContinue = this.boardsCurveValidation[condition.curves.id].length > 0 ? this.boardsCurveValidation[condition.curves.id].every(e => e.continuesCreateInputs ? true : false) : false
  
        if(condition.curves.inputCurve==false)return
        
        if (fullCurves && (condition.curves.curves>1?isContinue:!isContinue) && oneStep && !this.boardsCurveValidation[condition.curves.id].some(curve => curve.inputCreated==true)) {
          this.boardsCurveValidation[condition.curves.id].forEach(curve => curve.inputCreated = true)
          const mathfields = this.createInputs({ inputs: [{ x: this.boardsCurveValidation[condition.curves.id][0].extremesMedium.X(),  y: this.boardsCurveValidation[condition.curves.id][0].typeDirection=="Top"?this.boardsCurveValidation[condition.curves.id][0].extremesPoints[0].Y() - 1.3:this.boardsCurveValidation[condition.curves.id][0].extremesPoints[0].Y() + 1.3 ,  style: { styleMain: "input-mini" } },] });
          mathfields[0].mathfield.inputCurve = true;
          mathfields[0].newInput.inputCurve = true;
          mathfields[0].newInput.mathfield=mathfields[0].mathfield
          
          mathfields[0].newInput.refLineBoardCurve = this.boardsCurveValidation[condition.curves.id][0].refLineBoardCurve;
          this.interactiveFigures.push(mathfields[0].newInput)
          this.mathfieldEventsAndLayauts([mathfields[0].mathfield]);

          // this.entrisModifid.push(mathfields[0].mathfield)
          // this.inputsCurves.push(mathfields[0])
        }
      }
    })
  }
  createInputPointActive(arrayPoints,def) {
    // SE AGREGA EL ID DE LOS PUNTOS USADOS A LOS MATHFIELDS 
    const pointsUsed = this.def?.downPoint?.activeInput.map(index => arrayPoints[index])
    pointsUsed?.forEach((point, index) => { this.allInputsCreate[index].identifier = point.id })
    // SE RECORRE EL ARRAY DE LOS PUNTOS PARA IDENTIFICAR CUAL SE USA Y TRABAJAR CON EL
    arrayPoints.forEach((point) => {    
      point.on("down", () => {
        const inputFilter = this.allInputsCreate.filter(e => e.identifier == point.id)
        if (point.id == inputFilter[0]?.identifier) {
          point.pointDown = true
          point.setAttribute({
          strokeColor: "#217e9d",
          size: 4.5
        })
          if (inputFilter[0].value !== "") {  inputFilter[0].addValue = true}    
          inputFilter[0].removeAttribute("disabled")
          inputFilter[0].classList.replace("inputLittle-transparent", "inputLittle");
          inputFilter[0].inputsInteractive = true
          this.mathfieldEventsAndLayauts([inputFilter[0]])
        } 
      })
    })
  }
  createInputPoint(pointsObject) {
    pointsObject?.forEach((point, position) => {
      const x = point.inputs ? point?.inputs?.x || this.points[position].X() : undefined
      const y = point.inputs ? point?.inputs?.y || -1.5 : undefined
      const style = point?.inputs?.style?.styleMain ?? "inputLittle"
      const disabled = point?.inputs?.style?.disabled
      const value = point?.inputs?.value
      if (x !== undefined && y !== undefined) {const mathfields = this.createInputs({ inputs: [{ x: x, y: y, style: { styleMain: style, disabled: disabled }, value: value }] });}
    })
  }
  enableInput(points) {
    points.forEach((point, position) => {
      point.on("down", () => {
        if (this.def.enableInput.includes(position)) {
          point.pointDown = true
          point.setAttribute({
            strokeColor: "#217e9d",
            size: 4.5
          })
          // empiezo con la habilitación de los inputs
          const inputMathfield = this.allInputsCreate[position]
          if (inputMathfield.value !== "") {
            inputMathfield.addValue = true
          }
          inputMathfield.removeAttribute("disabled")
          inputMathfield.classList.replace("inputLittle-transparent", "inputLittle");
          inputMathfield.inputsInteractive = true
          this.mathfieldEventsAndLayauts([inputMathfield])
        }
      })

    })
  }
  resetMain() {
    //reset de los check 
    this.formS.forEach(form => {
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

    // reset de los arcos creados y los puntos seleccionados
    if (this.validationItems.curveValidation.length > 0 || this.validationItems.simplifiedPathCurve.length > 0 || this.points.some(e => e.pointDown)) {

      // reset de las curvas creadas por el usuario
      // filtracion de curvas creadas 
      const arrayStepsUpdate = this.interactiveFigures.filter(elemento => !elemento.createDef);
      arrayStepsUpdate.forEach(e => { 
        // remuevo todas creadas por el usuario del board las curvas del board
        this.board.removeObject(e);
        this.validationItems.curveValidation.splice(this.validationItems.curveValidation.indexOf(e), 1)
        this.interactiveFigures.splice(this.interactiveFigures.indexOf(e), 1)
      })

      // reset de las curvas para la validacion desde la definicion
      this.interactiveFigures.forEach(e=>{
        if(e.createDef){  if(e.TwistCurveEventUsed==true ){  e.extremesMedium.setPositionDirectly(JXG.COORDS_BY_USER, [e.extremesMedium.X(),e.extremesMedium.heightInitial  ]);  }  }
        e.setAttribute({  strokeColor: '#0aa1dd'})
        return
  })

      this.validationItems.simplifiedPathCurve=[];
      this.boardsCurveValidation = {}
      this.points.forEach(e => {  e.setAttribute({  strokeColor: "#D55E00",size: 3 })})
      this.point_select = [];
    }

    // reset de los inputs especiales del board
    if (this.def.enableInput) {
      this.entrisModifid.forEach((entri, i) => {
        if (!entri.disabled) {
          const position = this.def.enableInput[i]
          const valueInitial = this.defBoard.points[position].inputs.value
          entri.value = valueInitial
          entri.setAttribute('disabled', '')
          entri.classList.replace("inputLittle", "inputLittle-transparent")
          entri?.classList?.remove("passInLibrary");
          entri?.classList?.remove("failedInLibrary");
          entri?.classList?.remove("checkTable")
          entri.inputsInteractive = false
        }
      })


    } else {

      // Validación de los inputs y select
      this.entrisModifid.forEach((entrada) => {

        if (entrada.tagName == "SELECT") {
          entrada.selectedIndex = 0
        } else {
          if (entrada.inputsInteractive) {
            entrada.setAttribute("disabled", "")
            entrada.classList.replace("inputLittle", "inputLittle-transparent")
          }  

          if(entrada.value!=="" && Array.isArray(this.defBoard?.type)) {
        
            this.defBoard?.type?.forEach(mathfield=>{
              mathfield?.mathfields.forEach(text=>{if(!text.disabled && text?.value){ entrada.value = text.value}  })
            })
          }else {
            entrada.value = "";
          }
          
        

        }
        entrada?.classList?.remove("passInLibrary");
        entrada?.classList?.remove("failedInLibrary");
      });
    }

    this.entrisModifid = []
    this.entrisModifid = [...this.entris]
  }
  returnMain() {

    if (this.interactiveFigures.some(elemento => !elemento.createDef)) {

        const lastElement = this.interactiveFigures.pop();
        this.boardsCurveValidation[lastElement?.refLineBoardCurve]?.forEach(curve => {curve.inputCreated = false });
        const unitArrays = [this.validationItems.curveValidation,this.validationItems.simplifiedPathCurve,this.boardsCurveValidation[lastElement?.refLineBoardCurve] ];
        this.board.removeObject(lastElement);

        unitArrays.forEach(array => {
            array.some(figure => {
                if (figure.id == lastElement.id) {
                    array.splice(array.indexOf(figure), 1);
                }
            });
        });

    } else {
        this.interactiveFigures.forEach(figure => {
            figure.setAttribute({ strokeColor: '#0aa1dd' });
            if (figure?.TwistCurveEventUsed==true) {
        
              figure.extremesMedium.moveTo([figure.extremesMedium.X(), figure.extremesMedium.heightInitial]);
              this.board.update();

              figure.TwistCurveEventUsed=false
              if(figure.typeDirection == "Top"){
                figure.typeCurveValidation = "btn_semcircleSimpleBelow"
                figure.typeDirection = "Below"
              }else if(figure.typeDirection == "Below"){
                figure.typeCurveValidation = "btn_semcircleSimpleTop"
                figure.typeDirection = "Top"
              }
            }
        });
    }
}

   }
  

