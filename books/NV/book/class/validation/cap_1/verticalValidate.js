class verticalValidate extends BaseValidate {
  constructor() {
    super();
  }

  iniTMainValidations(def, conditions) {
    this.resetData();
    let {entrisModifid} = def;
    let IncognitValue;
    let equation;
    let condicionsModifid = [...conditions];
    let iInputEquation;

    condicionsModifid.forEach((condition, i) => {
      let entri = entrisModifid[i];
      console.log(entri, condition);
      
      if (
        typeof condition === "object" &&
        condition !== null &&
        !Array.isArray(condition) &&
        !condition.checks
      ) {
        const {
          variant,
          dependent_A,
          dependent_B,
          equationInput = "error",
        } = condition;

        if (variant || dependent_A || dependent_B || equationInput) {
          if (
            condicionsModifid.some(e => e.equationInput == entri.id && i == 0)
          ) {
            equation =
              entrisModifid[equationInput.split("_")[1]]?.value.split("=") ??
              undefined;

            if (!entri.value) return;
            const regex = entri.value.match(/\b[a-zA-Z]\b/);
            IncognitValue = `${regex[0]}`;
            condicionsModifid[i] = [entri.id];
            iInputEquation = i;
          } else {
            if (variant) {
              condicionsModifid[i] = [IncognitValue];
            } else {
              if (dependent_A || dependent_B) {
                if (
                  equation.length > 1 &&
                  (dependent_A?.partEquation || dependent_B?.partEquation)
                ) {
                  let formResult = this.verifyEntriCondition(
                    this.replaceIsolatedLetter(
                      equation[
                        dependent_A.partEquation || dependent_B.partEquation
                      ],
                      IncognitValue,
                      entrisModifid[
                        dependent_A?.index || dependent_B?.index
                      ]?.getValue() ?? "",
                    ),
                  );
                  if (
                    formResult == equation[1] &&
                    (dependent_A?.index || dependent_B?.index)
                  ) {
                    condicionsModifid[i] = [
                      entrisModifid[
                        dependent_A?.index || dependent_B?.index
                      ].getValue(),
                    ];
                    condicionsModifid[iInputEquation] = [
                      entrisModifid[iInputEquation].value,
                    ];
                    this.aggClassValidate(
                      entrisModifid[iInputEquation].fatherBg ??
                        entrisModifid[iInputEquation],
                      this.validateArraysInclues(
                        condicionsModifid[iInputEquation],
                        entrisModifid[iInputEquation].value,
                      ),
                    );
                  } else {
                    condicionsModifid[i] = ["error"];
                  }
                } else if (
                  equation.length > 1 &&
                  (dependent_A.leftEquation || dependent_B.leftEquation)
                ) {
                  condicionsModifid[i] = [equation[1]];
                } else {
                  condicionsModifid[i] = [
                    this.verifyEntriCondition(
                      (dependent_A && dependent_A.value) ||
                        entrisModifid[dependent_A?.index]?.value ||
                        "",
                      (dependent_B && dependent_B.value) ||
                        entrisModifid[dependent_B?.index]?.value ||
                        "",
                    ) || "",
                  ];
                }
              }
            }
          }
        }
        if (i !== 0)
          this.aggClassValidate(
            entri.fatherBg ?? entri,
            this.validateArraysInclues(condicionsModifid[i], entri.value),
          );
      } else {
        this.validateEntriCondition(entri, condition);
      }
    });

    this.updateMessage();
    return this.data;
  }
}



