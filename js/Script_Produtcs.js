document.querySelectorAll('.btnVer').forEach(button => {
    button.addEventListener('click', () => {
        // Aquí debemos redirigir a un producto específico, no solo a 'item.html' por eso lo cambié.
        // Cada producto tiene un atributo 'data-id' para identificarlo de forma única.
        const productId = button.closest('.productoCompleto').dataset.id;
        window.location.href = `item.html?id=${productId}`; // Redirige a item.html con un parámetro de ID
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad para la galería de imágenes
    const miniaturas = document.querySelectorAll('.miniatura');
    const primeraImagen = document.getElementById('primeraImagen');

    if (miniaturas && primeraImagen) {
        miniaturas.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Actualizar imagen principal
                primeraImagen.src = this.src;
                
                // Actualizar clase active
                miniaturas.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Funcionalidad para el selector de cantidad
    const entradaCantidad = document.getElementById('cantidad');
    const botonDisminuir = document.getElementById('disminuye');
    const botonAumentar = document.getElementById('aumenta');

    if (entradaCantidad && botonDisminuir && botonAumentar) {
        botonDisminuir.addEventListener('click', function() {
            const valorActual = parseInt(entradaCantidad.value);
            if (valorActual > 1) {
                entradaCantidad.value = valorActual - 1;
            }
        });

        botonAumentar.addEventListener('click', function() {
            const valorActual = parseInt(entradaCantidad.value);
            entradaCantidad.value = valorActual + 1;
        });

        entradaCantidad.addEventListener('change', function() {
            if (this.value < 1) {
                this.value = 1;
            }
        });
    }

    // Funcionalidad para los botones de color
    const opcionesColor = document.querySelectorAll('.colorIndividual');
    
    if (opcionesColor) {
        opcionesColor.forEach(option => {
            option.addEventListener('click', function() {
                // Remover selección previa
                opcionesColor.forEach(opt => opt.classList.remove('selected'));
                // Agregar selección actual
                this.classList.add('selected');
            });
        });
    }

    // Funcionalidad para el botón de añadir al carrito
    const añadirCarro = document.querySelector('.btnAnadir');
    
    if (añadirCarro) {
        añadirCarro.addEventListener('click', function () {
            // Recopilar datos del producto
            const productId = document.querySelector('.productoCompleto').dataset.id;
            const cantidad = parseInt(document.getElementById('cantidad').value);
    
            // Validar cantidad
        if (isNaN(cantidad) || cantidad < 1) {
            alert('Por favor seleccione una cantidad válida');
            return;
        }
    
            // Crear objeto del producto
            const producto = {
                id: productId, // Usar el ID del producto
                nombre: document.getElementById('nombreProducto').textContent, 
                cantidad: cantidad,
                precio: parseFloat(document.getElementById('precioProductos').textContent.replace('$', '').replace('.', '')),
            };
    
            // Leer carrito actual desde localStorage
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
            // Verificar si el producto ya existe en el carrito
            const indiceExistente = carrito.findIndex(
                item => item.id === producto.id
            );
    
            if (indiceExistente > -1) {
                // Si ya existe, actualizar la cantidad
                carrito[indiceExistente].cantidad += cantidad;
            } else {
                // Si no existe, añadirlo
                carrito.push(producto);
            }
    
            // Guardar carrito actualizado en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
    
            // Confirmar al usuario
            alert('Producto añadido al carrito');
            window.location.href = 'cart.html';
        });
    }

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

document.addEventListener("DOMContentLoaded", () => {
    const botonesAnadir = document.querySelectorAll(".btnAnadir");
    const carritoIndicador = document.querySelector(".indicador_compra"); // Indicador del carrito

    // Función para obtener el carrito del localStorage
    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem("carrito")) || [];
    }

    // Función para guardar el carrito en localStorage
    function guardarCarrito(carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarIndicadorCarrito(); // Actualizar el número de productos en el icono
    }

    // Función para actualizar el número en el ícono del carrito
    function actualizarIndicadorCarrito() {
        const carrito = obtenerCarrito();
        const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        carritoIndicador.textContent = totalProductos > 0 ? totalProductos : ""; // Muestra el número o lo oculta si es 0
    }

    // Función para añadir un producto al carrito
    function anadirAlCarrito(event) {
        const productoElement = event.target.closest(".productoCompleto");
        const id = productoElement.getAttribute("data-id");
        const nombre = productoElement.querySelector(".nombreProducto").textContent;
        const precio = parseFloat(productoElement.querySelector(".precioProductos").textContent.replace("$", "").trim());
        const imagen = productoElement.querySelector(".imagenProductos img").src;

        let carrito = obtenerCarrito();

        // Verificar si el producto ya está en el carrito
        const productoExistente = carrito.find(item => item.id === id);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
        }

        guardarCarrito(carrito);

    }

    // Asignar eventos a los botones "Añadir"
    botonesAnadir.forEach(boton => {
        boton.addEventListener("click", anadirAlCarrito);
    });

    // Actualizar el indicador del carrito al cargar la página
    actualizarIndicadorCarrito();
});
