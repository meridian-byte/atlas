'use client';

import { Menu, MenuTarget, MenuDropdown, MenuItem, MenuProps } from '@mantine/core';
import { ASIDE_VIEW_NAMES, ICON_SIZE, ICON_STROKE_WIDTH } from '@repo/constants';
import { useStoreView } from '@repo/store';
import {
  IconCalendarEvent,
  IconCheck,
  IconCheckbox,
  IconNote,
  IconPlus,
} from '@tabler/icons-react';

export default function New({ children, ...restProps }: { children: React.ReactNode } & MenuProps) {
  const asideViewValue = useStoreView((s) => s.view?.asideView);
  const setAsideViewValue = useStoreView((s) => s.setAsideViewValue);

  const menuItems = [
    {
      icon: IconCalendarEvent,
      label: 'Event',
      action: () => {
        if (asideViewValue != ASIDE_VIEW_NAMES.NEW.EVENT) {
          setAsideViewValue(ASIDE_VIEW_NAMES.NEW.EVENT);
        }
      },
    },
    {
      icon: IconNote,
      label: 'Note',
      action: () => {
        if (asideViewValue != ASIDE_VIEW_NAMES.NEW.NOTE) {
          setAsideViewValue(ASIDE_VIEW_NAMES.NEW.NOTE);
        }
      },
    },
    {
      icon: IconCheckbox,
      label: 'Task',
      action: () => {
        if (asideViewValue != ASIDE_VIEW_NAMES.NEW.TASK) {
          setAsideViewValue(ASIDE_VIEW_NAMES.NEW.TASK);
        }
      },
    },
  ];

  return (
    <Menu
      shadow="md"
      width={200}
      {...restProps}
      trigger="click-hover"
      position="top-start"
      styles={{
        item: {
          height: 28,
          padding: 6,
          fontSize: 'var(--mantine-font-size-xs)',
          fontWeight: 500,
        },
        itemSection: {
          color: 'dark',
        },
      }}
    >
      <MenuTarget>
        <div>{children}</div>
      </MenuTarget>

      <MenuDropdown>
        {menuItems.map((mi) => (
          <MenuItem
            key={mi.label}
            leftSection={<mi.icon size={ICON_SIZE - 4} stroke={ICON_STROKE_WIDTH} />}
            rightSection={<IconPlus size={ICON_SIZE - 4} stroke={ICON_STROKE_WIDTH} />}
            onClick={mi.action}
          >
            Quick {mi.label}
          </MenuItem>
        ))}
      </MenuDropdown>
    </Menu>
  );
}
