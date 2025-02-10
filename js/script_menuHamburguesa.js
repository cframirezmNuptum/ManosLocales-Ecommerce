/* JavaScript de la animacion menu hamburguesa*/
const menuHamburguesa = document.querySelector('.menu_hamburguesa');

menuHamburguesa.addEventListener('click', function(){
    menuHamburguesa.classList.toggle('active');
})

/*JavaScript que abre el menu Hamburguesa*/
const accionador = document.querySelector('.menu_hamburguesa');
const contenedorNav = document.querySelector('.contenedor_nav');

accionador.addEventListener('click', function() {
    contenedorNav.classList.toggle('spreed');
});