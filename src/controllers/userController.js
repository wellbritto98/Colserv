const { ipcMain } = require('electron');
const bcrypt = require('bcrypt');
const prisma = require('../db'); // Importar a instância do Prisma

const registerIpcHandlers = () => {
  ipcMain.handle('register-user', async (event, userData) => {
    try {
      const { userRole, name, email, password, cpf, phone, address, city, state, zip, role } = userData;

      // Verificar se o usuário é ADMIN antes de permitir o registro
      if (userRole !== 'ADMIN') {
        throw new Error('Permissão negada: apenas usuários ADMIN podem registrar novos usuários');
      }

      // Verificar se o email ou CPF já está cadastrado
      const existingUser = await prisma.user.findUnique({ where: { email } });
      const existingCpf = await prisma.user.findUnique({ where: { cpf } });
      if (existingUser || existingCpf) {
        throw new Error('Email ou CPF já cadastrado');
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar o usuário no banco de dados com o campo de cargo
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
          role, // Adicionando o campo 'role'
        },
      });

      return { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  });
};

module.exports = { registerIpcHandlers };
