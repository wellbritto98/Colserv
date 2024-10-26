const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  registerUser: (userData) => ipcRenderer.invoke('register-user', userData),
  loginUser: (userData) => ipcRenderer.invoke('login-user', userData),
  storeUser: (user) => {
    console.log('Armazenando usuário no localStorage:', user);
    localStorage.setItem('user', JSON.stringify(user));
  },
  removeUser: () => {
    console.log('Removendo usuário do localStorage');
    localStorage.removeItem('user');
  },
});