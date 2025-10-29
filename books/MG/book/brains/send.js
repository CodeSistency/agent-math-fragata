
var seconds = 0;


(async function (params) {
    sendData(params);
    setInterval(() => {
        seconds++;
    }, 1000);
})();

function isValid(interaction) {
    const result = interaction?.results
    if (!result) return false

    const interactionValid = result.correct > 0 && (result.incorrect == 0 && result.forAnswer == 0)
    return interactionValid
}


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
var send = true

function sendData(params) {

    let pathname = window.parent.location?.pathname
    let idEnroll = pathname.split("/")[2]
    let personalInformation = JSON.parse(localStorage.getItem(idEnroll))
    const date = new Date(); // Objeto de fecha
    const endPoint = '/gateway/rabbitmq/:interactions';
    if (!personalInformation?.category || !personalInformation?._idCourse) {
        return
    }
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
    if (data.interactions[0]?.typeArtifact == "Evaluation") {
        let evaluationCode = pathname.split("/")[pathname.split("/").length - 1]
        let opportunity = evaluationCode?.split("-")?.[1]
        data.interactions[0].page = opportunity
    }

    const dataToFront = {
        ...data.interactions[0],
        origin: 'desdeMG'
    }


    if (params) data.interactions[0].seconds = seconds;
    const paramRequest = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(data),
    };
    const myRequest = new Request(endPoint, paramRequest);

    const newArtifactTrue = {
        nameArtifact: `artifact_${data.interactions[0].artifact}`,
        status: true,
        originService: 'MG',
        offLine: false
    }

    const artifactIsValid = isValid({ ...data.interactions[0] })
    const url = '/'

    fetch(myRequest)
        .then((res) => res.json())
        .then((res) => {



            if (res.code == '200') {

                if (artifactIsValid && data.interactions[0].typeArtifact != 'Load') {
                    window.parent.postMessage(JSON.stringify(newArtifactTrue), url);
                    generateProgress({ dataElements: JSON.stringify({ artifactsTrue: [newArtifactTrue.nameArtifact] }), idEnroll, isOfSend: true, offLine: newArtifactTrue.offLine })
                }
                console.log('Success ' + res.message);
                return
            }

            //Error
            console.log("Error");

            newArtifactTrue.offLine = true
            if (artifactIsValid && data.interactions[0].typeArtifact != 'Load') {
                generateProgress({ dataElements: JSON.stringify({ artifactsTrue: [newArtifactTrue.nameArtifact] }), idEnroll, isOfSend: true, offLine: newArtifactTrue.offLine })
            }
            if (data.interactions[0].typeArtifact != 'Load') {
                window.parent.postMessage(JSON.stringify(newArtifactTrue), url);
            }

            console.log(res.status);
            console.log('ERROR', res.message, 'con el codigo:', res.code);
        })
        .catch((error) => {
            console.log("hay error");
            newArtifactTrue.offLine = true
            if (artifactIsValid && data.interactions[0].typeArtifact != 'Load') {
                generateProgress({ dataElements: JSON.stringify({ artifactsTrue: [newArtifactTrue.nameArtifact] }), idEnroll, isOfSend: true, offLine: newArtifactTrue.offLine })
            }
            if (data.interactions[0].typeArtifact != 'Load') {
                window.parent.postMessage(JSON.stringify(newArtifactTrue), url);
            }

            console.log(error);
        })
        .finally(() => {
            seconds = 0;
        });
}
async function sendSummary(body) {
    console.log("Se está llamando sendSummary")
    const endPoint = `/mscourses/evaluations/sendSummary`;
    const paramRequest = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(body),
    };
    try {
        const myRequest = new Request(endPoint, paramRequest);
        const petition = await fetch(myRequest)
        const response = await petition.json()
        console.log('Success ' + response);
        console.log(response);

        console.log("Final de la evalaución")
        return response
    } catch (error) {
        return { code: 502, data: {}, message: error.message }
    }

}
