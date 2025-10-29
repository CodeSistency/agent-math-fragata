class baseBoards extends BaseEngine {
  constructor(defBoard = {}) {
    super();
    this.visip = [];
    this.color = {
      line: {
        strokeColor: '#217e9d',
      },
      points: {
        color: '#f1604d',
      },
      slider: {
        color: ' #217e9d',
      },

      lines: {
        color: '#217e9d',
      },
    };
    this.pasos = [];
    this.points = defBoard.points ?? [];
    this.slider = defBoard.slider ?? [];
    this.curves = defBoard.curves ?? [];
    this.polygons = defBoard.polygons ?? [];
    this.ellipses = defBoard.ellipses ?? [];
    this.arcs = defBoard.arcs ?? [];
    this.inputs = defBoard.inputs ?? [];
    this.lines = defBoard.lines ?? [];
    this.allInputsCreate = [];
    this.pointNames = defBoard.pointNames ?? [];
    this.semicircle = defBoard.semicircle ?? [];

    this.sliderC = '';
  }
  setBoard(idBoard = 'jxgbox', nameBoard = 'board', node) {
    if (node) {
      this[nameBoard] = node;
    } else if (!this.htmlNode?.querySelector(`#${idBoard}`)) {
      this[nameBoard] = null;
      return;
    } else {
      this[nameBoard] = this?.htmlNode?.querySelector('#jxgbox');
      this[nameBoard].id = this.name + '_board';
    }
  }
  initBoardBase(defBoard) {
    const { id = defBoard?.id ?? 'jxgbox', styles } = defBoard;
    if (!document.getElementById(id)) {
      console.warn('no existe el contenedor para el board');
      return;
    }

    const style = {
      label: { visible: false },
      axis: styles?.axis ?? true,
      axis: styles?.axis ?? true,
      boundingbox: styles?.boundingbox ?? [-4, 4, 4, -4],
      maxboundingbox: styles?.maxboundingbox ?? [-15, 15, 15, -15],
      grid: false,
      showNavigation: styles?.showNavigation ?? false,
      showCopyright: false,
      keyboard: {
        enabled: false,
        dy: 30,
        panShift: true,
        panCtrl: false,
      },
      pan: {
        needTwoFingers: true,
        enabled: false,
        needShift: true,
      },
      showFullscreen: styles?.showFullscreen ?? false,
      fullscreen:
        styles?.showFullscreen == true
          ? {
              symbol: '\u22c7',
              scale: 0.95,
            }
          : false,

      zoom: {
        needShift: false,
        pinchHorizontal: false,
        pinchVertical: false,
        pinchSensitivity: 0,
        min: 1000,
        max: 0,
        factorX: 0,
        factorY: 0,
        wheel: false,
      },
      reflectionAxie: {
        Y: styles?.reflectionAxie?.Y ?? false,
        X: styles?.reflectionAxie?.X ?? false,
        B: styles?.reflectionAxie?.B ?? false,
      },
      ...styles,
      defaultAxes: {
        y: {
          name: 'Y',
          strokeWidth: 1.3,
          strokeColor: 'black',
          visible: styles?.axies?.y?.visible ?? true,
          ticks: {
            strokeColor: 'grey',
            minorTicks: 0,
            visible:
              styles?.grids?.y?.visible ||
              (!styles?.grids?.y?.visible !== false &&
                styles?.axies?.y?.visible),
            drawZero:
              styles?.axies != undefined && styles?.axies?.x?.visible == false
                ? true
                : false,
            label: {
              visible:
                ((styles?.axies?.y?.visible ?? false) ||
                  (styles?.axies?.y?.label ?? false)) ??
                true,
            },
          },
          ...styles?.axies?.y,
        },
        X: {
          name: 'X',
          strokeWidth: 1.3,
          strokeColor: '#217e9d',
          visible: styles?.axies?.x?.visible ?? true,
          ticks: {
            drawZero:
              styles?.axies != undefined && !styles?.axies?.y?.visible
                ? true
                : false,
            strokeColor: 'grey',
            minorTicks: 0,
            visible:
              styles?.grids?.x?.visible ||
              (styles?.grids?.x?.visible !== false &&
                styles?.axies?.x?.visible),
            label: {
              visible: styles?.axies?.x?.visible ?? true,
            },
          },
          ...styles?.axies?.x,
        },
      },
    };

    this.board = JXG.JSXGraph.initBoard(id, { ...style });

    JXG.Options.navbar = {
      fillColor: 'transparent',
      highlightFillColor: '#aaaaaa',
      padding: '2px',
      position: 'absolute',
      fontSize: '18px',
      cursor: 'pointer',
      zIndex: '100',
      right: '5px',
      bottom: '5px',
      ...style.navbar,
    };

    if (!this.board) {
      console.error('ID no identificado definir un id en el objeto enviado');
      return;
    }

    this.pointsDefault = this.createPoints({ points: this.points });

    this.linesDefault = this.createLines({ lines: this.lines });
    this.curvesDefault = this.createCurves({ curves: this.curves });
    this.polygonsDefault = this.createPolygons({ polygons: this.polygons });
    this.arcsDefault = this.createArcs({ arcs: this.arcs });
    this.inputsDefault = this.createInputs({ inputs: this.inputs });

    return this.board;
  }

  createPoints(params = {}) {
    const { styles, points } = params;

    const resultPoints = points.map((point, i) => {
      const newPoint = this.addPoint(point);
      if (!Array.isArray(point)) {
        const style = {
          ...this.color.points,
          ...{ ...styles, visible: false, highlight: false, ...point?.style },
        };
        newPoint.setAttribute(style);
      }
      return newPoint;
    });
    return resultPoints;
  }

  createLines(params) {
    const { lines, styles } = params;
    if (!Array.isArray(params.lines)) {
      params.lines = [params.lines];
    }

    return lines.map((line) => {
      let pointResult;

      if (this.checkPointForm(line.points)) {
        pointResult = line.points;
      } else {
        pointResult = this.createPoints({
          styles: line.pointsStyle,
          points: line.points,
        });
      }

      const style = {
        strokeColor: this.color.line.strokeColor,
        fixed: true,
        straightFirst: false,
        straightLast: false,
        highlight: false,
        firstArrow: false,
        lastArrow: false,
        strokeWidth: 2,
        name: '',
        label: {
          visible: line.name,
          autoPosition: true,
        },
        navbar: {
          strokeColor: 'blue',
          fillColor: 'orange',
          highlightFillColor: '#aaaaaa',
          padding: '2px',
          position: 'absolute',
          fontSize: '14px',
          cursor: 'pointer',
          zIndex: '100',
          right: '5px',
          bottom: '40px',
        },
        fullscreen: {
          symbol: '\u22c7',
          scale: 0.95,
        },
        precision: {
          touch: 8,
          mouse: 3,
          pen: 5,
          hasPoint: 1,
        },
        ...styles,
        ...line.style,
      };

      const newLine = this.board.create('line', pointResult, style);

      newLine.iMod = params.iMod;
      newLine.typeCurve = line.typeCurve;
      newLine.point1.setAttribute({ ...line.pointsStyles });
      newLine.point2.setAttribute({ ...line.pointsStyles });

      if (line.name) {
        gTextDefault({ ...params, texts: [line.name] });
      }

      if (line.interactive) {
      }
      return newLine;
    });
  }

  checkPointForm(points) {
    return points.some(
      (point) => typeof point === 'object' && typeof point.X === 'function',
    );
  }

  createEllipses(params) {
    const { ellipses } = params;
    ellipses.forEach((square) => {
      const newSquare = this.board.create('polygon', [
        [square.p1.x, square.p1.y],
        [square.p1.x, square.p2.y],
        [square.p2.x, square.p2.y],
        [square.p2.x, square.p1.y],
      ]);
    });
  }

  createArcs(params) {
    const { arcs, arc } = params;

    if (arcs && Array.isArray(arcs)) {
      return arcs.map((arc) => {
        return this.createArcs({ arc });
      });
    }

    const newArc = this.board.create(
      'arc',
      this.createPoints({ styles: arc.pointsStyle, points: arc.points }),
      arc.style,
    );

    if (arc.name) {
      gTextDefault({ texts: [arc.name] });
    }

    if (arc.interactive) {
      newArc.on('down', () => callback({ attractor: newArc }));
    }
    return newArc;
  }

  addPoint(point) {
    let { style = {} } = point;
    const element = { ...point };

    if (Array.isArray(point)) {
      element.x = point[0];
      element.y = point[1];

      style = {
        size: point[4] ?? 4,
        name: point[3] ?? '',
        label: {
          visible: undefined != point[3] && point[3] != '' ? true : false,
          autoPosition: true,
          offset: point[8] ?? [0, 10],
          fontSize: point[7] ?? 14,
        },

        fixed: false,
        visible: point[2] ?? false,
        fillcolor: point[5] ?? '#f1604d',
        strokeColor: point[5] ?? '#f1604d',
        color: point[6] ?? '#f1604d',
        ...point?.style,
      };
    }

    const newPoint = this.board.create('point', [element.x, element.y], {
      size: 4,
      name: '',
      label: {
        visible: style.name != undefined,
        autoPosition: true,
        offset: [0, 10],
        fontSize: 14,
      },
      fixed: false,
      visible: true,
      color: '#f1604d',
      ...style,
    });

    newPoint.ignore = point.ignore;
    newPoint.notEliminate = true;
    newPoint.iMod = point.i;
    newPoint.label.ignore = true;

    return newPoint;
  }

  createCurves(params) {
    const { styles, curves } = params;
    return curves.map((curve) => this.addCurve({ curve, styles })) ?? [];
  }

  addCurve(params) {
    const { curve, styles } = params;
    const points = curve.points;

    const style = {
      strokeColor: '#217e9d',
      strokeWidth: 1.5,
      fixed: true,
      label: {
        autoPosition: true,
        visible: true,
      },
      precision: {
        touch: 8,
        mouse: 3,
        pen: 5,
        hasPoint: 1,
      },
      ...styles,
      ...curve.style,
    };

    const cAux = this.board.create(
      'cardinalspline',
      [
        this.createPoints({ styles: curve.pointsStyle, points: points }),
        curve.flex ?? 1,
        'centripetal',
      ],
      style,
    );

    if (curve.name) {
      gTextDefault({ ...params, texts: [curve.name] });
    }

    cAux.iMod = params.iMod;
    cAux.typeCurve = curve.typeCurve || 'curve';

    if (curve.interactive) {
    }
    return cAux;
  }

  textSVG() {
    this.point.forEach((item) => {
      this.board.create('point', item.coordenada ?? [0.5, 1.8], {
        name: item.texto ?? '',
        visible: false,
        highlight: false,
        label: {
          visible: true,
          fontSize: item.SizeText ?? 15,
        },
      });
    });
  }

  createPolygons(params) {
    const { polygons } = params;
    if (polygons && Array.isArray(polygons)) {
      return (
        polygons.map((polygon) => {
          const pointsStyle = {
            fixed: true,
            visible: false,
            ...polygon.pointsStyle,
          };

          if (polygon.name) {
            addTexts({ texts: [polygon.name] });
          }
          return this.createPolygons({ polygons: polygon, pointsStyle });
        }) ?? []
      );
    }

    const { points, styles } = polygons;
    return this.board.create(
      'polygon',
      this.createPoints({ styles: polygons.pointsStyle, points }),
      {
        fixed: true,
        withLines: false,
        fillColor: 'red',
        fillOpacity: 0.1,
        vertices: { visible: false, fixed: true },
        ...styles,
      },
    );
  }

  addEllipses(point) {
    this.createPoints({ points: [{ x: 0, y: 0, visible: true, ...point }] });
  }

  addTexts(point) {
    this.createPoints({ points: [{ x: 0, y: 0, visible: true, ...point }] });
  }

  createIntervals(params) {
    const { intervals = [] } = params;
    intervals.forEach((interval) => {
      this.addInterval(interval);
    });
  }

  addInterval({
    height = 1.5,
    interval = [-2, 2],
    inputs = { a: '', b: '', c: '' },
    model = '',
  }) {
    let inputsCreate = [
      this.defineInput(interval[1] - 4.6, -1, this.typeInput(inputs?.a)),
      this.defineInput((0, 0) / 2, height + 0.4, this.typeInput(inputs?.b)),
      this.defineInput(interval[1] + 0.6, -1, this.typeInput(inputs?.c)),

      ...(inputs.a1
        ? [
            this.defineInput(
              interval[1] - 4.6,
              -3.3,
              this.typeInput(inputs?.a1),
            ),
          ]
        : []),
      ...(inputs.b1
        ? [this.defineInput((0, 0) / 2, 4.3, this.typeInput(inputs?.b1))]
        : []),
      ...(inputs.c1
        ? [
            this.defineInput(
              interval[1] + 0.6,
              -3.3,
              this.typeInput(inputs?.c1),
            ),
          ]
        : []),
    ];

    if (model == '2') {
      inputsCreate = [
        this.defineInput(interval[1] - 4.6, -1.6, this.typeInput(inputs?.a)),
        this.defineInput((0, 0) / 2, height + 0.4, this.typeInput(inputs?.b)),
        this.defineInput(interval[1] + 0.6, -1.6, this.typeInput(inputs?.c)),

        ...(inputs.a1
          ? [
              this.defineInput(
                interval[1] - 4.6,
                -4.3,
                this.typeInput(inputs?.a1),
              ),
            ]
          : []),
        ...(inputs.b1
          ? [this.defineInput((0, 0) / 2, 4.7, this.typeInput(inputs?.b1))]
          : []),
        ...(inputs.c1
          ? [
              this.defineInput(
                interval[1] + 0.6,
                -4.3,
                this.typeInput(inputs?.c1),
              ),
            ]
          : []),
      ];
    } else if (model == '3') {
      inputsCreate = [
        this.defineInput(interval[1] - 4.6, -1.4, this.typeInput(inputs?.a)),
        this.defineInput((0, 0) / 2, height + 0.4, this.typeInput(inputs?.b)),
        this.defineInput(interval[1] + 0.6, -1.4, this.typeInput(inputs?.c)),

        ...(inputs.a1
          ? [
              this.defineInput(
                interval[1] - 4.6,
                -3.6,
                this.typeInput(inputs?.a1),
              ),
            ]
          : []),
        ...(inputs.b1
          ? [this.defineInput((0, 0) / 2, 4.7, this.typeInput(inputs?.b1))]
          : []),
        ...(inputs.c1
          ? [
              this.defineInput(
                interval[1] + 0.6,
                -3.6,
                this.typeInput(inputs?.c1),
              ),
            ]
          : []),
      ];
    }

    const lines = this.createLines({
      lines: [
        {
          points: [
            [-1, 2],
            [-2.6, 2],
          ],
          style: {
            firstArrow: false,
            lastArrow: true,
          },
        },
        {
          points: [
            [1, 2],
            [2.6, 2],
          ],
          style: {
            firstArrow: false,
            lastArrow: true,
          },
        },

        {
          points: [
            [2.6, 2],
            [2.6, 0],
          ],
        },
        {
          points: [
            [-2.6, 2],
            [-2.6, 0],
          ],
        },
        {
          points: [
            [-2.8, 0],
            [2.8, 0],
          ],
        },
      ],
    });

    const newInputs = this.createInputs({
      inputs: inputsCreate,
    });

    this.intervals.push({ inputs: newInputs });

    if (MathLive) {
      MathLive.renderMathInDocument();
    }
  }

  createInputs(params) {
    const { inputs, valid = false } = params;

    this.input = inputs
      .map((input) => {
        const { x, y, value, style, validate } = input;
        const disable = style?.disabled;

        const newInput = this.board.create(
          'text',
          [
            x + (style?.input?.noiseX ?? 0),
            y + (style?.input?.noiseY ?? 0),
            `<math-field class='colorInput ${style?.mathClass ?? ''}' style='${
              style?.mathStyle ?? ''
            }'  ${disable ? 'disabled' : ''}></math-field>`,
          ],
          {
            anchorX: 'middle',
            anchorY: 'middle',
            ...style,
            fixed: true,
            highlight: false,
            layer: 20,
          },
        );

        const mathfield = newInput.rendNode.childNodes[0];
        mathfield.fatherBg = mathfield;

        if (!style?.disabled && !value) {
          mathfield.addEventListener('focusin', (e) => {
            if (e.target.disabled) {
              mathVirtualKeyboard.hide();
              return;
            }

            mathVirtualKeyboard.layouts = [
              {
                label: 'numeros',
                rows: [
                  [],
                  [
                    { class: 'small', label: '1', key: '1' },
                    { class: 'small', label: '2', key: '2' },
                    { class: 'small', label: '3', key: '3' },
                    { class: 'small', label: '4', key: '4' },
                    { class: 'small', label: '5', key: '5' },

                    {
                      class: 'action',
                      label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                      command: ['performWithFeedback', 'moveToPreviousChar'],
                    },

                    {
                      class: 'action',
                      label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                      command: ['performWithFeedback', 'moveToNextChar'],
                    },
                  ],
                  [
                    { class: 'small', label: '6', key: '6' },
                    { class: 'small', label: '7', key: '7' },
                    { class: 'small', label: '8', key: '8' },
                    { class: 'small', label: '9', key: '9' },
                    { class: 'small', label: '0', key: '0' },
                    { class: 'small', label: '=', key: '=' },
                    {
                      class: 'action font-glyph bottom right',
                      label: '&#x232b;',
                      command: ['performWithFeedback', 'deleteBackward'],
                    },
                  ],
                  [
                    { class: 'small', label: '+', key: '+' },
                    { class: 'small', latex: '-', key: '-' },
                    { class: 'small', label: '*', key: '*' },
                    {
                      class: 'small',
                      insert: '\\frac{\\placeholder{}}{\\placeholder{}}',
                    },
                    { class: 'small', insert: '÷' },
                    { class: 'small', insert: '/' },
                    { class: 'small', label: '.', key: '.' },
                    { class: 'small', label: ',', key: ',' },
                    { class: 'small', label: ';', key: ';' },
                  ],
                ],
              },
              {
                label: 'alfabeto',
                rows: [
                  [],
                  [
                    { class: 'small', label: 'a', key: 'a' },
                    { class: 'small', label: 'b', key: 'b' },
                    { class: 'small', label: 'c', key: 'c' },
                    { class: 'small', label: 'd', key: 'd' },
                    {
                      class: 'action',
                      label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
                      command: ['performWithFeedback', 'moveToPreviousChar'],
                    },
                    {
                      class: 'action',
                      label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
                      command: ['performWithFeedback', 'moveToNextChar'],
                    },
                  ],
                  [
                    { class: 'small', label: 'x', key: 'x' },
                    { class: 'small', label: 'y', key: 'y' },
                    { class: 'small', label: 'z', key: 'z' },
                    { class: 'small', label: '(', key: '(' },
                    { class: 'small', label: ')', key: ')' },
                    { class: 'small', label: '{', key: '{' },
                    { class: 'small', label: '}', key: '}' },
                    { class: 'small', label: '[', key: '[' },
                    { class: 'small', label: ']', key: ']' },

                    {
                      class: 'action font-glyph bottom right',
                      label: '&#x232b;',
                      command: ['performWithFeedback', 'deleteBackward'],
                    },
                  ],
                ],
              },
            ];
            mathVirtualKeyboard.show();
          });
        }

        mathfield.value = value?.value ?? value ?? '';

        mathfield.inlineShortcutTimeout = 1;

        mathfield.classList.add('inp_' + (this.allInputsCreate.length + 1));
        mathfield.layouts = ['minimalist'];
        this.allInputsCreate.push(mathfield);

        if (
          validate ||
          !disable ||
          valid ||
          value?.value === '' ||
          value === ''
        ) {
          this.interactiveInputs.push(mathfield);
          return { newInput, mathfield };
        }
      })
      .filter((e) => e);

    return this.input;
  }

  createSlider(params = {}) {
    const {
      limit = {},
      visible,
      step,
      snapWidth,
      numPoints,
      pointVisible,
      curvesVisible,
      reverse,
    } = params.slider;

    // Determina la distancia entre puntos
    const xDistance = (2.6 - -2.6) / (numPoints - 1);

    // Definición del slider con dirección condicional
    const start = reverse ? 1.7 : -1.7;
    const end = reverse ? -1.7 : 1.7;

    this.sliderC = this.board.create(
      'slider',
      [
        [start, -1.2],
        [end, -1.2],
        [1, numPoints, step],
      ],
      {
        withLabel: false,
        baseline: { ...this.color.points },
        highline: { ...this.color.slider },
        visible: visible ?? true,
        ...this.color.lines,
        ...snapWidth,
        ticks: { visible: false },
      },
    );

    const pointNames = reverse
      ? this.pointNames.slice().reverse()
      : this.pointNames;

    // Creación de puntos con dirección condicional
    const points = pointNames.map((name, i) => {
      const x = reverse ? 2.6 - i * xDistance : -2.6 + i * xDistance;
      const y = 0;

      const visi = i === 0 || i === pointNames.length - 1;
      const point = this.board.create('point', [x, y], {
        fixed: true,
        visible: pointVisible ?? visi,
        precision: {
          touch: 5,
          touchMax: 4,
          mouse: 4,
          pen: 4,
          hasPoint: 1,
        },
        size: 4,
        highlight: false,
        fillColor: '#ed581e',
        strokeColor: '#ed581e',
      });

      this.visip.push(point);

      point.setAttribute({ name });
      point.setAttribute({ label: { offset: [-3, -15] } });
      return point;
    });

    for (let i = 0; i < this.visip.length - 1; i++) {
      const condi = this.visip.length;
      const p1 = this.visip[i];
      const p3 = this.visip[i + 1];

      const createCurve = (midY2) => {
        const midX2 = (p1.X() + p3.X()) / 2;
        const midPoint2 = this.board.create('point', [midX2, midY2], {
          fixed: true,
          visible: false,
        });
        const c = this.board.create('circumcirclearc', [p1, midPoint2, p3], {
          strokeColor: '#0aa1dd',
          strokeWidth: 1.5,
          highlight: false,
          visible: curvesVisible ?? false,
        });
        this.pasos.push(c);
      };

      if (condi > 4) {
        createCurve(0.5);
      } else {
        createCurve(0.72);
      }
    }

    const example = pointVisible ?? false;

    if (!example) {
      let clickedPoints = [];

      this.resetClickedPoints = () => {
        clickedPoints.forEach((point) => {
          point.setAttribute({ strokeColor: this.color.points.color, size: 4 });
        });
        clickedPoints = [];
      };

      this.visip.forEach((point, i) => {
        point.on('down', () => {
          this.validateStatus = false;
          if (this.activeStep) {
            clickedPoints.push(point);
            point.setAttribute({ strokeColor: '#217e9d', size: 6 });

            if (clickedPoints.length === 3) {
              this.resetClickedPoints();
            }

            if (clickedPoints.length === 2) {
              const [firstPoint, secondPoint] = clickedPoints;
              const firstIndex = this.visip.indexOf(firstPoint);
              const secondIndex = this.visip.indexOf(secondPoint);

              if (Math.abs(firstIndex - secondIndex) === 1) {
                const minIndex = Math.min(firstIndex, secondIndex);
                let allPreviousVisible = true;

                for (let j = 0; j < minIndex; j++) {
                  if (!this.pasos[j].visProp.visible) {
                    allPreviousVisible = false;
                    break;
                  }
                }

                if (allPreviousVisible) {
                  this.pasos[minIndex].setAttribute({
                    strokeColor: '#0aa1dd',
                    visible: true,
                  });
                }
              }

              this.resetClickedPoints();
            }
          }
        });

        // Hacer visibles los puntos en base a la posición del slider
        const checkVisibility = reverse
          ? (e) => this.sliderC.X() * 1.86 <= point.X()
          : (e) => this.sliderC.X() * 1.86 >= point.X();

        if (i !== 0 && i !== this.visip.length - 1) {
          point.setAttribute({ visible: checkVisibility });
        }
      });

      // Ocultar curvas cuando el slider se mueve hacia atrás
      this.sliderC.on('drag', () => {
        this.validateStatus = false;
        this.visip.forEach((point, i) => {
          const checkVisibility = reverse
            ? (e) => this.sliderC.X() * 1.86 <= point.X()
            : (e) => this.sliderC.X() * 1.86 >= point.X();

          if (i !== 0 && i !== this.visip.length - 1) {
            point.setAttribute({ visible: checkVisibility });
          }
        });

        this.pasos.forEach((curve, i) => {
          const checkCurveVisibility = reverse
            ? this.sliderC.X() * 1.86 > this.visip[i + 1].X()
            : this.sliderC.X() * 1.86 < this.visip[i + 1].X();

          if (checkCurveVisibility) {
            curve.setAttribute({ strokeColor: '#0aa1dd', visible: false });
          }
        });
      });
    }
  }

  // Función para manejar la interactividad de los inputs existentes
  handleInputInteraction(inputs) {
    console.log(inputs);
    // Iterar sobre los inputs existentes
    inputs.forEach((input) => {
      const element = input; // Suponiendo que `element` es el objeto JSXGraph creado

      // Agregar evento de clic para manejar la interactividad
      element.on('up', function () {
        // Desactivar todos los inputs
        inputs.forEach((inp) => {
          if (inp !== input) {
            inp.element.setAttribute({ disabled: true });
          }
        });

        // Habilitar solo el input seleccionado
        element.setAttribute({ disabled: false });

        // Limpiar el valor del input seleccionado al hacer clic
        element.setValue(''); // Esto depende de cómo se actualiza el valor en tu implementación
      });
    });
  }
}
