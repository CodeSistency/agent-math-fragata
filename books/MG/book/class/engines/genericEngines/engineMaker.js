/**
 * aun no ejecutado en build
 * @description piloto de clase base de motores
 *  */ 

class EngineMaker{
  constructor(definition = { buttonconditions :{}},){
    this.defaultDefinition = definition
    this.definition = definition
    this.boardDefinition = null
    this.boardObject = null
    this.elementOfBoards= null
    this.idToBoard = 'jxgbox' 
    this.selectorToBtns = '.btn-all' // se trata del contenedor para llamar al contenedor del botion 
    this.node = null //variable que almace
    this.btnValidation = null
    this.btnReset = null
    this.previousPositionOfSelect = null
    this.artifactName = ''
    this.alert = null

  }

  /**
     * Funcion para inicializar los elementos del artefacto se encarga de agregar los elementos generales es necesario adecuarle el button active
     */
  initArtifact(){

    //objeto que contiene lo necesario 
    const infDefault = {
      statementBottomGrid: false,
      statementTopGrid: false,
      statementBottom: false,
      statusInfinity: false,
      statusValidate: false,
      boardReference: null,
      timeInteraction: 0,
      statementTop: false,
      textAlert: null,
      infinity: [],
      buttons: true,
      points: [[]],
      curves: [[]],
      others: [],
      change: false,
      yellow: false,
      debug: false,
      board: 'board_0',
      axieX: [],
      axieY: [],
      flag: false,
      memory: [],
      cote: {
        top: [],
        bottom: [],
        special: [],
      },
      ...this.definition,
      conditions: {
        conexa: { type: 4 },
        positiveNegative: false,
        relativeMaxMIn: false,
        oneTwentySeven: false,
        modCoteSpecial: false,
        modCoteBottom: false,
        modCoteTop: false,
        parallels: false,
        compare: false,
        countsX: false,
        countsY: false,
        eRange: false,
        upDown: false,
        xCote: false,
        cotes: false,
        axieY: false,
        axieX: false,
        rang: false,
        dom: false,
        min: false,
        max: false,
        ...this.definition.conditions,
      },

      dataInteraction: {
        incorrect: 0,
        correct: 0,
        forAnswer: 0
      },

      buttonsActive: {
        infinity: true,
        conect: true,
        pOpen: true,
        pClose: true,
        coteSpecial: false,
        coteTop: false,
        coteDown: false,
        domKey: false,
        rangKey: false,
        ...this.definition.buttonsActive,
      },
    };


    if(this.definition.textOfHelp){  
      this.btnHelpMsg = this.addBtn(['help'])
      gHelpMsg(this.definition,this.node);
    } 

    if(this.definition.buttonsActive){

      if(this.definition?.buttonsActive.curve){
        
        this.addBtn(['curve', 'buttonAux', 'buttonTertiary'])}
    }

    this.addProperties(infDefault) 
    //this.definition = infDefault


  }


  setArtifactName(name){
    this.artifactName = name
  }

  /**
     * Se utiliza para generar board a partir del board de definicion
     * @param {*} boardDefinition 
     */
  setBoard(boardDefinition, idToBoard = this.idToBoard){
    this.boardDefinition = boardDefinition
        
    const {board, resultObj} = gBoard(this.definition, boardDefinition, idToBoard, boardDefinition.style);
       
    this.boardObject = board
    this.elementOfBoards = resultObj
    this.boardObject = board
      
    board.animate({
      duration: 20000,
      delay: 0,
      transition: JXG.Transition
    })
  }
  /**
     * Se utiliza para crear botones
     * @param {*} classes 
     * @param {*} title 
     * @param {*} typeBtn 
     * @returns Retorna el boton
     */
  addBtn(classes = [], selector = this.selectorToBtns, title = '', typeBtn = 'buttonTertiary'){
    
    const newBtn = document.createElement('button')
    const btnContainers = this.node.querySelector(selector)

    if(!btnContainers) {
      
      return null}

    newBtn.classList.add('button-marg')
    newBtn.classList.add(typeBtn)
    newBtn.classList.add('buttonKey')
    newBtn.title = title
    btnContainers.appendChild(newBtn)
    classes.forEach(nameClass => {
      newBtn.classList.add(nameClass)
    })
    return newBtn
    // <button class="pointClose button-marg buttonTertiary buttonKey"
    //title="Punto para la curva"></button>
  }

  /**
     * Recibe el contenido de la plantilla html luego de aplicarle el firstElementChild.cloneNode(true)
     * @param {*} htmlNode  se trata del contenido de la plantilla
     */
  setTemplate(htmlNode){
    this.node = htmlNode
    this.extractBtn()
    this.setValidationFunction()
    this.setResetFunction()

    this.node.addEventListener('mouseenter', () => {
       
      gTime(this.definition, true);
    });

    this.node.addEventListener('mouseleave', () => {
     
      gTime(this.definition, false, false);

    });


    this.node.addEventListener('click', () => {
     
      gTime(this.definition, true);
    });

  }
    
  /**
     * Funcion interna para extraer botones del template
     */
  extractBtn(){
    this.btnValidation = this.node.querySelector('.check')
    this.btnReset = this.node.querySelector('.reset')
  }

  /**
     * Funcion para establecer cual es la funcion de validacion
     * 
     */
  setValidationFunction(){
    if(!this.btnValidation) return
    this.btnValidation.addEventListener('click',()=>this.validation() )
  }
  /**
     * Funcion para establecer cual es la funcion de validacion
     * @returns null
     * 
     */
  setResetFunction(){
    if(!this.btnReset) return
    this.btnReset.addEventListener('click', ()=> this.reset())
  }
  /**
     * Funcion de validación
     */
  validation(){

  }

  /**
     * Función de reset
     */
  reset(){}


  /**
     * recibe como parametro objetos que son agregados al objeto de definicion
     * @param  {...any} properties 
     */
  addProperties(...properties){
    //{}
    
    properties.forEach(property => {
      this.definition = {...this.definition, ...property}
    })
  }

}

//Clase para notificaciones
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

  setHtmlNode(htmlNode){
    this.htmlnode = htmlNode;
    return
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