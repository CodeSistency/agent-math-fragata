function mainAsymptotes(defBoards, allDef) {

  if (!document.querySelector('#tmp-asymptotes')) {
    insertTemplate();
  };

  const tmp = document.querySelector('#tmp-asymptotes');
  const divs = document.querySelectorAll('.operationCurves');

  divs.forEach((div, i) => {
    const iconst = i;
    const clone = tmp.content.firstElementChild.cloneNode(true);
    const $board = clone.querySelector('.jxgbox');
    const btnAll = clone.querySelector('.btn-all');
    const id = 'defOperationBoard_' + i;
    $board.setAttribute('id', id);
    // Por defecto apunta a un artifact_0 y defBoard_0
    const boardSelect = div.dataset.board || allDef[div.dataset?.artifact || 'artifact_0'].defBoard || 'board_0';
    const refArtifact = div.dataset.artifact || defBoards[boardSelect || 'board_0']?.artifact || 'artifact_0';

    clone.setAttribute('id', refArtifact);

    if (!defBoards[boardSelect]) {
      console.warn('<!> board undefined <!>');
      return;
    };

    let artifactDefault = {
      firsPointsDefault: false,
      dataInteraction: { incorrect: 0, correct: 0 },

      timeInteraction: 0,
      timer: null,

      statusValidate: false,
      pointsConfig: false,
      asymptotes: [],
      /* aqui creado por eliezer revisar despues*/

      validateCurves: true,
      pointsOfCurves: false,
      errorCurves: 0.2,
      curvesInfinity: [],
      curves: [],

      /* /////////////////////////////// */
      visibleAsyntote: false,
      visiblexSlice: false,

      pointsData: [[]],
      textAlert: null,
      maxCurves: 1,
      visible: true,
      memory: [],
      points: [[]],
      change: false,
      other: [],
      debug: false,
      ...allDef[refArtifact],
      conditions: {
        ...allDef[refArtifact].conditions,
        asymptotes: {
          positions: allDef[refArtifact]?.conditions?.asymptotes
        },
      },

      config: {
        curves: {
          flex: 1,
          color: 'black',
          ...allDef[refArtifact].config?.curves
        },
      },

      buttonsActive: {
        curves: true,
        asymptotes: true,
        ...allDef[refArtifact].buttonsActive
      }

    };

    const style = defBoards[boardSelect].style;
    div.appendChild(clone);

    const dataBoard = gBoard(artifactDefault, defBoards[boardSelect], id, style, null, i);

    const board = dataBoard.board;
    if (dataBoard?.resultObj?.curves) {
      artifactDefault.curveGenerate = dataBoard.resultObj.curves;
    };

    if (style.width) {
      clone.style.width = style.width ?? '320px';
      clone.style.maxWidth = style.maxWidth ?? '550px';
      clone.style.minWidth = style.minWidth ?? '300px';
    };

    if (style.height) {
      clone.style.height = style.height ?? '420px';
      clone.style.maxHeight = style.maxHeight ?? '550px';
      clone.style.minHeight = style.minHeight ?? '300px';
    };

    if (dataBoard?.resultObj?.asymptotes) {

      const asyns = dataBoard?.resultObj?.asymptotes;

      artifactDefault.pointsData = asyns.map(asyn => {

        const asyntote = asyn[1];
        artifactDefault.mode = 4;
        const pointSlider = gAddPoint(artifactDefault, board, null, asyntote, [0, 0]);

        pointSlider.moveTo([0, 0]);

        pointSlider.setAttribute({
          label: {
            anchorX: 'middle',
            anchorY: 'top',
            fontsize: 24,
            offset: [5, 35]
          },
          size: 5,
          visible: () => {
            if (asyntote.validate) {
              asyntote.setAttribute({
                visible: () => artifactDefault.visibleAsyntote
              });
              return artifactDefault.visibleAsyntote;
            } else {

              return artifactDefault.visiblexSlice;
            }

          },
          fixed: !asyntote.validate,
          name: () => {
            return pointSlider.Y() == 0 ? '0' : pointSlider.Y() > 0 ? '+' : '-';
          }
        });

        artifactDefault.mode = null;
        asyntote.setAttribute({ visible: false });
        pointSlider.on('drag', (p) => {
          artifactDefault.change = true;
        });
        if (asyntote.validate) {
          return pointSlider;
        };
      }).filter(p => p);
      artifactDefault.asymptotes = asyns;
    };

    allDef[refArtifact] = artifactDefault;

    btnAll.addEventListener('click', (e) => {

      const button = e.target;
      if (button.classList.contains('check')) {
        aDefValidation(artifactDefault, defBoards[boardSelect], board, refArtifact, iconst);
      } else if (button.classList.contains('reset')) {
        aDefReset(artifactDefault, board, true, iconst);
      } else if (button.classList.contains('back')) {
        aDefReturn(artifactDefault, board);
      } else if (button.classList.contains('curve')) {
        aTraseCurve(artifactDefault, board);
      } else if (button.classList.contains('xSlice')) {

        artifactDefault.visiblexSlice = !artifactDefault.visiblexSlice;
        artifactDefault.asymptotes.forEach(p => {
          p[1].setAttribute({ visible: artifactDefault.visiblexSlice });
        });

        artifactDefault.change = true;

      } else if (button.classList.contains('asyntote')) {
        artifactDefault.visibleAsyntote = !artifactDefault.visibleAsyntote;

        artifactDefault.change = true;
      };
      board.update();
    });

    clone.addEventListener('change',
      (e) => {
        if (e.target.classList.contains('rangeConfig')) {
          artifactDefault.config.curves.flex = Number(e.target.value);
        } else if (e.target.classList.contains('colorConfig')) {
          artifactDefault.config.curves.color = e.target.value;
        };
      });
    if (artifactDefault.helpMsg) {
      gHelpMsg(artifactDefault, clone, refArtifact);
    };

    if (!artifactDefault.helpMsg) {
      btnAll.querySelector('.help').style.display = 'none';
    };

    if (!artifactDefault.buttonsActive?.curves && btnAll.querySelector('.curve') && btnAll.querySelector('.pointClose')) {
      btnAll.querySelector('.curve').style.display = 'none';
      btnAll.querySelector('.pointClose').style.display = 'none';
    };

    if (!artifactDefault.buttonsActive?.asymptotes && btnAll.querySelector('.btnAsymptotes')) {
      btnAll.querySelector('.btnAsymptotes').style.display = 'none';
    }
    if (!artifactDefault.buttonsActive?.infinities && btnAll.querySelector('.infinite')) {
      btnAll.querySelector('.infinite').style.display = 'none';
    }
    if (!artifactDefault.buttonsActive?.config && btnAll.querySelector('.gear')) {
      btnAll.querySelector('.gear').style.display = 'none';
    }

    clone.addEventListener('mouseenter', () => {
      gTime(artifactDefault);
    });

    clone.addEventListener('click', (e) => {
      if (e.target.classList.contains('btnClose')) {
        displayConfig({ def: artifactDefault, id: refArtifact });
      };

      if (!(e.target.classList.contains('check')) && e.target.tagName != 'DIV') {
        artifactDefault.statusValidate = false;
      };
      gTime(artifactDefault);

    });

    clone.addEventListener('mouseleave', () => {
      gTime(artifactDefault, false, false);
    });
  });
};

