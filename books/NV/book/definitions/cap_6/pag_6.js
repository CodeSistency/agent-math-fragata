const defBoards = {
  board_1: {
    artifact: "artifact_1",
    type: [
      {type: 3, mathfields: [{value: "2", disabled: true}]},
      {type: 3, mathfields: [{value: "-2", disabled: true}]},
      {type: 3, mathfields: [{value: "3 x -2", disabled: true}]},
      {type: 3, mathfields: [{value: "3 x -2", disabled: true}]},
    ],
    typeAux: [
      {type: 3, mathfields: [{value: "2", disabled: true}]},
      {type: 3, mathfields: [{value: "3 x 2", disabled: true}]},
      {type: 3, mathfields: [{value: "-3 x 2", disabled: true}]},
      {type: 3, mathfields: [{value: "3 x 2", disabled: true}]},
    ],
    points_arches: [
      {arche: [1, 2, false, false, {heigth: 1}], changeCurves: true},
      {arche: [5, 6, false, false, {heigth: -1}], changeCurves: true},
      {arche: [8, 9, false, false, {heigth: -1}], changeCurves: true},
      {arche: [9, 10, false, false, {heigth: -1}], changeCurves: true},
      {arche: [10, 11, false, false, {heigth: -1}], changeCurves: true},
      {arche: [12, 13, false, false, {heigth: 1}], changeCurves: true},
      {arche: [13, 14, false, false, {heigth: 1}], changeCurves: true},
      {arche: [14, 15, false, false, {heigth: 1}], changeCurves: true},
      // siquiente
      {arche: [17, 18, false, false, {heigth: 1}], changeCurves: true},
      {arche: [21, 22, false, false, {heigth: -1}], changeCurves: true},
      {arche: [24, 25, false, false, {heigth: -1}], changeCurves: true},
      {arche: [25, 26, false, false, {heigth: -1}], changeCurves: true},
      {arche: [26, 27, false, false, {heigth: -1}], changeCurves: true},
      {arche: [28, 29, false, false, {heigth: 1}], changeCurves: true},
      {arche: [29, 30, false, false, {heigth: 1}], changeCurves: true},
      {arche: [30, 31, false, false, {heigth: 1}], changeCurves: true},
    ],
  },
};

const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      board: "board_1",

      inputs: [
        {
          tag: "form",
          style: {form: "formExample"},
          spans: [
            {
              value: "¿Estan los dos debajo de la recta?",
              select: true,
              default: [{valor: "selecciona"}, {valor: "sí"}, {valor: "no"}],
              style: {
                span: "max-width spanRow center",
                select: "selectClase mathBig",
              },
            },
            {
              value: "¿Cuántos pasos tienen los caminos de la tercera fila?",
              select: true,
              default: [
                {valor: "selecciona"},
                {valor: "1"},
                {valor: "2"},
                {valor: "3"},
              ],
              style: {
                span: "max-width spanRow center",
                select: "selectClase mathBig",
              },
            },
            {
              value: "¿Son iguales?",
              select: true,
              default: [{valor: "selecciona"}, {valor: "sí"}, {valor: "no"}],
              style: {
                span: "max-width spanRow center",
                select: "selectClase mathBig",
              },
            },
          ],
        },
        {
          tag: "form",
          value:
            "Debido a que los caminos son iguales podems escribir q sus trayectorias son iguales <b>3x-2=-3x2</b>",
          style: {form: "formExample spanRow"},
        },
        {
          tag: "form",
          style: {form: "formExample"},
          spans: [
            {
              value:
                "¿Has notado que el camino que corresponde ala trayectoria <b>-3x-2</b> está por encima de la resta y es el mismo que corresponde ala trayectoria <b>3x2</b>?",
              select: true,
              default: [{valor: "selecciona"}, {valor: "sí"}, {valor: "no"}],
              style: {span: "spanRow center", select: "selectClase mathBig"},
            },
            {
              value:
                "por ello podemos escribir que <b>-3x-2+3x2</b> y pos eso decimos que la multiplicación de -3 por -2 es:<b>6</b>",
              style: {span: "max-width spanRow center"},
            },
          ],
        },
      ],

      conditions: [["sí"], ["3"], ["sí"], ["sí"]],

      engine: EngineEscalas,
    },
    lexico_1: {
      nodo: [
        {
          texto:
            "<h3>Regla:</h3><p>Si los dos número que se multiplican son números positivos el resultado es positivo.</p> <p>Si los dos números que se multiplican son números negativos el el resultado es positivo. </p> <p>Si se multiplica uno positivo por uno negativo, el resultado es negativo.</p> <p>El tamaño del camino simplificado es igual al número de veces por el tamaño del paso que se repite. </p>",
          atributos: {style: "text-align:justify"},
        },
      ],
      styleContainer: "note",
      engine: EngineOwner,
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
  },
};

const contentMain = new CreateView(def, defBoards);
