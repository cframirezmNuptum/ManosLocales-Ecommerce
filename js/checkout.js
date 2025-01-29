document.addEventListener('DOMContentLoaded', function () {
    const totalElement = document.getElementById('total');
    const envioElement = document.getElementById('envio');
    const totalEnvioElement = document.getElementById('totalEnvio');
    const realizarCompraBtn = document.getElementById('realizarCompra');

    // Ejemplo de productos seleccionados, en un escenario real vendrían del carrito
    let productosSeleccionados = [
        { nombre: 'Producto 1', precio: 50.0 },
        { nombre: 'Producto 2', precio: 49.0 }
    ];

    // Calcular el total y el envío
    function actualizarTotales() {
        let total = 0;
        productosSeleccionados.forEach(producto => {
            total += producto.precio;
        });

        let envio = productosSeleccionados.length > 0 ? 50.0 : 0; // Envío fijo para este ejemplo
        let totalConEnvio = total + envio;

        totalElement.textContent = total.toFixed(2);
        envioElement.textContent = envio.toFixed(2);
        totalEnvioElement.textContent = totalConEnvio.toFixed(2);
    }

    // Manejar el evento de realizar compra
    realizarCompraBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del botón (por si acaso)

        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const ciudad = document.getElementById('ciudad').value.trim();
        const datosAdicionales = document.getElementById('datosAdicionales').value.trim();

        let errores = [];

        // Validaciones básicas
        if (!nombre) errores.push('El nombre es obligatorio.');
        if (!apellido) errores.push('El apellido es obligatorio.');
        if (!email) errores.push('El correo electrónico es obligatorio.');
        if (!telefono) errores.push('El número de contacto es obligatorio.');
        if (!direccion) errores.push('La dirección es obligatoria.');
        if (!ciudad) errores.push('La ciudad es obligatoria.');

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            errores.push('El correo electrónico no es válido.');
        }

        // Validar que el teléfono solo contenga números y tenga al menos 7 dígitos
        const telefonoRegex = /^[0-9]{7,}$/;
        if (telefono && !telefonoRegex.test(telefono)) {
            errores.push('El número de contacto debe contener solo números y al menos 7 dígitos.');
        }

        // Mostrar errores si existen
        if (errores.length > 0) {
            alert(errores.join('\n'));
            return;
        }

        // Guardar los datos en localStorage
        const datosFormulario = { nombre, apellido, email, telefono, direccion, ciudad, datosAdicionales };
        localStorage.setItem('datosFormulario', JSON.stringify(datosFormulario));

        // Mostrar alerta de éxito y redirigir
        alert('Formulario enviado con éxito.');
        window.location.href = 'index.html'; // Redirigir o mostrar una página de confirmación
    });

    // Inicializar totales
    actualizarTotales();
});
