class HorizontalSegment extends baseBoards {
  constructor(def, defBoard) {
    super(defBoard);
    this.allPoints = [];
    this.InputTarget = 0;
    this.targetInterval = 0;
    this.defBoard = defBoard;
    this.point = def?.point;
    this.point = def?.point ?? {};
    this.idTemplate = def?.template?.id ?? "temp-segment";
    this.conditions = def?.conditions ?? {};
    this.idboard = `${def.name}_board`;
    this.htmlNode = def?.template?.node ?? null;
    this.validation = new ValidationHorizontal(this.def);
    this.templateInsert();
    this.intervals = [];
    this.activeStep = false;
    this.def = def;
  }

  templateInsert = () => {
    if (!document.querySelector("#temp-buttons")) {
      const buttonsTemplate = `
        <template id="temp-buttons">
          <button class="buttonTool styleBtn buttonTertiary buttonKey" title="value 1">1</button>
        </template>`;
      this.buttonsTemplate = buttonsTemplate;
      document.body.insertAdjacentHTML("afterend", this.buttonsTemplate);
    }

    if (!document.querySelector("#temp-segment")) {
      const $templateDefaults = `
        <template id="temp-segment">
          <div class="artifact-base artifact-min-horizontal artifact-short">
            <div class="statement-top border-board-dark textCenter"></div>
            <div id="jxgbox" class="boardVerticalShort border-board-dark"></div>
            <div class="statement statement-bottom border-board-dark h-100 textCenter mt-1 mb-1" style="height: 100%; min-height: 30px; display: none;"></div>
            <div class="all-btn border-board-dark">
      
              <div class="btn-base border-dark rounded">


                <div class="sectionBtn interactive-btn"></div>
                <div class="sectionBtn default-btn gap-2">
                  <button id="myButton" class="curves styleBtn buttonCurves buttonKey bton-tertiary" title="Curvas"></button>
                  <button class="reset styleBtn buttonSecundary buttonKey" title="Reset"></button>
                  <button class="check styleBtn buttonPrimary buttonKey" title="Validar"></button>
                </div>
              </div>
            </div>
          </div>
        </template>`;
      this.template = $templateDefaults;
      document.body.insertAdjacentHTML("afterend", this.template);
    }

    this.tmpButton = document.querySelector("#temp-buttons");
    this.htmlNode = document
      .querySelector(`#${this.idTemplate}`)
      .content.firstElementChild.cloneNode(true);
    return this.htmlNode;
  };

  initEngine() {
    if (this.initBoardBase({ id: this.idboard, ...this.defBoard })) {
      if (this.defBoard?.intervals)
        this.createIntervals({ intervals: this.defBoard.intervals });
      if (this.defBoard?.slider)
        this.createSlider({ slider: this.defBoard.slider });
    }

    if (this.def?.point) {
      this.textSVG();
    }
    if (this.conditions.keyBoard && this?.defBoard?.topButtons) {
      this.setTopButtons(this?.defBoard?.topButtons);

      this.htmlNode
        .querySelector(".statement-top")
        .addEventListener("click", e => {
          if (!e.target.classList.contains("buttonTool")) return;

          this.validateStatus = false;
          const interval = this.intervals[this.targetInterval];
          const mathfield = interval.inputs[this.InputTarget].mathfield;

          mathfield.value = e.target.textContent;

          if (this.InputTarget >= interval.inputs.length - 1) {
            this.InputTarget = 0;
          } else {
            this.InputTarget++;
          }

          if (this.targetInterval >= this.intervals.length - 1) {
            this.targetInterval = 0;
          } else {
            this.targetInterval++;
          }
        });

      this.htmlNode.querySelector(".statement-top").style.display = "flex";
    }

    this.initTimer();
    if (this.defBoard?.slider === undefined) {
      const buttonContainer = this.htmlNode.querySelector(".default-btn");
      const curvesButton = buttonContainer.querySelector(".curves");
      if (curvesButton) curvesButton.style.display = "none";
    }
    if (this.defBoard?.slider?.visible == false) {
      this.visip.forEach(e => {
        e.off("down");
      });
    }
    const curves = this.htmlNode.querySelector(".bton-tertiary");
    const statusCurvesBtn = this.defBoard?.btnSlider ?? true;
    if (!statusCurvesBtn) {
      curves.style.display = "none";
    }

    this.statusInpModalidad = this.defBoard?.newInp ?? false;
    if (this.statusInpModalidad) {
      this.inputModalidate();
    }

    if (this.defBoard?.curioso ?? false) {
      this.eventos_points();
    }

    this.mathfieldEventsAndLayauts(this.interactiveInputs);
  }

  typeInput(input) {
    if (typeof input === "string" || input === undefined) {
      return {
        style: { mathClass: "inputXpansionMin" },
        value: input ?? "",
      };
    } else {
      const { style = {}, ...rest } = input;
      const newStyle = {
        mathClass: style.mathClass ?? "inputXpansionMin",
        ...style,
      };

      // Agregar la clase disabled-border si el input está deshabilitado
      if (rest.disabled) {
        newStyle.mathClass += " disabled-border";
      }

      if (rest.disabledColor) {
        newStyle.mathClass += " disabled-border-colored";
      }

      return {
        ...rest,
        style: newStyle,
      };
    }
  }

