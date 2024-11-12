const registerForm = document.getElementById('signup-form');
const errorMessage = document.getElementById('error-message');

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = registerForm.name.value;
  const email = registerForm.email.value;
  const password = registerForm.password.value;
  const cpf = registerForm.cpf.value;
  const phone = registerForm.phone.value;
  const address = registerForm.address.value;
  const city = registerForm.city.value;
  const state = registerForm.state.value;
  const zip = registerForm.zip.value;
  const role = registerForm.role.value; // Adicione o campo role aqui

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