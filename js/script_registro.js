// Transiciones entre páginas!!

document.addEventListener('DOMContentLoaded', () => {

    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

//---------------------------------------------------------------------------------REGISTRO----------------------------------------------------------------------------------------------//
// Local Storage

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
        const usuarios = this.obtenerUsuarios();
        return usuarios.some(usuario => usuario.email === correo);
    }

    // Para obtener usuarios por correo
    
    static obtenerUsuarioPorCorreo(correo) {
        const usuarios = this.obtenerUsuarios();
        return usuarios.find(usuario => usuario.email === correo);
    }
}

// Validaciones del formulario

const entradasFormulario = {
    nombre: {
        elemento: document.getElementById('nombre'),
        reglas: {
            requerido: true,
            longitudMinima: 2,
            longitudMaxima: 50,
            patron: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/
        },
        mensajesError: {
            requerido: '*El nombre es requerido',
            longitudMinima: '*El nombre debe tener al menos 2 caracteres',
            longitudMaxima: '*El nombre no puede exceder 50 caracteres',
            patron: '*El nombre solo puede contener letras y espacios'
        },
        elementoError: document.querySelector('.errorNombre')
    },
    apellido: {
        elemento: document.getElementById('apellido'),
        reglas: {
            requerido: true,
            longitudMinima: 2,
            longitudMaxima: 50,
            patron: /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/
        },
        mensajesError: {
            requerido: '*El apellido es requerido',
            longitudMinima: '*El apellido debe tener al menos 2 caracteres',
            longitudMaxima: '*El apellido no puede exceder 50 caracteres',
            patron: '*El apellido solo puede contener letras y espacios'
        },
        elementoError: document.querySelector('.errorApellido')
    },
    telefono: {
        elemento: document.getElementById('telefono'),
        reglas: {
            requerido: true,
            patron: /^\d{10}$/,
            soloNumeros: true
        },
        mensajesError: {
            requerido: '*El teléfono es requerido',
            patron: '*El teléfono debe tener exactamente 10 dígitos',
            soloNumeros: '*No puedes ingresar otros caracteres en este campo'
        },
        elementoError: document.querySelector('.errorTelefono')
    },
    email: {
        elemento: document.getElementById('email'),
        reglas: {
            requerido: true,
            patron: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        mensajesError: {
            requerido: '*El correo electrónico es requerido',
            patron: '*Por favor, ingresa un correo electrónico válido'
        },
        elementoError: document.querySelector('.errorEmail')
    },
    contraseña: {
        elemento: document.getElementById('contraseña'),
        reglas: {
            requerido: true,
            longitudMinima: 8
        },
        mensajesError: {
            requerido: '*La contraseña es requerida',
            longitudMinima: '*La contraseña debe tener al menos 8 caracteres'
        },
        elementoError: document.querySelector('.errorContraseña')
    },
    confirmarContraseña: {
        elemento: document.getElementById('confirmarContraseña'),
        reglas: {
            requerido: true,
            coincideCon: 'contraseña'
        },
        mensajesError: {
            requerido: '*La confirmación de contraseña es requerida',
            coincideCon: '*Las contraseñas deben ser iguales'
        },
        elementoError: document.querySelector('.errorConfirmarContraseña')
    }
};

// Manejo del formulario de registro ---->> Se unen validaciones y almacenamiento en Local Storage

if (document.getElementById('formularioRegist')) {
    const formularioRegistro = document.getElementById('formularioRegist');
    formularioRegistro.setAttribute('novalidate', true); // Prevenir la validación nativa del navegador

    Object.keys(entradasFormulario).forEach(clave => {
        const input = entradasFormulario[clave].elemento;
        
        input.addEventListener('invalid', (e) => e.preventDefault());
        
        input.addEventListener('input', () => {
            const valor = input.value;
            validarCampo(clave, valor, entradasFormulario[clave].reglas, entradasFormulario[clave].mensajesError, entradasFormulario[clave].elementoError);
        });

        input.addEventListener('blur', () => {
            const valor = input.value;
            validarCampo(clave, valor, entradasFormulario[clave].reglas, entradasFormulario[clave].mensajesError, entradasFormulario[clave].elementoError);
        });
    });

    function validarCampo(clave, valor, reglas, mensajesError, elementoError) {
      if (reglas.soloNumeros && clave === 'telefono' && !/^\d*$/.test(valor) && valor.trim().length > 0) { 
          elementoError.textContent = mensajesError.soloNumeros; 
          return false; 
      } else if (reglas.requerido && valor.trim().length === 0) { 
          elementoError.textContent = mensajesError.requerido; 
          return false; 
      } else if (reglas.longitudMinima && valor.length < reglas.longitudMinima && valor.trim().length > 0) { 
          elementoError.textContent = mensajesError.longitudMinima; 
          return false; 
      } else if (reglas.longitudMaxima && valor.length > reglas.longitudMaxima) { 
          elementoError.textContent = mensajesError.longitudMaxima; 
          return false; 
      } else if (reglas.patron && !reglas.patron.test(valor) && valor.trim().length > 0) { 
          elementoError.textContent = mensajesError.patron; 
          return false; 
      } else if (reglas.coincideCon && clave === 'confirmarContraseña' && valor !== document.getElementById('contraseña').value && valor.trim().length > 0) { 
          elementoError.textContent = mensajesError.coincideCon; 
          return false; 
      } else if (reglas.requerido && valor.trim().length === 0 && clave === 'confirmarContraseña') { 
          elementoError.textContent = mensajesError.requerido; 
          return false; 
      } else { 
          elementoError.textContent = ''; 
          return true; 
      } 
   }

   formularioRegistro.addEventListener('submit', async (e) => { 
       e.preventDefault(); 
       let errores = false;

       // Valida todos los campos

       Object.keys(entradasFormulario).forEach(clave => { 
           const input = entradasFormulario[clave].elemento; 
           const reglas = entradasFormulario[clave].reglas; 
           const mensajesError = entradasFormulario[clave].mensajesError; 
           const elementoError = entradasFormulario[clave].elementoError;

           if (!validarCampo(clave, input.value, reglas, mensajesError, elementoError)) { 
               errores = true; 
           } 
       });

       function mostrarModalError(mensaje, tipo = 'error') {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modalOverlay';
        
        const contenidoModal = `
            <div class="contenidoModalError">
                <div class="iconoModalError">${tipo === 'error' ? '⚠️' : '+'}</div>
                <p class="textoModalError">${mensaje}</p>
                <button id="cerrarModal">X</button>
            </div>
        `;
        
        modalOverlay.innerHTML = contenidoModal;
        document.body.appendChild(modalOverlay);
        requestAnimationFrame(() => {
            modalOverlay.classList.add('active');
        });
    
        const botonCerrar = modalOverlay.querySelector('#cerrarModal');
        botonCerrar.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            modalOverlay.classList.add('fade-out');
            setTimeout(() => {
                modalOverlay.remove();
            }, 300);
        });
    }

       if (errores) { 
        mostrarModalError('¡Estás muy cerca de completar el registro! Por favor, rellena los campos vacíos.')
        return; 
       }

       const datosUsuario = { 
           nombre: entradasFormulario.nombre.elemento.value, 
           apellido: entradasFormulario.apellido.elemento.value, 
           telefono: entradasFormulario.telefono.elemento.value, 
           email: entradasFormulario.email.elemento.value, 
           contraseña: entradasFormulario.contraseña.elemento.value 
       };

       // Verificar email existente

       if (AdministradorAlmacenamiento.encontrarUsuario(datosUsuario.email)) { 
           entradasFormulario.email.elementoError.textContent = 'Este correo electrónico ya se encuentra registrado'; 
           entradasFormulario.email.elemento.focus(); 
           return; 
       }

       // Guardar usuario

       AdministradorAlmacenamiento.guardarUsuario(datosUsuario);

       // Crear y mostrar el mensaje de éxito

       const overlayExito = document.createElement('div');  
       overlayExito.className = 'overlayMensajeExito';
       
       const mensajeExito = `
           <div class="mensajeExito">
               <div class="iconoExito">✓</div>
               <p class="textoExito">¡Tu registro ha sido exitoso!</p>
           </div>
       `;
       
       overlayExito.innerHTML = mensajeExito;
       document.body.appendChild(overlayExito);
       
       // Activar animación de entrada

       requestAnimationFrame(() => { overlayExito.classList.add('active'); });

       // Animación de salida y redirección

       setTimeout(() => {  
           overlayExito.classList.add('fade-out');  
           setTimeout(() => { window.location.href = 'inicio-sesion.html'; }, 500);  
       }, 2000);  
   });
}

