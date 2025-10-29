/* visual esto va en UX */
class EngineOwner extends baseBoards {
  constructor(def) {
    super();
    this.def = def;
    this.board = null;
    this.idTemplate = 'tmpText';
    this.htmlNode = null;
    this.template = null;
    this.raiting = def?.Raiting;
    this.raitingInputs = [];
    this.stepElements = [];
  }

  templateInsert = () => {
    if (!document.querySelector('#tmpText')) {
      const $templateDefaults = `<template id="tmpText">
          <div id="containerGeneral">
          
                      <div class="all-btn w-100 border-board-dark">
                      <div class="btn-base border-dark rounded">

                        <div class="sectionBtn interactive-btn"> </div>
                        <div class="sectionBtn default-btn gap-2">
                          <button class="reset styleBtn buttonSecundary buttonKey" title="Reset"></button>
                          <button class="check styleBtn buttonPrimary buttonKey" title="Validar"></button>
                        </div>

                      </div>
                    </div>
                    
          </div>
          </template>`;
      this.template ??= $templateDefaults;
      document.body.insertAdjacentHTML('afterend', this.template);
    }
    this.htmlNode ??= document
      .querySelector(`#${this.idTemplate}`)
      .content.firstElementChild.cloneNode(true);

    return this.htmlNode;
  };

  initEngine() {
    //  se agrega la clase que se desee al contenedor
    this.def.styleContainer ?? 'note';
    if (this.def.styleContainer) {
      this.htmlNode.classList.add(this.def.styleContainer);
    }

    if (this.def.nodo) {
      this.createText(this.def);
    }
    if (this.def.recursos) {
      this.createResources(this.def);
    }
  }

  createText(def) {
    const nodo = def.nodo;

    nodo.forEach((e, i) => {
      const { texto, atributos, etiqueta } = e;

      let createNodo = document.createElement(etiqueta ?? 'p');
      createNodo.insertAdjacentHTML(`afterbegin`, texto ?? '');

      e.id ??= e.id = 'nodo_' + (i + 1);
      createNodo.id = e.id;

      if (atributos) {
        const objectAttribute = Object.entries(atributos);
        for (const [propiedad, valor] of objectAttribute) {
          createNodo.setAttribute(propiedad, valor);
        }
      }

      this.htmlNode.appendChild(createNodo);
    });

    let containerReference = document.querySelector(
      `.${def?.artifactReference}, #${def?.artifactReference}`,
    );

    if (def.artifactReference && !containerReference) {
      console.warn('su contenedor no se encuentra en el documento');
      document.body.appendChild(this.htmlNode);
      return;
    }

    if (def?.position == 'left' || def?.position == 'rigth') {
      def.position == 'left'
        ? containerReference?.insertAdjacentElement(
            'beforeBegin',
            this.htmlNode,
          )
        : containerReference?.insertAdjacentElement('afterEnd', this.htmlNode);

      def?.positionParent.forEach((e) => {
        const containerParent = document.body.querySelector(
          `.${e.parent}`,
          `#${e.parent}`,
        );

        const parentReferencia =
          document.body.querySelector(`#${e.artifactReferenceParent}`) ??
          document.body.querySelector(`.${e.artifactReferenceParent}`);

        e.direction == 'top'
          ? parentReferencia.insertAdjacentElement(
              'beforeBegin',
              containerParent,
            )
          : parentReferencia.insertAdjacentElement('afterEnd', containerParent);
      });
    }
    if (def?.position == 'top' || def?.position == 'bottom') {
      const divAuxiliar = document.createElement('Div');
      divAuxiliar.appendChild(this.htmlNode);
      divAuxiliar.classList.add('divAuxiliar');
      def.position == 'top'
        ? containerReference?.insertAdjacentElement('beforeBegin', divAuxiliar)
        : containerReference?.insertAdjacentElement('afterEnd', divAuxiliar);
    }
  }

