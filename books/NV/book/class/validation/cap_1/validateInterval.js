class ValidationHorizontal {
  constructor() {}

  iniTMainValidations(def, conditions, defBoard) {
    const data = {
      status: 3,
      timer: 0,
      userInteraction: {},
      message: "",
      interaction: {
        correct: 0,
        incorrect: 0,
        forAnswer: 0,
      },
    };

    if (def.statusInpModalidad) {
      this.validateOtherInput(def, data);
    } else {
      if (defBoard?.slider && defBoard?.slider?.visible) {
        this.othervalidates(def, data);
        this.validateIntervals(def, conditions, data, defBoard);
      } else {
        this.validateIntervals(def, conditions, data, defBoard);
      }
    }
    this.statusValidate(data);
    return data;
  }

  othervalidates(def, data) {
    const points = def.visip;
    const curves = def.pasos;
    const interaction = data.interaction;
    let message = [];

    // Verificar si la penúltima curva es visible
    const lastCurveVisible = curves[curves.length - 1].visProp.visible;

    if (points.length < 3) {
      const firstcurveVisible = curves[0].visProp.visible;
      if (firstcurveVisible) {
        if (lastCurveVisible) {
          curves.forEach(curve => {
            curve.setAttribute({strokeColor: "#09ec0e"});
          });

          interaction.correct++;
        } else {
          curves.forEach(curve => {
            if (curve.visProp.visible) {
              curve.setAttribute({strokeColor: "#ec0e09"});
            }
          });

          interaction.incorrect++;

          message.push("Revisa Los Pasos.");
        }
      } else {
        interaction.forAnswer++;
      }
    } else if (points.length > 2) {
      const firstpointVisible = points[1].visProp.visible();

      if (firstpointVisible) {
        if (lastCurveVisible) {
          curves.forEach(curve => {
            curve.setAttribute({strokeColor: "#09ec0e"});
          });

          interaction.correct++;
        } else {
          curves.forEach(curve => {
            if (curve.visProp.visible) {
              curve.setAttribute({strokeColor: "#ec0e09"});
            }
          });

          interaction.incorrect++;
        }
      } else {
        interaction.forAnswer++;
      }
    }

    data.message += message.join(" ");

    def.sliderC.on("drag", () => {
      def.PointsAndCurves(); // Llamar al método para restablecer puntos y curvas
      // Resto del código del evento de arrastre...
    });
    def.pasos.forEach(p => {
      p.on("down", () => {
        def.PointsAndCurves();
      });
    });
  }

  validateIntervals(def, conditions, data, defBoard) {
    const {intervals} = conditions;
    const {inputs} = intervals;
    const interaction = data.interaction;
    const curioso = defBoard?.curioso ?? false;

    const intervalsValues = [];

    const addClass = (element, className) => element.classList.add(className);
    const removeClass = (element, className) =>
      element.classList.remove(className);

    const updateClass = (input, isValid) => {
      if (isValid) {
        addClass(input, "passInLibrary");
        removeClass(input, "failedInLibrary");
      } else {
        addClass(input, "failedInLibrary");
        removeClass(input, "passInLibrary");
      }
    };

    const validateInput = (input, conditionValue) => {
      const isValid = this.valudateInputs(
        input.mathfield.value,
        conditionValue,
      );
      updateClass(input.mathfield, isValid);
      return isValid;
    };

    def.intervals.forEach(interval => {
      const values = [];
      let intervalcorrect = 0;
      let intervalIncorrect = 0;
      let forAnswer = 0;

      const [inputA, inputB] = interval.inputs
        .slice(0, 2)
        .map(input => input.mathfield.value);

      if (curioso) {
        if (inputA !== "" && inputB !== "") {
          const result = inputB - inputA;

          const isValid = this.valudateInputs(result, inputs.values[0]);

          updateClass(interval.inputs[0].mathfield, isValid);
          updateClass(interval.inputs[1].mathfield, isValid);

          if (isValid) {
            intervalcorrect++;
          } else {
            intervalIncorrect++;
          }
        } else {
          if (inputA !== "") {
            if (inputB !== "") {
              const result = inputB - inputA;
            }
            const result = inputB;

            const isValid = this.valudateInputs(result, inputs.values[0]);

            updateClass(interval.inputs[0].mathfield, isValid);

            if (isValid) {
              intervalcorrect++;
            } else {
              intervalIncorrect++;
            }
          } else {
            forAnswer++;
            removeClass(interval.inputs[0].mathfield, "passInLibrary");
            removeClass(interval.inputs[0].mathfield, "failedInLibrary");
          }

          if (inputB !== "") {
            let result;
            if (inputA !== "") {
              return (result = inputB - inputA);
            }
            if (result !== undefined) {
              const isValid = this.valudateInputs(result, inputs.values[0]);

              updateClass(interval.inputs[1].mathfield, isValid);

              if (isValid) {
                intervalcorrect++;
              } else {
                intervalIncorrect++;
              }
            } else {
              updateClass(interval.inputs[1].mathfield, false);
              intervalIncorrect++;
            }
          } else {
            forAnswer++;
            removeClass(interval.inputs[1].mathfield, "passInLibrary");
            removeClass(interval.inputs[1].mathfield, "failedInLibrary");
          }
        }
      } else {
        interval.inputs.forEach((inp, i) => {
          const {mathfield} = inp;
          const value = mathfield.value;
          if (value !== "") {
            const isValid = validateInput(inp, inputs.values[i]);
            if (isValid) {
              intervalcorrect++;
            } else {
              intervalIncorrect++;
            }
          } else {
            forAnswer++;
            removeClass(mathfield, "passInLibrary");
            removeClass(mathfield, "failedInLibrary");
          }

          values.push(value);
        });
      }

      interaction.forAnswer += forAnswer;
      interaction.correct += intervalcorrect;
      interaction.incorrect += intervalIncorrect;

      intervalsValues.push(values);
    });

    data.userInteraction.intervals = intervalsValues;
  }

  statusValidate(data) {
    if (data.interaction.incorrect < 1 && data.interaction.forAnswer < 1) {
      // Todo está correcto
      data.message += "¡Muy bien! Excelente";
      data.status = 1;
    } else if (data.interaction.forAnswer < 1 && data.interaction.correct < 1) {
      data.message += "Verifica los valores";
      data.status = 2;
    } else if (data.interaction.correct > 1 && data.interaction.incorrect > 1) {
      data.message += "Rectifica los valores";
      data.status = 2;
    } else {
      // Caso que no encaje en las condiciones anteriores
      data.message += "Verifica o completa el ejercicio";
      data.status = 2;
    }
  }

  valudateInputs(input, condition) {
    return input == condition;
  }

  validateOtherInput(def, data) {
    const vlu1 = parseInt(def.interactiveInputs[0].value);
    const vlu2 = parseInt(def.interactiveInputs[1].value);
    const vlu3 = parseInt(def.interactiveInputs[2].value);
    const sum = vlu1 + vlu2;
    const targt = def.inptarg;

    if (vlu1 == "" || vlu2 == "" || vlu3 == "") {
      targt.classList.remove("passInLibrary");
      targt.classList.remove("failedInLibrary");
      data.status = 3;
      data.message += "Todos los valores deben ser ingresados.";
      data.interaction.forAnswer++;
      return;
    } else {
      if (sum == vlu3) {
        targt.classList.add("passInLibrary");
        targt.classList.remove("failedInLibrary");
        data.status = 1;
        data.interaction.correct++;
      } else {
        targt.classList.remove("passInLibrary");
        targt.classList.add("failedInLibrary");
        data.status = 2;
        data.interaction.incorrect++;
      }
    }
  }
}
