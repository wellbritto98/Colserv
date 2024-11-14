const signinForm = document.getElementById('signin-form');
const errorMessage = document.getElementById('error-message');

// Verificar se há informações de login no localStorage
const userCredentials = JSON.parse(localStorage.getItem('userCredentials'));
if (userCredentials) {
  const continueSession = confirm(`Deseja continuar a sessão da conta de ${userCredentials.name}?`);
  if (continueSession) {
    window.location.href = "../pages/homepage.html";
  } else {
    // Remover dados do usuário anterior
    window.electronAPI.removeUser();
  }
}

signinForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = signinForm.email.value.trim();
  const password = signinForm.password.value.trim();

  // Verificar se o email e a senha estão preenchidos
  if (!email || !password) {
    errorMessage.textContent = 'Por favor, preencha o email e a senha.';
    errorMessage.classList.remove('hidden');
    return;
  }

  try {
    const result = await window.electronAPI.loginUser({ email, password });
    console.log('Usuário logado com sucesso:', result);

    // Salvar estado de login no localStorage (aqui estou assumindo que `result` contém os dados do usuário)
    window.electronAPI.storeUser(result);

    // Redirecionar para a página inicial
    window.location.href = "../pages/homepage.html";
  } catch (error) {
    console.error('Erro ao logar usuário:', error);

    // Mostrar mensagem de erro ao usuário
    errorMessage.textContent = 'Erro ao encontrar o usuário. Verifique o email e a senha.';
    errorMessage.classList.remove('hidden');
  }
});