
document.addEventListener('DOMContentLoaded', function() {
    const totalCarrito = parseFloat(localStorage.getItem('totalCarrito'));
    const costoEnvio = parseFloat(localStorage.getItem('costoEnvio'));
    document.getElementById('total').textContent = `$${formatearPrecio(totalCarrito)}`;
    document.getElementById('envio').textContent = `$${formatearPrecio(costoEnvio)}`;
    document.getElementById('totalEnvio').textContent = `$${formatearPrecio(totalCarrito + costoEnvio)}`;
    
});

// Inicio validaciones y alertas 

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

// Actualizar total en el checkout

function actualizarTotales() {
    
    const totalCarrito = obtenerTotalCarrito(); 
    const costoEnvio = 15000;
    
    document.getElementById('total').textContent = `$${formatearPrecio(totalCarrito)}`;
    document.getElementById('envio').textContent = `$${formatearPrecio(costoEnvio)}`;
    const totalCompra = totalCarrito + costoEnvio;
    document.getElementById('totalEnvio').textContent = `$${formatearPrecio(totalCompra)}`;
}

function formatearPrecio(precio) {
    return precio.toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}

// Simulación de obtener el total del carrito

function obtenerTotalCarrito() {
    let total = 0;
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });

    return total;
}


// Llamada a la función en el DOM 

document.addEventListener('DOMContentLoaded', function() {
    actualizarTotales();
});
