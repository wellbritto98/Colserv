// Regex Patterns
const phonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
const zipPattern = /^[0-9]{5}-?[0-9]{3}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Função para atualizar borda de acordo com a validação
function updateBorder(input, isValid) {
  input.classList.toggle("border-green-500", isValid);
  input.classList.toggle("border-red-500", !isValid);
}

// Formatação e validação de CPF
function formatCPF(input) {
  let value = input.value.replace(/\D/g, "");

  // Aplica a máscara ao CPF
  if (value.length <= 3) input.value = value;
  else if (value.length <= 6)
    input.value = `${value.slice(0, 3)}.${value.slice(3)}`;
  else if (value.length <= 9)
    input.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
  else
    input.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(
      6,
      9
    )}-${value.slice(9, 11)}`;
}

function formatEmail(input) {
  const value = input.value.trim();

  updateBorder(input, emailPattern.test(value));
}

function formatPhone(input) {
  let value = input.value.replace(/\D/g, "");

  if (value.length <= 2) input.value = `(${value}`;
  else if (value.length <= 6)
    input.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  else if (value.length <= 10)
    input.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(
      6
    )}`;
  else
    input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(
      7,
      11
    )}`;

  updateBorder(input, phonePattern.test(input.value));
}

function formatZip(input) {
  let value = input.value.replace(/\D/g, "");

  input.value =
    value.length <= 5 ? value : `${value.slice(0, 5)}-${value.slice(5, 8)}`;

  updateBorder(input, zipPattern.test(input.value));
}

function validatePassword(input) {
  const passwordInputs = document.querySelectorAll('[data-role="password"]');

  // Verifica se todos os campos de senha têm o mesmo valor e têm pelo menos 8 caracteres
  const allPasswordsValid = Array.from(passwordInputs).every(
    (passwordInput) =>
      passwordInput.value.length >= 8 &&
      passwordInput.value === passwordInputs[0].value
  );

  // Atualiza a borda de cada campo de senha com base na validação
  passwordInputs.forEach((passwordInput) =>
    updateBorder(passwordInput, allPasswordsValid)
  );
}

// Função de exemplo para atualizar a borda
function updateBorder(passwordInput, isValid) {
  passwordInput.style.borderColor = isValid ? "green" : "red";
}
