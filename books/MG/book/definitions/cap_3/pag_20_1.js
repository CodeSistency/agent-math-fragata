
const rDef = {
  artifactHtml: {
    datadefault: [
      //primera seccion 




      {
        customKeyboard: 8,

        type: 13,
        interactive: true,
        classGlobal: 'QA',
        parent: '#tabla9',
        contents: {
          artifact_1: {
            allinputs: [],
            header: ['', '0', 'Resultado'],
            dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 },
            cells: [
              [


                {
                  type: 0,
                  text: ['2-7x', true],
                  conditions: {
                    correctIndex: null,
                  }
                },

                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['2-7\\cdot0', '2-7\\cdot\\left(0\\right)'],
                    ],
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      [2],
                    ],
                  },
                },





              ],
              [


                {
                  type: 3, // una pregunta. Varios inputs
                  placeholder: '\\cdot x+',

                  inputsDefault: [
                    ['', false],

                  ],

                  conditions: {
                    valueInputs: [
                      ['-7\\cdot x+2', '-7\\cdot\\left(x\\right)+2'],


                    ],
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['-7\\cdot 0+2', '-7\\cdot0+2', '-7\\cdot\\left(0\\right)+2'],
                    ],
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      [2],
                    ],
                  },
                },



              ],




            ],
          },




        },
      },
      {
        customKeyboard: 8,

        type: 13,
        interactive: true,
        classGlobal: 'QA',
        parent: '#tabla10',
        contents: {
          artifact_2: {
            allinputs: [],
            header: ['', '1', 'Resultado'],
            dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 },
            cells: [
              [


                {
                  type: 0,
                  text: ['2-7x', true],
                  conditions: {
                    correctIndex: null,
                  }
                },


                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['2-7\\cdot1', '2-7\\cdot\\left(1\\right)'],
                    ],
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      [-5],
                    ],
                  },
                },




              ],
              [


                {
                  type: 3, // una pregunta. Varios inputs
                  placeholder: '\\cdot x+',

                  inputsDefault: [
                    ['', false],

                  ],

                  conditions: {
                    valueInputs: [
                      ['-7\\cdot x+2', '-7\\cdot\\left(x\\right)+2'],


                    ],
                  },
                },

                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['-7\\cdot 1+2', '-7\\cdot1+2', '-7\\cdot\\left(1\\right)+2'],
                    ],
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      [-5],
                    ],
                  },
                },


              ],




            ],
          },




        },
      },















      {
        customKeyboard: 8,

        type: 13,
        interactive: true,
        classGlobal: 'QA',
        parent: '#tabla11',
        contents: {
          artifact_3: {
            allinputs: [],
            header: ['', '', '0', 'Resultado'],
            dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 },
            cells: [
              [
                {
                  type: 0,
                  text: ['Fórmula Monomio', false],
                  conditions: {
                    correctIndex: null,
                  }
                },

                {
                  type: 0,
                  text: ['-6+\\frac{x}{5}', true],
                  conditions: {
                    correctIndex: null,
                  }
                },

                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['-6+\\frac05', '-6+\\frac{0}{5}', '-\\frac{30}{5}', '-\\frac61+\\frac05'],
                    ],
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      [-6],
                    ],
                  },
                },

              ],

              [

                {
                  type: 0,
                  text: ['PG 1 Ordenado', false],
                  conditions: {
                    correctIndex: null,
                  }
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  placeholder: '\\cdot x+',

                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['\\frac{1}{5}\\cdot x+\\left(-6\\right)', '\\frac15\\cdot x+\\left(-6\\right)']
                    ],
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['\\frac{1}{5}\\cdot0+\\left(-6\\right)', '\\frac15\\cdot0+\\left(-6\\right)']
                    ],
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      [-6],
                    ],
                  },
                },


              ],
            ],
          },
        },
      },
      {
        customKeyboard: 8,

        type: 13,
        interactive: true,
        classGlobal: 'QA',
        parent: '#tabla12',
        contents: {
          artifact_4: {
            allinputs: [],
            header: ['', '', '1', 'Resultado'],
            dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 },
            cells: [
              [
                {
                  type: 0,
                  text: ['Fórmula Monomio', false],
                  conditions: {
                    correctIndex: null,
                  }
                },

                {
                  type: 0,
                  text: ['-6+\\frac{x}{5}', true],
                  conditions: {
                    correctIndex: null,
                  }
                },


                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['-6+\\frac05', '-6+\\frac{1}{5}', '-\\frac{29}{5}', '-\\frac61+\\frac15'],

                    ],
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      [-5.8],
                    ],
                  },
                },
              ],

              [

                {
                  type: 0,
                  text: ['PG 1 Ordenado', false],
                  conditions: {
                    correctIndex: null,
                  }
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  placeholder: '\\cdot x+',

                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['\\frac{1}{5}\\cdot x+\\left(-6\\right)', '\\frac15\\cdot x+\\left(-6\\right)']
                    ],
                  },
                },

                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['\\frac{1}{5}\\cdot1+\\left(-6\\right)', '\\frac15\\cdot1+\\left(-6\\right)']
                    ],
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      [-5.8],
                    ],
                  },
                },

              ],
            ],
          },
        },
      },







      {
        customKeyboard: 8,

        type: 13,
        interactive: true,
        classGlobal: 'QA',
        parent: '#tabla13',
        contents: {
          artifact_5: {
            allinputs: [],
            header: ['', '', '0', 'Resultado'],
            dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 },
            cells: [

              [


                {
                  type: 0,
                  text: ['Recordar que:', false],
                  conditions: {
                    correctIndex: null,
                  }
                },

                {
                  type: 0,
                  text: ['\\frac{x-5}{5}', true],
                  conditions: {
                    correctIndex: null,
                  }
                },

                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['\\frac{0-5}{5}'],
                    ],
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      [-1],
                    ],
                  },
                },



              ],


              [
                {
                  type: 0,
                  text: ['\\frac{a+b}{c}=\\frac{a}{c}+\\frac{b}{c}', true],
                  conditions: {
                    correctIndex: null,
                  }
                },

                {
                  type: 3, // una pregunta. Varios inputs
                  placeholder: '\\cdot x+',

                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [


                      // ["\\frac{1}{5}\\cdot\\left(x-5\\right)","\\frac{1}{5}\\cdot x+\\frac{1}{5}\\cdot-5", "\\frac{1}{5}\\cdot x+\\left(-\\frac{5}{5}\\right)","\\frac{1}{5}\\cdot x+\\left(\\frac{-5}{5}\\right)"]
                      ['\\frac{1}{5}\\cdot x+\\left(-1\\right)', '\\frac{1}{5}\\cdot x+\\left(-\\frac{5}{5}\\right)', '\\frac{1}{5}\\cdot x+\\left(\\frac{5}{-5}\\right)', '\\frac{1}{5}\\cdot x+\\left(\\frac{-5}{5}\\right)']
                    ],
                  },
                },

                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['\\frac{1}{5}\\cdot0+\\left(-1\\right)', '\\frac{1}{5}\\cdot0+\\left(-\\frac{5}{5}\\right)', '\\frac{1}{5}\\cdot0+\\left(\\frac{5}{-5}\\right)', '\\frac{1}{5}\\cdot0+\\left(\\frac{-5}{5}\\right)']

                      // ["\\frac{1}{5}\\cdot0+\\left(-\\frac{5}{5}\\right)", "\\frac{1}{5}\\cdot0+\\left(\\frac{-5}{5}\\right)"]
                    ],
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      [-1],
                    ],
                  },
                },

              ],

            ],
          },
        },
      },
      {
        customKeyboard: 8,

        type: 13,
        interactive: true,
        classGlobal: 'QA',
        parent: '#tabla14',
        contents: {
          artifact_6: {
            allinputs: [],
            header: ['', '', '1', 'Resultado'],
            dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 },
            cells: [

              [


                {
                  type: 0,
                  text: ['Recordar que:', false],
                  conditions: {
                    correctIndex: null,
                  }
                },

                {
                  type: 0,
                  text: ['\\frac{x-5}{5}', true],
                  conditions: {
                    correctIndex: null,
                  }
                },




                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['\\frac{1-5}{5}'],
                    ],

                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      [-0.8],
                    ],
                  },
                },
              ],


              [
                {
                  type: 0,
                  text: ['\\frac{a+b}{c}=\\frac{a}{c}+\\frac{b}{c}', true],
                  conditions: {
                    correctIndex: null,
                  }
                },

                {
                  type: 3, // una pregunta. Varios inputs
                  placeholder: '\\cdot x+',

                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [

                      ['\\frac{1}{5}\\cdot x+\\left(-1\\right)', '\\frac{1}{5}\\cdot x+\\left(-\\frac{5}{5}\\right)', '\\frac{1}{5}\\cdot x+\\left(\\frac{5}{-5}\\right)', '\\frac{1}{5}\\cdot x+\\left(\\frac{-5}{5}\\right)']

                      // ["\\frac{1}{5}\\cdot\\left(x-5\\right)", "\\frac{1}{5}\\cdot x+\\frac{1}{5}\\cdot-5", '\\left(\\frac15\\right)\\cdot x+\\left(-5\\right)', '\\left(\\frac{1}{5}\\right)\\cdot x+\\left(-5\\right)', '\\frac{1}{5}\\cdot x+\\left(-5right)', "\\frac{1}{5}\\cdot x+\\left(-5\\right)", "\\frac{1}{5}\\cdot\\left(x-5\\right)"]
                    ],
                  },
                },


                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [

                      ['\\frac{1}{5}\\cdot1+\\left(-1\\right)', '\\frac{1}{5}\\cdot1+\\left(-\\frac{5}{5}\\right)', '\\frac{1}{5}\\cdot1+\\left(\\frac{5}{-5}\\right)', '\\frac{1}{5}\\cdot1+\\left(\\frac{-5}{5}\\right)']

                      // ["\\frac{1}{5}\\cdot1+\\left(-\\frac{5}{5}\\right)", "\\frac{1}{5}\\cdot1+\\left(\\frac{-5}{5}\\right)"]
                    ],
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      [-0.8],
                    ],
                  },
                },
              ],

            ],
          },
        },
      },






    ]
  }
};

generator(rDef);