function insertTemplate() {

  return;
}

function aDefReturn(refArtifact, board) {

  let arraySelect = refArtifact.pointsData;
  switch (refArtifact.mode) {
    case 4:
      if (refArtifact.points.length > 0) {
        if (refArtifact.points.length > 1 && refArtifact.points.at(-1).length == 0) {
          refArtifact.points.pop();
          refArtifact.curves.pop();
          aDefReturn(refArtifact, board);
        } else {
          board.removeObject(refArtifact.points.at(-1).pop());
        };
      }
      break;
    case 5:
      board.removeObject(refArtifact.asymptotes.pop());
      break;
    case 6:
      break;
    default:
      if ([1, 2, 3].includes(refArtifact.mode)) {
        if (refArtifact.memory.length > 0) {
          if (arraySelect[refArtifact.memory.at(-1)].at(-1)[0].getDelete) {
            board.removeObject(arraySelect[refArtifact.memory.pop()].pop()[0]);
          };
        } else {
          return;
        };
      };
      break;
  };
  board.update();
  refArtifact.change = true;
};

function aDefReset(def, board, option = true) {

  def.visiblexSlice = false;
  def.visibleAsyntote = false;

  if (option) {
    board.removeObject(def.curves);
    def.curves = [];
    def.asymptotes.forEach(p => {
      p[1].setAttribute({ visible: def.visiblexSlice });
    });

  };

  if (def.textAlert) {
    def.textAlert.remove();
    def.textAlert = null;
  };
  board.update();
  def.change = false;
};

