function getPositionAvailable(def, board, direction) {
  if (['up', 'down'].includes(direction)) {
    def.positionsY = intersection(def, board, def.curvesDefaults, def.lineY, 2);
  } else {
    def.positionsX = intersection(def, board, def.curvesDefaults, def.lineX);
  }
}

function move(def, board, road, direction) {
  if (!def.pointTarget || !def.pointer) {
    return;
  }
  createLineIntersection(def, board);
  getPositionAvailable(def, board, direction);

  const last = def.positions.at(-2);
  const allPoint = ['up', 'down'].includes(direction)
    ? def.positionsY
    : def.positionsX;

  let targeIndex = ['left', 'right'].includes(direction)
    ? def.targeIndex
    : def.targeIndexY;

  if (def.inBorder && ['ejeX', 'ejeY'].includes(road?.at(-2)?.typeCurve)) {
    def.inBorder = false;
  }

  if (['up', 'right'].includes(direction)) {
    targeIndex++;
  } else {
    targeIndex--;
  }
  const targeposition = allPoint?.[targeIndex];



  if (!def?.inBorder && targeposition?.typeCurve == 'border') {
    def.inBorder = true;
  } else if (
    targeIndex == -1 ||
    (def.inBorder && gDist([targeposition.x, targeposition.y], last) > 0.1)
  ) {
    console.log('return');
    return;
  } else {
    def.inBorder = false;
  }

  const move = [targeposition.x, targeposition.y];

  def.pointer.setPositionDirectly(JXG.COORDS_BY_USER, move);

  //almacena la position del punto
  savePosition(def, board, def.pointer, allPoint[targeIndex].typeCurve);
  def.lastDirection = direction;
}

function intersection(def, board, curves, line, flat = 1) {
  let arr = [];
  for (let i = 0; i < curves.length; i++) {
    if (curves[i].useIntersection || curves[i].useIntersection === null || curves[i].typeCurve === 'finishCurve') { continue; };
    for (let j = 0; j < 3; j++) {

      let meet;
      try {
        meet = JXG.Math.Geometry.meetCurveLine(curves[i], line, j, board, true);
      } catch (error) { }
      if (!meet) {
        continue;
      }
      const cords = meet?.usrCoords?.slice(1);

      if (
        !Number.isNaN(meet?.usrCoords?.slice(1)[0]) &&
        ((flat != 1 && gInterPoint(def.pointer.X(), cords[0])) ||
          (flat == 1 && gInterPoint(def.pointer.Y(), cords[1]))) &&
        (cords[0] || cords[0] == 0) &&
        (cords[1] || cords[1] == 0) &&

        !arr.some(
          (p) => gDist(cords, [p.x, p.y]) < 0.01 && !(gDist(cords, def.pointer) < 0.01)
        ) &&
        !(gDist(cords, def.pointer) < 0.01)
      ) {
        const point = {
          x: cords[0],
          y: cords[1],
          typeCurve: curves[i].typeCurve
        };
        arr.push(point);
      }
    }
  }

  const pointerCOrds = def.pointer.coords.usrCoords.slice(1);

  arr.push({ x: pointerCOrds[0], y: pointerCOrds[1], id: def.pointer.id });

  arr.sort((a, b) => {
    if (flat == 1) {
      return a.x - b.x;
    } else {
      return a.y - b.y;
    }
  });

  if (flat == 1) {
    def.targeIndex = arr.findIndex((intersection) => intersection.id === def.pointer.id);
  } else {
    def.targeIndexY = arr.findIndex((intersection) => intersection.id === def.pointer.id);
  }
  return arr;
}

