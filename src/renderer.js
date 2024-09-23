const form = document.getElementById('signup-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const cpf = form.cpf.value;
  const phone = form.phone.value;
  const address = form.address.value;
  const city = form.city.value;
  const state = form.state.value;
  const zip = form.zip.value;

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
    console.log('Usuário cadastrado com sucesso:', result);
    // Aqui você pode redirecionar o usuário, mostrar uma mensagem de sucesso, etc.
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    // Mostrar mensagem de erro ao usuário
  }
});
