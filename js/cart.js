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

 // Pre-loaded product data
 const products = [
    {
        id: 1,
        name: 'Bolso Artesanal Wayúu',
        description: 'Hermoso bolso tejido a mano por artesanas Wayúu, con diseños tradicionales y colores vibrantes. Pieza única elaborada con técnicas ancestrales, perfecta para uso diario.',
        price: 259.990,
        quantity: 1
    },
    {
        id: 2,
        name: 'Collar de Tagua',
        description: 'Elegante collar elaborado con Tagua, conocida como el marfil vegetal. Diseño exclusivo con acabados naturales y sostenibles, ideal para cualquier ocasión.',
        price: 129.990,
        quantity: 1
    },
    {
        id: 3,
        name: 'Cerámica Decorativa',
        description: 'Pieza decorativa de cerámica pintada a mano, inspirada en motivos tradicionales colombianos. Perfecta para dar un toque de color y artesanía a tu hogar.',
        price: 189.990,
        quantity: 1
    }
];

// Function to render cart items
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <div class="product-image">X</div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn minus" onclick="updateQuantity(${product.id}, -1)">-</button>
                <input type="text" class="quantity-input" value="${product.quantity}" readonly>
                <button class="quantity-btn plus" onclick="updateQuantity(${product.id}, 1)">+</button>
            </div>
            <div class="product-price">$ ${(product.price * product.quantity).toFixed(3)}</div>
        `;
        cartContainer.appendChild(productElement);
    });

    updateTotal();
}

// Function to update quantity
function updateQuantity(productId, change) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const newQuantity = product.quantity + change;
        if (newQuantity >= 1) {
            product.quantity = newQuantity;
            renderCart();
        }
    }
}

// Function to update total
function updateTotal() {
    const total = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    document.getElementById('total-amount').textContent = `$ ${total.toFixed(3)}`;
}

// Initial renders
renderCart();

