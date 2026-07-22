'use client';

/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import React, { useState } from 'react';
import { Box, Button, Checkbox, Grid, GridCol, Textarea, TextInput } from '@mantine/core';
import { useFormCalendar } from '@web/hooks/form/calendar';

export default function Calendar() {
  const [checked, setChecked] = useState(true);
  const { form, submitted, handleSubmit } = useFormCalendar({
    options: { closeWhenDone: checked },
  });

  return (
    <Box component="form" onSubmit={form.onSubmit(() => handleSubmit())} noValidate p={'xs'}>
      <Grid>
        <GridCol span={{ base: 12 }}>
          <TextInput
            required
            label={'Title'}
            placeholder="Title"
            {...form.getInputProps('title')}
          />
        </GridCol>

        <GridCol span={{ base: 12 }}>
          <Textarea
            required
            label={'Description'}
            placeholder="Description"
            {...form.getInputProps('description')}
            autosize
            maxRows={5}
          />
        </GridCol>

        <GridCol span={{ base: 12 }}>
          <Checkbox
            label={'Close when done'}
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        </GridCol>

        <GridCol span={{ base: 12 }}>
          <Button type="submit" loading={submitted} mt={'md'}>
            {submitted ? 'Adding' : 'Add'}
          </Button>
        </GridCol>
      </Grid>
    </Box>
  );
}