function finishPoint(params, { board, def, clone } = params) {
  const selectRoad = clone.querySelector('.rSelectRoad');

  const color = def.positions[0].visProp.fillcolor;
  addFinish(params);
  def.statusValidate = false;
  def.selectRoad.resetColor();
  def.positions = cleanRoad({ def, road: def.positions });
  def.memory.push({
    element: [...def.positions.slice(1)],
    from: def.roadData[def.positions[0].iMod],
  });

  drawingRoad(def, board);
  def.roadData[def.positions[0].iMod].push([...def.positions]);
  def.other.push(def.roadDrawng);
  def.positions = [];
  def.roadDrawng.setAttribute({ layer: null, strokeColor: color });
  def.roadDrawng = null;
  def.pointTarget = null;
}

function cleanRoad({ def, road }) {
  return road
    .filter((p, i) => {
      p.setAttribute({
        size: function () {
          return !def.pointTarget || def.pointTarget?.iMod != p.iMod ? 2 : 4;
        },
        visible: false,
      });
      return (
        i == 0 ||
        i == road.length - 1 ||
        !(
          (gInterPoint(p?.Y(), road?.[i - 1]?.Y(), 0.01) && !gInterPoint(p?.X(), road?.[i + 1]?.X(), 0.01))
          ||
          (!gInterPoint(p?.Y(), road?.[i - 1]?.Y(), 0.01) && gInterPoint(p?.X(), road?.[i + 1]?.X(), 0.01))
        )
      );
    })
    .map((p) => {
      p.setAttribute({
        size: function () {
          return !def.pointTarget || def.pointTarget?.iMod != p.iMod ? 2 : 4;
        },
        visible: function () {
          if (def.pointTarget && def.pointTarget.iMod != p?.iMod) {
            return (() => def.visible)();
          } else {
            return true;
          }
        },
      });
      return p;
    });
}

function savePosition(def, board, pointer, type) {
  let newPoint = board.create('point', [pointer.X(), pointer.Y()], {
    name: '',
    color: 'black',
  });
  const iMod = def.pointTarget.iMod;
  newPoint.iMod = iMod;
  newPoint.setAttribute({
    fixed: true,
    visible: function () {
      if (def.pointTarget && def.pointTarget.iMod != newPoint?.iMod) {
        return (() => def.visible)();
      } else {
        return true;
      }
    },
    size: function () {
      return !def.pointTarget || def.pointTarget?.iMod != newPoint.iMod ? 2 : 4;
    },
  });
  def.statusValidate = false;
  newPoint.typeCurve = type;
  newPoint.typePoint = 'point';

  if (newPoint) {
    def.positions.push(newPoint);
  }

  const dis = gDist(def.positions?.at(-1), def.positions?.at(-3));

  if (dis != null && dis < 0.1) {
    board.removeObject(def.positions.pop());
    board.removeObject(def.positions.pop());
  }
  drawingRoad(def, board);
}

function drawingRoad(def, board) {
  if (def.roadDrawng) {
    board.removeObject(def.roadDrawng);
  }
  if (!def.pointTarget) { return; };
  //const color = def.positions[0].visProp.fillcolor;

  def.roadDrawng = board.create(
    'cardinalspline',
    [def.positions, 0, 'centripetal'],
    {
      layer: 1000,
      strokeColor: 'red' /* color */,
      strokeWidth: 3,
    }
  );
  const line = def.roadDrawng;
  line.iMod = def.pointTarget.iMod;

  line.setAttribute({
    visible: function () {
      if (def.pointTarget && def.pointTarget.iMod != line?.iMod) {
        return (() => def.visible)();
      } else {
        return true;
      }
    },
    size: 3,
  });
}

