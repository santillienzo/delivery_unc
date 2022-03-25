window.onload = async () => {
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
        });

        cargarEscuchaDeEventos()
      }) // Aquí mostramos dicha información
      .catch((error) => console.log("Hubo un error : " + error.message));
  }

  //En esta función guardamos todos los eventos que utilicemos 
  function cargarEscuchaDeEventos() {
    //Atrapamos todos los botones para añadir al carrito
    const add_cart_buttons = document.querySelectorAll('.añadir_carrito')
    
    //Al hacer click en uno de los botones ejecutamos lo siguiente:
    add_cart_buttons.forEach((btn)=>{
      btn.addEventListener("click", (e)=> {
        añadirCarrito(e.target.parentElement.parentElement)
      })
    })

    //Al hacer click en la tabla del carrito ejecutamos la función eliminarProducto()
    tbody.addEventListener("click", e => eliminarProducto(e))
  }

  function eliminarProducto(e) {
    //Si hacemos click sobre el btn de eliminar
    if (e.target.classList.contains('eliminar-item')) {
      //Obtenemos la id del producto con el atributo 'data-id' asignado al boton
      const deleteId = e.target.getAttribute('data-id')

      //Recorremos los productos del carrito
      carrito.forEach(producto =>{
        //Si el producto donde estamos posicionados es igual al deleteId:
        if (producto.id === deleteId) {
          //Definimos una variable que es igual al precio del producto que eliminamos por la cantidad que hay
          let priceReduce = parseFloat(producto.precio) * parseFloat(producto.cantidad);
          _priceTotal = _priceTotal - priceReduce //Restamos el precio total
          _priceTotal = _priceTotal.toFixed(2)
          _countCart = _countCart - producto.cantidad //Reducimos el contador
        }
      })
      carrito = carrito.filter(producto=> producto.id !== deleteId)
      localStorage.setItem("carritoClave", JSON.stringify(carrito));
    }

    renderCarrito()
  }


  function añadirCarrito(productoSeleccionado){
    //Extraemos todos los datos del producto que seleccionemos
    const item = {
      id: productoSeleccionado.querySelector('.añadir_carrito').getAttribute('id-item'),
      nombre: productoSeleccionado.querySelector('.name').textContent,
      descripcion: productoSeleccionado.querySelector('.description').textContent,
      precio: productoSeleccionado.querySelector('.price').textContent,
      cantidad: 1
    }

    //Sumamos el precio total
    _priceTotal = parseFloat(_priceTotal) + parseFloat(item.precio)
    _priceTotal = _priceTotal.toFixed(2)

    //Comprobamos que el producto existe en el carrito
    const exist = carrito.some(producto => producto.id === item.id);

    //En caso de que así sea sumamos 1 a la cantidad del producto, y si no es así agregamos el producto al render
    if (exist) {
      const pro = carrito.map(producto=>{
        if (producto.id === item.id) {
          producto.cantidad++
          _countCart++;
          return producto
        }
      })
      carrito = [...pro]
    }else{
      carrito = [...carrito, item]
      _countCart++;
    }

    localStorage.setItem("carritoClave", JSON.stringify(carrito));

    renderCarrito()
    console.log(item)
  }

  //Renderizamos el carrito
  function renderCarrito() {
    tbody.innerHTML=' '

    carrito.forEach(producto=>{
      const tr = document.createElement("tr");
      const {id, nombre, descripcion, precio, cantidad} = producto;
      const fila = `
        <td class="table-zona">${nombre}</td>
        <td class="table-precio">$${precio}</td>
        <td class="table-cantidad">
          <input type="number" min = "1" value=${cantidad} name="" id="">
        </td> 
        <button class="eliminar-item" data-id=${id}> Eliminar</button>
      `;
      tr.innerHTML = fila;
      tbody.append(tr);
    })

    priceTotal.innerHTML = _priceTotal
    countCart.innerHTML = _countCart
  }


  //Atrapamos los elementos del html
  const tbody = document.getElementById("tbody"); //tbody
  const priceTotal = document.querySelector('.itemCartTotal span') //Precio total del carritos
  const countCart = document.querySelector('.carrito_contador') //contador de productos

  //Definimos las variables
  let carrito = []; //Array donde se guardarán los productos del carrito
  let _priceTotal = 0; //Precio total
  let _countCart = 0;//Contador de productos
  //Si existe el carrito en el LocalStorage: 
  if (localStorage.getItem("carritoClave")) {
    //Nuestra variable carrito será igual a lo guardado en el local storage
    carrito = JSON.parse(localStorage.getItem("carritoClave"));
    //Recorremos el carrito
    carrito.map(product=>{
      //El precio total es igual al valor de precio total + precio del producto multiplicadp por la cantidad
      _priceTotal = _priceTotal + product.precio * product.cantidad
      //El contador es igual al valor de contador + la cantidad del producto
      _countCart = _countCart + product.cantidad
    })
    
    renderCarrito()
  }
  
  listarTodo();

};