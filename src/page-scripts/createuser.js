// script para criar um usuario admin no banco de dados

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const createAdmin = async () => {
  const adminEmail = 'admin@example.com'; // Substitua pelo email do administrador desejado
  const adminPassword = 'admin123'; // Substitua pela senha do administrador desejado

  // Verificar se o usuário administrador já existe
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existingAdmin) {
    console.log('Usuário administrador já existe.');
    return;
  }

  // Hash da senha do administrador
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Criar o usuário administrador no banco de dados
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      cpf: '000.000.000-00', // Substitua pelo CPF desejado
      phone: '0000000000', // Substitua pelo telefone desejado
      address: 'Admin Address', // Substitua pelo endereço desejado
      city: 'Admin City', // Substitua pela cidade desejada
      state: 'Admin State', // Substitua pelo estado desejado
      zip: '00000-000', // Substitua pelo CEP desejado
      role: 'ADMIN', // Definir a role como ADMIN
    },
  });

  console.log('Usuário administrador criado com sucesso:', admin);
};

createAdmin()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });