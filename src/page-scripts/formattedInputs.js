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

  // Regex para validação do telefone: (00) 00000-0000 ou (00) 0000-0000
  const phonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;

  // Valida o telefone e ajusta a cor da borda
  if (phonePattern.test(input.value)) {
    input.classList.remove("border-red-500"); // Remove a borda vermelha se válido
    input.classList.add("border-green-500"); // Adiciona uma borda verde se válido (opcional)
  } else {
    input.classList.remove("border-green-500"); // Adiciona uma borda verde se válido (opcional)
    input.classList.add("border-red-500"); // Adiciona a borda vermelha se inválido
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

  const cepPattern = /^[0-9]{5}-?[0-9]{3}$/;

  // Valida o CEP e ajusta a cor da borda
  if (cepPattern.test(input.value)) {
    input.classList.remove("border-red-500"); // Remove a borda vermelha se válido
    input.classList.add("border-green-500"); // Adiciona uma borda verde se válido (opcional)
  } else {
    input.classList.remove("border-green-500"); // Adiciona uma borda verde se válido (opcional)
    input.classList.add("border-red-500"); // Adiciona a borda vermelha se inválido
  }
}

function formatEmail(input) {
  // Obtém o valor do input
  let value = input.value.trim();

  // Regex para validação básica de e-mail
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Verifica se o e-mail está em um formato válido
  if (emailPattern.test(value)) {
    input.classList.remove("border-red-500");
    input.classList.add("border-green-500");
  } else {
    input.classList.remove("border-green-500");
    input.classList.add("border-red-500");
  }
}
