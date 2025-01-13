# ENCUESTA DOCENTE

A continuación se presentan la instalación, los requisitos y el modo de uso para el programa en App Script para la automatización de la encuesta docente.

## Instalación

1. Tener una hoja de cálculo en Google Drive.  
2. Ir a Extensiones y seleccionar App Script.  
3. Crear un archivo de "Google Script" para cada uno de los archivos del repositorio, asegurándose de usar el mismo nombre (por ejemplo, main, read, etc.).  
4. Copiar el contenido de los archivos del repositorio en los archivos creados en App Script.  
5. Guardar los cambios con Ctrl + S.  
6. En el archivo main, presionar Ejecutar (icono en la parte superior izquierda).

## Requisitos

- Permisos para usar Google App Script.  
- Una hoja con el nombre exacto `RawData` que contenga los datos de la encuesta.  
- Una hoja con el nombre exacto `QuestionMapper` que detalle las preguntas.  
- (Opcional) Una hoja `CATALOGO` con la columna de áreas actualizada.

## Comandos

- Resultados Profesores: Genera resultados por profesor para cada pregunta con su ponderación. También crea una hoja de resumen con una nota final, resaltando en rojo las notas deficientes.  
- Resultados Cursos: Proporciona resultados para cada pregunta asociada a un curso, incluyendo preguntas ponderadas, binarias, múltiples y de tipo "Sí o No".  
- Agregar Áreas: Asigna a cada respuesta de `RawData` el área correspondiente al curso, permitiendo separar posteriormente las respuestas por área.  
- Filtrar por Área: Presenta una casilla para elegir el área deseada y separa sus preguntas. El nuevo archivo se genera en la página principal de Google Drive del usuario que ejecuta los scripts.  
- Todos por Área: Realiza la separación y creación de archivos por área para todas las áreas presentes en `RawData`.

## Consideraciones

- Si las hojas no existen o tienen nombres incorrectos, el programa no funcionará correctamente y mostrará errores.  
- Se recomienda copiar y pegar los datos desde una hoja de Google Sheets que abra el archivo .csv de `RawData`, en lugar de hacerlo desde Excel, para evitar posibles cambios en los tipos de datos (por ejemplo, convertir valores de la columna "Question 4" en fechas).  
- Cada vez que se realiza la separación por áreas, se crea un nuevo archivo. Es importante para evitar generar demasiadas copias en el Drive personal.


