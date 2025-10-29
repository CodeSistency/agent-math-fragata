
var seconds = 0;
(async function (params) {
    sendData(params);
    setInterval(() => {
      seconds++;
    }, 1000);
})();


function numberOfChapterOrPage(params) {
  let urlArray = window.location.pathname.split('/')
  const $definitionUrl = urlArray[urlArray.length - 2] + '/:' + urlArray[urlArray.length - 1];
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
  let personalInformation = JSON.parse(localStorage.getItem('userData'))
  let course = JSON.parse(localStorage.getItem('userCourse'))
  const { ip, collection } = course;
  const date = new Date(); // Objeto de fecha
  const endPoint = `${ip}/movil/sendData/:${collection}`;
  const data = {
    ...personalInformation,
    interactions: [{
      typeArtifact: 'Load',
      chapter: numberOfChapterOrPage(0),
      page: numberOfChapterOrPage(1),
      date:
                date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
      hour: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      ...params,
      originMovil: false
    }],
  };
  if (params) data.interactions[0].seconds = seconds;
  const paramRequest = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: JSON.stringify(data),
  };
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
