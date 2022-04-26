//Importamos los archivos necesarios
import {categorias} from '../categorias.js'

//window.location.search sirve para ver los pará,etros que trae consigo la url
const valores = window.location.search;
//Creamos la instancia (objeto con los valores)
const urlParams = new URLSearchParams(valores);
//Accedemos a los valores de los parámetros
let id_categoria = urlParams.get('categoria'); //En que categoría estamos

//Traemos los elementos del html
const formSelect = document.querySelector('.header__select span')    //Aquí se almacena el select del nav
const formCategories = document.querySelector('.header__select ul')  //Aquí se almacena la lista de categorías
const label = document.getElementById('header__checked-label')  //Llamamos al label del checked
let categoriasActivado = false  //Variable bandera para controlar la apertura de las categorías
const logos = document.querySelectorAll('.nav-brand')   //Aquí se almacena el logo
const forms = document.querySelectorAll('.header__form')    //Aquí se almacena el formulario

//RESPONSIVE
const menu_bars = document.querySelector('.menu_bars')
const menu_close = document.querySelector('.menu_close')
const menu_desplegable = document.querySelector('.menu-desplegable-background')
let menuResponsiveActivado = false

// DECLARACIÓN DE VARIABLES
//Función para escuchar todos los eventos
function cargarEscuchaDeEventos(){
    //Al hacer click en el select:
    formSelect.addEventListener('click', ()=> openCategories())

    //Al hacer click en el logo volvemos al inicio
    logos.forEach(logo=>{
        logo.addEventListener("click", ()=> window.location.href = `http://${location.host}`)
    })

    //Al hacer click en las barras del menu
    menu_bars.addEventListener("click", ()=> openResponsiveMenu())
    menu_close.addEventListener("click", ()=> openResponsiveMenu())

    //Cargamos las escuchas de ambos formularios (desk & responsive)
    forms.forEach(form=>{
        form.addEventListener("submit", (e)=> enviarFormulario(e))
    })
}


//Enviamos los parámetros correctos a la url
const enviarFormulario = (e)=>{
    e.preventDefault()
    
    const checked = e.target[1].checked     //Verificamos que la opción este checkeada
    const busqueda = e.target[0].value; //Que ingresó el usuario


    //Si la busqueda está vacía no hacemos nada
    if (busqueda === "") {
        return
    }

    if (checked) {
        //Si no estamos posicionados en ningúna categoría enviamos 'all' para que se muestren todos los productos
        if (id_categoria == null || id_categoria === "all" || id_categoria === "mas_vendido" || id_categoria === "ofertas") {
            id_categoria = "all"
        }
    
        window.location.href = `http://${location.host}/view/search.html?categoria=${id_categoria}&search=${busqueda}`
    }else{
        window.location.href = `http://${location.host}/view/search.html?categoria=all&search=${busqueda}`
    }


    
}

//Rellenar select con sus options
const rellenarSelect=()=>{
    let optionsHtml =`
    <li><a href="http://${location.host}">Todo</a></li>
    <li><a href="http://${location.host}/view/categoria.html?categoria=mas_vendido">Más vendido</a></li>
    <li><a href="http://${location.host}/view/categoria.html?categoria=ofertas">Ofertas</a></li>
    `   //Aquí se guardará el html    

    //Recorremos las categorías y rellenamos dinámicamente el select con los options
    categorias.map(categoria=>{

        optionsHtml += `
        <li><a href="http://${location.host}/view/categoria.html?categoria=${categoria.id}">${categoria.name}</a></li>
        `
        //Insertamos la opción en el select
    })
    
    formCategories.innerHTML += optionsHtml
}

const cargarLabel = ()=>{
    if (id_categoria == null || id_categoria === "all" || id_categoria === "mas_vendido" || id_categoria === "ofertas") {
        label.innerHTML = "Todo"
    }else{
        categorias.map(categoria=>{
            if (id_categoria === categoria.id) {
                label.innerHTML = categoria.name
            }
        })
    }
}

const openCategories = ()=>{
    if (categoriasActivado) {
        formCategories.style.display = "none"
        categoriasActivado = false
    }else{
        formCategories.style.display = "block"
        categoriasActivado = true
        
    }
}

const openResponsiveMenu = ()=>{
    if (menuResponsiveActivado) {
        menu_desplegable.style.display = "none"
        menuResponsiveActivado = false
    }else{
        menu_desplegable.style.display = "block"
        menuResponsiveActivado = true
    }
}

//ZONA DE EJECUCIÓN
rellenarSelect()
cargarLabel()
cargarEscuchaDeEventos()