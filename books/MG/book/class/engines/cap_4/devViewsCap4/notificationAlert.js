class NotificationAlert {
  constructor(htmlnode) {
    this.htmlnode = htmlnode; //html del artefacto
    this.id = null;
    this.size = 15;
    this.timer = 4;
    this.alert = null;
    this.timeout = null; 
    this.initializeAlert();
  }
  initializeAlert() {
    this.alert = document.createElement('div');   //Creando elemento div de la alerta
    this.alert.classList.add(
      'alert_color',
    );
    this.alert.setAttribute('data-alert', 'false')
    this.htmlnode.appendChild(this.alert);
  }

    
  showAlert() { // mostrar la alerta
    if(!this.htmlnode){
      console.log('No tiene el nodo html');
      return
    }
    this.alert.setAttribute('data-alert', 'true')   //Agregando atribute data-alert en true para que se muestre notificacion encondida
    //const board = document.querySelector('#' + this.htmlnode.id);
  }

  createSuccessAlert(message) {  //Alerta cuando respuesta es correcta 
    this.alert.classList.remove('errorNotification', 'infoNotification')
    this.alert.classList.add('successNotification')
    this.alert.textContent = message   //
    this.showAlert()
    this.removeAlert('successNotification')

  }

  createErrorAlert(message) { //Alerta cuando respuesta es Incorrecta 
    this.alert.classList.remove('successNotification', 'infoNotification')
    this.alert.classList.add('errorNotification')
    this.alert.textContent = message
    this.showAlert()
    this.removeAlert('errorNotification')

  }

  createWarningAlert(message) { //Alerta de advertencia
    this.alert.classList.remove('successNotification', 'errorNotification') 
    this.alert.classList.add('infoNotification')
    this.alert.textContent = message
    this.showAlert()
    this.removeAlert('infoNotification')
  }

  removeAlert(type) {
    let actualTime = 0;
    const self = this
    if (this.timeout) {
      clearInterval(this.timeout)
    }
    this.timeout = setInterval(function () {
      actualTime++
      if (actualTime === self.timer) {               //Si es contador es igual a timer (variable definida), entra dentro de la condicional y remueve las clase de css 
        actualTime = 0
        self.alert.classList.remove(type)
        self.alert.setAttribute('data-alert', 'false')  //Atributo data-alert en false para que se oculte alerta
        clearInterval(self.timeout)
      }
    }, 1000)
  }

  removeAll(){
    if (this.timeout) {
      clearInterval(this.timeout)
    }
    this.alert.setAttribute('data-alert', 'false')
  }
}

// const element = document.querySelector("#artifact_1")
// const alertNotification = new NotificationAlert(element);
