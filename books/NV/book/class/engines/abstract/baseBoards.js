class baseBoards extends BaseEngine {
  constructor(defBoard = {}) {
    super();
    this.visip = [];
    this.allShapes = [];
    this.color = {
      line: {
        strokeColor: "#217e9d",
      },
      points: {
        color: "#f1604d",
      },
      slider: {
        color: " #217e9d",
      },
      lines: {
        color: "#217e9d",
      },
    };
    this.entris = [];
    this.allLines = [];
    this.pasos = [];
    this.points = defBoard.points ?? [];
    this.slider = defBoard.slider ?? [];
    this.curves = defBoard.curves ?? [];
    this.polygons = defBoard.polygons ?? [];
    this.ellipses = defBoard.ellipses ?? [];
    this.arcs = defBoard.arcs ?? [];
    this.inputs = defBoard.inputs ?? [];
    this.lines = defBoard.lines ?? [];
    this.arrows = defBoard.arrows ?? [];
    this.allInputsCreate = [];
    this.pointNames = defBoard.pointNames ?? [];
    this.semicircle = defBoard.semicircle ?? [];
    this.sliderC = "";
    this.allPoints = [];
    this.inputsBoards = [];
  }
  setBoard(idBoard = "jxgbox", nameBoard = "board", node) {
    if (node) {
      this[nameBoard] = node;
    } else if (!this.htmlNode?.querySelector(`#${idBoard}`)) {
      this[nameBoard] = null;
      return;
    } else {
      this[nameBoard] = this?.htmlNode?.querySelector("#jxgbox");
      this[nameBoard].id = this.name + "_board";
    }
  }
  initBoardBase(defBoard) {
    const { id = defBoard?.id ?? "jxgbox", styles } = defBoard;
    if (!document.getElementById(id)) {
      console.warn("no existe el contenedor para el board");
      return;
    }
    const style = {
      label: { visible: false },
      axis: styles?.axis ?? true,
      axis: styles?.axis ?? true,
      boundingbox: styles?.boundingbox ?? [-4, 4, 4, -4],
      maxboundingbox: styles?.maxboundingbox ?? [-15, 15, 15, -15],
      grid: styles?.grid ?? false,
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
            symbol: "\u22c7",
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
          name: "Y",
          strokeWidth: 1.3,
          strokeColor: "black",
          visible: styles?.axies?.y?.visible ?? true,
          ticks: {
            strokeColor: "grey",
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
          name: "X",
          strokeWidth: 1.3,
          strokeColor: "#217e9d",
          visible: styles?.axies?.x?.visible ?? true,
          ticks: {
            drawZero:
              styles?.axies != undefined && !styles?.axies?.y?.visible
                ? true
                : false,
            strokeColor: "grey",
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
      fillColor: "transparent",
      highlightFillColor: "#aaaaaa",
      padding: "2px",
      position: "absolute",
      fontSize: "18px",
      cursor: "pointer",
      zIndex: "100",
      right: "5px",
      bottom: "5px",
      ...style.navbar,
    };
    if (!this.board) {
      console.error("ID no identificado definir un id en el objeto enviado");
      return;
    }
    this.pointsDefault = this.createPoints({ points: this.points });
    this.linesDefault = this.createLines({ lines: this.lines });
    this.arrowsDefault = this.arrows.map(arrow =>
      this.createArrow(
        {
          position_p2_x: arrow.p2_x,
          position_p2_y: arrow.p2_y,
          position_p1_x: arrow.p1_x,
          position_p1_y: arrow.p1_y,
        },
        arrow.type,
        arrow.style,
      ),
    );
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
    return lines.map(line => {
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
        name: "",
        label: {
          visible: line.name,
          autoPosition: true,
        },
        navbar: {
          strokeColor: "blue",
          fillColor: "orange",
          highlightFillColor: "#aaaaaa",
          padding: "2px",
          position: "absolute",
          fontSize: "14px",
          cursor: "pointer",
          zIndex: "100",
          right: "5px",
          bottom: "40px",
        },
        fullscreen: {
          symbol: "\u22c7",
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
      const newLine = this.board.create("line", pointResult, style);
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
      point => typeof point === "object" && typeof point.X === "function",
    );
  }
  createEllipses(params) {
    const { ellipses } = params;
    ellipses.forEach(square => {
      const newSquare = this.board.create("polygon", [
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
      return arcs.map(arc => {
        return this.createArcs({ arc });
      });
    }
    const newArc = this.board.create(
      "arc",
      this.createPoints({ styles: arc.pointsStyle, points: arc.points }),
      arc.style,
    );
    if (arc.name) {
      gTextDefault({ texts: [arc.name] });
    }
    if (arc.interactive) {
      newArc.on("down", () => callback({ attractor: newArc }));
    }
    return newArc;
  }
  addPoint(point) {
    let { style = {}, ref } = point;
    const element = { ...point };
    if (Array.isArray(point)) {
      element.x = point[0];
      element.y = point[1];
      style = {
        size: point[4] ?? 4,
        name: point[3] ?? "",
        label: {
          visible: undefined != point[3] && point[3] != "" ? true : false,
          autoPosition: true,
          offset: point[8] ?? [0, 10],
          fontSize: point[7] ?? 14,
        },
        fixed: false,
        visible: point[2] ?? false,
        fillcolor: point[5] ?? "#f1604d",
        strokeColor: point[5] ?? "#f1604d",
        color: point[6] ?? "#f1604d",
        ...point?.style,
      };
    }
    const newPoint = this.board.create("point", [element.x, element.y], {
      size: 4,
      name: "",
      label: {
        visible: style.name != undefined,
        autoPosition: true,
        offset: [3, 10],
        fontSize: 14,
      },
      precision: {
        touch: 5,
        touchMax: 4,
        mouse: 4,
        pen: 4,
        hasPoint: 1,
      },
      fixed: false,
      visible: true,
      color: "#f1604d",
      ...style,
    });
    newPoint.ignore = point.ignore;
    newPoint.notEliminate = true;
    newPoint.iMod = point.i;
    newPoint.label.ignore = true;
    newPoint.refName = newPoint.name;
    ref ? (newPoint.ref = `${ref ?? ""}`) : null;
    newPoint.originalSize = newPoint.getAttribute("size")

    this.allPoints.push(newPoint);
    return newPoint;
  }
  createCurves(params) {
    const { styles, curves } = params;
    return curves.map(curve => this.addCurve({ curve, styles })) ?? [];
  }
  addCurve(params) {
    const { curve, styles } = params;
    const points = curve.points;
    const style = {
      strokeColor: "#217e9d",
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
      "cardinalspline",
      [
        this.createPoints({ styles: curve.pointsStyle, points: points }),
        curve.flex ?? 1,
        "centripetal",
      ],
      style,
    );
    if (curve.name) {
      gTextDefault({ ...params, texts: [curve.name] });
    }
    cAux.iMod = params.iMod;
    cAux.typeCurve = curve.typeCurve || "curve";
    if (curve.interactive) {
    }
    return cAux;
  }
  textSVG() {
    this.point.forEach(item => {
      this.board.create("point", item.coordenada ?? [0.5, 1.8], {
        name: item.texto ?? "",
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
        polygons.map(polygon => {
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
      "polygon",
      this.createPoints({ styles: polygons.pointsStyle, points }),
      {
        fixed: true,
        withLines: false,
        fillColor: "red",
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
    intervals.forEach(interval => {
      this.addInterval(interval);
    });
  }
  addInterval({
    height = 1.5,
    interval = [-2, 2],
    inputs = { a: "", b: "", c: "" },
    model = "",
  }) {
    let inputsCreate = [
      this.defineInput(interval[1] - 4.7, -1, this.typeInput(inputs?.a)),
      this.defineInput((0, 0) / 2, height + 0.4, this.typeInput(inputs?.b)),
      this.defineInput(interval[1] + 0.7, -1, this.typeInput(inputs?.c)),
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
    if (model == "2") {
      inputsCreate = [
        this.defineInput(interval[1] - 4.7, -1.8, this.typeInput(inputs?.a)),
        this.defineInput((0, 0) / 2, height + 0.3, this.typeInput(inputs?.b)),
        this.defineInput(interval[1] + 0.7, -1.8, this.typeInput(inputs?.c)),
        ...(inputs.a1
          ? [
            this.defineInput(
              interval[1] - 4.7,
              -4.5,
              this.typeInput(inputs?.a1),
            ),
          ]
          : []),
        ...(inputs.b1
          ? [this.defineInput((0, 0) / 2, 4.5, this.typeInput(inputs?.b1))]
          : []),
        ...(inputs.c1
          ? [
            this.defineInput(
              interval[1] + 0.7,
              -4.5,
              this.typeInput(inputs?.c1),
            ),
          ]
          : []),
      ];
    } else if (model == "3") {
      inputsCreate = [
        this.defineInput(interval[1] - 4.7, -1.5, this.typeInput(inputs?.a)),
        this.defineInput((0, 0) / 2, height + 0.4, this.typeInput(inputs?.b)),
        this.defineInput(interval[1] + 0.7, -1.5, this.typeInput(inputs?.c)),
        ...(inputs.a1
          ? [
            this.defineInput(
              interval[1] - 4.7,
              -3.7,
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
              interval[1] + 0.7,
              -3.7,
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
            [-2.7, 2],
          ],
          style: {
            firstArrow: false,
            lastArrow: true,
          },
        },
        {
          points: [
            [1, 2],
            [2.7, 2],
          ],
          style: {
            firstArrow: false,
            lastArrow: true,
          },
        },
        {
          points: [
            [2.7, 2],
            [2.7, 0],
          ],
        },
        {
          points: [
            [-2.7, 2],
            [-2.7, 0],
          ],
        },
        {
          points: [
            [-3, 0],
            [3, 0],
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
      .map(input => {
        const { x, y, value, style, validate, placeholder } = input;

        const disable = style?.disabled;
        const newInput = this.board.create(
          "text",
          [
            x + (style?.input?.noiseX ?? 0),
            y + (style?.input?.noiseY ?? 0),
            `<math-field class='${style?.styleMain ?? "colorInput"} ${style?.mathClass ?? ""
            }' style='${style?.mathStyle ?? ""}' ${disable ? "disabled" : ""
            } placeholder='${placeholder ?? ""}'></math-field>`,
          ],
          {
            anchorX: "middle",
            anchorY: "middle",
            ...style,
            fixed: true,
            highlight: false,
            layer: 20,
          },
        );

        const mathfield = newInput.rendNode.childNodes[0];

        mathfield ? (mathfield.fatherBg = mathfield) : null;
        if (!mathfield.disabled) {
          this.entris.push(mathfield);
        }


        mathfield.value = value?.value ?? value ?? "";
        mathfield.inlineShortcutTimeout = 1;

        mathfield.placeholder = placeholder;
        mathfield.classList.add("inp_" + (this.allInputsCreate.length + 1));
        
        this.allInputsCreate.push(mathfield);

        if (
          validate ||
          !disable ||
          valid ||
          value?.value === "" ||
          value === ""
        ) {
          this.interactiveInputs.push(mathfield);

          return { newInput, mathfield };
        }
      })
      .filter(e => e);
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

    const xDistance = (2.7 - -2.7) / (numPoints - 1);

    const start = reverse ? 1.7 : -1.7;
    const end = reverse ? -1.7 : 1.7;
    this.sliderC = this.board.create(
      "slider",
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

    const points = pointNames.map((name, i) => {
      const x = reverse ? 2.7 - i * xDistance : -2.7 + i * xDistance;
      const y = 0;
      const visi = i === 0 || i === pointNames.length - 1;
      const point = this.board.create("point", [x, y], {
        fixed: true,
        visible: pointVisible ?? visi,
        precision: {
          touch: 7,
          touchMax: 7,
          mouse: 5,
          pen: 5,
          hasPoint: 2,
        },
        size: 5,
        highlight: false,
        fillColor: "#ed581e",
        strokeColor: "#ed581e",
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
      const createCurve = midY2 => {
        const midX2 = (p1.X() + p3.X()) / 2;
        const midPoint2 = this.board.create("point", [midX2, midY2], {
          fixed: true,
          visible: false,
        });
        const c = this.board.create("circumcirclearc", [p1, midPoint2, p3], {
          strokeColor: "#0aa1dd",
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
        clickedPoints.forEach(point => {
          point.setAttribute({ strokeColor: this.color.points.color, size: 5 });
        });
        clickedPoints = [];
      };
      this.visip.forEach((point, i) => {
        point.on("down", () => {
          this.validateStatus = false;
          if (this.activeStep) {
            clickedPoints.push(point);
            point.setAttribute({ strokeColor: "#217e9d", size: 7 });
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
                    strokeColor: "#0aa1dd",
                    visible: true,
                  });
                }
              }
              this.resetClickedPoints();
            }
          }
        });

        const checkVisibility = reverse
          ? e => this.sliderC.X() * 1.86 <= point.X()
          : e => this.sliderC.X() * 1.86 >= point.X();
        if (i !== 0 && i !== this.visip.length - 1) {
          point.setAttribute({ visible: checkVisibility });
        }
      });

      this.sliderC.on("drag", () => {
        this.validateStatus = false;
        this.visip.forEach((point, i) => {
          const checkVisibility = reverse
            ? e => this.sliderC.X() * 1.86 <= point.X()
            : e => this.sliderC.X() * 1.86 >= point.X();
          if (i !== 0 && i !== this.visip.length - 1) {
            point.setAttribute({ visible: checkVisibility });
          }
        });
        this.pasos.forEach((curve, i) => {
          const checkCurveVisibility = reverse
            ? this.sliderC.X() * 1.86 > this.visip[i + 1].X()
            : this.sliderC.X() * 1.86 < this.visip[i + 1].X();
          if (checkCurveVisibility) {
            curve.setAttribute({ strokeColor: "#0aa1dd", visible: false });
          }
        });
      });
    }
  }

  handleInputInteraction(inputs) {
    inputs.forEach(input => {
      const element = input;

      element.on("up", function () {
        inputs.forEach(inp => {
          if (inp !== input) {
            inp.element.setAttribute({ disabled: true });
          }
        });

        element.setAttribute({ disabled: false });

        element.setValue("");
      });
    });
  }
  createArrow(positions, typeLine, styles) {
    const { position_p2_x, position_p2_y, position_p1_x, position_p1_y } =
      positions;
    let point_A = this.board.create("point", [position_p2_x, position_p2_y], {
      visible: false,
    });
    let point_B = this.board.create("point", [position_p1_x, position_p1_y], {
      visible: false,
    });
    let line = this.board.create(typeLine, [point_B, point_A], {
      fixed: true,
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2,
      strokeColor: "#217e9d",
      highlight: false,
      ...styles,
    });
    return line;
  }
  gInterPoint(value, compare, noise = 0.1, minDecimal = 2) {
    if (typeof value === "number" && typeof compare === "number") {
      if (
        parseFloat(value.toFixed(minDecimal)) <=
        parseFloat(compare.toFixed(minDecimal)) + noise &&
        parseFloat(value.toFixed(minDecimal)) >=
        parseFloat(compare.toFixed(minDecimal)) - noise
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  createShapes(shape) {
    const {
      points,
      style,
      type,
      lines,
      refLn,
      refPt,
      params,
      ref,
      mathfields,
      texts,
    } = shape;

    points
      ? points.forEach((point, i) => {
        const p = this.addPoint(point);
      })
      : null;

    lines
      ? lines?.map((line, i) => {
        const ln = this.createLine(line, i, this.allPoints);
        return ln;
      })
      : [];

    mathfields
      ? mathfields.map((inp, i) => {
        const input = this.createInputs({ inputs: inp.inputs });
        return input.mathfield;
      })
      : [];

    texts
      ? texts.map((text, i) => {
        const tx = this.createTextJsxgraph(
          text?.position ? text.position : text,
          text.value,
        );
        return tx;
      })
      : [];

    let pointsToUse =
      this.allPoints?.filter(point => refPt?.some(ref => ref === point.ref)) ??
      []; // busqueda de puntos definidos para la creacion de la forma Jsx que vienen desde la shape como: refPt
    pointsToUse =
      refPt
        ?.map(ref => pointsToUse.find(point => point.ref === ref))
        .filter(Boolean) ?? []; // Reorganizacion de pointsToUse al orden establecido en refPt

    let linesToUse =
      this.allLines?.filter(line => refLn?.some(ref => ref === line.ref)) ?? []; // busqueda de lineas definidas para la creacion de la forma Jsx que vienen desde la shape como: refLn
    linesToUse =
      refLn
        ?.map(ref => linesToUse.find(line => line.ref === ref))
        .filter(Boolean) ?? []; // Reorganizacion de pointsToUse al orden establecido en refPt

    const newShape = type
      ? this.board.create(
        type,
        params ? params : [...(pointsToUse || []), ...(linesToUse || [])],
        {
          ...style,
        },
      )
      : null;

    ref ? (newShape.ref = ref) : null;
    newShape ? this.allShapes.push(newShape) : null;

    return newShape;
  }
  createLine({ type = "line", refPt, style, id, ref, params }, i) {
    /**
     * Crea una línea en el tablero con los puntos y el estilo especificados.
     * @param {Object} options - Configuración para la creación de la línea.
     * @param {string} options.type - El tipo de línea a crear.
     * @param {Array} options.refPt - Referencias a los puntos para la línea.
     * @param {Object} options.style - Estilo de la línea.
     * @param {string} options.id - Identificador para la línea.
     * @param {string} options.ref - Referencia para la línea.
     * @param {Array} options.params - Parámetros alternativos si no hay refPt.
     * @param {number} i - Índice para identificar la línea.
     * @returns {Object} La línea creada.
     */
    // Filtra los puntos usando las referencias proporcionadas o usa los parámetros directos
    const points = refPt
      ? this.allPoints.filter(point => refPt.includes(point.ref))
      : params;

    // Crea la línea en el tablero con el estilo y los puntos especificados
    const ln = this.board.create(type, points, {
      strokeColor: "#217e9d",
      fixed: true,
      straightFirst: false,
      straightLast: false,
      firstArrow: false,
      lastArrow: false,
      strokeWidth: 2,
      name: "",
      label: { visible: !!ref, autoPosition: true },
      ...style,
    });

    // Asigna un ID único a la línea
    ln.id = id ? `${id}_${i}` : `${ref}_${i}`;
    // Asigna la referencia a la línea
    ln.ref = ref ?? ln.id;
    // Agrega la línea a la colección de todas las líneas
    this.allLines.push(ln);

    // Devuelve la línea creada
    return ln;
  }
  createTextJsxgraph({ x, y, style, message }, value) {
    return this.board.create("text", [x, y, value], {
      fixed: true,
      anchorX: "middle",
      anchorY: "middle",
      fontSize: style?.fontSize ?? (screen.width < 600 ? 13 : 18),
      fontWeight: "bolder",
      ...style,
    });
  }
  createInputBelowPoint(point, maxMathfield = 1, referentLine = null) {
    /**
     * Crea un input debajo de un punto en el tablero y lo relaciona con el punto y con la línea de referencia.
     * @param {Point} point - Punto donde se va a crear el input.
     * @param {number} maxMathfield - Número máximo de inputs que se pueden crear. Si se supera este límite, se elimina el input más antiguo.
     * @param {Line} referentLine - Línea de referencia para el input.
     * @returns {MathField} El input creado.
     */
    // Verifica si ya hay un input creado debajo del punto
    if (this.inputsBoards.some(input => input.mathfield?.basePoint === point))
      return;

    // Obtiene las coordenadas del punto
    const x = point.coords.usrCoords[1];
    const y = point.coords.usrCoords[2] + (point.offsetY ?? -1);

    // Verifica si se ha alcanzado el límite de inputs permitidos
    if (this.MathFieldGenerate.length >= maxMathfield) {
      // Elimina el input más antiguo
      const oldestInput = this.MathFieldGenerate.shift();
      this.inputsBoards = this.inputsBoards.filter(
        input => input !== oldestInput.mathfield,
      );
      this.entrisModifid = this.entrisModifid.filter(
        input => input !== oldestInput.mathfield,
      );
      this.board.removeObject(oldestInput.newInput.rendNode);
      this.board.removeObject(oldestInput.newInput);
      // oldestInput.mathfield.basePoint.name = "";
      oldestInput.mathfield.basePoint = null;
    }

    // Crea el input debajo del punto
    const mathfield = this.createInputs({
      inputs: [
        {
          x,
          y,
          style: {
            mathClass: "input-mini",
          },
        },
      ],
    })[0];

    // Asigna la línea de referencia y el punto al input
    Object.assign(mathfield.mathfield, {
      baseLine: referentLine?referentLine:mathfield.baseLine,
      basePoint: point,
      fatherBg: mathfield.mathfield,
    });




    // Agrega el punto a la lista de puntos que han sido modificados
    this.pointsReset.push(point);
    this.entrisModifid.push(mathfield.mathfield);
    this.allEventsForReturn.push(mathfield);
    this.MathFieldGenerate.push(mathfield);
    this.inputsBoards.push(mathfield);
    point.baseMath = mathfield.mathfield
    // Agrega eventos y estilos a los inputs
    this.mathfieldEventsAndLayauts(this.entrisModifid);



    return mathfield.mathfield;
  }
}
