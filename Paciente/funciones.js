// Tu código JavaScript para el calendario aquí
var calendar; // Variable global para el calendario

// Función para abrir el modal
function abrirModal() {
    document.getElementById('modalCalendario').style.display = 'flex';
    inicializarCalendario(); // Llama al calendario al abrir el modal
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('modalCalendario').style.display = 'none';
    document.getElementById("confirmacionCita").style.display = "none";
}

function inicializarCalendario() {
    var calendarEl = document.getElementById('calendar');

    // Elimina cualquier instancia de calendario previa para evitar duplicados
    if (calendarEl.innerHTML !== "") calendarEl.innerHTML = "";

    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        locale: 'es',
        height: '100%',
        slotMinTime: '09:00',
        slotMaxTime: '17:00',
        slotDuration: '00:20:00',
        selectable: true,
        allDaySlot: false,
        contentHeight: 600,
        events: [
            {
                id: 1,
                title: 'Cita 1',
                start: '2024-11-04T09:00:00',
                end: '2024-11-04T09:20:00'
            },
            {
                id: 2,
                title: 'Cita 2',
                start: '2024-11-04T09:20:00',
                end: '2024-11-04T09:40:00'
            },
            {
                id: 3,
                title: 'Cita 3',
                start: '2024-11-04T10:00:00',
                end: '2024-11-04T10:20:00'
            }
        ],
        selectOverlap: function(event) {
            return !event; // No permite seleccionar fechas que ya están reservadas
        },
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: '' // Elimina los botones de mes, semana, año
        },
        eventClick: function(info) {
            const citaSeleccionada = `Cita seleccionada: ${info.event.title} a las ${info.event.start.toLocaleTimeString()}`;
            document.getElementById('fechaSeleccionada').textContent = citaSeleccionada;

            window.fechaCita = info.event.startStr; // Formato: "YYYY-MM-DDTHH:MM:SS"
            document.getElementById('confirmacionCita').style.display = 'block';
        }
    });

    calendar.render();
}

function confirmarCita() {
    // Agregar el evento al calendario
    calendar.addEvent({
        title: 'Cita Agendada',
        start: window.fechaCita,
        end: new Date(new Date(window.fechaCita).getTime() + 20 * 60000), // Duración de 20 minutos
        color: 'green' // Cambia el color para indicar que está confirmado
    });

    // Muestra el mensaje en el modal de éxito
    var mensajeExito = document.getElementById('mensajeExito');
    mensajeExito.textContent = "Cita agendada con éxito para " + window.fechaCita;

    // Abre el modal de éxito
    document.getElementById('modalExito').style.display = 'flex';

    cerrarModal(); // Cierra el modal del calendario
}
function cerrarModalExito() {
    document.getElementById('modalExito').style.display = 'none';
}

