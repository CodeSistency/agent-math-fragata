const globalColor = {
  axieX: '#4afdff',
  axieY: '#6efc6e',
  axieB: '#ff5132',
};
const dic = {
  'axieX': 1,
  'axieY': 2,
  'axieB': 3
};

function mainSym() {
  const tmp = document.querySelector('#tmp-sym');
  const divs = document.querySelectorAll('.defSym');
  divs.forEach((div, i) => {
    const clone = tmp.content.firstElementChild.cloneNode(true);
    const $board = clone.querySelector('.defRoadBoard');
    const btnAll = clone.querySelector('.btn-all');
    const interactBtn = clone.querySelector('.interact-btn');
    const btnAxie = clone.querySelectorAll('.axie');
    const inpAxie = clone.querySelector('#inpAxie');

    btnAxie.forEach((btn, i) => {
      btn.style.color = Object.values(globalColor)[i];
    });

    const id = 'defRoadBoard_' + i;
    $board.setAttribute('id', id);
    const boardSelect = div.dataset.board;
    const refArtifact = defBoards[boardSelect].artifact;

    if (!defBoards[boardSelect]) {
      console.warn('<!> board undefined <!>');
      return;
    }
    clone.setAttribute('id', refArtifact);
    const artifactDefault = {
      dataInteraction: {
        incorrect: 0,
        correct: 0,
      },
      statusValidate: false,
      timeInteraction: 0,
      debug: false,
      stateNow: false,
      allReflectObj: [],
      noEdit: [],
      other: [],
      ...def[refArtifact],
      conditions: {
        state: def[refArtifact].conditions.state || false,
        inpValue: def[refArtifact].conditions.inpValue || false,
      },
      buttonsActive: def[refArtifact].buttonsActive || false,
      inputActive: def[refArtifact].inputActive || false,
    };

    const style = defBoards[boardSelect].style;
    div.appendChild(clone);
    //return { board, reflectionAxie, resultObj };
    const boardData = gBoard(artifactDefault, defBoards[boardSelect], id, style);
    const board = boardData.board;

    artifactDefault.allReflectObj = {
      curves: boardData.resultObj.curves || [],
      /* lines: boardData.resultObj.lines || [], */
      arcs: boardData.resultObj.arcs || []
    };
    def[refArtifact] = artifactDefault;

    if (!artifactDefault.inputActive) {
      inpAxie.style = 'display: none !important;';
    } else {
      inpAxie.addEventListener('keyup', (e) => {
        def[refArtifact].statusValidate = false;
        gTime(def[refArtifact]);
      });
      inpAxie.addEventListener('blur', (e) => {
        gTime(def[refArtifact], false, false);
      });
      def[refArtifact].inpAxie = inpAxie;
    };

    btnAll.addEventListener('click', (e) => {
      if (e.target.tagName == 'BUTTON' && !e.target.classList.contains('reset') && !e.target.classList.contains('check')) {
        def[refArtifact].statusValidate = false;
        gTime(def[refArtifact]);
        def[refArtifact].change = true;
      };
      if (e.target.classList.contains('check')) {
        symValidation(def[refArtifact], refArtifact, board);
      } else if (e.target.classList.contains('reset')) {
        symReset(def[refArtifact], board);
      } else if (e.target.classList.contains('axie')) {
        symReflectObj(def[refArtifact], board, e.target.dataset.axie);
        def[refArtifact].stateNow = e.target.dataset.axie;
      };
    });
    if (!artifactDefault.buttonsActive) {
      interactBtn.style = 'display: none !important;';
    };
    clone.addEventListener('mouseenter', () => {
      gTime(def[refArtifact]);
    });
    clone.addEventListener('mouseleave', () => {
      gTime(def[refArtifact], false, false);
    });
    symReflectObj(def[refArtifact], board, Object.keys(dic)[def[refArtifact].conditions.state - 1], false);
  });
};

function symReset(refArtifact, board, notInput = true) {
  if (refArtifact.textAlert) {
    refArtifact.textAlert.remove();
    refArtifact.textAlert = null;
  };
  if (refArtifact.inpAxie && notInput) {
    refArtifact.inpAxie.value = '';
    refArtifact.inpAxie.classList.remove('passInLibrary');
    refArtifact.inpAxie.classList.remove('failedInLibrary');
  };
  board.removeObject(refArtifact.other.flat());
  refArtifact.other = [];
  board.update();
  refArtifact.stateNow = false;
};

