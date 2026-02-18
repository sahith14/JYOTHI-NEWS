import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const password = await bcrypt.hash('your-secure-password', 10);
  await prisma.admin.create({
    data: {
      username: 'jyothi',
      password,
    },
  });
  console.log('Admin created');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
