'use client';

import React from 'react';
import { useSubView } from '@web/hooks/view';
import { extractUuidFromParam } from '@repo/utils';
import { AgendaView, ScheduleEventData } from '@mantine/schedule';
import dayjs from 'dayjs';
import { useStoreEvent } from '@repo/store';

export default function CalendarList() {
  const { subViewValue, showSubViewPave } = useSubView();
  const calendarId = extractUuidFromParam(subViewValue || '');
  const events = useStoreEvent((s) => s.events);

  const scheduleEvents: ScheduleEventData[] = (events || [])
    .filter((ei) => ei.calendarId == calendarId)
    .map((ei2) => ({
      ...ei2,
      recurringEventId: '',
      recurrenceId: '',
      color: '',
    }));

  return events === undefined ? (
    <>loading</>
  ) : !scheduleEvents?.length ? (
    <>no events for {calendarId}</>
  ) : (
    <AgendaView
      rangeStart={dayjs().startOf('month').format('YYYY-MM-DD')}
      rangeEnd={dayjs().endOf('month').format('YYYY-MM-DD')}
      events={scheduleEvents}
    />
  );
}
