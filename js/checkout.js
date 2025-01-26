document.addEventListener('DOMContentLoaded', function() {
    // Obtener el carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productosPedido = document.getElementById('productosPedido');
    const totalPrecioPedido = document.getElementById('totalPrecioPedido');
    const formularioEnvio = document.getElementById('formEnvio');

    // Función para actualizar el resumen del pedido
    function actualizarResumenPedido() {
        // Limpiar la tabla
        productosPedido.innerHTML = '';
        let total = 0;

        carrito.forEach(producto => {
            // Crear una fila por cada producto
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio}</td>
                <td>$${(producto.precio * producto.cantidad).toFixed(2)}</td>
            `;
            productosPedido.appendChild(fila);

            // Sumar el total
            total += producto.precio * producto.cantidad;
        });

        // Actualizar el total de la compra
        totalPrecioPedido.textContent = total.toFixed(2);
    }

    // Función para manejar la confirmación del pedido
    formularioEnvio.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        // Obtener los datos del formulario
        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        const telefono = document.getElementById('telefono').value;
        const tarjeta = document.getElementById('tarjeta').value;
        const fecha = document.getElementById('fecha').value;
        const cvv = document.getElementById('cvv').value;

        // Validar los datos (básicamente, asegurarse de que no estén vacíos)
        if (!nombre || !direccion || !telefono || !tarjeta || !fecha || !cvv) {
            alert('Por favor complete todos los campos');
            return;
        }

        // Aquí podrías agregar la lógica para procesar el pago (esto es solo un ejemplo)
        // Por ejemplo, podrías hacer una llamada a una API de pago

        // Si todo está bien, limpiar el carrito y redirigir
        localStorage.removeItem('carrito');
        alert('¡Gracias por tu compra!');

        // Redirigir a una página de confirmación (puedes crear una página de "Gracias por tu compra")
        window.location.href = 'thank_you.html'; // Cambia esto según tu estructura
    });

    // Inicializar el resumen del pedido
    actualizarResumenPedido();
});