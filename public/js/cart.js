// Atrapo el ícono del carrito y el carrito en sí
const carrito_icono = document.getElementById('carrito_icon')
const carrito_container = document.getElementById('carrito__container')

// Variable bandera para controlar que el carrito este visible o no.
let carrito_visible = false

//Al hacer click en en el ícono del carrito:
carrito_icono.addEventListener("click", ()=>{
    //Si el carrito es visible le vamos a dar un opacity de 0 al carrito y la variable bandera se volverá falsa
    if (carrito_visible) {
        carrito_container.style.opacity = "0"
        carrito_visible = false
    }else{
    //Si el carrito no es visible le vamos a dar un opacity de 1 al carrito y la variable bandera se volverá verdadera
        carrito_container.style.opacity = "1"
        carrito_visible = true
    }
})

