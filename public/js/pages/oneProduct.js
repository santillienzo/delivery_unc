//Realizamos las importaciones
import { agregarProducto } from "../utils/cart.js";
import {renderUnProducto} from '../render/renderUnProducto.js'

//window.location.search sirve para ver los pará,etros que trae consigo la url
const valores = window.location.search;
//Creamos la instancia (objeto con los valores)
const urlParams = new URLSearchParams(valores);
//Accedemos a los valores get de la id del producto
const id_producto = urlParams.get('producto');

function cargarEscuchaDeEventos() {
    const add_cart_btn = document.getElementById('add_cart_btn')

    add_cart_btn.addEventListener("click", (e)=> agregarProducto(e.target.parentElement.parentElement.parentElement))
}

// Ejecución de funciones
await renderUnProducto(id_producto)
cargarEscuchaDeEventos()