function addFinish(params) {
  const { def, board, iMod = 2 } = params;
  const road = params.def.positions;
  if (
    !def?.pointTarget ||
    !road?.at(-1)?.typePoint ||
    road.at(-1)?.typePoint == 'finish'
  ) {
    return;
  }

  const first = road[0];
  const last = road.at(-1);
  let last2 = null;

  if (road.length > 1) {
    last2 = road.at(-2);
  }

  let x, y; //cordenadas donde se creara el punto final
  if (!gInterPoint(last.Y(), first.Y())) {
    //si el primer punto no esta a la misma altura
    if (gInterPoint(last2.X(), last.X(), 0.2)) {
      y = last.Y();
    } else {
      if (!gInterPoint(last2.X(), last.X(), 0.2)) {
        y = first.Y();
      }
    }
  } else {
    y = last.Y();
  }

  if (!gInterPoint(last.X(), first.X())) {
    //si el primer punto no esta a la misma cordenada x
    if (gInterPoint(last2.Y(), last.Y(), 0.05)) {
      x = last.X();
    } else {
      if (!gInterPoint(last2.Y(), last.Y(), 0.05)) {
        x = first.X();
      }
    }
  } else {
    x = last.X();
  }

  const color = road[0].visProp.fillcolor;

  if (gInterPoint(last.X(), x) && gInterPoint(last.Y(), y)) {
    // si el ultimo punto es igual a la posicion donde se queire poner el punto final lo cambia

    last.setAttribute({
      strokeColor: 'green',
      fillcolor: color,
      size: 4,
    });
    road.at(-1).typePoint = 'finish';
  } else {
    const point = board.create('point', [x, y], {
      strokeColor: 'green',
      fillcolor: color,
      opacity: 0.8,
      size: 4,
      fixed: true,
      name: '',
    });
    point.iMod = first.iMod;
    point.typePoint = 'finish';
    road.push(point);
    const indexPoint = road.length - 1;
    // def.memory.push({ element: point, from: road, index: indexPoint });
  }
}

