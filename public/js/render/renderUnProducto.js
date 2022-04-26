//Renderizamos solo UN producto

import { renderDetailProduct } from "../components/renderDetailProduct.js";

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
                        articuloEnHtml = renderDetailProduct(producto)

                        linksRedirect.innerHTML += `<a href="">${producto.nombre}</a>`
                        productContainer.innerHTML = articuloEnHtml
                    }
                })


            }).catch(error=> console.log(error))
}