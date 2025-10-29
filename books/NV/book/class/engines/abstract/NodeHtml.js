class NodeHtml extends baseBoards {
  constructor() {
    super();
    this.entris = [];
    this.entrisModifid = [];
    this.numberGenerate = [];
    this.formS = [];
    this.UX.defModal();
  }
  createMathField(params) {
    let mathfield = document.createElement("math-field");
    mathfield.className = params.style;
    if (!mathfield.className.includes("displayNone")) {
      this.entris.push(mathfield);
      this.def?.ModalMobile ? this.UX.fillTheModal(mathfield, this) : null;
    }
    return mathfield;
  }
  createInput(params) {
    let input = document.createElement("input");
    input.style.display = params.display ?? "";
    input.type ? (input.type = params.type) : (input.type = "text");
    input.className = `${params.style ?? "radioTable"}`;
    input.id = `${input.type}_${params.iterator_B ?? ""}${params.iterator_A}_${
      this.def.name
    }`;
    if (input.name) {
      input.name = `group_${params.iterator_B ?? ""}`;
    }
    input.value = params.value;
    input.readOnly = params.readOnly ?? "readonly";
    input.style.display = params.display ?? "";
    return input;
  }
  createLabel(params) {
    let label = document.createElement("label");
    label.classList = `${params.style ?? ""}`;
    label.setAttribute("for", params.idInput);
    label.textContent = params.value;
    return label;
  }
  createSelect(params) {
    let select = document.createElement("select");
    select.classList = params.style.select;
    for (let i = 0; i < params.valueOption.length; i++) {
      let opcion = new Option(
        params.valueOption[i].valor
          ? params.valueOption[i].valor
          : params.valueOption[i],
        params.valueOption[i].valor
          ? params.valueOption[i].valor
          : params.valueOption[i] ?? "",
      );
      select.add(opcion, this.NumberRamdom(params.valueOption.length));
    }
    this.entris.push(select);
    return select;
  }
  NumberRamdom(num) {
    let numeroAleatorio = Math.floor(Math.random() * num) + 1;
    while (this.numberGenerate.includes(numeroAleatorio)) {
      return (numeroAleatorio = Math.floor(Math.random() * num) + 1);
    }
    this.numberGenerate.push(numeroAleatorio);
    return numeroAleatorio;
  }
  createSpan(params) {
    let span = document.createElement("span");
    span.className = `${params.SpanStyle ?? ""}`;
    span.id = params.SpanId ?? "";
    if (params.p ?? true) {
      let p = document.createElement("p");
      p.innerHTML = params.SpanText ?? "";
      p.className = "spanP";
      span.appendChild(p);
    } else {
      span.innerHTML = params.SpanText ?? "";
    }
    return span;
  }
  createForm(params) {
    let form = document.createElement("form");
    form.className = `${params.formStyle ?? ""}`;
    form.id = `${params.formId}_${this.def.name}` ?? "";
    form.innerHTML = `${params.value ?? ""}`;
    return form;
  }
  selectorInputMultiple(params) {
    const {tag, classCheck} = params;
    tag.addEventListener("click", event => {
      if (event.target.tagName === "INPUT") {
        const input = event.target;
        const label = event.target.parentElement;
        const form = label.parentElement;
        label.classList.add(`${classCheck ?? "checkedEscalas"}`);
        if (input.id == form.checkedInputs[form.checkedInputs.length - 1]?.id) {
          let trash = form.checkedInputs.pop();
          label.classList.remove(`${classCheck}`);
          label.classList.remove("passInLibrary");
          label.classList.remove("failedInLibrary");
          trash.value = "";
          trash.checked = false;
        } else {
          input.value = label.textContent;
          form.checkedInputs.push(input);

          if (form.checkedInputs.length > form.dataset.maxElementCheck) {
            form.checkedInputs[0].value = "";
            form.checkedInputs[0].parentElement.classList.remove(
              `${classCheck ?? "checkedEscalas"}`,
            );
            form.checkedInputs[0].parentElement.classList.remove(
              "passInLibrary",
            );
            form.checkedInputs[0].parentElement.classList.remove(
              "failedInLibrary",
            );
            form.checkedInputs[0].checked = false;
            form.checkedInputs.shift();
          }
          this.entrisModifid.forEach(setCondition => {
            if (setCondition?.id == form.id) {
              if (setCondition.checks.some(entri => entri.id == input.id)) {
                return;
              } else {
                for (let i = 0; i < setCondition.checks.length; i++) {
                  if (
                    !setCondition.checks[i].value &&
                    !setCondition.checks[i].checked
                  ) {
                    if (
                      setCondition.checks.some(entri => entri.id == input.id)
                    ) {
                      return;
                    } else {
                      setCondition.checks[i] = input;
                    }
                  }
                }
              }
            } else {
            }
          });
        }
      }
    });
  }
  reemplazarElemento(arr, elementoEspecifico, nuevoElemento) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === elementoEspecifico) {
        arr[i] = nuevoElemento;
      }
    }
    return arr;
  }
  createPoints(params = {}) {
    let {spaceExtreme, points: defPoints} = this.defBoard;
    const {line, pointsLine, spaceExtremeLine} = params;

    let points;

    let a;
    let b;
    let ay;
    let by;

    if (line && pointsLine) {
      a = line.point1.X() + (spaceExtremeLine ?? 1);
      b = line.point2.X() - (spaceExtremeLine ?? 1);
      ay = line.point1.Y();
      by = line.point2.Y();
      points = pointsLine ?? [];
    } else {
      a = this.typeBoard?.boundingbox[0] + (spaceExtreme ?? 1.5);
      b = this.typeBoard?.boundingbox[2] - (spaceExtreme ?? 1.5);
      points = defPoints ?? [];
    }

    points.forEach((point, i) => {
      let x =
        a && b ? this.calulateExtents({a, b, i, quantity: points.length}) : 0;
      let y =
        ay && by
          ? this.calulateExtents({a: ay, b: by, i, quantity: points.length})
          : 0;

      let newPoint = this.board.create("point", [x, y], {
        precision: {
          touch: 7,
          touchMax: 6,
          mouse: 4,
          pen: 4,
          hasPoint: 1,
        },
        fixed: true,
        name: point.name ?? "",
        ...point,
      });
      newPoint.refLineBoard =
        line && pointsLine ? line.ref : this.BoardContent.id;
      newPoint.refNumIndex = i;

      if (point.text) {
        if (
          point.text.position == "default" ||
          point.text.position == undefined
        ) {
          this.createTextJsxgraph(
            {
              x: newPoint.X(),
              y: newPoint.Y() + 4,
            },
            point.text.value,
          );
        } else if (defPoints[i].text.position == "invested") {
          this.createTextJsxgraph(
            {
              x: newPoint.X(),
              y: newPoint.Y() - 4,
            },
            point.text.value,
          );
        } else {
          this.createTextJsxgraph(
            {
              x: point.text.position[0],
              y: point.text.position[1],
              style: point.text.style,
            },
            point.text.value,
          );
        }
      }

      this.points.push(newPoint);

      //  filtracion de puntos por linea
      this.filterPointsLines = {};
      this.points.forEach((point, index, array) => {
        if (!this.filterPointsLines.hasOwnProperty(point.refLineBoard)) {
          this.filterPointsLines[point.refLineBoard] = [];
        }

        if (this.filterPointsLines.hasOwnProperty(array[index].refLineBoard)) {
          this.filterPointsLines[point.refLineBoard].push(array[index]);
        }
      });
    });
  }
  calulateExtents(params) {
    const {a, b, i, quantity} = params;
    return a + (b - a) * (i / (quantity - 1));
  }
  generateUniqueId(cantiDigit) {
    // Genera un número aleatorio entre 0 y 99999
    const randomNumber = Math.floor(Math.random() * 100000);

    // Formatea el número para que tenga siempre 5 dígitos
    const uniqueId = String(randomNumber).padStart(cantiDigit, "0");

    return uniqueId;
  }
}
