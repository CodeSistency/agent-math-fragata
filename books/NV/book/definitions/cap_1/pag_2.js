const textUtils = {
  artifacts: {
    artifact_1: {
      parent: "main-content",
      nodo: [
        {texto: "Palabras para los profesores", etiqueta: "h1"},
        {
          texto:
            'El material que se presenta, en forma de "cuaderno estructurado" cubre a grosso modo el programa tradicional del primer año de bachillerato, con detalle y profundidad. La presentación moderna de dichos contenidos se hace utilizando una ingeniería didáctica que facilita la comprensión y la actividad de los estudiantes.',
          atributos: {style: "text-align:justify"},
        },
        {
          texto:
            "Los profesores, que han utilizado en aula este tipo de material didáctico, han podido constatar que facilita, exige y prácticamente impone una dinámica de clase diferente a la habitual. La actividad estudiantil se incrementa enormemente. El seguir paso a paso las pautas dadas por el cuaderno es un trabajo exigente, debido a que éste define un ritmo al cual la mayoría de docentes no está acostumbrada. Sin embargo, los frutos serán palpables al final del curso.",
          atributos: {style: "text-align:justify"},
        },
        {
          texto:
            "Exámenes del mismo tipo y calidad que los modelos incluidos al final de cada capítulo del cuaderno pueden ser solicitados directamente a editorialauna@gmail.com. Esto aligera considerablemente el trabajo del profesor. En www.editorialauna.com podrá consultar y descargar materiales de apoyo relacionados al cuaderno, a la planificación de lapso y más en general a la ingeniería didáctica subyacente.",
          atributos: {style: "text-align:justify"},
        },
        {
          texto: "Caracas, Septiembre 2014",
          atributos: {style: "text-align:left"},
        },
        {texto: "Convenciones", etiqueta: "h1"},
        {
          texto: "El cuaderno está estructurado en tres tipos de partes:",
          atributos: {style: "text-align:left"},
        },

        {
          texto:
            "<div class= 'complemento'><p><b>Léxico:</b> indispensable al inicio de los tópicos o actividades nuevas.</p><p><b>Clase:</b> son las actividades que se hacen en aula.</p> <p><b>Tarea:</b> las actividades que se hacen fuera del aula.</p></div>",
          etiqueta: "div",
          atributos: {
            class: "divAuxiliar",
          },
        },
        {
          texto:
            "Las actividades, ejercicios o problemas son hechas o bien por el profesor en la pizarra o bien por los estudiantes, en sus cuadernos.",
          atributos: {style: "text-align:left"},
        },

        {
          texto:
            "<table><tr><td style= 'border: 3px solid var(--azulOscuro)'>Actividad</td> <td style= 'border:solid transparent'>La debe hacer el profesor en la pizarra para orientar al estudiante.</td></tr> <tr><td style= 'border: 1px solid var(--azulOscuro)'>Actividad</td><td style= 'border:solid transparent'>La debe hacer el estudiante en aula (si está en CLASE) o fuera de aula (si está en TAREA).</td></tr></table>",
          etiqueta: "div",
          atributos: {class: "divAuxiliar"},
        },
        {
          texto: "Agradecimientos",
          etiqueta: "h1",
          atributos: {style: "margin-top: 40px "},
        },
        {
          texto:
            "Agradezco a numerosos colegas, alumnos y amigos que, de una u otra forma, me han animado y orientado. Agradezco muy especialmente el caluroso apoyo que he recibido de los docentes que utilizaron los primeros cuadernos estructurados.",
          atributos: {style: "text-align:justify "},
        },
      ],
      styleContainer: "note-text",
      engine: EngineOwner,
    },
  },
};

const contentMain = new CreateView(textUtils);
