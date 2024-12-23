function crear_hoja_pregunta_ponderada(nombre,hojasActuales) {
  
  
    if(verifySheets(hojasActuales,nombre)){const nueva_hoja = createSheetByName(hojasActuales,nombre);}
    else {
    deleteSheetByName(hojasActuales,nombre);
    const nueva_hoja = createSheetByName(hojasActuales,nombre);
    }
    
    return hojasActuales.getSheetByName(nombre)
  
  }
  function deleteSheetByName(spreadsheet, sheetName) {
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (sheet) {
      spreadsheet.deleteSheet(sheet);
      Logger.log("Hoja '" + sheetName + "' eliminada correctamente.");
    } else {
      Logger.log("No se encontró ninguna hoja con el nombre '" + sheetName + "'.");
    }
  }
  function createSheetByName(spreadsheet, sheetName) {
    const newSheet = spreadsheet.insertSheet(sheetName);
    Logger.log("Nueva hoja '" + sheetName + "' creada correctamente.");
    return newSheet;
  }
  function escribir_resultado_pregunta_ponderada5(informaciones,sheet){
  encabezado=["Nombre_profesor","UniqueID","Nombre_curso","Nota_final","Muy de acuerdo","De acuerdo","Ni de acuerdo ni en desacuerdo","End desacuerdo","Muy desacuerdo"]
  informaciones = [encabezado,...informaciones]
  sheet.getRange(1, 1, informaciones.length, informaciones[0].length).setValues(informaciones);
  
  
  
  
  
  
  }
  function escribir_resumen_y_destacar_deficientes(resumen,hoja,preguntas,lista_bool){
    encabezado=["Nombre_profesor","UniqueID","Nombre_curso",...preguntas,"Promedio"]
    resumen = [encabezado,...resumen]
    console.log("entre")
    resumen.forEach((fila, i) => {
      fila.forEach((valor, j) => {
        const rango = hoja.getRange(i + 1, j + 1); // Celda en la fila `i+1` y columna `j+1`
        
        if (typeof valor === "number") {
          rango.setValue(valor); // Configurar directamente si es número
          rango.setNumberFormat("0,00"); // Formato con 2 decimales
        } else if (typeof valor === "string" && valor.includes("%")) {
          rango.setValue(parseFloat(valor) / 100); // Convertir porcentaje si es cadena
          rango.setNumberFormat("0.00%"); // Formato de porcentaje
        } else {
          rango.setValue(valor); // Dejar otros valores tal como están
        }
      });
    });
    lista_bool.forEach((bools, idx) => bools? hoja.getRange(idx+2, encabezado.length, 1, 1).setBackground("#FFFFFF"):hoja.getRange(idx+2, encabezado.length, 1, 1).setBackground("#EC7777"))
  
  
  
  
  } 
  function escribir_resultado_pregunta_ponderada_cursos(informaciones,sheet){
  encabezado=["UniqueID","Nombre_curso","Nombre_profesor","Nota_final","Muy de acuerdo","De acuerdo","Ni de acuerdo ni en desacuerdo","End desacuerdo","Muy desacuerdo"]
  informaciones = [encabezado,...informaciones]
  console.log("informaciones; ",informaciones)
  sheet.getRange(1, 1, informaciones.length, informaciones[0].length).setValues(informaciones);
  
  
  
  
  
  
  }
  function escribir_resultado_pregunta_horas_curso(informaciones,sheet){
  encabezado=["UniqueID","Nombre_curso","Nombre_profesor","1 a 3 horas","4 a 5 horas","6 a 7 horas","8 a 9 horas","10 a 11 horas","12 a 13 horas","14 a 15 horas","16 a 20 horas","21 a 25 horas","26 a 30 horas","31 a 40 horas","41 a 50 horas","Mas de 50 horas"]
  informaciones = [encabezado,...informaciones]
  sheet.getRange(1, 1, informaciones.length, informaciones[0].length).setValues(informaciones);
  
  
  
  
  
  
  }
  function escribir_resultado_pregunta_ACtividades_curso(informaciones,sheet){
  encabezado=["UniqueID","Nombre_curso","Nombre_profesor","Exposición del profesor en clases","La participación de mis compañeros","Lecturas","Videos u otro material multimedia","Trabajos de investigación","Actividades de discusión, debate o foros","Ejercicios de aplicación y/o guías","Trabajos grupales","Simulaciones","Prácticas o pasantías","Pruebas y controles"]
  informaciones = [encabezado,...informaciones]
  sheet.getRange(1, 1, informaciones.length, informaciones[0].length).setValues(informaciones);
  
  
  
  
  
  
  }
  function escribir_resultado_pregunta_si_no(informaciones,sheet,preguntas){
  encabezado=["UniqueID","Nombre_curso","Nombre_profesor",...preguntas]
  informaciones = [encabezado,...informaciones]
  console.log("informaciones; ",informaciones)
  sheet.getRange(1, 1, informaciones.length, informaciones[0].length).setValues(informaciones);
  
  
  
  
  
  
  }
  
  
  
  
  