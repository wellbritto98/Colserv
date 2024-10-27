import {
  removeFormattedEmail,
  removeFormattedPhone,
  removeFormattedZip,
} from "../utils/removeFormatting.js";

const form = document.getElementById("edit-user-form");

function getUser() {
  const user = localStorage.getItem("User");

  if (!user) {
    alert("Usuário não encontrado");
    localStorage.removeItem("User");
    window.location.href = "../pages/listusers.html";
  }

  const userData = JSON.parse(user);
  insertUserDataIntoForm(userData);
}

function insertUserDataIntoForm(userData) {
  localStorage.setItem("userId", userData.id);
  document.getElementById("name").value = userData.name;
  document.getElementById("email").value = userData.email;
  document.getElementById("password").value = "";
  // document.getElementById("password_confirmation").value = "";
  document.getElementById("phone").value = userData.phone;
  document.getElementById("address").value = userData.address;
  document.getElementById("city").value = userData.city;
  document.getElementById("state").value = userData.state;
  document.getElementById("zip").value = userData.zip;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userId = localStorage.getItem("userId");

  const userData = {
    id: Number(userId),
    name: form.name.value,
    email: removeFormattedEmail(form.email.value),
    phone: removeFormattedPhone(form.phone.value),
    address: form.address.value,
    password:
      form.password.value === "" || !form.changePasswordCheckbox.checked
        ? 0
        : form.password.value,
    city: form.city.value,
    state: form.state.value,
    zip: removeFormattedZip(form.zip.value),
  };

  try {
    await window.electronAPI.updateUser(userData);

    alert("Usuário atualizado com sucesso:");

    form.reset();

    // Aguarda 2 segundos antes de redirecionar
    setTimeout(() => {
      localStorage.removeItem("User");
      localStorage.removeItem("userId");
      window.location.href = "../pages/listusers.html";
    }, 2000);
  } catch (error) {
    throw error;
  }
});

// TODO - Verificar o porque está travando os inputs
// document
//   .querySelectorAll('[data-role="button-toggle-password"]')
//   .forEach((button, index) => {
//     button.addEventListener("click", function () {
//       // Seleciona o campo de senha correspondente ao botão de toggle
//       const passwordInput = document.querySelectorAll('[data-role="password"]')[
//         index
//       ];
//       const eyeOpen = button.querySelector(".eye-icon.open");
//       const eyeClosed = button.querySelector(".eye-icon.closed");

//       // Alterna entre mostrar e ocultar a senha
//       if (passwordInput.type === "password") {
//         passwordInput.type = "text"; // Mostra a senha
//         eyeOpen.classList.add("hidden"); // Esconde o olho aberto
//         eyeClosed.classList.remove("hidden"); // Mostra o olho fechado
//       } else {
//         passwordInput.type = "password"; // Oculta a senha
//         eyeOpen.classList.remove("hidden"); // Mostra o olho aberto
//         eyeClosed.classList.add("hidden"); // Esconde o olho fechado
//       }
//     });
//   });
// TODO - Verificar o porque está travando os inputs
// document
//   .getElementById("changePasswordCheckbox")
//   .addEventListener("change", function () {
//     const passwordInputs = document.querySelectorAll('[data-role="password"]');
//     const togglePasswordButtons = document.querySelectorAll(
//       '[data-role="button-toggle-password"]'
//     );

//     if (this.checked) {
//       // Habilita os campos de senha
//       passwordInputs.forEach((input) => {
//         input.disabled = false;
//       });

//       // Habilita os botões de mostrar senha
//       togglePasswordButtons.forEach((button) => {
//         button.disabled = false;
//       });
//     } else {
//       // Desabilita os campos de senha
//       passwordInputs.forEach((input) => {
//         input.disabled = true;
//       });

//       // Desabilita os botões de mostrar senha
//       togglePasswordButtons.forEach((button) => {
//         button.disabled = true;
//       });
//     }
//   });

window.onload = getUser;
