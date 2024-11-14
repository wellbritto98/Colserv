const form = document.getElementById("signup-form");
const alertContainer = document.getElementById("alert-container");

function formatCPF(input) {
  // Remove tudo que não for número
  let value = input.value.replace(/\D/g, "");

  // Formata o CPF: 000.000.000-00
  if (value.length <= 3) {
    input.value = value;
  } else if (value.length <= 6) {
    input.value = `${value.slice(0, 3)}.${value.slice(3)}`;
  } else if (value.length <= 9) {
    input.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
  } else {
    input.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(
      6,
      9
    )}-${value.slice(9, 11)}`;
  }
}

function formatPhone(input) {
  // Remove tudo que não for número
  let value = input.value.replace(/\D/g, "");

  // Formata o telefone: (00) 00000-0000 ou (00) 0000-0000
  if (value.length <= 2) {
    input.value = `(${value}`;
  } else if (value.length <= 6) {
    input.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  } else if (value.length <= 10) {
    input.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(
      6
    )}`;
  } else {
    input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(
      7,
      11
    )}`;
  }
}

function formatCEP(input) {
  // Remove tudo que não for número
  let value = input.value.replace(/\D/g, "");

  // Formata o CEP: 00000-000
  if (value.length <= 5) {
    input.value = value;
  } else {
    input.value = `${value.slice(0, 5)}-${value.slice(5, 8)}`;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const role = form.role.value;
  const cpfFormatted = form.cpf.value;
  const cpf = cpfFormatted.replace(/\D/g, "");
  const phoneFormatted = form.phone.value;
  const phone = phoneFormatted.replace(/\D/g, "");
  const address = form.address.value;
  const city = form.city.value;
  const state = form.state.value;
  const zipFormatted = form.zip.value;
  const zip = zipFormatted.replace(/\D/g, "");

  try {
    const result = await window.electronAPI.registerUser({
      name,
      email,
      password,
      cpf,
      phone,
      address,
      city,
      state,
      zip,
      role, // Adicione o campo role aqui
    });
    console.log('Usuário registrado com sucesso:', result);
    window.location.href = "../pages/signin.html";
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    errorMessage.textContent = 'Erro ao registrar usuário. Verifique os dados e tente novamente.';
    errorMessage.classList.remove('hidden');
  }
});