const def = {
  scrollNav: true,
  artifacts: {
    artifact_1: {
      parent: "main-content",
      body: [
        [
          {style: {span: "centerText"}, value: "<b>La Fórmula<b/>"},
          {style: {span: "centerText"}, value: "<b>Se lee</b>"},
        ],
        [
          "2y",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "dos y"},
                  {valor: "el doble y"},
                  {valor: "dos multiplicado por y"},
                  {valor: "dos multiplicado por x"},
                  {valor: "el doble x"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "3z",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "tres z"},
                  {valor: "el triple z"},
                  {valor: "tres multiplicado por y"},
                  {valor: "tres multiplicado por z"},
                  {valor: "el triple y"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "x + 6",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "x más seis"},
                  {valor: "y más seis"},
                  {valor: "x más cinco"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
      ],
      conditions: [
        ["dos y", "el doble y", "dos multiplicado por y"],
        ["tres z", "el triple z", "tres multiplicado por z"],
        ["x más seis"],
      ],
      engine: engineTable,
    },
    artifact_2: {
      parent: "main-content",
      body: [
        [
          {style: {span: "centerText"}, value: "<b>La Fórmula<b/>"},
          {style: {span: "centerText"}, value: "<b>Se lee</b>"},
        ],
        [
          "x / 5",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "x entre cinco"},
                  {valor: "la quinta parte de x"},
                  {valor: "la quinta parte de y"},
                  {valor: "dos multiplicado por x"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "2 - x",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "dos menos x"},
                  {valor: "dos menos z"},
                  {valor: "tres menos x"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "1 - z",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "uno menos z"},
                  {valor: "seis menos z"},
                  {valor: "uno menos x"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
      ],
      conditions: [
        ["x entre cinco", "la quinta parte de x"],
        ["dos menos x"],
        ["uno menos z"],
      ],
      engine: engineTable,
    },
    artifact_3: {
      parent: "main-content",
      body: [
        [
          {style: {span: "centerText"}, value: "<b>La Fórmula<b/>"},
          {style: {span: "centerText"}, value: "<b>Se lee</b>"},
        ],
        [
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "zx"},
                  {valor: "zy"},
                  {valor: "2z"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
          "El doble de z",
        ],
        [
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "6x"},
                  {valor: "6y"},
                  {valor: "xy"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
          "El séxtuplo de x",
        ],
        [
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "z-4"},
                  {valor: "z-3"},
                  {valor: "z+4"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
          "Z menos cuatro",
        ],
      ],
      conditions: [["zz", "2z"], ["6x"], ["z-4"]],
      engine: engineTable,
    },
    artifact_4: {
      parent: "main-content",
      body: [
        [
          {style: {span: "centerText"}, value: "<b>La Fórmula<b/>"},
          {style: {span: "centerText"}, value: "<b>Se lee</b>"},
        ],
        [
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "4/y"},
                  {valor: "7/y"},
                  {valor: "4-y"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
          "La cuarta parte de y",
        ],
        [
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "8-y"},
                  {valor: "8"},
                  {valor: "xy"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
          "Ocho menos y",
        ],
        [
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "x-7"},
                  {valor: "x-3"},
                  {valor: "x/7"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
          "X menos siete",
        ],
      ],
      conditions: [["4/y"], ["8-y"], ["x-7"]],
      engine: engineTable,
    },
    artifact_5: {
      parent: "main-content",
      body: [
        [
          {style: {span: "centerText"}, value: "<b>La Fórmula<b/>"},
          {style: {span: "centerText"}, value: "<b>Se lee</b>"},
        ],
        [
          "5y",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "cinco multiplicado por y"},
                  {valor: "cinco y"},
                  {valor: "el quintuplo de y"},
                  {valor: "el quinto equis"},
                  {valor: "dos multiplicado por y"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "7z",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "siete multiplicado por z"},
                  {valor: "siete z"},
                  {valor: "el séptuplo de z"},
                  {valor: "siete x"},
                  {valor: "el quinto de z"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "x - 6",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "x menos seis"},
                  {valor: "seis menos x"},
                  {valor: "x entre seis"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
      ],
      conditions: [
        ["cinco multiplicado por y", "cinco y", "el quintuplo de y"],
        ["siete z", "siete multiplicado por z", "el séptuplo de z"],
        ["x menos seis"],
      ],
      engine: engineTable,
    },
    artifact_6: {
      parent: "main-content",
      body: [
        [
          {style: {span: "centerText"}, value: "<b>La Fórmula<b/>"},
          {style: {span: "centerText"}, value: "<b>Se lee</b>"},
        ],
        [
          "z / 4",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "cuatro entre z"},
                  {valor: "cuarta parte de z"},
                  {valor: "cuarta parte de x"},
                  {valor: "cuarta entre x"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "1 - y",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "dos menos y"},
                  {valor: "uno menos x"},
                  {valor: "uno menos y"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
        [
          "15 + z",
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "diez más z"},
                  {valor: "quince más x"},
                  {valor: "quince más z"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
        ],
      ],
      conditions: [
        ["cuatro entre z", "cuarta parte de z"],
        ["uno menos y"],
        ["quince más z"],
      ],
      engine: engineTable,
    },
    artifact_7: {
      parent: "main-content",
      body: [
        [
          {style: {span: "centerText"}, value: "<b>La Fórmula<b/>"},
          {style: {span: "centerText"}, value: "<b>Se lee</b>"},
        ],
        [
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "zx"},
                  {valor: "yy"},
                  {valor: "2y"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
          "El doble de y",
        ],
        [
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "5x"},
                  {valor: "5y"},
                  {valor: "xy"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
          "El quintuplo de equis",
        ],
        [
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "z-4"},
                  {valor: "z+5"},
                  {valor: "x+5"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
          "Z mas cinco",
        ],
      ],
      conditions: [["yy", "2y"], ["5x"], ["z+5"]],
      engine: engineTable,
    },
    artifact_8: {
      parent: "main-content",
      body: [
        [
          {style: {span: "centerText"}, value: "<b>La Fórmula<b/>"},
          {style: {span: "centerText"}, value: "<b>Se lee</b>"},
        ],
        [
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "5/y"},
                  {valor: "4/y"},
                  {valor: "5-y"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
          "La quinta parte de y",
        ],
        [
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "7y"},
                  {valor: "5y"},
                  {valor: "5x"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
          "El séptuplo de y",
        ],
        [
          {
            tag: "form",
            style: {form: "formFlex"},
            selects: [
              {
                default: [
                  {valor: "selecciona"},
                  {valor: "3/z"},
                  {valor: "2/x"},
                  {valor: "2/y"},
                ],
                style: {select: "selectClase"},
              },
            ],
          },
          "La tercera parte de z",
        ],
      ],
      conditions: [["5/y"], ["7y"], ["3/z"]],
      engine: engineTable,
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
const textUtils = {
  artifacts: {
    lexico_1: {
      recursos: [
        {
          recurso: {
            styleRecurso: ["intervals"],
            grafico: [
              {
                texto: [
                  {
                    x: -3.2,
                    y: 0,
                    mensaje:
                      '<math-field disabled class="squareDiagram rouden-10" style="min-width: 100px; width:max-content; height:40px;  ;">\\text{Operación}</math-field>',
                  },
                  {
                    x: -1.1,
                    y: -2.5,
                    mensaje:
                      '<math-field disabled class="squareDiagram rouden-10" style="min-width: 150px; width:max-content; height:40px;">\\text{Fórmula}</math-field>',
                  },
                  {
                    x: -1.1,
                    y: 2.5,
                    mensaje:
                      '<math-field disabled class="squareDiagram rouden-10" style="min-width: 150px; width:max-content; height:40px;">\\text{Variable}</math-field>',
                  },
                ],
                linea: [
                  // flecha del medio
                  {
                    type: "arrow",
                    punto_1: [0.25, 1],
                    punto_2: [0.25, -1],
                    stylesLine: {lastArrow: true, strokeWidth: 2.5},
                  },
                ],
              },
            ],
          },
        },
      ],
      nodo: [
        {
          texto: "Lectura de Fórmulas",
          etiqueta: "h2",
          atributos: {style: "text-align:justify"},
        },
        {
          texto: `La fórmula 2x se lee: "el doble de equis" o "dos multiplicado por equis" o "dos equis".`,
          atributos: {style: "text-align:justify"},
        },
        {
          texto: `La fórmula 3x se lee: "el triple de equis" o "tres multiplicado por equis" o "tres equis".`,
          atributos: {style: "text-align:justify"},
        },
        {texto: `La fórmula x+5 se lee: "equis más cinco".`},
        {
          texto: `La fórmula x/5 se lee: "la quinta parte de equis" o "equis dividido entre cinco".`,
          atributos: {style: "text-align:justify"},
        },
      ],
      styleContainer: "note",
      engine: EngineOwner,
    },
  },
};

const contentMain = new CreateView(textUtils);

contentMain.initVIew(def);
