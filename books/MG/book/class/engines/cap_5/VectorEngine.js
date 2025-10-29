class VectorEngine extends baseBoards {
  constructor(def, defBoard) {
    super(defBoard);
    this.allPoints = [];
    this.defBoard = defBoard;
    this.idTemplate = def?.template?.id ?? 'temp-vector';
    this.conditions = def?.conditions ?? {};
    this.idboard = `${def.name}_board`;
    this.htmlNode = def?.template?.node ?? null;
    this.validation = new ValidationVector(this.def);
    this.statusTrace = 3;
    this.inputsValidate = { cords: {} };
    this.templateInsert();
    this.activeStep = false;
    this.def = def;
  }

  templateInsert = () => {
    if (!document.querySelector('#temp-buttons')) {
      const buttonsTemplate = `
        <template id="temp-buttons">
          <button class="buttonTool styleBtn buttonTertiary buttonKey" title="value 1">1</button>
        </template>`;
      this.buttonsTemplate = buttonsTemplate;
      document.body.insertAdjacentHTML('afterend', this.buttonsTemplate);
    }

    if (!document.querySelector('#temp-vector')) {
      const $templateDefaults = `
        <template id="temp-vector">
          <div class="artifact-base  w-72 ms:w-80">
    
      <div class="statement-top border-solid border rounded-md border-black text-center">
        <input>asdasd</input>
      </div>
      <div id="cords" class="cords border-solid border rounded-md border-black textCenter w-full">
      <p class="text-nowrap gap-2 text-center border border-black rounded-md flex flex-row text-inline px-1"  id="enumTop"> </p> 
      <div class="text-nowrap gap-2 text-center border border-black rounded-md flex flex-row text-inline px-1">
         ( 
          <math-field type="text" class="onefirstPoints flex border border-black rounded-md  w-8 text-center">X</math-field>, 
          <math-field type="text" class="oneSecondPoints flex border border-black rounded-md  w-8 text-center">Y</math-field> 
          ) ( 
          <math-field type="text" class=" twoFirstPoints flex border border-black rounded-md  w-8 text-center">X</math-field>, 
          <math-field type="text" class="twoSecondPoints flex border border-black rounded-md  w-8 text-center">Y</math-field> 
          )
          <button class="trace bg-orange-400 rounded-md py-1 px-2" title="Segundo punto">Trazar</button>
        </div>
      </div>
      <div id="jxgbox" class="artifact-base border rounded-md w-full"></div>
    
      <div class="statement statement-bottom border-board-dark h-100 textCenter mt-1 mb-1"
        style="height: 100%; min-height: 30px; display: none;"></div>
      <div class="validateInputs gap-2 text-center border border-black rounded-md flex flex-row">
       
      </div>
      
      <div class="all-btn border-board-dark">
        <div class="flex justify-end p-1 border-dark rounded">
          <div class="sectionBtn interactive-btn"></div>
          <div class="sectionBtn default-btn gap-2">
            <button class="reset buttonSecundary buttonKey" title="Reset"></button>
            <button class="check buttonPrimary buttonKey" title="Validar"></button>
          </div>
        </div>
      </div>
    </div>
        </template>`;
      this.template = $templateDefaults;
      document.body.insertAdjacentHTML('afterend', this.template);
    }

    this.tmpButton = document.querySelector('#temp-buttons');
    this.htmlNode = document
      .querySelector(`#${this.idTemplate}`)
      .content.firstElementChild.cloneNode(true);
    return this.htmlNode;
  };

  initEngine() {
    this.initBoardBase({ id: this.idboard, ...this.defBoard });
    this.divCords = this.htmlNode.querySelector('#cords');
    this.topInputsCords = this.htmlNode.querySelectorAll('#cords math-field');

    this.divCords.addEventListener('input', () => {
      this.validateStatus = false;
      this.statusTrace = 1;
      this.draw();
    });

    this.btnTrace = this.htmlNode.querySelector('.trace');
    this.btnTrace.addEventListener('click', () => {
      this.validateStatus = false;
      this.statusTrace = this.statusTrace === 2 ? 1 : 2;
      this.draw();
    });

    if (this.def?.enumTop) {
      this.htmlNode.querySelector('#enumTop').textContent = this.def.enumTop;
    } else {
      this.htmlNode.querySelector('#enumTop').classList.add('invisible');
    }

    if (this.def.cordsInputs) {
      this.cordsInputs(this.def?.cordsInputs);
    }

    this.generateInputs();
    /* importante inicializar el timer */
    this.initTimer();
  }

  generateInputs() {
    const inputTemplate = (dataInput) => {
      return `<math-field type="text" class="flex border border-black rounded-md w-12 text-center" ${dataInput.value && dataInput?.disabled !== false ? 'disabled' : ''}> ${dataInput.value} </math-field>`;
    };

    this.def.defaultInputs.forEach((input) =>
      this.htmlNode
        .querySelector('.validateInputs')
        .insertAdjacentHTML('beforeend', inputTemplate(input)),
    );

    this.bottomInputsCords = this.htmlNode.querySelectorAll(
      '.validateInputs math-field:not([disabled])',
    );
  }

  setInput(selector, input) {
    const element = this.htmlNode.querySelector(selector);
    element.disabled = (input.disabled ?? input.value) ? true : false;
    element.textContent = input.value ?? ' '; // Default to 'X' if value is undefined
    return element;
  }

  cordsInputs(cordsInputs) {
    this.inputsValidate.cords.p1x = this.setInput(
      '.onefirstPoints',
      cordsInputs?.p1x ?? { value: 'X', disabled: false },
    );
    this.inputsValidate.cords.p1y = this.setInput(
      '.oneSecondPoints',
      cordsInputs?.p1y ?? { value: 'Y', disabled: false },
    );

    this.inputsValidate.cords.p2x = this.setInput(
      '.twoFirstPoints',
      cordsInputs?.p2x ?? { value: 'X', disabled: false },
    );
    this.inputsValidate.cords.p2y = this.setInput(
      '.twoSecondPoints',
      cordsInputs?.p2y ?? { value: 'Y', disabled: false },
    );
  }

  getValuesFields(inputsFields = []) {
    return Array.from(inputsFields).map((field) =>
      field.value !== '' ? Number(field.value) : null,
    );
  }

  draw() {
    const values = this.getValuesFields(this.topInputsCords);

    if (
      values.every((e) => {
        return e !== null && !Number.isNaN(e);
      })
    ) {
      // Elimina los puntos anteriores
      this.board.removeObject(this.points);
      // Crea nuevas líneas con los valores actuales
      const lines = this.createLines({
        lines: [
          {
            points: [
              { x: values[0], y: values[1], style: { visible: true } },
              { x: values[2], y: values[3], style: { visible: true } },
            ],
            pointsStyle: { fixed: true },
            style: {
              straightFirst: true,
              straightLast: true,
              strokeColor: 'red',
              dash: 2,
              layer: 2,
              visible: () => this.statusTrace == 2 || this.statusTrace == 4,
            },
          },
        ],
      });

      // Actualiza los puntos con las nuevas referencias
      this.points = [lines[0].point1, lines[0].point2]; // Asegúrate de usar point2 aquí
      console.log(this.points);
    }
  }

  reset() {
    this.interactiveInputs.forEach((input) => {
      input.value = '';
      input.classList.remove('passInLibrary');
      input.classList.remove('failedInLibrary');
    });
  }
}