  createResources(def) {
    const recursos = def.recursos;

    recursos.forEach((e, index) => {
      const { recurso } = e;

      if (recurso) {
        const containerBoard = document.createElement('div');
        recurso.idRecurso ??= 'recurso_' + def.name + `_${index}`;

        containerBoard.id = recurso.idRecurso;

        this.htmlNode.appendChild(containerBoard);

        recurso.styleRecurso ??= ['utils'];

        if (recurso.styleRecurso) {
          recurso.styleRecurso.forEach((e) => {
            containerBoard.classList.add(e);
          });
        }

        recurso.styles ??= {
          boundingbox: [-4, 4, 4, -4],
          axies: {
            y: { visible: false },
            x: { visible: false },
          },
        };

        this.initBoardBase({ id: recurso.idRecurso, styles: recurso.styles });

        if (recurso.grafico) {
          recurso.grafico.forEach((e) => {
            if (e.texto) {
              e.texto.forEach((e) => {
                const { x, y, mensaje, styleText } = e;
                const stylesDefault = {
                  fixed: true,
                  fontSize: 15,
                  highlight: false,
                  cssClass: e?.stylesText?.cssClasses ?? 'textDefaultJSX',
                  ...styleText,
                };
                const text = this.board.create(
                  'text',
                  [x, y, mensaje],
                  stylesDefault,
                );
              });
            }

            if (e.points) {
              e.points.forEach((e) => {
                const { x, y, stylesPoint } = e;
                const stylesDefault = {
                  highlight: false,
                  withLabel: false,
                  fixed: true,
                  ...stylesPoint,
                };
                const point = this.board.create('point', [x, y], stylesDefault);
              });
            }

            if (e.linea) {
              e.linea.forEach((e) => {
                const {
                  punto_1,
                  punto_2,
                  stylesLine,
                  stylesPoint_1,
                  stylesPoint_2,
                } = e;

                const defaultStylesLine = {
                  highlight: false,
                  strokeColor: '#217e9d',
                  firstArrow: false,
                  lastArrow: false,
                  fixed: true,
                  strokeWidth: 2,
                  straightFirst: false,
                  straightLast: false,
                  ...stylesLine,
                };

                const defaulStylePoint_1 = {
                  highlight: false,
                  visible: false,
                  name: '',
                  fixed: true,

                  ...stylesPoint_1,
                };

                const defaulStylePoint_2 = {
                  highlight: false,
                  visible: false,
                  name: '',
                  fixed: true,

                  ...stylesPoint_2,
                };

                const punto_x = this.board.create(
                  'point',
                  punto_1,
                  defaulStylePoint_1,
                );
                const punto_y = this.board.create(
                  'point',
                  punto_2,
                  defaulStylePoint_2,
                );
                e.type ??= 'line';
                const linea = this.board.create(
                  e.type,
                  [punto_x, punto_y],
                  defaultStylesLine,
                );
              });
            }

            if (e.ellipse) {
              e.ellipse.forEach((e) => {
                const { punto_1, punto_2, punto_3 } = e;
                const stylesDefaultEllipse = {
                  highlight: false,
                  strokeColor: '#217e9d',
                  strokeWidth: 2,
                };

                const punto_a = this.board.create('point', punto_1, {
                  fixed: true,
                  visible: false,
                });

                const punto_b = this.board.create('point', punto_2, {
                  fixed: true,
                  visible: false,
                });
                const punto_c = this.board.create('point', punto_3, {
                  fixed: true,
                  visible: false,
                });

                const ellipse = this.board.create(
                  'ellipse',
                  [punto_a, punto_b, punto_c],
                  stylesDefaultEllipse,
                );
              });
            }

            if (e.circle) {
              e.circle.forEach((e) => {
                const {
                  punto_1,
                  punto_2,
                  stylesCircle,
                  stylesPoint_1,
                  stylesPoint_2,
                } = e;

                const defaulStylePoint_1 = {
                  highlight: false,
                  visible: false,
                  name: '',
                  fixed: true,

                  ...stylesPoint_1,
                };

                const defaulStylePoint_2 = {
                  highlight: false,
                  visible: false,
                  name: '',
                  fixed: true,

                  ...stylesPoint_2,
                };
                const punto_x = this.board.create(
                  'point',
                  punto_1,
                  defaulStylePoint_1,
                );
                const punto_y = this.board.create(
                  'point',
                  punto_2,
                  defaulStylePoint_2,
                );

                const stylesDefaultCircle = {
                  highlight: false,
                  stroke: 'red',

                  ...stylesCircle,
                };
                e.type ??= 'circle';
                const circle = this.board.create(
                  e.type,
                  [punto_x, punto_y],
                  stylesDefaultCircle,
                );
              });
            }
          });
        }
      }
    });
  }

