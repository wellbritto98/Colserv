const { ipcMain } = require('electron');
const bcrypt = require('bcrypt');
const prisma = require('../db'); // Importar a instância do Prisma

const registerIpcHandlers = () => {
  ipcMain.handle('register-user', async (event, userData) => {
    try {
      const { name, email, password, cpf, phone, address, city, state, zip } = userData;

      // Verificar se o email ou CPF já está cadastrado
      const existingUser = await prisma.user.findUnique({ where: { email } });
      const existingCpf = await prisma.user.findUnique({ where: { cpf } });
      if (existingUser || existingCpf) {
        throw new Error('Email ou CPF já cadastrado');
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar o usuário no banco de dados
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          cpf,
          phone,
          address,
          city,
          state,
          zip,
        },
      });

      return { id: newUser.id, name: newUser.name, email: newUser.email };
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  });

  ipcMain.handle('login-user', async (event, { email, password }) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Senha incorreta');
      }

      return { id: user.id, name: user.name, email: user.email };
    } catch (error) {
      console.error('Erro ao logar usuário:', error);
      throw error;
    }
  });
};

module.exports = { registerIpcHandlers };