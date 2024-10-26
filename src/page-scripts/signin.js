const signinForm = document.getElementById('signin-form');
const errorMessage = document.getElementById('error-message');

signinForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = signinForm.email.value;
  const password = signinForm.password.value;
  try {
    const result = await window.electronAPI.loginUser({
      email,
      password
    });
    console.log('Usuário logado com sucesso:', result);
    window.location.href = "../pages/homepage.html";
  } catch (error) {
    console.error('Erro ao logar usuário:', error);
    // Mostrar mensagem de erro ao usuário
    errorMessage.textContent = 'Erro ao encontrar o usuário. Verifique o email e a senha.';
    errorMessage.classList.remove('hidden');
  }
});