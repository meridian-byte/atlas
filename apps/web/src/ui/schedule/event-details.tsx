'use client';

import dayjs from 'dayjs';
import { Badge, Group, Stack, Text } from '@mantine/core';
import { ScheduleEventData } from '@mantine/schedule';

export default function EventDetails({ event }: { event: ScheduleEventData & any }) {
  return (
    <Stack gap="xs">
      {event.location && (
        <Group gap={4} justify="end">
          <Badge size="sm" variant="light">
            {event.location}
          </Badge>
        </Group>
      )}

      <Text fw={600} size="sm">
        {event.title}
      </Text>

      <Text size="xs" c="dimmed">
        {dayjs(event.start).format('MMM D, YYYY HH:mm')} – {dayjs(event.end).format('HH:mm')}
      </Text>

      {event.description && (
        <Text size="xs" c="dimmed">
          {event.description}
        </Text>
      )}

      {event.attendees && (
        <div>
          <Text size="xs" fw={500} mb={4}>
            Attendees:
          </Text>
          <Text size="xs" c="dimmed">
            {event.attendees.join(', ')}
          </Text>
        </div>
      )}
    </Stack>
  );
}
