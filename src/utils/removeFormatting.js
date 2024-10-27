// REMOVE FORMATTING FUNCTIONS
export function removeFormattedCpf(formattedCpf) {
  return formattedCpf.replace(/\D/g, "");
}

export function removeFormattedEmail(formattedEmail) {
  return formattedEmail.trim();
}

export function removeFormattedPhone(formattedPhone) {
  return formattedPhone.replace(/\D/g, "");
}

export function removeFormattedZip(formattedZip) {
  return formattedZip.replace(/\D/g, "");
}
