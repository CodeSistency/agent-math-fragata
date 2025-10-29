//Class abstracta para validar los inputs
class validateInput {
  constructor() {
    this.computeEngine = new ComputeEngine.ComputeEngine();
  }

  operacionValidate(valueA, valueB, operador, esperado) {
    const a = this.computeEngine.parse(`${valueA} ${operador} ${valueB}`);

    const b = this.computeEngine.parse(`${esperado}`);
    //console.log(a,b)
    return a.isEqual(b);
  }
}
//const valores= new validateInput
//Se va hacer prueba Unitaria
//console.log(valores.operacionValidate(1,3,"*",3))