function symValidation(refArtifact, refKey, board) {
  if (!refArtifact.statusValidate && refArtifact.change) {
    refArtifact.dataInteraction.forAnswer = 0;
    if (refArtifact.inputActive) {
      symReflectObj(refArtifact, board, Object.keys(dic)[refArtifact.conditions.state - 1]);
      if (refArtifact.inpAxie.value.toLowerCase().replace(new RegExp('[\' \']', 'g'), '') == refArtifact.conditions.inpValue.replace(new RegExp('[\' \']', 'g'), '')) {
        refArtifact.dataInteraction.incorrect = 0;
        refArtifact.dataInteraction.correct = 1;
        refArtifact.inpAxie.classList.remove('failedInLibrary');
        refArtifact.inpAxie.classList.add('passInLibrary');
        gAlerts({ def: refArtifact, id: refKey, text: 'Excelente', size: 26 });
      } else {
        refArtifact.dataInteraction.incorrect = 1;
        refArtifact.dataInteraction.correct = 0;
        refArtifact.inpAxie.classList.remove('passInLibrary');
        refArtifact.inpAxie.classList.add('failedInLibrary');
        gAlerts({ def: refArtifact, id: refKey, text: 'Intenta de Nuevo', type: 2, size: 26 });
        setTimeout(() => {
          refArtifact.inpAxie.value = '';
          symReset(refArtifact, board);
        }, 400);

      };
    } else {

      if (refArtifact.conditions.state === dic[refArtifact.stateNow]) {
        refArtifact.dataInteraction.incorrect = 0;
        refArtifact.dataInteraction.correct = 1;
        gAlerts({ def: refArtifact, id: refKey, text: 'Excelente', size: 26 });
      } else {
        refArtifact.dataInteraction.incorrect = 1;
        refArtifact.dataInteraction.correct = 0;
        gAlerts({ def: refArtifact, id: refKey, text: 'Intenta de Nuevo', type: 2, size: 26 });
        setTimeout(() => {
          symReset(refArtifact, board);
        }, 4000);
      };
    };

    if (typeof Android !== 'undefined' && typeof Android.sendData === 'function') {
      Android.sendData(JSON.stringify(cleanData(refArtifact, refKey)));
    } else {
      sendData(cleanData(refArtifact, refKey));
      if (def.debug) {
        console.table(cleanData(refArtifact, refKey));
      }
    };

    gTime(refArtifact, false);
    refArtifact.statusValidate = true;
  };
};

function symReflectObj(refArtifact, board, selectAxie, pass = true) {
  const safe = pass ? 'other' : 'noEdit';
  if (pass) {
    if (selectAxie == refArtifact.stateNow) {
      return;
    };
    symReset(refArtifact, board, false);
  };
  const axie = refArtifact.reflectionAxie[selectAxie];
  refArtifact[safe].push(Object.keys(refArtifact.allReflectObj).map(m => refArtifact.allReflectObj[m].map((x) => board.create('reflection', [x, axie], { strokeWidth: 2, strokeColor: pass ? globalColor[selectAxie] : '#d5d5d6' }))));
  refArtifact[safe] = refArtifact[safe].flat();
};

function cleanData(refArtifact, refKey) {
  let auxResult = {};
  auxResult = { results: refArtifact.dataInteraction };
  auxResult.elementArtifact = { stateNow: refArtifact.stateNow };
  auxResult.artifact = Number(refKey.split('_').at(-1));
  refArtifact.typeArtifact == "Evaluation" ? (auxResult.typeArtifact = 'Evaluation') : (auxResult.typeArtifact = 'Standard')

  // auxResult.typeArtifact = 'Standard';
  auxResult.seconds = refArtifact.timeInteraction;
  if (refArtifact.yellow) {
    auxResult.typeArtifact = 'Yellow';
    delete auxResult.results;
  };
  console.log("symmetric",auxResult)
  return auxResult;
};

if (typeof window.sendData === 'undefined') {
  console.warn('no hay sendata');
  window.sendData = function (params) {
    console.log(params);
  };
}