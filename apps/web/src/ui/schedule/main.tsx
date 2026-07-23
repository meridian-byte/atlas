'use client';

import React, { useState } from 'react';
import { useStoreEvent, useStoreView } from '@repo/store';
import { useSubView } from '@web/hooks/view';
import { Schedule as BaseSchedule, ScheduleEventData, ScheduleViewLevel } from '@mantine/schedule';
import { generateUUID } from '@repo/utils';
import { Box, HoverCard, HoverCardDropdown, HoverCardTarget, UnstyledButton } from '@mantine/core';
import EventDetails from './event-details';
import dayjs from 'dayjs';
import { SyncStatus } from '@repo/types';

export default function Main() {
  // views
  const subViewValue = useStoreView((s) => s.view?.subView);
  const { showSubViewPave } = useSubView();

  const handleChange = (v: string) => {
    showSubViewPave(v);
  };

  // events drag & drop
  const events = useStoreEvent((s) => s.events);
  const setEvents = useStoreEvent((s) => s.setEvents);

  const eventItems: ScheduleEventData[] = (events || []).map((ei2) => ({
    ...ei2,
    start: dayjs(ei2.start).format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs(ei2.end).format('YYYY-MM-DD HH:mm:ss'),
    recurringEventId: '',
    recurrenceId: '',
    color: '',
  }));

  const handleEventUpdate = ({
    eventId,
    newStart,
    newEnd,
  }: {
    eventId: string | number;
    newStart: string;
    newEnd: string;
  }) => {
    if (!events || !events.length) return;

    // Map directly over the DB events state
    setEvents(
      events.map((event) => {
        if (event.id !== eventId) return event;
        return {
          ...event,
          start: new Date(newStart).toISOString() as any,
          end: new Date(newEnd).toISOString() as any,

          syncStatus: SyncStatus.PENDING,
          updatedAt: new Date().toDateString() as any,
        };
      }),
    );
  };

  // other

  const [date, setDate] = useState(new Date());

  return !subViewValue ? null : (
    <SafeSchedule
      withAgenda
      layout="responsive"

      events={eventItems}

      view={subViewValue as ScheduleViewLevel}
      onViewChange={(v) => handleChange(v)}

      date={date}
      onDateChange={(newDate) => setDate(new Date(newDate))}

      withEventsDragAndDrop
      onEventDrop={handleEventUpdate}

      withEventResize
      onEventResize={handleEventUpdate}

      dayViewProps={{
        startTime: '05:00:00',
        endTime: '23:00:00',
        intervalMinutes: 15,
        slotHeight: 80,
        withSubHourGridLines: false,

        renderEvent: (event, props) => (
          <HoverCard width={280} position="top" closeDelay={0}>
            <HoverCardTarget>
              <UnstyledButton {...props} />
            </HoverCardTarget>

            <HoverCardDropdown>
              <EventDetails event={event} />
            </HoverCardDropdown>
          </HoverCard>
        ),
      }}

      weekViewProps={{
        startTime: '05:00:00',
        endTime: '23:00:00',
        intervalMinutes: 30,
        weekdayFormat: 'dd',
        highlightToday: true,
        withWeekendDays: true,
        withSubHourGridLines: false,

        renderEvent: (event, props) => (
          <HoverCard width={280} position="right" closeDelay={0}>
            <HoverCardTarget>
              <UnstyledButton {...props} />
            </HoverCardTarget>

            <HoverCardDropdown>
              <EventDetails event={event} />
            </HoverCardDropdown>
          </HoverCard>
        ),
      }}

      monthViewProps={
        {
          withWeekNumbers: false,
          firstDayOfWeek: 1,

          renderEvent: (event: any, props: any) => {
            const { children, className, style, ...others } = props;

            return (
              <HoverCard width={280} position="right" closeDelay={0}>
                <HoverCardTarget>
                  {isAllDayEvent(event) ? (
                    <UnstyledButton {...props} />
                  ) : (
                    <UnstyledButton
                      {...others}
                      style={{
                        ...style,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 12,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        pointerEvents: 'all',
                        cursor: 'pointer',
                        paddingInline: 2,
                        fontWeight: 500,
                      }}
                    >
                      <Box
                        component="span"
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: `var(--event-bg)`,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ width: 28, flexShrink: 0 }}>
                        {dayjs(event.start).format('h:mm')}
                      </span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {event.title}
                      </span>
                    </UnstyledButton>
                  )}
                </HoverCardTarget>

                <HoverCardDropdown>
                  <EventDetails event={event} />
                </HoverCardDropdown>
              </HoverCard>
            );
          },

          // Explicitly disable/strip top-level props that YearView doesn't support
          withAgenda: undefined,
          withEventsDragAndDrop: undefined,
          onEventDrop: undefined,
          withEventResize: undefined,
          onEventResize: undefined,
        } as any
      }

      yearViewProps={
        {
          firstDayOfWeek: 1,

          // Explicitly disable/strip top-level props that YearView doesn't support
          withAgenda: undefined,
          withEventsDragAndDrop: undefined,
          onEventDrop: undefined,
          withEventResize: undefined,
          onEventResize: undefined,
        } as any
      }
    />
  );
}

function isAllDayEvent(event: ScheduleEventData) {
  const start = dayjs(event.start);
  const end = dayjs(event.end);
  return start.isSame(start.startOf('day')) && end.isSame(end.startOf('day'));
}

// Derive prop types directly from Schedule
type ScheduleProps = React.ComponentPropsWithoutRef<typeof BaseSchedule>;

const SafeSchedule = ({ ...props }: ScheduleProps) => {
  // If the base component expects these as custom config objects rather than top-level props:
  return <BaseSchedule {...props} />;
};
