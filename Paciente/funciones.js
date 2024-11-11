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
        slotLabelInterval: { minutes: 20 },
        selectable: true,
        allDaySlot: false,
        slotLabelFormat: {
            hour: '2-digit', 
            minute: '2-digit', 
            omitZeroMinute: false, 
            meridiem: false // Muestra las horas en formato 24 horas
        },
        contentHeight: 600,
        events: [
            {
                id: 1,
                title: 'Cita 1',
                start: '2024-11-11T09:00:00',
                end: '2024-11-11T09:20:00'
            },
            {
                id: 2,
                title: 'Cita 2',
                start: '2024-11-11T09:20:00',
                end: '2024-11-11T09:40:00'
            },
            {
                id: 3,
                title: 'Cita 3',
                start: '2024-11-11T10:00:00',
                end: '2024-11-11T10:20:00'
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

function confirmarCita(event) {
    event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;

    // Aquí podrías hacer una llamada a tu backend para guardar la cita
    const mensajeExito = `Cita confirmada para el ${window.fechaCita} con el paciente ${nombre} (${telefono}, ${correo}).`;
    
    // Mostrar mensaje de éxito
    document.getElementById('mensajeExito').textContent = mensajeExito;
    document.getElementById('modalExito').style.display = 'block';
    document.getElementById('modalCalendario').style.display = 'none';
}

function cerrarModalExito() {
    // Cerrar el modal de éxito
    document.getElementById('modalExito').style.display = 'none';
    window.location.href = 'Main.html';
}
