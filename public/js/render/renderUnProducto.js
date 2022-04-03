//Renderizamos solo UN producto
//Pedido de datos con async/await
export const renderUnProducto = async(id)=>{
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