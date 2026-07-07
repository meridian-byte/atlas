'use client';

import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  ActionIcon,
  Button,
  Divider,
  Group,
  Tooltip,
} from '@mantine/core';
import { APP_NAMES_ATLAS, ICON_SIZE, ICON_STROKE_WIDTH } from '@repo/constants';
import { useStoreView } from '@repo/store';
import {
  IconChevronDown,
  IconChevronRight,
  IconCircle,
  IconExternalLink,
  IconEye,
  IconPlus,
} from '@tabler/icons-react';
import { SHELL_VALUES } from '@web/constants';
import { useView, useViewAside } from '@web/hook/view';
import { useState } from 'react';

export default function Navbar() {
  const [values, setValues] = useState<string[]>([]);

  const { showNewEvent, showNewNote, showNewTask } = useViewAside();
  const { showViewPave, showViewJot, showViewStride, showViewPrime, showViewTally } = useView();

  const data = [
    {
      value: APP_NAMES_ATLAS.PAVE,
      description: 'Pave content',
      actions: {
        create: showNewEvent,
        switch: showViewPave,
      },
    },
    {
      value: APP_NAMES_ATLAS.JOT,
      description: 'Jot content',
      actions: {
        create: showNewNote,
        switch: showViewJot,
      },
    },
    {
      value: APP_NAMES_ATLAS.STRIDE,
      description: 'Stride content',
      actions: {
        create: showNewTask,
        switch: showViewStride,
      },
    },
    {
      value: APP_NAMES_ATLAS.PRIME,
      description: 'Prime content',
      actions: {
        create: () => {},
        switch: showViewPrime,
      },
    },
    {
      value: APP_NAMES_ATLAS.TALLY,
      description: 'Tally content',
      actions: {
        create: () => {},
        switch: showViewTally,
      },
    },
  ];

  const items = data.map((item) => {
    const props = {
      icon: values.includes(item.value) ? IconChevronDown : IconChevronRight,
    };

    return (
      <AccordionItem key={item.value} value={item.value}>
        <AccordionControl icon={<props.icon size={ICON_SIZE} />}>
          <Group justify="space-between">
            {item.value}

            <Group component={'span'} justify="end" gap={0}>
              <Tooltip label={`Add item in ${item.value}`}>
                <ActionIcon
                  component="span"
                  size={30}
                  radius={0}
                  color="dark"
                  variant="subtle"
                  onClick={(e) => {
                    e.stopPropagation();
                    item.actions.create();
                  }}
                >
                  <IconPlus size={ICON_SIZE - 4} stroke={ICON_STROKE_WIDTH} />
                </ActionIcon>
              </Tooltip>

              <Tooltip label={`Switch to ${item.value}`}>
                <ActionIcon
                  component="span"
                  size={30}
                  radius={0}
                  color="dark"
                  variant="subtle"
                  onClick={(e) => {
                    e.stopPropagation();
                    item.actions.switch();
                  }}
                >
                  <IconEye size={ICON_SIZE - 4} stroke={ICON_STROKE_WIDTH} />
                </ActionIcon>
              </Tooltip>

              {/* <Tooltip label={`Open ${item.value} in new tab`}>
                <ActionIcon
                  component="span"
                  size={30}
                  radius={0}
                  color="dark"
                  variant="subtle"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconExternalLink size={ICON_SIZE - 4} stroke={ICON_STROKE_WIDTH} />
                </ActionIcon>
              </Tooltip> */}
            </Group>
          </Group>
        </AccordionControl>
        <AccordionPanel>{item.description}</AccordionPanel>
      </AccordionItem>
    );
  });

  return (
    <Accordion
      order={3}
      value={values}
      onChange={setValues}
      chevronIconSize={ICON_SIZE}
      chevron={null}
      multiple
      styles={{
        control: { height: 30, padding: 0, paddingLeft: '5px' },
        label: { fontSize: 'var(--mantine-font-size-xs)', fontWeight: '500' },
        panel: {
          backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))',
        },
      }}
    >
      {items}
    </Accordion>
  );
}
