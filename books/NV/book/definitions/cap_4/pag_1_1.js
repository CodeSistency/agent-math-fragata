const textUtils = {
  artifacts: {
    lexico_1: {
      nodo: [
        {
          texto: "<b>Las fáciles</b>",
        },
        {
          texto:
            "Cuando el () está en primera posición de la operación, la inversa es fácil por que basta con cambiar el + por - (o - por +) y / por · (o · por /). ",
          atributos: {style: "text-align:justify"},
        },
      ],

      engine: EngineOwner,
      styleContainer: "note",
    },

    lexico_2: {
      nodo: [
        {
          texto: "<b>Las difíciles</b>",
        },
        {
          texto:
            "Se reconocen porque el () aparece <b>después</b> del signo de operación. Y los <b>signos de operación son</b> + o · (multiplicación). Las llamamos difíciles porque para hallar la inversa hay que primero permutar el () con el número, para volverla fácil y a esa fácil se le busca la inversa. ",

          atributos: {style: "text-align:justify"},
        },
      ],
      engine: EngineOwner,
      styleContainer: "note",
    },
    lexico_3: {
      nodo: [
        {
          texto: "<b>Las sorprendentes</b>",
        },
        {
          texto:
            "Se reconocen porque el () aparece <b>después</b> del signo de operación. Los <b>signos de operación son</b> - o / . Se llaman sorprendentes porque para hallar la inversa no hay que hacer nada: la operación es su propia inversa.",
          atributos: {style: "text-align:justify"},
        },
      ],
      engine: EngineOwner,
      styleContainer: "note",
    },
  },
};
const def = {
  scrollNav: {
    tittle: "Clasificación de las inversas",
  },
  artifacts: {
    example_1: {
      prueba_t: true,
      parent: "lexico_1",

      body: [
        ["La inversa de () · 5 es () / 5"],
        ["La inversa de () - 4 es () + 4"],
        ["La inversa de () / 5 es () x 5"],
        ["La inversa de () + 4 es () - 4"],
        ["La inversa de () x 5 es () / 5"],
      ],
      engine: engineTable,
    },
    example_2: {
      prueba_t: true,
      parent: "lexico_2",

      body: [[" 4 + () ", " () + 4 ", " () - 4 "]],
      engine: engineTable,
    },
    example_3: {
      prueba_t: true,
      parent: "lexico_3",

      body: [
        [
          "La inversa de <br> 4 - () es 4 - ()",
          "La inversa de <br> 5 / () es 5 / ()",
        ],
      ],
      engine: engineTable,
    },
  },
  artifact_raiting: {
    parent: "scroll-container",
    questions: {
      question_1: {
        value: "¿Fue fácil?",
      },
    },
    engine: EngineOwner,
  },
};
const contentMain = new CreateView(textUtils);
contentMain.initVIew(def);
