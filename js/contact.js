// Función para validar el formulario antes de enviarlo
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío para validación

    let isValid = true;

    // Validación del nombre
    const name = document.getElementById('name').value;
    if (name.trim() === '') {
        alert('Por favor, ingresa tu nombre');
        isValid = false;
    }

    // Validación del teléfono (formato)
    const phone = document.getElementById('phone').value;
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('El teléfono debe tener 10 dígitos');
        isValid = false;
    }

    // Validación del correo
    const email = document.getElementById('email').value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido');
        isValid = false;
    }

    // Validación del mensaje
    const message = document.getElementById('message').value;
    if (message.trim() === '') {
        alert('Por favor, ingresa tu mensaje');
        isValid = false;
    }

    // Si todas las validaciones pasan, enviamos el formulario
    if (isValid) {
        this.submit();
    }
});


// Archivo: js/contact.js

document.getElementById("hamburger").addEventListener("click", function() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");
});
