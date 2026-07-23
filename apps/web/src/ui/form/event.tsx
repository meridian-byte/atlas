'use client';

/**
 * @template-source next-template
 * @template-sync auto
 * @description This file originates from the base template repository.
 * Do not modify unless you intend to backport changes to the template.
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  GridCol,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DateInput, DateTimePicker } from '@mantine/dates';
import { useFormEvent } from '@web/hooks/form/event';
import dayjs from 'dayjs';
import { useStoreCalendar } from '@repo/store';

export default function Event() {
  const [checked, setChecked] = useState(true);

  const { form, submitted, handleSubmit } = useFormEvent({
    options: { closeWhenDone: checked },
  });

  const calendars = useStoreCalendar((s) => s.calendars);

  const allDayProps = {
    component: form.values.allDay ? DateInput : DateTimePicker,
    props: {
      required: true,
      label: 'Start',
      placeholder: 'Start',
      ...form.getInputProps('start'),
      valueFormat: 'DD MMM YYYY hh:mm A',

      presets: [
        {
          value: dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
          label: 'Yesterday',
        },
        { value: dayjs().format('YYYY-MM-DD HH:mm:ss'), label: 'Today' },
        { value: dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'), label: 'Tomorrow' },
        { value: dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm:ss'), label: 'Next month' },
      ],
    },
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(() => handleSubmit())} noValidate p={'xs'}>
      <Grid gap={'xs'}>
        {/* <div>{JSON.stringify(form.values.start)}</div> */}
        {/* <div>{JSON.stringify(form.values.end)}</div> */}

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
            label={'Description'}
            placeholder="Description"
            {...form.getInputProps('description')}
            autosize
            minRows={2}
            maxRows={5}
          />
        </GridCol>

        <GridCol span={{ base: 12 }}>
          <Checkbox label={'All day event'} {...form.getInputProps('allDay')} mt={'xs'} />
        </GridCol>

        <GridCol span={{ base: 12 }} display={!form.values.allDay ? 'none' : undefined}>
          <DateInput {...allDayProps.props} />
        </GridCol>

        <GridCol span={{ base: 12 }} display={form.values.allDay ? 'none' : undefined}>
          <DateTimePicker
            {...allDayProps.props}
            timePickerProps={{
              withDropdown: true,
              popoverProps: { withinPortal: false },
              format: '12h',
            }}
          />
        </GridCol>

        <GridCol span={{ base: 12 }}>
          <DateTimePicker
            required
            label="End"
            placeholder="End"
            {...form.getInputProps('end')}
            valueFormat={allDayProps.props.valueFormat}
            disabled={form.values.allDay}

            timePickerProps={{
              withDropdown: true,
              popoverProps: { withinPortal: false },
              format: '12h',
            }}

            presets={[
              {
                value: dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                label: 'Yesterday',
              },
              { value: dayjs().format('YYYY-MM-DD HH:mm:ss'), label: 'Today' },
              { value: dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'), label: 'Tomorrow' },
              { value: dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm:ss'), label: 'Next month' },
            ]}
          />
        </GridCol>

        <GridCol span={{ base: 12 }}>
          <Select
            label="Calendar"
            placeholder="Select calendar"
            disabled={!calendars}
            loading={calendars === undefined}
            {...form.getInputProps('calendarId')}
            data={(calendars || []).map((ci) => {
              return {
                label: ci.title,
                value: ci.id,
              };
            })}
          />
        </GridCol>

        <GridCol span={{ base: 12 }}>
          <Textarea
            label={'Location'}
            placeholder="Location"
            {...form.getInputProps('location')}
            autosize
            minRows={2}
            maxRows={5}
          />
        </GridCol>

        <GridCol span={{ base: 12 }}>
          <Divider my={'xs'} />
        </GridCol>

        <GridCol span={{ base: 12 }}>
          <Checkbox
            label={'Close when done'}
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        </GridCol>

        <GridCol span={{ base: 12 }}>
          <Button type="submit" loading={submitted}>
            {submitted ? 'Adding' : 'Add'}
          </Button>
        </GridCol>
      </Grid>
    </Box>
  );
}
