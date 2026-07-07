'use client';

import React from 'react';
import { Box, Container } from '@mantine/core';
import { useStoreView } from '@repo/store';
import { APP_NAMES_ATLAS, ASIDE_VIEW_NAMES } from '@repo/constants';

export default function App() {
  const viewValue = useStoreView((s) => s.view?.view);

  switch (viewValue) {
    case APP_NAMES_ATLAS.PAVE:
      return <ViewPave />;

    case APP_NAMES_ATLAS.JOT:
      return <ViewJot />;

    case APP_NAMES_ATLAS.STRIDE:
      return <ViewStride />;

    case APP_NAMES_ATLAS.PRIME:
      return <ViewPrime />;

    case APP_NAMES_ATLAS.TALLY:
      return <ViewTally />;

    default:
      return <LayoutMain>App main</LayoutMain>;
  }
}

function LayoutMain({ children }: { children: React.ReactNode }) {
  return (
    <Container size={'md'} py={'xs'}>
      <Box mih={'200vh'}>{children}</Box>
    </Container>
  );
}

function ViewPave() {
  return <LayoutMain>pave</LayoutMain>;
}

function ViewJot() {
  return <LayoutMain>jot</LayoutMain>;
}

function ViewStride() {
  return <LayoutMain>stride</LayoutMain>;
}

function ViewPrime() {
  return <LayoutMain>prime</LayoutMain>;
}

function ViewTally() {
  return <LayoutMain>tally</LayoutMain>;
}
