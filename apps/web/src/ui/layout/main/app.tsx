'use client';

import React from 'react';
import { Box, Container } from '@mantine/core';
import { useStoreView } from '@repo/store';
import { APP_NAMES_ATLAS, ASIDE_VIEW_NAMES, SUBVIEW_NAMES } from '@repo/constants';
import { useSubView } from '@web/hook/view';
import PartialViewStrideTaskList from '@web/ui/partial/view/stride/task-list';
import PartialViewJotNoteList from '@web/ui/partial/view/jot/note-list';
import PartialViewPaveCalendarList from '@web/ui/partial/view/pave/calendar-list';

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
  const { subViewValue, showSubViewPave } = useSubView();

  switch (subViewValue) {
    case SUBVIEW_NAMES.PAVE.DAY:
      return <LayoutMain>day</LayoutMain>;

    case SUBVIEW_NAMES.PAVE.WEEK:
      return <LayoutMain>week</LayoutMain>;

    case SUBVIEW_NAMES.PAVE.MONTH:
      return <LayoutMain>month</LayoutMain>;

    default:
      if (subViewValue?.includes('calendar: ')) {
        return (
          <LayoutMain>
            <PartialViewPaveCalendarList />
          </LayoutMain>
        );
      } else {
        return <LayoutMain>Pave Home</LayoutMain>;
      }
  }
}

function ViewJot() {
  const { subViewValue, showSubViewStride } = useSubView();

  switch (subViewValue) {
    default:
      if (subViewValue?.includes('note: ')) {
        return (
          <LayoutMain>
            <PartialViewJotNoteList />
          </LayoutMain>
        );
      } else {
        return <LayoutMain>Jot Home</LayoutMain>;
      }
  }
}

function ViewStride() {
  const { subViewValue, showSubViewStride } = useSubView();

  switch (subViewValue) {
    case SUBVIEW_NAMES.STRIDE.INBOX:
      return <LayoutMain>inbox</LayoutMain>;

    case SUBVIEW_NAMES.STRIDE.TODAY:
      return <LayoutMain>today</LayoutMain>;

    case SUBVIEW_NAMES.STRIDE.UPCOMING:
      return <LayoutMain>upcoming</LayoutMain>;

    case SUBVIEW_NAMES.STRIDE.OVERDUE:
      return <LayoutMain>overdue</LayoutMain>;

    case SUBVIEW_NAMES.STRIDE.COMPLETE:
      return <LayoutMain>complete</LayoutMain>;

    default:
      if (subViewValue?.includes('list: ')) {
        return (
          <LayoutMain>
            <PartialViewStrideTaskList />
          </LayoutMain>
        );
      } else {
        return <LayoutMain>Stride Home</LayoutMain>;
      }
  }
}

function ViewPrime() {
  return <LayoutMain>prime</LayoutMain>;
}

function ViewTally() {
  return <LayoutMain>tally</LayoutMain>;
}
