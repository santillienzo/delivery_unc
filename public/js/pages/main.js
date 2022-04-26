window.addEventListener('load', function() {
  new Glider(document.querySelector('.carrousel__lista'),{
    slidesToShow: 1,
    dots: '.carrousel__indicadores',
    arrows: {
      prev: '.carrousel__anterior',
      next: '.carrousel__siguiente'
    },
    rewind: true,
  })
})

//Importamos las funciones externas que vamos a utilizar
import {renderProductos} from '../render/renderProductos.js'
import {agregarProducto} from '../utils/cart.js'


//----------------ZONA DE DEFINICION DE FUNCIONES ---------------
//En esta función guardamos todos los eventos que utilicemos 
function cargarEscuchaDeEventos() {
  //Atrapamos todos los botones para añadir al carrito
  const add_cart_buttons = document.querySelectorAll('.agregar_carrito')
  
  //Al hacer click en uno de los botones ejecutamos lo siguiente:
  add_cart_buttons.forEach((btn)=>{
    btn.addEventListener("click", e => agregarProducto(e.target.parentElement.parentElement))
  })
}

const createSlider = (sliders)=>{

  sliders.map(slider=>{
    const {sliderSeccionList, dots, prev, next} = slider
    new Glider(document.querySelector(sliderSeccionList), {
      slidesToShow: 2,
      slidesToScroll: 2,
      draggable: true,
      dots,
      arrows: {
        prev,
        next
      },
      rewind: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            
          }
        }
      ]
    });
  })
}

//----------------ZONA DE EJECUCIÓN DE FUNCIONES ---------------
await renderProductos();
cargarEscuchaDeEventos()
createSlider([
  {
    sliderSeccionList: "#seccionMasVendido",
    dots: "#MasVendidosIndicadores",
    prev: "#MasVendidoAnterior",
    next: "#MasVendidoSiguiente",
  },
  {
    sliderSeccionList: "#seccionOferta",
    dots: "#OfertasIndicadores",
    prev: "#OfertaAnterior",
    next: "#OfertaSiguiente",
  },
])