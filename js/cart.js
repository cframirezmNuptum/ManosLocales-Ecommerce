document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const tablaCarrito = document.getElementById('productosCarrito');
    const totalPrecio = document.getElementById('totalPrecio');

    // Función para actualizar la tabla de productos en el carrito
    function actualizarCarrito() {
        // Limpiar la tabla
        tablaCarrito.innerHTML = '';
        let total = 0;

        carrito.forEach((producto, index) => {
            // Crear una fila para cada producto
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.color}</td>
                <td>${producto.talla}</td>
                <td>
                    <input type="number" value="${producto.cantidad}" min="1" data-index="${index}" class="cantidadProducto">
                </td>
                <td>$${producto.precio}</td>
                <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
                <td>
                    <button class="eliminarProducto" data-index="${index}">Eliminar</button>
                </td>
            `;
            tablaCarrito.appendChild(fila);

            // Calcular el total
            total += producto.precio * producto.cantidad;
        });

        // Actualizar el total
        totalPrecio.textContent = total.toFixed(2);
    }

    // Función para actualizar la cantidad de un producto en el carrito
    function actualizarCantidad(index, cantidad) {
        if (cantidad < 1) return;
        carrito[index].cantidad = cantidad;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(index) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }

    // Evento para actualizar la cantidad
    tablaCarrito.addEventListener('input', function(event) {
        if (event.target.classList.contains('cantidadProducto')) {
            const index = event.target.dataset.index;
            const cantidad = parseInt(event.target.value);
            actualizarCantidad(index, cantidad);
        }
    });

    // Evento para eliminar un producto
    tablaCarrito.addEventListener('click', function(event) {
        if (event.target.classList.contains('eliminarProducto')) {
            const index = event.target.dataset.index;
            eliminarProducto(index);
        }
    });

    // Evento para vaciar el carrito
    document.getElementById('vaciarCarrito').addEventListener('click', function() {
        localStorage.removeItem('carrito');
        actualizarCarrito();
    });

    // Inicializar el carrito al cargar la página
    actualizarCarrito();

    // Redirigir al pago (esto es solo un ejemplo, ajusta la ruta según sea necesario)
    document.getElementById('btnCheckout').addEventListener('click', function() {
        window.location.href = 'checkout.html'; // Redirige a la página de checkout
    });

    // Función para actualizar el contador de productos en el carrito
    function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = carrito.reduce((acc, item) => acc + item.cantidad, 0); // Sumar las cantidades de todos los productos
    const cartCount = document.getElementById('cart-count');
    
    if (contador > 0) {
        cartCount.textContent = `${contador} productos añadidos`; // Actualizar texto
        cartCount.style.display = 'block'; // Asegurarse de que el contador sea visible
    } else {
        cartCount.style.display = 'none'; // Ocultar el contador si no hay productos
    }
}

// Llamar a la función cada vez que se carga la página para actualizar el contador
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);
});