  createFormRaiting(raiting) {
    const { style, questions } = raiting;
    const contentRaiting = document.createElement('div');
    contentRaiting.className = `${
      style?.content ?? 'container grid feedback artifact'
    }`;
    contentRaiting.id = 'artifact_rating';
    contentRaiting.innerHTML = `
          <div class="titlePag"> 
          <div class="contentUtils">
            <svg class="imagenIcon"></svg>  
            <div>
              <p class="pOpinion">Opinión de<p>${document.title}</p></p>
            </div>  
            <svg class="imagenIcon"></svg>          
          </div>
          </div>
          <form id="formRaiting"class="${style?.form ?? 'ratingForm grid'}">
  
          <div class="contentQuestion">
          ${Object.keys(questions)
            .map((key) => {
              const smileys = [
                {
                  style: { label: 'angry' },
                  value: { dataLabel: 'Muy Difícil' },
                  svgs: [
                    { style: 'eye left', href: 'eye' },
                    { style: 'eye right', href: 'eye' },
                    { style: 'mouth', href: 'mouth' },
                  ],
                },
                {
                  style: { label: 'sad' },
                  value: { dataLabel: 'Difícil' },
                  svgs: [
                    { style: 'eye left', href: 'eye' },
                    { style: 'eye right', href: 'eye' },
                    { style: 'mouth', href: 'mouth' },
                  ],
                },
                {
                  style: { label: 'ok' },
                  value: { dataLabel: 'Normal' },
                  svgs: [],
                },
                {
                  style: { label: 'good' },
                  value: { dataLabel: 'Fácil' },
                  svgs: [
                    { style: 'eye left', href: 'eye' },
                    { style: 'eye right', href: 'eye' },
                    { style: 'mouth', href: 'mouth' },
                  ],
                },
                {
                  style: { label: 'happy' },
                  value: { dataLabel: 'Muy Fácil' },
                  svgs: [
                    { style: 'eye left', href: 'eye' },
                    { style: 'eye right', href: 'eye' },
                  ],
                },
              ];

              return `
                  <div class="contentSmiley">${
                    questions[key].value ?? 'dificultad'
                  }
                      <span class="span grid">
                      ${smileys
                        .map((smiley, i) => {
                          const { style, svgs, value } = smiley;
                          return `
                                  <label for="${questions[key].value}_${
                                    i + 1
                                  }_${key}" class="${style.label} labelRaiting">
                                      <input id="${questions[key].value}_${
                                        i + 1
                                      }_${key}" type="radio" value="${
                                        i + 1
                                      }" name="${key}" data-label="${
                                        value?.dataLabel
                                      }" required/>
                                      <div>
                                          ${svgs
                                            .map(
                                              (svgData) =>
                                                `<svg class="${svgData.style}">
                                                  <use xlink:href="#${svgData.href}"></use>
                                              </svg>`,
                                            )
                                            .join('')}
                                      </div>
                                  </label>
                              `;
                        })
                        .join('')}
                      </span>
                  </div>
              `;
            })
            .join('')}
      </div>
            <div class="flex containerBtnH2"><h2 class="textChangeInput">""<h2></div>
            <div class="flex containerBtnH2">
              <button  class="btn-enviar buttonHover" type="submit">Enviar</button>
            </div>
            </form>
          <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
              <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 7" id="mouth">
              <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
          </symbol>
          </svg>
          `;
    // comienzo de declaracion de funciones
    async function sendFormRaiting(data) {
      const dataJSON = JSON.stringify(data);
      console.log(dataJSON);
      formRaiting.sendActive = false;
    }
    const data = {
      status: 4,
    };

    function formRaitingInit() {
      const textChangeInput = contentRaiting.querySelector('.textChangeInput');
      const formRaiting = contentRaiting.querySelector('#formRaiting');
      formRaiting.sendActive = true;
      formRaiting.addEventListener('submit', (e) => {
        e.preventDefault();
        const alerta = new UX().gAlerts({ data });
        const responceRaiting = [];
        Object.keys(questions).forEach((key) => {
          const inputs = formRaiting.elements[key];
          inputs.forEach((input) => {
            if (!input.eventChange) {
              input.eventChange = true;
              input.addEventListener('input', (e) => {
                formRaiting.sendActive = true;
              });
            }
          });
          const responce = {
            question: questions[key].value,
            value: inputs.value,
          };
          return responceRaiting.push(responce);
        });
        if (formRaiting.sendActive) {
          sendFormRaiting(responceRaiting);
        }
      });
      Object.keys(questions).forEach((key) => {
        const inputs = formRaiting.elements[key];
        const smiley = contentRaiting.querySelectorAll('.labelRaiting');
        inputs.forEach((input, i) => {
          smiley[i].classList.add('hoverLabel');
          input.addEventListener('click', (e) => {
            textChangeInput.style.opacity = '1';
            textChangeInput.style.background = '#217e9d';
            textChangeInput.style.color = '#fff';
            textChangeInput.innerHTML = input.dataset.label;
          });
        });
      });
    }
    formRaitingInit();
    return contentRaiting;
  }

