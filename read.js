function getSheetName(hojaActual){  //retorna una lista con los nombres de todos los bloques
    const  hojas = hojaActual.getSheets(); // Obtiene todas las hojas del documento
    const  nombresHojas=hojas.map((sheet)=>sheet.getName()) ; // Inicializa un array para almacenar los nombres de las hojas
    // Recorre todas las hojas y almacena sus nombres en el array
    return nombresHojas.filter((name)=>name!="Evaluaciones"&&name!="resumen"&&name!="grafico"&&name!="modulo"&&name!="Profesores"&&name!="Nuevo Blocke")
  }
  function verifySheets(hojas_sheets,hoja_existente){ //verifica si la hoja que se va a crear existe, retorna un booleano
    const  hojas = hojas_sheets.getSheets(); // Obtiene todas las hojas del documento
    const  nombresHojas=hojas.map((sheet)=>sheet.getName()) ; // Inicializa un array para almacenar los nombres de las hojas
    return  !nombresHojas.includes(hoja_existente)
  }
  function getColumnByName(sheet, columnName) {
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Buscar el índice de la columna con el nombre dado
    const columnIndex = headers.indexOf(columnName);
    
    if (columnIndex === -1) {
      throw new Error(`La columna con el nombre '${columnName}' no fue encontrada.`);
    }
    
    // Obtener todos los valores de la columna, excluyendo el encabezado
    const data = sheet.getRange(2, columnIndex + 1, sheet.getLastRow() - 1).getValues();
    
    // Convertir a una lista plana y retornarla
    return data.flat();
  }
  