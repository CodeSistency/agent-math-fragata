class EscalasValidate extends BaseValidate {
    constructor() {
        super()

    }



    iniTMainValidations(def, conditions) {
        this.resetData()
        conditions.forEach((condition, i) => {

            const input = def.entrisModifid[i]

            if (input?.inputsInteractive) {
                
                this.aggClassValidate(input?.fatherBg ?? input, this.validateArraysInclues(condition, input?.value))
            } else if (input?.inputsInteractive == false || input?.addValue == true) {
                if (input.addValue) { this.data.interaction.forAnswer++ }
                return
                
            } else if (!Array.isArray(condition)&&!condition?.checks) {

                if (condition?.curves) {

                    // DESESTRUCTURACION DE LOS DATOS 
                    // conditions desde la definicion (lo esperado)
                    const { steps, type, simplifiedPath, curves } = condition.curves;

                    // conditions desde la creación (lo que se realizó)
                    const { curveValidation, simplifiedPathCurve } = def.validationItems;

                    // filtracion de curvas normales
                    const boardsCurveValidation = {}
                    def.points.forEach(point => {
                        if (!boardsCurveValidation.hasOwnProperty(point.refLineBoard)&& point.refLineBoard!=="null" ) {
                            boardsCurveValidation[point.refLineBoard] = []
                        }  });

                    curveValidation.forEach(curve => {
                        if (boardsCurveValidation.hasOwnProperty(curve.refLineBoardCurve)) {
                            boardsCurveValidation[curve.refLineBoardCurve].push(curve)
                        } })

                    // filtracion de curvas de pasos simplificados
                    const boardsSimplifiedPathCurve = {}
                    def.points.forEach(point => {
                        if (!boardsSimplifiedPathCurve.hasOwnProperty(point.refLineBoard)&& point.refLineBoard!=="null") {
                            boardsSimplifiedPathCurve[point.refLineBoard] = []
                        } });

                    simplifiedPathCurve.forEach(curve => {
                        if (boardsSimplifiedPathCurve.hasOwnProperty(curve.refLineBoardCurve)) {
                            boardsSimplifiedPathCurve[curve.refLineBoardCurve].push(curve)
                        }})
             
                    // validacion de curvas continuas
                    boardsCurveValidation[condition.curves.id]?.forEach((curve, index,array) => {
                        curve.parents.some((refPoint) => {
                            array.forEach(cur => {
                                if (curve.id !== cur.id) { if (cur.parents.some(e => e == refPoint)) { cur.continues = true } }

                            })
                        })
                    });

                    const isContinue = boardsCurveValidation[condition.curves.id].length > 0 ? boardsCurveValidation[condition.curves.id].every(e => e.continues ? true : false) : false


                    // validacion total de los pasos simples
                    const validationSteps = boardsCurveValidation[condition.curves.id].every(e => e.stepsValidation == steps || e.stepsValidation == -steps) && boardsCurveValidation[condition.curves.id].every(e => e.typeDirection == type) && boardsCurveValidation[condition.curves.id].length == curves && !(boardsCurveValidation[condition.curves.id].length > curves && !simplifiedPath)&&  (simplifiedPath || curves>1?isContinue:(!simplifiedPath&&!isContinue)) ;


                    // validacion total de las curvas simplificadas
                    const curvesOrdinates = [...boardsCurveValidation[condition.curves.id]].sort((a, b) => a.refNumCurve - b.refNumCurve)

                    let curveSimplifiedType 
                    boardsCurveValidation[condition.curves.id].forEach(curveSteps=>{
                        boardsSimplifiedPathCurve[condition.curves.id].forEach(curveSimplified=>{
                            curveSimplifiedType= curveSteps.typeDirection==curveSimplified.typeDirection
                        })

                    })
                    const validationStepsSimplified = simplifiedPath && boardsSimplifiedPathCurve[condition.curves.id].length > 0 &&validationSteps && curveSimplifiedType && boardsSimplifiedPathCurve[condition.curves.id].some(curva =>
                        curva.extremesCoords[0] === curvesOrdinates[0].extremesCoords[0] &&
                        curva.extremesCoords[1] === curvesOrdinates[curvesOrdinates.length - 1].extremesCoords[1]
                    ) && !(boardsSimplifiedPathCurve[condition.curves.id].length>1)

                    // union de las curvas y validacion
                    const unitCurves= [  ...boardsCurveValidation[condition.curves.id],...boardsSimplifiedPathCurve[condition.curves.id] ]

                    unitCurves.forEach((curves, index)=>{

                        // cuenta de las correctas e incorrectas
              
                        if((simplifiedPath&&validationSteps&& validationStepsSimplified)||(!simplifiedPath&&validationSteps && index!=0) ){
                            curves.setAttribute({ strokeColor: '#7ed957' });
                         
                        }else{
                            curves.setAttribute({ strokeColor: '#f1604d' });
                        }
                    })
              
                    this.aggClassValidateJSX(unitCurves[0], simplifiedPath?validationSteps&& validationStepsSimplified:validationSteps )

                
                    if (condition.curves.input) {
                        const inputFilter = def.interactiveFigures.filter(input=>input.inputCurve==true)
                        const inputCurve = inputFilter.find(e => e.refLineBoardCurve == condition.curves.id);
                        if (inputCurve) {
                            this.validateEntriCondition(inputCurve.mathfield, condition.curves.input);
                            } else {
                            this.data.interaction.forAnswer++;
                                    }
                                }
                            }
            }
            else {
                this.validateEntriCondition(input, condition);
            }

            this.updateMessage()

        });


        return this.data;
    }







}
