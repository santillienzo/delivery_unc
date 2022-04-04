//Importamos los archivos necesarios
import {categorias} from '../categorias.js'

//Traemos los elementos del html
const select = document.getElementById('header__select')    //Aquí se almacena el select del nav
const logo = document.querySelector('.nav-brand')   //Aquí se almacena el logo
const form = document.querySelector('.header__form')    //Aquí se almacena el formulario

// DECLARACIÓN DE VARIABLES
//Función para escuchar todos los eventos
function cargarEscuchaDeEventos(){
    //Al cambiar el select ejecutamos redirectCategoria()
    select.addEventListener("change", (e)=> redirectCategoria(e.target.value))
    //Al hacer click en el logo volvemos al inicio
    logo.addEventListener("click", ()=> window.location.href = `http://${location.host}`)
}

form.addEventListener("submit", (e)=> enviarFormulario(e))

//Enviamos los parámetros correctos a la url
const enviarFormulario = (e)=>{
    e.preventDefault()
    //window.location.search sirve para ver los pará,etros que trae consigo la url
    const valores = window.location.search;
    //Creamos la instancia (objeto con los valores)
    const urlParams = new URLSearchParams(valores);
    //Accedemos a los valores de los parámetros
    let id_categoria = urlParams.get('categoria'); //En que categoría estamos
    const busqueda = e.target[1].value; //Que ingresó el usuario

    //Si la busqueda está vacía no hacemos nada
    if (busqueda === "") {
        return
    }

    //Si no estamos posicionados en ningúna categoría enviamos 'all' para que se muestren todos los productos
    if (id_categoria == null || id_categoria === "null" || id_categoria === "mas_vendido" || id_categoria === "oferta") {
        id_categoria = "all"
    }

    window.location.href = `http://${location.host}/view/search.html?categoria=${id_categoria}&search=${busqueda}`
}

//Rellenar select con sus options
const rellenarSelect=()=>{
    let optionsHtml = ""    //Aquí se guardará el html    

    //Recorremos las categorías y rellenamos dinámicamente el select con los options
    categorias.map(categoria=>{
        optionsHtml = `
            <option value="${categoria.id}">${categoria.name}</option>
        `
        //Insertamos la opción en el select
        select.innerHTML += optionsHtml
    })
}

//Redirigimos al usuario dependiendo de que categoría haya elegido en el select
const redirectCategoria = (categoria)=>{
    window.location.href = `http://${location.host}/view/categoria.html?categoria=${categoria}`
}

//ZONA DE EJECUCIÓN
rellenarSelect()
cargarEscuchaDeEventos()


// PRUEBA
//


