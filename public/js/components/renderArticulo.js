export const renderArticulo = (producto)=>{
    return `
    <article class="articulo">
        <div class="articulo_img_container">
            <img class="card-foto" src="../../${producto.imagen}" alt="" />
        </div>
        <h3 class="name">${producto.nombre}</h3>
        <h2 class="price">${producto.precio}</h2>
        <p class="description"> ${producto.descripcion}</p>
        <div class="footer-card">
            <a 
                class="vinculo" 
                href="http://localhost:5500/public/pages/product.html?producto=${producto.id}"
            >Ver Más<i class="fas fa-angle-double-right"></i></a>
            <i class="fas fa-shopping-cart agregar_carrito" id-item=${producto.id}></i>
            <i id="corazon" class="fas fa-heart"></i>
        </div>
    </article>
    `;
}