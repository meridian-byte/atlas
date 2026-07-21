'use client';

import { ActionIcon, Box, Divider, Group, NavLink, Stack, Title, Tooltip } from '@mantine/core';
import {
  ASIDE_VIEW_NAMES,
  ICON_SIZE,
  ICON_STROKE_WIDTH,
  ICON_WRAPPER_SIZE,
  SUBVIEW_NAMES,
} from '@repo/constants';
import { capitalizeWords } from '@repo/utils';
import {
  IconCalendar,
  IconCalendarCancel,
  IconCalendarDown,
  IconCalendarPlus,
  IconCalendarShare,
  IconCircleCheck,
  IconInbox,
  IconLayoutCards,
  IconLayoutDistributeHorizontal,
  IconLayoutGrid,
  IconLayoutList,
  IconPlus,
} from '@tabler/icons-react';
import { useSubView, useViewAside } from '@web/hooks/view';
import React from 'react';
import LayoutPartialNavbar from '@web/ui/layout/partial/navbar';

export default function Pave() {
  const { subViewValue, showSubViewPave } = useSubView();
  const { showAsideViewPave } = useViewAside();

  const navLinks = [
    {
      icon: IconLayoutDistributeHorizontal,
      label: capitalizeWords(SUBVIEW_NAMES.PAVE.DAY),
      action: () => showSubViewPave(SUBVIEW_NAMES.PAVE.DAY),
    },
    {
      icon: IconLayoutList,
      label: capitalizeWords(SUBVIEW_NAMES.PAVE.WEEK),
      action: () => showSubViewPave(SUBVIEW_NAMES.PAVE.WEEK),
    },
    {
      icon: IconLayoutGrid,
      label: capitalizeWords(SUBVIEW_NAMES.PAVE.MONTH),
      action: () => showSubViewPave(SUBVIEW_NAMES.PAVE.MONTH),
    },
    {
      icon: IconLayoutCards,
      label: capitalizeWords(SUBVIEW_NAMES.PAVE.YEAR),
      action: () => showSubViewPave(SUBVIEW_NAMES.PAVE.YEAR),
    },
  ];

  const sampleCalendars = [
    {
      label: 'Holidays (US)',
      action: () => showSubViewPave(`calendar: ${'Holidays (US)'}`),
    },
    {
      label: 'Holidays (UK)',
      action: () => showSubViewPave(`calendar: ${'Holidays (UK)'}`),
    },
    {
      label: 'Birthdays',
      action: () => showSubViewPave(`calendar: ${'Birthdays'}`),
    },
  ];

  return (
    <LayoutPartialNavbar>
      <Stack gap={'xs'}>
        <Box>
          {navLinks.map((nl, i) => {
            const active = nl.label.toLocaleLowerCase() == subViewValue;

            return (
              <React.Fragment key={nl.label}>
                {i > 0 && <Divider />}

                <NavLink
                  label={nl.label}
                  color="dark"
                  px={'xs'}
                  py={3}
                  fw={500}
                  styles={{
                    label: {
                      fontSize: 'var(--mantine-font-size-xs)',
                      color: active ? 'var(--mantine-color-blue-6)' : undefined,
                    },
                  }}
                  onClick={nl.action}
                  leftSection={
                    <div style={{ color: active ? 'var(--mantine-color-blue-6)' : undefined }}>
                      <nl.icon
                        size={ICON_SIZE - 4}
                        stroke={ICON_STROKE_WIDTH}
                        style={{ marginTop: 2 }}
                      />
                    </div>
                  }
                />
              </React.Fragment>
            );
          })}
        </Box>

        <div>
          <Group justify="space-between" pl={'xs'}>
            <Title order={2} fz={'sm'} fw={500} c={'dimmed'}>
              Calendars
            </Title>

            <Group justify="end" gap={0}>
              <Tooltip label={`Add calendar`}>
                <ActionIcon
                  size={30}
                  color="dark"
                  variant="subtle"
                  radius={0}
                  onClick={() => showAsideViewPave(ASIDE_VIEW_NAMES.NEW.PAVE.CALENDAR)}
                >
                  <IconCalendar size={ICON_SIZE - 4} stroke={ICON_STROKE_WIDTH} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>

          <div>
            {sampleCalendars.map((sc, i) => (
              <React.Fragment key={sc.label}>
                {<Divider />}

                <NavLink
                  label={sc.label}
                  color="dark"
                  px={'xs'}
                  py={3}
                  fw={500}
                  styles={{ label: { fontSize: 'var(--mantine-font-size-xs)' } }}
                  onClick={sc.action}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </Stack>
    </LayoutPartialNavbar>
  );
}
