class DiagramVertical extends NodeHtml {
  constructor(def) {
    super();
    this.def = def;
    this.conditions = def?.conditions || [];
    this.validation = new verticalValidate();
    this.htmlNode = null;
    this.inputsValidate = [];
    this.templates = this.initTemplates();
    this.entris = [];
    this.entrisModifid = [];
  }

  initTemplates() {
    const templateList = {
      tmp1: `
        <template id="tmp1">
          <div class="diagramform1">
            <math-field class="mdrigth input_1 hblted diagramRound"></math-field>
            <math-field class="mdleft input_2 hblted  diagramRound"></math-field>
          </div>
        </template>`,
      tmp2: `
        <template id="tmp2">
          <div class="diagramform1">
            <math-field class="squareDiagram input_1 hblted"></math-field>
            <div class="diagramArrows">
              <div class="arrowDown"></div>
              <div class="arrowUp md"></div>
            </div>
            <math-field class="squareDiagram input_2 hblted"></math-field>
          </div>
        </template>`,
      mainTmp: `
        <template id="temp">
          <div class="artifact-min artifact-base fixedWith">
            <div id="artifact1">
              <div class="diagramGrid contentOthers">
                <math-field class="diagramform2 positionDiagramUp input_up hblted"></math-field>
                <math-field class="diagramform2 positionDiagramDown input_down hblted"></math-field>
              </div>
              <div class="all-btn w-100 border-board-dark">
                <div class="btn-base border-dark rounded">
                  <div class="sectionBtn interactive-btn"></div>
                  <div class="sectionBtn default-btn gap-2">
                    <button class="reset styleBtn buttonSecundary buttonKey" title="Reset"></button>
                    <button class="check styleBtn buttonPrimary buttonKey" title="Validar"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>`,
    };
    for (const key in templateList) {
      if (!document.querySelector(`#${key}`)) {
        document.body.insertAdjacentHTML("afterend", templateList[key]);
      }
    }

    return {
      tmp1: document.querySelector("#tmp1"),
      tmp2: document.querySelector("#tmp2"),
      mainTmp: document.querySelector("#temp"),
    };
  }

  templateInsert = () => {
    this.htmlNode ??=
      this.templates.mainTmp?.content.firstElementChild?.cloneNode(true);
    return this.htmlNode;
  };

  applySizeVisibility() {
    const size = this.def.visual ?? "complete";

    if (size === "left") {
      // Aplicar estilos específicos para 'left'
      this.toggleVisibility(".input_1", true);
      this.toggleVisibility(".input_2", false);
      this.toggleVisibility(".arrowDown", true);
      this.toggleVisibility(".arrowUp", false);

      
      const cont = this.htmlNode.querySelectorAll(".diagramform1");
      const contbig = this.htmlNode.querySelector(".diagramGrid");
      contbig.style.paddingBottom = "1rem";

      cont.forEach(inp => {
        inp.style.justifyContent = "space-evenly";
      });

      this.htmlNode.querySelectorAll(".input_1").forEach(input => {
        input.style.borderRadius = "1.4rem"; // Aplica border-radius
      });

    
      this.htmlNode.querySelectorAll(".diagramRound").forEach(inp => {
        inp.style.marginLeft = "30%";
        if(this.def?.secondaryClass) inp.classList.add(this.def?.secondaryClass);
      });
      this.htmlNode.querySelectorAll(".squareDiagram").forEach(inp => {
        inp.style.borderRadius = "1.8rem";
        // inp.style.marginRight = '18%'
      });
      this.htmlNode.querySelectorAll(".diagramArrows").forEach(arrowDiv => {
        arrowDiv.style.alignItems = "center";
        arrowDiv.style.marginRight = "18%";
      });
    } else {
      // Para 'complete' o cualquier otro caso por defecto
      this.toggleVisibility(".input_1, .input_2", true);
      this.toggleVisibility(".arrowDown, .arrowUp", true);
    }
  }

  toggleVisibility(selector, isVisible) {
    this.htmlNode.querySelectorAll(selector).forEach(element => {
      element.style.display = isVisible ? "flex" : "none";
    });
  }

