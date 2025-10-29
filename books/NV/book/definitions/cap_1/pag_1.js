const textUtils = {
  artifacts: {
    artifact_1: {
      parent: "main-content",
      nodo: [
        {texto: " Palabras para los estudiantes.", etiqueta: "h1"},
        {
          texto:
            'Este "cuaderno estructurado" ha sido hecho pensando en ti, en tu desarrollo personal y en tu mente, en tu relación con la matemática. Favoreciendo tu aprendizaje queremos que le pierdas el miedo y aprendiendo bien, aprendas a quererla. Esperamos que te lleve a descubrir un nuevo mundo.',
          atributos: {style: "text-align:justify"},
        },
        {
          texto: "<b>Algunos consejos:</b>",
          atributos: {style: "text-align:left;margin-top: 20px;"},
        },
        {
          texto:
            "Tu curiosidad es importante. Toma el estudio del cuaderno como un paseo. Como los paseos por la montaña, aveces cuando la cuesta es muy inclinada o empinada, deberás ponerle un poco de voluntad. Como los paseos en el mar, donde debes nadar, deberás ponerle un poco de constancia, para llegar a donde te has propuesto.",
          atributos: {style: "text-align:justify"},
        },
        {
          texto:
            "Es muy importante tratar de hacer las cosas bien. Y sobre todo aprender bien. Nunca se sabe lo suficiente. Después de que sientas que sabes hacer algo, debes preocuparte por saberlo hacer tan bien que lo puedas hacer rápido, sin errores y con pocos titubeos.",
          atributos: {style: "text-align:justify"},
        },
        {
          texto:
            "Repasar, re-pasar, quiere decir volver a pasar. Nunca se pasa de la misma manera por un sitio. Siempre hay algo nuevo que ver. Cuando repases hazlo sin angustia, hojeando casi descuidadamente, dejando que tu mente divague, recordando a veces cómo te sentiste cuando hiciste lo que estás re-pasando: dejando que los recuerdos se conecten con el presente. Descubriendo, si se da el caso, cómo aquello que hiciste está relacionado con lo nuevo que estás aprendiendo.",
          atributos: {style: "text-align:justify"},
        },
        {
          texto:
            "Siempre conviene comentar entre compañeros y compañeras lo que han hecho, las dudas que tienen o tuvieron. Si sientes que no entiendes, pide explicaciones. Si alguien te pide explicaciones y tú estás en capacidad de darlas, dalas con agrado. Si no estás en capacidad de darlas, dilo sin avergonzarte. Ayudarse entre todos es muy importante. Todo esto te ayudará a ejercer tu <i>derecho a comprender</i>.",
          atributos: {style: "text-align:justify"},
        },
        {
          texto: "Los Cinco Mandamientos de Matemáticas",
          etiqueta: "h1",
          atributos: {style: "margin-top: 20px;"},
        },
        {texto: "ASISTE A CLASES", atributos: {style: "margin-top: 20px;"}},
        {texto: "ATIENDE LAS EXPLICACIONES DEL PROFESOR"},
        {texto: "PREGUNTA CADA VEZ QUE NO ENTIENDAS"},
        {texto: "HAZ TODAS LAS TAREAS"},
        {texto: "PRACTICA CADA VEZ QUE PUEDAS"},
        {texto: "PRACTICA CADA VEZ QUE PUEDAS"},
        {texto: "PRACTICA CADA VEZ QUE PUEDAS"},
        {texto: "PRACTICA CADA VEZ QUE PUEDAS"},
        {texto: "PRACTICA CADA VEZ QUE PUEDAS"},
      ],
      styleContainer: "note-text",
      engine: EngineOwner,
    },
  },
};

const contentMain = new CreateView(textUtils);
