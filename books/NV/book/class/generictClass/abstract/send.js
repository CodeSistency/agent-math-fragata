class DataSender {
  constructor() {
    this.idEnroll = null;
    this.personalInformation = null;
    this.getPersonalInformation();
  }

  // Extrae la información personal desde localStorage
  getPersonalInformation() {
    let pathname = "";

    try {
      const referrer = document.referrer;
      if (referrer) {
        pathname = new URL(referrer).pathname;
      }
    } catch (error) {
      console.error("Error al procesar el referrer:", error);
    }

    // Ahora `pathname` estará vacío si el referrer no es válido

    this.idEnroll = pathname.split("/")[2];
    this.personalInformation =
      JSON.parse(localStorage.getItem(this.idEnroll)) || {};
  }

  isValid(interaction) {
    const result = interaction?.results;
    if (!result) return false;
    return (
      result.correct > 0 && result.incorrect === 0 && result.forAnswer === 0
    );
  }

  // Envía los datos al servidor
  sendData(modelSendData) {
    this.personalInformation = this.personalInformation;

    if (
      !this.personalInformation.category ||
      !this.personalInformation._idCourse
    ) {
      console.warn("Faltan datos de usuario, no se envía la solicitud");
      return;
    }
    // this.personalInformation = this.getPersonalInformation();
    // if (!this.personalInformation.category || !this.personalInformation._idCourse) {
    //     console.warn("Faltan datos de usuario, no se envía la solicitud");
    //     return;
    // }

    const data = {
      ...this.personalInformation,
      interactions: modelSendData,
    };

    const artifactIsValid = this.isValid(data.interactions[0]);

    if (artifactIsValid && data.interactions.typeArtifact !== "Load") {
      const url = "/";
      const newArtifactTrue = {
        nameArtifact: `artifact_${data.interactions[0].artifact}`,
        status: true,
        originService: "NV",
      };

      window.parent.postMessage(JSON.stringify(newArtifactTrue), url);
    }
    if (modelSendData.seconds !== undefined)
      modelSendData.seconds = this.seconds;

    const paramRequest = {
      method: "POST",
      mode: "cors",
      headers: {"Content-Type": "application/json;charset=UTF-8"},
      body: JSON.stringify(data),
    };

    fetch(new Request("/gateway/rabbitmq/:interactions", paramRequest))
      .then(res => res.json())
      .then(res => {
        if (res.code === "200") {
          console.log("Success " + res.message);
        } else {
          console.warn("Error", res.message, "con el código:", res.code);
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.seconds = 0;
      });
  }

  // Genera progreso (simulación de función)
  getChapterNumber() {
    const path = window.location.pathname;
    const segments = path.split("/");
    const folderName = segments[segments.length - 2];
    return folderName.match(/\d+/)
      ? parseInt(folderName.match(/\d+/)[0])
      : null;
  }

  getPageNumber() {
    // Obtener el pathname actual
    const path = window.location.pathname;

    // Dividir el pathname en segmentos
    const segments = path.split("/");

    // Obtener el último segmento (nombre de la página)
    const pageName = segments[segments.length - 1]; // Ejemplo: "page_3_2"

    // Eliminar todo lo que esté antes del primer número en el último segmento
    const cleanedPageName = pageName.replace(/^[^\d]*(\d.*)$/, "$1");

    // Retornar el nombre limpio
    return cleanedPageName;
  }

  prepareData(data, name, type) {
    const chapterNumber = this.getChapterNumber();
    const pageNumber = this.getPageNumber();
    const date = new Date();
    const typeSend = type;
    if (typeSend == "Load") {
      return this.sendData([
        {
          typeArtifact: "Load",
          chapter: `${chapterNumber}`,
          page: `${pageNumber}`,
          date: `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`,
          hour: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          originMovil: false,
        },
      ]);
    } else if (typeSend == "Standard") {
      return this.sendData([
        {
          typeArtifact: "Standard",
          chapter: `${chapterNumber}`,
          page: `${pageNumber}`,
          date: `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`,
          hour: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          artifact: parseInt(name.toString().replace(/\D/g, "")),
          results: {
            correct: data?.interaction?.correct ?? 0,
            incorrect: data?.interaction?.incorrect ?? 0,
            forAnswer: data?.interaction?.forAnswer ?? 0,
          },
          originMovil: false,
          seconds: data?.timer ?? 0,
        },
      ]);
    } else if (typeSend == "Mobile") {
      const sendDataMobile = {
        typeArtifact: "Standard",
        chapter: `${chapterNumber}`,
        page: `${pageNumber}`,
        date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
        hour: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        artifact: parseInt(name.toString().replace(/\D/g, "")),
        results: {
          correct: data?.interaction?.correct ?? 0,
          incorrect: data?.interaction?.incorrect ?? 0,
          forAnswer: data?.interaction?.forAnswer ?? 0,
        },
        originMovil: false,
        seconds: data?.timer ?? 0,
      };
      return window.Android.sendData(JSON.stringify(sendDataMobile));
    } else if (typeSend == "Rating") {
      return this.sendData([
        {
          typeArtifact: "Rating",
          chapter: `${chapterNumber}`,
          page: `${pageNumber}`,
          date: `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`,
          hour: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          originMovil: false,
          opinion: {
            ...data,
          },
        },
      ]);
    }
  }
}

// Exporta la clase para su uso en otros archivos
