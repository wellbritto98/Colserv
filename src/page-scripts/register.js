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
      zip
    });
    showAlert('success', 'Usuário cadastrado com sucesso!');
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    showAlert('error', 'Erro ao cadastrar usuário. Tente novamente.');
  }
});

function showAlert(type, message) {
  const alertTypes = {
    success: 'bg-green-500',
    error: 'bg-red-500',
  };

  const alert = document.createElement('div');
  alert.className = `flex items-center ${alertTypes[type]} text-white text-sm font-bold px-4 py-3 rounded relative`;
  alert.setAttribute('role', 'alert');

  const alertMessage = document.createElement('span');
  alertMessage.className = 'block sm:inline';
  alertMessage.textContent = message;

  const closeButton = document.createElement('span');
  closeButton.className = 'absolute top-0 bottom-0 right-0 px-4 py-3';
  closeButton.innerHTML = '<svg class="fill-current h-6 w-6 text-white" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z"/></svg>';
  closeButton.onclick = () => alert.remove();

  alert.appendChild(alertMessage);
  alert.appendChild(closeButton);
  alertContainer.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 5000);
}