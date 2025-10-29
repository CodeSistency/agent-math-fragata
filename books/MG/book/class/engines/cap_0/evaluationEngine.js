let formatedArtifacP2;
let timeStampInicio;
let activeButtonScroll = false;
var globalPdf;
let currentStep = 1;
let userObjectVar
const imgUrl = typeof Android == 'undefined' ? "/gateway/file/MG/ASS" : "../../../assets"
const exams = {
  model_1: {
    sections: [
      {
        artifacts: ['artifact_2', 'artifact_9', 'artifact_17'],
      },
      {
        artifacts: ['artifact_1', 'artifact_9', 'artifact_17', 'artifact_25'],
      },
    ],
  },
  model_2: {
    sections: [
      {
        artifacts: ['artifact_2', 'artifact_10', 'artifact_18'],
      },
      {
        artifacts: ['artifact_2', 'artifact_10', 'artifact_18', 'artifact_26'],
      },
    ],
  },
  model_3: {
    sections: [
      {
        artifacts: ['artifact_3', 'artifact_11', 'artifact_19'],
      },
      {
        artifacts: ['artifact_3', 'artifact_11', 'artifact_19', 'artifact_27'],
      },
    ],
  },
  model_4: {
    sections: [
      {
        artifacts: ['artifact_4', 'artifact_12', 'artifact_20'],
      },
      {
        artifacts: ['artifact_4', 'artifact_12', 'artifact_20', 'artifact_28'],
      },
    ],
  },

  model_5: {
    sections: [
      {
        artifacts: ['artifact_5', 'artifact_13', 'artifact_21'],
      },
      {
        artifacts: ['artifact_5', 'artifact_13', 'artifact_21', 'artifact_29'],
      },
    ],
  },

  model_6: {
    sections: [
      {
        artifacts: ['artifact_6', 'artifact_14', 'artifact_22'],
      },
      {
        artifacts: ['artifact_7', 'artifact_15', 'artifact_23', 'artifact_31'],
      },
    ],
  },

  model_7: {
    sections: [
      {
        artifacts: ['artifact_7', 'artifact_15', 'artifact_23'],
      },
      {
        artifacts: ['artifact_8', 'artifact_16', 'artifact_24', 'artifact_32'],
      },
    ],
  },

  model_8: {
    sections: [
      {
        artifacts: ['artifact_8', 'artifact_16', 'artifact_24'],
      },
      {
        artifacts: ['artifact_8', 'artifact_16', 'artifact_24', 'artifact_32'],
      },
    ],
  },
};
let savedResults = [
  {
    id: 'P1',
    name: 'Intervalos',
    items: [
      { name: 'R. en la recta ', value: 0 },
      { name: 'R. algebraica', value: 0 },
    ],
    tiempo: 0,
    intentos: 0,
  },
  {
    id: 'P2',
    name: 'Intervalos',
    items: [
      { name: 'R. en la recta ', value: 0 },
      { name: 'R. algebraica', value: 0 },
    ],
    tiempo: 0,
    intentos: 0,
  },
  {
    id: 'P3',
    name: 'Intervalos',
    items: [
      { name: 'R. en la recta ', value: 0 },
      { name: 'N. de intervalos ', value: 0 },
    ],
    tiempo: 0,
    intentos: 0,
  },
  { id: 'P4', name: 'Plano Cartesiano', items: [0, 0], tiempo: 0, intentos: 0 },
  { id: 'P5', name: 'Plano Cartesiano', items: [0, 0], tiempo: 0, intentos: 0 },
  { id: 'P6', name: 'Plano Cartesiano', items: [0, 0], tiempo: 0, intentos: 0 },
  { id: 'P7', name: 'Plano Cartesiano', items: [0, 0], tiempo: 0, intentos: 0 },
];
async function setPDF() {
  if (typeof Android !== 'undefined') {
    return null;
  }
  const { jsPDF } = window.jspdf;
  const element = document.getElementById('mainContent');
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const width = canvas.width;
  const height = canvas.height;
  const maxWidth = 210;
  const maxHeight = 297;
  let ratio = Math.min(maxWidth / width, maxHeight / height);

  const pdf = new jsPDF();
  const x = (210 - width * ratio) / 2; // 210 es el ancho del papel a4
  pdf.addImage(imgData, 'PNG', x, 10, width * ratio, height * ratio - 20);
  return pdf;
}
async function printPDF(pdf) {
  if (typeof Android !== 'undefined') {
    Android.sendPdf();
  } else {
    const { chapter, firstName, surname } = userObjectVar
    pdf.save(`Evaluación_capítulo_${chapter}_${firstName}_${surname}.pdf`);
  }
}

