document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pacienteForm');
    const pacientesTable = document.querySelector('#pacientesTable tbody');

    let pacientes = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const paciente = obtenerDatosFormulario();
        if (paciente) {
            pacientes.push(paciente);
            mostrarPacientes();
            form.reset();
        }
    });

    function obtenerDatosFormulario() {
        const nombre = document.getElementById('nombre').value.trim();
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const correo = document.getElementById('correo').value.trim();
        const motivoConsulta = document.getElementById('motivoConsulta').value.trim();
        const historialMedico = document.getElementById('historialMedico').value.trim();
        const medicamentosActuales = document.getElementById('medicamentosActuales').value.trim();
        const medicamentosPrevios = document.getElementById('medicamentosPrevios').value.trim();

        if (!nombre || !fechaNacimiento || !correo) {
            alert('Por favor, complete todos los campos obligatorios.');
            return null;
        }

        return {
            id: Date.now(),
            nombre,
            fechaNacimiento,
            correo,
            motivoConsulta,
            historialMedico,
            medicamentosActuales,
            medicamentosPrevios
        };
    }

    function mostrarPacientes() {
        pacientesTable.innerHTML = '';

        pacientes.forEach(paciente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${paciente.nombre}</td>
                <td>${paciente.fechaNacimiento}</td>
                <td>${paciente.correo}</td>
                <td>${paciente.motivoConsulta || 'N/A'}</td>
                <td>${paciente.historialMedico || 'N/A'}</td>
                <td>${paciente.medicamentosActuales || 'N/A'}</td>
                <td>${paciente.medicamentosPrevios || 'N/A'}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarPaciente(${paciente.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarPaciente(${paciente.id})">Eliminar</button>
                </td>
            `;
            pacientesTable.appendChild(row);
        });
    }

    window.eliminarPaciente = function(id) {
        pacientes = pacientes.filter(paciente => paciente.id !== id);
        mostrarPacientes();
    };

    window.editarPaciente = function(id) {
        const paciente = pacientes.find(paciente => paciente.id === id);

        if (paciente) {
            document.getElementById('nombre').value = paciente.nombre;
            document.getElementById('fechaNacimiento').value = paciente.fechaNacimiento;
            document.getElementById('correo').value = paciente.correo;
            document.getElementById('motivoConsulta').value = paciente.motivoConsulta;
            document.getElementById('historialMedico').value = paciente.historialMedico;
            document.getElementById('medicamentosActuales').value = paciente.medicamentosActuales;
            document.getElementById('medicamentosPrevios').value = paciente.medicamentosPrevios;

            eliminarPaciente(id);
        }
    };
});