  defineInput(x, y, inputs) {
    let isDisabled = inputs?.disabled ?? false;
    let borderClass = isDisabled ? "disabled-border" : "";

    if (inputs?.disabledColor ?? false) {
      isDisabled = true;
      borderClass += "disabled-border-colored";
    }
    return {
      x,
      y,
      value: inputs.value,
      validate:
        this.conditions?.keyBoard &&
        this?.defBoard?.topButtons &&
        (!inputs.value || inputs.value === ""),
      style: {
        disabled: isDisabled,

        mathClass: (inputs?.style?.mathClass ?? "") + " " + borderClass,
        mathStyle: inputs?.style?.mathStyle ?? "",
      },
    };
  }

  inputModalidate() {
    if (this.interactiveInputs.length !== 0) {
      this.defaultValues = [];

      this.interactiveInputs.forEach(input => {
        this.defaultValues.push(input.value);
      });

      this.interactiveInputs.forEach(input => {
        this.defaultValues[input.id] = input.value;
        input.addEventListener("focus", event => {
          this.inptarg = event.target;
          this.interactiveInputs.forEach(otherInput => {
            if (otherInput !== event.target) {
              otherInput.disabled = false;
              otherInput.style.pointerEvents = "none";
              otherInput.style.userSelect = "none";
              otherInput.style.border = "1px solid gray";
              otherInput.style.opacity = "0.5";
            }
          });
        });
      });
    }
  }

  StepActivate() {
    this.sliderC.setAttribute({ fixed: !this.activeStep });
    const curves = this.htmlNode.querySelector(".bton-tertiary");
    if (!this.activeStep) {
      curves.classList.remove("buttonCurves");
      curves.classList.remove("curves");
      curves.classList.add("buttonCurvesclick");
      curves.classList.add("curvesClick");
      this.activeStep = !this.activeStep;
    } else {
      curves.classList.remove("curvesClick");
      curves.classList.remove("buttonCurvesclick");
      curves.classList.add("buttonCurves");
      curves.classList.add("curves");

      this.activeStep = !this.activeStep;
    }
  }

  setTopButtons(allButtons) {
    if (!allButtons) return;
    allButtons.forEach(item => {
      const newButton =
        this.tmpButton.content.firstElementChild.cloneNode(true);
      newButton.textContent = item.value;
      this.htmlNode.querySelector(".statement-top").appendChild(newButton);
    });
  }

  eventos_points() {
    const prueba = this.interactiveInputs;

    prueba.forEach((input, index) => {
      input.addEventListener("input", e => {
        const inp = input.value.trim();

        // Si el input está vacío, se borran los nombres
        if (inp === "") {
          this.visip.forEach((p, i) => {
            if (i > 0 && i < this.visip.length - 1) {
              p.setAttribute({ name: "" });
            }
          });
        } else {
          const parsedValue = parseInt(inp);
          if (!isNaN(parsedValue)) {
            this.visip.forEach((p, i) => {
              if (index === 0) {
                if (i > 0 && i < this.visip.length - 1) {
                  p.setAttribute({ name: parsedValue + i });
                }
              } else if (index === 1) {
                if (i > 0 && i < this.visip.length - 1) {
                  p.setAttribute({
                    name: parsedValue - (this.visip.length - 1 - i),
                  });
                }
              }
            });
          }
        }
      });
    });
  }

  reset() {

    this.activeStep = true;
    this.StepActivate();
    if (this.statusInpModalidad) {
      this.interactiveInputs.forEach((input, i) => {
        input.value = this.defaultValues[i];
        input.disabled = false;
        input.style.pointerEvents = "";
        input.style.userSelect = "";
        input.style.border = "";
        input.style.opacity = "1";
        input.classList.remove("passInLibrary");
        input.classList.remove("failedInLibrary");
      });
    } else {
      this.interactiveInputs.forEach(input => {
        input.value = "";
        input.classList.remove("passInLibrary");
        input.classList.remove("failedInLibrary");
      });
    }
    if (this.defBoard?.curioso ?? false) {
      this.visip.forEach((p, i) => {
        if (i > 0 && i < this.visip.length - 1) {
          p.setAttribute({ name: "" });
        }
      });
    }

    if (this.defBoard?.slider) {
      if (this.defBoard?.slider?.reverse) {
        this.PointsAndCurves();
        this.pasos.forEach(c => c.setAttribute({ visible: false }));
        this.resetClickedPoints();
        if (this.sliderC) this.sliderC.moveTo([1.7, 1]);
      } else {
        this.PointsAndCurves();
        this.pasos.forEach(c => c.setAttribute({ visible: false }));
        this.resetClickedPoints();
        if (this.sliderC) this.sliderC.moveTo([-1.7, -1]);
      }
    }
  }

  PointsAndCurves() {
    this.pasos?.forEach(curve => {
      curve.setAttribute({ strokeColor: "#0aa1dd" });
    });
  }
}
