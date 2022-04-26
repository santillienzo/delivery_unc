const productImg = document.getElementById('productImg')
const productImgView = document.getElementById('productImgView')
const productImgLabel = document.getElementById('productImgLabel')

//Al cambiar el input de la imagen pasa lo siguiente:
productImg.addEventListener('change', (e)=> {
    let url = URL.createObjectURL(e.target.files[0]); //Agarramos la url del archivo seleccionado
    productImgView.src = url //Le asignamos la url al src de la imagen
    productImgView.style.opacity = "1"  //Le damos una opacity de 1 a la imagen
    productImgLabel.style.opacity = "0" //Le damos una opacity de 0 al label para que desaparezca
})