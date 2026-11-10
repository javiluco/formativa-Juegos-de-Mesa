
document.addEventListener('DOMContentLoaded', () => {
    const usuarios = [
        { id: 1, nombre: 'Alex', apellido: 'Rojas', fechaNacimiento: '2005-03-14', usuario: 'jugador123', correo: 'jugador123@gmail.com', direccion: 'Av. Pedro Aguirre Cerda 4521, Cerrillos' },
        { id: 2, nombre: 'Matías', apellido: 'González', fechaNacimiento: '1998-11-02', usuario: 'matias.gonzalez', correo: 'matias.gonzalez@hotmail.com', direccion: 'Los Olmos 1280, Maipú' },
        { id: 3, nombre: 'Valentina', apellido: 'Muñoz', fechaNacimiento: '2010-07-25', usuario: 'vale.munoz', correo: 'valentina.munoz@outlook.com', direccion: 'Av. Providencia 2345, Providencia' },
        { id: 4, nombre: 'Sebastián', apellido: 'Rojas', fechaNacimiento: '1989-12-09', usuario: 'seba.rojas', correo: 'sebastian.rojas@gmail.com', direccion: 'Calle Santa Rosa 987, Santiago Centro' },
        { id: 5, nombre: 'Francisca', apellido: 'Díaz', fechaNacimiento: '2002-05-30', usuario: 'fran.diaz', correo: 'francisca.diaz@yahoo.com', direccion: 'Pasaje Los Aromos 342, La Florida' },
    ];

    function calcularEdad(fechaNacimiento) {
        const [anio, mes, dia] = fechaNacimiento.split('-').map(Number);
        const hoy = new Date();
        let edad = hoy.getFullYear() - anio;
        const yaCumplio = (hoy.getMonth() + 1 > mes) || (hoy.getMonth() + 1 === mes && hoy.getDate() >= dia);
        if (!yaCumplio) edad--;
        return edad;
    }


    const tablaClientes = document.getElementById('tablaClientes');

    function mostrarClientes() {
        if (usuarios.length == 0) {
            return;
        }

        tablaClientes.innerHTML = usuarios.map(u => `
            <tr>
                <th scope="row">${u.id}</th>
                <td>
                    ${u.nombre} ${u.apellido}
                </td>
                <td> ${calcularEdad(u.fechaNacimiento)} </td>
                <td> ${u.usuario} </td>
                <td >${u.correo}</td>
                <td>${u.direccion}</td>
                <td>
                    <div class="inventario-acciones">
                        <button type="button" class="inventario-btn" data-editar="${u.id}">Editar</button>
                        <button type="button" class="inventario-btn peligro" data-eliminar="${u.id}">Eliminar</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }


    mostrarClientes();

});