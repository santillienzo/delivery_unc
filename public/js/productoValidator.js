let errors = {};



const formu = document.getElementById("formulario");
const producto= document.getElementById("nombreProducto");
const precio = document.getElementById("precio");
const categoria = document.getElementById("categoria");

const masVendido = document.getElementById("best_seller");
const oferta = document.getElementById("offer")

const descripcion = document.getElementById("descripcionProducto");

// Declaro las Funciones

let productoValidator = () => {
  // Declaro string vacio que contendra mensaje de error
  let feedback = "";
  // Almaceno elemento hermano(<p>) a input nombre, hay un p al final
  let feedbackElement = producto.nextElementSibling;

  // Si el nombre no valida sobreescribo feedback
  if (producto.value.trim() == "") {
    feedback = "El nombre no puede estar vacio";
  } else if (producto.value.length < 5) {
    feedback = "El nombre no puede tener menos de 5 caracteres";
  }

  // Si existe error se almacena en objeto errors
  if (feedback) {
    producto.classList.add("error-input");
    errors.firstName = feedback;
  } else {
    producto.classList.remove("error-input");
    delete errors.producto;
  }

  // Se imprime string de error en vista
  // Utilizo el <p> hermano para publicar el error
  //feedbackElement es el siguiente hermano, es decir el P
  feedbackElement.innerText = feedback;
};

let precioValidator = () => {
  // Declaro string vacio que contendra mensaje de error
  let feedback = "";
  // Almaceno elemento hermano(<p>) a input nombre, hay un p al final
  let feedbackElement = precio.nextElementSibling;
  console.log(feedbackElement)

  // Si el nombre no valida sobreescribo feedback
  if (precio.value.trim() == "") {
    feedback = "El precio no puede  estar vacio";
  } else if (precio.value <= 0) {
    feedback = "El precio no puede ser menor a cero";
  }

  // Si existe error se almacena en objeto errors
  if (feedback) {
    precio.classList.add("error-input");
    errors.precio = feedback;
  } else {
    precio.classList.remove("error-input");
    delete errors.precio;
  }

  // Se imprime string de error en vista
  // Utilizo el <p> hermano para publicar el error
  //feedbackElement es el siguiente hermano, es decir el P
  feedbackElement.innerText = feedback;
};




let categoriaValidator = () => {
  //validando campo usuario
};

let masVendidoValidator = () => {
  //validando campo usuario
};

let ofertaValidator = () => {
  //validando campo usuario
};


let descripcionValidator = () => {
  // Declaro string vacio que contendra mensaje de error
  let feedback = "";
  // Almaceno elemento hermano(<p>) a input nombre, hay un p al final
  let feedbackElement = descripcion.nextElementSibling;

  // Si el nombre no valida sobreescribo feedback
  if (descripcion.value.trim() == "") {
    feedback = "La descripcion no puede estar vacio";
  } else if (descripcion.value.length < 5) {
    feedback = "descripcion no puede tener menos de 5 caracteres";
  }

  // Si existe error se almacena en objeto errors
  if (feedback) {
    descripcion.classList.add("error-input");
    errors.firstName = feedback;
  } else {
    descripcion.classList.remove("error-input");
    delete errors.descripcion;
  }

  // Se imprime string de error en vista
  // Utilizo el <p> hermano para publicar el error
  //feedbackElement es el siguiente hermano, es decir el P
  feedbackElement.innerText = feedback;
};


// Ejecuto los oyentes
// Llamo a las funciones

formu.addEventListener("submit", (e) => {
  e.preventDefault();
  productoValidator();
  precioValidator();
  descripcionValidator()
  // si existen errores prevent default
  if (Object.keys(errors).length) {
    e.preventDefault();

  } else {
    alert(`Se cargó el nuevo producto`);
  }  
});

// Si focus se sale del input se ejecuta funcion validacion
producto.addEventListener("blur", productoValidator);
precio.addEventListener("blur", precioValidator);
categoria.addEventListener("blur", categoriaValidator);
masVendido.addEventListener("blur", masVendidoValidator);
oferta.addEventListener("blur", ofertaValidator);
descripcion.addEventListener("blur", descripcionValidator);
