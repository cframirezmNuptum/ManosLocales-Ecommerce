document.addEventListener('DOMContentLoaded', function() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function agregarProductoAlCarrito(producto) {
        const existe = carrito.find(item => item.id === producto.id && item.talla === producto.talla);
    
        if (existe) {
            existe.cantidad += producto.cantidad; 
            mostrarModalProductoExistente(producto.nombre);
        } else {
            carrito.push(producto);
            mostrarModalAgregado(producto.nombre);
        }
    
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
        actualizarContadorCarrito();
    }

    window.agregarProductoAlCarrito = agregarProductoAlCarrito;

   /*function actualizarContadorCarrito() {
        const contador = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        const cartCount = document.getElementById('cart-count');

        if (contador > 0) {
            cartCount.textContent = `${contador}`;
            cartCount.style.display = 'block';
        } else {
            cartCount.style.display = 'none';
        }
    }*/

        function actualizarCarrito() {
            const listaCarrito = document.getElementById('listaCarrito');
            if (!listaCarrito) return;
            listaCarrito.innerHTML = '';
        
            carrito.forEach(producto => {
                const productItem = document.createElement('div');
                productItem.classList.add('productItem');
        
                productItem.innerHTML = `
                    <div class="product-item-container">
                        <div class="product-image">
                            <img src="${producto.imagen}" alt="${producto.nombre}" width="150" height="150">
                        </div>
                        <div class="product-info">
                            <div class="product-title">${producto.nombre}</div>                            
                            <div class="product-size">Talla: ${producto.talla}</div>
                            <div class="quantity-controls">
                                <button class="quantity-btn decrement-btn" data-id="${producto.id}" data-talla="${producto.talla}">-</button>
                                <input class="quantity-input" type="text" value="${producto.cantidad}" readonly>
                                <button class="quantity-btn increment-btn" data-id="${producto.id}" data-talla="${producto.talla}">+</button>
                            </div>
                            <div class="product-price">$${formatearPrecio(producto.precio * producto.cantidad)}</div>
                            <button class="btnEliminar" data-id="${producto.id}" data-talla="${producto.talla}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
        
                listaCarrito.appendChild(productItem);
            });

        document.querySelectorAll('.btnEliminar').forEach(boton => {
            boton.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const talla = this.dataset.talla;
                eliminarDelCarrito(id, talla);
            });
        });

        document.querySelectorAll('.increment-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const talla = this.dataset.talla;
                incrementarCantidad(id, talla);
            });
        });

        document.querySelectorAll('.decrement-btn').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const talla = this.dataset.talla;
                decrementarCantidad(id, talla);
            });
        });

        actualizarTotal();
    }

    function actualizarTotal() {
        const costoTotal = document.getElementById('total-amount');
        const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        if (costoTotal) {
            costoTotal.textContent = formatearPrecio(total);
        }
    }

    function eliminarDelCarrito(id, talla) {
        carrito = carrito.filter(item => !(item.id === id && item.talla === talla));
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
        actualizarContadorCarrito();
        actualizarTotal();
    }

    function incrementarCantidad(id, talla) {
        let producto = carrito.find(item => item.id === id && item.talla === talla);
        if (producto) {
            producto.cantidad++;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
            actualizarContadorCarrito();
            actualizarTotal();
        }
    }

    function decrementarCantidad(id, talla) {
        let producto = carrito.find(item => item.id === id && item.talla === talla);
        if (producto && producto.cantidad > 1) {
            producto.cantidad--;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
            actualizarContadorCarrito();
            actualizarTotal();
        }
    }

    document.getElementById('vaciar-carrito')?.addEventListener('click', function() {
        localStorage.removeItem('carrito');
        carrito = [];
        actualizarCarrito();
        actualizarContadorCarrito();
        actualizarTotal();
    });

    actualizarCarrito();
    /*actualizarContadorCarrito();*/
    actualizarTotal();
});

function formatearPrecio(precio) {
    return precio.toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}

function obtenerTotalCarrito() {
    let total = 0;
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];    
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });

    return total;
}

function irACheckout() {
    // Obtener los totales
    const totalCarrito = obtenerTotalCarrito();  
    const costoEnvio = 15000;

    // Guardar los datos en localStorage
    localStorage.setItem('totalCarrito', totalCarrito);
    localStorage.setItem('costoEnvio', costoEnvio);

    // Redirigir a la página de checkout
    window.location.href = 'checkout2.html';  
}
