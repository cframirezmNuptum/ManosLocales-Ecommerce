// Selección de elementos
const carritoIcono = document.querySelector('.logo_carro_compras');
const carritoFlotante = document.getElementById('carrito-flotante');
const cerrarCarrito = document.getElementById('cerrar-carrito');

// Mostrar carrito al hacer clic en el icono
carritoIcono.addEventListener('click', () => {
    carritoFlotante.classList.add('mostrar');
});

// Ocultar carrito al hacer clic en el botón "✖"
cerrarCarrito.addEventListener('click', () => {
    carritoFlotante.classList.remove('mostrar');
});


//* Agregar productos


const agregar = document.querySelectorAll('.btnAnadir');
const producto = document.querySelector('.carrito-contenido'); 

for (let i = 0; i < agregar.length; i++) {
    agregar[i].addEventListener('click', function () {

        const imagen = this.closest('.productoCompleto').querySelector('img').src; 
        const nombreProducto = this.closest('.productoCompleto').querySelector('.nombreProducto').textContent;
        const precioProductos = this.closest('.productoCompleto').querySelector('.precioProductos').textContent;
        
        const productoHTML = `
            <div class="producto-en-carrito">
                <img src="${imagen}" alt="${nombreProducto}" class="imagen-carrito">
                <p>${nombreProducto}</p>
                <p>${precioProductos}</p>
            </div>
        `;
        
        producto.innerHTML += productoHTML;
    }   
)};


    
 