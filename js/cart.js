document.addEventListener('DOMContentLoaded', function() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function agregarProductoAlCarrito(producto) {        
        const existe = carrito.find(item => item.id === producto.id && item.talla === producto.talla);

        if (existe) {
            existe.cantidad++;
            mostrarModalProductoExistente(producto.nombre);
        } else {
            carrito.push(producto);
            mostrarModalAgregado(producto.nombre);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
        actualizarContadorCarrito();
    }

    window.agregarProductoAlCarrito = agregarProductoAlCarrito;  // Hace que la función sea accesible globalmente

    function actualizarContadorCarrito() {
        const contador = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        const cartCount = document.getElementById('cart-count');
        
        if (contador > 0) {
            cartCount.textContent = `${contador}`;
            cartCount.style.display = 'block';
        } else {
            cartCount.style.display = 'none';
        }
    }

    function actualizarCarrito() {
        const listaCarrito = document.getElementById('cart-items');
        if (!listaCarrito) return;
        listaCarrito.innerHTML = '';

        carrito.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <img src="${producto.imagen}" width="50" alt="${producto.nombre}">
                ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
                <button class="btnEliminar" data-id="${producto.id}">Eliminar</button>
            `;
            listaCarrito.appendChild(div);
        });

        document.querySelectorAll('.btnEliminar').forEach(boton => {
            boton.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const talla = this.dataset.talla;
                eliminarDelCarrito(id, talla);
            });
        });

        actualizarTotal();
    }

    function actualizarTotal(){
        const costoTotal = document.getElementById('total-amount');
        const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        if(costoTotal){
            costoTotal.textContent = `$ ${total}`;
        }
    }

    function eliminarDelCarrito(id, talla) {
        carrito = carrito.filter (item => ! (item.id === id && item.talla === talla));
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
        actualizarContadorCarrito();
        actualizarTotal();
    }
    

    document.getElementById('vaciar-carrito')?.addEventListener('click', function() {
        localStorage.removeItem('carrito');
        carrito = [];
        actualizarCarrito();
        actualizarContadorCarrito();
        actualizarTotal();
    });

    actualizarCarrito();
    actualizarContadorCarrito();
    actualizarTotal();
});