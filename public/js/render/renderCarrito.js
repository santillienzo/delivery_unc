const tableContainer = document.getElementById('table_container')
const emptyCart = document.getElementById('empty_cart')

//Renderizamos el carrito
export function renderCarrito(tbody, carrito, priceTotal, _priceTotal, countCart, _countCart) {
    tableContainer.style.display = "block"
    emptyCart.style.display = "none"
    


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
    countCart.forEach(e=>{
        e.innerHTML = _countCart
    })
    // countCart.innerHTML = _countCart

    if (carrito.length === 0) {
        return renderCarritoVacio()
    }
}

export function renderCarritoVacio() {
    tableContainer.style.display = "none"
    emptyCart.style.display="block"
}