function EventsButtonScroll() {
  const buttonScroll = document.querySelector('#buttonScroll');
  buttonScroll.style.display = 'none';
  buttonScroll.onclick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  window.addEventListener('scroll', () => {
    if (activeButtonScroll && window.scrollY > 20) {
      buttonScroll.style.display = 'block';
    } else {
      buttonScroll.style.display = 'none';
    }
  });
}
function evaluationBuilder(userObject) {
  try {
    EventsButtonScroll();
    const requiredProperties = [
      'opportunity',
      'liceo',
      'universidad',
      'courseName',
      'idUser',
      'idExam',
      'evaluationModel',
      'firstName',
      'secondName',
      'surname',
      'secondSurname',
      'gender',
      'email',
      'userStartTime',
      'userEndTime',
      'result',
      'availabilityStartDate',
      'availabilityEndDate',
      'chapter',
    ];
    if (userObject == null || userObject == undefined) {
      warningAlerts(
        'No se declaro la información del usuario.',
        'No se pudo cargar la evaluación.',
      );
      return false;
    }
    const allExist = requiredProperties.filter((prop) => !(prop in userObject));
    if (allExist.length > 0) {
      warningAlerts(
        'No se declararon todas las propiedades del usuario.',
        'No se pudo cargar la evaluación.',
      );
      return false;
    }
    userObjectVar = userObject
    buildInformationCard(userObject);
    document.querySelector('#mainContent').style.display = 'block';
    document.querySelector('#loading-container').style.display = 'none';
    if (userObject.result.length > 0) {
      document.getElementById('middle-container').style.visibility = 'visible';
      document.getElementById('rules').style.display = 'none';
      currentStep = 3;
      savedResults = userObject.result;
      renderTableView(savedResults, userObject);
      document.getElementById('button-rules').textContent = 'Imprimir PDF';
    } else {
      const dateObject = new Date();
      const infoCardBody = document.querySelector('.information_card__body');
      const body__date = infoCardBody.querySelector(".information_card__body__date")
      if (!body__date) {
        infoCardBody.insertAdjacentHTML(
          'beforeend',
          `
      <div class="information_card__body__date">
      <p class="body__date__key">Fecha de presentación: </p>
      <p class="body__date__value">${dateObject.toLocaleDateString('es-ES')}</p>
      </div>`,
        );
      }
      document.querySelector('#middle-container').style.visibility = 'visible';
    }

    let currentDate = new Date();
    timeStampInicio = currentDate.toISOString();
    document.addEventListener('click', async (e) => {
      if (e.target.id == 'button-rules') {
        if (currentStep == 1) {
          currentStep += 1;
          document.getElementById('rules').style.display = 'none';

          document.getElementById('evaluation-content').style.display = 'block';
          document.getElementById('button-rules').textContent =
            'Enviar evaluación';
          generateArtifacts(userObject.evaluationModel);

          window.scrollTo(0, 0);

          let index = 3;
          document
            .querySelectorAll('.defCartesian .check')
            .forEach((element) => {
              let artifactNode =
                element.closest('[data-artifact]') ||
                element.closest('[id^="artifact_"]');
              const infoPoints =
                formatedArtifacP2[artifactNode.dataset.artifact].conditions
                  .points;
              savedResults[index].items = infoPoints.map((item) => ({
                value: 0,
                name: 'Coordenada: (' + item.text.replace("(", "").replace(")", "") + ')',
              }));
              index++;
            });
        } else if (currentStep == 2) {

          globalPdf = await setPDF();
          const modalBack = document.getElementById('modal');
          modalBack.style.display = 'flex';
          document.querySelector('.modal-content')?.remove();
          const modal = generateModal({
            father: modalBack,

            img: {
              src: imgUrl + '/cap_0/warning.svg',
              class: 'modal-header-image',
            },
            title: '¿Deseas enviar la evaluación?',
            text: 'Una vez enviada la evaluación, no podrás realizar cambios.',
            firstButton: {
              text: 'No',
              class: 'button-cancel text-Azulado',
              onClick() {
                modalBack.style.display = 'none'
                modal.remove()
              }
            },
            secondButton: {
              text: 'Sí',
              class: 'button-continue',

              onClick: async () => {
                modal.remove();
                const sendSummaryRes = await executeSendSumary(
                  savedResults,
                  userObject,
                );
                if (
                  typeof Android !== 'undefined' ||
                  sendSummaryRes.code == 200
                ) {
                  currentStep++;
                  modalPrevResults(userObject);
                } else {
                  const modalResend = generateModal({
                    father: modalBack,
                    img: {
                      src: imgUrl + '/cap_0/warning.svg',
                      class: 'modal-header-image',
                    },
                    title: sendSummaryRes.message,
                    text: '¿Quieres intentarlo nuevamente?',
                    secondButton: {
                      text: 'Reintentar',
                      class: 'button-continue',
                      onClick: async (e) => {
                        if (e.target.innerText == 'Reintentando...') return;
                        e.target.innerText = 'Reintentando...';
                        const sendSummaryRes = await executeSendSumary(
                          savedResults,
                          userObject,
                        );
                        if (sendSummaryRes.code != 200) {
                          e.target.innerText = 'Reintentar';
                        } else {
                          currentStep++;
                          modalResend.remove();
                          modalPrevResults(userObject);
                        }
                      },
                    },
                    firstButton: {
                      text: 'Cancelar',
                      class: 'button-cancel text-Azulado',
                      onClick: () => {
                        modalResend.remove();
                        document.getElementById('modal').style.display = 'none';
                      },
                    },
                  });

                }
              },
            },
          });
          window.scrollTo(0, 0);
        } else {
          let newPdf = await setPDF();
          await printPDF(newPdf);
        }
        seconds = 0;
      } else if (
        e.target.id == 'closeModal' ||
        e.target.classList.contains('no-button')
      ) {
        document.getElementById('modal').style.display = 'none';
      }
    });
  } catch (err) {
    console.log('error en evaluations', err);
    warningAlerts('Ha ocurrido un error', 'No se pudo cargar la evaluación.');
  }
}
function modalPrevResults(userObject) {

  const modal = generateModal({
    father: document.querySelector('.modal'),
    img: {
      src: imgUrl + '/cap_0/success.svg',
      class: 'modal-header-image',
    },
    title: '¿Desea descargar el PDF de sus respuestas?',
    text: 'Advertencia, no se podra descargar el PDF en otro momento...',
    firstButton: {
      text: 'Descargar PDF',
      class: 'action-button button-download text-Azulado',
      onClick: () => {
        currentStep += 1;
        document.getElementById('modal').style.display = 'none';
        modal.remove();
        userObjectVar = userObject
        printPDF(globalPdf);
        if (typeof Android == 'undefined')
          showTables(userObjectVar);
      },
    },
    secondButton: {
      text: 'Continuar',
      class: 'action-button button-continue',
      onClick: () => {
        currentStep += 1;
        document.getElementById('modal').style.display = 'none';
        modal.remove();
        showTables(userObject);
      },
    },
  });
}

