// Corrección 1: Se elimina comentario de: "Tenemos un li de productos" ya que puede crear una confusión
// El comentario sugiere que hay un elemento <li> (lista de HTML) en el código, pero en realidad:
// El HTML usa <div id="lista-de-productos"> (un contenedor div, no una lista <li>).
// Y en el JS, se crean elementos <div> con la clase producto, no <li>.
// Por ende esto podría llevar a pensar que la estructura del proyecto usa listas HTML (<ul>/<li>), cuando en realidad usa divs.

// Arreglo de objetos que representa los productos a mostrar 
// El cual se queda sin cambios, esta correcto
const productos = [
  {nombre: "Zapato negro", tipo: "zapato", color: "negro", img: "./taco-negro.jpg"},
  {nombre: "Zapato azul", tipo: "zapato", color: "azul", img: "./taco-azul.jpg"},
  {nombre: "Bota negra", tipo: "bota", color: "negro", img: "./bota-negra.jpg"},
  {nombre: "Bota azul", tipo: "bota", color: "azul", img: "./bota-azul.jpg"},
  {nombre: "Zapato rojo", tipo: "zapato", color: "rojo", img: "./zapato-rojo.jpg"}
]; // Corrección 2, se agrega ; al final del arreglo

// Selección correcta de elementos HTML
// Corrección 3: Se usó getElementById() en lugar de getElementsByName() (que devuelve NodeList)
// Corrección 4: Se cambió querySelector('.input') por querySelector('input') porque no hay clase en el input.
const listaProductos = document.getElementById("lista-de-productos"); // Cambiado de getElementsByName a getElementById
const input = document.querySelector('input'); // Cambiado de '.input' a 'input' (el selector correcto)

// Corrección 5: Se encapsuló el código de renderizado de productos en una función reutilizable
// Esto evita repetir el mismo bloque de creación de elementos tanto en carga inicial como en el filtro.
function mostrarProductos(productosMostrar) {
//Corrección 6: Se limpia el contenedor directamente con innerHTML
  listaProductos.innerHTML = '';

  productosMostrar.forEach(producto => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("producto");

    const titulo = document.createElement("p");
    titulo.classList.add("titulo");
    titulo.textContent = producto.nombre;
    
    const imagen = document.createElement("img");
    imagen.setAttribute('src', producto.img);
    imagen.setAttribute('alt', producto.nombre); // Corrección 7: Se añade atributo alt por accesibilidad

    divProducto.appendChild(titulo);
    divProducto.appendChild(imagen);

    listaProductos.appendChild(divProducto);
  });
}

// Corrección 8: Se llama a mostrarProductos() al cargar la página para mostrar todos los productos por defecto
mostrarProductos(productos);

// Se mejoró la función de filtrado
// Corrección 9: Se agregó .toLowerCase() para hacer la búsqueda insensible a mayúsculas/minúsculas
// Corrección 10: También se agrega validación para retornar todos los productos si el input está vacío
function filtrado(productos = [], texto = "") {
  if (!texto) return productos; // Si no hay texto, devuelve todos los productos

  const textoLower = texto.toLowerCase();
  return productos.filter(item => 
    item.tipo.toLowerCase().includes(textoLower) || 
    item.color.toLowerCase().includes(textoLower)
  ); // ); 
} 

// Corrección 11: Se mejoró el evento del botón usando addEventListener
// Corrección 12: Se reemplazó el onclick con addEventListener (buena práctica)
// Corrección 13: Se usó trim() para limpiar espacios innecesarios
document.querySelector("button").addEventListener('click', () => {
  const texto = input.value.trim(); // trim() para eliminar espacios en blanco
  const productosFiltrados = filtrado(productos, texto);
  mostrarProductos(productosFiltrados);
});
