'use client';

import React from 'react';
import { APP_NAMES_ATLAS, ASIDE_VIEW_NAMES, ICON_SIZE, ICON_STROKE_WIDTH } from '@repo/constants';
import { useStoreView } from '@repo/store';
import { Box, Divider, NavLink, Stack, Title } from '@mantine/core';
import {
  IconCalendarEvent,
  IconCalendarRepeat,
  IconCheckbox,
  IconNote,
  IconPlus,
  IconRepeat,
} from '@tabler/icons-react';
import { useViewAside } from '@web/hook/view';

export default function App() {
  const { asideViewValue, showNewEvent, showNewNote, showNewTask } = useViewAside();

  let props = {
    asideTitle: 'Add Quick Item',
  };

  function LayoutAside({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <Box p={'xs'}>
          <Title order={1} fz={'md'} fw={500}>
            {props.asideTitle}
          </Title>
        </Box>

        <Divider size={3} />

        <div>{children}</div>
      </div>
    );
  }

  switch (asideViewValue) {
    case ASIDE_VIEW_NAMES.SEARCH:
      props.asideTitle = 'Global Search';
      return <LayoutAside>Search</LayoutAside>;

    case ASIDE_VIEW_NAMES.NEW.EVENT:
      props.asideTitle = 'Add Event';
      return <LayoutAside>event</LayoutAside>;

    case ASIDE_VIEW_NAMES.NEW.NOTE:
      props.asideTitle = 'Add Note';
      return <LayoutAside>note</LayoutAside>;

    case ASIDE_VIEW_NAMES.NEW.TASK:
      props.asideTitle = 'Add Task';
      return <LayoutAside>task</LayoutAside>;

    default:
      const createItems = [
        {
          title: APP_NAMES_ATLAS.PAVE,
          items: [
            {
              icon: IconCalendarEvent,
              label: 'Event',
              action: showNewEvent,
            },
          ],
        },
        {
          title: APP_NAMES_ATLAS.JOT,
          items: [
            {
              icon: IconNote,
              label: 'Note',
              action: showNewNote,
            },
          ],
        },
        {
          title: APP_NAMES_ATLAS.STRIDE,
          items: [
            {
              icon: IconCheckbox,
              label: 'Task',
              action: showNewTask,
            },
          ],
        },
      ];

      return (
        <LayoutAside>
          <div>
            {createItems.map((gi, i) => (
              <React.Fragment key={gi.title}>
                {i > 0 && <Divider />}

                <div>
                  <Box px={'xs'} py={5}>
                    <Title order={2} fz={'sm'} fw={500}>
                      {gi.title}
                    </Title>
                  </Box>

                  <Divider />

                  {gi.items.map((ci, i) => (
                    <React.Fragment key={ci.label}>
                      {i > 0 && <Divider />}

                      <NavLink
                        label={`Add ${ci.label}`}
                        leftSection={
                          <ci.icon
                            size={ICON_SIZE - 4}
                            stroke={ICON_STROKE_WIDTH}
                            style={{ marginTop: 2 }}
                          />
                        }
                        rightSection={<IconPlus size={ICON_SIZE - 4} stroke={ICON_STROKE_WIDTH} />}
                        onClick={ci.action}
                        color="dark"
                        px={'xs'}
                        py={3}
                        fw={500}
                        styles={{ label: { fontSize: 'var(--mantine-font-size-xs)' } }}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
          <Divider />
        </LayoutAside>
      );
  }
}
