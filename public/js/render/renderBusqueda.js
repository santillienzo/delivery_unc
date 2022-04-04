//Importamos los datos necesarios
import { categorias } from "../categorias.js"; 
import { renderArticulo } from "../components/renderArticulo.js";

export const renderBusqueda = async(id_categoria, busqueda)=>{
    let articuloEnHtml = " "; //Este será el html del producto
    const seccionBusqueda = document.getElementById("seccionBusqueda"); //Traemos las sección de la busqueda
    const tituloCategoria = document.getElementById('title-sections'); //Traemos el h2 donde mostramos la categoría en donde está el usuario
    const textoBusqueda = document.getElementById('search_text'); //Traemos el h4 donde se mostrará el texto que escribió el usuario
    let linksRedirect = document.getElementById("links_redirect");  //Traemos el árbol de redirección del main
    let contador = 0
    
    //Pasamos a minúsculas lo que recibimos en el parámetro de la búsqueda.
    //Esto sirve para agilizar las validaciones
    busqueda = busqueda.toLowerCase()

    // RENDERIZAMOS LOS TÍTULOS
    //Recorremos las categorías y si el id de la categoría es igual a id_categoria se insertará en el html
    //ese nombre
    if (id_categoria === "all") {
        tituloCategoria.innerHTML = `Categoría | <span>Todo</span>`;
        linksRedirect.innerHTML += `
            <a href="http://${location.host}">Todo</a>
            <i class="fa-solid fa-angle-right"></i>
            <a href="">${busqueda}</a>
        `;
    }else{
        categorias.map(categoria=>{
            if (categoria.id === id_categoria) {
                tituloCategoria.innerHTML = `Categoría | <span> ${categoria.name}</span>`;
                linksRedirect.innerHTML += `
                    <a href="http://${location.host}/view/categoria.html?categoria=${categoria.id}">${categoria.name}</a>
                    <i class="fa-solid fa-angle-right"></i>
                    <a href="">${busqueda}</a>
                `;
            }
        })
    }

    textoBusqueda.innerHTML = `${busqueda}`


    const res = await fetch("../../datos.json") //Pedimos los datos a la api
    const data = await res.json() //Convertimos esos datos en archivo javaScript

    //Recorremos los datos convertidos
    data.forEach((producto) => {
        let nombre = producto.nombre.toLowerCase()

        articuloEnHtml = renderArticulo(producto)
        
        if (id_categoria === "all") {
            if (nombre.indexOf(busqueda) !== -1) {
                contador++
                seccionBusqueda.innerHTML += articuloEnHtml
            }
        }else{
            if (nombre.indexOf(busqueda) !== -1 && producto.tipo === id_categoria) {
                seccionBusqueda.innerHTML += articuloEnHtml
                contador++
            }
        }

    })

    //Si no se encontró ningún producto:
    if (contador === 0) {
        seccionBusqueda.classList.remove('news-cards')  //Removemos la clase de la sección (para quitar estilos)
        seccionBusqueda.classList.add('empty_search')   //Agregamos la clase 'empty_search' (agregar nuevos estilos)
        //Adjuntamos el siguiente código HTML a la sección
        seccionBusqueda.innerHTML = `
            <p>Lo siento, no hay artículos que coincidan con tu búsqueda.</p>
            <ul>
                <li>Revisa la ortografía de la palabra</li>
                <li>Utilizá palabras más genéricas o menos palabras.</li>
                <li>Navegá por las categorías para encontrar un producto similar</li>
            </ul>
        `
    }
}