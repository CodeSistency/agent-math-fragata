class ValidationDiagrama extends BaseValidate {
  constructor() {
    super();
  }
  iniTMainValidations(def, conditions, radio) {
    this.resetData();
    if (conditions.operations) {
      this.validateOperations(def, conditions.operations, this.data);
    } else {
      conditions.forEach((condition, i) => {
        const entri = def.entrisModifid[i];
        console.log(entri.value, condition);
        this.validateEntriCondition(entri, condition);
      });
    }

    // this.statusValidate(data)
    this.updateMessage();
    console.log(this.data);
    return this.data;
  }

  statusValidate(data) {
    this.data = data;
  }
  validateOperations(def, conditions, data) {
    const interaction = data.interaction;
    //Se itera el array que ya contiene las respuestas

    const valueA = def.inputsValidate[0].mathfield.value;
    const valueB = def.inputsValidate[1].mathfield.value;
    def.inputsValidate.forEach((input, i) => {
      const {valueEspecting, operador} = conditions[0];
      if (input.mathfield.value == "") {
        interaction.forAnswer++;
        input.mathfield.classList.remove("failedInLibrary");
        input.mathfield.classList.remove("passInLibrary");
      } else {
        if (this.operacionValidate(valueA, valueB, operador, valueEspecting)) {
          input.mathfield.classList.add("passInLibrary");
          input.mathfield.classList.remove("failedInLibrary");

          interaction.correct++;
        } else {
          input.mathfield.classList.add("failedInLibrary");
          input.mathfield.classList.remove("passInLibrary");

          interaction.incorrect++;
        }
      }
    });
    this.data = data;
  }
}
