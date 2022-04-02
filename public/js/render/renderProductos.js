//Importamos los datos necesarios
import { renderArticulo } from "../components/renderArticulo.js";

//Llamamos los datos de nuestro archivo 'datos.json'
//Renderizamos todos los productos del archivo dividiendolo por secciones
//Pedido de datos con async/await
export const renderProductos = async()=>{
    const seccionOferta = document.getElementById("seccionOferta"); //Traemos las sección de hamburguesas
    const seccionMasVendido = document.getElementById("seccionMasVendido"); //Traemos la sección de pizzas
    const seccionTodo = document.getElementById("seccionTodo"); //Traemos la sección de pizzas
    let articuloEnHtml = " "; //Esto es lo que renderizará en cada vuelta

    const res = await fetch("datos.json") //Pedimos los datos a la api
    const data = await res.json() //Convertimos esos datos en archivo javaScript

    //Recorremos los datos convertidos
    data.forEach((producto) => {
        articuloEnHtml = renderArticulo(producto)
    
      //Si el artículo tiene como status venta lo colocamos en la sección articuloVenta
        if (producto.oferta) {
            seccionOferta.innerHTML += articuloEnHtml;
        } 
        if(producto.mas_vendido){
            seccionMasVendido.innerHTML += articuloEnHtml;
        }

        seccionTodo.innerHTML += articuloEnHtml;
    })
}