function roadMain(defBoards, allDef) {
  const eye = {
    open: '<svg width="24px" height="24px" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" color="#000000"><path stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 12c-1.889 2.991-5.282 6-9 6s-7.111-3.009-9-6c2.299-2.842 4.992-6 9-6s6.701 3.158 9 6Z"></path></svg>',
    closed: '<svg width="24px" height="24px" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" color="#321322"><path stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m3 3 18 18M10.5 10.677a2 2 0 0 0 2.823 2.823"></path><path stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6 1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 0 1-1.078 1.5"></path></svg>',
  };
  const globalColor = [
    '#f16413',
    'violet',
    '#4955FE',
    '#ffa420',
    '#083964',
    '#0073e8',
    '#31379a',
    '#048E62',
    '#6B1B9A',
    '#195E20'
  ];

  const tmp = document.querySelector('#tmp-road');
  const divs = document.querySelectorAll('.defRoad');

  divs.forEach((div, i) => {

    const clone = tmp.content.firstElementChild.cloneNode(true);
    const $board = clone.querySelector('.defRoadBoard');
    const btnAll = clone.querySelector('.btn-all');
    const id = 'defRoadBoard_' + i;

    $board.setAttribute('id', id);

    const enumTop = clone.querySelector('.rEnunciadoTop');
    const enumBottom = clone.querySelector('.rEnunciadoBottom');
    const boardSelect =
      div.dataset.board ||
      allDef[div.dataset?.artifact || 'artifact_0'].defBoard ||
      'board_0';

    const refArtifact =
      div.dataset.artifact ||
      defBoards[boardSelect || 'board_0']?.artifact ||
      'artifact_0';

    clone.setAttribute('id', refArtifact);

    const def = {
      statusValidate: true,
      lastDirection: null,
      timeInteraction: 0,
      curvesDefaults: [],
      numberBoard: false,
      targeIndexY: null,
      pointTarget: null,
      targeIndex: null,
      inBorder: false,
      dataInteraction: {
        incorrect: 0,
        correct: 0,
        forAnswer: 0,
      },
      samePoints: [[]],
      textAlert: null,
      roadData: [],
      positionsX: [],
      positionsY: [],
      positions: [],
      visible: true,
      debug: false,
      points: [[]],
      memory: [],
      curves: [],
      other: [],
      globalColor,
      ...allDef[refArtifact],
      buttonsActive: {
        return: true,
        points: false,
        ...allDef[refArtifact]?.buttonsActive,
      },
      conditions: {
        road: {
          text: 'Intenta de Nuevo',
          points: false,
          ...allDef[refArtifact]?.conditions?.road,
          curve: {
            board: null,
            minFinishPoint: 3,
            modNegative: null,
            confirmCurve: false,
            ...allDef[refArtifact]?.conditions?.road?.curve,
          },
        },
      },

      curvesDefaults: [],
      lastDirection: null,
      pointTarget: null,
      targeIndexY: null,
      targeIndex: null,
    };

    if (def.enumTop) {
      enumTop.textContent = def.enumTop;
    } else if (enumTop) {
      enumTop.parentNode.style.display = 'none';
    }

    if (def.enumBottom) {
      enumBottom.textContent = def.enumBottom;
    } else if (enumBottom) {
      enumBottom.parentNode.style.display = 'none';
    }

    const style = defBoards[boardSelect].style;
    div.appendChild(clone);

    defBoards[boardSelect].style.reflectionAxie = {
      Y: defBoards[boardSelect]?.style?.reflectionAxie?.Y ?? true,
      X: defBoards[boardSelect]?.style?.reflectionAxie?.X ?? true,
      B: defBoards[boardSelect]?.style?.reflectionAxie?.B ?? true,
    };

    const dataBoard = gBoard(def, defBoards[boardSelect], id, style, null, i, {
      globalColor,
      content: clone,
    });



    const board = dataBoard.board;
    const box = board.attr.boundingbox;

    if (def.numberBoard) {
      board.create(
        'point',
        [box[1], box[3]],
        {
          name: def.numberBoard,
          fixed: true,
          label: {
            position: 'rt',
            fixed: true,
            offset: [-25, 25],
            fontSize: 18,
            strokeColor: 'black',
            visible: true
          },
          fixed: true,
          visible: false,
        }
      );
    }

    const border = gCurveDefault({
      board,
      curves: [
        {
          typeCurve: 'border',
          flex: 0,
          points: [
            [box[0], box[1]],
            [box[1], box[2]],
            [box[2], box[3]],
            [box[3], box[0]],
            [box[0], box[1]],
          ],
          strokeColor: 'red',
          strokeWidth: 3,
          visible: false,
        },
      ],
    });

    def.curveGenerate = [
      ...dataBoard.resultObj.curves.map((p) => {
        if (p.typeCurve == 'finishCurve') {
          p.setAttribute({ visible: false });
        }
        return p;
      }),
    ];

    if (dataBoard.resultObj.points) {
      const option0 = document.createElement('option');

      option0.innerHTML = '&#9679';
      option0.style.color = 'black';
      option0.value = -1;

      //  selectRoad.appendChild(option0);
      const defSelects = [];
      def.pointsData = dataBoard.resultObj.points.map((point, i) => {
        defSelects.push({ style: { color: globalColor[i] } });/* = [
               { style: { color: 'blue' } },
               { style: { color: 'orange' } },
               { style: { color: 'green' } },
               { style: { color: 'red' } }
            ] */
        point.setAttribute({
          fixed: true,
          visible: () => {
            if (def.pointTarget && def?.pointTarget?.iMod != point.iMod) {
              return (() => def.visible)();
            } else {
              return true;
            }
          },
          color: globalColor[i],
          size: function () {
            return !def.pointTarget || def.pointTarget?.iMod != point.iMod
              ? 2
              : 4;
          },
        });
        point.typePoint = 'point';
        point.typeCurve = 'ejeX';
        point.iMod = i;
        def.roadData.push([]);
        return point;
      });
      def.selectRoad = new CreateSelectsPoints(
        (e) => { rSelectInteraction(def, board, e); },
        clone.querySelector('.rInteractiveOne'), defSelects, 'before');
    }

    def.curvesDefaults = [
      ...dataBoard.resultObj.curves,
      ...Object.values(def.reflectionAxie),
      ...border,
    ];

    btnAll.addEventListener('click', (e) => {
      const button = e.target;
      if (button.matches('.rUp_arrow')) {
        move(def, board, def.positionsY, 'up');
      } else if (button.matches('.rDown_arrow')) {
        move(def, board, def.positionsY, 'down');
      } else if (button.matches('.rRight_arrow')) {
        move(def, board, def.positionsX, 'right');
      } else if (button.matches('.rLeft_arrow')) {
        move(def, board, def.positionsX, 'left');
      } else if (button.matches('.finishRoad')) {
        finishPoint({ board, def, clone });
      } else if (button.matches('.visible, .visible svg')) {
        def.visible = !def.visible;
        if (def.visible) {
          btnAll.querySelector('.visible').innerHTML = eye.open;
        } else {
          btnAll.querySelector('.visible').innerHTML = eye.closed;
        }
      } else if (button.classList.contains('back')) {
        rDefReturn(def, board, clone);
      } else if (button.classList.contains('reset')) {
        rDefReset(def, board, clone);
      } else if (button.classList.contains('check')) {
        rDefValidation(def, defBoards, clone, refArtifact, board);
      }
      board.update();
    });

    allDef[refArtifact] = def;
  });
}

