//Importamos los datos necesarios
import { categorias } from "../categorias.js"; 
import { renderArticulo } from "../components/renderArticulo.js";

export const renderCategoria = async(id_categoria)=>{
    let articuloEnHtml = " ";
    const seccionCategoria = document.getElementById("seccionCategoria"); //Traemos las sección de la categoría
    const titulo = document.getElementById('title-sections') //Traemos el h2 del tiulo de la sección
    let linksRedirect = document.getElementById("links_redirect");  //Traemos el árbol de redirección del main

    //Recorremos las categorías y si el id de la categoría es igual a id_categoria se insertará en el html
    //ese nombre
    categorias.map(categoria=>{
        if (categoria.id === id_categoria) {
            titulo.innerHTML = `Categoría | <span> ${categoria.name}</span>`
            linksRedirect.innerHTML += `<a href="">${categoria.name}</a>`
        }
    })

    const res = await fetch("../../datos.json") //Pedimos los datos a la api
    const data = await res.json() //Convertimos esos datos en archivo javaScript

    //Recorremos los datos convertidos
    data.forEach((producto) => {
        articuloEnHtml = renderArticulo(producto)

        if (producto.tipo === id_categoria) {
            seccionCategoria.innerHTML += articuloEnHtml
        }
    })
}