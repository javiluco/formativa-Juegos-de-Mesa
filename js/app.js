document.addEventListener('DOMContentLoaded', () => {
    inicializarDatosPredefinidos();
    actualizarNavbar();
});

// Usuarios de prueba predefinidos en el localStorage
function inicializarDatosPredefinidos() {
    if (!localStorage.getItem('usuariosDB')) {
        const usuariosIniciales = [
            { email: 'admin@gmail.com', password: 'Contrasena123.', rol: 'admin', nombre: 'Administrador' },
            { email: 'user@gmail.com', password: 'Contrasena123.', rol: 'user', nombre: 'Alex Rojas' }
        ];
        localStorage.setItem('usuariosDB', JSON.stringify(usuariosIniciales));
    }
}

//  Control de visibilidad del Navbar según roles (ADMIN - USER)
function actualizarNavbar() {
    const sesion = JSON.parse(localStorage.getItem('sesionActiva'));

    const itemsInvitado = document.querySelectorAll('.nav-invitado');
    const itemsUser = document.querySelectorAll('.nav-user');
    const itemsAdmin = document.querySelectorAll('.nav-admin');

    if (!sesion) {// Usuarios invitados
        itemsInvitado.forEach(el => el.classList.remove('d-none'));
        itemsUser.forEach(el => el.classList.add('d-none'));
        itemsAdmin.forEach(el => el.classList.add('d-none'));
    } else { //Usuarios que se autenticaron
        itemsInvitado.forEach(el => el.classList.add('d-none'));
        itemsUser.forEach(el => el.classList.remove('d-none'));

        // Se valida si es admin para mostrar la pagina de inventario
        if (sesion.rol === 'admin') {
            itemsAdmin.forEach(el => el.classList.remove('d-none'));
        } else {
            itemsAdmin.forEach(el => el.classList.add('d-none'));
        }
    }
}

// Cerrar Sesión
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('sesionActiva');
        window.location.href = 'index.html';
    });
}

const formulario = document.querySelector('#formulario-login');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputEmail = document.querySelector('#inputEmail');
    const inputPassword = document.querySelector('#inputPassword');
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

    inputPassword.classList.remove('is-invalid', 'mostrar-vacio', 'mostrar-formato');

    const passwordValida = /^(?=.*[A-Z])(?=.*\d).{6,18}$/;

    if (!inputPassword.value.trim()) {
        inputPassword.classList.add('is-invalid', 'mostrar-vacio');
        esValido = false;
    } else if (!passwordValida.test(inputPassword.value)) {
        inputPassword.classList.add('is-invalid', 'mostrar-formato');
        esValido = false;
    }

    if (esValido) {
        const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
        const usuarioEncontrado = usuariosDB.find(
            u => u.email === inputEmail.value && u.password === inputPassword.value
        );

        if (usuarioEncontrado) {
            // Guardar sesión activa en localStorage
            const sesion = {
                email: usuarioEncontrado.email,
                nombre: usuarioEncontrado.nombre,
                rol: usuarioEncontrado.rol
            };
            localStorage.setItem('sesionActiva', JSON.stringify(sesion));

            // Redirigir según el rol
            if (usuarioEncontrado.rol === 'admin') {
                window.location.href = 'inventario.html';
            } else {
                window.location.href = 'perfil.html';
            }
        } else {
            alert('Usuario no registrado');
        }



    }
});
