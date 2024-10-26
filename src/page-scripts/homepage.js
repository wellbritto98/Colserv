document.getElementById('logout-button').addEventListener('click', () => {
    // Limpar dados de sessão ou qualquer outra lógica de logout
    console.log('Usuário deslogando...');
    window.electronAPI.removeUserLocalStorage();
    console.log('Usuário deslogado');
    window.location.href = "../pages/signin.html";
  });