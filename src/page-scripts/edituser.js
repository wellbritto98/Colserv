import {
  removeFormattedEmail,
  removeFormattedPhone,
  removeFormattedZip,
} from "../utils/removeFormatting.js";
  function showSuccessAlert(message) {
    const successAlert = document.getElementById('success-alert');
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = message;
    successAlert.classList.remove('hidden');
  }

  function showErrorAlert(message) {
    const errorAlert = document.getElementById('error-alert');
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorAlert.classList.remove('hidden');
  }
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
  document.getElementById("cpf").value = formatDataCPF(userData.cpf);
  document.getElementById("password").value = "";
  document.getElementById("phone").value = formatDataPhone(userData.phone);
  document.getElementById("address").value = userData.address;
  document.getElementById("city").value = userData.city;
  document.getElementById("state").value = userData.state;
  document.getElementById("zip").value = formatDataZip(userData.zip);
  document.getElementById("role").value = userData.role;
}

function togglePasswordVisibility(button, index) {
  const passwordInput = document.querySelectorAll('[data-role="password"]')[
    index
  ];
  const eyeOpen = button.querySelector(".eye-icon.open");
  const eyeClosed = button.querySelector(".eye-icon.closed");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeOpen.classList.add("hidden");
    eyeClosed.classList.remove("hidden");
  } else {
    passwordInput.type = "password";
    eyeOpen.classList.remove("hidden");
    eyeClosed.classList.add("hidden");
  }
}

// Adiciona event listeners aos botões de toggle de senha
function setupPasswordToggles() {
  document
    .querySelectorAll('[data-role="button-toggle-password"]')
    .forEach((button, index) => {
      button.addEventListener("click", () =>
        togglePasswordVisibility(button, index)
      );
    });
}

// Controle do checkbox para habilitar/desabilitar inputs de senha
function setupPasswordCheckbox() {
  const checkbox = document.getElementById("changePasswordCheckbox");
  const passwordInputs = document.querySelectorAll('[data-role="password"]');
  const togglePasswordButtons = document.querySelectorAll(
    '[data-role="button-toggle-password"]'
  );

  function updatePasswordFieldsState() {
    const isChecked = checkbox.checked;
    passwordInputs.forEach((input) => (input.disabled = !isChecked));
    togglePasswordButtons.forEach((button) => (button.disabled = !isChecked));
  }

  updatePasswordFieldsState();
  checkbox.addEventListener("change", updatePasswordFieldsState);
}

// Redefine o foco dos inputs quando a janela é focada
function handleWindowFocus() {
  const firstInput = form.querySelector("input:not([disabled])");
  if (firstInput) {
    firstInput.focus();
  }
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
    role: form.role.value, // Certifique-se de que o campo role está sendo enviado
  };

  try {
    await window.electronAPI.updateUser(userData);

    form.reset();

    setTimeout(() => {
      localStorage.setItem(
        "updateSuccess",
        `O usuário "${userData.name}", foi atualizado com sucesso!`
      );
      localStorage.removeItem("User");
      localStorage.removeItem("userId");
      showSuccessAlert(`O usuário "${userData.name}" foi atualizado com sucesso!`);
      setTimeout(() => {
        window.location.href = "../pages/listusers.html";
      }, 2000);
    }, 500);
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
    showErrorAlert("Erro ao atualizar o usuário. Tente novamente.");
  }
});


// Carrega os dados do usuário ao abrir a janela
window.onload = () => {
  getUser();
  setupPasswordToggles();
  setupPasswordCheckbox();
  handleWindowFocus();
};

// Ouve o evento de foco da janela e redefine os inputs
window.addEventListener("focus", handleWindowFocus);
