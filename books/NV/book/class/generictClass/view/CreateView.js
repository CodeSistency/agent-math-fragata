class CreateView extends DataSender {
  constructor(allDef, defBoard) {
    super();
    this.defBoard = defBoard;
    this.allDef = allDef;
    this.allArtifacts = [];
    this.elementosScroll = [];
    this.def = allDef;
    this.stepElements = [];
    this.status = false;
    if (allDef) {
      this.initVIew(allDef);
    }
    this.Nav = null;
  }
  initVIew = allDef => {
    const def = allDef;
    this.Nav = def.scrollNav ?? false;
    const { artifacts, parent, style } = allDef ?? {};
    const fragment = new DocumentFragment();
    if (!allDef || Object?.keys(artifacts).length <= 0) {
      return;
    }
    Object.keys(artifacts).forEach(def => {
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
    container = container ?? document.querySelector(`.containerBasePage`);
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
    const { parent } = artifact;
    const artClass = new Artifact(artifact, artifact.board, this);
    this.status = artClass.status;
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
    if (artClass?.def?.prueba_t && artClass.name.startsWith("example_")) {
      artClass.htmlNode.querySelector(".all-btn").style.display = "none";
    } else if (
      artClass?.def?.prueba_t &&
      artClass.name.startsWith("artifact_")
    ) {
      return;
    } else {
      this.elementosScroll.push(artClass.htmlNode);
    }
    return artClass;
  };
  initArtifats = () => {
    this.allArtifacts.forEach((artifact, i) => {
      if (!artifact.status) {
        artifact.initArtifact();
        artifact.initEngine();
      }
    });
    this.prepareData({}, "", "Load");
    if (this.Nav) {
      this.scrollTo(this.Nav);
      this.progressBarStructure(this.allArtifacts);
    }
  };
  scrollTo(values) {
    const fContainer = document.querySelector(".containerBasePage");
    this.texts = values;
    const topIndicatorContainer = document.createElement("div");
    topIndicatorContainer.className = "indicator-container-top";
    fContainer.insertAdjacentElement("afterbegin", topIndicatorContainer);
    // Contenedor auxiliar para el texto adicional
    const auxiliarContainer = document.createElement("div");
    auxiliarContainer.className = "auxiliarScroll note";
    fContainer.insertAdjacentElement("beforeend", auxiliarContainer);
    // Línea de indicadores superior
    const line = document.createElement("div");
    line.className = "line";
    topIndicatorContainer.appendChild(line);
    // Contenedor principal del carrusel
    const nContainer = document.createElement("div");
    nContainer.className = "scroll-container";
    fContainer.appendChild(nContainer);
    // Botones de navegación
    const btnPrev = document.createElement("button");
    btnPrev.className = "btn-prev";
    btnPrev.textContent = "<";
    const btnNext = document.createElement("button");
    btnNext.className = "btn-next";
    btnNext.textContent = ">";
    // Contenedor de indicadores
    const indicatorContainer = document.createElement("div");
    indicatorContainer.className = "indicator-container";
    // Agregar botones e indicadores al contenedor del carrusel
    nContainer.appendChild(btnPrev);
    nContainer.appendChild(btnNext);
    nContainer.appendChild(indicatorContainer);
    let currentIndex = 0; // Índice actual del carrusel
    const names = [];
    this.elementosScroll.forEach(e => {
      names.push(e.id);
    });
    let nonLexicoIndex = 1;
    // Crear los pasos (steps)
    this.elementosScroll.forEach((_, index) => {
      const stepElement = document.createElement("div");
      stepElement.className = "step";
      stepElement.artifactReference = _.id;
      // Determinar el tipo de icono basado en el nombre
      if (names[index].includes("lexico")) {
        stepElement.innerHTML =
          '<?xml version="1.0" encoding="UTF-8"?><svg width="24px" stroke-width="1.5" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#076382"><path d="M4 19V5C4 3.89543 4.89543 3 6 3H19.4C19.7314 3 20 3.26863 20 3.6V16.7143" stroke="#076382" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 17L20 17" stroke="#076382" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 21L20 21" stroke="#076382" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17" stroke="#076382" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 7L15 7" stroke="#076382" stroke-width="1.5" stroke-linecap="round"></path></svg>';
      } else if (names[index].includes("example")) {
        stepElement.innerHTML = `<svg class="w-[30px] h-[30px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"/>
        </svg>`;
      } else if (
        names[index].includes("rating") ||
        names[index].includes("raiting")
      ) {
        stepElement.innerHTML =
          ' <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.2em" viewBox="0 0 640 512"><path fill="currentColor" d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0l-23.6 47.8l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37l-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8l46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1l38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32zM32 320c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32zm416 96v64c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32H480c-17.7 0-32 14.3-32 32"/></svg>';
      } else {
        stepElement.innerHTML = `${nonLexicoIndex}`;
        nonLexicoIndex++;
      }
      stepElement.addEventListener("click", () => {
        changeCurrentIndex(index);
      });
      if (index === 0) {
        stepElement.classList.add("active");
      }
      this.stepElements.push(stepElement);
      line.appendChild(stepElement);
    });
    const indicators = [];
    // Crear los indicadores de navegación
    this.elementosScroll.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.className = "indicator";
      indicator.style.width = "15px";
      indicator.style.height = "15px";
      indicator.style.borderRadius = "50%";
      indicator.style.background =
        index === currentIndex ? "#076382" : "lightblue";
      indicator.style.margin = "0 5px";
      indicator.style.cursor = "pointer";
      indicator.addEventListener("click", () => {
        changeCurrentIndex(index);
      });
      indicators.push(indicator);
      indicatorContainer.appendChild(indicator);
    });
    const updateAuxiliarText = () => {
      const currentStepName = names[currentIndex];
      const artifactis = [];
      Object.entries(this.def.artifacts).forEach(([key, value]) => {
        artifactis.push(value);
      });
      if (artifactis[currentIndex]?.description) {
        auxiliarContainer.style.display = "flex";
        auxiliarContainer.innerHTML = artifactis[currentIndex]?.description;
        auxiliarContainer.className = "auxiliarScroll note";
        auxiliarContainer.classList.remove("tittle"); // Asegura que no tenga la clase 'tittle'
        return; // Sale de la función si se encuentra description
      }
      // Flujo normal si no hay description en this.def
      if (currentStepName.includes("lexico")) {
        auxiliarContainer.style.display = "flex";
        if (this.texts?.tittle) {
          auxiliarContainer.innerHTML = this.texts.tittle;
          auxiliarContainer.classList.add("tittle");
        } else {
          auxiliarContainer.style.display = "none";
        }
      } else if (currentStepName.includes("example")) {
        auxiliarContainer.style.display = "flex";
        if (this.texts?.lexico) {
          auxiliarContainer.innerHTML = this.texts.lexico;
          auxiliarContainer.classList.remove("tittle");
        } else {
          auxiliarContainer.style.display = "none";
        }
      } else if (
        currentStepName.includes("rating") ||
        currentStepName.includes("raiting")
      ) {
        auxiliarContainer.style.display = "none";
      } else {
        auxiliarContainer.style.display = "flex";
        if (this.texts?.lexico) {
          auxiliarContainer.innerHTML = this.texts.lexico;
          auxiliarContainer.classList.remove("tittle");
        } else {
          auxiliarContainer.style.display = "none";
        }
      }
    };
    const updateIndicators = () => {
      this.changeBorderColor(null);
      const totalSteps = this.stepElements.length;
      // Ocultar y desvanecer todos los pasos
      this.stepElements.forEach((step, index) => {
        step.style.display = "none";
        step.style.opacity = "0";
      });
      // Mostrar todos los pasos si hay menos de 5
      if (totalSteps <= 5) {
        this.stepElements.forEach(step => {
          step.style.display = "flex";
          step.style.opacity = "1";
        });
      } else {
        // Mostrar una ventana de 5 pasos centrada en el paso actual
        let start = Math.max(currentIndex - 2, 0);
        let end = Math.min(currentIndex + 2, totalSteps - 1);
        if (currentIndex <= 2) {
          start = 0;
          end = 4;
        } else if (currentIndex >= totalSteps - 3) {
          start = totalSteps - 5;
          end = totalSteps - 1;
        }
        for (let i = start; i <= end; i++) {
          this.stepElements[i].style.display = "flex";
          setTimeout(() => {
            this.stepElements[i].style.opacity = "1";
          }, 0);
        }
      }
      // Actualizar el color de fondo de los indicadores
      indicators.forEach((indicator, index) => {
        indicator.style.background =
          index === currentIndex ? "#076382" : "lightblue";
      });
      // Actualizar la clase activa del paso actual
      this.stepElements.forEach((step, index) => {
        if (index === currentIndex) {
          step.classList.add("active");
        } else {
          step.classList.remove("active");
        }
      });
      // Deshabilitar botones de navegación si estamos al inicio o al final
      btnPrev.disabled = currentIndex === 0;
      btnNext.disabled = currentIndex === totalSteps - 1;
      // Actualizar el texto en el contenedor auxiliar
      updateAuxiliarText();
    };
    const changeCurrentIndex = newIndex => {
      if (newIndex >= 0 && newIndex < this.elementosScroll.length) {
        const currentElement = this.elementosScroll[currentIndex];
        const newElement = this.elementosScroll[newIndex];
        // Animación de salida del elemento actual
        currentElement.style.display = "none";
        // Tiempo de espera para la animación de salida
        currentIndex = newIndex;
        newElement.style.display = "";
        updateIndicators();
      }
    };
    // Control de eventos para los botones de navegación
    btnPrev.addEventListener("click", () => {
      if (currentIndex > 0) {
        changeCurrentIndex(currentIndex - 1);
      }
    });
    btnNext.addEventListener("click", () => {
      if (currentIndex < this.elementosScroll.length - 1) {
        changeCurrentIndex(currentIndex + 1);
      }
    });
    document.querySelector(".containerBasePage").style.opacity = "0";
    this.elementosScroll.forEach((e, index) => {
      e.classList.add("artifact");
      nContainer.appendChild(e);
      if (index === 0) {
      } else {
        // setTimeout(() => {
          e.style.display = "none";
        // }, 2800);
      }
    });
    // this.loading();
    // setTimeout(() => {
      document.querySelector(".containerBasePage").style.opacity = "1";
    // }, 2900);
    // Actualizar los indicadores iniciales
    updateIndicators();
  }
  loading() {
    const fragataLoader = document.createElement("div");
    fragataLoader.className = "loader-fragata";
    fragataLoader.innerHTML = `
    <svg height="0" width="0" viewBox="0 0 64 64" class="absolute">
      <defs>
        <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#076382"></stop>
          <stop offset="100%" stop-color="#217e9d"></stop>
        </linearGradient>
        <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0aa1dd"></stop>
          <stop offset="100%" stop-color="#f1604d"></stop>
        </linearGradient>
        <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f1604d"></stop>
          <stop offset="100%" stop-color="#076382"></stop>
        </linearGradient>
      </defs>
    </svg>
    <!-- Letra F -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" class="inline-block">
      <path stroke-linejoin="round" stroke-linecap="round" stroke-width="8" stroke="url(#gradient1)" 
            d="M 20 30 V 50 M 20 10 H 50 M 20 30 H 40" class="dash" pathLength="360"></path>
    </svg>
    <!-- Letra R -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" class="inline-block">
      <path stroke-linejoin="round" stroke-linecap="round" stroke-width="8" stroke="url(#gradient1)" 
            d="M 20 10 H 45 A 15 15 0 0 1 20 30 L 45 50" class="dash" pathLength="360"></path>
    </svg>
    <!-- Flecha -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" class="inline-block">
      <path stroke-linejoin="round" stroke-linecap="round" stroke-width="8" stroke="url(#gradient1)" 
            d="M 10 50 L 32 10 L 54 50" class="dash" pathLength="360"></path>
    </svg>
    <!-- Letra G -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" class="inline-block">
      <path stroke-linejoin="round" stroke-linecap="round" stroke-width="8" stroke="url(#gradient1)" 
            d="M 44 10 H 24 A 18 18 0 1 0 24 50 H 44 A 18 18 0 0 0 44 30 H 32" class="dash" pathLength="360"></path>
    </svg>
    <!-- Flecha -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" class="inline-block">
      <path stroke-linejoin="round" stroke-linecap="round" stroke-width="8" stroke="url(#gradient1)" 
            d="M 10 50 L 32 10 L 54 50" class="dash" pathLength="360"></path>
    </svg>
    <!-- Letra T -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" class="inline-block">
      <path stroke-linejoin="round" stroke-linecap="round" stroke-width="8" stroke="url(#gradient1)" 
            d="M 32 10 V 50 M 10 10 H 54" class="dash" pathLength="360"></path>
    </svg>
    <!-- Flecha -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" class="inline-block">
      <path stroke-linejoin="round" stroke-linecap="round" stroke-width="8" stroke="url(#gradient1)" 
            d="M 10 50 L 32 10 L 54 50" class="dash" pathLength="360"></path>
    </svg>
  `;
    document.body.appendChild(fragataLoader);
    setTimeout(() => {
      fragataLoader.style.display = "none";
    }, 2900);
  }
  data(definicion, data) {
    const cantidad_entradas =
      data.interaction.correct +
      data.interaction.incorrect +
      data.interaction.forAnswer;
    const percentage_artifacts = (
      (data.interaction.correct / cantidad_entradas) *
      100
    ).toFixed();
    if (percentage_artifacts >= 70) {
      // Recuperar el array existente o inicializar uno nuevo
      this.getData = JSON.parse(
        localStorage.getItem(`${this.idEnroll}-ArtifactsTrue`),
      ) ?? { artifactsTrue: [] };
      for (let i = 0; i < this.getData?.artifactsTrue?.length ?? 0; i++) {
        const artifact = this.getData.artifactsTrue[i];
        if (artifact === definicion.name) {
          return;
        }
      }
      const objectData = definicion.name;
      this.changeBorderColor(definicion.name);
      this.getData.artifactsTrue.push(objectData);
      localStorage.setItem(
        `${this.idEnroll}-ArtifactsTrue`,
        JSON.stringify(this.getData),
      );
    }
  }
  progressBarStructure(artifacts) {
    // CREACION DE LA ESTRUCTURA Y CONSTRUCCIÓN DE LA ESTRUCTURA
    // Encontrar el contenedor destino y agregar la nueva estructura
    const container = document.querySelector(".indicator-container-top");
    //contenedor de la barra de progreso y el botón
    const progressBtnContainer = document.createElement("div");
    progressBtnContainer.className = "progress-btn-container";
    //el boton
    const btnHide = document.createElement("div");
    btnHide.className = "btn-hide";
    //contenedor base de la barra de progreso
    const baseProgress = document.createElement("div");
    baseProgress.className = "base-progress";
    //contenedor de la barra de progreso y el porcentaje
    const content = document.createElement("div");
    content.className = "porcent-and-hide";
    //la barra de progreso blanca base
    const progressBase = document.createElement("div");
    progressBase.className = "progress-base";
    //la barra de progreso verde
    const progress = document.createElement("div");
    progress.className = "progress";
    //el porcentaje
    const porcentajeText = document.createElement("p");
    porcentajeText.className = "text-bar";
    //se añade la barra de progreso verde dentro de la barra de progreso blanca
    progressBase.appendChild(progress);
    //se añade la barra de progreso al contenedor de la bara y el porcentaje
    content.appendChild(progressBase);
    //se añade el porcentaje al contenedor de la barra y el porcentaje
    content.appendChild(porcentajeText);
    //se añade el contenedor de la barra de progreso y el porcentaje al contenedor secundario
    progressBtnContainer.appendChild(content);
    //se añade el botón al contenedor secundario
    progressBtnContainer.appendChild(btnHide);
    //se añade la barra de progreso al contenedor secundario
    baseProgress.appendChild(progressBtnContainer);
    //se añade el boton y la barra al contenedor destino
    container.appendChild(baseProgress);
    // BOTON PARA OCULTAR LA BARRA DE PROGRESO
    btnHide.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="#076382" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"/></svg>`;
    let activeButton = true;
    btnHide.addEventListener("click", () => {
      if (activeButton) {
        progressBase.style.opacity = "0";
        baseProgress.style.justifyContent = "center";
        baseProgress.style.gap = "10px";
        content.style.flexDirection = "row";
        container.style.height = "90px";
        btnHide.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="#076382" d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5c-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1M12.22 17c-4.31.1-7.12-3.59-8-5c1-1.61 3.61-4.9 7.61-5c4.29-.11 7.11 3.59 8 5c-1.03 1.61-3.61 4.9-7.61 5"/><path fill="#076382" d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5m0 5a1.5 1.5 0 1 1 1.5-1.5a1.5 1.5 0 0 1-1.5 1.5"/></svg>`;
        activeButton = false;
      } else {
        baseProgress.style.justifyContent = "space-evenly";
        content.style.flexDirection = "column-reverse";
        container.style.height = "130px";
        progressBase.style.opacity = "1";
        btnHide.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="#076382" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"/></svg>`;
        activeButton = true;
      }
    });
    // ARTEFACTOS INTERACTUABLES
    const interactable_artifacts = [];
    artifacts.forEach(e => {
      const { def, htmlNode } = e;
      if (def.conditions) {
        interactable_artifacts.push(htmlNode);
      }
    });
    //si no hay artefactos interactuables no se agrega la barra de progreso
    if (
      typeof window.Android !== "undefined" &&
      typeof window.Android.sendData === "function"
    ) {
      baseProgress.style.display = "none";
      container.style.height = "80px";
    } else {
      if (interactable_artifacts.length === 0) {
        baseProgress.style.display = "none";
        container.style.height = "80px";
      }
    }
    //CUANDO CARGUE LA PÁGINA SE CONSULTA EL LOCALSTORAGE PARA AGREGAR EL PROGRESO GUARDADO
    window.addEventListener("load", () => {
      this.artefacts_check =
        JSON.parse(localStorage.getItem(`${this.idEnroll}-ArtifactsTrue`)) ??
        [];
      //
      this.changeBorderColor(null);
      if (!this.artefacts_check) {
        return;
      }

      const auxPercent = JSON.parse(localStorage.getItem(`${this.idEnroll}-ArtifactsTrue`)) ?? [];
      const { artifactsTrue } = auxPercent

      const percent = artifactsTrue?.length > 0


        ? ((artifactsTrue.length || 0) / interactable_artifacts.length * 100).toFixed()
        : "0";


      progress.style.width = `${percent}%`
      progress.style.maxWidth = "100%"
      porcentajeText.textContent = `${percent ?? "0"}%`;
      this.artefacts_check.artifactsTrue?.forEach((e, i) => {
        const artefactsBorderAdd = document.body.querySelector(`#${e}`);
        artefactsBorderAdd.style.borderColor = "#7ed957";
      });
    });
    // se solicita la data cuando se presiona el boton check
    artifacts.forEach(e => {
      const { def, htmlNode } = e;
      const allBtn = htmlNode.querySelector(".all-btn");
      // se toma la referencia del div
      const progress_reference = document.querySelector(".progress");
      if (def.conditions) {
        allBtn.addEventListener("click", e => {
          const button = e.target;
          if (button.classList.contains("check")) {
            const artefacts_check_dos =
              JSON.parse(
                localStorage.getItem(`${this.idEnroll}-ArtifactsTrue`),
              ) ?? [];
            if (!artefacts_check_dos) {
              return;
            }
            // se calcula el tamaño de la barra de progreso
            const percent =
              interactable_artifacts.length > 0
                ? (
                  ((artefacts_check_dos.artifactsTrue?.length || 0) /
                    interactable_artifacts.length) *
                  100
                ).toFixed()
                : "0";
            // se aplica el tamaño del progreso
            progress_reference.style.width = `${percent}%`;
            porcentajeText.textContent = `${percent}%`;
            localStorage.setItem(
              `${this.idEnroll}-ArtifactsTrue`,
              JSON.stringify(artefacts_check_dos),
            );
          }
        });
      }
    });
  }
  changeBorderColor(reference) {
    const { artifactsTrue } =
      JSON.parse(localStorage.getItem(`${this.idEnroll}-ArtifactsTrue`)) ?? {};
    const stepElements = document.querySelectorAll(".step");
    if (reference) {
      const artefactoValidado = document.querySelector(`#${reference}`);
      if (artefactoValidado) {
        artefactoValidado.style.borderColor = "#7ed957";
      }
    }
    stepElements?.forEach((step, i) => {
      if (reference == step.artifactReference) {
        step.style.borderColor = "#7ed957";
      }
      if (artifactsTrue?.some(artifact => artifact == step.artifactReference)) {
        step.style.borderColor = "#7ed957";
      }
    });
  }
}
async function generateProgress({
  dataElements = "",
  idEnroll = "",
  isOfSend = false,
  isMobile = false,
}) {
  if (!idEnroll && !isMobile) {
    let pathname = new URL(document?.referrer)?.pathname;
    idEnroll = idEnroll ? idEnroll : pathname.split("/")[2];
  }
  let dataArtifactsTrue =
    !isOfSend && !isMobile
      ? localStorage.getItem(`${idEnroll}-ArtifactsTrue`) ?? []
      : [];
  console.log("-- mobile options --");
  let data = null;
  // const artifactsTrue = dataElements?.split("//");
  if (!isOfSend && !isMobile) {
    data =
      idEnroll && dataArtifactsTrue.length
        ? JSON.parse(dataArtifactsTrue)
        : false;
    if (!data) {
      console.log("idEnroll está vacio", idEnroll);
      return;
    }
  } else {
    if (typeof dataElements == "string") data = JSON.parse(dataElements);
    else data = dataElements;
  }
  //const params = JSON.parse(dataJson)
  const { artifactsTrue } = data;
  if (!artifactsTrue) {
    return;
  }
  const stepElements = document.querySelectorAll(".step");
  artifactsTrue.forEach(nameArtifact => {
    if (nameArtifact) {
      const artefactoValidado = document.querySelector(`#${nameArtifact}`);
      if (artefactoValidado) {
        artefactoValidado.style.borderColor = "#7ed957";
      }
    }
    stepElements?.forEach((step, i) => {
      if (nameArtifact == step.artifactReference) {
        step.style.borderColor = "#7ed957";
      }
      if (artifactsTrue?.some(artifact => artifact == step.artifactReference)) {
        step.style.borderColor = "#7ed957";
      }
    });
  });
}
