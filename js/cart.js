document.addEventListener('DOMContentLoaded', function() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function agregarAlCarrito(producto) {
        const existe = carrito.find(item => item.id === producto.id);

        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push(producto);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
        actualizarContadorCarrito();
    }

    document.querySelectorAll('.btnAnadir').forEach(boton => {
        boton.addEventListener('click', function() {
            const productoElemento = this.closest('.productoCompleto');
            const id = parseInt(productoElemento.dataset.id);
            const nombre = productoElemento.dataset.nombre;
            const precio = parseFloat(productoElemento.dataset.precio);
            const imagen = productoElemento.dataset.imagen;

            const producto = {
                id,
                nombre,
                precio,
                imagen,
                cantidad: 1
            };

            agregarAlCarrito(producto);
        });
    });

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
        const listaCarrito = document.getElementById('lista-carrito');
        listaCarrito.innerHTML = '';

        carrito.forEach(producto => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${producto.imagen}" width="50" alt="${producto.nombre}">
                ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
                <button class="btnEliminar" data-id="${producto.id}">Eliminar</button>
            `;
            listaCarrito.appendChild(li);
        });

        document.querySelectorAll('.btnEliminar').forEach(boton => {
            boton.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                eliminarDelCarrito(id);
            });
        });
    }

    function eliminarDelCarrito(id) {
        const index = carrito.findIndex(item => item.id === id);
        if (index !== -1) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
            actualizarContadorCarrito();
        }
    }

    document.getElementById('vaciar-carrito').addEventListener('click', function() {
        localStorage.removeItem('carrito');
        while (carrito.length) {
            carrito.pop();
        }
        actualizarCarrito();
        actualizarContadorCarrito();
    });

    actualizarCarrito();
    actualizarContadorCarrito();
});
