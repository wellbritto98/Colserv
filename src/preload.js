const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  registerUser: (userData) => ipcRenderer.invoke('register-user', userData),
  loginUser: (userData) => ipcRenderer.invoke('login-user', userData),
  listUsers: () => ipcRenderer.invoke('list-users'), // Expor a função listUsers
  updateUser: (userData) => ipcRenderer.invoke('update-user', userData), // Expor a função updateUser
  cadastrarChamado: (chamadoData) => ipcRenderer.invoke('cadastro-chamado', chamadoData),
  getAllChamados: (chamadoData) => ipcRenderer.invoke('get-chamados', chamadoData),
  atualizarChamado: (chamadoData) => ipcRenderer.invoke('atualizar-chamado', chamadoData),
  storeUser: (userCredentials) => {
    console.log('Removendo dados do usuário anterior do localStorage');
    localStorage.removeItem('userCredentials');
    console.log('Armazenando usuário no localStorage:', userCredentials);
    localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
  },
  removeUser: () => {
    console.log('Removendo usuário do localStorage');
    localStorage.removeItem('userCredentials');
  },
});