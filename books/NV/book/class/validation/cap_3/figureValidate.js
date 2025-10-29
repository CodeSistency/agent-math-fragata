class FigureValidate extends BaseValidate {
  constructor() {
    super();
    this.segmentsCorrect = []
    this.evaluate = [];
  } 

  iniTMainValidations(def, conditions, defBoard) {
    const {circles,segments,tangents_circles,tangents_lines,inputs,lines}= conditions
    this.resetData()

      circles?.forEach((CircleCondi,i) => {
        
        const circle = def.allCircle[i]

        if (!circle) def.alertManager.Open({message:"No olvides crear los circulos con el compass"})
         let status = circles.some(con=>{
          
          return this.validateCircle({
            point1:circle?.inherits[0],
            point2:circle?.inherits[1],
            condition:con,
            circle:circle

          })
         })

        this.aggClassValidateJSX(circle,status)
      });

      tangents_circles?.forEach((tangenCondi,i)=>{
        let circleCorrect = null;

        const linesEvaluate = def.allLines.filter(ln =>{
          return Array.isArray(tangenCondi.lines) && tangenCondi.lines.includes(ln.ref)
        } 
        );
        
        linesEvaluate.forEach(e=>{
        })

          let status = def.allLines.some((line)=>{
            if (tangenCondi.lines.includes(line.ref)) {// si al linea evaluada no es la definida return false
              
              let circlesEvaluate = def.allCircle.filter(circle =>{
              return Array.isArray(tangenCondi.circles) && tangenCondi.circles.includes(circle.ref)
            });

        


              const validation = this.validateTangentLines({ lines: linesEvaluate, circle: circlesEvaluate[0] });
              circleCorrect=circlesEvaluate[0]
              return validation
          }
          return false
          })

          if (!circleCorrect) {     
            let circlesEvaluate = def.allCircle.filter(circle =>{
               return Array.isArray(tangenCondi.circles) && tangenCondi.circles.includes(circle.ref)
             });
             circleCorrect = circlesEvaluate[0]
          }
       
          

          this.aggClassValidateJSX(circleCorrect,status)
      
      })

      tangents_lines?.forEach((tangenCondi, i) => {
        let lineCorrect = null; // Inicializa lineCorrect a null para cada iteración
        let status = null;
    
        const linesEvaluate = def.allLines.filter(ln =>{
          return Array.isArray(tangenCondi.lines) && tangenCondi.lines.includes(ln.ref)
        } 
        );

        if ((!Array.isArray(linesEvaluate) || linesEvaluate.length === 0) && this.data.status !== 1 ) def.alertManager.Open({message:"te faltan lineas por crear, crealas y vuelve a intentarlo"})

        
        
        status = def.allLines.some((line, a) => {
          // Ignorar líneas que ya tienen IsValueCorrect como true

          
      
          // Verificar si la línea está en linesEvaluate y tiene manipulación
          if (linesEvaluate.some(lnE => lnE.ref == line.ref) && line.manipulation) {
              let circlesEvaluate = def.allShapes.filter(shape => 
                  Array.isArray(tangenCondi.circles) && tangenCondi.circles.includes(shape.ref)
              );
      
              // Validar las líneas contra los círculos
              const validation = linesEvaluate.every(lnEV => this.validateTangentCircles({ line: line, circles: circlesEvaluate }));
              

                lineCorrect = line;  
                
                // Actualizar IsValueCorrect si la validación es exitosa
                if (validation) {
                  line.IsValueCorrect = true;
                }
      
              return validation; // Devolverá true si validation es true
          }
      
          return false; // Devuelve false si la condición no se cumple
      });
      
      // Llamar a la función de validación agregada
      this.aggClassValidateJSX(lineCorrect, status);
      });

      inputs?.forEach((intCondi, i) => {
        let entri = def.entrisModifid[i];
        

        // Si no hay entrada, validar y regresar inmediatamente
        if (!entri) {
          
            def.alertManager.Open({message:"No olvides clickear los puntos para asignarles un valor"})
            this.validateEntriCondition(entri, intCondi);
            return;
        }

        // Si hay condiciones específicas relacionadas con puntos, posiciones o círculos
        if ((intCondi?.espeficPoint || intCondi?.position || intCondi.circles) && entri) {
            
            // Buscar los círculos que necesitan ser evaluados
            let circlesEvaluate = Array.isArray(intCondi.circles) ? 
                def.allShapes.filter(shape => intCondi.circles.includes(shape.ref)) : [];

            // Verificar condición de punto específico
            if (intCondi?.espeficPoint?.includes(entri.basePoint.ref)) {
                return this.validateEntriCondition(entri, intCondi.compare);
            } 
            
            // Verificar condición de posición
            else if (entri.basePoint && typeof entri.basePoint.X === 'function' && Array.isArray(intCondi.position) && intCondi.position.length > 0) {
                let entriCorrect;
                let condiCorrect;
                
                let status = intCondi.position.some((po) => {
                    if (this.gInterPoint(entri.basePoint.X(), po[0], po[3] ?? 0.5) && 
                        this.gInterPoint(entri.basePoint.Y(), po[1], po[3] ?? 0.5)) {
                        entriCorrect = entri;
                        condiCorrect = po[2];
                        return true;
                    }
                    return false;
                });

                return !entriCorrect ? 
                    this.validateEntriCondition(entri, ["error"]) : 
                    this.validateEntriCondition(entriCorrect, condiCorrect);
            } 
            
            else if (circlesEvaluate.length > 0 && this.isPointOnCircle(circlesEvaluate[0], entri?.basePoint)) {
           
          
              const pointEvaluate = entri.basePoint.baseLine?.inherits.filter(point => point.id !== entri.basePoint.id) ?? [];
          
              if (pointEvaluate[0] && typeof pointEvaluate[0].X === 'function' &&
                  Array.isArray(intCondi.positionAgainst) && intCondi.positionAgainst.length >= 2 &&
                  this.gInterPoint(pointEvaluate[0].X(), intCondi.positionAgainst[0], 0.5) &&
                  this.gInterPoint(pointEvaluate[0].Y(), intCondi.positionAgainst[1], 0.5)) {
                  
                  
          
                  return this.validateEntriCondition(entri, intCondi.compare);
              } 
              
              // Si la condición de positionAgainst existe pero no se cumple
              else if (intCondi.positionAgainst) {
          
                  let value = entri.value;
                  entri.value = "error";
                  this.validateEntriCondition(entri, intCondi.compare);
          
                  return entri.value = value;
              }
          
              return this.validateEntriCondition(entri, intCondi.compare);
          }
            
            // Caso predeterminado para manejar condiciones no validadas
            else {
                let value = entri?.value;
                entri.value = "error";
                this.validateEntriCondition(entri, intCondi.compare);
                return entri.value = value;
            }
        }

        // Validar la condición de entrada si ninguna de las condiciones anteriores se cumple
        this.validateEntriCondition(entri, intCondi);
      });
    
      segments?.forEach((segmentCondi,i)=>{
        let status
        
        let segmentEvaluate = def.allSegments[i]
        
        if (!segmentEvaluate) def.alertManager.Open({message:"No olvides crear los segmentos entre los puntos"})
        this.aggClassValidateJSX(segmentEvaluate, this.validateSegments(segmentEvaluate, segmentCondi));
      })

      lines?.forEach((lineCondi, i) => {
        const { points, refLn,noise } = lineCondi;    
    
      
        let lineCorrect;
      
        // Iterar sobre cada par de puntos en el array points
        const status = def.allLines.some(ln => {
        

        
          if (refLn?.includes(ln.ref) && ln.manipulation) {
            
              // Iterar sobre cada par de puntos
              for (let j = 0; j < points.length; j++) {
                  const pointPair = points[j];
                  const validation = this.validateLine({
                      line: ln,
                      point1: pointPair[0],
                      point2: pointPair[1],
                      noise:noise
                  });
                  
                  // Si la validación es exitosa, guardamos la línea correcta
                  lineCorrect = ln;
                  if (validation) {
                      return true; // Salimos del bucle some si encontramos una validación exitosa
                  }else{
                    false
                  }
              }
              
              if (!lineCorrect) def.alertManager.Open({message:"No olvides crear las lineas, crealas y vuelve a intentarlo"})

          }
          
          
          return false; // Si no se cumple la condición, continuamos
      });
  
      this.aggClassValidateJSX(lineCorrect, status);
      });

    
    this.updateMessage()
    return this.data;
  }

  validateTangentCircles(paramsValidation) {
    const { line, circles } = paramsValidation;

    // Si no hay círculos, devuelve false
    if (!circles || circles.length === 0) {
        return false;
    }


    return circles.every(circle => this.isTangent(circle, line));
  }
  validateTangentLines(paramsValidation) {
    const { lines, circle } = paramsValidation;


    // Si no hay círculos, devuelve false
    if (!lines || lines.length === 0) {
        return false;
    }


    return lines.every(line => this.isTangent(circle, line));
  }
  isTangent(circle, line, tolerance = 0.150) {
    if (circle && line) {
        const center = circle.center.coords.usrCoords.slice(1); // Coordenadas del centro del círculo (X, Y)
        const radius = circle.Radius();
        const lineProps = this.getLineProperties(line);

        // Calcular la distancia desde el centro del círculo a la línea utilizando sus propiedades
        const a = -lineProps.slope;
        const b = 1;
        const c = -(a * lineProps.start.x + b * lineProps.start.y);

        const distance = Math.abs(a * center[0] + b * center[1] + c) / Math.sqrt(a * a + b * b);

        const isTangent = Math.abs(distance - radius) <= tolerance;
        return isTangent
          
    }
  }
  validateCircle(paramsValidation){
    const {point1,point2,condition,circle} = paramsValidation

    if (point1&&point2&&circle) {
      const pX = this.gInterPoint(point1.X(),condition[0],condition[3]??0.3)
      const pY = this.gInterPoint(point1.Y(),condition[1],condition[3]??0.3)
      const radius = this.gInterPoint(circle.Radius(),condition[2],condition[3]??.2)
      return (pX&&pY&&radius)?true:false
    }

    return "forAnswer"
  }
  
  
  validateSegments(line, condition) {
    // console.log(line?.point1.refName,line?.point2.refName);
    
      const point1Name = line?.point1.refName?.toLowerCase()??""; 
      const point2Name = line?.point2.refName?.toLowerCase()??""; 
      const segmento = `${point1Name}${point2Name}`;
      const segmentoReverse = `${point2Name}${point1Name}`;

      return condition.includes(segmento) || condition.includes(segmentoReverse)
  }
  validateLine(params){
    const {line, point1, point2,noise=[.5,.5]} = params

    if (line,point1,point2) {
      
      const x1 = line.point1.X();
      const y1 = line.point1.Y();
      const x2 = line.point2.X();
      const y2 = line.point2.Y();
  
      const isMatchDirect = this.gInterPoint(x1, point1[0],noise[0]) && this.gInterPoint(y1, point1[1],noise[1]) 
                        &&  this.gInterPoint(x2, point2[0],noise[0]) && this.gInterPoint(y2, point2[1],noise[1]);
                                    
      const isMatchInverted = this.gInterPoint(x1, point2[0],noise[0]) && this.gInterPoint(y1, point2[1],noise[1]) 
                        &&  this.gInterPoint(x2, point1[0],noise[0]) && this.gInterPoint(y2, point1[1],noise[1]);
      
      return isMatchDirect || isMatchInverted;
    }

    return "forAnswer"
  }

  statusValidate(data) {
    if (data.interaction.incorrect < 1 && data.interaction.forAnswer < 1) {
      data.message += '¡Muy bien! Excelente';
      data.status = 1;
    } else if (data.interaction.forAnswer < 1 && data.interaction.correct < 1) {
      data.message += "Verifica los valores";
      data.status = 2;
    } else if (data.interaction.correct > 1 && data.interaction.incorrect > 1) {
      data.message += "Rectifica los valores";
      data.status = 2;
    } else {
      data.message += "Verifica o completa el ejercicio";
      data.status = 2;
    }
  }
  isPointOnCircle(circle, point, tolerance = 0.150) {
    if (circle && point) {
        // Obtener las coordenadas del centro del círculo
        const center = circle.center.coords.usrCoords.slice(1); // [X, Y]
        const radius = circle.Radius(); // Radio del círculo

        // Obtener las coordenadas del punto
        const pointCoords = point.coords.usrCoords.slice(1); // [X, Y]

        // Calcular la distancia desde el centro del círculo al punto
        const distance = Math.sqrt(
            Math.pow(pointCoords[0] - center[0], 2) + 
            Math.pow(pointCoords[1] - center[1], 2)
        );

        // Verificar si la distancia es aproximadamente igual al radio (dentro de la tolerancia)
        return Math.abs(distance - radius) <= tolerance;
    }
    return false; // Devuelve false si no hay círculo o punto
}
  

 




}
