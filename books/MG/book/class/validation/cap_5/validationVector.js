class ValidationVector extends BaseValidate {
  /* Esto es importante:
   - si no tiene interaccion tiene que poner que  interactue 
   - si tiene algunos malos que los verifique
   - si esta bueno que si le marque que esta bueno
   */

  constructor() {
    super();
  }

  iniTMainValidations(thisEngine, conditions) {
    this.data = {
      status: 3,
      timer: 0,
      message: '',
      interaction: {
        correct: 0,
        incorrect: 0,
        forAnswer: 0,
      },
    };

    if (conditions.inputs) {
      /* data se envia a las function de validar esto ayuda a comantar mas facil */
      this.validateInputs(thisEngine, conditions);
    }

    if (3 == thisEngine.statusTrace) {
      console.log('pasa por 3');
      this.data.interaction.forAnswer += 1;
      this.data.message += 'traza la recta, ';
    } else if (2 == thisEngine.statusTrace) {
      console.log('pasa por 2');
      this.data.interaction.correct += 1;
    } else if (1 == thisEngine.statusTrace) {
      thisEngine.statusTrace = 3;
      console.log('pasa por 1');
      this.data.interaction.incorrect += 1;
      this.data.message += 'traza la recta, ';
    }

    this.statusValidate(this.data);
    return this.data;
  }

  validateInputs(thisEngine, conditions) {
    /*  console.log('>1<', thisEngine.topInputsCords);
    console.log('>2<', thisEngine.bottomInputsCords);
    console.log('< bottom >', thisEngine.conditions?.inputs?.bottom); */
    const bottomConditions = conditions?.inputs?.bottom.values;
    const topConditions = conditions?.inputs?.top;
    /* validando objeto  de inputs  */
    this.cordsInputsValidate(
      thisEngine,
      thisEngine.topInputsCords,
      topConditions,
    );
    /* validando array de inputs  */
    this.arrayValidate(
      thisEngine.bottomInputsCords,
      bottomConditions,
      thisEngine.def.defaultInputs,
    );
  }
  /*
   Por esta razon no es una buena idea tener esto como objeto  
  mejor es un array que independiente mente de la posicion valida los elementos  
  */
  validad(input, expectedValue, defaultValue) {
    /* se puede acceder al input y poner las clases de una vez de que esta mal  */
    const result = this.validateValue(input.value, expectedValue, defaultValue);
    return this.aggClassValidate(input, result);
  }

  cordsInputsValidate(thisEngine, inputs, conditions) {
    if (conditions?.p1x) {
      const { p1x } = thisEngine.def.cordsInputs;
      this.validad(
        thisEngine.inputsValidate.cords.p1x,
        conditions.p1x.value,
        p1x?.value ?? 'X',
      );
    }
    if (conditions?.p1y) {
      const { p1y } = thisEngine.def.cordsInputs;
      this.validad(
        thisEngine.inputsValidate.cords.p1y,
        conditions.p1y.value,
        p1y?.value ?? 'Y',
      );
    }
    if (conditions?.p2x) {
      const { p2x } = thisEngine.def.cordsInputs;
      this.validad(
        thisEngine.inputsValidate.cords.p2x,
        conditions.p2x.value,
        p2x?.value ?? 'X',
      );
    }
    if (conditions?.p2y) {
      const { p2y } = thisEngine.def.cordsInputs;
      this.validad(
        thisEngine.inputsValidate.cords.p2y,
        conditions.p2y.value,
        p2y?.value ?? 'Y',
      );
    }
  }

  /* Esto es mas simple y dinamico aunque hay casos que no es tan facil validar elementos en array  e udentificar de donde vienen */
  arrayValidate(inputs = [], conditions = [], defaultValues = []) {
    /* si los inputs y las condiciones son de diferente tamaño directamente no se validan */
    if (inputs.length !== conditions.length) {
      return false;
    }
    /* esto tiene que valuar uno a unos las condicioens necesarias para q se elemento sea valido */
    const resultArray = conditions.map((condition, i) => {
      /* se puede acceder al input y poner las clases de que esta bien o incorrecto 
  de una vez de que esta mal */
      return this.validad(
        inputs[i],
        condition.value,
        defaultValues?.[i]?.value,
      );
    });
    if (resultArray.includes('forAnswer')) {
      this.data.message += 'Faltan campos por completar, ';
    }
  }
}
