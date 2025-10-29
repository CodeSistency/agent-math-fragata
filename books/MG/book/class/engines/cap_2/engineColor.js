class MyArtifact extends EngineMaker {
  constructor(definition) {
    super(definition);
    this.conditions = definition.conditions;
    this.allStripes = [];
    this.selectStripes = [];
    this.allPoints = [];
    this.allPointsCreated = [];
    this.numberArtifact = null;
    this.choseBtns = [];
    this.objectsToValidateCurve = [];
    this.zonesToValidate = [];
    this.oldValidation = [];
    this.currentBtnColor = null;
    this.allZoneToValidate = [];
    this.allZoneResponse = [];
    this.notificationActive = false;
    this.artifactSuccess = null;
    this.auxResults = [];
    this.results = [];
    this.isChange = false;
    this.history = [];
    this.correct = 0;
    this.incorrect = 0;
    this.numberQuestion = 0;
    this.curves = [];
    this.textCoord = null;
    this.notification = null;
  }

  initArtifact() {
    super.initArtifact();

    this.setFunctionBtnChose();
    this.setFunctionBtnMove();
    this.eventBoard(false);
    const opacity = 0.6;
    const stripes = [
      {
        zone: -1,
        color: '#74c365',
        opacity
      },
      {
        zone: -2,
        color: '#d6b994',
        opacity
      },
      {
        zone: -3,
        range: { top: 0.99, bottom: 0.6 },
        color: '#87cefa',
        opacity
      },
      {
        zone: -4,
        range: { top: 1.69, bottom: 1 },
        color: '#318ce7',
        opacity
      },
      {
        zone: -5,

        color: '#bf5700',
        opacity
      },
      {
        zone: -6,
        color: '#138808',

        opacity
      },
      {
        zone: 1,
        color: '#74c365',
        opacity
      },
      {
        zone: 2,
        color: '#d6b994',
        opacity
      },
      {
        zone: 3,
        range: { top: 0.99, bottom: 0.6 },
        color: '#87cefa',
        opacity
      },
      {
        zone: 4,
        range: { top: 1.69, bottom: 1 },
        color: '#318ce7',
        opacity
      },
      {
        zone: 5,

        color: '#bf5700',
        opacity
      },
      {
        zone: 6,
        color: '#138808',

        opacity
      },
    ];

    if (this.definition.showStripes) {
      //crea las franjas de colores
      this.createStripes(stripes);
    }

    if (this.definition.conditions.inverseCurve) {
      //utilizado para colocar los puntos desde la definicion
      this.createPointsToValidate();
      this.setZoneInfoOfPoint();
    }

    this.node
      .querySelector('.artifactColor__Board')
      .addEventListener('click', () => {
        this.cleanNotification();
      });

    if (this.definition.conditions?.zones) {
      this.zonesToValidate = this.definition.conditions.zones;
      this.numberQuestion = this.zonesToValidate.length;
    }
  }

  eventBoard(mode, p) {

    this.textCoord = this.boardObject.create('text', [0, this.boardObject.attr.boundingbox[1] - 0.5, ''], {
      anchorY: 'middle',
      anchorX: 'middle',
      digits: 1,
      fixed: true,
      visible: mode,
      fillColor: '#cccccc',
      cssstyle: 'background-color:#fff;padding:5px;border-radius:1rem;font-weight:400',
      fontSize: 18,
      intl: {
        enabled: false,
        options: {
          style: 'unit',
          unit: 'celsius'
        }
      }
    });
  }

  showAndHiddeText(mode, p) {
    this.textCoord.setAttribute({ visible: mode, });
    this.textCoord.setText(`(${p.X().toFixed(1) + ',' + p.Y().toFixed(1)})`);
  }

  createStripes(stripes) {
    stripes.forEach((stripe, i) => {
      const [left, , right] = this.boardObject.attr.boundingbox; //el espacio sin nada es porque esto copia por posicion
      const { zone, color, opacity } = stripe;
      const range = this.getCoordOfZones(zone);

      const polygon = gPolygon({
        board: this.boardObject,
        polygons: [
          {
            points: [
              [left, range.top],
              [left, range.bottom],
              [right, range.bottom],
              [right, range.top],
            ],
            styles: {
              fillColor: color,
              withLines: false,
              opacity,
            },
          },
        ],
      });

      const data = {
        idElement: i,
        polygonObject: polygon[0],
        range,
        color,
        points: [],
        isValidate: false,

        originalZone: zone,
        mirrorZone: this.getMirrorZone(zone),
        pointsCreated: [],
        visible: true,

        border: function () {
          polygon[0].setAttribute({ withLines: true });
        },
        objectsToValidate: [],
      };

      this.allStripes.push(data);

      this.addStripeToMenu(data);
    });
  }

  createPointsToValidate() {
    this.definition.conditions.inverseCurve.forEach((curve, i) => {
      curve.allStripes = curve.allStripes ?? [];

      curve.points = curve.points ?? [];
      curve.idObject = `inverse_${i}`;

      const pointObject = curve.points.map((point) => {
        const visible = point[2] ?? true;
        return {
          x: point[0],
          y: point[1],
          visible: true,
          fixed: true,
          visible,
          size: 2.3,
          color: '#893101',
          interactive: true,
          callback: () => { }
        };
      });

      const pointResult = gAllPointsDefault({
        points: pointObject,
        board: this.boardObject,
        interactive: true,
        callback: () => { },
      });

      pointResult.forEach(p => {
        p.on('down', () => { this.showAndHiddeText(true, p), console.clear(); });
        p.on('up', () => {
          this.showAndHiddeText(false, p);
        });

      });

      this.allPoints = [...pointResult, ...this.allPoints];
      curve.pointsObject = pointResult;
      curve.isValidate = false;
      curve.statusValidate = null;
      curve.zones = curve.zones ?? [];
      //const allZones = curve.zones.map(item => item)
      curve.zones.forEach((item) => {
        this.allZoneToValidate.push(item);
        const x = this.seachStripeForParam('originalZone', item[0]);
        curve.allStripes.push(
          this.seachStripeForParam('originalZone', item[0])
        );
      });
    });
  }

  /**
   * Devuelve la coordenada de la zona que se le pasa como parametro
   * @param {*} zone un numero del 1 al 6
   * @returns un objeto con el rango que corresponde a la zona
   */
  getCoordOfZones(zone) {
    switch (zone) {
      case -1:
        return { top: -0.01, bottom: -0.299 };
      case -2:
        return { top: -0.3, bottom: -0.5999 };
      case -3:
        return { top: -0.6, bottom: -0.99 };
      case -4:
        return { top: -1, bottom: -1.699 };
      case -5:
        return { top: -1.7, bottom: -3.599 };
      case -6:
        return { top: -3.6, bottom: -20 };
      case 1:
        return { top: 0.299, bottom: 0.01 };

      case 2:
        return { top: 0.599, bottom: 0.3 };

      case 3:
        return { top: 0.99, bottom: 0.6 };

      case 4:
        return { top: 1.699, bottom: 1 };

      case 5:
        return { top: 3.599, bottom: 1.7 };

      case 6:
        return { top: 20, bottom: 3.6 };

      default:
        break;
    }
  }

  /**
   * devuelve las zonas espejos
   * @param {*} zone zona de la franja
   * @returns un numero del 1 al 6
   */
  getMirrorZone(zone) {
    switch (zone) {
      case 1:
        return 6;
      case 2:
        return 5;
      case 3:
        return 4;
      case 4:
        return 3;
      case 5:
        return 2;
      case 6:
        return 1;
      case -1:
        return -6;
      case -2:
        return -5;
      case -3:
        return -4;
      case -4:
        return -3;
      case -5:
        return -2;
      case -6:
        return -1;
      default:
        return null;
    }
  }

  getZoneWithCoord(coordY) {
    if (coordY >= 0.01 && coordY <= 0.299) {
      return 1;
    } else if (coordY >= 0.3 && coordY <= 0.599) {
      return 2;
    } else if (coordY >= 0.6 && coordY <= 0.99) {
      return 3;
    } else if (coordY >= 1 && coordY <= 1.699) {
      return 4;
    } else if (coordY >= 1.7 && coordY <= 3.599) {
      return 5;
    } else if (coordY > 3.6) {
      return 6;
    } else if (coordY <= -0.01 && coordY >= -0.299) {
      return -1;
    } else if (coordY <= -0.3 && coordY >= -0.599) {
      return -2;
    } else if (coordY <= -0.6 && coordY >= -0.99) {
      return -3;
    } else if (coordY <= -1 && coordY >= -1.699) {
      return -4;
    } else if (coordY <= -1.7 && coordY >= -3.599) {
      return -5;
    } else if (coordY < 3.6) {
      return 6;
    }
  }

  getPointCreatedByStripe() { }

  /**
   * Funcion para agregar cuadrito al menu y darle los eventos necesarios
   * @param {} param el objeto de las franjas
   */
  addStripeToMenu(params) {
    const { range, color, idElement, visible } = params;
    if (!visible) return;
    const newColorToMenu = document.createElement('div');
    const positionMenu =
      range.top > 0 && range.bottom >= 0 ? 'positive' : 'negative';
    const container = this.node.querySelector(
      `.artifactColor__menuColors[data-position=${positionMenu}]`
    );

    newColorToMenu.classList.add('artifactColor__MenuColorOption');
    newColorToMenu.style.backgroundColor =
      params.polygonObject.visProp.fillcolor;
    newColorToMenu.setAttribute('data-stripe', `${idElement}`);
    newColorToMenu.setAttribute('data-position', `${positionMenu}`);

    newColorToMenu.addEventListener('click', (e) => {
      this.closeMenu();

      if (this.currentBtnColor) {
        //para deseleccionar los puntos previos
        const selectStripe = this.currentBtnColor.dataset.select;
        const stripeFind = this.seachStripeForParam('idElement', selectStripe);
        if (stripeFind != null) this.cleanPoints(stripeFind?.points);
      }

      this.previousPositionOfSelect = positionMenu;
      this.currentBtnColor.setAttribute('data-positionselect', positionMenu);

      if (this.currentBtnColor.id == 'btnChose-0')
        this.selectPoints(params.points);

      this.currentBtnColor.style.backgroundColor =
        params.polygonObject.visProp.fillcolor; //color del cuadro del menú
      this.currentBtnColor.dataset.select = idElement; //setea el btn con el id
    });

    container.appendChild(newColorToMenu);
  }
  //#77afe0
  //#3cb043


  selectPoints(points) {
    points.forEach((point) => {
      if (point.Y() != 1 && point.Y() != -1)
        point.setAttribute({
          face: 'o',
          strokeColor: '#fff',
          size: 4,
          strokeWidth: 2,
          fillColor: '#0098db',
        });
    });
    return null;
  }

  cleanPoints(all = true) {
    const allPoints = all === true ? this.allPoints : all;

    allPoints.forEach((point) => {
      point.setAttribute({
        face: 'o',
        strokeColor: 'none',
        size: 3,
        color: '#893101',
      });
    });
  }

  /**
   * metodo de crear notificaciones
   * @param {string} type escoge entre: info,success,error
   * @param {string} msg mensaje que se muestra
   */
  showNotification(type = 'info', msg = 'Por el derecho a comprender') {

    this.notification = this.node.querySelector(
      '.artifactColor__notification'
    );

    if (this.notification.classList.contains('successNotification')) {
      this.cleanNotification(true);
    }

    this.notification.dataset.show = true;

    this.notification.classList.add(`${type.toLocaleLowerCase()}Notification`);

    if (!this.notification.classList.contains('successNotification')) {
      setTimeout((e) => {
        this.cleanNotification();
      }, 2000);
    }
    this.notification.textContent = msg;
  }

  cleanNotification(success = false, notificationNode) {
    if (!this.notification) this.notification = this.node.querySelector(
      '.artifactColor__notification'
    );

    this.notification.classList.remove('errorNotification');
    this.notification.classList.remove('infoNotification');


    this.notification.style.transition = 'none';
    this.notification.classList.remove('successNotification');


    /* 
    if (success) {
      notification.style.transition = 'none';
      notification.classList.remove('successNotification');
    }

    if( notification.classList.contains('successNotification')){
      notification.dataset.show = 'true';
    }

    const interval = setInterval(e => {

      if (!this.notificationActive) {
        notification.style.transition = 'none';
        notification.classList.remove('errorNotification');
        notification.classList.remove('infoNotification');
        clearInterval(interval);
      }

    }, 100);
 */
  }

  /**
   * Funcion para cerrar el menu
   */
  closeMenu() {
    this.node
      .querySelector('.artifactColor__menu')
      .classList.remove('artifactColor__menu--open');
  }

  /**
   * Funcion para abrir el menu
   */
  openMenu() {
    this.node
      .querySelector('.artifactColor__menu')
      .classList.add('artifactColor__menu--open');
  }

  /**
   * Funcion para vaciar el menu
   */
  clearMenu() {
    const positions = ['positive', 'negative'];

    positions.forEach((positionMenu) => {
      const container = this.node.querySelector(
        `.artifactColor__menuColors[data-position=${positionMenu}]`
      );
      container.textContent = '';
    });
  }

  /**
   * Identifica la franja a la cual pertenece el punto
   * @param {objectPoint} point objeto punto jsxGraph
   * @returns retorna un array con las franjas encontradas
   */
  seachZone(point) {
    const stripe = this.allStripes.filter((stripe) => {
      return (
        (point.Y() > stripe.range.bottom || point.Y() == stripe.range.bottom) &&
        (point.Y() < stripe.range.top || point.Y() == stripe.range.top)
      );
    });
    return stripe;
  }

  /**
   * Funcion para agregar los puntos a la franja a la que pertenecen
   */
  setZoneInfoOfPoint() {
    this.allPoints.forEach((point) => {
      const stripe = this.seachZone(point);
      if (!stripe.length) return;

      stripe[0].points.push(point);
      const diferenceBottom = point.Y() - stripe[0].range.bottom;
      const diferenceTop = stripe[0].range.top - point.Y();

      point.zone = this.getZoneWithCoord(point.Y());
      point.diferenceWithTheBottom = diferenceBottom;
      point.diferenceWithTheTop = diferenceTop;
    });

    //console.log(this.allPoints);
  }

  /**
   * Funcion para agregar eventos y logica al menu para seleccionar el color
   */
  setFunctionBtnChose() {
    this.choseBtnsContainer = this.node.querySelector('.choseColors__elements');

    //btn to close
    this.node
      .querySelector('.arrowToClose')
      .addEventListener('click', () =>
        this.node
          .querySelector('.artifactColor__menu')
          .classList.remove('artifactColor__menu--open')
      );
    //code to select btn
    this.choseBtnsContainer.addEventListener('click', (e) => {

      const otherBtn = this.node.querySelector(
        '.choseColors__select[data-status = "active"]'
      );

      if (e.target.classList.contains('choseColors__select')) {
        this.openMenu();
      }
      otherBtn ? (otherBtn.dataset.status = 'inactive') : null;
      e.target.dataset.status =
        e.target.dataset.status == 'inactive' ? 'active' : 'inactive';
      this.currentBtnColor =
        e.target.dataset.status == 'active' &&
          e.target.classList.contains('choseColors__select')
          ? e.target
          : this.currentBtnColor;
    });

    this.choseBtns = this.node.querySelectorAll('.choseColors__select');
    this.choseBtns.forEach((btn) =>
      btn.addEventListener('blur', () => {
        btn.dataset.status = 'inactive';
      })
    );
  }

  /**
   * Funcion para agregar evento al boton de mover
   */
  setFunctionBtnMove() {
    this.btnChose = this.node.querySelector('.btnChangePosition');
    this.btnChose.addEventListener('click', () => {
      this.isChange = true;

      const stripeSelectValues = [
        this.choseBtns[0].dataset.select,
        this.choseBtns[1].dataset.select,
      ]; //ids de  colores seleccionados
      const stripeSelectObjects = [
        this.seachStripe(stripeSelectValues[0]),
        this.seachStripe(stripeSelectValues[1]),
      ]; //objetos que contiene las franjas seleccionadas

      const object1 =
        this.seachObjectsWithZone(stripeSelectObjects[0]?.originalZone) || null;
      const object2 =
        this.seachObjectsWithZone(stripeSelectObjects[1]?.originalZone) || null;

      const objectOfValidation = [...object1, ...object2];
      const valueNull = stripeSelectObjects.includes(null);

      if (this.notification
      ) this.cleanNotification();

      if (valueNull && this.artifactSuccess != true) {
        this.showNotification('info', 'Debe seleccionar dos colores');
        return;
      }
      this.deleteCurves();

      this.switchStripe(
        stripeSelectObjects[0],
        stripeSelectObjects[1],
        objectOfValidation
      );
    });
  }

  seachObjectsWithZone(zone) {
    if (zone == null) return [];
    const matchObject = [];

    this.objectsToValidateCurve.forEach((object) => {
      const match = object.allStripes.findIndex(
        (stripe) => stripe?.originalZone === zone
      );
      if (match != -1) matchObject.push(object);
    });
    return matchObject;
  }

  /**
   * Busqueda de franjas usando un id
   * @param {*} id
   * @returns
   */
  seachStripe(id) {
    const stripe = this.allStripes.filter((stripe) => stripe.idElement == id);
    return stripe[0] || null;
  }
  /**
   * Busqueda de franja mediante cualquier parametro
   * @param {*} key
   * @param {*} value
   * @returns
   */
  seachStripeForParam(key, value) {
    const stripe = this.allStripes.filter((stripe) => stripe[key] == value);
    return stripe[0] || null;
  }

  deletePoints(points) {
    const idPointsToRemove = points.map((p, i, array) => {
      this.boardObject.removeObject(p?.convertedPoint);
      return p.convertedPoint.id ?? null;
    });

    this.boardObject.fullUpdate();
    this.refreshArrayCreatePoint({ idPointsToRemove });
    return idPointsToRemove;
  }

  refreshArrayCreatePoint(params) {
    if (!params.idPointsToRemove) return;
    this.allPointsCreated = this.allPointsCreated.filter(
      (p) => !params.idPointsToRemove.includes(p.convertedPoint.id)
    );
    return this.allPointsCreated;
  }


  refreshResult(params) {
    if (!params.stripe) return;

    const isInValidation = this.zonesToValidate.findIndex(zone => zone[0] == params.stripe.originalZone);
    if (isInValidation == -1) return;

    const id = params.stripe.idElement;
    const foundElement = this.auxResults.findIndex(item => item[0] == id);
    foundElement != -1 ? this.auxResults[foundElement][1] = params.response : this.auxResults.push([id, params.response]);

    this.refreshGeneralResults();
    return true;
  }

  refreshGeneralResults() {
    this.correct = 0;
    this.incorrect = 0;

    this.auxResults.forEach(item => {
      item[1] == true ? this.correct += 1 : this.incorrect += 1;
    });

    return;
  }


  saveZoneResponse(stripe1, stripe2) {
    const foundElement = this.allZoneResponse.findIndex(
      (item) => item[0] == stripe1.originalZone
    );
    foundElement != -1
      ? (this.allZoneResponse[foundElement][1] = stripe2.originalZone)
      : this.allZoneResponse.push([stripe1.originalZone, stripe2.originalZone]);
    this.allZoneResponse.sort();
    return foundElement;
  }

  /**
   * Funcion para mover las franjas
   * @param {*} stripe1
   * @param {*} stripe2
   */
  switchStripe(stripe1, stripe2, validationObjects) {
    const stripeObjectA = stripe1.polygonObject;
    const stripeObjectB = stripe2.polygonObject;
    const pointStripe1 = stripe1.points;

    this.cleanPoints(pointStripe1);
    const idPointsToRemove = this.deletePoints(stripe1.pointsCreated);

    const inversePointsCreated =
      stripe1.mirrorZone === stripe2.originalZone
        ? this.createInversePoints(pointStripe1, stripe1)
        : this.traslatePoints(pointStripe1, stripeObjectB.inherits[0][1].Y(), stripe1);

    this.saveZoneResponse(stripe1, stripe2);
    stripe1.pointsCreated = [...inversePointsCreated];


    if (inversePointsCreated.length)
      this.history.push({
        stripe: stripe1,
        convertePoints: inversePointsCreated,
      });
    this.resetBtns();

    return true;
  }

  /**
   * Funcion para trasladar puntos
   * @param {*} points
   * @param {*} valueBottom
   */
  traslatePoints(points, valueBottom, stripe) {
    let elementTraslate = [];
    let info = false;

    this.refreshResult({ response: false, stripe });

    const traslatePointsArray = points.map((point) => {
      point.isValid = false;


      //point.moveTo([point.X(), valueBottom + point.diferenceWithTheBottom]);

      const p = this.boardObject.create(
        'point',
        [
          point.X(),
          valueBottom +
          point[
          point.Y() < 0 ? 'diferenceWithTheTop' : 'diferenceWithTheBottom'
          ],
        ],
        {
          strokeColor: '#fff',
          size: 3,
          strokeWidth: 2,
          fillColor: 'purple',
          name: '',
          fixed: true,
          visible: point.visProp.visible
        }
      );

      if (p.Y() > this.boardObject.attr.boundingbox[1] || p.Y() < this.boardObject.attr.boundingbox[3]) info = true;


      p.isValid = false;
      p.createByUser = true;
      this.allPointsCreated.push({ convertedPoint: p, originalPoint: point });
      return { convertedPoint: p, originalPoint: point };
    });

    return traslatePointsArray;
  }

  /**
   * Función para resetear botones de seleccion
   */
  resetBtns() {
    this.choseBtns.forEach((btn) => {
      btn.setAttribute('data-select', 'null');
      btn.setAttribute('data-status', 'inactive');
      btn.setAttribute('data-positionselect', 'null');
      btn.style.backgroundColor = '#f3f3f3';
    });
  }

  /**
   * Funcion para cambiar la data del menu de colores
   * @param {*} oldValue
   * @param {*} newValue
   */
  switchDataMenu(oldValue, newValue) {
    const elementMenuA = this.node.querySelector(
      `.artifactColor__MenuColorOption[data-stripe = "${oldValue}"]`
    );
    elementMenuA.dataset.stripe = newValue;

    //const elementMenuB = this.node.querySelector(`.artifactColor__MenuColorOption[data-stripe = "${oldValue}"]`)
    //newColorToMenu.setAttribute('data-stripe', `${idElement}`)
  }

  /**
   * Función para cambiar el color de los botones
   */
  switchValueBtn() {
    const a = [this.choseBtns[0], this.choseBtns[0].style.backgroundColor];
    const auxValue = [
      this.choseBtns[0].dataset.select,
      this.choseBtns[0].style.backgroundColor,
    ];
    const b = [this.choseBtns[1], this.choseBtns[1].style.backgroundColor];

    //cambiando los valores
    a[0].dataset.select = b[0].dataset.select;
    b[0].dataset.select = auxValue[0];

    // console.log(b[0].dataset.select);

    //cambiando los colores
    a[0].style.backgroundColor = b[1];
    b[0].style.backgroundColor = auxValue[1];
  }

  /**
   * Función para borrar los puntos de la franja
   */
  clearPointsOfStripe() {
    this.allStripes.forEach((stripe) => {
      if (stripe.points.length) stripe.points = [].map((x) => x);
    });
  }

  /**
   * Funcion para crear los puntos en la posición inversa
   * @param {*} points
   */
  createInversePoints(points = [], stripe) {

    let info = false;
    this.refreshResult({ response: true, stripe });

    const inversePoints = points.map((point) => {


      const coordY = 1 / point.Y();

      if (coordY > this.boardObject.attr.boundingbox[1] || coordY < this.boardObject.attr.boundingbox[3]) info = true;
      const p = this.boardObject.create('point', [point.X(), coordY], {
        strokeColor: '#fff',
        size: 3,
        strokeWidth: 2,
        fillColor: 'purple',
        name: '',
        fixed: true,
        visible: point.visProp.visible
      });
      point.zoneInversePoint = this.getZoneWithCoord(p.Y());
      p.isValid = true;
      p.createByUser = true;

      this.allPointsCreated.push({ convertedPoint: p, originalPoint: point });
      return { convertedPoint: p, originalPoint: point };
    });


    if (info) this.showNotification('info', 'Se crearon puntos fuera del plano');

    this.boardObject.fullUpdate();
    return inversePoints;
  }

  validateZones() {


    const response = this.zonesToValidate.every((zoneToValidate) => {

      let result = false;

      if (!this.allZoneResponse.length) return result;
      //const result = this.allZoneResponse.filter(coord => (zoneToValidate[0] === coord[0] && zoneToValidate[1] === coord[1]) || (zoneToValidate[0] === coord[1] && zoneToValidate[1] === coord[0]));
      result = this.allZoneResponse.some(
        (coord) => {
          return (zoneToValidate[0] === coord[0]) && (zoneToValidate[1] === coord[1]);
        }
      );

      return result;
    });
    return response;
  }

  paintResponsePoints() {
    this.allPointsCreated.forEach(({ convertedPoint }) => {
      this.paintPoints(convertedPoint, convertedPoint.isValid);
    });
  }

  paintPoints(point, isValid) {
    const fillColor = isValid ? '#b6f3bf' : '#ff0000';
    const strokeColor = isValid ? '#000' : '#000';
    point.setAttribute({
      strokeColor,
      size: 3,
      strokeWidth: 2,
      fillColor
    });
  }

  createAllCurves(isValid) {

    if (!isValid) return;
    if (this.curves.length) return;
    this.definition.conditions.inverseCurve.forEach(curve => {
      //curve.points = curve.points.map(p => [p[0],1/p[1]])
      curve.points.sort();
      let pointsCurves = curve.points.sort((a, b) => b[0] - a[0]);
      pointsCurves = curve.points.map(p => [p[0], 1 / p[1]]);
      const c = gCurveDefault({ curves: [{ points: pointsCurves }], board: this.boardObject, interactive: false });

      console.log('>>', c);

      this.curves.push(c[0]);
    });

  }

  /**
   * Funcion creada para validación
   */

  validation() {
    super.validation();
    let resp = [];
    let isEqual = false;
    const curvesPoints = [];

    if (this.definition.conditions.zones) {
      const responseZones = this.validateZones();
      resp.push(responseZones);
    }

    resp = resp.every((item) => item === true);
    this.paintResponsePoints();

    this.showNotification(
      resp ? 'success' : 'error',
      resp ? '¡Excelente!' : 'Revisa tu respuesta'
    );

    this.createAllCurves(resp);

    if (this.isChange) {
      const data = this.cleanData();
      console.log('aqui', data);
      if (typeof window.Android !== 'undefined' && typeof window.Android.sendData === 'function') {
        console.log('-- Mobile version --');
        window.Android.sendData(JSON.stringify(data));
      } else {
        console.log('-- web version --');
        sendData(data);
      }
      this.isChange = false;
    }
  }

  cleanArray(array) {
    if (!array) return;
    array = [].map(x => x);
  }
  deleteCurves() {
    this.curves.forEach((curve) => {
      this.boardObject.removeObject(curve);
    });
    this.curves = [];

  }

  reset() {
    super.reset();
    this.cleanNotification(true);
    this.clearMenu();
    this.resetBtns();

    this.allStripes.forEach((stripe) => {
      stripe.visible = true;
      this.addStripeToMenu(stripe);
    });

    this.objectsToValidateCurve.forEach((curve) => {
      curve.statusValidate = null;
      curve.isValidate = false;
    });

    this.allPointsCreated.forEach((point, i, array) => {
      this.boardObject.removeObject(point.convertedPoint);
    });
    this.deleteCurves();
    this.allPoints.forEach((point) => {
      point.zoneInversePoint = false;
      point.setAttribute({
        face: 'o',
        strokeColor: 'none',
        size: 3,
        color: '#893101',
      });
    });


    this.cleanArray(this.curves);
    this.definition.timeInteraction = 0;
    this.allStripes.forEach((stripe) => (stripe.isValidate = false));
    this.artifactSuccess = null;
    this.allPointsCreated = [];
    this.definition.curves = [[]];
    this.allZoneResponse = [];
    this.objectsToValidateCurve = [];
    this.isChange = false;
    this.correct = 0;
    this.incorrect = 0;
    this.auxResults = [];
  }


  /**
   * Funcion para estructurar la data
   */
  cleanData() {
    const points = this.allPointsCreated.map(p => {

      return { convertedPoints: [p.convertedPoint.X(), p.convertedPoint.Y()], originalPoint: [p.originalPoint.X(), p.originalPoint.Y()] };

    });


    const data = {
      typeArtifact: 'Standard',
      artifact: this.numberArtifact,
      seconds: this.definition.timeInteraction,
      elementArtifact: { points },
    };
    console.log(this.allPointsCreated);
    let correct = this.correct;
    let incorrect = this.incorrect;
    let forAnswer = this.numberQuestion - (this.correct + this.incorrect);

    /* this.definition.conditions.inverseCurve.forEach((curve) => {
      if (curve.statusValidate === null) forAnswer += 1;
      if (curve.statusValidate === true) correct += 1;
      if (curve.statusValidate === false) {
        incorrect += 1;
      }
    });
 */
    data.results = {
      correct,
      incorrect,
      forAnswer,
    };

    return data;
  }
}

//const artifact = new EngineMaker(etwDef['artifact_1'])

function colorInitMain(definitionArtifact, boardDefinition) {
  const template = document.querySelector('#templateExample');
  const fragment = new DocumentFragment();
  const main = document.querySelector('.all');
  let count = 1;

  for (let key in definitionArtifact) {
    const container = document.querySelector(
      `.colorArtifact[data-definition = "${key}"]`
    );
    if (!container) continue;
    const boardSelect = container.dataset.board ?? 'board_0';

    const artifact = new MyArtifact(definitionArtifact[key]);
    const elementTemplate = template.content.firstElementChild.cloneNode(true);
    const idToBoard = `${key}-board`;
    //artifact.setArtifactName(key)
    elementTemplate.id = key;
    artifact.idToBoard = idToBoard;

    elementTemplate.querySelector('.artifactColor__Board').id = idToBoard;
    artifact.setTemplate(elementTemplate);

    container.appendChild(elementTemplate);

    artifact.setBoard(boardDefinition[`${boardSelect}`]);
    artifact.numberArtifact = count;
    artifact.initArtifact();
    count++;
  }
}
