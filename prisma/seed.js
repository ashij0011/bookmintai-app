const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email    = 'admin@bookmintai.ca';   // change this
  const password = 'ChangeMe123!';          // change this
  const name     = 'BookMint Admin';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.user.update({ where: { email }, data: { role: 'ADMIN' } });
    console.log('User promoted to ADMIN:', email);
    return;
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 12),
      role: 'ADMIN',
    },
  });
  console.log('Admin created:', email);
  console.log('Password:', password, '— change this immediately!');
}

main().catch(console.error).finally(() => prisma.$disconnect());