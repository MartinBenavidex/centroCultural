const d = document 
const cuerpo = d.body
const cabeza = d.head
const titulo = d.createElement('title')
const cabecera = d.getElementById('header')
const banner = titulo.innerText = 'El Espacio Cultural'
cabeza.appendChild(titulo)
const fotter = d.querySelector('#p-footer');
const anio = new Date().getFullYear();
fotter.innerHTML = `<a href="https://www.instagram.com/centroculturalelespaciook/"_blank">&copy | ${banner} | ${anio}</a>`


const eventosCulturales = JSON.parse(localStorage.getItem('eventos')) || [];

        function agregarEvento() {
            const nombre = document.getElementById("nombre").value;
            const fecha = document.getElementById("fecha").value;
            const descripcion = document.getElementById("descripcion").value;

            const evento = {
                nombre,
                fecha,
                descripcion,
            };

            eventosCulturales.push(evento);
            localStorage.setItem('eventos', JSON.stringify(eventosCulturales));

            alert(`¡El evento "${nombre}" ha sido agregado correctamente!`);
        }

        function mostrarEventos() {
            const listaEventos = document.getElementById("listaEventos");
            listaEventos.innerHTML = "";

            eventosCulturales.forEach((evento, index) => {
                const li = document.createElement("li");
                li.textContent = `${index + 1}. ${evento.nombre} - ${evento.fecha}`;
                listaEventos.appendChild(li);
            });
        }

        mostrarEventos();

function actualizarEventosDropdown() {
    const eventoSeleccionado = document.getElementById("eventoSeleccionado");
    eventoSeleccionado.innerHTML = "";

    eventosCulturales.forEach((evento, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = evento.nombre;
        eventoSeleccionado.appendChild(option);
    });
}

function agregarAlCarrito() {
    const eventoSeleccionado = document.getElementById("eventoSeleccionado").value;
    const totalCarritoElement = document.getElementById("totalCarrito");

    if (eventoSeleccionado !== "") {
        totalCarrito += 1000;
        totalCarritoElement.textContent = totalCarrito;
        Swal.fire({
            icon: 'success',
            title: 'Entrada sumada al carrito',
            showConfirmButton: false,
            timer: 1500
        });
    }
}
function abonarReservas() {
    if (totalCarrito > 0) {
        Swal.fire({
            title: 'Abonar Reservas',
            text: `El total a abonar es: ${totalCarrito} pesos argentinos`,
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

                totalCarrito = 0;
                document.getElementById("totalCarrito").textContent = totalCarrito;
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
let totalCarrito = 0;
