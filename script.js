// Asigno constantes a los elementos del formulario
const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");

// Creo un evento para el formulario que se activa al enviarlo
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let warnings = "";
  let entrar = false;
  parrafo.innerHTML = "";
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // Validaciones
  if (usuario.value.length < 6) {
    warnings += `El usuario no es válido<br>`;
    entrar = true;
  }
  if (!regexEmail.test(email.value)) {
    warnings += `El email no es válido<br>`;
    entrar = true;
  }
  if (password.value.length < 8) {
    warnings += `La contraseña no es válida<br>`;
    entrar = true;
  }

  if (entrar) {
    parrafo.innerHTML = warnings;
  } else {
    parrafo.innerHTML = "Enviado";
    parrafo.style.color = "green";

    // Enviar datos al backend Flask
    try {
      const response = await fetch("http://localhost:5000/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuario.value,
          email: email.value,
          password: password.value,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message); // Mensaje desde el backend
      } else {
        alert("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en la solicitud");
    }
  }
});
