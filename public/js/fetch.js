const fetchProducts = ()=>{
    return fetch("datos.json")
            .then(res=>{
                return res.json()
            })
            .catch(error=>{
                console.log(error)
            })
}

//Exportamos funciones
export {fetchProducts}