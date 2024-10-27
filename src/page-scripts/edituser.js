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
  console.log(userData.password);
  document.getElementById("name").value = userData.name;
  document.getElementById("email").value = userData.email;
  document.getElementById("password").value = "";
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
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
    password: form.password.value === "" ? 0 : form.password.value,
    city: form.city.value,
    state: form.state.value,
    zip: form.zip.value,
  };

  try {
    const result = await window.electronAPI.updateUser(userData);

    alert("Usuário atualizado com sucesso:", result);

    localStorage.removeItem("User");
    localStorage.removeItem("userId");

    window.location.href = "../pages/listusers.html";
  } catch (error) {
    throw error;
  }
});

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const eyeOpen = document.querySelector(".eye-icon.open");
    const eyeClosed = document.querySelector(".eye-icon.closed");

    // Alterna entre mostrar e ocultar a senha
    if (passwordInput.type === "password") {
      passwordInput.type = "text"; // Mostra a senha
      eyeOpen.classList.add("hidden"); // Esconde o olho aberto
      eyeClosed.classList.remove("hidden"); // Mostra o olho fechado
    } else {
      passwordInput.type = "password"; // Oculta a senha
      eyeOpen.classList.remove("hidden"); // Mostra o olho aberto
      eyeClosed.classList.add("hidden"); // Esconde o olho fechado
    }
  });
window.onload = getUser;
