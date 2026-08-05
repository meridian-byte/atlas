/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import React from 'react';
import { getAppResolver } from '@atlas/resolver';
import { getAppTheme } from '@repo/constants';
import { PartialLoadingMain, ProviderMantine } from '@repo/ui';

export default function Loading() {
  return (
    <ProviderMantine theme={getAppTheme} cssVariablesResolver={getAppResolver}>
      <PartialLoadingMain />
    </ProviderMantine>
  );
}
