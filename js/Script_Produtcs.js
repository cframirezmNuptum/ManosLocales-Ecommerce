document.querySelectorAll('.btnVer').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = 'item.html';
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
    const añadirCarro = document.querySelector('.añadirCarro');
    
    if (añadirCarro) {
        añadirCarro.addEventListener('click', function() {
            // Recopilar datos del producto
            const colorElegido = document.querySelector('.colorIndividual.selected');
            const tallaElegida = document.querySelector('.selectorTalla').value;
            const cantidad = document.getElementById('cantidad').value;

            // Validar selecciones
            if (!colorElegido) {
                alert('Por favor seleccione un color');
                return;
            }
            if (!tallaElegida) {
                alert('Por favor seleccione una talla/tipo');
                return;
            }

            // Aquí va lo que se necesita para añadir al carrito
            alert('Producto añadido al carrito');
        });
    }
});