//Importamos los datos necesarios
import { categorias } from "../categorias.js"; 
import { renderArticulo } from "../components/renderArticulo.js";

//Llamamos los datos de nuestro archivo 'datos.json'
//Renderizamos todos los productos del archivo dividiendolo por secciones
//Pedido de datos con async/await
const renderizarProductos = async()=>{
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

//Renderizamos solo UN producto
//Pedido de datos con async/await
const renderizarUnProducto = async(id)=>{
    let articuloEnHtml = " ";
    let productContainer = document.getElementById("product_container");
    let linksRedirect = document.getElementById("links_redirect");

    return fetch("../../datos.json")
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                data.forEach((producto) =>{
                    if (producto.id === id) {
                        articuloEnHtml = `
                        <section class="product__img-container">
                            <img src="../../${producto.imagen}" alt="">
                        </section>
                        <section class="product__info-container">
                            <h2 class="name">${producto.nombre}</h2>
                            <p class="description">${producto.descripcion}</p>
                            <div class="price_product">$<span class="price">${producto.precio}</span></div>
                            <div class="add_to_cart-container">
                                <label for="quantity">Cantidad</label>
                                <input type="number" value="1" name="quantity" id="quantity" min="1" max="100">
                            </div>
                            <div class="action-buttons">
                                <button class="add_cart_btn agregar_carrito" id="add_cart_btn" id-item=${producto.id}>Agregar al carrito</button>
                                <button class="buy_now_btn">Comprar ahora</button>
                            </div>
                        </section>
                        `

                        linksRedirect.innerHTML += `<a href="">${producto.nombre}</a>`
                        productContainer.innerHTML = articuloEnHtml
                    }
                })


            }).catch(error=> console.log(error))
}

const renderizarCategoria = async(id_categoria)=>{
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

const renderizarBusqueda = async(id_categoria, busqueda)=>{
    let articuloEnHtml = " "; //Este será el html del producto
    const seccionBusqueda = document.getElementById("seccionBusqueda"); //Traemos las sección de la busqueda
    const tituloCategoria = document.getElementById('title-sections'); //Traemos el h2 donde mostramos la categoría en donde está el usuario
    const textoBusqueda = document.getElementById('search_text'); //Traemos el h4 donde se mostrará el texto que escribió el usuario
    let linksRedirect = document.getElementById("links_redirect");  //Traemos el árbol de redirección del main
    
    //Pasamos a minúsculas lo que recibimos en el parámetro de la búsqueda.
    //Esto sirve para agilizar las validaciones
    busqueda = busqueda.toLowerCase()

    // RENDERIZAMOS LOS TÍTULOS
    //Recorremos las categorías y si el id de la categoría es igual a id_categoria se insertará en el html
    //ese nombre
    if (id_categoria === "null") {
        tituloCategoria.innerHTML = `Categoría | <span>Todo</span>`;
        linksRedirect.innerHTML += `
            <a href="">Todo</a>
            <i class="fa-solid fa-angle-right"></i>
            <a href="">${busqueda}</a>
        `;
    }else{
        categorias.map(categoria=>{
            if (categoria.id === id_categoria) {
                tituloCategoria.innerHTML = `Categoría | <span> ${categoria.name}</span>`;
                linksRedirect.innerHTML += `
                    <a href="">${categoria.name}</a>
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
        
        if (id_categoria === "null") {
            if (nombre.indexOf(busqueda) !== -1) {
                seccionBusqueda.innerHTML += articuloEnHtml
            }
        }else{
            if (nombre.indexOf(busqueda) !== -1 && producto.tipo === id_categoria) {
                seccionBusqueda.innerHTML += articuloEnHtml
            }
        }
    })
}

//Exportamos funciones
export {renderizarProductos, renderizarUnProducto, renderizarCategoria, renderizarBusqueda}