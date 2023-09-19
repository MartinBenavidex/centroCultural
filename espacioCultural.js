const d = document;
const cuerpo = d.body;
const cabeza = d.head;
const titulo = d.createElement('title');
const cabecera = d.getElementById('header');
const banner = titulo.innerText = 'El Espacio Cultural';
cabeza.appendChild(titulo);

const fotter = d.querySelector('#p-footer');
const anio = new Date().getFullYear();
fotter.innerHTML = `<a href="https://www.instagram.com/centroculturalelespaciook/" target="_blank">&copy; ${banner} | ${anio}</a>`;

const eventosCulturales = JSON.parse(localStorage.getItem('eventos')) || [];

const listaEventos = d.getElementById("listaEventos");
const eventoSeleccionado = d.getElementById("eventoSeleccionado");
const totalCarritoElement = d.getElementById("totalCarrito");
const generarEventoBtn = d.getElementById("generarEventoBtn");
const nombreInput = d.getElementById("nombre");
const fechaInput = d.getElementById("fecha");
const descripcionInput = d.getElementById("descripcion");

generarEventoBtn.addEventListener("click", agregarEvento);

function generarEventoFicticio() {
    const nombreEvento = faker.company.companyName();
    const fechaEvento = faker.date.future();
    const descripcionEvento = faker.lorem.sentence();

    return {
        nombre: nombreEvento,
        fecha: fechaEvento,
        descripcion: descripcionEvento,
    };
}

function agregarEvento() {
    const evento = generarEventoFicticio();
    eventosCulturales.push(evento);
    localStorage.setItem('eventos', JSON.stringify(eventosCulturales));
    mostrarEventos();
    actualizarEventosDropdown();
}

function mostrarEventos() {
    listaEventos.innerHTML = "";

    eventosCulturales.forEach((evento, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${evento.nombre} - ${evento.fecha}`;
        
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => {
            editarEvento(index);
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
            eliminarEvento(index);
        });

        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);
        listaEventos.appendChild(li);
    });
}
function editarEvento(index) {
    const evento = eventosCulturales[index];
    const nuevoNombre = prompt("Editar nombre:", evento.nombre);
    const nuevaFecha = prompt("Editar fecha:", evento.fecha);
    const nuevaDescripcion = prompt("Editar descripción:", evento.descripcion);

    if (nuevoNombre !== null && nuevaFecha !== null && nuevaDescripcion !== null) {
        evento.nombre = nuevoNombre;
        evento.fecha = nuevaFecha;
        evento.descripcion = nuevaDescripcion;

        localStorage.setItem('eventos', JSON.stringify(eventosCulturales));
        mostrarEventos();
        actualizarEventosDropdown();
    }
}

function eliminarEvento(index) {
    eventosCulturales.splice(index, 1);
    localStorage.setItem('eventos', JSON.stringify(eventosCulturales));
    mostrarEventos();
    actualizarEventosDropdown();
}

function actualizarEventosDropdown() {
    eventoSeleccionado.innerHTML = "";

    eventosCulturales.forEach((evento, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = evento.nombre;
        eventoSeleccionado.appendChild(option);
    });
}

function agregarAlCarrito() {
    const eventoSeleccionadoIndex = eventoSeleccionado.value;

    if (eventoSeleccionadoIndex !== "") {
        totalCarritoElement.textContent = `${parseInt(totalCarritoElement.textContent) + 1000}`;
        Swal.fire({
            icon: 'success',
            title: 'Entrada sumada al carrito',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function abonarReservas() {
    if (totalCarritoElement.textContent > 0) {
        Swal.fire({
            title: 'Abonar Reservas',
            text: `El total a abonar es: ${totalCarritoElement.textContent} pesos argentinos`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Reservas abonadas correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });

                totalCarritoElement.textContent = '0';
            }
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'El carrito está vacío',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function init() {
    mostrarEventos();
    actualizarEventosDropdown();
}

window.addEventListener('load', init);
