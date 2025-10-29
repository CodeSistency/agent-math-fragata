
const rDef = {
  artifactHtml: {
    datadefault: [
      //primera seccion 



      {

        type: 13,
        interactive: false,
        classGlobal: 'QA',
        parent: '#tabla1',
        contents: {
          artifact_example_1: {
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
                  text: ['3\\left(2+x\\right)', true],
                  conditions: {
                    correctIndex: null,
                  }
                },
                {
                  type: 0, // una pregunta. Varios inputs
                  text: ['3\\left(2+0\\right)', true],

                  conditions: {
                    correctIndex: null
                  },
                },

                {
                  type: 0, // una pregunta. Varios inputs
                  text: ['6', true],

                  conditions: {
                    correctIndex: null
                  },
                },


              ],
              [

                {
                  type: 0,
                  text: ['Polinomio Grado 1 Ordenado', false],
                  conditions: {
                    correctIndex: null,
                  }
                },
                {
                  type: 0,
                  text: ['3\\cdot x+3\\cdot2', true],
                  conditions: {
                    correctIndex: null,
                  }
                },

                {
                  type: 0,
                  text: ['3\\cdot0+3\\cdot2', true],
                  conditions: {
                    correctIndex: null,
                  }

                },
                {
                  type: 0,
                  text: ['6', true],
                  conditions: {
                    correctIndex: null,
                  }
                },

         
              ],


















            ],
          },




        },
      },
      {

        type: 13,
        interactive: false,
        classGlobal: 'QA',
        parent: '#tabla2',
        contents: {
          artifact_example_2: {
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
                  text: ['3\\left(2+x\\right)', true],
                  conditions: {
                    correctIndex: null,
                  }
                },
                
                {
                  type: 0, // una pregunta. Varios inputs
                  text: ['3\\left(2+1\\right)', true],

                  conditions: {
                    correctIndex: null
                  },
                },

                {
                  type: 0, // una pregunta. Varios inputs
                  text: ['9', true],

                  conditions: {
                    correctIndex: null
                  },
                },

              ],
              [

                {
                  type: 0,
                  text: ['Polinomio Grado 1 Ordenado', false],
                  conditions: {
                    correctIndex: null,
                  }
                },
                {
                  type: 0,
                  text: ['3\\cdot x+3\\cdot2', true],
                  conditions: {
                    correctIndex: null,
                  }
                },

               
                {
                  type: 0,
                  text: ['3\\cdot1+3\\cdot2', true],
                  conditions: {
                    correctIndex: null,
                  }
                },




                {
                  type: 0,
                  text: ['9', true],
                  conditions: {
                    correctIndex: null,
                  }
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
        parent: '#tabla3',
        contents: {
          artifact_1: {
            allinputs: [],
            header: ['', '0', 'Resultado'],
            dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 },
            cells: [
              [
                {
                  type: 0,
                  text: ['2x-3', true],
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
                      ['2\\cdot0-3', '\\left(2\\cdot0\\right)-3', '2\\left(0\\right)-3'],
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
                      [-3],
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


                      ['2\\cdot x+\\left(-3\\right)', '2\\cdot x-3', '2x+\\left(-3\\right)', '2x-3', '2\\cdot x+-3'],
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
                      ['2\\cdot0+\\left(-3\\right)', '2\\cdot0-3', '2\\cdot0+-3'],

                    ]
                  },
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      [-3],
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
        parent: '#tabla4',
        contents: {
          artifact_2: {
            allinputs: [],
            header: ['', '1', 'Resultado'],
            dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 },
            cells: [
              [
                {
                  type: 0,
                  text: ['2x-3', true],
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
                      ['2\\cdot1-3', '\\left(2\\cdot1\\right)-3', '2\\left(1\\right)-3'],
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
                  type: 3, // una pregunta. Varios inputs
                  placeholder: '\\cdot x+',
                  inputsDefault: [
                    ['', false],

                  ],

                  conditions: {
                    valueInputs: [


                      ['2\\cdot x+\\left(-3\\right)', '2\\cdot x-3', '2x+\\left(-3\\right)', '2x-3', '2\\cdot x+-3'],
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
                      ['2\\cdot1+\\left(-3\\right)', '2\\cdot1-3', '2\\cdot1+-3'],],
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
        parent: '#tabla5',
        contents: {
          artifact_3: {
            allinputs: [],
            header: ['', '0', 'Resultado'],
            dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 },
            cells: [
              [
                {
                  type: 0,
                  text: ['1-x', true],
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
                      ['1-0', '1-\\left(0\\right)'],
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
                      [1],
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
                      ['-x+1', '-1\\cdot x+1', '-1 x+1', '-1x+1', '-1\\left(x\\right)+1','-1\\cdot x+1\\cdot-1'],


                    ],
                  }
                },
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['\\left(0\\right)+1', '-1\\left(0\\right)+1', '0+1', '0\\cdot1+1', '-1\\cdot0+1','-1\\cdot0+1\\cdot-1'],
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
                      [1],
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
        parent: '#tabla6',
        contents: {
          artifact_4: {
            allinputs: [],
            header: ['', '1', 'Resultado'],
            dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 },
            cells: [
              [
                {
                  type: 0,
                  text: ['1-x', true],
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
                      ['1-1', '1-\\left(1\\right)'],
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
                      [0],
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
                      ['-x+1', '-1\\cdot x+1', '-1 x+1', '-1x+1', '-1\\left(x\\right)+1','-1\\cdot x+1\\cdot-1'],


                    ],
                  }
                },
     
                {
                  type: 3, // una pregunta. Varios inputs
                  inputsDefault: [
                    ['', false],
                  ],

                  conditions: {
                    valueInputs: [
                      ['-\\left(1\\right)+1', '-1\\left(1\\right)+1', '-1+1', '-1\\cdot1+1', '-1\\left(1\\right)+1','-1\\cdot1+1\\cdot-1'],
                      //  ["-1+1"],
                      // ["-1\\cdot1+1"]
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
                      [0],
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
        parent: '#tabla7',
        contents: {
          artifact_5: {
            allinputs: [],
            header: ['', '0', 'Resultado'],
            dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 },
            cells: [
              [

                {
                  type: 0,
                  text: ['-1(1-x)', true],
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
                      [-1, '-1\\left(1-0\\right)', '-1\\cdot\\left(1-0\\right)'],
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
                  type: 3, // una pregunta. Varios inputs
                  placeholder: '\\cdot x+',

                  inputsDefault: [
                    ['', false],

                  ],

                  conditions: {
                    valueInputs: [
                      ['1\\cdot x+\\left(-1\\right)', '1\\cdot x-1', '1\\cdot\\left(x\\right)+\\left(-1\\right)'],

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
                      ['1\\cdot0+\\left(-1\\right)', '1\\cdot0-1', '1\\cdot\\left(0\\right)+\\left(-1\\right)'],
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
        parent: '#tabla8',
        contents: {
          artifact_6: {
            allinputs: [],
            header: ['', '1', 'Resultado'],
            dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 },
            cells: [
              [

                {
                  type: 0,
                  text: ['-1(1-x)', true],
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
                      [0, '-1\\cdot-1+\\left(-1\\right)', '-1\\cdot\\left(1-0\\right)'],
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
                      [-0],
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
                      ['1\\cdot x+\\left(-1\\right)', '1\\cdot x-1', '1\\cdot\\left(x\\right)+\\left(-1\\right)'],

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
                      //["1\\cdot 1+\\left(-1\\right)","1\\cdot 1-1","1\\cdot1+\\left(-1\\right)"],
                      ['1\\cdot1+\\left(-1\\right)', '1\\cdot\\left(1\\right)+\\left(-1\\right)']
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
                      [0],
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
