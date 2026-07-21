'use client';

import React, { useState } from 'react';
import { useStoreView } from '@repo/store';
import { useSubView } from '@web/hooks/view';
import { Schedule, ScheduleEventData, ScheduleViewLevel } from '@mantine/schedule';
import { generateUUID } from '@repo/utils';
import { Box, HoverCard, HoverCardDropdown, HoverCardTarget, UnstyledButton } from '@mantine/core';
import EventDetails from './event-details';
import dayjs from 'dayjs';

export default function Main() {
  // views
  const subViewValue = useStoreView((s) => s.view?.subView);
  const { showSubViewPave } = useSubView();

  const handleChange = (v: string) => {
    showSubViewPave(v);
  };

  // events drag & drop
  const [events, setEvents] = useState(eventsList);

  const handleEventUpdate = ({
    eventId,
    newStart,
    newEnd,
  }: {
    eventId: string | number;
    newStart: string;
    newEnd: string;
  }) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, start: newStart, end: newEnd } : event,
      ),
    );
  };

  // other

  const [date, setDate] = useState(new Date());

  return !subViewValue ? null : (
    <Schedule
      withAgenda
      layout="responsive"

      view={subViewValue as ScheduleViewLevel}
      onViewChange={(v) => handleChange(v)}

      date={date}
      onDateChange={(newDate) => setDate(new Date(newDate))}
      withEventsDragAndDrop

      events={events}
      onEventDrop={handleEventUpdate}
      withEventResize
      onEventResize={handleEventUpdate}

      dayViewProps={{
        startTime: '05:00:00',
        endTime: '23:00:00',
        intervalMinutes: 15,
        slotHeight: 80,

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
      monthViewProps={{
        withWeekNumbers: false,
        firstDayOfWeek: 1,

        renderEvent: (event, props) => {
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
      }}
    />
  );
}

function isAllDayEvent(event: ScheduleEventData) {
  const start = dayjs(event.start);
  const end = dayjs(event.end);
  return start.isSame(start.startOf('day')) && end.isSame(end.startOf('day'));
}

export const eventsList: (ScheduleEventData & any)[] = [
  {
    id: 1,
    title: 'Company Retreat',
    start: '2026-07-03 00:00:00',
    end: '2026-07-04 00:00:00',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Team Meeting',
    start: '2026-07-03 09:00:00',
    end: '2026-07-03 10:00:00',
    color: 'green',
  },
  {
    id: 3,
    title: 'Project Deadline',
    start: '2026-07-09 00:00:00',
    end: '2026-07-10 00:00:00',
    color: 'red',
  },
  {
    id: 4,
    title: 'Lunch with Client',
    start: '2026-07-09 12:00:00',
    end: '2026-07-09 13:30:00',
    color: 'orange',
  },
  {
    id: 5,
    title: 'Code Review',
    start: '2026-07-09 15:00:00',
    end: '2026-07-09 16:00:00',
    color: 'violet',
  },
  {
    id: 6,
    title: 'Sprint Planning',
    start: '2026-07-16 10:00:00',
    end: '2026-07-16 11:30:00',
    color: 'cyan',
  },
  {
    id: 7,
    title: 'Design Workshop',
    start: '2026-07-16 14:00:00',
    end: '2026-07-16 16:00:00',
    color: 'grape',
  },
  {
    id: 8,
    title: 'Conference',
    start: '2026-07-21 00:00:00',
    end: '2026-07-22 00:00:00',
    color: 'pink',
  },

  {
    id: generateUUID(),
    title: 'Team Standup',
    start: '2026-07-03 09:00:00',
    end: '2026-07-03 09:30:00',
    color: 'blue',
    // payload
    description: 'Daily team sync meeting',
    attendees: ['Alice', 'Bob', 'Charlie'],
    location: 'Conference Room A',
  },
  {
    id: generateUUID(),
    title: 'Design Workshop',
    start: '2026-07-06 10:00:00',
    end: '2026-07-06 12:00:00',
    color: 'grape',
    // payload
    description: 'Collaborative design thinking session',
    attendees: ['Diana', 'Eve', 'Frank'],
    location: 'Creative Space',
  },
  {
    id: generateUUID(),
    title: 'Client Presentation',
    start: '2026-07-11 14:00:00',
    end: '2026-07-11 15:30:00',
    color: 'green',
    // payload
    description: 'Q4 progress presentation to client',
    attendees: ['Grace', 'Henry'],
    location: 'Zoom',
  },
  {
    id: generateUUID(),
    title: 'Sprint Planning',
    start: '2026-07-16 10:00:00',
    end: '2026-07-16 12:00:00',
    color: 'orange',
    // payload
    description: 'Plan next sprint tasks and priorities',
    attendees: ['Alice', 'Charlie', 'Bob'],
    location: 'Dev Lab',
  },
  {
    id: generateUUID(),
    title: 'Code Review',
    start: '2026-07-19 16:00:00',
    end: '2026-07-19 17:00:00',
    color: 'cyan',
    // payload
    description: 'Review pull requests from this week',
    attendees: ['Alice', 'Charlie'],
    location: 'Dev Lab',
  },
  {
    id: generateUUID(),
    title: 'Tech Conference',
    start: '2026-07-23 00:00:00',
    end: '2026-07-23 23:59:59',
    color: 'pink',
    // payload
    description: 'Annual tech conference',
    attendees: ['All Team'],
    location: 'Convention Center',
  },
];
