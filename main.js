function onOpen(){
  const ui = SpreadsheetApp.getUi(); //crea referencia a la interfaz de usuario de Spreadsheet

  ui.createMenu("Menú Test")
    .addItem("Verificar Profesores", "verifyT")
    .addItem("Verificar cursos","verificarCursos")
    .addItem("Agregar areas","agregarAreas")
    .addItem("Filtrar por Área","filterAndCopyByType")
    .addItem("Filtrar Todos por Área","filterAndCopyAllByType")

    .addToUi();
}
function verifyT(){

  const  hojasActuales = SpreadsheetApp.getActiveSpreadsheet();
  const nombre_hojas = getSheetName(hojasActuales);
  
  const hoja_raw=hojasActuales.getSheetByName('RawData');
  const hoja_preguntas=hojasActuales.getSheetByName('QuestionMapper')
  const data_preguntas=hoja_preguntas.getDataRange().getValues();
  const data = hoja_raw.getDataRange().getValues();
  data.shift()
  let numero_pregunta_profesor=1
  const nombre_profesores1= obtener_profesores_posicion(data)
  
  const nombres = nombre_curso(nombre_profesores1);
  const nombre_columnas=["Question 14","Question 16","Question 18","Question 20","Question 21","Question 22","Question 23","Question 24"]
  const columnas = [
    obtenerNumeroDeColumna(hoja_raw,"Question 14",1)+1,
    obtenerNumeroDeColumna(hoja_raw,"Question 16",1)+1,
    obtenerNumeroDeColumna(hoja_raw,"Question 18",1)+1,
    obtenerNumeroDeColumna(hoja_raw,"Question 20",1)+1,
    obtenerNumeroDeColumna(hoja_raw,"Question 21",1)+1,
    obtenerNumeroDeColumna(hoja_raw,"Question 22",1)+1,
    obtenerNumeroDeColumna(hoja_raw,"Question 23",1)+1,
    obtenerNumeroDeColumna(hoja_raw,"Question 24",1)+1
    ]
  let nombres_pregunta=[]
  let resumen = [...nombres]
  let notas_por_pregunta=[]
  columnas.forEach((col,idx)=>{
    let descripcion_pregunta=data_preguntas.find((question)=>question[0]==nombre_columnas[idx])[1]
    let primerElemento = hoja_raw.getRange(1, col).getValue();
    nombres_pregunta.push(`P${numero_pregunta_profesor}`)
    let hoja = crear_hoja_pregunta_ponderada(`PROFESOR P${numero_pregunta_profesor}`,hojasActuales)
    numero_pregunta_profesor++;
    
    const notas_profesores_total = data_notas_profesores(nombres,data,col,5)
    escribir_resultado_pregunta_ponderada5(notas_profesores_total,hoja,descripcion_pregunta)
    
    notas_profesores_total.forEach((notas,idx)=>{
      resumen[idx]=resumen[idx].concat([notas[3].replace(",",".")])



    })




  })
  
  const promedios = obtener_promedios(resumen)
  const bool_list = promedios.map((nota)=>{
    if (nota<4){
      return false
    }else
      return true



  })
  
  resumen1=resumen.map((fila,idx)=>fila.concat([promedios[idx]])).filter((elemento)=>!elemento.includes("UniqueID"))
  
  const hoja_resumen = crear_hoja_pregunta_ponderada("Resumen",hojasActuales)
  escribir_resumen_y_destacar_deficientes(resumen1,hoja_resumen,nombres_pregunta,bool_list)





  //let hoja = crear_hoja_pregunta_ponderada("P1",hojasActuales)

  //const notas_profesores_total = data_notas_profesores(nombres,data,21,5)
  //escribir_resultado_pregunta_ponderada5(notas_profesores_total,hoja)




}
function verificarCursos(){
  const  hojasActuales = SpreadsheetApp.getActiveSpreadsheet();
  const nombre_hojas = getSheetName(hojasActuales);
  const hoja_preguntas=hojasActuales.getSheetByName('QuestionMapper')
  const data_preguntas=hoja_preguntas.getDataRange().getValues();
  const hoja_raw=hojasActuales.getSheetByName('RawData');
  const data = hoja_raw.getDataRange().getValues();
  data.shift()
  
  const nombre_cursos1= obtener_cursos_posicion(data)
  const id_cursos = eliminarDuplicadosListaDeListas(cursos_unicos(nombre_cursos1))
  
  
  const nombre_preguntas_ponderadas=["Question 2","Question 12"]
  const columnas = nombre_preguntas_ponderadas.map((nom)=>obtenerNumeroDeColumna(hoja_raw,nom,1)+1)
  const descripciones_pregunta=nombre_preguntas_ponderadas.map((nom)=>data_preguntas.find((question)=>question[0]==nom)[1])
  let nombres_pregunta=[]
  let numero_pregunta_asignatura=1
  columnas.forEach((col,idx)=>{
    
    let primerElemento = hoja_raw.getRange(1, col).getValue();
    nombres_pregunta.push(primerElemento)
    let hoja = crear_hoja_pregunta_ponderada(`ASIGNATURA P${numero_pregunta_asignatura}`,hojasActuales)
    numero_pregunta_asignatura++;
    const notas_profesores_total = data_notas_curso(id_cursos,data,col,5)
    escribir_resultado_pregunta_ponderada_cursos(notas_profesores_total.filter((elemento)=>!elemento.includes("UniqueID")),hoja,descripciones_pregunta[idx])
    
  




  })


  let horas_curso_tabla_total=[]
    id_cursos.forEach((nombre)=>{
    let curso=[]
    let tabla_frecuencias_hora = obtener_tabla_pregunta_binaria_unica(data_curso(nombre[2],data,nombre[0]),obtenerNumeroDeColumna(hoja_raw,"Question 1",1)+1
    ,13)
    
    let tabla_porcentaje_horas = normalizar_pregutna_binaria_unica(tabla_frecuencias_hora)
    curso = curso.concat(nombre)
    Object.keys(tabla_porcentaje_horas).slice().forEach((a)=>{
      curso = curso.concat([tabla_porcentaje_horas[a]]+ "%")
    
    }
    
    )





    horas_curso_tabla_total.push(curso)
  })
  console.log("aaaaaaaa",horas_curso_tabla_total)
  hoja = crear_hoja_pregunta_ponderada(`ASIGNATURA P${numero_pregunta_asignatura}`,hojasActuales)
  numero_pregunta_asignatura++
  let descripcion_horas=data_preguntas.find((ele)=>ele[0]=="Question 1")[1]
  
  
  escribir_resultado_pregunta_horas_curso(horas_curso_tabla_total.filter((elemento)=>!elemento.includes("UniqueID")),hoja,descripcion_horas)


  let actividades_curso_tabla_total=[]
    id_cursos.forEach((nombre)=>{
    let curso=[]
    let data_curso1 = data_curso(nombre[2],data,nombre[0])
    let tabla_frecuencias_actividades = tabla_frecuencias_tabla_binaria_multiple(data_curso1,11,obtenerNumeroDeColumna(hoja_raw,"Question 4",1)+1)
    total_datos = data_curso1.length
    
    let tabla_porcentaje_horas = normalizar_pregutna_binaria_miltiple(tabla_frecuencias_actividades,total_datos)
    curso = curso.concat(nombre)
    Object.keys(tabla_porcentaje_horas).slice().reverse().forEach((a)=>{
      curso = curso.concat([tabla_porcentaje_horas[a]]+ "%")
    
    }
    
    )





    actividades_curso_tabla_total.push(curso)
  })
  
  hoja = crear_hoja_pregunta_ponderada(`ASIGNATURA P${numero_pregunta_asignatura}`,hojasActuales)
  numero_pregunta_asignatura++
  descripcion_horas=data_preguntas.find((ele)=>ele[0]=="Question 4")[1]
  escribir_resultado_pregunta_ACtividades_curso(actividades_curso_tabla_total.filter((elemento)=>!elemento.includes("UniqueID")),hoja,descripcion_horas)
  
  //pregutnas de si y no
  
  preguntas_si_y_no = [[obtenerNumeroDeColumna(hoja_raw,"Question 5",1)+1,obtenerNumeroDeColumna(hoja_raw,"Question 7",1)+1],[obtenerNumeroDeColumna(hoja_raw,"Question 8",1)+1,obtenerNumeroDeColumna(hoja_raw,"Question 11",1)+1]]
  let colinicial=0
  let colfinal=0
  preguntas_si_y_no.forEach((columnas)=>{
    colinicial=columnas[0]
    colfinal=columnas[1]
    
    let tabla_frecuencias_si_no_total=[]
    id_cursos.forEach((nombre)=>{
    let curso=[]
    let tabla_frecuencias_si_no = analizar_preguntas_si_y_no(data_curso(nombre[2],data,nombre[0]),colinicial,colfinal)
    
    let tabla_frecuencias_si_no_porcentaje = normalizar_pregutna_binaria_miltiple(tabla_frecuencias_si_no,data_curso(nombre[2],data,nombre[0]).length)
    curso = curso.concat(nombre)
    Object.keys(tabla_frecuencias_si_no_porcentaje).slice().forEach((a)=>{
      curso = curso.concat([ tabla_frecuencias_si_no_porcentaje[a]]+ "%")
    
    }
    
    
    )





    tabla_frecuencias_si_no_total.push(curso)
  })    
  
  let preguntas=[]
  rango(colinicial, colfinal).forEach((col)=>{

    preguntas.push(data_preguntas.find((ele)=>ele[0]==hoja_raw.getRange(1, col).getValue())[1].split("-")[1])
  })
  descripcion_horas = data_preguntas.find((ele)=>ele[0]==hoja_raw.getRange(1, colinicial).getValue())[1].split("-")[0]
  hoja = crear_hoja_pregunta_ponderada(`ASIGNATURA P${numero_pregunta_asignatura}`,hojasActuales)
  numero_pregunta_asignatura++
  escribir_resultado_pregunta_si_no(tabla_frecuencias_si_no_total.filter((elemento)=>!elemento.includes("UniqueID")),hoja,preguntas,descripcion_horas)






  })

  
  





}



