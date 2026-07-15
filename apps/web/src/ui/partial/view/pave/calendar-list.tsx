'use client';

import React from 'react';
import { useSubView } from '@web/hooks/view';

export default function CalendarList() {
  const { subViewValue, showSubViewPave } = useSubView();

  return <div>CalendarList: {subViewValue}</div>;
}
