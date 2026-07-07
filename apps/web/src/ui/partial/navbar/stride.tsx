'use client';

import { ActionIcon, Box, Divider, Group, NavLink, Stack, Title } from '@mantine/core';
import {
  ASIDE_VIEW_NAMES,
  ICON_SIZE,
  ICON_STROKE_WIDTH,
  ICON_WRAPPER_SIZE,
  SUBVIEW_NAMES,
} from '@repo/constants';
import { capitalizeWords } from '@repo/utils';
import {
  IconCalendarCancel,
  IconCalendarDown,
  IconCalendarShare,
  IconCircleCheck,
  IconInbox,
  IconPlus,
} from '@tabler/icons-react';
import { useSubView, useViewAside } from '@web/hook/view';
import React from 'react';

export default function Stride() {
  const { showSubViewStride } = useSubView();
  const { showAsideViewStride } = useViewAside();

  const navLinks = [
    {
      icon: IconInbox,
      label: capitalizeWords(SUBVIEW_NAMES.STRIDE.INBOX),
      action: () => showSubViewStride(SUBVIEW_NAMES.STRIDE.INBOX),
    },
    {
      icon: IconCalendarDown,
      label: capitalizeWords(SUBVIEW_NAMES.STRIDE.TODAY),
      action: () => showSubViewStride(SUBVIEW_NAMES.STRIDE.TODAY),
    },
    {
      icon: IconCalendarShare,
      label: capitalizeWords(SUBVIEW_NAMES.STRIDE.UPCOMING),
      action: () => showSubViewStride(SUBVIEW_NAMES.STRIDE.UPCOMING),
    },
    {
      icon: IconCalendarCancel,
      label: capitalizeWords(SUBVIEW_NAMES.STRIDE.OVERDUE),
      action: () => showSubViewStride(SUBVIEW_NAMES.STRIDE.OVERDUE),
    },
    {
      icon: IconCircleCheck,
      label: capitalizeWords(SUBVIEW_NAMES.STRIDE.COMPLETE),
      action: () => showSubViewStride(SUBVIEW_NAMES.STRIDE.COMPLETE),
    },
  ];

  const sampleTaskLists = [
    {
      label: 'Household',
      action: () => showSubViewStride(`list: ${'Household'}`),
    },
    {
      label: 'Shopping',
      action: () => showSubViewStride(`list: ${'Shopping'}`),
    },
    {
      label: 'Health & Fitness',
      action: () => showSubViewStride(`list: ${'Health & Fitness'}`),
    },
    {
      label: 'School',
      action: () => showSubViewStride(`list: ${'School'}`),
    },
    {
      label: 'Work',
      action: () => showSubViewStride(`list: ${'Work'}`),
    },
  ];

  return (
    <Box pl={14}>
      <Stack gap={'xs'} style={{ borderLeft: '1px solid var(--mantine-color-default-border)' }}>
        <Box>
          {navLinks.map((nl, i) => (
            <React.Fragment key={nl.label}>
              {i > 0 && <Divider />}

              <NavLink
                label={nl.label}
                color="dark"
                px={'xs'}
                py={3}
                fw={500}
                styles={{ label: { fontSize: 'var(--mantine-font-size-xs)' } }}
                onClick={nl.action}
                leftSection={
                  <nl.icon
                    size={ICON_SIZE - 4}
                    stroke={ICON_STROKE_WIDTH}
                    style={{ marginTop: 2 }}
                  />
                }
              />
            </React.Fragment>
          ))}
        </Box>

        <div>
          <Group
            justify="space-between"
            pl={'xs'}
            // bg={'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))'}
          >
            <Title order={2} fz={'sm'} fw={500} c={'dimmed'}>
              Task Lists
            </Title>

            <Group justify="end" gap={0}>
              <ActionIcon
                size={30}
                color="dark"
                variant="subtle"
                radius={0}
                onClick={() => showAsideViewStride(ASIDE_VIEW_NAMES.NEW.STRIDE.TASK_LIST)}
              >
                <IconPlus size={ICON_SIZE - 4} stroke={ICON_STROKE_WIDTH} />
              </ActionIcon>
            </Group>
          </Group>

          <div>
            {sampleTaskLists.map((nl, i) => (
              <React.Fragment key={nl.label}>
                {i > 0 && <Divider />}

                <NavLink
                  label={nl.label}
                  color="dark"
                  px={'xs'}
                  py={3}
                  fw={500}
                  styles={{ label: { fontSize: 'var(--mantine-font-size-xs)' } }}
                  onClick={nl.action}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </Stack>
    </Box>
  );
}
