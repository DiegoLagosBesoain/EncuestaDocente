function onOpen(){
    const ui = SpreadsheetApp.getUi(); //crea referencia a la interfaz de usuario de Spreadsheet
  
    ui.createMenu("Menú Test")
      .addItem("Verificar Profesores", "verifyT")
      .addItem("Verificar cursos","verificarCursos")
      
      .addToUi();
  }
  function verifyT(){
  
    const  hojasActuales = SpreadsheetApp.getActiveSpreadsheet();
    const nombre_hojas = getSheetName(hojasActuales);
    console.log(nombre_hojas);
    const hoja_raw=hojasActuales.getSheetByName('RawData');
    const data = hoja_raw.getDataRange().getValues();
    data.shift()
    console.log(data)
    const nombre_profesores1= obtener_profesores_posicion(data)
    console.log("Nombres profesor: ",nombre_profesores1)
    const nombres = nombre_curso(nombre_profesores1);
    console.log("Nombres_curso: ",nombres)
    const columnas = [21,23,25,27,28,29,30,31]
    let nombres_pregunta=[]
    let resumen = [...nombres]
    let notas_por_pregunta=[]
    columnas.forEach((col,idx)=>{
      let primerElemento = hoja_raw.getRange(1, col).getValue();
      nombres_pregunta.push(primerElemento)
      let hoja = crear_hoja_pregunta_ponderada(primerElemento,hojasActuales)
  
      const notas_profesores_total = data_notas_profesores(nombres,data,col,5)
      escribir_resultado_pregunta_ponderada5(notas_profesores_total,hoja)
      
      notas_profesores_total.forEach((notas,idx)=>{
        resumen[idx]=resumen[idx].concat([notas[3]])
  
  
  
      })
  
  
  
  
    })
    console.log(resumen)
    const promedios = obtener_promedios(resumen)
    const bool_list = promedios.map((nota)=>{
      if (nota<4){
        return false
      }else
        return true
  
  
  
    })
    console.log("bool_list",bool_list)
    console.log(nombres_pregunta)
    resumen1=resumen.map((fila,idx)=>fila.concat([promedios[idx]]))
    console.log(resumen1)
    const hoja_resumen = crear_hoja_pregunta_ponderada("Resumen",hojasActuales)
    escribir_resumen_y_destacar_deficientes(resumen1,hoja_resumen,nombres_pregunta,bool_list)
  
  
  
  
  
    //let hoja = crear_hoja_pregunta_ponderada("P1",hojasActuales)
  
    //const notas_profesores_total = data_notas_profesores(nombres,data,21,5)
    //escribir_resultado_pregunta_ponderada5(notas_profesores_total,hoja)
  
  
  
  
  }
  function verificarCursos(){
    const  hojasActuales = SpreadsheetApp.getActiveSpreadsheet();
    const nombre_hojas = getSheetName(hojasActuales);
    console.log(nombre_hojas);
    const hoja_raw=hojasActuales.getSheetByName('RawData');
    const data = hoja_raw.getDataRange().getValues();
    data.shift()
    console.log(data)
    const nombre_cursos1= obtener_cursos_posicion(data)
    const id_cursos = curos_unicos(nombre_cursos1)
    console.log("Nombre cursos: ",id_cursos)
    const columnas = [9,19]
    let nombres_pregunta=[]
    columnas.forEach((col,idx)=>{
      
      let primerElemento = hoja_raw.getRange(1, col).getValue();
      nombres_pregunta.push(primerElemento)
      let hoja = crear_hoja_pregunta_ponderada(primerElemento,hojasActuales)
      
      const notas_profesores_total = data_notas_curso(id_cursos,data,col,5)
      escribir_resultado_pregunta_ponderada_cursos(notas_profesores_total,hoja)
      
    
  
  
  
  
    })
    let horas_curso_tabla_total=[]
      id_cursos.forEach((nombre)=>{
      let curso=[]
      let tabla_frecuencias_hora = obtener_tabla_pregunta_binaria_unica(data_curso(nombre[2],data,nombre[0]),8,13)
      
      let tabla_porcentaje_horas = normalizar_pregutna_binaria_unica(tabla_frecuencias_hora)
      curso = curso.concat(nombre)
      Object.keys(tabla_porcentaje_horas).slice().forEach((a)=>{
        curso = curso.concat([tabla_porcentaje_horas[a]]+ "%")
      
      }
      
      )
  
  
  
  
  
      horas_curso_tabla_total.push(curso)
    })
    
    hoja = crear_hoja_pregunta_ponderada("Horas de dedicacion",hojasActuales)
    escribir_resultado_pregunta_horas_curso(horas_curso_tabla_total,hoja)
  
  
    let actividades_curso_tabla_total=[]
      id_cursos.forEach((nombre)=>{
      let curso=[]
      let data_curso1 = data_curso(nombre[2],data,nombre[0])
      let tabla_frecuencias_actividades = tabla_frecuencias_tabla_binaria_multiple(data_curso1,11,11)
      total_datos = data_curso1.length
      
      let tabla_porcentaje_horas = normalizar_pregutna_binaria_miltiple(tabla_frecuencias_actividades,total_datos)
      curso = curso.concat(nombre)
      Object.keys(tabla_porcentaje_horas).slice().reverse().forEach((a)=>{
        curso = curso.concat([tabla_porcentaje_horas[a]]+ "%")
      
      }
      
      )
  
  
  
  
  
      actividades_curso_tabla_total.push(curso)
    })
    
    hoja = crear_hoja_pregunta_ponderada("Actividades",hojasActuales)
    escribir_resultado_pregunta_ACtividades_curso(actividades_curso_tabla_total,hoja)
    //pregutnas de si y no
    
    preguntas_si_y_no = [[12,14],[15,18]]
    let colinicial=0
    let colfinal=0
    preguntas_si_y_no.forEach((columnas)=>{
      colinicial=columnas[0]
      colfinal=columnas[1]
      console.log("Columnas analizadas",colinicial,colfinal)
      let tabla_frecuencias_si_no_total=[]
      id_cursos.forEach((nombre)=>{
      let curso=[]
      let tabla_frecuencias_si_no = analizar_preguntas_si_y_no(data_curso(nombre[2],data,nombre[0]),colinicial,colfinal)
      console.log(tabla_frecuencias_si_no)
      let tabla_frecuencias_si_no_porcentaje = normalizar_pregutna_binaria_miltiple(tabla_frecuencias_si_no,data_curso(nombre[2],data,nombre[0]).length)
      curso = curso.concat(nombre)
      Object.keys(tabla_frecuencias_si_no_porcentaje).slice().forEach((a)=>{
        curso = curso.concat([ tabla_frecuencias_si_no_porcentaje[a]]+ "%")
      
      }
      
      
      )
  
  
  
  
  
      tabla_frecuencias_si_no_total.push(curso)
    })    
    console.log(tabla_frecuencias_si_no_total)
    let preguntas=[]
    rango(colinicial, colfinal).forEach((col)=>{
  
      preguntas.push(hoja_raw.getRange(1, col).getValue())
    })
    primerElemento = hoja_raw.getRange(1, colinicial).getValue()
    hoja = crear_hoja_pregunta_ponderada(primerElemento,hojasActuales)
    escribir_resultado_pregunta_si_no(tabla_frecuencias_si_no_total,hoja,preguntas)
  
  
  
  
  
  
    })
  
    
    
  
  
  
  
  
  }
  
  
  
  function data_notas_profesores(nombres,data,col,escala){
    let notas_profesores_total=[]
    nombres.forEach((nombre)=>{
      //console.log(data_profesor(nombre[0],data).length)
      let profesor=[]
      let tabla_frecuencias = tabla_frecuencias_suma_ponderada(data_profesor(nombre[0],data,nombre[1]),col,escala)
      console.log(tabla_frecuencias)
      let tabla_ponderada = normalizar(tabla_frecuencias)
      console.log(tabla_ponderada)
      profesor= profesor.concat(nombre)
      
      const nota_final=(Object.keys(tabla_ponderada).reduce((ponderado,nota)=>{
        return (tabla_ponderada[nota])*Number(nota)+ponderado
      },0)/100).toFixed(2);
      profesor = profesor.concat([nota_final])
      Object.keys(tabla_ponderada).slice().reverse().forEach((a)=>{
        profesor = profesor.concat([tabla_ponderada[a]]+ "%")
      
      }
      
      )
      
  
      
      
      notas_profesores_total.push(profesor)
    }
    
    )
    console.log("nota_profesores : ",notas_profesores_total)
    return notas_profesores_total
  
  
  
  
  
  }
  function data_notas_curso(nombres,data,col,escala){
    let notas_cursos_total=[]
    
    nombres.forEach((nombre)=>{
      //console.log(data_profesor(nombre[0],data).length)
      let curso=[]
      
      let tabla_frecuencias = tabla_frecuencias_suma_ponderada(data_curso(nombre[2],data,nombre[0]),col,escala)
      console.log(tabla_frecuencias)
      let tabla_ponderada = normalizar(tabla_frecuencias)
      console.log(tabla_ponderada)
      curso= curso.concat(nombre)
      
      const nota_final=(Object.keys(tabla_ponderada).reduce((ponderado,nota)=>{
        return (tabla_ponderada[nota])*Number(nota)+ponderado
      },0)/100).toFixed(2);
      curso = curso.concat([nota_final])
      Object.keys(tabla_ponderada).slice().reverse().forEach((a)=>{
        curso = curso.concat([tabla_ponderada[a]]+ "%")
      
      }
      
      )
      
  
      
      
      notas_cursos_total.push(curso)
    }
    
    )
    console.log("nota_profesores : ",notas_cursos_total)
    return notas_cursos_total
    
  
  
  
  
  
  }
  function rango(inicio, fin) {
      const resultado = [];
      for (let i = inicio; i <= fin; i++) {
          resultado.push(i);
      }
      return resultado;
  }
  
  