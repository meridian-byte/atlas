import { db } from './client';

async function main() {
  const user = await db.user.create({
    data: {
      email: 'test@atlas.dev',
      name: 'Test User',
      memberships: {
        create: {
          role: 'OWNER',
          workspace: {
            create: {
              name: 'Default Workspace',
              owner: {
                connect: {
                  email: 'test@atlas.dev',
                },
              },
            },
          },
        },
      },
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
