/**********************************************************************
 * Copyright (C) 2024 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';

import NumberInput from './NumberInput.svelte';

function renderInput(
  name: string,
  value: number,
  disabled?: boolean,
  minimum?: number,
  maximum?: number,
  type: 'integer' | 'number' = 'number',
): void {
  render(NumberInput, {
    name: name,
    value: value,
    disabled: disabled,
    minimum: minimum,
    maximum: maximum,
    type: type,
  });
}

test('Expect basic styling', async () => {
  renderInput('test', 5);

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();

  const decrement = screen.getByLabelText('decrement');
  expect(decrement).toBeInTheDocument();
  expect(decrement).toHaveClass('pr-0.5');
  expect(decrement).toHaveClass('text-[var(--pd-input-field-stroke)]');
  expect(decrement).toHaveClass('group-hover:text-[var(--pd-input-field-hover-stroke)]');

  const increment = screen.getByLabelText('increment');
  expect(increment).toBeInTheDocument();
  expect(increment).toHaveClass('pl-0.5');
  expect(increment).toHaveClass('text-[var(--pd-input-field-stroke)]');
  expect(increment).toHaveClass('group-hover:text-[var(--pd-input-field-hover-stroke)]');
});

test('Expect disabled styling', async () => {
  renderInput('test', 5, true);

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();

  const decrement = screen.getByLabelText('decrement');
  expect(decrement).toBeInTheDocument();
  expect(decrement).toHaveClass('pr-0.5');
  expect(decrement).toHaveClass('text-[var(--pd-input-field-disabled-text)]');

  const increment = screen.getByLabelText('increment');
  expect(increment).toBeInTheDocument();
  expect(increment).toHaveClass('pl-0.5');
  expect(increment).toHaveClass('text-[var(--pd-input-field-disabled-text)]');
});

test('Expect decrement works', async () => {
  renderInput('test', 5);

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('5');

  const decrement = screen.getByLabelText('decrement');
  expect(decrement).toBeInTheDocument();

  await userEvent.click(decrement);

  expect(input).toHaveValue('4');
});

test('Expect minimum value works', async () => {
  renderInput('test', 11, false, 10, 100);

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('11');

  const decrement = screen.getByLabelText('decrement');
  expect(decrement).toBeInTheDocument();
  expect(decrement).toBeEnabled();

  await userEvent.click(decrement);

  expect(decrement).toBeDisabled();
});

test('Expect increment works', async () => {
  renderInput('test', 5);

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('5');

  const increment = screen.getByLabelText('increment');
  expect(increment).toBeInTheDocument();

  await userEvent.click(increment);

  expect(input).toHaveValue('6');
});

test('Expect maximum value works', async () => {
  renderInput('test', 99, false, 10, 100);

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('99');

  const increment = screen.getByLabelText('increment');
  expect(increment).toBeInTheDocument();
  expect(increment).toBeEnabled();

  await userEvent.click(increment);

  expect(increment).toBeDisabled();
});

test('Expect integer support works', async () => {
  renderInput('test', 99, false, 10, 100, 'integer');

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('99');

  // focus the input
  await userEvent.click(input);

  // now enter on the keyboard .0
  await userEvent.type(input, '.0');

  // the value should be 99.0
  expect(input).toHaveValue('99.0');

  // now try to enter 1
  await userEvent.type(input, '1');

  // the value should be 99.0 as we only support integers
  expect(input).toHaveValue('99.0');
});

test('Expect number support works', async () => {
  renderInput('test', 99, false, 10, 100, 'number');

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('99');

  // focus the input
  await userEvent.click(input);

  // now enter on the keyboard .0
  await userEvent.type(input, '.0');

  // the value should be 99.0
  expect(input).toHaveValue('99.0');

  // now try to enter 1
  await userEvent.type(input, '1');

  // the value should be 99.01 as here we support numbers (and not integers)
  expect(input).toHaveValue('99.01');
});

test('Expect invalid data support works', async () => {
  renderInput('test', 99, false, 10, 100, 'number');

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('99');

  // focus the input
  await userEvent.click(input);

  // now enter on the keyboard abcd-)à&@*.0
  await userEvent.type(input, 'abcd-)à&@*.0');

  // the value should be 99.0
  expect(input).toHaveValue('99.0');
});
