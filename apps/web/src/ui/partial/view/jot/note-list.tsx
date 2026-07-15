'use client';

import React from 'react';
import { useSubView } from '@web/hooks/view';

export default function JotList() {
  const { subViewValue, showSubViewJot } = useSubView();

  return <div>JotList: {subViewValue}</div>;
}
