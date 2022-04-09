//#IMPORTANTE
//#IMPORTANTE
//#IMPORTANTE

//ESTE CÓDIGO TIENE QUE SER REFACTORIZADO

//#IMPORTANTE
//#IMPORTANTE
//#IMPORTANTE

//Importamos los datos necesarios
import { categorias } from "../categorias.js"; 
import { renderArticulo } from "../components/renderArticulo.js";

export const renderCategoria = async(id_categoria)=>{
    let articuloEnHtml = " ";
    const sliderSeccionOfertas = document.getElementById('sliderSeccionOfertas')
    const sliderSeccionMasVendidos = document.getElementById('sliderSeccionMasVendidos')

    const seccionCategoria = document.getElementById("seccionCategoria"); //Traemos las sección de la categoría
    const seccionOfertas= document.getElementById("seccionOfertas"); //Traemos las sección de la categoría
    const seccionMasVendidos = document.getElementById("seccionMasVendidos"); //Traemos las sección de la categoría

    const tituloTodo = document.getElementById('title-todo')
    const titulo = document.getElementById('title-sections') //Traemos el h2 del tiulo de la sección
    const tituloOfertas = document.getElementById('title-oferta')
    const tituloMasVendido = document.getElementById('title-mas_vendido')
    let linksRedirect = document.getElementById("links_redirect");  //Traemos el árbol de redirección del main

    if (id_categoria === "mas_vendido") {
        seccionCategoria.style.display = "none"
        sliderSeccionOfertas.style.display="none"
        titulo.style.display = "none"
        tituloOfertas.style.display = "none"
        tituloTodo.style.display = "none"

        linksRedirect.innerHTML += `<a href="">Más vendido</a>`

        tituloMasVendido.innerHTML = "Más vendidos"

        const res = await fetch("../../../datos.json") //Pedimos los datos a la api
        const data = await res.json() //Convertimos esos datos en archivo javaScript
    
        //Recorremos los datos convertidos
        data.forEach((producto) => {
            articuloEnHtml = renderArticulo(producto)
            if(producto.mas_vendido){
                seccionMasVendidos.innerHTML += articuloEnHtml;
            }
        })
    }else if(id_categoria === "ofertas"){
        seccionCategoria.style.display = "none"
        sliderSeccionMasVendidos.style.display="none"
        titulo.style.display = "none"
        tituloMasVendido.style.display = "none"
        tituloTodo.style.display = "none"

        linksRedirect.innerHTML += `<a href="">Ofertas</a>`

        tituloOfertas.innerHTML = "Ofertas"

        const res = await fetch("../../../datos.json") //Pedimos los datos a la api
        const data = await res.json() //Convertimos esos datos en archivo javaScript
    
        //Recorremos los datos convertidos
        data.forEach((producto) => {
            articuloEnHtml = renderArticulo(producto)
            if (producto.oferta) {
                seccionOfertas.innerHTML += articuloEnHtml;
            } 
        })
    }else{
        //Recorremos las categorías y si el id de la categoría es igual a id_categoria se insertará en el html
        //ese nombre
        categorias.map(categoria=>{
            if (categoria.id === id_categoria) {
                titulo.innerHTML = `Categoría | <span> ${categoria.name}</span>`
                tituloMasVendido.innerHTML = `${categoria.name} más vendidas`
                linksRedirect.innerHTML += `<a href="">${categoria.name}</a>`
            }
        })
    
        const res = await fetch("../../../datos.json") //Pedimos los datos a la api
        const data = await res.json() //Convertimos esos datos en archivo javaScript
    
        //Recorremos los datos convertidos
        data.forEach((producto) => {
            articuloEnHtml = renderArticulo(producto)
    
            if (producto.tipo === id_categoria) {
                if (producto.oferta) {
                    seccionOfertas.innerHTML += articuloEnHtml;
                } 
                if(producto.mas_vendido){
                    seccionMasVendidos.innerHTML += articuloEnHtml;
                }
                seccionCategoria.innerHTML += articuloEnHtml
            }
        })
    }
}