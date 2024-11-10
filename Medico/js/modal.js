 // Simulación de datos para el historial de pacientes
 const patientData = {
    "123": "Historial del paciente con ID 123: Última visita el 1/1/2024. Diagnóstico: Gripe. Tratamiento: Reposo y medicamentos.",
    
    // Agrega más datos de ejemplo según sea necesario
};

document.getElementById('searchBtn').addEventListener('click', function() {
    const patientId = document.getElementById('searchPaciente').value.trim();
    const historyText = patientData[patientId] || "No se encontró historial para el paciente con ID proporcionado.";
    document.getElementById('patientHistory').innerText = historyText;
});

document.getElementById('addConsultBtn').addEventListener('click', function() {
    document.getElementById('consultForm').style.display = 'block';
});

document.getElementById('saveConsultBtn').addEventListener('click', function() {
    const consultInfo = document.getElementById('consultInfo').value.trim();
    if (consultInfo) {
        // Agregar la nueva consulta debajo del historial
        const newConsultText = document.createElement('p');
        newConsultText.innerText = "Nueva consulta agregada: " + consultInfo;
        document.getElementById('patientHistoryContainer').appendChild(newConsultText);

        // Limpiar el formulario de consulta
        document.getElementById('consultInfo').value = '';
        document.getElementById('consultForm').style.display = 'none';
    } else {
        alert('Por favor, ingrese detalles de la consulta.');
    }
});