function createLineIntersection(def, board) {
  if (def.lineY) {
    board.removeObject(def.lineX);
    board.removeObject(def.lineY);
  }

  def.lineY = board.create(
    'line',
    [
      [() => def?.pointer?.X(), 5],
      [() => def?.pointer?.X(), -5],
    ],
    { anchorX: def.pointer, visible: false }
  );

  def.lineX = board.create(
    'line',
    [
      [5, () => def?.pointer?.Y()],
      [-5, () => def?.pointer?.Y()],
    ],
    { anchorX: def.pointer, visible: false }
  );
}

function rDefReturn(def, board, content) {

  def.change = true;
  def.statusValidate = false;
  def.inBorder = false;

  let endElement;
  if (def.positions.length > 0) {
    if (def.positions.length === 1) {
      def.positions.pop();
      if (def?.pointTarget) {
        def.pointTarget.setAttribute({ size: 2 });
        def.pointTarget = null;
        def.selectRoad.resetColor();
      }
    }
    endElement = def.positions.pop();
    const last = def.positions.at(-1);
    const move = last?.coords?.usrCoords?.slice(1);
    if (move) {
      def.pointer.setPositionDirectly(JXG.COORDS_BY_USER, move);
    }
    drawingRoad(def, board);
  } else {
    endElement = def.memory.pop();
    if (def?.pointTarget) {
      console.log('target2');
      def.pointTarget.setAttribute({ size: 2, color: 'red' });
      def.pointTarget = null;
    }
  }
  console.log('remove');
  removeElemet(board, endElement);
  resetPointsBase(def, board, def.pointsData);
  if (def.textAlert) {
    def.textAlert.remove();
    def.textAlert = null;
  }
}

function removeElemet(board, endElement) {

  if (endElement?.from?.[0]?.[0]?.elType === 'point') {
    const color = endElement?.from?.[0]?.[0].visProp.fillcolor;
    endElement?.from?.[0]?.[0]?.setAttribute({ color: color });
  };

  if (endElement) {
    if (Array.isArray(endElement) && endElement.length > 0) {
      endElement.forEach((element) => {
        removeElemet(board, element);
      });
      return;

    };

    const { element, from, index, key } = endElement;
    board.removeObject(element ?? endElement);

    if (Array.isArray(from)) {
      from.splice(index, 1);
    } else if (key != null) {
      from[key] = null;
    };

  } else {
    return;

  };

};

