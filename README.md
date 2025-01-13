

# ENCUESTA DOCENTE
A continuacion se presentan la instalacion, los requisitos y el modo de uso para el progama en appscript para la automatizacion de la encuesta docente 




## Instalacion

    1. Se debe tener una hoja de calculo en google drive 
    2. ir a extenciones y seleccionar appscript
    3. crear un archivo "google script" para cada uno de los archivos del repositorio con 
       el mismo nombre(main,read,etc)
    4. copiar el contenido de los archivos del repositorio para los creados en appscript
    5. Guardar los cambios con ctr+s 
    6. en el archivo main presionar "ejecutar" arriba a la izquierda





## Requisitos

- Tener permisos de google appscript
- Tener una hoja con exactamente el nombre **`RawData`** la cual contenga la data de la encuesta
- Tener una hoja con exactamente el nombre **`QuestionMapper`** con el detalles de las preguntas
- (opcional) Hoja **`CATALOGO`** con la columna de areas actualizada
## Comandos

- Resultados Profesores: Entrega los resultados por profesor por cada pregunta con su pornderacion, ademas entrega una hoaj de resumen con una nota final la cuald estaca en rojo en caso de que el profesor obtenga una nota deficiente 
- Resultados Cursos: Entrega los resultados de cada pregunta asociada a un curso: preguntas ponderadas, binarias multiple y pregutnas de "Si y No"
- Agregar areas: Agrega a cada respuesta de  **`RawData`** el area a la cual esta asociada el curso para separar proximamente por area las respuestas
- Filtrar por Área: entrega una casilla con las opciones de area para elejir y separar sus preguntas,el neuvo archivo se crea en al pagina principal de drive del usuario que ese ejecutando los scripts
- Todos por Área: Realiza la separacion  y creacion de archivos por area para todas las areas presentes en **`RawData`**



## CONSIDERACIONES

- De no existir las hojas o tener un nombre diferente el programa no podra funcionar de manera incorrecta y llevara a un error
- Es recomendable realziar un copiado y pegado desde una hoja de google sheets que abra el .csv que contiene RawData y no desde un Exel ya que podria cambiar el tipo de los datos(por ejemplo cambiar los resultados de la columan Question 4 a fechas)
- Cada vez que se realzia la separacion por areas se crea un nuevo archivo hay que tener cuidado con crear muchas copias en el dirve propio
