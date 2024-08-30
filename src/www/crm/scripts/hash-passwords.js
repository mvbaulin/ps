const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function hashPasswords() {
  try {
    const users = await prisma.crm_users.findMany();

    for (const user of users) {
      const password = user.password;

      const isPasswordHashed = password.length === 60;

      if (!isPasswordHashed) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.crm_users.update({
          where: { id: user.id },
          data: { password: hashedPassword },
        });
        console.log(`Password for user ${user.login} has been updated.`);
      } else {
        console.log(`Password for user ${user.login} is already hashed.`);
      }
    }
  } catch (error) {
    console.error('Error hashing passwords:', error);
  } finally {
    await prisma.$disconnect();
  }
}

hashPasswords();
