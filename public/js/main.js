window.onload = () => {

  let carrito = {};

  //----------------ZONA DE DEFINICION DE FUNCIONES ---------------
  function listarTodo() {
    let seccionHamburguesa = document.getElementById("seccionHamb");
    let seccionPizza = document.getElementById("seccionPizza");

    fetch("datos.json")
      .then((respuesta) => respuesta.json()) //Indicamos el formato en que se desea obtener la información
      .then((respuestaJs) => {
        let arrayProductos = respuestaJs;
        let articuloEnHtml = " ";

        arrayProductos.forEach((producto) => {
          articuloEnHtml = `
            <article class="articulo">
              <img class="card-foto" src="${producto.imagen}" alt="" />
              <input 
                type="hidden" 
                class = "propiedadId"
                name="idPropiedad"
                id="idPropiedad" 
                value="${producto.id}"
              />
              <h3>${producto.nombre}</h3>
              <h2>${producto.precio}</h2>
              <p> ${producto.descripcion}</p>
              <div class="footer-card">
                <a 
                  class="vinculo" 
                  href="propiedadesDetail.html?zona=${producto.zona}&descripcion=${producto.Descripcion}"
                >Ver Más<i class="fas fa-angle-double-right"></i></a>
                  <i class="fas fa-shopping-cart carrito-logo"  ></i>
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

          const carritoIcono = document.querySelectorAll(".carrito-logo");

          carritoIcono.forEach((btn) => {
            btn.addEventListener("click", (e) => agregarAlCarrito(e));
          });
        });
      }) // Aquí mostramos dicha información
      .catch((error) => console.log("Hubo un error : " + error.message));
  }

  function agregarAlCarrito(e) {
    // console.log(e.target);
    if (e.target.classList.contains("carrito-logo")) {
      unItemAlCarrito(e.target.parentElement.parentElement);
    }

    e.stopPropagation();
  }

  function unItemAlCarrito(objeto) {
    console.log(objeto);
    console.log("AGrego un item");
    const producto = {
      id: objeto.querySelector(".propiedadId").value,
      precio: objeto.querySelector("h2").textContent,
      nombre: objeto.querySelector("h3").textContent,
      descripcion: objeto.querySelector("p").textContent,
      cantidad: 1,
    };
    if (carrito.hasOwnProperty(producto.id)) {
      producto.cantidad = carrito[producto.id].cantidad + 1;
    }

    carrito[producto.id] = { ...producto };

    localStorage.setItem("carritoClave", JSON.stringify(carrito));

    renderCarrito();
  }

  // -------DEFINICION DE LA FUNCION RENDER CARRITO
  function renderCarrito() {
    console.log("El contenido del carrito");
    console.log(carrito);
    console.log(typeof(carrito)) 
    // alert("carrito fuera del map");

    tbody.innerHTML = ' ';
    //  Los objetos deben transformarse con Object.values
    Object.values(carrito).forEach(item =>{
      const tr = document.createElement("tr");

      const linea = `
      <tr>
        <td class="table-zona">${item.nombre}</td>
        <td class="table-precio">$${item.precio}</td>
        <td class="table-cantidad">
        <input type="number" min = "1" value=${item.cantidad} name="" id="">
        </td> 
        <button class="eliminar-item"> Eliminar</button>
      </tr>
      `;
      tr.innerHTML = linea;
      tbody.append(tr);
    })
  }

  //----DEFINICION DE LA FUNCION DE LOCAL STORAGE
  function addLocalStorage() {
    localStorage.setItem("carritoClave", JSON.stringify(carrito));
  }

  let tbody = document.getElementById("tbody");
  // atrapo el tbody

  if (localStorage.getItem("carritoClave")) {
    carrito = JSON.parse(localStorage.getItem("carritoClave"));
    renderCarrito()
  }

  listarTodo();
};