/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import React from 'react';
import { getAppResolver } from '@api/resolver';
import { getAppTheme } from '@repo/constants';
import { PartialError404, ProviderMantine } from '@repo/ui';

export default function NotFound() {
  return (
    <ProviderMantine theme={getAppTheme} cssVariablesResolver={getAppResolver}>
      <PartialError404 />
    </ProviderMantine>
  );
}
