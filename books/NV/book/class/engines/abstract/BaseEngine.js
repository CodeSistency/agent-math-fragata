class BaseEngine {
  constructor() {
    this.htmlNode = null;
    this.interactiveInputs = [];
    this.timerInteraction = 0;
    this.Timer = null;
    this.timerActive = false;
    this.validateStatus = true;
    this.onFocus = null;
    this.allEventsForReturn = [];
    this.UX = new UX()

  }

  initTimer() {
    /* agregar todos los eventos necesarios o que peudan tener el ejercicio */
    this.htmlNode.addEventListener('mouseenter', this.iniciarTimer);
    this.htmlNode.addEventListener('mouseleave', this.detenerTimer);
    this.htmlNode.addEventListener('input', (e) => {
      if (e.target.basePoint) {
        e.target.basePoint.refName = e.target.value 
      }
      
      this.validateStatus = false;
      this.iniciarTimer(e);
    });
    this.htmlNode.addEventListener('blur', this.detenerTimer);

  };

  iniciarTimer = (e) => {

    if (this.timerActive) {
      return;
    }
    this.onFocus = e.target;
    const onFocus = e.target;
    this.timerActive = true;
    this.Timer = setInterval(() => {

      if (this.onFocus.hasFocus && !this.onFocus.hasFocus()) {
        this.detenerTimer();
        return;
      }

      this.timerInteraction = this.timerInteraction + 1;
    }, 1000);
  };

  detenerTimer = () => {
    this.timerActive = false;
    clearInterval(this.Timer);
    this.Timer = null;
  };

  resetTimer = () => {
    clearInterval(this.Timer);
    this.timerInteraction = 0;
  };

  validate = () => {

    if (this.validateStatus) {
      //status: posibles estatus
      //1: Correct
      //2: incorrect
      //3: notChange

      return { status: 3 };
    } else {
      this.validateStatus = !this.validateStatus

      const dataMod = {

        ...this.validation.iniTMainValidations(this, this.conditions,this.defBoard),
        timer: this.timerInteraction,
      }

      this.resetTimer();
      this.detenerTimer();
      return dataMod
    }
  };

  reset() { this.resetMain() }

  return() { this.returnMain() }


  mathfieldEventsAndLayauts(inputs) {

    const mathfields = inputs.filter(input => input.tagName === 'MATH-FIELD');
    mathfields.forEach(math => {
      this.UX.mathFieldEvents(math)

    });
  }


}