  scrollTo(values) {
    const fContainer = document.querySelector('.containerBasePage');
    this.texts = values;

    const loading = document.createElement('div');
    loading.className = 'loader';
    document.querySelector('body').appendChild(loading);

    const loadertxt = document.createElement('h1');
    loadertxt.className = 'loader-text';
    loadertxt.textContent = 'Fragata';
    loading.appendChild(loadertxt);

    const loaderico = document.createElement('div');
    loaderico.className = 'loader-ico';
    loading.appendChild(loaderico);

    const topIndicatorContainer = document.createElement('div');
    topIndicatorContainer.className = 'indicator-container-top';
    fContainer.insertAdjacentElement('afterbegin', topIndicatorContainer);

    // Contenedor auxiliar para el texto adicional
    const auxiliarContainer = document.createElement('div');
    auxiliarContainer.className = 'auxiliar note';
    fContainer.insertAdjacentElement('beforeend', auxiliarContainer);

    // Línea de indicadores superior
    const line = document.createElement('div');
    line.className = 'line';
    topIndicatorContainer.appendChild(line);

    // Contenedor principal del carrusel
    const nContainer = document.createElement('div');
    nContainer.className = 'scroll-container';
    fContainer.appendChild(nContainer);

    // Botones de navegación
    const btnPrev = document.createElement('button');
    btnPrev.className = 'btn-prev';
    btnPrev.textContent = '<';

    const btnNext = document.createElement('button');
    btnNext.className = 'btn-next';
    btnNext.textContent = '>';

    // Contenedor de indicadores
    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'indicator-container';

    // Agregar botones e indicadores al contenedor del carrusel
    nContainer.appendChild(btnPrev);
    nContainer.appendChild(btnNext);
    nContainer.appendChild(indicatorContainer);

    let currentIndex = 0; // Índice actual del carrusel

    const names = [];
    this.def.elementosScroll.forEach((e) => {
      names.push(e.id);
    });

    let nonLexicoIndex = 1;
    let lexicoIndex = 1;

    // Crear los pasos (steps)
    this.def.elementosScroll.forEach((_, index) => {
      const stepElement = document.createElement('div');
      stepElement.className = 'step';
      stepElement.artifactReference = _.id;

      // Determinar el tipo de icono basado en el nombre
      if (names[index].includes('lexico')) {
        stepElement.innerHTML =
          '<?xml version="1.0" encoding="UTF-8"?><svg width="24px" stroke-width="1.5" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#076382"><path d="M4 19V5C4 3.89543 4.89543 3 6 3H19.4C19.7314 3 20 3.26863 20 3.6V16.7143" stroke="#076382" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 17L20 17" stroke="#076382" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 21L20 21" stroke="#076382" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17" stroke="#076382" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 7L15 7" stroke="#076382" stroke-width="1.5" stroke-linecap="round"></path></svg>';
      } else if (names[index].includes('example')) {
        stepElement.innerHTML = `<svg class="w-[30px] h-[30px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"/>
        </svg>`;
      } else if (names[index].includes('rating')) {
        stepElement.innerHTML =
          ' <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.2em" viewBox="0 0 640 512"><path fill="currentColor" d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0l-23.6 47.8l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37l-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8l46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1l38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32zM32 320c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32zm416 96v64c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32H480c-17.7 0-32 14.3-32 32"/></svg>';
      } else {
        stepElement.textContent = `${nonLexicoIndex}`;
        nonLexicoIndex++;
      }

      stepElement.addEventListener('click', () => {
        changeCurrentIndex(index);
      });

      if (index === 0) {
        stepElement.classList.add('active');
      }

      this.stepElements.push(stepElement);
      line.appendChild(stepElement);
    });

    const indicators = [];

    // Crear los indicadores de navegación
    this.def.elementosScroll.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      indicator.style.width = '15px';
      indicator.style.height = '15px';
      indicator.style.borderRadius = '50%';
      indicator.style.background =
        index === currentIndex ? '#076382' : 'lightblue';
      indicator.style.margin = '0 5px';
      indicator.style.cursor = 'pointer';

      indicator.addEventListener('click', () => {
        changeCurrentIndex(index);
      });

      indicators.push(indicator);
      indicatorContainer.appendChild(indicator);
    });

    const updateAuxiliarText = () => {
      const currentStepName = names[currentIndex];

      if (currentStepName.includes('lexico')) {
        auxiliarContainer.style.display = 'flex';
        if (this.texts?.tittle) {
          auxiliarContainer.textContent = this.texts.tittle;
          auxiliarContainer.classList.add('tittle');
        } else {
          auxiliarContainer.style.display = 'none';
        }
      } else if (currentStepName.includes('example')) {
        auxiliarContainer.style.display = 'flex';
        if (this.texts?.lexico) {
          auxiliarContainer.textContent = this.texts.lexico;
          auxiliarContainer.classList.remove('tittle');
        } else {
          auxiliarContainer.style.display = 'none';
        }
      } else if (currentStepName.includes('rating')) {
        auxiliarContainer.style.display = 'none';
      } else {
        auxiliarContainer.style.display = 'flex';
        if (this.texts?.lexico) {
          auxiliarContainer.innerHTML = this.texts.lexico;
          auxiliarContainer.classList.remove('tittle');
        } else {
          auxiliarContainer.style.display = 'none';
        }
      }
    };

    const updateIndicators = () => {
      this.changeBorderColor(null);
      const totalSteps = this.stepElements.length;

      // Ocultar y desvanecer todos los pasos
      this.stepElements.forEach((step, index) => {
        step.style.display = 'none';
        step.style.opacity = '0';
      });

      // Mostrar todos los pasos si hay menos de 5
      if (totalSteps <= 5) {
        this.stepElements.forEach((step) => {
          step.style.display = 'flex';
          step.style.opacity = '1';
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
          this.stepElements[i].style.display = 'flex';
          setTimeout(() => {
            this.stepElements[i].style.opacity = '1';
          }, 0);
        }
      }

      // Actualizar el color de fondo de los indicadores
      indicators.forEach((indicator, index) => {
        indicator.style.background =
          index === currentIndex ? '#076382' : 'lightblue';
      });

      // Actualizar la clase activa del paso actual
      this.stepElements.forEach((step, index) => {
        if (index === currentIndex) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });

      // Deshabilitar botones de navegación si estamos al inicio o al final
      btnPrev.disabled = currentIndex === 0;
      btnNext.disabled = currentIndex === totalSteps - 1;

      // Actualizar el texto en el contenedor auxiliar
      updateAuxiliarText();
    };

    const changeCurrentIndex = (newIndex) => {
      if (newIndex >= 0 && newIndex < this.def.elementosScroll.length) {
        const currentElement = this.def.elementosScroll[currentIndex];
        const newElement = this.def.elementosScroll[newIndex];

        // Animación de salida del elemento actual
        currentElement.style.display = 'none';
        // Tiempo de espera para la animación de salida

        currentIndex = newIndex;

        newElement.style.display = '';

        // Actualizar indicadores y texto auxiliar
        updateIndicators();
      }
    };

    // Control de eventos para los botones de navegación
    btnPrev.addEventListener('click', () => {
      if (currentIndex > 0) {
        changeCurrentIndex(currentIndex - 1);
      }
    });

    btnNext.addEventListener('click', () => {
      if (currentIndex < this.def.elementosScroll.length - 1) {
        changeCurrentIndex(currentIndex + 1);
      }
    });

    document.querySelector('.containerBasePage').style.opacity = '0';

    this.def.elementosScroll.forEach((e, index) => {
      e.classList.add('artifact');
      nContainer.appendChild(e);
      if (index === 0) {
        e.style.display = '';
      } else {
        setTimeout(() => {
          e.style.display = 'none';
        }, 3000);
      }
    });

    setTimeout(() => {
      document.querySelector('.loader').style.display = 'none';
    }, 3000);

    setTimeout(() => {
      document.querySelector('.containerBasePage').style.opacity = '1';
    }, 3100);

    // Actualizar los indicadores iniciales
    updateIndicators();
  }

  nameObjectData() {
    // NOMBRE CARPETA
    const url = window.location.href;

    const ruta_carpeta = url.substring(0, url.lastIndexOf('/'));
    const nombre_carpeta = ruta_carpeta.substring(
      ruta_carpeta.lastIndexOf('/') + 1,
    );

    // NOMBRE ARCHIVO
    const nombre_archivo = url
      .substring(url.lastIndexOf('/') + 1)
      .split('.')[0];
    return `${nombre_carpeta}_${nombre_archivo}`;
  }

  data(definicion, data, name_data) {
    const cantidad_entradas =
      data.interaction.correct +
      data.interaction.incorrect +
      data.interaction.forAnswer;
    const percentage_artifacts = (
      (data.interaction.correct / cantidad_entradas) *
      100
    ).toFixed();

    if (percentage_artifacts >= 70) {
      // console.log("estatus", data.status, "porcentaje", percentage_artifacts)

      // Recuperar el array existente o inicializar uno nuevo
      this.getData = JSON.parse(localStorage.getItem(`${name_data}`)) ?? {
        completedArtifacts: [],
      };

      // Si el artefacto ya está en el array, no se agrega otra vez
      for (let i = 0; i < this.getData.completedArtifacts.length; i++) {
        const artifact = this.getData.completedArtifacts[i];
        if (artifact.reference === definicion.name) {
          return;
        }
      }
      // Crear el nuevo objeto de datos del artefacto
      const objectData = {
        reference: definicion.name,
        status: data.status,
        percentageCompleteArtifact: percentage_artifacts,
      };
      // const artefactoValidado= document.querySelector(`#${definicion.name}`)
      //         artefactoValidado.style.border = "#7ed957 solid 5px"

      // se agrega el borde verde a los que ya estan validados

      // const artefactoValidado= document.querySelector(`#${definicion.name}`)
      // artefactoValidado.style.border="#7ed957 solid 5px"
      this.changeBorderColor(definicion.name);
      // Agregar el nuevo estado al array
      this.getData.completedArtifacts.push(objectData);
      // Guardar el array actualizado en localStorage
      localStorage.setItem(`${name_data}`, JSON.stringify(this.getData));
    }
  }

  progressBarStructure(artifacts) {
    // CREACION DE LA ESTRUCTURA

    const general = document.querySelector('.indicator-container-top');

    const porcentajeText = document.createElement('p');

    porcentajeText.className = 'text-bar';

    const baseProgress = document.createElement('div');
    baseProgress.className = 'base-progress';

    const progressBtnContainer = document.createElement('div');
    progressBtnContainer.className = 'progress-btn-container';

    const progress = document.createElement('div');
    progress.className = 'progress';

    const content = document.createElement('div');
    content.className = 'porcent-and-hide';
    const progressBase = document.createElement('div');
    progressBase.className = 'progress-base';
    progressBase.appendChild(progress);
    content.appendChild(progressBase);

    // const containerBtnPorcentaje = document.createElement('div');

    // const containerBtnPorcentaje = document.createElement('div');
    const btnHide = document.createElement('div');
    btnHide.className = 'btn-hide';
    content.appendChild(porcentajeText);

    // Construir la estructura del DOM
    progressBtnContainer.appendChild(content);
    progressBtnContainer.appendChild(btnHide);
    //     baseProgress.appendChild()
    // progressBtnContainer.appendChild(containerBtnPorcentaje)
    baseProgress.appendChild(progressBtnContainer);
    general.appendChild(baseProgress);

    // Encontrar el contenedor destino y agregar la nueva estructura
    const container = document.querySelector('.indicator-container-top');
    // container.appendChild(structureContainerProgress);

    // BOTON PARA OCULTAR LA BARRA DE PROGRESO
    const contenido_r = document.querySelector('.porcent-and-hide');
    const button_hide = document.querySelector('.btn-hide');
    button_hide.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="#076382" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"/></svg>`;

    let activeButton = true;
    const base_progress = document.querySelector('.base-progress');
    const progress_base = document.querySelector('.progress-base');

    button_hide.addEventListener('click', () => {
      if (activeButton) {
        progress_base.style.opacity = '0';
        // container.style.alignItems= "flex-end";
        base_progress.style.justifyContent = 'center';
        base_progress.style.gap = '10px';
        contenido_r.style.flexDirection = 'row';
        container.style.height = '90px';
        // base_progress.classList.add("base-progress-click");
        button_hide.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="#076382" d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5c-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1M12.22 17c-4.31.1-7.12-3.59-8-5c1-1.61 3.61-4.9 7.61-5c4.29-.11 7.11 3.59 8 5c-1.03 1.61-3.61 4.9-7.61 5"/><path fill="#076382" d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5m0 5a1.5 1.5 0 1 1 1.5-1.5a1.5 1.5 0 0 1-1.5 1.5"/></svg>`;

        activeButton = false;
      } else {
        // base_progress.classList.remove("base-progress-click");
        base_progress.style.justifyContent = 'space-evenly';
        contenido_r.style.flexDirection = 'column-reverse';
        container.style.height = '130px';
        progress_base.style.opacity = '1';
        button_hide.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><path fill="#076382" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"/></svg>`;

        activeButton = true;
      }
    });

    // artefactos interactuables

    const interactable_artifacts = [];
    artifacts.forEach((e) => {
      const { def, htmlNode } = e;
      if (def.conditions) {
        interactable_artifacts.push(htmlNode);
      }
    });

    window.addEventListener('load', () => {
      this.artefacts_check =
        JSON.parse(localStorage.getItem(this.nameObjectData())) ?? [];

      this.changeBorderColor(null);

      if (!this.artefacts_check) {
        return;
      }
      const progress_reference_dos = document.querySelector('.progress');
      progress_reference_dos.style.width = `${this.artefacts_check.percentageCompletePage}%`;
      porcentajeText.textContent = `${
        this.artefacts_check.percentageCompletePage ?? '0'
      }%`;
      this.artefacts_check.completedArtifacts?.forEach((e) => {
        const artefactsBorderAdd = document.body.querySelector(
          `#${e.reference}`,
        );
        artefactsBorderAdd.style.borderColor = '#7ed957';
      });
    });

    // se solicita la data cuando se presiona el boton check
    artifacts.forEach((e) => {
      const { def, htmlNode } = e;

      const allBtn = htmlNode.querySelector('.all-btn');

      // se toma la referencia del div
      const progress_reference = document.querySelector('.progress');

      if (def.conditions) {
        allBtn.addEventListener('click', (e) => {
          const button = e.target;
          if (button.classList.contains('check')) {
            const artefacts_check_dos = JSON.parse(
              localStorage.getItem(this.nameObjectData()),
            );
            // artefactos resueltos

            if (!artefacts_check_dos) {
              return;
            }

            const array_complete_artifacts =
              artefacts_check_dos.completedArtifacts;

            // se calcula el tamaño de la barra de progreso
            const progress_width_division = 100 / interactable_artifacts.length;
            const progress_width_validacion = array_complete_artifacts
              ? array_complete_artifacts.length
              : 1;

            this.progress_width_total = (
              progress_width_division * progress_width_validacion
            ).toFixed();

            // se aplica el tamaño
            progress_reference.style.width = `${this.progress_width_total}%`;

            artefacts_check_dos.percentageCompletePage =
              this.progress_width_total;
            porcentajeText.textContent = `${this.progress_width_total}%`;

            localStorage.setItem(
              this.nameObjectData(),
              JSON.stringify(artefacts_check_dos),
            );
          }
        });
      }
    });
  }

  changeBorderColor(reference) {
    const { completedArtifacts } =
      JSON.parse(localStorage.getItem(this.nameObjectData())) ?? {};
    const stepElements = document.querySelectorAll('.step');
    if (reference) {
      const artefactoValidado = document.querySelector(`#${reference}`);
      if (artefactoValidado) {
        artefactoValidado.style.borderColor = '#7ed957';
      }
    }
    stepElements?.forEach((step) => {
      if (
        completedArtifacts?.some(
          (artifact) => artifact.reference == step.artifactReference,
        )
      ) {
        step.style.borderColor = '#7ed957';
        // step.style.color = "#48a142"
      }
    });
  }
}
