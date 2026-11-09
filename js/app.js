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

const formLogin = document.querySelector('form');

if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('inputEmail1').value;
        const passwordInput = document.getElementById('inputPassword1').value;

        const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];

        const usuarioEncontrado = usuariosDB.find(
            u => u.email === emailInput && u.password === passwordInput
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
            alert('Credenciales incorrectas');
        }
    });
}