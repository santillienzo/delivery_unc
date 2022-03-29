//Llamamos los datos de nuestro archivo 'datos.json'
//Renderizamos todos los productos del archivo dividiendolo por secciones
const renderizarProductos = ()=>{
    let articuloEnHtml = " ";
    let seccionHamburguesa = document.getElementById("seccionHamb");
    let seccionPizza = document.getElementById("seccionPizza");
    
    return fetch("datos.json")
            .then(res=>{
                return res.json()
            })
            .then(data=>{
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
                            <i class="fas fa-shopping-cart añadir_carrito" id-item=${producto.id}></i>
                            <i id="corazon" class="fas fa-heart"></i>
                        </div>
                    </article>
                    `;
                
                  //Si el artículo tiene como status venta lo colocamos en la sección articuloVenta
                    if (producto.tipo === "hamburguesa") {
                        seccionHamburguesa.innerHTML += articuloEnHtml;
                    } else {
                        seccionPizza.innerHTML += articuloEnHtml;
                    }
                })
            }).catch(error=> console.log(error))
}

//Renderizamos solo UN producto
const renderizarUnProducto = (id)=>{
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
                                <button class="add_cart_btn añadir_carrito" id="add_cart_btn" id-item=${producto.id}>Agregar al carrito</button>
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