function data_notas_profesores(nombres,data,col,escala){
  let notas_profesores_total=[]
  nombres.forEach((nombre)=>{
    //console.log(data_profesor(nombre[0],data).length)
    let profesor=[]
    let tabla_frecuencias = tabla_frecuencias_suma_ponderada(data_profesor(nombre[0],data,nombre[1]),col,escala)
    
    let tabla_ponderada = normalizar(tabla_frecuencias)
    
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
  
  return notas_profesores_total





}
function data_notas_curso(nombres,data,col,escala){
  let notas_cursos_total=[]
  
  nombres.forEach((nombre)=>{
    //console.log(data_profesor(nombre[0],data).length)
    let curso=[]
    
    let tabla_frecuencias = tabla_frecuencias_suma_ponderada(data_curso(nombre[2],data,nombre[0]),col,escala)
    
    let tabla_ponderada = normalizar(tabla_frecuencias)
    
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
  
  return notas_cursos_total
  





}
function rango(inicio, fin) {
    const resultado = [];
    for (let i = inicio; i <= fin; i++) {
        resultado.push(i);
    }
    return resultado;
}
function agregarAreas(){
  const  hojasActuales = SpreadsheetApp.getActiveSpreadsheet();  
  const hoja_raw=hojasActuales.getSheetByName('RawData');
  const data = hoja_raw.getDataRange().getValues();
  const hoja_maestro = hojasActuales.getSheetByName('CATALOGO');
  const data_maestro = hoja_maestro.getDataRange().getValues();
  if(data[0][data.length-1]!="AREA"){
  data[0].push("AREA")}
  const encabezado = data[0]
  data.shift();
  
  const data_con_areas=[encabezado,...agregar_areas(data,data_maestro)]
  
  
  
  hoja_raw.getRange(1, 1, data_con_areas.length, data_con_areas[0].length).setValues(data_con_areas);
  




}

