function formatDataCPF(value) {
  let cpf = value.replace(/\D/g, "");

  // Aplica a máscara ao CPF
  if (value.length <= 3) value = value;
  else if (cpf.length <= 6) cpf = `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
  else if (cpf.length <= 9)
    cpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
  else
    cpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(
      9,
      11
    )}`;

  return cpf;
}

function formatDataPhone(value) {
  let phone = value.replace(/\D/g, "");

  if (phone.length <= 2) phone = `(${phone}`;
  else if (phone.length <= 6)
    phone = `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
  else if (phone.length <= 10)
    phone = `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
  else
    phone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;

  return phone;
}

function formatDataZip(value) {
  let zip = value.replace(/\D/g, "");

  zip = zip.length <= 5 ? zip : `${zip.slice(0, 5)}-${zip.slice(5, 8)}`;

  return zip;
}
