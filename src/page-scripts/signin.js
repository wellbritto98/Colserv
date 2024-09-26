const signinForm = document.getElementById('signin-form');

signinForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = signinForm.email.value;
  const password = signinForm.password.value;
  try {
   /* const result = await window.electronAPI.signInUser({
      email,
      password
    });*/
    console.log('Usuário logado com sucesso:');
    window.location.href ="../pages/homepage.html"
  } catch (error) {
    console.error('Erro ao logar usuário:', error);
    // Mostrar mensagem de erro ao usuário
  }
});