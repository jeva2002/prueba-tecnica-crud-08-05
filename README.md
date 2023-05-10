<h1 align="center">Prueba técnica CRUD</h1>
<h2 id="descripcion">Descripción</h2>

Se realiza una interfaz que consume la API que JSONPLACEHOLDER brinda (https://jsonplaceholder.typicode.com), y se aplican operaciones básicas de HTTP. <br>
La aplicación se encuentra desplegada en https://coffeepost-bb236.web.app/lista-productos/1

<h3>Página inicial</h3>

La página inicial de la aplicación tiene una tabla de datos paginada que permite ver los datos de los posts que brinda la API, cada post tiene la opción de editar o eliminar, también se tiene en la esquina superior izquierda un botón para crear posts.<br/>
Encima y debajo de la tabla tendremos el menu que permite desplazarnos entre las distintas páginas de esta.<br>
Al dar click en el enlace para eliminar, aparecerá un modal que pedirá que se confirme la acción a realizar. Si se confirma esta se eliminará el post de la tabla y esto se verá reflejado inmediatamente y se lanzará un modal que mostrará el resultado de la acción. De lo contrario se podrá cerrar el modal.

<h3>Página para publicar</h3>

Por otro lado, las opciones de editar y crear nos redirigirán a un formulario en una página específica para publicar; dependiendo de si se seleccionó editar o crear; la página tendrá un título u otro y el formulario ya tendrá datos o no. <br>
Todos los campos del formulario son obligatorios; si se incumple con esto el botón para enviar estará inhabilitado y si alguno de los campos fue seleccionado y es inválido aparecerá un mensaje que señala el error en el input. Al llenar el formulario y enviar, este se mostrará un modal que notificará del estado de la acción. <br>

<h2 id="tecnologias">Tecnologías</h2>

<ul>
  <li>Angular 16</li>
  <li>Bootstrap 5</li>
  <li>Rxjs</li>
</ul>

<h2 id="construccion">Construcción</h2>

La aplicación fue desarrollada pensando en una arquitectura por capas que brindase una mayor facilidad de desarrollo. En la capa de la presentación se encuentran todos los componentes; separadas las vistas de los componentes que las forman. En la capa de dominio encontraremos la lógica del negocio; allí estarán todos los controladores de la información (los posts, los usuarios y los mensajes para las alertas). Por último, se encontrará la capa de persistencia que es la que tendrá todos los métodos http y será la encargada de interactuar con la API. <br>
Se buscó que toda la aplicación tuviese un código limpio que fuera autodescriptivo. 
