    // Función para validar el RUT (formato básico sin conexión a base de datos)
    function validarRUT() {
        const rutInput = document.getElementById("rutMedico");
        const rut = rutInput.value;
        const rutPattern = /^\d{7,8}-[0-9Kk]$/; // Formato simple de RUT

        if (!rutPattern.test(rut)) {
            rutInput.classList.add("is-invalid");
            return false;
        } else {
            rutInput.classList.remove("is-invalid");
            return true;
        }
    }