// Datos de ejemplo para el catálogo de productos
const catalogo = [
  {
    id: 1,
    nombre: "Ladrillo",
    precio: 10,
    imagen: "imagen1.jpg"
  },
  {
    id: 2,
    nombre: "Hierro",
    precio: 20,
    imagen: "imagen2.jpg"
  },
  {
    id: 3,
    nombre: "Madera",
    precio: 15,
    imagen: "imagen3.jpg"
  }
];

// Obtener referencias a los elementos del DOM
const catalogoElemento = document.getElementById("catalogo");
const carritoListaElemento = document.getElementById("carrito-lista");
const carritoTotalElemento = document.getElementById("carrito-total");
const carritoComprarElemento = document.getElementById("carrito-comprar");

// Variable para almacenar los productos en el carrito
const carritoProductos = [];

// Función para renderizar el catálogo de productos
function renderizarCatalogo() {
  catalogoElemento.innerHTML = "";
  catalogo.forEach(producto => {
    const productoElemento = document.createElement("div");
    productoElemento.classList.add("producto");
    productoElemento.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    catalogoElemento.appendChild(productoElemento);
  });
}

// Función para renderizar el carrito de compras
function renderizarCarrito() {
  carritoListaElemento.innerHTML = "";
  carritoProductos.forEach(producto => {
    const productoElemento = document.createElement("li");
    productoElemento.innerHTML = `
      ${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}
      <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
    `;
    carritoListaElemento.appendChild(productoElemento);
  });


  // Calcular y mostrar el total del carrito
  const total = carritoProductos.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
  carritoTotalElemento.textContent = `Total: $${total}`;

  // Habilitar/deshabilitar botón de comprar según si hay productos en el carrito
  carritoComprarElemento.disabled = carritoProductos.length === 0;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
  const producto = catalogo.find(p => p.id === id);
  
  // Verificar si el producto ya existe en el carrito
  const productoExistente = carritoProductos.find(p => p.id === id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    // Agregar el producto al carrito
    carritoProductos.push({ ...producto, cantidad: 1 });
  }
  
  renderizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
  const index = carritoProductos.findIndex(p => p.id === id);
  carritoProductos.splice(index, 1);
  renderizarCarrito();
}

// Llamar a las funciones de renderizado inicial
renderizarCatalogo();
renderizarCarrito();


// Función para vaciar el carrito
function vaciarCarrito() {
  carritoProductos.length = 0;
  renderizarCarrito();
}

// Llamar a las funciones de renderizado inicial
renderizarCatalogo();
renderizarCarrito();


// Función para mostrar la ventana emergente (SweetAlert)
function mostrarVentanaEmergente() {
  swal("¡Compra realizada!", "Gracias por tu compra", "success");
  vaciarCarrito(); // Vaciar el carrito después de realizar la compra
}

// ...

// Llamar a las funciones de renderizado inicial
renderizarCatalogo();
renderizarCarrito();

// ...

// Asignar el evento click al botón "Comprar"
carritoComprarElemento.addEventListener("click", () => {
  if (carritoProductos.length > 0) {
    mostrarVentanaEmergente();
  } else {
    swal("Carrito vacío", "Agrega productos al carrito antes de comprar", "info");
  }
});

//----------------------------------------------

function generarTicket() {
  // Crear un elemento contenedor para el ticket
  const ticketElemento = document.createElement("div");
  ticketElemento.classList.add("ticket");

  // Crear un elemento para el título del ticket
  const tituloElemento = document.createElement("h2");
  tituloElemento.textContent = "Ticket de compra";
  ticketElemento.appendChild(tituloElemento);

  // Crear un elemento para la lista de productos del ticket
  const listaElemento = document.createElement("ul");

  // Recorrer los productos del carrito y crear un elemento para cada uno
  carritoProductos.forEach(producto => {
    const productoElemento = document.createElement("li");
    productoElemento.textContent = `${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}`;
    listaElemento.appendChild(productoElemento);
  });

  // Agregar la lista de productos al ticket
  ticketElemento.appendChild(listaElemento);

  // Crear un elemento para el total del ticket
  const totalElemento = document.createElement("p");
  const total = carritoProductos.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
  totalElemento.textContent = `Total: $${total}`;
  ticketElemento.appendChild(totalElemento);

  // Renderizar el ticket en el DOM
  const contenedorElemento = document.getElementById("ticket-contenedor");
  contenedorElemento.innerHTML = "";
  contenedorElemento.appendChild(ticketElemento);
}

function mostrarVentanaEmergente() {
  swal("Dejanos tus datos para el ticket de tu compra", {
    content: "input",
  }).then((value) => {
    // Obtener el valor ingresado en el input
    const datos = value;

    // Crear el ticket de compra
    generarTicket();

    // Crear un elemento para mostrar los datos en el ticket
    const datosElemento = document.createElement("p");
    datosElemento.textContent = `Datos: ${datos}`;

    // Agregar los datos al ticket
    const ticketElemento = document.querySelector(".ticket");
    ticketElemento.appendChild(datosElemento);

    // Mostrar la ventana emergente de compra realizada
    swal("¡Compra realizada!", "Gracias por tu compra, debajo tienes tu ticket", "success");

    // Vaciar el carrito después de realizar la compra
    vaciarCarrito();
  });
}
