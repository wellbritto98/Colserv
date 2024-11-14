const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  registerUser: (userData) => ipcRenderer.invoke("register-user", userData),
  loginUser: (userData) => ipcRenderer.invoke("login-user", userData),
  listUsers: () => ipcRenderer.invoke("list-users"),
  cadastrarChamado: (chamadoData) => ipcRenderer.invoke('cadastro-chamado', chamadoData),
  updateUser: (userData) => ipcRenderer.invoke("update-user-info", userData),
  storeUser: (userCredentials) => {
    console.log('Armazenando usuário no localStorage:', userCredentials);
    localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
  },
  removeUserLocalStorage: () => {
    console.log('Removendo usuário do localStorage');
    localStorage.removeItem('userCredentials');
  },
});