class engineTable extends NodeHtml {
  constructor(definition, defBoard) {
    super(defBoard);
    this.defBoard = defBoard;
    this.idTemplate = "tmpTabla";
    this.conditions = definition?.conditions;
    this.def = {...definition};
    this.idboard = definition?.name + "_board";
    this.htmlNode = null;
    this.validation = new TableValidate();
  }
  templateInsert = () => {
    if (!document.querySelector("#tmpTabla")) {
      const $templateDefaults = `<template id="tmpTabla">
      <div class="artifact-base">
      <table class="table ${this.def.clase}">
        <thead id="tHead">
        </thead>
        <tbody id="tBody"> 
        </tbody>
      </table>
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
      this.template ??= $templateDefaults;
      document.body.insertAdjacentHTML("afterend", this.template);
    }
    this.htmlNode ??= document
      .querySelector(`#${this.idTemplate}`)
      .content.firstElementChild.cloneNode(true);
    return this.htmlNode;
  };
  initEngine() {
    this.htmlNode.classList.add(
      `${this.def.artifactClass ?? "artifact-very-min"}`,
    );
    this.allBtn = this.htmlNode.querySelector(".all-btn");
    this.tHead = this.htmlNode.querySelector("#tHead");
    this.tBody = this.htmlNode.querySelector("#tBody");
    this.createHead(this.def.head);
    this.createBody(this.def.body);
    // this.entrisModifid.forEach((e,i)=>e.positionArray = i)
    this.initTimer(this.hmlNode);
    this.mathfieldEventsAndLayauts(this.entrisModifid);
  }
  createHead(head = []) {
    const tr = document.createElement("tr");
    head.forEach(e => {
      let th = document.createElement("th");
      let span = document.createElement("span");
      span.classList = `spanHead`;
      th.classList.add("th");
      th.classList.add("classTh");
      span.textContent = e;
      th.appendChild(span);
      tr.appendChild(th);
    });
    this.tHead.appendChild(tr);
  }
  createBody(bodys = []) {
    bodys.forEach((body, iB) => {
      const tr = document.createElement("tr");
      tr.className = `${this.def.trClass ?? "tr"}`;
      body.forEach(e => {
        let td = document.createElement("td");
        td.className = `${e?.style?.td ?? ""} td`;
        if (e.text) {
          let span = document.createElement("span");
          span.textContent = e.text;
          td.appendChild(span);
        }

        if (e.tag == "select") {
          let tag = this.createSelect({
            style: {
              select: e.style ?? "select",
            },
            valueOption: e.default,
          });
          td.appendChild(tag);
          tag.fatherBg = tag.parentElement;
        } else if (e.tag == "input") {
          let tag = this.createMathField({
            style: `${e.style ?? ""} mathfield celdaEncabezado`,
          });
          td.appendChild(tag);
          tag.fatherBg = tag.parentElement;
        } else if (e.tag == "form") {
          let form = this.createForm({
            formStyle: e.style?.form ?? "formInputs",
            formId: iB,
          });
          e.value ? (form.innerHTML = e.value) : null;
          if (e.checks) {
            e.checks.forEach(setCheck => {
              const {maxElementCheck, inputs, value, style, parent} = setCheck;
              let formCheck = this.createForm({
                formStyle: ` ${style?.form ?? ""} formTableCheck contentLabels`,
                formId: iB,
              });
              let checks = {id: form.id, checks: []};
              formCheck.dataset.maxElementCheck = maxElementCheck;
              formCheck.checkedInputs = [];
              formCheck.innerHTML = value?.form ?? "";
              inputs.forEach((a, i) => {
                let input = this.createInput({
                  style: `${a.style.input ?? "inputTableCheck"}`,
                  iterator_A: i,
                  iterator_B: iB,
                  type: "checkbox",
                  value: "",
                  readOnly: "none",
                });
                input.change = true;
                input.correctResponce = a.correctResponce ?? false;
                if (a?.value.label) {
                  let label = this.createLabel({
                    style: `${
                      a.style.label ?? "labelTableCheck actionTableLabel"
                    }`,
                    idInput: input.id,
                    value: a.value.label,
                  });
                  input.fatherBg = label;
                  label.appendChild(input);
                  formCheck.appendChild(label);
                  this.formS.push(formCheck);
                  if (input.correctResponce) {
                    checks.checks.push(input);
                  }
                } else {
                  formCheck.appendChild(input);
                  this.formS.push(formCheck);
                }
              });
              this.entris.push(checks);
              this.selectorInputMultiple({
                tag: formCheck,
                classCheck: "checkTable",
              });
              parent
                ? form
                    .querySelector(`.${parent}, #${parent}`)
                    .appendChild(formCheck)
                : form.appendChild(formCheck);
            });
          }
          if (e.inputs) {
            e.inputs.forEach((e, i) => {
              let tag = this.createMathField({
                style: `mathfield ${e.style?.input ?? ""}`,
              });
              tag.id = `${i}.${iB}`;
              tag.fatherBg = tag;
              if (e.text) {
                let span = this.createSpan({
                  SpanStyle: `${e.style?.span ?? "spanMathfiled"}`,
                  SpanText: e.text.span,
                });
                tag.className.includes("displayNone")
                  ? null
                  : span.appendChild(tag);
                e.parent
                  ? form
                      .querySelector(`.${e.parent}, #${e.parent}`)
                      .appendChild(span)
                  : form.appendChild(span);
              } else {
                e.parent
                  ? form
                      .querySelector(`.${e.parent}, #${e.parent}`)
                      .appendChild(tag)
                  : form.appendChild(tag);
              }
            });
          }
          if (e.selects) {
            e.selects.forEach(e => {
              let tag = this.createSelect({
                style: {
                  select: e?.style?.select ?? "select",
                },
                valueOption: e?.default,
              });
              tag.fatherBg = tag.parentElement;
              if (e?.text?.span) {
                let span = this.createSpan({
                  SpanStyle: `${e?.style.span ?? "spanMathfiled"} `,
                  SpanText: e?.text.span,
                });
                span.appendChild(tag);
                form.appendChild(span);
              } else {
                e.parent
                  ? form
                      .querySelector(`.${e.parent}, #${e.parent}`)
                      .appendChild(tag)
                  : form.appendChild(tag);
              }
            });
          }
          td.appendChild(form);
        } else if (e.tag == "checks") {
          let form = this.createForm({
            formStyle: "formTableCheck contentLabels",
            formId: iB,
          });
          let checks = {id: form.id, checks: []};
          form.dataset.maxElementCheck = e.maxElementCheck;
          form.checkedInputs = [];
          e.inputs.forEach((a, i) => {
            let input = this.createInput({
              style: `${a.style.input ?? "inputTableCheck"}`,
              iterator_A: i,
              iterator_B: iB,
              type: "checkbox",
              value: "",
              readOnly: "none",
            });
            input.change = true;
            input.correctResponce = a.correctResponce ?? false;
            if (a?.value.label) {
              let label = this.createLabel({
                style: `${a.style.label ?? "labelTableCheck actionTableLabel"}`,
                idInput: input.id,
                value: a.value.label,
              });
              input.fatherBg = label;
              label.appendChild(input);
              form.appendChild(label);
              this.formS.push(form);
              if (input.correctResponce) {
                checks.checks.push(input);
              }
            } else {
              form.appendChild(input);
              this.formS.push(form);
            }
          });
          this.entris.push(checks);
          this.selectorInputMultiple({tag: form, classCheck: "checkTable"});
          td.appendChild(form);
        } else {
          let span = document.createElement("span");
          span.innerHTML = "";
          if (e.value) {
            if (e.value == "void") {
              span.innerHTML = "";
            } else {
              span.innerHTML = e.value;
            }
          } else {
            span.innerHTML = e;
          }
          span.className = `${e?.style?.span ?? "inputLarge"}`;
          td.appendChild(span);
        }
        tr.appendChild(td);
      });
      this.entrisModifid = [...this.entris];
      this.tBody.appendChild(tr);
    });
  }
  resetMain() {
    this.formS.forEach(form => {
      form.checkedInputs = [];
      form.childNodes.forEach(label => {
        label?.classList?.remove("checkTable");
        label?.classList?.remove("passInLibrary");
        label?.classList?.remove("failedInLibrary");
        label.firstElementChild.value = "";
        label.firstElementChild.checked = false;
      });
    });
    this.entrisModifid.forEach(entrada => {
      if (entrada.tagName == "SELECT") {
        entrada.selectedIndex = 0;
        entrada.classList?.remove("passInLibrary");
        entrada.classList?.remove("failedInLibrary");
      } else {
        entrada.value = "";
      }
      entrada?.fatherBg?.classList?.remove("passInLibrary");
      entrada?.fatherBg?.classList?.remove("failedInLibrary");
    });
    this.entrisModifid = [];
    this.entrisModifid = [...this.entris];
  }
}