//---------------------------------------------------------------------------------INICIO DE SESIÓN----------------------------------------------------------------------------------------------//
// Manejo del formulario de inicio de sesión

if (document.getElementById('contFormularioIS')) {
    const formularioInicioSesion = document.getElementById('contFormularioIS');
    formularioInicioSesion.setAttribute('novalidate', true);

    const entradaEmail = document.getElementById('email');
    const entradaContraseña = document.getElementById('contraseña');
    const spanErrorEmail = document.querySelector('.errorEmail');
    const spanErrorContraseña = document.querySelector('.errorContraseña');

    function validarEmail(valor) {
        if (!valor.trim()) {
            spanErrorEmail.textContent = '*El correo electrónico es requerido';
            entradaEmail.classList.add('input-error');
            return false;
        }
        
        const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!patronEmail.test(valor)) {
            spanErrorEmail.textContent = '*Por favor, ingresa un correo electrónico válido';
            entradaEmail.classList.add('input-error');
            return false;
        }
        
        spanErrorEmail.textContent = '';
        entradaEmail.classList.remove('input-error');
        return true;
    }

    function validarContraseña(valor) {
        if (!valor.trim()) {
            spanErrorContraseña.textContent = '*La contraseña es requerida';
            entradaContraseña.classList.add('input-error');
            return false;
        }
        
        if (valor.length < 8) {
            spanErrorContraseña.textContent = '*La contraseña debe tener al menos 8 caracteres';
            entradaContraseña.classList.add('input-error');
            return false;
        }
        
        spanErrorContraseña.textContent = '';
        entradaContraseña.classList.remove('input-error');
        return true;
    }

    // Validación en tiempo real de los campos

    entradaEmail.addEventListener('input', () => validarEmail(entradaEmail.value));
    entradaContraseña.addEventListener('input', () => validarContraseña(entradaContraseña.value));
    
    entradaEmail.addEventListener('blur', () => validarEmail(entradaEmail.value));
    entradaContraseña.addEventListener('blur', () => validarContraseña(entradaContraseña.value));

    formularioInicioSesion.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validación de cada input

        const emailValido = validarEmail(entradaEmail.value);
        const contraseñaValida = validarContraseña(entradaContraseña.value);

        // Detiene la acción si algún input es inválido 

        if (!emailValido || !contraseñaValida) {
            return;
        }

        // Revisa las credenciales de inicio de sesión

        const usuarioRegistrado = AdministradorAlmacenamiento.obtenerUsuarioPorCorreo(entradaEmail.value);

        if (!usuarioRegistrado || usuarioRegistrado.contraseña !== entradaContraseña.value) {
            const divError = document.createElement('div');
            divError.className = 'errorVacio';
            divError.textContent = 'Correo o contraseña incorrectos';
            formularioInicioSesion.insertBefore(divError, formularioInicioSesion.firstChild);

            setTimeout(() => {
                divError.remove();
            }, 3000);
            return;
        }

        // Inicio de sesión exitoso!!!

        const overlayExito = document.createElement('div');
        overlayExito.className = 'overlayMensajeExito';
        
        const mensajeExito = `
            <div class="mensajeExito">
                <div class="iconoExito">✓</div>
                <p class="textoExito">¡Inicio de sesión exitoso!</p>
            </div>
        `;
        
        overlayExito.innerHTML = mensajeExito;
        document.body.appendChild(overlayExito);
        
        requestAnimationFrame(() => {
            overlayExito.classList.add('active');
        });

        setTimeout(() => {
            overlayExito.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 500);
        }, 2000);
    });
}
