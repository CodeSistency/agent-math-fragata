class UX {
  constructor() {
    this.timerAlertClose = 3000;
    this.timeoutId = null;
    this.alert = null;
  }

  // Closes the alert with animation
  closeAlert() {
    if (!this.alert) {
      return;
    }
    this.alert.style.animation = 'close .5s ease-in-out 0s 1 normal forwards';
    clearTimeout(this.timeoutId); // Clear timeout when alert is closed
  }

  // Opens the alert with animation and sets a timeout to close it
  openAlert() {
    if (!this.alert) {
      return;
    }
    this.alert.style.animation = 'open .5s ease-in-out 0s 1 normal forwards';
    this.timeoutId = setTimeout(() => this.closeAlert(), this.timerAlertClose); // Start a new timeout each time the alert opens
  }

  // Creates and displays an alert based on the data status
  gAlerts({ data }) {
    this.baseHtml = document.querySelector('.containerBasePage');
    if (!this.baseHtml.parentElement.querySelector('.alert')) {
      this.baseHtml.insertAdjacentHTML('afterend', this.getAlertTemplate());
    }

    this.alert = document.querySelector('.alert');
    const messageText = this.alert.querySelector('.alert-message');
    const close = this.alert.lastElementChild;

    this.openAlert(); // Call to open the alert

    this.updateAlertStatus(data.status, messageText);
    console.log({ metod: this.closeAlert });
    close.addEventListener('click', () => this.closeAlert());
  }

  // Returns the HTML template for the alert
  getAlertTemplate() {
    return `
      <div class="alert alert-success">
        <p class="alert-message"></p>
        <span class="alert-close"></span>
      </div>`;
  }

  /*  Updates the alert's status and message based on the provided status */

  updateAlertStatus(status, message) {
    const statusClasses = [
      'alert-success',
      'alert-danger',
      'alert-error',
      'alert-send',
    ];
    console.log({ status });
    // Remove existing status classes
    this.alert.classList.remove(...statusClasses);

    switch (status) {
      case 1:
        this.alert.classList.add('alert-success');
        message.innerText = '¡Exelente!';
        break;
      case 2:
        this.alert.classList.add('alert-error');
        message.innerText = 'Interactua de nuevo';
        break;
      case 3:
        this.alert.classList.add('alert-danger');
        message.innerText = '¡Tienes que interactuar con el artefacto!';
        break;
      case 4:
        this.alert.classList.add('alert-send');
        message.innerText = '¡Enviado correctamente!';
        break;
      default:
        message.innerText = '¡Tienes que interactuar con el artefacto!';
        break;
    }
  }

  // Creates a help button and its associated functionality
  createHelpButton() {
    const helpButtonHtml = this.getHelpButtonTemplate();
    const btnBase = this.htmlNode.querySelector('.btn-base');

    btnBase.insertAdjacentHTML('afterbegin', helpButtonHtml);

    this.helpButton = this.htmlNode.querySelector('.helpButton');
    this.emergenteWindow = this.htmlNode.querySelector('.emergenteWindow');

    const buttonClosed = this.htmlNode.querySelector(
      '.buttonClosedEmergentWindow',
    );

    document.addEventListener('DOMContentLoaded', () => {
      const auxiliarP = document.querySelector('.auxiliar');

      // Initialize display states
      this.initializeDisplayStates();

      if (!this.helpButton.displayEmergentWindow) {
        this.helpButton.addEventListener('click', () => {
          this.showEmergentWindow(auxiliarP);
        });
      }

      buttonClosed.addEventListener('click', () => {
        this.closeEmergentWindow(auxiliarP);
      });
    });
  }

  // Returns the HTML template for the help button
  getHelpButtonTemplate() {
    return `
      <button class="helpButton styleBtn buttonKey"></button>
      <div class="emergenteWindow">
        <span class="buttonClosedEmergentWindow alert-close"></span>
        <div class="emergentWindowContentText">
          <svg class="IconMente"></svg>  
          <p class="aliniear-derecha">${this.def.helpArtifact.message}</p>
        </div>
        <div class="lineFondo">
          <div class="lineProcess"></div>
        </div>
      </div>`;
  }

  // Initializes display states for elements
  initializeDisplayStates() {
    this.line.displayEmergentWindow = false;
    this.helpButton.displayEmergentWindow = false;
  }

  // Shows the emergent window and updates opacities
  showEmergentWindow(auxiliarP) {
    auxiliarP.style.opacity = '0.2';
    this.htmlNode.parentElement.style.opacity = '0.2';

    // Show emergent window with animation
    this.emergenteWindow.style.animation =
      'deployWindoworExercise .5s ease-out forwards';

    // Update display states
    this.updateDisplayStates(true);

    setTimeout(() => {
      if (this.emergenteWindow) {
        this.htmlNode.parentElement.style.opacity = '1';

        // Close emergent window after a delay
        setTimeout(() => {
          if (this.line.displayEmergentWindow) {
            this.closeEmergentWindow(auxiliarP);
          }
        }, 5800);

        // Animate line growth
        setTimeout(() => {
          this.emergenteWindow.querySelector('.lineProcess').style.animation =
            'growLine 5s ease-out forwards';
        }, 1000);
      }
    }, 1000);
  }

  // Closes the emergent window and restores opacities
  closeEmergentWindow(auxiliarP) {
    this.emergenteWindow.style.animation =
      'closedWindoworExercise .5s ease-out forwards';

    auxiliarP.style.opacity = '1';

    // Animate line shrinkage
    this.emergenteWindow.querySelector('.lineProcess').style.animation =
      'shrinkline .1s ease-out forwards';

    // Update display states
    this.updateDisplayStates(false);

    console.log(clearTimeout(this.time));
  }

  // Updates display states for elements based on visibility
  updateDisplayStates(isVisible) {
    this.helpButton.displayEmergentWindow = isVisible;
    this.line.displayEmergentWindow = isVisible;
    this.emergenteWindow.displayEmergentWindow = isVisible;
  }
}
