const defBoards = {
  board_1: {
    artifact: 'artifact_1',
    styles: {
      boundingbox: [-4, 4, 4, -4],
      axies: {
        y: { visible: true },
        x: { visible: true },
      },
    },
  },
};
//si se va a agregar algo al objeto tiene que declararce la propiedad por defecto en el mod.js
const def = {
  scrollNav: {
    tittle: 'Vive titulo',
    lexico: 'Vive lexico',
  },
  artifacts: {
    artifact_1: {
      board: 'board_1',
      engine: VectorEngine,
      border: true,
      parent: 'lexico-content',
      enumTop: 'Dibuja la recta 2( ) + 1',
      /* definir en objeto aveces es mas facil pero para validar tiene inconbenientes  */
      cordsInputs: {
        p1x: { value: '2', disabled: false },
        //p1y: { value: "2" },
        p2x: { value: '3' },
        p2y: { value: '4' },
      },
      /* esto es mejor en algunos caso ya que pueden ser incremental  y poner agregar n inputs */
      defaultInputs: [
        { value: '1,x', disabled: false },
        { value: '2,x' },
        { value: '3,x' },
        { value: '4,x' },
        { value: '5,x' },
      ],
      conditions: {
        points: {
          //si falla tiene este mensaje espesifico general
          text: 'text error ',
        },
        //en los inputs
        inputs: {
          //tiene que tener estos valores
          top: {
            //si falla tiene este mensaje espesifico general
            text: 'text error ',
            p1x: { value: ['1'] },
            p1y: { value: ['2'] },
            /* p2x: { value: ['1'] },
              p2y: { value: ['1'] }, */
          },
          bottom: {
            //si falla tiene este mensaje espesifico general
            text: 'text error ',
            /* al ser un array el bottom se definen las condiciones en un array */
            values: [{ value: ['1'] }],
          },
        },
      },
    },

    artifact_raiting: {
      parent: 'scroll-container',
      questions: {
        question_1: {
          value: '¿Fue fácil?',
        },
      },
      engine: EngineOwner,
    },
  },
};

new CreateView(def, defBoards);
