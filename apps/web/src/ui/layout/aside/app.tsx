'use client';

import React from 'react';
import { APP_NAMES_ATLAS, ASIDE_VIEW_NAMES, ICON_SIZE, ICON_STROKE_WIDTH } from '@repo/constants';
import { useStoreView } from '@repo/store';
import { Box, Divider, NavLink, Stack, Title } from '@mantine/core';
import {
  IconCalendar,
  IconCalendarEvent,
  IconCalendarRepeat,
  IconCheckbox,
  IconFolder,
  IconListCheck,
  IconNote,
  IconPlus,
  IconRepeat,
} from '@tabler/icons-react';
import { useViewAside } from '@web/hook/view';

export default function App() {
  const { asideViewValue, showAsideViewPave, showAsideViewJot, showAsideViewStride } =
    useViewAside();

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
      return <LayoutAside>global search</LayoutAside>;

    case ASIDE_VIEW_NAMES.NEW.PAVE.EVENT:
      props.asideTitle = 'Add Event';
      return <LayoutAside>add event</LayoutAside>;

    case ASIDE_VIEW_NAMES.NEW.PAVE.CALENDAR:
      props.asideTitle = 'Add Calendar';
      return <LayoutAside>add calendar</LayoutAside>;

    case ASIDE_VIEW_NAMES.NEW.JOT.NOTE:
      props.asideTitle = 'Add Note';
      return <LayoutAside>add note</LayoutAside>;

    case ASIDE_VIEW_NAMES.NEW.JOT.FOLDER:
      props.asideTitle = 'Add Note Folder';
      return <LayoutAside>add note folder</LayoutAside>;

    case ASIDE_VIEW_NAMES.NEW.STRIDE.TASK:
      props.asideTitle = 'Add Task';
      return <LayoutAside>add task</LayoutAside>;

    case ASIDE_VIEW_NAMES.NEW.STRIDE.TASK_LIST:
      props.asideTitle = 'Add Task List';
      return <LayoutAside>add task list</LayoutAside>;

    default:
      const createItems = [
        {
          title: APP_NAMES_ATLAS.PAVE,
          items: [
            {
              icon: IconCalendarEvent,
              label: 'Event',
              action: () => showAsideViewPave(ASIDE_VIEW_NAMES.NEW.PAVE.EVENT),
            },
            {
              icon: IconCalendar,
              label: 'Calendar',
              action: () => showAsideViewPave(ASIDE_VIEW_NAMES.NEW.PAVE.CALENDAR),
            },
          ],
        },
        {
          title: APP_NAMES_ATLAS.JOT,
          items: [
            {
              icon: IconNote,
              label: 'Note',
              action: () => showAsideViewJot(ASIDE_VIEW_NAMES.NEW.JOT.NOTE),
            },
            {
              icon: IconFolder,
              label: 'Note Folder',
              action: () => showAsideViewJot(ASIDE_VIEW_NAMES.NEW.JOT.FOLDER),
            },
          ],
        },
        {
          title: APP_NAMES_ATLAS.STRIDE,
          items: [
            {
              icon: IconCheckbox,
              label: 'Task',
              action: () => showAsideViewStride(ASIDE_VIEW_NAMES.NEW.STRIDE.TASK),
            },
            {
              icon: IconListCheck,
              label: 'Task List',
              action: () => showAsideViewStride(ASIDE_VIEW_NAMES.NEW.STRIDE.TASK_LIST),
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
