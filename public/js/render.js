//Llamamos los datos de nuestro archivo 'datos.json'
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
                        <img class="card-foto" src="${producto.imagen}" alt="" />
                        <h3 class="name">${producto.nombre}</h3>
                        <h2 class="price">${producto.precio}</h2>
                        <p class="description"> ${producto.descripcion}</p>
                        <div class="footer-card">
                            <a 
                            class="vinculo" 
                            href="propiedadesDetail.html?zona=${producto.zona}&descripcion=${producto.Descripcion}"
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
            })
            .catch(error=>{
                console.log(error)
            })
}

//Exportamos funciones
export {renderizarProductos}