function rDefReset(def, board) {

  def.roadData = [];
  def.pointsData.forEach((p1, i) => {

    p1.setAttribute({
      color: def.globalColor[i],
      size: 2,
    });
    def.roadData.push([]);
  });

  def.selectRoad.resetColor();

  if (def?.pointTarget) {
    def.pointTarget.setAttribute({ size: 2 });
    def.pointTarget = null;
  }
  def.curveGenerate.forEach((curve) => {
    if (curve.typeCurve == 'finishCurve') {
      curve.setAttribute({ visible: false });
    }
  });

  if (def.positions.length > 0) {
    board.removeObject(def.positions.slice(1));
    def.positions = [];
  }

  def.memory.forEach((element) => {
    removeElemet(board, element);
  });
  def.memory = [];

  board.removeObject(def.samePoints);
  board.removeObject(def.points);
  board.removeObject(def.other.flat());

  def.points = [[]];
  def.samePoints = [[]];
  def.curves = [];

  def.change = false;

  if (def.textAlert) {
    def.textAlert.remove();
    def.textAlert = null;
  }
  def.iMod2 = [null, null];
}

function rDefValidation(def, defBoard, content, refKey, board) {

  if (!def.statusValidate) {

    const roadData = def.roadData;
    // const remove = [];
    const dataClean = roadData.map((p1, i) => {

      if (p1.length == 0) {
        def.pointsData[i].setAttribute({
          strokeColor: 'green',
          size: 4,
        });
        p1.push([def.pointsData[i]]);
        //  remove.push({ element: def.pointsData[i] });
      };

      return p1.map((x) => {
        if (Array.isArray(x)) {
          return x.map((x2) => [x2.X(), x2.Y()]);
        } else {
          return [x.X(), x.Y()];
        }
      });
    }
    );

    // def.memory.push(remove);


    if (rDefRoadValidation(def, defBoard, dataClean, def.conditions.road)) {
      def.dataInteraction.incorrect = 0;
      def.dataInteraction.correct = 1;

      gAlerts({
        def,
        id: refKey,
        text: 'Excelente',
        size: 26,
      });
      generateCurveFinish(def, board, defBoard);
    } else {
      def.dataInteraction.incorrect = 1;
      def.dataInteraction.correct = 0;

      gAlerts({
        def,
        id: refKey,
        text: def.conditions.road.text,
        size: 26,
        type: 2,
      });

      setTimeout(() => {
        if (def.textAlert) {
          def.textAlert.remove();
          def.textAlert = null;
        }
      }, 1000);
    }
    def.dataInteraction.forAnswer = 0;
    if (typeof Android !== 'undefined' && typeof Android.sendData === 'function') {

      Android.sendData(JSON.stringify(cleanData(def, refKey)));
    } else {
      // cleanData(def, refKey)
      sendData(cleanData(def, refKey));

    };

    gTime(def, false);
    def.change = false;
    def.statusValidate = true;

  } else {
    gAlerts({
      def,
      id: refKey,
      text: 'Interactua',
      size: 26,
      type: 4,
    });
  }

}

//esta funcion toma los caminos de manera individual
function discart(conditionArray = [], arrayIn = []) {
  if (conditionArray[0] && Array.isArray(conditionArray[0][0])) {
    // si es un array enviara las condiciones por parte hasta encontrar una valida
    resp = conditionArray.some((x) => discart(x, arrayIn));
    return resp;
  } else if (
    !Array.isArray(conditionArray) &&
    typeof conditionArray == 'object'
  ) {
    return conditionArray.forks.every((cond) =>
      arrayIn.some((road) => discart(cond, road))
    );
  } else {
    // para las condiciones simples se validan cada una de las posiciones en el orden definido
    return conditionArray.every((p, i) => {
      return (
        gInterPoint(p[0], arrayIn[i][0], 0.2) &&
        gInterPoint(p[1], arrayIn[i][1], 0.2) &&
        arrayIn.length == conditionArray.length
      );
    });
  }
}

