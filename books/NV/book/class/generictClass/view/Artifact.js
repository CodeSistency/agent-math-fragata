class Artifact extends UX {
  constructor(def, board, refCv) {
    super();
    this.CreateV = refCv;
    this.name = def.name;
    this.dataSend = new DataSender() ?? {};
    this.status = false;
    this.engine = new def.engine(def, board);
    this.board = board;
    this.htmlNode = this.engine.templateInsert();
    this.htmlNode.id = def.name;
    this.htmlNode.style.display = "none";
    this.valid = Boolean(def.conditions);
    this.helpArtifact = def.helpArtifact;
    this.def = def;

    this.stepElements = [];

    if (this.htmlNode.querySelector("#jxgbox")) {
      this.htmlNode.querySelector("#jxgbox").id = this.name + "_board";
    }

    this.htmlNode.classList.add(...(def.style?.class ?? ""));
  }

  initArtifact = () => {
    if (this.status) {
      return;
    }
    this.status = true;
    if (this.htmlNode.querySelector("#jxgbox")) {
      this.htmlNode.querySelector("#jxgbox").id = def.name + "_board";
    }
    this.htmlNode.style.display = "flex";
    if (this.def.helpArtifact) {
      this.createHelpButton();
    }
    this.addEvents();
    this.setBorder();
  };

  addEvents() {
    this.allbtn = this.htmlNode.querySelector(".all-btn");

    if (this.valid) {
      this.allbtn.style.display = "block";
      this.allbtn.addEventListener("click", e => this.handleButtonClick(e));
    } else {
      this.allbtn.style.display = "none";
    }
  }

  handleButtonClick(e) {
    const button = e.target;

    if (button.classList.contains("check")) {
      const data = this.engine.validate();
      this.data = data;
      this.gAlerts({data}, this);

      if (data.status !== 3) {
        if (
          typeof window.Android !== "undefined" &&
          typeof window.Android.sendData === "function"
        ) {
          this.dataSend.prepareData(data, this.name, "Mobile");
        } else {
          console.log(data);
          this.dataSend.prepareData(data, this.name, "Standard");
          this.CreateV.data(this.def, data);
        }
      }
    } else if (button.classList.contains("reset")) {
      this.engine.reset();
    } else if (button.classList.contains("return")) {
      this.engine.return();
    } else if (button.classList.contains("bton-tertiary")) {
      this.engine.StepActivate();
    } else if (button.classList.contains("OpenMainCompass")) {
      this.engine.setupCompassButton();
    } else if (button.classList.contains("OpenMainCurves")) {
      this.engine.setupCurvesButton();
    }
  }

  initEngine = () => {
    this.engine.initEngine(this.def, this.board);
  };

  //al colocar el valor del borde en la definicion, se tomara un borde mas grueso, el tipo de explicacion de profesor
  setBorder = () => {
    if (this.def?.border) {
      this.htmlNode.style.border = "5px solid var(--azulOscuro)";
      return;
    }
  };
}
