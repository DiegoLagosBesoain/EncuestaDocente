function data_profesor(name,data,code){
    return data.filter((a)=> a[3]==name&&a[2]==code?true: false)
    
  
    
  }
  function data_curso(name,data,code){
    const filtro= data.filter((a)=> a[3]==name&&a[2]==code?true: false)
    console.log("data filtrada: ",filtro)
    return filtro
    
  }
  function obtener_profesores_posicion(data){
  
    return data.map((respuesta,idx)=>{
      let conjunto=[]
      conjunto.push(respuesta[3])
      conjunto.push(respuesta[2])
      conjunto.push(respuesta[1])
      return conjunto
    })
  
  
  
  
  }
  function nombre_curso(profesores_curso) {
    const revisados = [];
    
    const nombres = profesores_curso.filter((respuesta) => {
      // Verifica si ya se ha revisado la sublista
      const esRepetido = revisados.some(r => JSON.stringify(r) === JSON.stringify(respuesta));
      
      // Verifica si el primer elemento de la sublista contiene una coma
      const primerElementoTieneComa = respuesta[0] && respuesta[0].includes(',');
  
      if (esRepetido || primerElementoTieneComa) {
        return false;
      } else {
        revisados.push(respuesta); // Marca esta sublista como revisada
        return true;
      }
    });
  
    return nombres;
  }
  function tabla_frecuencias_suma_ponderada(data_profesor,col1,escala){
    //21
    const col = col1-1
    const tabla_frecuencias = {}
    for (let i = 1; i <= escala; i++) {
        tabla_frecuencias[i] = 0
      }
  
    const notas = data_profesor.map((a)=>a[col])
    console.log("notas: ",notas)
    notas.forEach((a)=>{
      tabla_frecuencias[a]=tabla_frecuencias[a]+1
  
  
  
  
    })
  
  
      return tabla_frecuencias
  }
  function normalizar(tabla_frecuencias){
    const total = Object.keys(tabla_frecuencias).reduce((suma,nota)=>{
      return suma + tabla_frecuencias[nota]
    },0)
    console.log(total)
    const tabla_porcentajes = {}
    Object.keys(tabla_frecuencias).forEach((llave)=>{
      tabla_porcentajes[llave]=((tabla_frecuencias[llave]/total)*100).toFixed(2);
  
  
  
  
    })
    return tabla_porcentajes
  
  
  }
  function obtener_promedios(resumen){
  const resumenColumnas = resumen.map(fila => fila.slice(3))
  return resumenColumnas.map((fila)=>(fila.reduce((suma,nota)=>suma+Number(nota),0)/fila.length).toFixed(2))
  
  
  
  
  
  }
  function obtener_cursos_posicion(data){
    
  
    return data.map((respuesta,idx)=>{
      let conjunto=[]
      
      conjunto.push(respuesta[2])
      conjunto.push(respuesta[1])
      conjunto.push(respuesta[3])
      conjunto.push(respuesta[7])
      return conjunto
    })
  
  
  
  
  
  
  
  
  
  
  }
  function curos_unicos(cursos_posicion){
    const revisados = [];
    
    const nombres = cursos_posicion.filter((respuesta) => {
      
      
      
     
      const esCurso = respuesta[3]!= ''
  
      if (esRepetido || !(esCurso)) {
        return false;
      } else {
        revisados.push(respuesta); 
        return true;
      }
    }).map((r)=>r.slice(0,3));
  
    return nombres;
  
  
  
  }
  function obtener_tabla_pregunta_binaria_unica(data_profesor,col1,escala){
    const col = col1-1
      const tabla_frecuencias = {}
      for (let i = 1; i <= escala; i++) {
          tabla_frecuencias[i] = 0
        }
  
      const notas = data_profesor.map((a)=>a[col])
      console.log("notas: ",notas)
      notas.forEach((a)=>{
        tabla_frecuencias[a]=tabla_frecuencias[a]+1
  
  
  
  
      })
  
  
        return tabla_frecuencias
  
  }
  function normalizar_pregutna_binaria_unica(tabla_frecuencias){
    const total = Object.keys(tabla_frecuencias).reduce((suma,nota)=>{
      return suma + tabla_frecuencias[nota]
    },0)
    console.log(total)
    const tabla_porcentajes = {}
    Object.keys(tabla_frecuencias).forEach((llave)=>{
      tabla_porcentajes[llave]=((tabla_frecuencias[llave]/total)*100).toFixed(2);
  
  
  
  
    })
    return tabla_porcentajes
  
  
  }
  function tabla_frecuencias_tabla_binaria_multiple(data_profesor,col1,escala){
    const col = col1-1
      const tabla_frecuencias = {}
      for (let i = 1; i <= escala; i++) {
          tabla_frecuencias[i] = 0
        }
  
      const notas = data_profesor.map((a)=>{
        
        
        return a[col].split(',').map(Number)})
      console.log("numeros Actividades: ",notas)
      notas.forEach((a)=>{
        a.forEach((valor)=>{
          tabla_frecuencias[valor] = tabla_frecuencias[valor]+1
  
  
        })
        
        
  
  
  
  
      })
  
  
        return tabla_frecuencias
  
  }
  function normalizar_pregutna_binaria_miltiple(tabla_frecuencias,total){
    const tabla_porcentajes = {}
    Object.keys(tabla_frecuencias).forEach((llave)=>{
      tabla_porcentajes[llave]=((tabla_frecuencias[llave]/total)*100).toFixed(2);
  
  
  
  
    })
    return tabla_porcentajes
  
  
  }
  function analizar_preguntas_si_y_no(data_profesor,col1,col_final1){
  const col = col1-1
  const col_final = col_final1-1
  
  const tabla_frecuencias_por_sub_pregunta = {}
  for (let i = col; i <= col_final; i++) {
          tabla_frecuencias_por_sub_pregunta[i] = 0
        }
  let notas = []
  Object.keys(tabla_frecuencias_por_sub_pregunta).forEach((columna)=>{
    notas = data_profesor.map((a)=>a[columna]).map((valor)=>valor=='2'?'SI':'NO')
    notas.forEach((a)=>{
        if(a=='SI'){
        tabla_frecuencias_por_sub_pregunta[columna]=tabla_frecuencias_por_sub_pregunta[columna]+1}
  
  
  
  
      })
  
  
  })
  //console.log("Tabala de si y no", tabla_frecuencias_por_sub_pregunta )
  return tabla_frecuencias_por_sub_pregunta 
  
  
  
  
  
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  