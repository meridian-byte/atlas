/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import { LayoutMain } from '@repo/ui';
import PageHome from '@api/ui/page/home';

export default function Home() {
  return (
    <HomeLayout>
      <PageHome />
    </HomeLayout>
  );
}

async function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutMain>
      <div>
        <main>{children}</main>
      </div>
    </LayoutMain>
  );
}
