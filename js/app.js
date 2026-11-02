document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('formRegistro');

    formRegistro.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        let esValido = true;

        const camposObligatorios = ['inputName', 'inputLastname', 'inputUsername', 'inputBirthdate', 'inputEmail', 'inputPassword1', 'inputPassword2'];

        camposObligatorios.forEach(id => {
            const input = document.getElementById(id);
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                esValido = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        //  Validación del Correo Electrónico
        const inputEmail = document.getElementById('inputEmail');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (inputEmail.value.trim() && !regexEmail.test(inputEmail.value.trim())) {
            inputEmail.classList.add('is-invalid');
            esValido = false;
        }

        //  Validación de Edad Mínima 
        const inputBirthdate = document.getElementById('inputBirthdate');
        const feedbackBirthdate = inputBirthdate.nextElementSibling;

        if (inputBirthdate.value) {
            const fechaNacimiento = new Date(inputBirthdate.value);
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();

            if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                edad--;
            }

            if (edad < 13) {
                inputBirthdate.classList.add('is-invalid');
                if (feedbackBirthdate) feedbackBirthdate.textContent = "Debes tener al menos 13 años para registrarte.";
                esValido = false;
            } else {
                if (feedbackBirthdate) feedbackBirthdate.textContent = "Este campo es obligatorio.";
            }
        }

        // Validación de Contraseña 
        const inputPassword1 = document.getElementById('inputPassword1');
        const feedbackPass1 = inputPassword1.nextElementSibling;
        const passwordValida = /^(?=.*[A-Z])(?=.*\d).{6,18}$/;

        if (inputPassword1.value.trim()) {
            if (!passwordValida.test(inputPassword1.value)) {
                inputPassword1.classList.add('is-invalid');
                feedbackPass1.textContent = "Debe tener entre 6 y 18 caracteres, 1 mayúscula y 1 número.";
                esValido = false;
            } else {
                feedbackPass1.textContent = "Este campo es obligatorio.";
            }
        }

        // Validación de que ambas contraseñas sean iguales
        const inputPassword2 = document.getElementById('inputPassword2');
        const password2Feedback = document.getElementById('password2Feedback');

        if (inputPassword2.value.trim() && inputPassword1.value !== inputPassword2.value) {
            inputPassword2.classList.add('is-invalid');
            password2Feedback.textContent = "Las contraseñas no coinciden.";
            esValido = false;
        } else if (!inputPassword2.value.trim()) {
            password2Feedback.textContent = "Este campo es obligatorio.";
        }


        if (esValido) {
            alert('Registro completado.');
            limpiarFormulario();
        }
    });

    formRegistro.addEventListener('reset', (e) => {
        setTimeout(quitarClasesError, 10);
    });

    function limpiarFormulario() {
        formRegistro.reset();
        quitarClasesError();
    }

    function quitarClasesError() {
        const inputs = formRegistro.querySelectorAll('.form-control');
        inputs.forEach(input => input.classList.remove('is-invalid'));
    }
});