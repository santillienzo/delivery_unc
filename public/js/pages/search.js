import { renderizarBusqueda } from "../render/render.js";

//window.location.search sirve para ver los pará,etros que trae consigo la url
const valores = window.location.search;
//Creamos la instancia (objeto con los valores)
const urlParams = new URLSearchParams(valores);
//Accedemos a los valores get de la id del producto
const id_categoria = urlParams.get('categoria');
const busqueda = urlParams.get('search');

console.log(id_categoria)
console.log(busqueda)

renderizarBusqueda(id_categoria, busqueda)