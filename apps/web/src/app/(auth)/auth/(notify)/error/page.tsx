/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import React from 'react';
import { Metadata } from 'next';
import { NotifyError as PartialNotifyError } from '@web/ui/partial/page/notify';
import { BASE_URL_CLIENT } from '@repo/constants';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Authentication Error' };

export default function Error() {
  return (
    <div>
      <PartialNotifyError props={{ baseUrl: BASE_URL_CLIENT.WEB }} />
    </div>
  );
}
