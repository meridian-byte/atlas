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

export default function App() {
  const asideViewValue = useStoreView((s) => s.view?.asideView);
  const setAsideViewValue = useStoreView((s) => s.setAsideViewValue);

  let props = {
    asideTitle: 'Quick Create',
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
      props.asideTitle = 'Quick Event';
      return <LayoutAside>New event</LayoutAside>;

    case ASIDE_VIEW_NAMES.NEW.NOTE:
      props.asideTitle = 'Quick Note';
      return <LayoutAside>New note</LayoutAside>;

    case ASIDE_VIEW_NAMES.NEW.TASK:
      props.asideTitle = 'Quick Task';
      return <LayoutAside>New task</LayoutAside>;

    default:
      const createItems = [
        {
          title: APP_NAMES_ATLAS.PAVE,
          items: [
            {
              icon: IconCalendarEvent,
              label: 'Event',
              action: () => {
                if (asideViewValue != ASIDE_VIEW_NAMES.NEW.EVENT) {
                  setAsideViewValue(ASIDE_VIEW_NAMES.NEW.EVENT);
                }
              },
            },
          ],
        },
        {
          title: APP_NAMES_ATLAS.JOT,
          items: [
            {
              icon: IconNote,
              label: 'Note',
              action: () => {
                if (asideViewValue != ASIDE_VIEW_NAMES.NEW.NOTE) {
                  setAsideViewValue(ASIDE_VIEW_NAMES.NEW.NOTE);
                }
              },
            },
          ],
        },
        {
          title: APP_NAMES_ATLAS.STRIDE,
          items: [
            {
              icon: IconCheckbox,
              label: 'Task',
              action: () => {
                if (asideViewValue != ASIDE_VIEW_NAMES.NEW.TASK) {
                  setAsideViewValue(ASIDE_VIEW_NAMES.NEW.TASK);
                }
              },
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
                        label={`Quick ${ci.label}`}
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
