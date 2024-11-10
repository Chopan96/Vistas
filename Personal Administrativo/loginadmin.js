function validarLogin() {
    // Obtener valores de los campos de entrada
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const errorMessage = document.getElementById('error-message');

    // Validar las credenciales
      if (username === 'admin@gmail.com' && password === '1234') {
      // Redirige a la página principal si las credenciales son correctas
      window.location.href = 'principal.html';
      } else {
      // Muestra el mensaje de error si las credenciales son incorrectas
      errorMessage.textContent = 'Correo o contraseña incorrectos. Por favor, intenta de nuevo.';
      errorMessage.classList.remove('d-none');  // Hacer visible el mensaje de error
      }
    // Previene el envío del formulario
      return false;
  }