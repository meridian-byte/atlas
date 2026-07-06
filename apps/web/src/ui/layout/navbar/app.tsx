'use client';

import React from 'react';
import {
  ActionIcon,
  AppShellSection,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Group,
  ScrollArea,
  Stack,
} from '@mantine/core';
import { SHELL_VALUES } from '@web/constants';
import { ICON_SIZE, ICON_STROKE_WIDTH, ICON_WRAPPER_SIZE } from '@repo/constants';
import { IconChevronDown, IconLogout, IconPlus, IconSearch, IconUser } from '@tabler/icons-react';
import AccordionNavbar from '@web/ui/accordion/navbar';

export default function App() {
  return (
    <>
      <AppShellSection>
        <NavbarHeader />
      </AppShellSection>

      <Divider size={3} />

      <AppShellSection
        grow
        component={ScrollArea}
        scrollbars={'y'}
        // h={`calc(100vh - ${28.4 + 1 + 28.4 + 1 + SHELL_VALUES.FOOTER.HEIGHT}px)`}
      >
        <NavbarMain />
      </AppShellSection>

      {/* <Divider /> */}

      {/* <AppShellSection>
        <NavbarFooter />
      </AppShellSection> */}
    </>
  );
}

function NavbarHeader() {
  return (
    <Stack p={0} gap={0}>
      <Group wrap="nowrap" gap={0}>
        <Box style={{ flex: 1 }}>
          <Button
            size="xs"
            fullWidth
            variant="subtle"
            color="dark"
            leftSection={<IconUser size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />}
            justify="start"
            pl={5}
            radius={0}
          >
            Sign In
          </Button>
        </Box>

        <ActionIcon size={30} variant="subtle" color="red" radius={0}>
          <IconLogout size={ICON_SIZE - 4} stroke={ICON_STROKE_WIDTH} />
        </ActionIcon>
      </Group>

      <Divider size={3} />

      <Stack>
        <Button
          size="xs"
          fullWidth
          variant="subtle"
          color="dark"
          leftSection={<IconSearch size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />}
          justify="start"
          pl={5}
          radius={0}
        >
          Global Search
        </Button>
      </Stack>

      <Group wrap="nowrap" gap={0}>
        <Box style={{ flex: 1 }}>
          <Button
            size="xs"
            fullWidth
            variant="subtle"
            color="dark"
            leftSection={<IconPlus size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />}
            justify="start"
            pl={5}
            radius={0}
          >
            New Item
          </Button>
        </Box>

        <ActionIcon size={30} variant="subtle" color={'dark'} radius={0}>
          <IconChevronDown size={ICON_SIZE - 4} stroke={ICON_STROKE_WIDTH} />
        </ActionIcon>
      </Group>
    </Stack>
  );
}

function NavbarMain() {
  return (
    <ScrollArea w={SHELL_VALUES.NAVBAR.WIDTH} scrollbars={'x'}>
      <AccordionNavbar />
    </ScrollArea>
  );
}

// function NavbarFooter() {
//   return <div>NavFooter</div>;
// }
