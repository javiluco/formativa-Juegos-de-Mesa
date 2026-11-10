document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('#formulario-recuperacion');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const inputEmail = document.querySelector('#inputEmail');
        let esValido = true;

        inputEmail.classList.remove('is-invalid', 'mostrar-vacio', 'mostrar-formato');

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!inputEmail.value.trim()) {
            inputEmail.classList.add('is-invalid', 'mostrar-vacio');
            esValido = false;
        } else if (!regexEmail.test(inputEmail.value.trim())) {
            inputEmail.classList.add('is-invalid', 'mostrar-formato');
            esValido = false;
        }

        if(esValido){
            alert('Se ha enviado un correo con los pasos a seguir!');
            inputEmail.value='';
        }

    });


});