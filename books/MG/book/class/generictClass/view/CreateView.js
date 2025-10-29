class CreateView {
  constructor(allDef, defBoard) {
    this.defBoard = defBoard;
    this.allDef = allDef;
    this.allArtifacts = [];
    this.elementosScroll = [];
    this.def = allDef;
    if (allDef) {
      this.initVIew(allDef);
    }
    this.Nav = null;
  }

  initVIew = (allDef) => {
    const def = allDef;
    this.Nav = def.scrollNav ?? false;

    const { artifacts, parent, style, raiting } = allDef ?? {};

    this.raiting ??= raiting;

    const fragment = new DocumentFragment();
    if (!allDef || Object?.keys(artifacts).length <= 0) {
      return;
    }

    Object.keys(artifacts).forEach((def) => {
      const artifact = artifacts[def];
      const artifactDef = {
        allArtifacts: this.allArtifacts,
        elementosScroll: this.elementosScroll,
        name: def,
        parent,
        ...artifact,
        style,
        board: this?.defBoard?.[artifact?.board],
      };

      return this.addArtefact(artifactDef, fragment);
    });

    let container = document.querySelector(`.${parent}, #${parent}`);

    container = container ?? document.querySelector(`.main`);
    if (container) {
      container.appendChild(fragment);
    } else {
      document.body.appendChild(fragment);
      if (this.contentRaiting) {
        document.body.appendChild(this.contentRaiting);
      }
    }
    this.initArtifats();
  };

  addArtefact = (artifact, fragment) => {
    this.scroll = new EngineOwner(artifact.def);
    const { parent } = artifact;

    // console.log(artifact.name=="artifact_raiting");
    if (artifact.name == 'artifact_raiting') {
      const artClass = this.scroll.createFormRaiting(artifact);
      let container = document.querySelector(`#${parent},.${parent}`);
      container = container ?? document.querySelector(`.main`);
      if (container) {
        container.appendChild(artClass);
      } else {
        document.body.appendChild(artClass);
      }
      // document.body.appendChild(artClass)
      this.elementosScroll.push(artClass);

      return artClass;
    } else {
      const artClass = new Artifact(artifact, artifact.board);

      if (!parent && fragment) {
        fragment.appendChild(artClass.htmlNode);
      } else {
        let container = document.querySelector(`#${parent},.${parent}`);
        container = container ?? document.querySelector(`.main`);
        if (container) {
          container.appendChild(artClass.htmlNode);
        } else {
          document.body.appendChild(artClass.htmlNode);
        }
      }
      this.allArtifacts.push(artClass);

      if (artClass?.def?.prueba_t && artClass.name.startsWith('example_')) {
        artClass.htmlNode.querySelector('.all-btn').style.display = 'none';
      } else if (
        artClass?.def?.prueba_t &&
        artClass.name.startsWith('artifact_')
      ) {
        return;
      } else {
        this.elementosScroll.push(artClass.htmlNode);
      }

      return artClass;
    }
  };

  initArtifats = () => {
    this.allArtifacts.forEach((artifact, i) => {
      this.scroll = new EngineOwner(artifact.def);
      if (!artifact.status) {
        if (artifact.def.name == 'artifact_rating') {
          console.log(artifact.def.name == 'artifact_rating');
          this.scroll.createFormRaiting(artifact.def);
        }
        artifact.initArtifact();
        artifact.initEngine();
        if (i === this.allArtifacts.length - 1) {
          if (this.Nav) {
            this.scroll.scrollTo(this.Nav);
            this.scroll.progressBarStructure(this.allArtifacts);
          }
        }
      }
    });
  };
}
