const $loading = document.querySelector('#loading'); //Referencia de la section loading
const $container = document.querySelector('#container'); //Referencia del contenedor de los artefactos matematicos
const $viewUrl = $container.getAttribute('data-viewUrl');
const $engineUrl = $container.getAttribute('data-engineUrl');
const $definitionUrl = $container.getAttribute('data-definitionUrl');
let engines = $engineUrl.split(','); //Array de los nombres de los motores
let $idMoodle; //id del usuario en sesion de moodle
let $shortName; //Nombre corto del curso en moodle
let seconds = 0; //Contador de segundos
const ip = 'http://172.17.12.39:3030/'; //Aqui se define tu ip y el puerto de tu maquina

const petitionFetch = async (resource, params) => {
  try {
    const paramsRequest = {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    const myRequest = new Request(`${ip}${resource}${params}`, paramsRequest); //Arma el endpoint y el segundo parametro son los atributos de la request
    const response = await fetch(myRequest);
    const data = await response.text();
    return data;
  } catch (error) {
    return error;
  }
};

const view = async () => {
  if ($viewUrl) {
    //Verifica si esta definida en el DOM esta variable
    try {
      const data = await petitionFetch('view/', $viewUrl); //Peticion al microservicio del siguiente archivo
      $container.insertAdjacentHTML('beforeend', data); //Insercion del codigo html al DOM de moodle
    } catch (error) {
      console.error(error);
    }
  } else {
    console.warn('view sin definir');
  }
};

const engine = async () => {
  if ($engineUrl) {
    for (const iterator of engines) {
      //Recorre si existen multiples motores
      try {
        const $scriptEngine = document.createElement('script'); //Crea una etiqueta para insertar el codigo javascript
        let data = await petitionFetch('engine/', iterator); //Peticion del archivo
        $scriptEngine.textContent = data; //insercion del codigo a la etiqueta
        document.head.appendChild($scriptEngine); //Insercion de la etiqueta al DOM
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    return console.warn('engine sin definir');
  }
};

const definition = async () => {
  if ($definitionUrl) {
    const $scriptDefinition = document.createElement('script');
    try {
      const data = await petitionFetch('definition/', $definitionUrl);
      $scriptDefinition.textContent = data;
      document.head.appendChild($scriptDefinition);
    } catch (error) {
      console.error(error);
    }
  } else {
    return console.warn('definition sin definir');
  }
};

(async function (params) {
  await view();
  await engine();
  await definition();
  $loading.setAttribute('hidden', ''); //Oculta la section de loading
  $container.removeAttribute('hidden'); //Muestra la section de los artefactos matematicos
  $idMoodle =
    document.querySelector('#idMoodle')?.getAttribute('data-idMoodle') ?? null; // Obtener el id del usuario de moodle, sino existe lo setea por defecto null
  $shortName =
    document.querySelector('#idMoodle')?.getAttribute('data-shortName') ?? null; // Obtener el nombre corto del curso de moodle, sino existe lo setea por defecto null

  informationUser();
  sendData(params);
  //Temporalizador en segundos
  setInterval(() => {
    seconds++;
  }, 1000);
})();

function informationUser(params) {
  const $firstName =
    document.querySelector('#idMoodle')?.getAttribute('data-firstname') ?? null;
  const $lastName =
    document.querySelector('#idMoodle')?.getAttribute('data-lastname') ?? null;
  const $email =
    document.querySelector('#idMoodle')?.getAttribute('data-email') ?? null;

  const personalInformation = {
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
  };
  return personalInformation;
}

function numberOfChapterOrPage(params) {
  //Funcion que retorna un dato segun el parametro que le pase (params=0; Retorna el numero del capitulo -- params=1; Retorna el numero de la pagina --  sino tiene parametros retorna un array con ambos datos)
  const regex = /(\d+)/g; //Expresion regular que obtiene los numeros que se encuentra en un string
  let data = $definitionUrl.match(regex); //Array que almacena el numero de capitulo y pagina
  data = data.length > 2 ? [data[0], `${data[1]}.${data[2]}`] : data;
  switch (
    params //Evalua el params recibido para retornar el dato deseado.
  ) {
    case 0:
      return data[0];

    case 1:
      return data[1];

    default:
      return data;
  }
}



function sendData(params) {
  const date = new Date(); // Objeto de fecha
  const endPoint = `${ip}dataBase/:${$shortName}`;

  const personalInformation = informationUser();
  const data = {
    idMoodle: $idMoodle,
    personalInformation,
    interaction: {
      typeArtifact: 'Load',
      chapter: numberOfChapterOrPage(0),
      page: numberOfChapterOrPage(1),
      date:
        date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
      hour: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      ...params,
    },
  };
  if (params) data.interaction.seconds = seconds;

  const paramRequest = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify(data),
  };

  
  if(data.interaction?.results?.correct > 0 && !data.interaction?.results?.incorrect && !data.interaction?.results.forAnswer) {
    typeof updateProgress == 'function' &&  updateProgress({nameNewArtifactTrue:`artifact_${data.interaction.artifact}`, idMoodle:data?.idMoodle})
  }

  
  const myRequest = new Request(endPoint, paramRequest);
  fetch(myRequest)
    .then((res) => res.json())
    .then((res) => {
      console.log('Success ' + res);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      seconds = 0;
    });
}