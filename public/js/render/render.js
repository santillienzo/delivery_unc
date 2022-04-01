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
        articuloEnHtml = `
        <article class="articulo">
            <div class="articulo_img_container">
                <img class="card-foto" src="${producto.imagen}" alt="" />
            </div>
            <h3 class="name">${producto.nombre}</h3>
            <h2 class="price">${producto.precio}</h2>
            <p class="description"> ${producto.descripcion}</p>
            <div class="footer-card">
                <a 
                    class="vinculo" 
                    href="public/pages/product.html?producto=${producto.id}"
                >Ver Más<i class="fas fa-angle-double-right"></i></a>
                <i class="fas fa-shopping-cart agregar_carrito" id-item=${producto.id}></i>
                <i id="corazon" class="fas fa-heart"></i>
            </div>
        </article>
        `;
    
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

//Exportamos funciones
export {renderizarProductos, renderizarUnProducto}