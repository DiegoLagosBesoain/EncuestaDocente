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
function escribir_resultado_pregunta_ponderada5(informaciones, sheet,descripcion_pregunta) {
  const encabezado = [
    "Nombre_profesor",
    "UniqueID",
    "Nombre_curso",
    "Nota_final",
    "Muy de acuerdo",
    "De acuerdo",
    "Ni de acuerdo ni en desacuerdo",
    "En desacuerdo",
    "Muy desacuerdo"
  ];

  const informaciones2 = [encabezado, ...informaciones];

  
  const informaciones3 = informaciones2.filter((lista) => {
    if (lista.length === 10) {
      
      return false;
    }
    return true;
  });

  // Formatear los valores en la columna 3 (índice 3 desde 0)
  informaciones3.forEach((fila, i) => {
     // Ignorar el encabezado
      fila[3] = fila[3].replace(".", ","); // Redondear y reemplazar punto con coma
    
  });

  // Ajustar el rango para coincidir con el número de columnas
  sheet.getRange(2, 1, 1, 1).setValue(descripcion_pregunta).setBackground("#6e92f5")
  sheet.getRange(2, 1, 1, 4).setBackground("#6e92f5")
  sheet.getRange(4, 1, 1, informaciones3[0].length).setBackground("#6e92f5")
  sheet.getRange(4, 1, informaciones3.length, informaciones3[0].length).setValues(informaciones3);
}
function escribir_resumen_y_destacar_deficientes(resumen, hoja, preguntas, lista_bool) {
  const encabezado = ["Nombre_profesor", "UniqueID", "Nombre_curso", ...preguntas, "Promedio"];
  resumen = [encabezado, ...resumen];
 
  hoja.getRange(1, 1, 1, encabezado.length).setBackground("#6e92f5")
  resumen.forEach((fila, i) => {
    fila.forEach((valor, j) => {
      const rango = hoja.getRange(i + 1, j + 1); // Celda en la fila `i+1` y columna `j+1`
      
      if (typeof valor === "number") {
        rango.setValue(valor); // Configurar directamente si es número
        rango.setNumberFormat("0,00"); // Formato con 2 decimales
      } else if (typeof valor === "string" && valor.includes("%")) {
        rango.setValue(parseFloat(valor) / 100); // Convertir porcentaje si es cadena
        rango.setNumberFormat("0.00%"); // Formato de porcentaje
      } else if (typeof valor === "string" && valor.includes(".")) {
        // Reemplazar puntos decimales con comas
        const valorConComa = valor.replace(".", ",");
        rango.setValue(valorConComa);
      } else {
        rango.setValue(valor); // Dejar otros valores tal como están
      }
    });
  });

  lista_bool.forEach((bools, idx) => 
    bools
      ? hoja.getRange(idx + 2, encabezado.length, 1, 1).setBackground("#FFFFFF")
      : hoja.getRange(idx + 2, encabezado.length, 1, 1).setBackground("#EC7777")
  );
}

function escribir_resultado_pregunta_ponderada_cursos(informaciones,sheet,descripcion_pregunta){
encabezado=["UniqueID","Nombre_curso","Nombre_profesor","Nota_final","Muy de acuerdo","De acuerdo","Ni de acuerdo ni en desacuerdo","End desacuerdo","Muy desacuerdo"]


const informaciones2 = [encabezado, ...informaciones];

  
  const informaciones3 = informaciones2.filter((lista) => {
    if (lista.length === 10) {
      
      return false;
    }
    return true;
  });

  // Formatear los valores en la columna 3 (índice 3 desde 0)
  informaciones3.forEach((fila, i) => {
     // Ignorar el encabezado
      fila[3] = fila[3].replace(".", ","); // Redondear y reemplazar punto con coma
    
  });

  // Ajustar el rango para coincidir con el número de columnas
  sheet.getRange(2, 1, 1, 1).setValue(descripcion_pregunta).setBackground("#6e92f5")
  sheet.getRange(2, 1, 1, 4).setBackground("#6e92f5")
  sheet.getRange(4, 1, 1, informaciones3[0].length).setBackground("#6e92f5")
  sheet.getRange(4, 1, informaciones3.length, informaciones3[0].length).setValues(informaciones3);







}
function escribir_resultado_pregunta_horas_curso(informaciones,sheet,descripcion_pregunta){
encabezado=["UniqueID","Nombre_curso","Nombre_profesor","1 a 3 horas","4 a 5 horas","6 a 7 horas","8 a 9 horas","10 a 11 horas","12 a 13 horas","14 a 15 horas","16 a 20 horas","21 a 25 horas","26 a 30 horas","31 a 40 horas","41 a 50 horas","Mas de 50 horas"]
const informaciones2 = [encabezado,...informaciones]
const informaciones3 = informaciones2.filter((lista) => {
    if (lista.length === 17) {
      console.log("Tamaño entrada:", lista.length, "Entrada:", lista);
      return false;
    }
    return true;
  });
sheet.getRange(2, 1, 1, 1).setValue(descripcion_pregunta).setBackground("#6e92f5")
sheet.getRange(2, 1, 1, 4).setBackground("#6e92f5")
sheet.getRange(4, 1, 1, informaciones3[0].length).setBackground("#6e92f5")
sheet.getRange(4, 1, informaciones3.length, informaciones3[0].length).setValues(informaciones3)    ;    
       





}
function escribir_resultado_pregunta_ACtividades_curso(informaciones,sheet,descripcion_pregunta){
encabezado=["UniqueID","Nombre_curso","Nombre_profesor","Exposición del profesor en clases","La participación de mis compañeros","Lecturas","Videos u otro material multimedia","Trabajos de investigación","Actividades de discusión, debate o foros","Ejercicios de aplicación y/o guías","Trabajos grupales","Simulaciones","Prácticas o pasantías","Pruebas y controles"]

const informaciones2 = [encabezado,...informaciones]
const informaciones3 = informaciones2.filter((lista) => {
    if (lista.length === 15) {
      
      return false;
    }
    return true;
  });
sheet.getRange(2, 1, 1, 1).setValue(descripcion_pregunta).setBackground("#6e92f5")
sheet.getRange(2, 1, 1, 4).setBackground("#6e92f5")
sheet.getRange(4, 1, 1, informaciones3[0].length).setBackground("#6e92f5")
sheet.getRange(4, 1, informaciones3.length, informaciones3[0].length).setValues(informaciones3)







}
function escribir_resultado_pregunta_si_no(informaciones,sheet,preguntas,descripcion_pregunta){
encabezado=["UniqueID","Nombre_curso","Nombre_profesor",...preguntas]
const informaciones2 = [encabezado,...informaciones]

const informaciones3 = informaciones2.filter((lista) => {
    if (lista.length === encabezado.length+1) {
      
      return false;
    }
    return true;
  });


  // Ajustar el rango para coincidir con el número de columnas
  sheet.getRange(4, 1, informaciones3.length, informaciones3[0].length).setValues(informaciones3);
  sheet.getRange(2, 1, 1, 1).setValue(descripcion_pregunta).setBackground("#6e92f5")
  sheet.getRange(2, 1, 1, 4).setBackground("#6e92f5")
  sheet.getRange(4, 1, 1, informaciones3[0].length).setBackground("#6e92f5")
  sheet.getRange(4, 1, informaciones3.length, informaciones3[0].length).setValues(informaciones3) 






}




