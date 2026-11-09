
document.addEventListener('DOMContentLoaded', () => {
    const juegosIniciales = [
        { id: 1, nombre: 'Dominio de los Elementos', categoria: 'estrategia', precio: 20000, stock: 8, imagen: 'img/estrategia/dominio.png' },
        { id: 2, nombre: 'Caza Bombas', categoria: 'estrategia', precio: 45000, stock: 3, imagen: 'img/estrategia/caza.png' },
        { id: 3, nombre: 'Criaturas De Las Sombras', categoria: 'estrategia', precio: 35000, stock: 0, imagen: 'img/estrategia/criaturas.png' },
        { id: 4, nombre: 'Smart 10 - Familiar', categoria: 'familiares', precio: 20000, stock: 12, imagen: 'img/familiar/smart.png' },
        { id: 5, nombre: 'Got Five', categoria: 'familiares', precio: 30000, stock: 6, imagen: 'img/familiar/Got Five.png' },
        { id: 6, nombre: 'What Do You Meme? Edición Familiar', categoria: 'familiares', precio: 10000, stock: 15, imagen: 'img/familiar/meme.png' },
        { id: 7, nombre: 'UNO Clásico', categoria: 'cartas', precio: 6000, stock: 30, imagen: 'img/cartas2.png' },
        { id: 8, nombre: 'Flip 7', categoria: 'cartas', precio: 17000, stock: 4, imagen: 'img/cartas/flip7.png' },
        { id: 9, nombre: 'Pokemon TCG - Enhanced 2-Pack Blister Q4 2026', categoria: 'cartas', precio: 15000, stock: 20, imagen: 'img/cartas/pokemon.png' },
        { id: 10, nombre: 'La Feria De Las Pulgas De Titirilquen', categoria: 'party', precio: 20000, stock: 7, imagen: 'img/party/feria.png' },
        { id: 11, nombre: 'Telestrations', categoria: 'party', precio: 30000, stock: 2, imagen: 'img/party2.png' },
        { id: 12, nombre: 'Mal Trago', categoria: 'party', precio: 12000, stock: 10, imagen: 'img/party/mal-trago.png' }
    ];

    // const juegosIniciales = [];


    const formatoPrecio = valor => '$' + valor.toLocaleString('es-CL');
    function contFoto(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    const tablaJuegos = document.getElementById('tablaJuegos');


    function mostrarJuegos() {
        if (juegosIniciales.length == 0) {
            return;
        }

        tablaJuegos.innerHTML = juegosIniciales.map(juego => `
            <tr>
                <th scope="row">${juego.id}</th>
                <td>
                  <div class="inventario-juego">
                        ${juego.imagen
                ? `<img src="${contFoto(juego.imagen)}" alt="" class="compra-img">`
                : '<span class="compra-img inventario-sin-img" aria-hidden="true">🎲</span>'}
                        <span>${contFoto(juego.nombre)}</span>
                    </div>
                 </td>
                <td> ${juego.categoria}</td>
                <td class="inventario-precio">${formatoPrecio(juego.precio)}</td>
                <td>${juego.stock}</td>
                <td>
                    <div class="inventario-acciones">
                        <button type="button" class="inventario-btn" data-editar="${juego.id}">Editar</button>
                        <button type="button" class="inventario-btn peligro" data-eliminar="${juego.id}">Eliminar</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }


    mostrarJuegos();

    function actualizarResumen() {
        document.getElementById('stateJuegos').textContent = juegosIniciales.length;
        document.getElementById('stateUnidades').textContent =
            juegosIniciales.reduce((t, j) => t + j.stock, 0);
        document.getElementById('stateValor').textContent =
            formatoPrecio(juegosIniciales.reduce((t, j) => t + j.precio * j.stock, 0));
        document.getElementById('stateSinStock').textContent =
            juegosIniciales.filter(j => j.stock === 0).length;
    }
    actualizarResumen();
})