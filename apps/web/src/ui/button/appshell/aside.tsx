'use client';

import React from 'react';
import {
  IconArrowBarLeft,
  IconArrowBarRight,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarRightCollapse,
  IconLayoutSidebarRightExpand,
} from '@tabler/icons-react';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { ICON_SIZE, ICON_STROKE_WIDTH, ICON_WRAPPER_SIZE } from '@repo/constants';
import { useStoreAppShell, useStoreView } from '@repo/store';
import { SHELL_VALUES } from '@web/constants';

export default function Aside({
  options,
}: {
  options?: { hideWhenOpen?: boolean; hideWhenClosed?: boolean };
}) {
  const asideChild = useStoreAppShell((s) => s.appshell?.child?.aside);
  const toggleAsideChild = useStoreAppShell((s) => s.toggleAsideChild);

  // Get your view setter
  const setAsideViewValue = useStoreView((s) => s.setAsideViewValue);

  const states = {
    iconRight: !asideChild ? IconArrowBarLeft : IconArrowBarRight,
  };

  const label = `${asideChild ? 'Collapse' : 'Expand'} Aside`;

  const handleToggle = () => {
    // If the aside is currently open and we are about to close it,
    // scrub the asideView value so it doesn't try to reopen on refresh
    if (asideChild) {
      setAsideViewValue(null);
    }

    toggleAsideChild();
  };

  return (
    <ActionIcon
      radius={0}
      variant="subtle"
      color="dark"
      aria-label={label}
      size={SHELL_VALUES.FOOTER.HEIGHT - 1}
      onClick={handleToggle} // Use the new handler wrapper
      display={!options?.hideWhenClosed ? undefined : asideChild ? undefined : 'none'}
      miw={47.43}
    >
      <states.iconRight size={SHELL_VALUES.FOOTER.HEIGHT - 8} stroke={ICON_STROKE_WIDTH} />
    </ActionIcon>
  );
}
