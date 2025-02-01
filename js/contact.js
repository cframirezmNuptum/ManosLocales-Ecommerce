document.getElementById("btn-destacado").addEventListener("click", function () {
    let isValid = true;

    function showError(inputId, message) {
        let inputField = document.getElementById(inputId);
        let errorField = document.getElementById(inputId + "Error");

        if (!errorField) {
            errorField = document.createElement("div");
            errorField.id = inputId + "Error";
            errorField.className = "error-message";
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

    validateField("name", /^[a-zA-ZÀ-ÿ\s]{2,}$/, "*Formato inválido");
    validateField("phone", /^[0-9]{7,10}$/, "*Número de teléfono inválido");
    validateField("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "*Correo electrónico inválido");
    validateField("message", null, "*Campo obligatorio");

    if (isValid) {
        // Guardar el mensaje en localStorage
        localStorage.setItem("formMessage", document.getElementById("message").value);
        Swal.fire({
            title: 'Éxito!',
            text: 'Formulario enviado correctamente',
            icon: 'success',
            confirmButtonText: '¡Genial!'
        });
        document.getElementById("contact-form").submit();
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, complete todos los campos correctamente antes de enviar',
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
    }
});
