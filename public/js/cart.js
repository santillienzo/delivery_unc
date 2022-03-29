// Atrapo el ícono del carrito y el carrito en sí
const carrito_icono = document.getElementById('carrito_icon')
const carrito_container = document.getElementById('carrito__container')
const close_icono = document.getElementById('close')

//Atrapamos los elementos del html
const priceTotal = document.querySelector('.itemCartTotal span') //Precio total del carritos
const countCart = document.querySelector('.carrito_contador') //contador de productos

//Definimos las variables
let carrito = []; //Array donde se guardarán los productos del carrito
let _priceTotal = 0; //Precio total
let _countCart = 0;//Contador de productos

// Variable bandera para controlar que el carrito este visible o no.
let carrito_visible = false

//Declaramos variables (atrapamos elementos html)
const tbody = document.getElementById("tbody"); //tbody

//Al hacer click en en el ícono del carrito:
carrito_icono.addEventListener("click", ()=> activarCarrito())
//Al hacer click en el ícono de cerrar:
close_icono.addEventListener("click", ()=> activarCarrito())

// ZONA DE DEFINICIÓN DE FUNCIONES
function cargarEscuchaDeEventos() {
    //Al hacer click en la tabla del carrito ejecutamos la función eliminarProducto()
    tbody.addEventListener("click", e => eliminarProducto(e))
    
    //Actualizamos la cantidad del producto al tocar el input Number
    tbody.addEventListener("change", e=> actualizarProducto(e))
}

function activarCarrito() {
    //Si el carrito es visible le vamos a dar un opacity de 0 al carrito y la variable bandera se volverá falsa
    if (carrito_visible) {
        carrito_container.style.opacity = "0"
        carrito_visible = false
    }else{
    //Si el carrito no es visible le vamos a dar un opacity de 1 al carrito y la variable bandera se volverá verdadera
        carrito_container.style.opacity = "1"
        carrito_visible = true
    }
}

function añadirProducto(productoSeleccionado){
    console.log(productoSeleccionado)
    //Extraemos todos los datos del producto que seleccionemos
    const item = {
        id: Number(productoSeleccionado.querySelector('.añadir_carrito').getAttribute('id-item')),
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
            }else{
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
}

function actualizarProducto(e) {
    console.log(e.target.value)
    //Si actualizamos el input de cantidad:
    if(e.target.classList.contains('amount_input')){
        //Obtenemos la id del producto con el atributo 'data-id' asignado al input
        const updateId = Number(e.target.getAttribute('data-id'))
        _priceTotal = 0

        carrito.forEach(producto =>{
            //Si el producto donde estamos posicionados es igual al updateId:
            if (producto.id === updateId) {
                if (Number(e.target.value) > producto.cantidad) {
                    _countCart = _countCart + Number(e.target.value) - producto.cantidad
                }else{
                    _countCart = _countCart - (producto.cantidad - Number(e.target.value))
                }
                producto.cantidad = Number(e.target.value)//Actualizamos la cantidad del producto
            }
            _priceTotal = parseFloat(_priceTotal) + (parseFloat(producto.precio) * parseFloat(producto.cantidad))
            _priceTotal = _priceTotal.toFixed(2)
        })
        localStorage.setItem("carritoClave", JSON.stringify(carrito));
    }
    renderCarrito()
}

function eliminarProducto(e) {
    //Si hacemos click sobre el btn de eliminar
    if (e.target.classList.contains('eliminar-item')) {
        //Obtenemos la id del producto con el atributo 'data-id' asignado al boton
        const deleteId = Number(e.target.getAttribute('data-id'))

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

//Renderizamos el carrito
function renderCarrito() {
    tbody.innerHTML=' '

    carrito.forEach(producto=>{
        const tr = document.createElement("tr");
        const {id, nombre, precio, cantidad} = producto;
        const fila = `
            <td class="table-zona">${nombre}</td>
            <td class="table-precio">$${precio}</td>
            <td class="table-cantidad">
            <input type="number" min = "1" value=${cantidad} min="0" max="100" class="amount_input" data-id=${id}>
            </td> 
            <button class="eliminar-item" data-id=${id}> Eliminar</button>
        `;
        tr.innerHTML = fila;
        tbody.append(tr);
    })

    priceTotal.innerHTML = _priceTotal
    countCart.innerHTML = _countCart
}

//Si existe el carrito en el LocalStorage: 
if (localStorage.getItem("carritoClave")) {
    //Nuestra variable carrito será igual a lo guardado en el local storage
    carrito = JSON.parse(localStorage.getItem("carritoClave"));
    //Recorremos el carrito
    carrito.map(product=>{
        //El precio total es igual al valor de precio total + precio del producto multiplicadp por la cantidad
        _priceTotal = parseFloat(_priceTotal) + parseFloat(product.precio) * parseFloat(product.cantidad)
        _priceTotal = _priceTotal.toFixed(2)
        //El contador es igual al valor de contador + la cantidad del producto
        _countCart = _countCart + product.cantidad
    })
    
    renderCarrito()
}

//Ejecución de funciones
cargarEscuchaDeEventos()

//Exportamos funciones
export {eliminarProducto, añadirProducto, actualizarProducto}