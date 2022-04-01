const select = document.getElementById('header__select')    //Aquí se almacenará el select del nav

function cargarEscuchaDeEventos(){
    select.addEventListener("change", (e)=> redirectFilter(e.target.value))
}

//Redirigimos al usuario dependiendo de que categoría haya elegido en el select
const redirectFilter = (categoria)=>{
    window.location.href = `http://localhost:5500/public/pages/categoria.html?categoria=${categoria}`
}


cargarEscuchaDeEventos()
