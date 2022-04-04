export const renderArticulo = (producto)=>{
    return `
    <article class="articulo">
        <div class="articulo_img_container">
            <img class="card-foto" src="../../${producto.imagen}" alt="" />
        </div>
        <h3 class="name">${producto.nombre}</h3>
        <h2>$<span class="price">${producto.precio}</span></h2>
        <p class="description"> ${producto.descripcion}</p>
        <div class="footer-card">
            <a 
                class="vinculo" 
                href="http://${location.host}/view/product.html?producto=${producto.id}"
            >Ver Más<i class="fas fa-angle-double-right"></i></a>
            <i class="fas fa-shopping-cart agregar_carrito" id-item=${producto.id}></i>
            <i id="corazon" class="fas fa-heart"></i>
        </div>
    </article>
    `;
}