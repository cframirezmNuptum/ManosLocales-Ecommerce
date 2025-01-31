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
        alert("Formulario enviado correctamente");
    } else {
        alert("Por favor, corrija los errores antes de continuar");
    }
});
