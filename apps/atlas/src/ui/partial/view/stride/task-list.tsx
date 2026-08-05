'use client';

import React from 'react';
import { useSubView } from '@atlas/hooks/view';

export default function TaskList() {
  const { subViewValue, showSubViewStride } = useSubView();

  return <div>TaskList: {subViewValue}</div>;
}