  initializeArtifact(def) {
    const {tmp1, tmp2} = this.templates;
    const {inputs} = def || {};
    const top = inputs?.top ?? false;
    const bottom = inputs?.bottom ?? false;

    const inputUp = this.htmlNode.querySelector(".input_up");
    const inputDown = this.htmlNode.querySelector(".input_down");

    // Configurar los inputs top y bottom
    this.setInput(inputUp, top);
    this.setInput(inputDown, bottom);

    // Procesar el array principal de inputs
    inputs?.main?.forEach((item, index) => {
      const template = index % 2 === 0 ? tmp1 : tmp2;
      const clone = template.content.firstElementChild.cloneNode(true);
      const input1 = clone.querySelector(".input_1");
      const input2 = clone.querySelector(".input_2");

      // Aplicar borde y border-radius a todos los inputs de tmp1

      this.setInput(input1, item.left); // Establecer el valor del lado izquierdo
      this.setInput(input2, item.right); // Establecer el valor del lado derecho

      this.htmlNode.querySelector(".contentOthers").appendChild(clone);
    });

    this.applySizeVisibility();
  }

  setInput(input, value) {
    input.textContent = value ?? "";

    const isLeftLayout = this.def.visual === "left";
    const isCompleteLayout = this.def.visual === "complete";
    const isInput1 = input.classList.contains("input_1");

    if (value !== undefined && value !== "") {
      // Deshabilitar inputs que ya tienen valor
      input.setAttribute("disabled", "");
      input.style.color = "black";
    } else {
      if (isLeftLayout && isInput1) {
        // Si el layout es "left" y es un input_1, agregar al array inputsValidate
        input.id = `inputsValid_${this.inputsValidate.length}`;
        this.inputsValidate.push(input);
      } else if (isCompleteLayout || !this.def.visual) {
        // Si el layout es "complete" o no se define layout, agregar cualquier input vacío
        input.id = `inputsValid_${this.inputsValidate.length}`;
        this.inputsValidate.push(input);
      }
    }

    if (value === false) {
      input.style.display = "none";
    }
  }

  resetMain() {
    this.entrisModifid.forEach(input => {
      if (input.textContent === "") {
        input?.classList?.remove("checkedEscalas");
        input?.classList?.remove("passInLibrary");
        input?.classList?.remove("failedInLibrary");
        input.value = "";
        input.style.background = "transparent";
      }
    });
    this.formS.forEach(form => {
      form.checkedInputs = [];
      form.childNodes.forEach(label => {
        if (label.tagName == "LABEL") {
          label?.classList?.remove("passInLibrary");
          label?.classList?.remove("failedInLibrary");
          label.firstElementChild.value = "";
          label.firstElementChild.checked = false;
        }
      });
    });
  }

  initEngine() {
    this.initializeArtifact(this.def);
    this.contentOthers = this.htmlNode.querySelector(".contentOthers");
    if (this.def?.form) {
      this.def.form.forEach((tag, ib) => {
        if (tag.tag == "radius") {
          let form = this.createForm({
            formStyle: "Form-questions",
            formId: ib,
          });
          form.innerHTML = tag.value ?? "";
          form.dataset.maxElementCheck = tag.maxElementCheck;
          form.checkedInputs = [];
          let checks = {id: form.id, checks: []};
          tag.inputs.forEach((e, i) => {
            let input = this.createInput({
              style: `${e.style.input ?? "inputPointForm"}`,
              iterator_A: i,
              iterator_B: ib,
              type: "checkbox",
              value: e.value.input,
              readOnly: "none",
            });
            input.change = true;
            input.correctResponce = e.correctResponce ?? false;
            if (e?.value.label) {
              let label = this.createLabel({
                style: "labelTableCheck actionTableLabel",
                idInput: input.id,
                value: e.value.label,
              });
              input.fatherBg = label;
              label.appendChild(input);
              form.appendChild(label);
              if (input.correctResponce) {
                checks.checks.push(input);
              }
            } else {
              form.appendChild(input);
            }
          });
          this.entris.push(checks);
          this.selectorInputMultiple({tag: form, classCheck: "checkTable"});
          this.contentOthers.appendChild(form);
          this.formS.push(form);
        }
      });
    }

    this.entrisModifid = [...this.entris];
    this.entrisModifid = [...this.entrisModifid, ...this.inputsValidate];

    this.initTimer();
    this.mathfieldEventsAndLayauts(this.entrisModifid);
  }
}
