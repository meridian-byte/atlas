import { db } from './client';

async function main() {
  const user = await db.profile.create({
    data: {
      email: 'test@atlas.dev',
      firstName: 'Test',
      lastName: 'User',
    },
  });

  console.log('Seeded:', user.email);
}

main()
  .catch(console.error)
  .finally(async () => {
    // If you need to explicitly disconnect the pool/client:
    await db.$disconnect();
    process.exit();
  });
