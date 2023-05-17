  // Array de productos
const productos = [
  { nombre: 'Hierro', precio: 10 },
  { nombre: 'Cemento', precio: 15 },
  { nombre: 'Pintura', precio: 20 },
  { nombre: 'Madera', precio: 25 }
];

// Variable para almacenar los productos del carrito
let carrito = [];

// Función para mostrar los productos en la lista de productos
function mostrarProductos() {
  const productosLista = document.getElementById('productos-lista');

  productosLista.innerHTML = '';

  for (const producto of productos) {
    const li = document.createElement('li');
    li.textContent = `${producto.nombre} - $${producto.precio}`;
    li.addEventListener('click', () => agregarAlCarrito(producto));
    productosLista.appendChild(li);
  }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  carrito.push(producto);
  actualizarCarrito();
  guardarCarritoEnStorage();
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
  const carritoLista = document.getElementById('carrito-lista');
  const totalPagar = document.getElementById('total');

  carritoLista.innerHTML = '';

  let total = 0;

  for (const producto of carrito) {
    const li = document.createElement('li');
    li.textContent = `${producto.nombre} - $${producto.precio}`;
    li.addEventListener('click', () => eliminarDelCarrito(producto));
    carritoLista.appendChild(li);
    total += producto.precio;
  }

  totalPagar.textContent = `Total: $${total}`;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(producto) {
  const index = carrito.indexOf(producto);
  carrito.splice(index, 1);
  actualizarCarrito();
  guardarCarritoEnStorage();
}

// Función para guardar el carrito en el Storage
function guardarCarritoEnStorage() {
  const carritoJSON = JSON.stringify(carrito);
  localStorage.setItem('carrito', carritoJSON);
}

// Función para cargar el carrito del Storage
function cargarCarritoDesdeStorage() {
  const carritoJSON = localStorage.getItem('carrito');
  if (carritoJSON) {
    carrito = JSON.parse(carritoJSON);
    actualizarCarrito();
  }
}

// Inicializar la tienda
mostrarProductos();
cargarCarritoDesdeStorage();

// Evento para limpiar el carrito
const limpiarCarritoBtn = document.getElementById('limpiar-carrito');
limpiarCarritoBtn.addEventListener('click', () => {
  carrito = [];
  actualizarCarrito();
  localStorage.removeItem('carrito');
});

// Función para comprar
function comprar() {
  vaciarCarrito();
  swal(
    "¡Gracias por tu compra!", 
    "Vuelve pronto", 
    "success");
    
}


// Función para vaciar el carrito
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
  localStorage.removeItem('carrito');
}

const comprarBtn = document.getElementById('comprar-btn');
comprarBtn.addEventListener('click', comprar);
