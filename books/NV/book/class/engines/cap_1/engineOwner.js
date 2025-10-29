class EngineOwner extends baseBoards {
  constructor(def) {
    super();
    this.def = def;
    this.board = null;
    this.idTemplate = "tmpText";
    this.htmlNode = null;
    this.template = null;
    this.raiting = def?.Raiting;
    this.raitingInputs = [];
  }

  templateInsert = () => {
    if (!document.querySelector("#tmpText")) {
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
      document.body.insertAdjacentHTML("afterend", this.template);
    }
    this.htmlNode ??= document
      .querySelector(`#${this.idTemplate}`)
      ?.content.firstElementChild.cloneNode(true);

    return this.htmlNode;
  };
  initEngine() {
    //  se agrega la clase que se desee al contenedor
    this.def.styleContainer ?? "note";
    if (this.def.styleContainer) {
      this.htmlNode.classList.add(this.def.styleContainer);
    }

    if (this.def.nodo) {
      this.createText(this.def);
    }
    if (this.def.recursos) {
      this.createResources(this.def);
    }
    const terms = ["rating", "raiting"];
    if (terms.some(term => this.def.name.toLowerCase().includes(term))) {
      const raiting = this.createFormRaiting({
        questions: this.def.questions,
        style: this.def.style ?? {},
      });
      this.htmlNode.appendChild(raiting);
    }
  }
  createText(def) {
    const nodo = def.nodo;

    nodo.forEach((e, i) => {
      const {texto, atributos, etiqueta} = e;

      let createNodo = document.createElement(etiqueta ?? "p");
      createNodo.insertAdjacentHTML(`afterbegin`, texto ?? "");

      e.id ??= e.id = "nodo_" + (i + 1);
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
      console.warn("su contenedor no se encuentra en el documento");
      document.body.appendChild(this.htmlNode);
      return;
    }

    if (def?.position == "left" || def?.position == "rigth") {
      def.position == "left"
        ? containerReference?.insertAdjacentElement(
            "beforeBegin",
            this.htmlNode,
          )
        : containerReference?.insertAdjacentElement("afterEnd", this.htmlNode);

      def?.positionParent.forEach(e => {
        const containerParent = document.body.querySelector(
          `.${e.parent}`,
          `#${e.parent}`,
        );

        const parentReferencia =
          document.body.querySelector(`#${e.artifactReferenceParent}`) ??
          document.body.querySelector(`.${e.artifactReferenceParent}`);

        e.direction == "top"
          ? parentReferencia.insertAdjacentElement(
              "beforeBegin",
              containerParent,
            )
          : parentReferencia.insertAdjacentElement("afterEnd", containerParent);
      });
    }
    if (def?.position == "top" || def?.position == "bottom") {
      const divAuxiliar = document.createElement("Div");
      divAuxiliar.appendChild(this.htmlNode);
      divAuxiliar.classList.add("divAuxiliar");
      def.position == "top"
        ? containerReference?.insertAdjacentElement("beforeBegin", divAuxiliar)
        : containerReference?.insertAdjacentElement("afterEnd", divAuxiliar);
    }
  }
  createResources(def) {
    const recursos = def.recursos;

    recursos.forEach((e, index) => {
      const {recurso} = e;

      if (recurso) {
        const containerBoard = document.createElement("div");
        recurso.idRecurso ??= "recurso_" + def.name + `_${index}`;

        containerBoard.id = recurso.idRecurso;

        this.htmlNode.appendChild(containerBoard);

        recurso.styleRecurso ??= ["utils"];

        if (recurso.styleRecurso) {
          recurso.styleRecurso.forEach(e => {
            containerBoard.classList.add(e);
          });
        }

        recurso.styles ??= {
          boundingbox: [-4, 4, 4, -4],
          axies: {
            y: {visible: false},
            x: {visible: false},
          },
        };

        this.initBoardBase({id: recurso.idRecurso, styles: recurso.styles});

        if (recurso.grafico) {
          recurso.grafico.forEach(e => {
            if (e.texto) {
              e.texto.forEach(e => {
                const {x, y, mensaje, styleText} = e;
                const stylesDefault = {
                  fixed: true,
                  fontSize: 15,
                  highlight: false,
                  cssClass: e?.stylesText?.cssClasses ?? "textDefaultJSX",
                  ...styleText,
                };
                const text = this.board.create(
                  "text",
                  [x, y, mensaje],
                  stylesDefault,
                );
              });
            }

            if (e.points) {
              e.points.forEach(e => {
                const {x, y, stylesPoint} = e;
                const stylesDefault = {
                  highlight: false,
                  withLabel: false,
                  fixed: true,
                  ...stylesPoint,
                };
                const point = this.board.create("point", [x, y], stylesDefault);
              });
            }

            if (e.curve) {
              e.curve.forEach(e => {
                const {x, y, styles} = e;
                const stylesDefault = {
                  strokeColor: "#217e9d",
                  highlight: false,
                  withLabel: false,
                  fixed: true,
                  ...styles,
                };
                const curve = this.board.create("curve", [x, y], stylesDefault);
              });
            }

            if (e.linea) {
              e.linea.forEach(e => {
                const {
                  punto_1,
                  punto_2,
                  stylesLine,
                  stylesPoint_1,
                  stylesPoint_2,
                } = e;

                const defaultStylesLine = {
                  highlight: false,
                  strokeColor: "#217e9d",
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
                  name: "",
                  fixed: true,

                  ...stylesPoint_1,
                };

                const defaulStylePoint_2 = {
                  highlight: false,
                  visible: false,
                  name: "",
                  fixed: true,

                  ...stylesPoint_2,
                };

                const punto_x = this.board.create(
                  "point",
                  punto_1,
                  defaulStylePoint_1,
                );
                const punto_y = this.board.create(
                  "point",
                  punto_2,
                  defaulStylePoint_2,
                );
                e.type ??= "line";
                const linea = this.board.create(
                  e.type,
                  [punto_x, punto_y],
                  defaultStylesLine,
                );
              });
            }

            if (e.ellipse) {
              e.ellipse.forEach(e => {
                const {
                  punto_1,
                  punto_2,
                  punto_3,
                  type,
                  styles,
                  stylesPoint_1,
                  stylesPoint_2,
                  stylesPoint_3,
                } = e;
                const stylesDefault = {
                  highlight: false,
                  strokeColor: "#217e9d",
                  strokeWidth: 2,
                  ...styles,
                };

                const defaulStylePoint_1 = {
                  highlight: false,
                  visible: false,
                  name: "",
                  fixed: true,
                  strokeWidth: 1,

                  ...stylesPoint_1,
                };

                const defaulStylePoint_2 = {
                  highlight: false,
                  visible: false,
                  name: "",
                  fixed: true,
                  strokeWidth: 1,

                  ...stylesPoint_2,
                };

                const defaulStylePoint_3 = {
                  highlight: false,
                  visible: false,
                  name: "",
                  fixed: true,
                  strokeWidth: 1,

                  ...stylesPoint_3,
                };

                const punto_a = this.board.create(
                  "point",
                  punto_1,
                  defaulStylePoint_1,
                );

                const punto_b = this.board.create(
                  "point",
                  punto_2,
                  defaulStylePoint_2,
                );
                const punto_c = this.board.create(
                  "point",
                  punto_3,
                  defaulStylePoint_3,
                );

                const ellipse = this.board.create(
                  type ?? "ellipse",
                  [punto_a, punto_b, punto_c],
                  stylesDefault,
                );
              });
            }

            if (e.circle) {
              e.circle.forEach(e => {
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
                  name: "",
                  fixed: true,

                  ...stylesPoint_1,
                };

                const defaulStylePoint_2 = {
                  highlight: false,
                  visible: false,
                  name: "",
                  fixed: true,

                  ...stylesPoint_2,
                };
                const punto_x = this.board.create(
                  "point",
                  punto_1,
                  defaulStylePoint_1,
                );
                const punto_y = this.board.create(
                  "point",
                  punto_2,
                  defaulStylePoint_2,
                );

                const stylesDefaultCircle = {
                  highlight: false,
                  stroke: "red",

                  ...stylesCircle,
                };
                e.type ??= "circle";
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
    const Send = new DataSender();
    const {style, questions} = raiting;
    const contentRaiting = document.createElement("div");
    contentRaiting.className = `${
      style?.content ?? "container grid feedback artifact"
    }`;
    contentRaiting.id = "artifact_rating";
    let path = window.location.pathname.includes(".html")
      ? window.location.pathname.split(/pag_/)
      : window.location.pathname.split(/page_/);
    const numPag = path[1].includes("_") ? path[1].split("_") : [path[1]];
    const pagina = numPag[0] ?? ""; // Número de página
    const subPagina = numPag[1] ? `.${numPag[1]}` : ""; // Subpágina, si existe
    contentRaiting.innerHTML = `
          <div class="titlePag"> 
          <div class="contentUtils">
            <svg class="imagenIcon-mobile"></svg>  
            <div>
            <p class="pOpinion">Opinión de Página ${
              pagina.includes(".html") ? pagina?.replace(/\.html$/, "") : pagina
            }${
              subPagina.includes(".html")
                ? subPagina?.replace(/\.html$/, "")
                : subPagina
            }</p>
             
            </div>  
            <svg class="imagenIcon-mobile"></svg>          
          </div>
          </div>
          <form id="formRaiting"class="${style?.form ?? "ratingForm grid"}">
  
          <div class="contentQuestion">
          ${Object.keys(questions)
            .map(key => {
              const smileys = [
                {
                  style: {label: "angry"},
                  value: {dataLabel: "Muy Difícil"},
                  svgs: [
                    {style: "eye left", href: "eye"},
                    {style: "eye right", href: "eye"},
                    {style: "mouth", href: "mouth"},
                  ],
                },
                {
                  style: {label: "sad"},
                  value: {dataLabel: "Difícil"},
                  svgs: [
                    {style: "eye left", href: "eye"},
                    {style: "eye right", href: "eye"},
                    {style: "mouth", href: "mouth"},
                  ],
                },
                {style: {label: "ok"}, value: {dataLabel: "Normal"}, svgs: []},
                {
                  style: {label: "good"},
                  value: {dataLabel: "Fácil"},
                  svgs: [
                    {style: "eye left", href: "eye"},
                    {style: "eye right", href: "eye"},
                    {style: "mouth", href: "mouth"},
                  ],
                },
                {
                  style: {label: "happy"},
                  value: {dataLabel: "Muy Fácil"},
                  svgs: [
                    {style: "eye left", href: "eye"},
                    {style: "eye right", href: "eye"},
                  ],
                },
              ];

              return `
                  <div class="contentSmiley">${
                    questions[key].value ?? "dificultad"
                  }
                      <span class="span grid">
                      ${smileys
                        .map((smiley, i) => {
                          const {style, svgs, value} = smiley;
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
                                      }"/>
                                      <div>
                                          ${svgs
                                            .map(
                                              svgData =>
                                                `<svg class="${svgData.style}">
                                                  <use xlink:href="#${svgData.href}"></use>
                                              </svg>`,
                                            )
                                            .join("")}
                                      </div>
                                  </label>
                              `;
                        })
                        .join("")}
                      </span>
                  </div>
              `;
            })
            .join("")}
      </div>
            <div class="flex containerBtnH2"><h2 class="textChangeInput hoverLabel">¡Califícanos!<h2></div>
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
    const swicthClassRating =
      contentRaiting.querySelectorAll(".imagenIcon-mobile");
    swicthClassRating.forEach(swicthClassRating => {
      if (
        typeof window.Android !== "undefined" &&
        typeof window.Android.sendData === "function"
      ) {
        return;
      } else {
        swicthClassRating.classList.remove("imagenIcon-mobile");
        swicthClassRating.classList.add("imagenIcon-web");
      }
    });

    // comienzo de declaracion de funciones
    async function sendFormRaiting(data) {
      const dataJSON = JSON.stringify(data);
      formRaiting.sendActive = false;
    }
    const formRaiting = contentRaiting.querySelector("#formRaiting");
    const textChangeInput = contentRaiting.querySelector(".textChangeInput");

    function formRaitingInit(def) {
      const formRaiting = contentRaiting.querySelector("#formRaiting");
      formRaiting.sendActive = false; // Inicializa como false para controlar el envío

      formRaiting.addEventListener("submit", e => {
        e.preventDefault(); // Previene el envío por defecto

        // Aquí puedes manejar la lógica de validación antes de continuar
        if (!formRaiting.sendActive) {
          def.UX.gAlerts({
            data: {
              status: 3,
              message: "Debes seleccionar una opción antes de continuar",
            },
          });
          return; // Llama a la función de alerta
        }

        let responceRaiting = null;
        Object.keys(questions).forEach(key => {
          const inputs = formRaiting.elements[key];
          let inputCorrect;

          inputs.forEach(input => {
            if (input.eventChange) {
              inputCorrect = input;
              input.eventChange = false;
              input.addEventListener("input", e => {
                formRaiting.sendActive = true; // Activa el envío al interactuar
              });
            }
          });

          const responce = {
            question: questions[key].value,
            selected: inputCorrect?.dataset.label,
            value: inputs.value,
          };
          responceRaiting = responce;
          inputCorrect.eventChange = false;
        });

        // Solo envía si sendActive es true
        if (formRaiting.sendActive) {
          sendFormRaiting(responceRaiting);
          Send.prepareData(responceRaiting, "", "Rating");
          def.UX.gAlerts({data: {status: 4}});
        }
      });

      Object.keys(questions).forEach(key => {
        const inputs = formRaiting.elements[key];
        const smiley = contentRaiting.querySelectorAll(".labelRaiting");

        inputs.forEach((input, i) => {
          input.eventChange = false;

          input.addEventListener("click", e => {
            textChangeInput.textContent = input.dataset.label;
            input.eventChange = true;
            formRaiting.sendActive = true; // cambia su valor a true ya que se interactuo
          });
        });
      });
    }
    formRaitingInit(this);

    return contentRaiting;
  }
}
