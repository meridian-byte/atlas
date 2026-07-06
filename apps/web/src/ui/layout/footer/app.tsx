'use client';

import React from 'react';
import { ActionIcon, AppShellSection, Divider, Group, ScrollArea } from '@mantine/core';
import { SHELL_VALUES } from '@web/constants';
import { ICON_SIZE, ICON_STROKE_WIDTH } from '@repo/constants';
import { IconBell, IconSettings } from '@tabler/icons-react';
import ButtonAppshellNavbar from '@web/ui/button/appshell/navbar';
import ButtonFullscreen from '@web/ui/button/fullscreen';
import IndicatorTheme from '@web/ui/indicator/theme';
import IndicatorNetworkStatus from '@web/ui/indicator/network-status';
import { useStoreSyncStatus } from '@repo/store';
import { Box } from '@mantine/core';

export default function App() {
  const syncStatus = useStoreSyncStatus((s) => s.syncStatus);

  return (
    <Box>
      <Group
        grow
        preventGrowOverflow={false}
        gap={0}
        w={SHELL_VALUES.NAVBAR.WIDTH}
        style={{ borderRight: '1px solid var(--mantine-color-default-border)' }}
      >
        <ButtonAppshellNavbar />

        <ActionIcon size={SHELL_VALUES.FOOTER.HEIGHT} radius={0} color="dark" variant="subtle">
          <IconSettings size={SHELL_VALUES.FOOTER.HEIGHT - 8} stroke={ICON_STROKE_WIDTH} />
        </ActionIcon>

        <ButtonFullscreen />

        <IndicatorTheme />

        <IndicatorNetworkStatus props={{ syncStatus }} />

        <ActionIcon size={SHELL_VALUES.FOOTER.HEIGHT} radius={0} color="dark" variant="subtle">
          <IconBell size={SHELL_VALUES.FOOTER.HEIGHT - 8} stroke={ICON_STROKE_WIDTH} />
        </ActionIcon>
      </Group>
    </Box>
  );
}
