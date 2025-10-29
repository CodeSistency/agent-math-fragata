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
        forAnswer: 0,
      },
    };
  }

  resetData() {
    this.data = {
      status: 3,
      timer: 0,
      userInteraction: {},
      message: '',
      interaction: {
        correct: 0,
        incorrect: 0,
        forAnswer: 0,
      },
    };
  }

  aggClassValidate(element, classChange = 'forAnswer') {
    if (classChange === 'forAnswer') {
      element.classList.remove('failedInLibrary');
      element.classList.remove('passInLibrary');
      this.data.interaction.forAnswer++;
      return 'forAnswer';
    } else if (classChange) {
      element.classList.remove('failedInLibrary');
      element.classList.add('passInLibrary');
      this.data.interaction.correct++;
      return false;
    } else {
      element.classList.remove('passInLibrary');
      element.classList.add('failedInLibrary');
      this.data.interaction.incorrect++;
      return true;
    }
  }

  statusValidate(data) {
    console.log({ data });
    if (
      data.interaction.correct > 0 &&
      data.interaction.incorrect == 0 &&
      data.interaction.forAnswer == 0
    ) {
      // Todo está correcto
      data.message = '¡Muy bien! Excelente';
      data.status = 1;
    } else if (
      data.interaction.incorrect > 0 ||
      (data.interaction.forAnswer > 0 && data.interaction.correct > 0)
    ) {
      data.message = 'Verifica: ' + data.message;
      data.status = 2;
    } else {
      // Caso que no encaje en las condiciones anteriores
      console.log('pasa por el else');
      data.message = 'Completa el ejercicio';
      data.status = 3;
    }
  }

  validateValue(value, condition, defaultValue = undefined) {
    if (value === defaultValue) {
      return 'forAnswer';
    }
    if (Array.isArray(condition)) {
      return condition.includes(value);
    }

    return value == condition;
  }
}