function showTables(userObject = userObjectVar) {
  const buttonRule = document.getElementById('button-rules')
  if (buttonRule.textContent == 'Imprimir PDF') {
    return
  }
  buttonRule.textContent = 'Imprimir PDF';
  document.getElementById('evaluation-content').style.display = 'none';
  renderTableView(savedResults, userObject);
}
/**
 * Proceso para extraer el modelo y renderizar
 */
function generateArtifacts(evaluationModel) {
  //PARA INTERVALOS
  let artifactInteraction;
  let keysToFilter = exams[evaluationModel].sections[0].artifacts;
  let keysToFilter2 = exams[evaluationModel].sections[1].artifacts;
  const filteredArtifacts = keysToFilter.reduce((acc, key) => {
    if (def[key]) {
      // Verificamos si la clave existe en el objeto original
      acc[key] = def[key]; // Agregamos al acumulador
    }
    return acc;
  }, {});
  const filteredArtifacts2 = keysToFilter2.reduce((acc, key) => {
    if (rDef[key]) {
      acc[key] = rDef[key];
    }
    return acc;
  }, {});
  let formatedArtifac = renameKeys(filteredArtifacts);
  const keys = Object.keys(formatedArtifac).sort((a, b) => {
    return parseInt(a.split('_')[1]) - parseInt(b.split('_')[1]);
  });
  const lastKey = keys[keys.length - 1];
  const lastKeyNumber = parseInt(lastKey.split('_')[1]);
  formatedArtifacP2 = renameKeys(filteredArtifacts2, lastKeyNumber + 1);
  generation((def = formatedArtifac));
  formatedArtifacP2.artifactHtml = {
    datadefault: [
      {
        type: 10,
        classGlobal: 'defCartesian',
        contents: [
          {
            dataSet: {
              artifact: 'artifact_4',
            },
          },
          {
            dataSet: {
              artifact: 'artifact_5',
            },
          },
          {
            dataSet: {
              artifact: 'artifact_6',
            },
          },
          {
            dataSet: {
              artifact: 'artifact_7',
            },
          },
        ],
      },
    ],
  };
  generator(formatedArtifacP2);
  mainCartesian(defBoards, formatedArtifacP2);
  let contenedorGrid = document.querySelector('.contenedorGrid');
  contenedorGrid.classList.remove('.justify-content-center');
  contenedorGrid.firstElementChild.classList.remove('justify-content-center');

  let artifacts = document.querySelectorAll('.defCartesian , .artifacts');

  artifacts.forEach((element) => {
    addArtifactHeader(element, element);

    element.addEventListener('click', (e) => {
      if (
        e.target.closest('[data-artifact]') ||
        e.target.closest('[id^="artifact_"]')
      ) {
        let artifactNode =
          e.target.closest('[data-artifact]') ||
          e.target.closest('[id^="artifact_"]');

        if (e.target.classList.contains('check')) {
          e.preventDefault();
          artifactInteraction = handleValidation(
            artifactNode,
            formatedArtifacP2,
            def,
          );
          index = savedResults.findIndex(
            (item) => item.id === artifactInteraction.id,
          );
          artifactNode.parentNode.classList.contains('borderDefault')
            ? (artifactNode.parentNode.style.borderColor = 'yellow')
            : (artifactNode.style.borderColor = 'yellow');
          artifactNode.parentNode.classList.contains('borderDefault')
            ? (artifactNode.parentNode.style.borderWidth = 'medium')
            : (artifactNode.style.borderWidth = 'medium');

          if (index !== -1) {
            artifactInteraction.intentos = savedResults[index].intentos + 1;
            savedResults[index] = artifactInteraction;
          } else {
            savedResults.push(artifactInteraction);
          }
        }
      }
    });
  });
}
function renameKeys(obj, startIndex = 1) {
  const keys = Object.keys(obj).sort((a, b) => {
    return parseInt(a.split('_')[1]) - parseInt(b.split('_')[1]);
  });
  const newObject = keys.reduce((acc, key, index) => {
    acc[`artifact_${startIndex + index}`] = obj[key];
    return acc;
  }, {});

  return newObject;
}
function initEvaluation() {
  if (typeof Android == 'undefined') {
    try {
      let pathname = new URL(document?.referrer ?? '')?.pathname;
      let extractedIdEnroll =
        pathname.split('/')[pathname.split('/').length - 1];
      let idEnroll =
        extractedIdEnroll === 'evaluation.html'
          ? 'ConfigData'
          : extractedIdEnroll;
      let userObject = JSON.parse(localStorage.getItem(idEnroll));
      evaluationBuilder(userObject);
    } catch (err) {
      let userObject = JSON.parse(localStorage.getItem("configData"));
      evaluationBuilder(userObject);
      console.log('CATCH', err);
    }
  } else {
    console.log('android');
  }
}
function handleValidation(artifactNode, formatedArtifacP2, def) {
  let artifactName = null;
  let timeInteraction = 0;
  let questionElement = [];
  let typeArtifact = '';
  if (artifactNode.classList.contains('defCartesian')) {
    typeArtifact = 'Plano Cartesiano';
    let ponintsLength =
      formatedArtifacP2[artifactNode.dataset.artifact].conditions.points.length;
    artifactName = artifactNode.dataset.artifact;
    for (let index = 0; index < ponintsLength; index++) {
      const pointText =
        formatedArtifacP2[artifactNode.dataset.artifact]?.conditions.points?.[
          index
        ]?.text;
      let element =
        formatedArtifacP2[artifactNode.dataset.artifact].points.find((item) => item.input.rendNode.firstElementChild.getAttribute("index") == index)
      const input = element?.input?.rendNode?.firstElementChild
      questionElement.push({
        name: 'Coordenada: (' + pointText.replace("(", "").replace(")", "") + ')',
        value: input?.classList.contains('passInLibrary')
          ? 1
          : 0,
      });
    }
  } else {
    typeArtifact = 'Intervalos';
    let graphElement = artifactNode.querySelector('.jxgbox:not([disabled])');
    let inputOne = artifactNode.querySelector('.inpEngInt1:not([disabled])');
    let inputTwo = artifactNode.querySelector('.inpEngInt2:not([disabled])');
    artifactName = artifactNode.id;
    if (graphElement != null) {
      questionElement.push({
        name: 'R. en la recta ',
        value: graphElement.classList.contains('pass') ? 1 : 0,
      });
    }

    if (inputOne != null) {
      questionElement.push({
        name: 'N. de intervalos ',
        value: inputOne?.classList.contains('pass') ? 1 : 0,
      });
    }

    if (inputTwo != null) {
      questionElement.push({
        name: 'R. algebraica ',
        value: inputTwo.classList.contains('pass') ? 1 : 0,
      });
    }
  }
  const savedResultArtifact = savedResults.find(
    (item) => item.id == `P${artifactName.split('_')[1]}`,
  );
  console.log(seconds);

  timeInteraction = (savedResultArtifact?.tiempo ?? 0) + seconds;
  seconds = 0;
  return {
    id: `P${artifactName.split('_')[1]}`,
    name: typeArtifact,
    items: questionElement,
    tiempo: timeInteraction,
    intentos: 1,
  };
}
async function executeSendSumary(savedResults, userObject) {
  if (savedResults.length == 8) {
    savedResults.pop();
  }
  let currentDate = new Date();
  let timeStampFinal = currentDate.getTime();
  timeStampFinal = currentDate.toISOString();
  let totalResultado = savedResults.reduce((sum, result) => {
    return (
      sum + result.items.reduce((itemSum, item) => itemSum + item.value, 0)
    );
  }, 0);
  savedResults[savedResults.length] = { id: 'NF', resultado: totalResultado };
  userObject.userStartTime = timeStampInicio;
  userObject.userEndTime = timeStampFinal;
  let {
    isDebug,
    category,
    sections,
    chapter,
    evaluationModel,
    universidad,
    courseName,
    liceo,
    availabilityEndDate,
    availabilityStartDate,
    ...filterdObject
  } = userObject;
  let finalToSend = {
    ...filterdObject,
    qualification: savedResults[savedResults.length - 1].resultado,
    result: savedResults,
  };
  if (
    typeof Android !== 'undefined' &&
    typeof Android.sendExam === 'function'
  ) {
    Android.sendSummary(JSON.stringify(finalToSend));
    return { code: 200 };
  } else {
    if (typeof sendSummary === 'function') {
      const response = await sendSummary(finalToSend);
      return response;
    }
  }
}
function renderTableView(savedResults, userObject) {
  activeButtonScroll = true;
  savedResults.pop();
  const bigOne = document.getElementById('tables-container__main');
  let resultTableData = savedResults.reduce(
    (acc, item) => {
      acc.intentos += item.intentos;
      const artifactCount = item.items.reduce(
        (acc, item) => acc + item.value,
        0,
      );
      acc.total += item.items.length;
      acc.note += artifactCount;
      acc.artifact.push({
        nameClass: 'cursorPointer',
        name: `Artefacto ${item.id.split('')[1]}`,
        value: artifactCount + '/' + item.items.length,
        onclick: () => {
          const table = document.querySelector('#' + item.id);
          const tableOffset = table?.offsetTop;
          if (tableOffset)
            window.scrollTo({
              top: tableOffset - 50,
              behavior: 'smooth',
            });
        },
      });
      return acc;
    },
    { total: 0, note: 0, artifact: [], tiempo: 0, intentos: 0 },
  );
  const time = timeCalc(userObject.userStartTime, userObject.userEndTime);
  createTables({
    father: bigOne,
    cardTitle: 'Resultado',
    intentos: resultTableData.intentos,
    tiempo: time,
    headers: ['Artefacto', 'Nota'],
    rows: [
      ...resultTableData.artifact,
      {
        name: 'Total',
        nameClass: 'result__name',
        value: resultTableData.note + '/' + resultTableData.total,
        class: 'result__row',
      },
    ],
  });
  savedResults.forEach((item) => {
    createTables({
      father: bigOne,
      tableId: item.id,
      cardTitle: `<div>Artefacto ${item.id.split('')[1]} </div><div> ${item.name}</div>`,
      intentos: item.intentos,
      tiempo: item.tiempo,
      headers: ['Items', 'Puntos'],
      rows: item.items,
    });
  });
  const dateObject = new Date(userObject.userEndTime ?? '');
  const infoCardBody = document.querySelector('.information_card__body');
  infoCardBody.insertAdjacentHTML(
    'afterbegin',
    `        <div class="information_card__body__note"><p>Nota: <span class="body__note__span">${resultTableData.note}</span><span class="body__note__separator">|</span> Tiempo: ${(time / 60).toFixed(2)} Min</p> </div>
        `,
  );
  const body__date = infoCardBody.querySelector(".information_card__body__date")
  if (!body__date) {
    infoCardBody.insertAdjacentHTML(
      'beforeend',
      `
      <div class="information_card__body__date">
      <p class="body__date__key">Fecha de presentación: </p>
      <p class="body__date__value">${dateObject.toLocaleDateString('es-ES')}</p>
      </div>`,
    );
  }
  if (window.innerWidth > 600) {
    minimo = -90;
    maximo = 20;
  } else {
    minimo = -300;
    maximo = 20;
  }
}
function createTables({
  father,
  tableId,
  cardTitle,
  rows = [],
  headers = [],
  intentos,
  tiempo,
}) {
  const table = document.createElement('table');
  table.classList.add('table__class');
  table.innerHTML = `
    <tr class="table__title"><td colspan="2">${cardTitle}</td> </tr>
    <tr class="table__headers">
    <td>${headers.join('</td><td>')}</td></tr>`;
  const tableBody = table.querySelector('tbody');
  rows.forEach((item) => {
    const row = document.createElement('tr');
    row.onclick = item.onclick ?? null;
    row.classList.add(item?.class ?? 'table__row');
    row.innerHTML = `
            <td class="${item?.nameClass}"> ${item.name}</td>
            <td class="${item?.valueClass}" style="text-align:center">${item.value}</td>`;
    tableBody.appendChild(row);
  });
  tableBody.insertAdjacentHTML("beforeend", `
      ${typeof intentos != 'undefined'
      ? `<tr class="result__row">
        <td class="result__name"> Intentos</td>
            <td class="result__value" style="text-align:center">${intentos}</td>
        </tr>`
      : ''
    }
        ${typeof intentos != 'undefined'
      ? `<tr class="result__row">
        <td class="result__name"> Tiempo/Seg</td>
            <td class="result__value" style="text-align:center">${tiempo}</td>
        </tr>`
      : ''
    }
    `);
  if (tableId) {
    table.setAttribute('id', tableId);
  }
  father.appendChild(table);
}
function timeCalc(timestamp1, timestamp2) {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);
  const diferenciaEnSegundos =
    Math.abs(date2.getTime() - date1.getTime()) / 1000; // En segundos
  return diferenciaEnSegundos.toFixed(2);
}
function addArtifactHeader(artifact, artifactName) {
  let art = artifactName?.id || artifactName?.dataset.artifact;
  let i = art?.split('_')[1];

  let divPregunta = document.createElement('div');
  divPregunta.classList.add('header-artifact-container');

  let spanPregunta = document.createElement('span');
  spanPregunta.style.float = 'left';
  spanPregunta.textContent = 'Artef. 1';
  spanPregunta.classList.add('question-header');
  spanPregunta.textContent = `Artefacto ${i}`;

  let spanPuntaje = document.createElement('span');
  spanPuntaje.style.float = 'right';
  spanPuntaje.textContent =
    i == 4 || i == 6 ? '4 Pts' : i < 4 ? '2Pts' : '3P ts';
  spanPuntaje.classList.add('oval-container');
  divPregunta.appendChild(spanPregunta);
  divPregunta.appendChild(spanPuntaje);

  if (
    artifact.parentNode.classList.contains('borderDefault') ||
    artifact.parentNode.id == 'container-all-artifact'
  ) {
    let primerHijo = artifact.firstElementChild;
    artifact.insertBefore(divPregunta, primerHijo);
  }

  // artifact.appendChild(divPregunta)
}

