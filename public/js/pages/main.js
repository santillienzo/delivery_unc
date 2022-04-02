//Importamos las funciones externas que vamos a utilizar
import {renderProductos} from '../render/renderProductos.js'
import {agregarProducto} from '../utils/cart.js'


//----------------ZONA DE DEFINICION DE FUNCIONES ---------------
//En esta función guardamos todos los eventos que utilicemos 
function cargarEscuchaDeEventos() {
  //Atrapamos todos los botones para añadir al carrito
  const add_cart_buttons = document.querySelectorAll('.agregar_carrito')
  
  //Al hacer click en uno de los botones ejecutamos lo siguiente:
  add_cart_buttons.forEach((btn)=>{
    btn.addEventListener("click", e => agregarProducto(e.target.parentElement.parentElement))
  })
}

//----------------ZONA DE EJECUCIÓN DE FUNCIONES ---------------
await renderProductos();
cargarEscuchaDeEventos()