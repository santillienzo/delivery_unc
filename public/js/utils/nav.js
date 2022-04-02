//Importamos los archivos necesarios
import {categorias} from '../categorias.js'

//Traemos los elementos del html
const select = document.getElementById('header__select')    //Aquí se almacenará el select del nav
const logo = document.querySelector('.nav-brand')


// DECLARACIÓN DE VARIABLES
//Función para escuchar todos los eventos
function cargarEscuchaDeEventos(){
    //Al cambiar el select ejecutamos redirectCategoria()
    select.addEventListener("change", (e)=> redirectCategoria(e.target.value))
    //Al hacer click en el logo volvemos al inicio
    logo.addEventListener("click", ()=> window.location.href = "http://localhost:5500")
}

//Rellenar select con sus options
const rellenarSelect=()=>{
    let optionsHtml = ""    //Aquí se guardará el html
    //window.location.search sirve para ver los pará,etros que trae consigo la url
    const valores = window.location.search;
    //Creamos la instancia (objeto con los valores)
    const urlParams = new URLSearchParams(valores);
    //Accedemos a los valores get de la categoria
    //Esto lo hacemos para saber donde estamos parados, y manejar las selecciones por defecto de los <options></options>
    const id_categoria = urlParams.get('categoria');
    

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
    window.location.href = `http://localhost:5500/public/pages/categoria.html?categoria=${categoria}`
}

//ZONA DE EJECUCIÓN
rellenarSelect()
cargarEscuchaDeEventos()
