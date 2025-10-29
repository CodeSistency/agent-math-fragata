

class UX {
  constructor() {
    this.modal = {}
    this.htmlNode = null
    this.alertBox = null

  }
  //agrega avisos sobre el board
  gAlerts({ data }, def = {}) {
    const definition = def
    let temp = document.querySelector('.containerBasePage');
    let inserttemp = `
      <div class="alert alert-success">
        <p class="alert-message"></p>
        <span class="alert-close"></span>
      </div>`;

    // Crea el objeto de audio
    let alertSound = false
    if (typeof window.Android !== 'undefined' && typeof window.Android.sendData === 'function') {
      alertSound = false
    }
    else {
      alertSound = new Audio('/gateway/file/NV/ASS/sounds/correct.wav'); // Cambia la ruta al archivo de audio;


    }
    if (!temp.parentElement.querySelector('.alert')) {
      temp.insertAdjacentHTML('afterend', inserttemp);
    }

    let alert = document.querySelector('.alert');
    let closeX = alert.querySelector('.alert-close');
    const message = alert.firstElementChild;
    const close = alert.lastElementChild;

    let timeoutId;

    function closeAlert() {
      alert.style.animation = 'close .5s ease-in-out 0s 1 normal forwards';
      clearTimeout(timeoutId); // Limpia el timeout cuando se cierra la alerta
    }

    function openAlert() {
      alert.style.animation = 'open .5s ease-in-out 0s 1 normal forwards';
      timeoutId = setTimeout(closeAlert, 3000); // Inicia un nuevo timeout cada vez que se abre la alerta
    }

    // Llama a openAlert() para abrir la alerta
    openAlert();

    // Verifica el estado y muestra el mensaje correspondiente
    if (data.status == 2) {
      alert.classList.remove("alert-success", "alert-danger", "alert-error", 'alert-send');
      alert.classList.add("alert-error");
      closeX.style.background = "#ea2b2b"
      message.innerText = data.message ?? '¡Tienes que interactuar con el artefacto!';

      // No se reproduce sonido en este caso
    } else if (data.status == 3) {
      alert.classList.remove("alert-success", "alert-error", "alert-danger", 'alert-send');
      alert.classList.add("alert-danger");
      closeX.style.background = "#cd7900"
      message.innerText = data.message ?? '¡Tienes que interactuar con el artefacto!';

      // No se reproduce sonido en este caso
    } else if (data.status == 1) {
      alert.classList.remove("alert-danger", "alert-error", "alert-success", 'alert-send');
      alert.classList.add("alert-success");
      closeX.style.background = "#58a700"
      message.innerText = data.message ?? '¡Tienes que interactuar con el artefacto!';

      if (alertSound) {
        if (definition.htmlNode.style.borderColor == '#7ed957' || definition.htmlNode.style.borderColor == 'rgb(126, 217, 87)') {
        } else {
          alertSound.play();
        }
      }

    } else if (data.status == 4) {
      alert.classList.remove("alert-success", "alert-error", "alert-danger");
      alert.classList.add("alert-send");
      closeX.style.background = "#527e6e"
      message.innerText = data.message ?? '¡Enviado correctamente!';
    }

    close.addEventListener('click', closeAlert);
  }
  createHelpButton() {

    const helpButtonHtml = `<button class="helpButton-mobile styleBtn buttonKey" ></button>
       <div class="emergenteWindow" >
     
        <span class="buttonClosedEmergentWindow alert-closeHelp-mobile"></span>

        <div class="emergentWindowContentText">
        
        <svg class="IconMente-mobile" ></svg>  

        <p class=" alinear-derecha" >${this.def.helpArtifact.message} </p>
        </div>
       
        <div class="lineFondo">
         <div class="lineProcess"></div>
       </div>
         </div>
     
        `
      ;
    const btnBase = this.htmlNode.querySelector('.btn-base');
    btnBase.insertAdjacentHTML('afterbegin', helpButtonHtml);
    const helpWindow = this.htmlNode.querySelector('.helpButton-mobile')
    this.helpButton = this.htmlNode.querySelector('.helpButton-mobile');

    const alert_window = this.htmlNode.querySelector('.IconMente-mobile')
    const alertClose = this.htmlNode.querySelector('.alert-closeHelp-mobile')

    if (typeof window.Android !== 'undefined') {
      alert_window.classList.add('IconMente-mobile')
      alertClose.classList.add('alert-closeHelp-mobile')
    } else {
      alert_window.classList.add('IconMente-web')
      alertClose.classList.add('alert-closeHelp-web')
    }


    if (typeof window.Android !== 'undefined') {
      helpWindow.classList.add('helpButton-mobile')
    } else {
      helpWindow.classList.add('helpButton-web')
    }



    this.emergenteWindow = this.htmlNode.querySelector('.emergenteWindow');
    const buttonClosed = this.htmlNode.querySelector('.buttonClosedEmergentWindow');
    this.line = this.htmlNode.querySelector('.lineFondo');



    document.addEventListener("DOMContentLoaded", () => {
      const auxiliarP = document.querySelector('.auxiliar');

      // Función para actualizar la opacidad del auxiliarP

      this.line.displayEmergentWindow = false;
      this.helpButton.displayEmergentWindow = false;
      // Llamada inicial por si el estado de displayEmergentWindow es verdadero en el arranque


      if (!this.helpButton.displayEmergentWindow) {
        this.helpButton.addEventListener("click", (event) => {
          this.htmlNode.parentElement.insertAdjacentElement('afterEnd', this.emergenteWindow)
          // auxiliarP.style.opacity = '0.2';
          this.htmlNode.parentElement.style.opacity = '0.2'
          this.emergenteWindow.style.animation = "deployWindoworExercise .5s ease-out forwards";
          this.helpButton.displayEmergentWindow = true;
          this.line.displayEmergentWindow = true;
          this.emergenteWindow.displayEmergentWindow = true;
          //  Actualiza la opacidad cuando se muestra la ventana emergente


          this.time = setTimeout(() => {

            this.emergenteWindow.querySelector('.lineProcess').style.animation = "growLine 5s ease-out forwards";
          }, 1000);

          if (this.line.displayEmergentWindow) {

            this.time = setTimeout(() => {
              if (this.emergenteWindow) {
                this.htmlNode.parentElement.style.opacity = '1'


                this.emergenteWindow.style.animation = "closedWindoworExercise .5s ease-out forwards";
                this.emergenteWindow.style.position = 'fixed'
                //  this.emergenteWindow.querySelector('.lineProcess').style.animation = "shrinkline 1s ease-out forwards";
                this.line.displayEmergentWindow = false
                // auxiliarP.style='none'; 
              }
            }, 5800);

          }

        })

      };

      buttonClosed.addEventListener("click", (e) => {
        this.emergenteWindow.style.animation = "closedWindoworExercise .5s ease-out forwards";
        clearTimeout(this.time)
        this.htmlNode.parentElement.style.opacity = '1'
        this.emergenteWindow.querySelector('.lineProcess').style.animation = "shrinkline .1s ease-out forwards";
        this.helpButton.displayEmergentWindow = false;
        this.emergenteWindow.style.position = 'fixed'


        this.line.displayEmergentWindow = false

        // auxiliarP.style='none'; // Restaura la opacidad cuando se cierra la ventana emergente
      });

    });
  }
  mathFieldEvents(math) {
    const numberFormatter = new Intl.NumberFormat('en-US');
    math.mathVirtualKeyboardPolicy = "sandboxed";
    // math.executeCommand(['switch-mode', 'text']);

    math.setAttribute('keypress-sound', 'none');
    let svgClass = []
    if (typeof window.Android !== 'undefined' && typeof window.Android.sendData === 'function') {
      svgClass = ['<svg class="iconDeleteKeyboard-mobile SvgNormalize"></svg>', '<svg class="SvgNormalize arrowLeftKeyboard-mobile"></svg>', '<svg class="SvgNormalize arrowRigthKeyboard-mobile"></svg>']

    }
    else {

      svgClass = ['<svg class="iconDeleteKeyboard-web SvgNormalize"></svg>', '<svg class="SvgNormalize arrowLeftKeyboard-web"></svg>', '<svg class="SvgNormalize arrowRigthKeyboard-web"></svg>']
    }
    math.addEventListener("focusin", () => {
      mathVirtualKeyboard.layouts = [
        // Apartado 1: Números y Operaciones
        {
          label: 'Números',
          rows: [
            [
              { class: 'contentLettersMathlive', label: '7', key: '7' },
              { class: 'contentLettersMathlive', label: '8', key: '8' },
              { class: 'contentLettersMathlive', label: '9', key: '9' },
              { class: 'contentLettersMathlive', label: '+', key: '+' },
              { class: 'contentLettersMathlive', label: '*', insert: '\\cdot' },

              {
                class: 'contentLettersMathliveAction arro',
                label: svgClass[1],
                command: ['performWithFeedback', 'moveToPreviousChar']
              },
              {
                class: 'contentLettersMathliveAction arro',
                label: svgClass[2],
                command: ['performWithFeedback', 'moveToNextChar']
              }
            ],
            [
              { class: 'contentLettersMathlive', label: '4', key: '4' },
              { class: 'contentLettersMathlive', label: '5', key: '5' },
              { class: 'contentLettersMathlive', label: '6', key: '6' },
              { class: 'contentLettersMathlive', label: '-', key: '-' },
              { class: 'contentLettersMathlive', insert: '/' },
              {
                class: 'contentLettersMathliveAction font-glyph bottom right',
                label: svgClass[0],
                width: 2,
                command: ['performWithFeedback', 'deleteBackward']
              }
            ],
            [

              { class: 'contentLettersMathlive', label: '1', key: '1' },
              { class: 'contentLettersMathlive', label: '2', key: '2' },
              { class: 'contentLettersMathlive', label: '3', key: '3' },
              { class: 'contentLettersMathlive', label: '0', key: '0' },
              { class: 'contentLettersMathlive', label: '=', key: '=' },
              { class: 'contentLettersMathlive', label: '.', key: '.' },
              { class: 'contentLettersMathlive', label: ',', key: ',' },


            ]
          ]
        },

        {
          label: 'Alfabeto',
          rows: [
            [
              { class: 'contentLettersMathlive', label: 'q', key: 'q' },
              { class: 'contentLettersMathlive', label: 'w', key: 'w' },
              { class: 'contentLettersMathlive', label: 'e', key: 'e' },
              { class: 'contentLettersMathlive', label: 'r', key: 'r' },
              { class: 'contentLettersMathlive', label: 't', key: 't' },
              { class: 'contentLettersMathlive', label: 'y', key: 'y' },
              { class: 'contentLettersMathlive', label: 'u', key: 'u' },
              { class: 'contentLettersMathlive', label: 'i', key: 'i' },
              { class: 'contentLettersMathlive', label: 'o', key: 'o' },
              { class: 'contentLettersMathlive', label: 'p', key: 'p' },
            ],
            [
              { class: 'contentLettersMathlive', label: 'a', key: 'a' },
              { class: 'contentLettersMathlive', label: 's', key: 's' },
              { class: 'contentLettersMathlive', label: 'd', key: 'd' },
              { class: 'contentLettersMathlive', label: 'f', key: 'f' },
              { class: 'contentLettersMathlive', label: 'g', key: 'g' },
              { class: 'contentLettersMathlive', label: 'h', key: 'h' },
              { class: 'contentLettersMathlive', label: 'j', key: 'j' },
              { class: 'contentLettersMathlive', label: 'k', key: 'k' },
              { class: 'contentLettersMathlive', label: 'l', key: 'l' },
              {
                class: 'contentLettersMathliveAction arro',
                label: svgClass[1],
                command: ['performWithFeedback', 'moveToPreviousChar']
              },
              {
                class: 'contentLettersMathliveAction arro',
                label: svgClass[2],
                command: ['performWithFeedback', 'moveToNextChar']
              }

            ],
            [
              { class: 'contentLettersMathlive', label: 'z', key: 'z' },
              { class: 'contentLettersMathlive', label: 'x', key: 'x' },
              { class: 'contentLettersMathlive', label: 'c', key: 'c' },
              { class: 'contentLettersMathlive', label: 'v', key: 'v' },
              { class: 'contentLettersMathlive', label: 'b', key: 'b' },
              { class: 'contentLettersMathlive', label: 'n', key: 'n' },
              { class: 'contentLettersMathlive', label: 'm', key: 'm' },
              {
                class: 'contentLettersMathliveAction font-glyph bottom right',
                label: svgClass[0],
                width: 2,
                command: ['performWithFeedback', 'deleteBackward']
              }
            ]
          ]
        },
        {
          label: 'Símbolos',
          rows: [
            [
              { class: 'contentLettersMathlive', label: '<', key: '<' },
              { class: 'contentLettersMathlive', label: '>', key: '>' },
              { class: 'contentLettersMathlive', insert: '\\lbrack' },
              { class: 'contentLettersMathlive', insert: '\\rbrack' },
              {
                class: 'contentLettersMathliveAction arro',
                label: svgClass[1],
                command: ['performWithFeedback', 'moveToPreviousChar']
              },
              {
                class: 'contentLettersMathliveAction arro',
                label: svgClass[2],
                command: ['performWithFeedback', 'moveToNextChar']
              }
            ],
            [
              { class: 'contentLettersMathlive', label: ':', key: ':' },
              { class: 'contentLettersMathlive', label: ';', key: ';' },
              { class: 'contentLettersMathlive', label: '(', key: '(' },
              { class: 'contentLettersMathlive', label: ')', key: ')' },
              {
                class: 'contentLettersMathliveAction font-glyph bottom right',
                label: svgClass[0],
                width: 2,
                command: ['performWithFeedback', 'deleteBackward']
              }
            ],
            [
              { class: 'contentLettersMathlive', insert: '\\div', key: '/' },
              { class: 'contentLettersMathlive', insert: '\\pi', label: 'π' },
              { class: 'contentLettersMathlive', insert: '\\lbrace' },
              { class: 'contentLettersMathlive', insert: '\\rbrace' },
              { class: 'contentLettersMathlive', insert: '\\frac{#@}{#?}' },
              { class: 'contentLettersMathlive', label: "'", key: "'" },
            ]
          ]
        }


      ];


      mathVirtualKeyboard.show();
    });

    math.addEventListener("focusout", () => mathVirtualKeyboard.hide());
    math.addEventListener("focus", () => mathVirtualKeyboard.show());
  }
  defModal() {
    const container = document.querySelector('.containerBasePage') || document.body;
    const modalContainer = document.querySelector('.modal-container');

    if (!modalContainer) {
      const modal = document.createElement('div');
      modal.classList.add('modal-container');


      modal.innerHTML = `
      <div class="modal">
        <div class="modalButton">
        
          <div class="closeButton" id="closeButton">✖</div>
        </div>


        <div class="modal_header">
          <p class="modal_p">¿Pantalla Pequeña? Agrega tu respuesta aquí:</p>
          <div class="modal_question"></div>
        </div>
      </div>
    `;



      container.appendChild(modal);

      const closeButton = modal.querySelector('#closeButton');
      const modalReference = modal;

      const closeModal = (event) => {
        if (event.target === closeButton || event.key === 'Escape') {
          if (modalReference.style.display === "none") return
          modalReference.style.display = 'none';
          this.modal.modal_question.removeChild(this.modal.modal_question.firstElementChild)
        }
      };

      document.addEventListener('click', closeModal);
      document.addEventListener('keydown', closeModal);

      this.modal = modal;
      this.modal.modal_question = this.modal?.querySelector(".modal_question")
      this.modal.closeButton = closeButton
    } else {
      this.modal = modalContainer;
    }
  }
  updateValor(value) {
    this.isChanged = value;
  }
  fillTheModal(inputDisplay, def) {

    if (inputDisplay.tagName == "MATH-FIELD") {
      inputDisplay.addEventListener("click", (e) => this.displayModal(e, def))
    }
  }
  displayModal(e, def) {
    def.validateStatus = false
    if (this.modal.display === "none") return;

    if (screen.width < 400) {
      this.mathfield = e.target;
      let mathClone = this.mathfield.cloneNode(true);

      this.mathFieldEvents(mathClone);

      mathClone.id = "mathClone";
      mathClone.className = "";
      mathClone.classList.add("maxWidth", "mathBig", "mathfield");

      mathClone.addEventListener('input', () => {
        this.mathfield.setValue(mathClone.value)
      });

      this.modal.style.display = "flex";
      this.modal.modal_question.appendChild(mathClone);

      setTimeout(() => {
        mathClone.focus();
      }, 30);
    }

  }
  ShowAlertForm(form, message) {
    if (!this.alertBox) {
      this.alertBox = this.showCustomAlert(form, message);
    } else {
      // Si el cuadro de alerta existe, simplemente hazlo visible
      this.alertBox.classList.add("visible");
      this.alertBox.Time = setTimeout(() => {
        if (this.alertBox.parentNode) {
          this.alertBox.closeAlert() // Eliminar del DOM
        }
      }, 2000); // Coincidir con la duración de la transición CSS
      form.appendChild(this.alertBox)
    }
  }
  showCustomAlert(form, message = { value: 'Debes selecciónar un campo para continuar' }) {
    const { value, style } = message ?? {}
    // if (!this.alertBox) {

    const alertBox = document.createElement("div");
    alertBox.id = "customAlert";
    alertBox.className = `${style?.alertBox ?? "alertCustomRaiting"}`; // Nombre de clase por defecto

    const alertMessage = document.createElement("span");
    alertMessage.id = "alertMessage";
    alertMessage.textContent = value; // Establecer el texto del mensaje aquí

    const closeButton = document.createElement("button");
    closeButton.className = `${style?.closeButton ?? "alertCustomClosedBtn"}`; // Nombre de clase por defecto

    // funcionalidad de cerrado de la alerta
    alertBox.closeAlert = () => {
      if (alertBox) {
        alertBox.classList.remove("visible"); // Eliminar clase visible para el efecto de desvanecimiento
        alertBox.parentNode.removeChild(alertBox); // Eliminar del DOM
        form.sendActive = false; // Actualizar estado del formulario
        clearTimeout(alertBox.time) // Detener el el tiempo para eliminar el modal por defecto
      }
    }



    alertBox.appendChild(alertMessage);
    alertBox.appendChild(closeButton);
    alertBox.classList.add("visible");

    closeButton.addEventListener("click", () => {
      alertBox.closeAlert();
    });



    form.appendChild(alertBox);

    alertBox.Time = setTimeout(() => {
      if (alertBox.parentNode) {
        alertBox.closeAlert() // Eliminar del DOM
      }
    }, 2500); // Coincidir con la duración de la transición CSS

    alertBox

    return alertBox


  }
  createAlertInteraction(artifactInstance = null) {

    if (!artifactInstance.htmlNode) return console.error("la instancia del artefacto no esta definida")

    const template = `
      <div class="bigContentAlert">
        <div class="new-message-box">
          <div class="info-tab tip-icon-warning" title="error"></div>
          <div class="new-message-box-warning">
            <div class="tip-box-warning">
            </div>
          </div>
        </div>
      </div>
    `;

    const baseAlert = document.createElement("div");
    baseAlert.innerHTML = template;
    const alertParent = baseAlert.querySelector('.new-message-box-warning')
    const iconBox = baseAlert.querySelector(".info-tab")
    const contentMessage = baseAlert.querySelector(".tip-box-warning")


    const alertManager = baseAlert
    alertManager.alertParent = alertParent
    alertManager.iconBox = iconBox
    alertManager.open = false
    alertManager.remainingTime = 0
    alertManager.intervalId = null
    alertManager.contentMessage = contentMessage
    alertManager.style.display = "none"


    alertManager.closed = () => {

      artifactInstance.htmlNode.removeEventListener("mouseup", clickClosed);

      alertManager.iconBox.classList.remove('showIconBox');
      alertManager.alertParent.classList.remove('showAlertInteraction');
      alertManager.alertParent.classList.add('hideAlertInteraction');
      alertManager.iconBox.classList.add('hideIconBox');




      if (alertManager.intervalId) {
        clearInterval(alertManager.intervalId);
        alertManager.intervalId = null;
      }

      alertManager.time = setTimeout(() => {
        alertManager.style.display = "none"
        alertParent.style.display = "none"
        alertManager.open = false
      }, 1000);

    }

    function clickClosed(params) {
      if (alertManager.open) {
        alertManager.closed();
      }
    }
    alertManager.Open = (params = {}) => {
      const { message, style } = params
      if (!alertManager.open) {
        clearTimeout(alertManager.time)

        alertManager.startTime = Date.now()
        alertManager.style.display = "flex"
        alertParent.style.display = "flex"
        alertManager.open = true

        alertManager.alertParent.classList.remove('hideAlertInteraction');
        alertManager.iconBox.classList.remove('hideIconBox');
        alertManager.iconBox.classList.add('showIconBox');
        alertManager.alertParent.classList.add('showAlertInteraction');
        alertManager.contentMessage.className = `${style?.contentMessage ?? ""} ${alertManager.contentMessage.className}`
        alertManager.contentMessage.innerHTML = message ?? "Algo salio al mal por favor verifique su conexion a internet y vuelva a intentarlo"
        alertManager.iconBox.className = `${style?.iconBox ?? ""} ${alertManager.iconBox.className}`



        alertManager.intervalId = setInterval(() => {
          if (alertManager.open) {
            alertManager.remainingTime = Math.abs(alertManager.remainingTime - (Date.now() - alertManager.startTime));
            if (alertManager.remainingTime >= 2000) {
              clearInterval(alertManager.intervalId);
              alertManager.intervalId = null;
              alertManager.closed()
            }
          }
        }, 100);

        clearTimeout(alertManager.mouseUpTimeout);
        alertManager.mouseUpTimeout = setTimeout(() => {
          artifactInstance.htmlNode.addEventListener("mouseup", clickClosed);
        }, 1000);
      }

    }


    setTimeout(() => {

      alertManager.addEventListener("mouseenter", () => {
        if (alertManager.open) {
          if (alertManager.intervalId) {
            clearInterval(alertManager.intervalId);
            alertManager.intervalId = null;
          }
        }
      })
    }, 1000);

    alertManager.addEventListener('mouseleave', () => {
      clearTimeout(alertManager.timeLeave);
      alertManager.timeLeave = setTimeout(() => {
        alertManager.closed();
      }, 1000);
    });







    artifactInstance.htmlNode.appendChild(alertManager)
    artifactInstance.alertManager = alertManager
    return alertManager;

  }


};