//toma las condiciones y todos los diferentes caminos del board los va eliminando dependiendo si coinciden con una condicion;
function rDefRoadValidation(def, defBoard, positions, condition, content) {
  let resp = null;

  if (!condition.mod) {
    const condAux = condition.points.map((r) => r);
    const pos = positions.map((p) => p);

    for (let i = condAux.length - 1; i >= 0; i--) {
      const resp = pos.findIndex((mp) => {
        return discart(condAux[i], mp);
      });
      if (resp != -1) {
        condAux.splice(i, 1);
        pos.splice(resp, 1);
      }
    }
    //si al finalizar la funcion el largo de las condiciones y los caminos son iguales regresa true
    resp = condAux.length == 0 && pos.length == 0;
  }

  if (resp == false) {
    return false;
  } else if (resp === null) {
    resp = true;
  }

  return resp; //&& respConfirmCurve && respSame && respInverse;
}

function cleanData(def, refKey) {
  let auxResult = {};
  auxResult = { results: def.dataInteraction };
  auxResult.elementArtifact = {
    pointsData: [[]],
    samePoints: [[]],
    curves: [],
  };
  auxResult.artifact = Number(refKey.split('_')[refKey.split('_').length - 1]);
  // auxResult.typeArtifact = 'Standard';
  def.typeArtifact == "Evaluation" ? (auxResult.typeArtifact = 'Evaluation') : (auxResult.typeArtifact = 'Standard')

  auxResult.seconds = def.timeInteraction;

  if (def.yellow) {
    auxResult.typeArtifact = 'Yellow';
    delete auxResult.results;
  };
  console.log(auxResult)
  return auxResult;
}

function generateCurveFinish(def, board, defboard) {
  if (def.conditions.road?.curveReflex) {
    def.conditions.road?.curveReflex.forEach((options) => {
      if (!options.curve) {
        const axie = def.reflectionAxie[options.axie];
        def.curvefinish = [];
        options.index.forEach((x) => {
          def.curvefinish.push(board.create('reflection', [def.curveGenerate[x], axie], {
            strokeWidth: 2,
            strokeColor: 'green',
          }));
        });
        def.other.push(...def.curvefinish);
      } else {
        const curvefinish = def.curveGenerate[options.curve?.index];
        curvefinish.setAttribute({ visible: true });
        def.curvefinish = curvefinish;
      };
    });
  } else {
    console.warn('<!>No se definio una curva para este ejercicio<!>');
  }
}


function rSelectInteraction(def, board, e) {
  const value = Number(e);
  if (def.positions.length > 0) {
    board.removeObject(def.positions.slice(1));
  }

  if (def.pointTarget) { def.pointTarget.setAttribute({ size: 2 }); };

  def.positions = [];

  if (def?.pointer) {
    board.removeObject(def?.pointer);
  }

  if (!def.pointsData[Number(value)]) {
    return;
  }

  def.pointTarget = def.pointsData[Number(value)];

  def.pointTarget.setAttribute({ size: 4 });

  if (!def.pointTarget) {
    return;
  }

  def.pointTarget.typePoint = 'point';
  def.pointTarget.typeCurve = 'ejeX';

  def.pointer = board.create(
    'point',
    [def.pointTarget.X(), def.pointTarget.Y()],
    {
      name: '',
      size: 4,
      fixed: true,
      visible: false,
      color: 'red', //def.pointTarget.visProp.fillcolor,
    }
  );

  def.pointer.typeCurve = 'ejeX';
  def.pointer.typePoint = 'point';
  def.positions.push(def.pointTarget);

};

function resetPointsBase(def, board, pointsBase) {
  pointsBase.forEach((p1, i) => {
    p1.setAttribute({
      color: def.globalColor[i],
      size: 2,
    });
  });
  board.update();
  def.curveGenerate.forEach((curve) => {
    if (curve.typeCurve == 'finishCurve') {
      curve.setAttribute({ visible: false });
    }
  });
}