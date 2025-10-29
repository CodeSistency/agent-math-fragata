
async function generateProgress({ dataElements = '', idEnroll = '', isOfSend = false, isMobile = false, offLine=false }) {

  if (!idEnroll && !isMobile) {
    let pathname = window.parent.location?.pathname
    idEnroll = idEnroll ? idEnroll : pathname.split("/")[2]
  }

  let dataArtifactsTrue = !isOfSend && !isMobile ? localStorage.getItem(`${idEnroll}-ArtifactsTrue`) ?? [] : []

  console.log('-- mobile options --');
  let data = null
  // const artifactsTrue = dataElements?.split("//");

  if (!isOfSend && !isMobile) {

    data = idEnroll && (dataArtifactsTrue.length) ? JSON.parse(dataArtifactsTrue) : false

    if (!data) {
      console.log('idEnroll está vacio', idEnroll); return
    }

  } else {
    if (typeof dataElements == 'string') data = JSON.parse(dataElements)
    else data = dataElements
  }

  //const params = JSON.parse(dataJson)

  const { artifactsTrue } = data

  if (!artifactsTrue) {
    return;
  }
  artifactsTrue.forEach((nameArtifact) => {
    createProgressBorder(nameArtifact,offLine);
  });
}


function createProgressBorder(nameArtifact , offLine = true) {
  console.log(offLine);
  
  const element = seachElement(nameArtifact);
  if (element !== null) {
    element.classList.add(offLine ? 'artifactTrue--offLine' : 'artifactTrue');
  }
  return true;
}




function seachElement(nameArtifact) {
  let element = null;
  const selectors = ['.', '#'];
  const dataSets = ['artifact', 'ejercicio'];

  const elementDom = document.querySelector(`.${nameArtifact}, #${nameArtifact}`);
  element = elementDom !== null ? elementDom : element;


  if (element === null) {
    const elementDom = document.querySelector(
      `[data-artifact=${nameArtifact}],[data-ejercicio=${nameArtifact}]`
    );
    element = elementDom !== null ? elementDom : element;
  }

  if (element !== null) return element;
  return null;
}

//window.Android = {} //descomenta para pasar a version mobile

const interval = setInterval((e) => {
  if (seachElement('artifact_1')) {
    if (typeof window.Android == 'undefined') {
      console.log('-- Loaded the Artifact --');
      clearInterval(interval);
      generateProgress({ dataElements: '', idEnroll: '' });
    }
  }
}, 200);


function updateProgressBorder(artifactsTrue = []) {
  /*  artifactsTrue.forEach((nameArtifact) => {
    createProgressBorder(nameArtifact);
  }); */
  return true
}
