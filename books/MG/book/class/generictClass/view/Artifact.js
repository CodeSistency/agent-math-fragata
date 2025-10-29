class Artifact extends UX {
  constructor(def, board) {
    super();
    this.name = def.name;
    this.status = false;
    this.engine = new def.engine(def, board);
    this.board = board;
    this.htmlNode = this.engine.templateInsert();
    this.htmlNode.id = def.name;
    this.htmlNode.style.display = 'none';
    this.valid = Boolean(def.conditions);
    this.helpArtifact = def.helpArtifact;
    this.def = def;
    this.instanceOwner = new EngineOwner(this.def);
    this.stepElements = [];

    if (this.htmlNode.querySelector('#jxgbox')) {
      this.htmlNode.querySelector('#jxgbox').id = this.name + '_board';
    }

    this.htmlNode.classList.add(...(def.style?.class ?? ''));
  }

  initArtifact = () => {
    if (this.status) {
      return;
    }
    this.status = true;
    if (this.htmlNode.querySelector('#jxgbox')) {
      this.htmlNode.querySelector('#jxgbox').id = def.name + '_board';
    }
    this.htmlNode.style.display = 'flex';
    if (this.def.helpArtifact) {
      this.createHelpButton();
    }
    this.addEvents();
    this.setBorder();
  };

  addEvents() {
    const name_data = this.instanceOwner.nameObjectData();

    this.allbtn = this.htmlNode.querySelector('.all-btn');
    if (this.valid) {
      this.allbtn.style.display = 'block';
      this.allbtn.addEventListener('click', (e) => {
        const button = e.target;
        if (button.classList.contains('check')) {
          const data = this.engine.validate();

          this.gAlerts({
            data: data,
          });
          if (data.status != 3) {
            const sendData = this.instanceOwner?.data(this, data, name_data);
            console.log({ sendData });

            // this.visibleModal(true, data);
          }
        } else if (button.classList.contains('reset')) {
          this.engine.reset();
        } else if (button.classList.contains('return')) {
          this.engine.return();
        } else if (button.classList.contains('bton-tertiary')) {
          this.engine.StepActivate();
        } else if (button.classList.contains('OpenMainCompass')) {
          this.engine.setupCompassButton();
        }
      });
    } else {
      this.allbtn.style.display = 'none';
    }
  }

  initEngine = () => {
    this.engine.initEngine(this.def, this.board);
  };

  //al colocar el valor del borde en la definicion, se tomara un borde mas grueso, el tipo de explicacion de profesor
  setBorder = () => {
    if (this.def?.border) {
      this.htmlNode.style.border = '5px solid var(--azulOscuro)';
      return;
    }
  };
}
