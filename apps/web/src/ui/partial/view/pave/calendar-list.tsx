'use client';

import React from 'react';
import { useSubView } from '@web/hooks/view';
import { extractUuidFromParam } from '@repo/utils';

export default function CalendarList() {
  const { subViewValue, showSubViewPave } = useSubView();
  const calendarId = extractUuidFromParam(subViewValue || '');

  return <div>Calendar event list for: {calendarId}</div>;
}
