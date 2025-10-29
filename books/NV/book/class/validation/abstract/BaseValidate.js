//Class abstracta para validar los inputs
class BaseValidate {
  constructor() {
      this.computeEngine = new ComputeEngine.ComputeEngine();
      this.data = {
          status: 3,
          timer: 0,
          userInteraction: {},
          message: '',
          interaction: {
              correct: 0,
              incorrect: 0,
              forAnswer: 0
          }
      };
      
  }
  resetData(){
      this.data = {
          status: 3,
          timer: 0,
          userInteraction: {},
          message: '',
          interaction: {
              correct: 0,
              incorrect: 0,
              forAnswer: 0
          }
      };  
  }

  validateEntriCondition(entri,condition){

      if (!entri) console.error("Las entrada no esta definida");
      if (!condition) console.error("Las condicion no esta definida");

      if (condition.expected) {
          this.initValidateComputeEngine(entri,condition)
      } else {
          if (condition.checks) {
              entri.checks.forEach((e, i) => {
                  this.aggClassValidate(e.fatherBg ?? e, this.validateArraysInclues(condition.checks, e.value))
              })
          }else{
              this.aggClassValidate(entri?.fatherBg ?? entri, this.validateEntri(condition, entri));
          }
      }
          
      return this.data

      
      
  }
  updateMessage({sucess, error, incomplete} = {}){
      if (this.data.interaction.incorrect === 0 && this.data.interaction.forAnswer === 0) {
          this.data.message = sucess ?? "¡Muy bien! Excelente"
          this.data.status = 1
      } else if (this.data.interaction.correct > 0 && this.data.interaction.incorrect > 0) {
          this.data.message = "Rectifica los valores"
          this.data.status = 2
      } else if (this.data.interaction.incorrect === 0 && this.data.interaction.forAnswer > 0) {
          this.data.message = incomplete ?? "Verifica y Completa"
          this.data.status = 2
      } else {
          this.data.message = error ?? "Revisa Valores Ingresados"
          this.data.status = 2
      }
  }

  initValidateComputeEngine(entri,condition){

      let expect = this.computeEngine.parse(entri.value)
          expect.zero = true
          let entriFalse = entri
          if (condition.expected.some(a => a === expect.latex)) return entriFalse = "error",this.aggClassValidate(entri?.fatherBg ?? entri, this.validateEntri(condition.expected, entriFalse));
                      
          if (expect.evaluate().latex == "") return this.aggClassValidate(entri?.fatherBg ?? entri, this.validateEntri(condition.expected, entri))
                                     
          return entri.value = expect.evaluate().latex,this.aggClassValidate(entri?.fatherBg ?? entri, this.validateEntri(condition.expected, entri));                 
  }

  travelValidate(def,conditions,message){
      this.resetData()
      let {entrisModifid} = def
      
      if(entrisModifid.length !== conditions.length) return console.error("Las entradas y las condiciones no tienen las mismas cantidades de elementos");
      
      conditions.forEach((condition,i)=>{
          let entri = entrisModifid[i]
          this.validateEntriCondition(entri,condition)
      })  

      this.updateMessage(message)
      
  }
 


  validateEntri(condition, entrada) {  
      
      return !entrada || !entrada.value || (entrada.tagName === "SELECT" && entrada.value == "--" || entrada.value.trim().toLowerCase() == "selecciona")
          ? "forAnswer"
          : condition.some(c => c.value ? c.value : c == entrada.value.trim().toLowerCase());
  }

  aggClassValidate(tag,classChange = "forAnswer"){
      if (classChange === "forAnswer"||!tag) {
          tag?.classList.remove('failedInLibrary');
          tag?.classList.remove('passInLibrary');
          this.data.interaction.forAnswer++;
          
      }else if(classChange){
          tag.classList.remove('failedInLibrary');
          tag.classList.add('passInLibrary');
          this.data.interaction.correct++;
      }else{
          tag.classList.remove('passInLibrary');
          tag.classList.add('failedInLibrary');
          this.data.interaction.incorrect++;   
      }
  }
  aggClassValidateJSX(tag,classChange = "forAnswer"){
      if (classChange == "forAnswer"||!tag) {
          this.data.interaction.forAnswer++;
      }else if(classChange){
          tag?.setAttribute({ strokeColor: '#7ed957' });
          
          this.data.interaction.correct++;
      }else{
          tag?.setAttribute({ strokeColor: '#f1604d' });
          this.data.interaction.incorrect++;   
      }
  }
  validateArraysInclues(array,entrada){
      if (entrada == ""|| entrada == "selecciona") {
          return "forAnswer"
      }else if (array.includes(entrada)) {//si condition no es un array se rompe
          return true
      }else{
          return false
      }
  }
  operacionValidate(valueA,valueB,operador,esperado){
      const a = this.computeEngine.parse(`${valueA} ${operador} ${valueB}`);
      const b = this.computeEngine.parse(`${esperado}`);
      return( a.isEqual(b));
  }

  verifyEntriCondition(composedA,composedB){
      if (!composedA) return
      return this.initComposed(composedA,composedB)  
  }

  initComposed(numerator="",operationA=""){
    const regex = /[+\-*/]/g;
    let exp
    if (operationA) {
      exp = this.computeEngine.parse(`${numerator} ${operationA}`)
    }else{
      exp = this.computeEngine.parse(`${numerator}`)
    }
    const result = exp.evaluate().latex 
    return result
  }

  replaceIsolatedLetter(text, letterToReplace, replacement) {
    const textModifid = text.replace(letterToReplace, replacement);
    return textModifid
}
 //compara dos valores position  con cierta olgura
gInterPoint(value, compare, noise = 0.1, minDecimal = 2) {
  if (typeof value === 'number' && typeof compare === 'number') {
    if (
      parseFloat(value.toFixed(minDecimal)) <= parseFloat(compare.toFixed(minDecimal)) + noise &&
      parseFloat(value.toFixed(minDecimal)) >= parseFloat(compare.toFixed(minDecimal)) - noise
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

getLineProperties(line) {
  const point1 = line.point1;
  const point2 = line.point2;
  
  const x1 = point1.X();
  const y1 = point1.Y();
  const x2 = point2.X();
  const y2 = point2.Y();
  
  // Calcular la longitud de la línea
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  
  // Calcular la pendiente (m)
  const slope = (y2 - y1) / (x2 - x1);
  
  // Calcular el ángulo de la línea con respecto al eje x
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  // Calcular la dirección
  const direction = Math.sign(x2 - x1) === 0 ? 'vertical' : (Math.sign(y2 - y1) === 0 ? 'horizontal' : (x2 > x1 ? 'right' : 'left'));

  return {
      start: { x: x1, y: y1 },
      end: { x: x2, y: y2 },
      length: length,
      slope: slope,
      angle: angle,
      direction: direction
  }
}
  
}
