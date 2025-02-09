
// JavaScript del checkout
document.addEventListener('DOMContentLoaded', function() {
    const totalCarrito = parseFloat(localStorage.getItem('totalCarrito'));
    const costoEnvio = parseFloat(localStorage.getItem('costoEnvio'));
    document.getElementById('total').textContent = `$${totalCarrito.toFixed(2)}`;
    document.getElementById('envio').textContent = `$${costoEnvio.toFixed(2)}`;
    document.getElementById('totalEnvio').textContent = `$${(totalCarrito + costoEnvio).toFixed(2)}`;
    
});


document.getElementById("realizarCompra").addEventListener("click", function () {
    let isValid = true;

    function showError(inputId, message) {
        let inputField = document.getElementById(inputId);
        let errorField = document.getElementById(inputId + "Error");
        
        if (!errorField) {
            errorField = document.createElement("div");
            errorField.id = inputId + "Error";
            errorField.style.color = "red";
            errorField.style.fontSize = "12px";
            inputField.parentNode.appendChild(errorField);
        }
        
        errorField.textContent = message;
    }

    function clearError(inputId) {
        let errorField = document.getElementById(inputId + "Error");
        if (errorField) {
            errorField.textContent = "";
        }
    }

    function validateField(inputId, regex, errorMessage) {
        let value = document.getElementById(inputId).value.trim();
        if (value === "") {
            showError(inputId, "*Campo obligatorio");
            isValid = false;
        } else if (regex && !regex.test(value)) {
            showError(inputId, errorMessage);
            isValid = false;
        } else {
            clearError(inputId);
        }
    }

    validateField("nombre", /^[a-zA-ZÀ-ÿ\s]{2,}$/, "*Formato inválido");
    validateField("apellido", /^[a-zA-ZÀ-ÿ\s]{2,}$/, "*Formato inválido");
    validateField("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "*Correo electrónico inválido");
    validateField("telefono", /^[0-9]{7,10}$/, "*Número de teléfono inválido");
    validateField("direccion", null, "*Campo obligatorio");
    validateField("departamento", null, "*Campo obligatorio");
    validateField("ciudad", /^[a-zA-ZÀ-ÿ\s]{2,}$/, "*Formato inválido");
    validateField("datosAdicionales", null, "*Campo obligatorio");

    if (isValid) {
        Swal.fire({
            title: 'Éxito!',
            text: 'Formulario enviado correctamente',
            icon: 'success',
            confirmButtonText: '¡Genial!'
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, corrija los errores antes de continuar',
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
    }
});

// Función que actualiza el total en el checkout
function actualizarTotales() {
    // Asumiendo que tienes el total de los productos en una variable llamada `totalCarrito`
    const totalCarrito = obtenerTotalCarrito();  // Cambia esta función según la forma en que obtienes el total del carrito

    // Costo de envío predeterminado
    const costoEnvio = 15000;

    // Actualizar el total de productos en el checkout
    document.getElementById('total').textContent = `$${totalCarrito.toFixed(2)}`;

    // Actualizar el costo de envío
    document.getElementById('envio').textContent = `$${costoEnvio.toFixed(2)}`;

    // Calcular el total de la compra
    const totalCompra = totalCarrito + costoEnvio;
    document.getElementById('totalEnvio').textContent = `$${totalCompra.toFixed(2)}`;
}

// Simulación de obtener el total del carrito
function obtenerTotalCarrito() {
    let total = 0;
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];  // Cargar carrito del localStorage

    carrito.forEach(item => {
        total += item.precio * item.cantidad;  // Calcular total según precio y cantidad
    });

    return total;
}


// Llamar a la función para actualizar los totales al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarTotales();
});
