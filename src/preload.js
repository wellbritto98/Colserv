const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  registerUser: (userData) => ipcRenderer.invoke('register-user', userData),
  loginUser: (userData) => ipcRenderer.invoke('login-user', userData),
  listUsers: () => ipcRenderer.invoke('list-users'), // Expor a função listUsers
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