function warningAlerts(message = '', title = '') {
  if (typeof Android !== 'undefined') {
    Android?.showDialog('warning', message);
  } else {
    const modalBack = document.getElementById('modal');
    modalBack.style.display = 'flex';
    const modal = generateModal({
      father: modalBack,
      img: {
        src: imgUrl + '/cap_0/warning.svg',
        class: 'modal-header-image',
      },
      title: title,
      text: message,
      firstButton: {
        text: 'Aceptar',
        onClick: async () => {
          window.history.back();
        },
      },
    });
  }
}
function generateModal({
  father,
  title = 'Titulo',
  text = '',
  img,
  header,
  firstButton,
  secondButton,
  modalClass = 'modal-content',
}) {
  if (!father) return;
  const imgDefault = {
    src: '',
    imgClass: 'class',
    ...img,
  };
  const buttonsTemplate = {
    imgRute: '',
    text: '',
    class: 'action-button yes-button',
    onClick: null,
  };
  const buttons = [
    firstButton ? { ...buttonsTemplate, ...firstButton } : null,
    secondButton ? { ...buttonsTemplate, ...secondButton } : null,
  ];
  const modalNode = document.createElement('div');
  modalClass.split(' ').forEach((item) => modalNode.classList.add(item));
  const childModal = document.createElement('div');
  if (header) {
    childModal.insertAdjacentHTML('afterbegin', header);
  }
  childModal.insertAdjacentHTML(
    'afterbegin',
    `<p class="titleModal">${title}</p> ${text != '' ? "<p class='p-modal'>" + text + '</p>' : ''} `,
  );
  if (imgDefault.src != '') {
    childModal.insertAdjacentHTML(
      'afterbegin', imgUrl + '/cap_0/success.svg' == imgDefault.src ?
      `<svg class="${imgDefault.class}" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="none" stroke="#7edc86" stroke-linejoin="round" stroke-width="4"><path d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"/><path stroke-linecap="round" d="m16 24l6 6l12-12"/></g></svg>` :
      `<svg class="${imgDefault.class}" xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="#f8bb86" d="M128 28a100 100 0 1 0 100 100A100.11 100.11 0 0 0 128 28m0 192a92 92 0 1 1 92-92a92.1 92.1 0 0 1-92 92m-4-84V80a4 4 0 0 1 8 0v56a4 4 0 0 1-8 0m12 36a8 8 0 1 1-8-8a8 8 0 0 1 8 8"/></svg>`
    );
  }
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('button-container');
  buttons.forEach((item) => {
    if (!item) return;
    const buttonNode = document.createElement('button');
    if (item.onClick) {
      buttonNode.onclick = item.onClick;
    }
    item.class.split(' ').forEach((item) => buttonNode.classList.add(item));
    buttonNode.innerHTML = `${item.imgRute != '' ? `<img src="${item.imgRute}">` : ''} ${item.text}`;
    buttonsContainer.appendChild(buttonNode);
  });
  childModal.appendChild(buttonsContainer);
  modalNode.appendChild(childModal);
  father.appendChild(modalNode);
  return modalNode;
}
function buildInformationCard(userObject) {
  const categorys = { "Educacion_superior": "Educación universitaria", "Educacion_media": "Educación media" }
  const infoCardBody = document.querySelector(
    '.information_card>.information_card__body',
  );
  const bodyLeft = infoCardBody.querySelector('.information_card__body__left');
  const bodyRight = infoCardBody.querySelector(
    '.information_card__body__right',
  );
  const keyLeft = {
    'Nombre y Apellido': userObject.firstName + ' ' + userObject.surname,
    Correo: userObject.email,
    Capítulo: userObject.chapter,
    'Modelo de evaluación': userObject.evaluationModel.replace('model_', ''),
  };
  const keyRight = {
    Categoría: categorys?.[userObject.category],
    Curso: userObject.courseName,
    Institución:
      userObject.universidad && userObject.universidad != ''
        ? userObject.universidad
        : userObject.liceo,
    Sección: userObject.sections,
  };
  bodyLeft.innerHTML = Object.entries(keyLeft)
    .map(
      ([key, value]) => `
    <div class="info__text">
    <p>
    <span class="body__left__key">${key}:</span>
    <span class="body__left__value">${value}</span>
    </p>
    </div>`,
    )
    .join('');
  bodyRight.innerHTML = Object.entries(keyRight)
    .map(
      ([key, value]) => `
    <div class="info__text">
    <p>
    <span class="body__right__key">${key}:</span>
    <span class="body__right__value">${value}</span>
    </p>
    </div>`,
    )
    .join('');
}