function aDefValidation(def, defBoard, board, refKey, i) {
  const points = def.pointsData;
  const conditions = def.conditions;
  const curves = def.curves;


  let textError = 'Revisar: \n';
  let resp = null;
  if (def.textAlert) {
    def.textAlert.remove();
    def.textAlert = null;
  };

  if (!def.statusValidate && def.change) {


    def.change = false;

    if (curves.length === 0) {
      textError += ' Tienes que trazar una curva,';
      resp = false;
    }

    if (conditions?.asymptotes) {

      if (!def.visibleAsyntote) {
        textError += ' Tienes que poner en sus lugares en valor de las verticales,';
        resp = false;
      };

      if (!def.visiblexSlice) {
        textError += ' Tienes que poner en sus lugares los puntos de cortes,';
        resp = false;

      }

      if (!asymptotesValidation(points, def?.conditions?.asymptotes?.positions)) {
        textError += ' Los signos son incorrectos,';
        resp = false;
      };

    } else {
      if (def.asymptotes.length > 0 && !conditions?.asymptotes?.positions && !conditions?.asymptotes?.positionY) {
        textError += !resp ? def.conditions?.asymptotes?.text || ' Error en las Verticales,' : '';
      };
    };




    if (resp == null) {
      resp = true;
    };

    def.dataInteraction.incorrect = resp ? 0 : 1;
    def.dataInteraction.correct = resp ? 1 : 0;
    def.dataInteraction.forAnswer = 0;

    if (resp) {
      gAlerts({
        def,
        id: refKey,
        text: 'Excelente',
        size: 26
      });
    } else {

      textError = textError.replace(/,$/, ' ');
      textError = textError.replace(/,/g, ', ');

      gAlerts({
        def,
        id: refKey,
        text: textError,
        size: 26,
        timer: 3,
        type: 2
      });
    };

    if (typeof Android !== 'undefined' && typeof Android?.sendData === 'function') {
      Android.sendData(JSON.stringify(cleanData(def, refKey)));
    } else {
      // cleanData(def, refKey)
      sendData(cleanData(def, refKey));
    };

    gTime(def, false);
    def.statusValidate = true;
    def.change = false;
  };
};

function asymptotesValidation(asymptotes, positions, noise = 0.2) {

  asymptotes.sort((p1, p2) => { return p1.X() - p2.X(); });
  positions.sort((p1, p2) => { return p1.x - p2.x; });

  return positions.every((p, i) => {
    return gInterPoint(asymptotes[i].X(), p.x, noise) && asymptotes[i].name().toLowerCase().replace(' ', '') === p.name.toLowerCase().replace(' ', '');
  });

};

function cleanData(refArtifact, refKey) {

  let auxResult = {};
  auxResult = { results: refArtifact.dataInteraction };
  auxResult.elementArtifact = {
    pointsData: [[]],
    samePoints: [[]],
    curves: [],
  };

  auxResult.artifact = Number(refKey.split('_')[refKey.split('_').length - 1]);
  // auxResult.typeArtifact = 'Standard';
  refArtifact.typeArtifact == "Evaluation" ? (auxResult.typeArtifact = 'Evaluation') : (auxResult.typeArtifact = 'Standard')

  auxResult.seconds = refArtifact.timeInteraction;

  if (refArtifact.yellow) {
    auxResult.typeArtifact = 'Yellow';
    delete auxResult.results;
  };
  console.log("cleanData",auxResult)
  return auxResult;
};

function aTraseCurve(def, board) {

  if (def.curves.length >= def.maxCurves || !def.visibleAsyntote || !def.visiblexSlice) {

    return;
  };

  const style = {
    strokeColor: 'black',
    strokeWidth: 2.5,
    fixed: true,
    label: {
      autoPosition: true,
      visible: true,
    },
    precision: {
      touch: 8,
      mouse: 3,
      pen: 5,
      hasPoint: 1,
    },
  };

  def.points.forEach((p1) => {
    def.curves.push(board.create('cardinalspline', [p1, 0.9, 'centripetal'], style));
  });

  def.change = true;
};