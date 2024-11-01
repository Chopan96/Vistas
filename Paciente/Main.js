// Función para redirigir a la página de médicos desde Main.html
function irAMedicos() {
    const rut = document.getElementById('rut').value;
    const sucursal = document.getElementById('sucursal').value;
    const prevision = document.getElementById('prevision').value;

    if (rut && sucursal && prevision) {
        window.location.href = "Medicos.html";
    } else {
        alert('Por favor, complete todos los campos antes de continuar.');
    }
}

// Función para mostrar el calendario en la página Medicos.html
function mostrarCalendario() {
    document.getElementById('calendario').style.display = 'block';
}

// Función para manejar la confirmación de la fecha seleccionada
function confirmarFecha() {
    const fecha = document.querySelector('input[type="date"]').value;
    const medicoSeleccionado = localStorage.getItem('medicoSeleccionado');

    if (fecha && medicoSeleccionado) {
        // Guardar la reserva en localStorage
        guardarReserva(medicoSeleccionado, fecha);
        alert(`Has seleccionado la fecha: ${fecha} con el ${medicoSeleccionado} para tu cita.`);

        // Redirige a la página de confirmación o de reservas
        window.location.href = "reservas.html";
    } else {
        alert('Por favor, seleccione una fecha y un médico antes de confirmar.');
    }
}

// Función para guardar la reserva en localStorage
function guardarReserva(medico, fecha) {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.push({ medico, fecha });
    localStorage.setItem('reservas', JSON.stringify(reservas));
}

// Función para seleccionar un médico y almacenarlo temporalmente en localStorage
function seleccionarMedico(medico) {
    localStorage.setItem('medicoSeleccionado', medico);
    mostrarCalendario();
}

// Función para cargar las reservas en la página reservas.html
function cargarReservas() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const reservasContainer = document.getElementById('reservasContainer');

    if (reservas.length > 0) {
        reservas.forEach(reserva => {
            const reservaItem = document.createElement('div');
            reservaItem.className = 'reserva-item';
            reservaItem.innerHTML = `Médico: ${reserva.medico} - Fecha: ${reserva.fecha} 
            <button onclick="anularReserva('${reserva.medico}', '${reserva.fecha}')">Anular</button>
            <button onclick="modificarReserva('${reserva.medico}', '${reserva.fecha}')">Modificar</button>`;
            reservasContainer.appendChild(reservaItem);
        });
    } else {
        reservasContainer.innerHTML = '<p>No hay reservas disponibles.</p>';
    }
}

// Función para anular una reserva
function anularReserva(medico, fecha) {
    let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas = reservas.filter(reserva => !(reserva.medico === medico && reserva.fecha === fecha));
    localStorage.setItem('reservas', JSON.stringify(reservas));
    alert('Reserva anulada.');
    location.reload(); // Recargar la página para actualizar la lista de reservas
}

// Función para modificar una reserva
function modificarReserva(medico, fecha) {
    // Almacena la reserva que se desea modificar
    localStorage.setItem('reservaModificada', JSON.stringify({ medico, fecha }));
    
    // Redirige al usuario al formulario de modificación de fecha
    window.location.href = "modificarReserva.html";
}

// Función para manejar la confirmación de la nueva fecha en modificarReserva.html
function confirmarModificacion() {
    const nuevaFecha = document.querySelector('input[type="date"]').value;
    const reservaModificada = JSON.parse(localStorage.getItem('reservaModificada'));

    if (nuevaFecha && reservaModificada) {
        // Actualiza la reserva en localStorage
        actualizarReserva(reservaModificada.medico, reservaModificada.fecha, nuevaFecha);
        alert(`Has modificado la fecha de la reserva a: ${nuevaFecha}`);

        // Redirige al menú principal
        window.location.href = "Main.html";
    } else {
        alert('Por favor, seleccione una nueva fecha antes de confirmar.');
    }
}

// Función para actualizar una reserva en localStorage
function actualizarReserva(medicoOriginal, fechaOriginal, nuevaFecha) {
    let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas = reservas.map(reserva => 
        reserva.medico === medicoOriginal && reserva.fecha === fechaOriginal 
            ? { medico: reserva.medico, fecha: nuevaFecha } 
            : reserva
    );
    localStorage.setItem('reservas', JSON.stringify(reservas));
}

// Eventos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const reservaForm = document.getElementById('reservaForm');
    if (reservaForm) {
        reservaForm.addEventListener('submit', function(event) {
            event.preventDefault();
            irAMedicos();
        });
    }

    const agendarBtns = document.querySelectorAll('.agendarBtn');
    if (agendarBtns.length) {
        agendarBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const medico = this.parentElement.textContent.trim().split(' ')[0];
                seleccionarMedico(medico); // Almacena el médico seleccionado
            });
        });
    }

    const calendarioForm = document.getElementById('calendarioForm');
    if (calendarioForm) {
        calendarioForm.addEventListener('submit', function(event) {
            event.preventDefault();
            confirmarFecha();
        });
    }

    const reservasContainer = document.getElementById('reservasContainer');
    if (reservasContainer) {
        cargarReservas(); // Cargar reservas si estamos en la página reservas.html
    }

    const modificarReservaForm = document.getElementById('modificarReservaForm');
    if (modificarReservaForm) {
        modificarReservaForm.addEventListener('submit', function(event) {
            event.preventDefault();
            confirmarModificacion();
        });
    }
});
