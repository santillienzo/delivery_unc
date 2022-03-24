const carrito_icono = document.getElementById('carrito_icon')
const carrito = document.getElementById('carrito__container')

let carrito_activado = false

carrito_icono.addEventListener("click", ()=>{
    if (carrito_activado) {
        carrito.style.opacity = "0"
        carrito_activado = false
    }else{
        carrito.style.opacity = "1"
        carrito_activado = true
    }
})