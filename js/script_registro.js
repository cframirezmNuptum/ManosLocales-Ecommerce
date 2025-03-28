document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    });
});

class AdministradorAlmacenamiento {
    static obtenerUsuarios() {
        return JSON.parse(localStorage.getItem('usuarios') || '[]');
    }

    static guardarUsuario(usuario) {
        const usuarios = this.obtenerUsuarios();
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    static encontrarUsuario(correo) {
        return this.obtenerUsuarios().some(usuario => usuario.email === correo);
    }
}

const entradasFormulario = {
    nombre: {
        elemento: document.getElementById('nombre'),
        reglas: { requerido: true, longitudMinima: 2, longitudMaxima: 50, patron: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/ },
        mensajesError: { requerido: '*El nombre es requerido', longitudMinima: '*Mínimo 2 caracteres', longitudMaxima: '*Máximo 50 caracteres', patron: '*Solo letras y espacios' },
        elementoError: document.querySelector('.errorNombre')
    },
    apellido: {
        elemento: document.getElementById('apellido'),
        reglas: { requerido: true, longitudMinima: 2, longitudMaxima: 50, patron: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/ },
        mensajesError: { requerido: '*El apellido es requerido', longitudMinima: '*Mínimo 2 caracteres', longitudMaxima: '*Máximo 50 caracteres', patron: '*Solo letras y espacios' },
        elementoError: document.querySelector('.errorApellido')
    },
    telefono: {
        elemento: document.getElementById('telefono'),
        reglas: { requerido: true, patron: /^\d{10}$/ },
        mensajesError: { requerido: '*El teléfono es requerido', patron: '*Debe tener 10 dígitos' },
        elementoError: document.querySelector('.errorTelefono')
    },
    email: {
        elemento: document.getElementById('email'),
        reglas: { requerido: true, patron: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        mensajesError: { requerido: '*Correo requerido', patron: '*Formato inválido' },
        elementoError: document.querySelector('.errorEmail')
    },
    contraseña: {
        elemento: document.getElementById('contraseña'),
        reglas: { requerido: true, longitudMinima: 8 },
        mensajesError: { requerido: '*Contraseña requerida', longitudMinima: '*Mínimo 8 caracteres' },
        elementoError: document.querySelector('.errorContraseña')
    },
    confirmarContraseña: {
        elemento: document.getElementById('confirmarContraseña'),
        reglas: { requerido: true, coincideCon: 'contraseña' },
        mensajesError: { requerido: '*Requerido', coincideCon: '*Las contraseñas no coinciden' },
        elementoError: document.querySelector('.errorConfirmarContraseña')
    }
};

if (document.getElementById('formularioRegist')) {
    const formularioRegistro = document.getElementById('formularioRegist');
    formularioRegistro.setAttribute('novalidate', true);

    Object.keys(entradasFormulario).forEach(clave => {
        const input = entradasFormulario[clave].elemento;
        input.addEventListener('input', () => validarCampo(clave));
        input.addEventListener('blur', () => validarCampo(clave));
    });

    function validarCampo(clave) {
        const { elemento, reglas, mensajesError, elementoError } = entradasFormulario[clave];
        const valor = elemento.value.trim();
        let error = '';

        if (reglas.requerido && !valor) error = mensajesError.requerido;
        else if (reglas.longitudMinima && valor.length < reglas.longitudMinima) error = mensajesError.longitudMinima;
        else if (reglas.longitudMaxima && valor.length > reglas.longitudMaxima) error = mensajesError.longitudMaxima;
        else if (reglas.patron && !reglas.patron.test(valor)) error = mensajesError.patron;
        else if (reglas.coincideCon && valor !== document.getElementById(reglas.coincideCon).value) error = mensajesError.coincideCon;

        elementoError.textContent = error;
        return error === '';
    }

    formularioRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();
        let errores = false;

        Object.keys(entradasFormulario).forEach(clave => {
            if (!validarCampo(clave)) errores = true;
        });

        if (errores) {
            mostrarModalError('Completa todos los campos correctamente.');
            return;
        }

        const datosUsuario = {
            nombre: entradasFormulario.nombre.elemento.value,
            apellido: entradasFormulario.apellido.elemento.value,
            telefono: Number(entradasFormulario.telefono.elemento.value), // Convertir a número
            email: entradasFormulario.email.elemento.value,
            contrasena: entradasFormulario.contraseña.elemento.value // Cambia "contraseña" por "contrasena"
        };
        
        
        

        if (AdministradorAlmacenamiento.encontrarUsuario(datosUsuario.email)) {
            entradasFormulario.email.elementoError.textContent = 'Este correo ya está registrado';
            return;
        }

        try {
            const respuesta = await fetch('http://https://main.dxyu45fepegt2.amplifyapp.com:8080/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosUsuario)
            });

            if (!respuesta.ok) throw new Error('Error en el registro. Verifica los datos.');

            AdministradorAlmacenamiento.guardarUsuario(datosUsuario);

            const overlayExito = document.createElement('div');
            overlayExito.className = 'overlayMensajeExito';
            overlayExito.innerHTML = `<div class="mensajeExito"><div class="iconoExito">✓</div><p>¡Registro exitoso!</p></div>`;
            document.body.appendChild(overlayExito);
            requestAnimationFrame(() => overlayExito.classList.add('active'));

            setTimeout(() => {
                overlayExito.classList.add('fade-out');
                setTimeout(() => window.location.href = 'inicio-sesion.html', 500);
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            mostrarModalError(error.message);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const formularioLogin = document.getElementById('formularioLogin');

    if (formularioLogin) {
        formularioLogin.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('emailLogin').value.trim();
            const contrasena = document.getElementById('contrasenaLogin').value.trim();
            const errorEmail = document.querySelector('.errorEmailLogin');
            const errorContrasena = document.querySelector('.errorContrasenaLogin');

            // Limpiar mensajes previos
            errorEmail.textContent = '';
            errorContrasena.textContent = '';

            if (!email) {
                errorEmail.textContent = '*Correo requerido';
                return;
            }
            if (!contrasena) {
                errorContrasena.textContent = '*Contraseña requerida';
                return;
            }

            const datosUsuario = { email, contrasena };

            try {
                const respuesta = await fetch('http://https://main.dxyu45fepegt2.amplifyapp.com:8080/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datosUsuario)
                });

                if (!respuesta.ok) {
                    throw new Error('Credenciales inválidas');
                }

                const data = await respuesta.json(); // Convertir la respuesta a JSON
                sessionStorage.setItem("token", data.token);

                // Mostrar mensaje de éxito
                const overlayExito = document.createElement('div');
                overlayExito.className = 'overlayMensajeExito';
                overlayExito.innerHTML = `<div class="mensajeExito"><div class="iconoExito">✓</div><p>¡Inicio de sesión exitoso!</p></div>`;
                document.body.appendChild(overlayExito);
                requestAnimationFrame(() => overlayExito.classList.add('active'));

                setTimeout(() => {
                    overlayExito.classList.add('fade-out');
                    setTimeout(() => window.location.href = 'pagina-principal.html', 500);
                }, 2000);

            } catch (error) {
                console.error('Error:', error);
                errorContrasena.textContent = error.message;
            }
        });
    }
});

