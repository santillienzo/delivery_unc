export const categorias = [
    {
        id:"hamburguesa",
        name: "Hamburguesas",
        products: []
    },
    {
        id: "pizza",
        name: "Pizzas",
        products: []
    }
]

//Con esta función rellenaremos los ARRAY 'products' que estan dentro del ARRAY 'categorias'
const rellenarCategorias = async()=>{
    const res = await fetch("datos.json") //Pedimos los datos a la api
    const data = await res.json() //Convertimos esos datos en archivo javaScript

    //Recorremos con un map el array donde se encuentran alojadas nuestras categorías
    //En esta parte rellenaremos cada categoría con su producto correspondiente
    categorias.map(categoria =>{
        //a cada categoría le asignaremos los productos que coincidan con su id
        categoria.products = data.filter(producto=> producto.tipo === categoria.id)
    })
}


rellenarCategorias()