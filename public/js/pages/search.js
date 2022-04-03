import {renderBusqueda} from '../render/renderBusqueda.js'
import { agregarProducto } from '../utils/cart.js';

//window.location.search sirve para ver los pará,etros que trae consigo la url
const valores = window.location.search;
//Creamos la instancia (objeto con los valores)
const urlParams = new URLSearchParams(valores);
//Accedemos a los valores get de la id del producto
const id_categoria = urlParams.get('categoria');
const busqueda = urlParams.get('search');

const textField = document.querySelector('.input__search')

textField.value = busqueda

function cargarEscuchaDeEventos() {
    //Atrapamos todos los botones para añadir al carrito
    const add_cart_buttons = document.querySelectorAll('.agregar_carrito')
    
    //Al hacer click en uno de los botones ejecutamos lo siguiente:
    add_cart_buttons.forEach((btn)=>{
        btn.addEventListener("click", e => agregarProducto(e.target.parentElement.parentElement))
    })
}

await renderBusqueda(id_categoria, busqueda)
cargarEscuchaDeEventos()