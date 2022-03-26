//Importamos las funciones externas que vamos a utilizar
import {fetchProducts} from './fetch.js'
import {eliminarProducto, añadirProducto} from './cart.js'

//Declaramos variables (atrapamos elementos html)
let seccionHamburguesa = document.getElementById("seccionHamb");
let seccionPizza = document.getElementById("seccionPizza");
const tbody = document.getElementById("tbody"); //tbody


//----------------ZONA DE DEFINICION DE FUNCIONES ---------------
async function listarTodo() {
  const arrayProductos = await fetchProducts()
  let articuloEnHtml = " ";

  arrayProductos.forEach((producto) => {
    articuloEnHtml = `
    <article class="articulo">
        <img class="card-foto" src="${producto.imagen}" alt="" />
        <h3 class="name">${producto.nombre}</h3>
        <h2 class="price">${producto.precio}</h2>
        <p class="description"> ${producto.descripcion}</p>
        <div class="footer-card">
            <a 
            class="vinculo" 
            href="propiedadesDetail.html?zona=${producto.zona}&descripcion=${producto.Descripcion}"
            >Ver Más<i class="fas fa-angle-double-right"></i></a>
            <i class="fas fa-shopping-cart añadir_carrito" id-item=${producto.id}></i>
            <i id="corazon" class="fas fa-heart"></i>
        </div>
    </article>
  `;

  //Si el artículo tiene como status venta lo colocamos en la sección articuloVenta
    if (producto.tipo === "hamburguesa") {
      seccionHamburguesa.innerHTML += articuloEnHtml;
    } else {
      seccionPizza.innerHTML += articuloEnHtml;
    }
  })
}



//En esta función guardamos todos los eventos que utilicemos 
function cargarEscuchaDeEventos() {
  //Atrapamos todos los botones para añadir al carrito
  const add_cart_buttons = document.querySelectorAll('.añadir_carrito')
  
  //Al hacer click en uno de los botones ejecutamos lo siguiente:
  add_cart_buttons.forEach((btn)=>{
    btn.addEventListener("click", e=> añadirProducto(e.target.parentElement.parentElement))
  })

  //Al hacer click en la tabla del carrito ejecutamos la función eliminarProducto()
  tbody.addEventListener("click", e => eliminarProducto(e, carrito))
}

//----------------ZONA DE EJECUCIÓN DE FUNCIONES ---------------
await listarTodo();
cargarEscuchaDeEventos()