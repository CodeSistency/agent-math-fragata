let inputActive = null;
let targetStart = '';
let targetEnd = '';

function createHtml() {
  const $template = document.querySelector('#template');
  const $main = document.querySelector('#main');
  let $fragmen = new DocumentFragment();
  $main.classList.add('d-flex');
  $main.classList.add('flex-wrap');
  for (let i of Object.keys(def)) {
    const key = i;
    const $clone = $template.content.firstElementChild.cloneNode(true);
    const $board = $clone.querySelector('#board');
    const $inputs = $clone.querySelectorAll('input');
    const $btnSend = $clone.querySelector('#send');
    const $btnReset = $clone.querySelector('#reset');
    const $btnVoid = $clone.querySelector('#void');
    const $example = $clone.querySelector('#example');
    const inputs = $clone.querySelector('#inputs');

    inputs.addEventListener('click', (e) => {
      if (e.target.tagName === 'INPUT') {
        inputActive = e.target;
      }
    });

    $example.textContent = 'EJEMPLO ' + i[i.length - 1];
    const defaultDef = {
      noise: [0, 0, 0, 0, 0, 0, 0, 0],
      ...def[i],
      status: true,
      dataInteraction: {
        correct: 0,
        incorrect: 0,
      },
      elementArtifact: {
        inputsValues: [],
      },
    };

    $inputs.forEach((inp, index) => {
      inp.classList.add('inputs_' + i);
      inp.setAttribute('id', inp.id + '_' + i);
      if (def[i].inputs[index]) {
        inp.value = def[i].inputs[index];
        inp.setAttribute('disabled', 'disabled');
      }

      inp.addEventListener('keyup', () => {
        defaultDef.status = false;
      });
    });

    $btnVoid.setAttribute('data-text', '∄');
    $btnVoid.addEventListener('click', (e) => {
      if (inputActive) {
        def[key].status = false;
      }
      targetStart = inputActive.selectionStart;
      targetEnd = inputActive.selectionEnd;
      inputActive.setRangeText($btnVoid.dataset.text, targetStart, targetEnd);
    });

    $board.dataset.board = def[i].board;
    $clone.setAttribute('id', i);
    $btnSend.addEventListener('click', (e) => {
      defValidation(key);
    });
    $btnReset.addEventListener('click', () => {
      defReset(key);
    });
    $fragmen.appendChild($clone);
    def[i] = defaultDef;
  }
  $main.appendChild($fragmen);
}

function defValidation(artifact) {
  bridge = [-0.5, -2.5];
  const regex = /([A-z]|[^\(\)0.1-9/+*-])/g;
  def[artifact].dataInteraction.incorrect = 0;
  def[artifact].dataInteraction.correct = 0;
  def[artifact].dataInteraction.forAnswer = 0;
  if (!def[artifact].status) {
    def[artifact].status = true;
    const inputs = document.querySelectorAll('.inputs_' + artifact);
    def[artifact].elementArtifact.inputsValues = [...inputs].map(
      (e) => e.value
    );

    inputs.forEach((inp, i) => {
      const input = inp.value
        .replace(new RegExp('[\' \']', 'g'), '')
        .toLocaleLowerCase();
      const inputCondition = def[artifact].conditions.inputs[i];
      if (!def[artifact].inputs[i]) {
        if (artifact == 'artifact_5' && (i == 2 || i == 6)) {
          const remov = bridge.findIndex((e) =>
            null == input.match(regex) && noiseRange(parseFloat(e), input, def[artifact]?.noise[i])
          );

          if (input !== '') {
            if (remov != -1) {
              def[artifact].dataInteraction.correct += 1;
              inp.style.backgroundColor = 'rgba(73, 225, 94, 0.4)';
              bridge.splice(remov, 1);
            } else {
              inp.style.backgroundColor = 'rgba(203,78,31,0.4)';
              def[artifact].dataInteraction.incorrect += 1;
            }
          } else {
            def[artifact].dataInteraction.forAnswer += 1;
            inp.style.backgroundColor = 'white';
          }
        } else {
          if (input !== '') {
            if (
              (input !== '∄' && null == input.match(regex) &&
                noiseRange(
                  parseFloat(inputCondition),
                  input,
                  def[artifact]?.noise[i]
                )) ||
              ('∄' == inputCondition && inputCondition == input)
            ) {
              def[artifact].dataInteraction.correct += 1;
              inp.style.backgroundColor = 'rgba(73, 225, 94, 0.4)';
            } else {
              inp.style.backgroundColor = 'rgba(203,78,31,0.4)';
              def[artifact].dataInteraction.incorrect += 1;
            }
          } else {
            def[artifact].dataInteraction.forAnswer += 1;
            inp.style.backgroundColor = 'white';
          }
        }
      }
    });
    if (
      typeof Android !== 'undefined' &&
      typeof Android.sendData === 'function'
    ) {
      Android.sendData(JSON.stringify(cleanData(artifact)));
      // La función Android.sendData(json) está disponible
    } else {
      sendData(cleanData(artifact));
      console.log({
        messageError:
          'Esta funcion no se encuentra definida o no esta en el mismo ambito',
      });
    }
  }
}

function defReset(artifact) {
  if (!def[artifact].status) {
    def[artifact].status = true;
  }
  for (let i = 1; i < 9; i++) {
    const inp = document.querySelector('#input_' + i + '_' + artifact);
    if (inp.getAttribute('disabled')) {
      continue;
    }
    inp.value = '';
    inp.style.backgroundColor = 'white';
  }
  bridge = [-0.5, -2.5];
}

function initMain() {
  createHtml();
  defBoardDefault();
}

function cleanData(artifact) {
  let auxResult = {};
  auxResult = { results: def[artifact].dataInteraction };
  //auxResult.artifact = Number(artifact.split("_").at(-1));
  auxResult.artifact = Number(
    artifact.split('_')[artifact.split('_').length - 1]
  );
  def[artifact].typeArtifact == "Evaluation" ? (auxResult.typeArtifact = 'Evaluation') : (auxResult.typeArtifact = 'Standard')

  // auxResult.typeArtifact = 'Standard';
  auxResult.elementArtifact = def[artifact].elementArtifact;
  if (def[artifact].yellow) {
    auxResult.typeArtifact = 'Yellow';
    delete auxResult.results;
  }

  //auxResult.idMoodle = $idMoodle;
  return auxResult;
}

function noiseRange(value1, value2, noise = 0.25) {
  const mat = Math.abs(Number(value1) - evaluaArimetica(value2));
  return Number(mat.toFixed(4)) <= noise;
}

function evaluaArimetica(fn) {
  return new Function('return ' + fn)();
}
