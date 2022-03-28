//Importamos las funciones externas que vamos a utilizar
import {renderizarProductos} from './render.js'
import {eliminarProducto, añadirProducto, actualizarProducto} from './cart.js'

//Declaramos variables (atrapamos elementos html)
const tbody = document.getElementById("tbody"); //tbody


//----------------ZONA DE DEFINICION DE FUNCIONES ---------------
//En esta función guardamos todos los eventos que utilicemos 
function cargarEscuchaDeEventos() {
  //Atrapamos todos los botones para añadir al carrito
  const add_cart_buttons = document.querySelectorAll('.añadir_carrito')
  
  //Al hacer click en uno de los botones ejecutamos lo siguiente:
  add_cart_buttons.forEach((btn)=>{
    btn.addEventListener("click", e => añadirProducto(e.target.parentElement.parentElement))
  })

  //Al hacer click en la tabla del carrito ejecutamos la función eliminarProducto()
  tbody.addEventListener("click", e => eliminarProducto(e))

  //Actualizamos la cantidad del producto al tocar el input Number
  tbody.addEventListener("change", e=> actualizarProducto(e))
}

//----------------ZONA DE EJECUCIÓN DE FUNCIONES ---------------
await renderizarProductos();
cargarEscuchaDeEventos()