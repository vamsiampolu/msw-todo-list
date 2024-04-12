import { ToggleLabel } from './ToggleLabel';
import { describe, it, expect, vi } from 'vitest';
import { render } from './test-utils';

import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

const noop = () => {};

describe('ToggleLabel', () => {
  it('displays a label with children', () => {
    render(
      <ToggleLabel htmlFor='foobar' onEditingStart={noop}>
        Toggle Label Text
      </ToggleLabel>,
    );
    expect(screen.getByTestId('toggle-label')).toBeInTheDocument();

    expect(screen.getByTestId('toggle-label').tagName).toEqual('LABEL');
    expect(screen.getByTestId('toggle-label')).toHaveTextContent(
      'Toggle Label Text',
    );
  });

  it('acts as a label for a form control', () => {
    render(
      <ToggleLabel htmlFor='foobar' onEditingStart={noop}>
        Toggle Label Text
      </ToggleLabel>,
    );
    expect(screen.getByTestId('toggle-label')).toBeInTheDocument();

    expect(screen.getByTestId('toggle-label')).toHaveAttribute('for', 'foobar');
  });

  it('has a strike-through when checked', () => {
    render(
      <ToggleLabel htmlFor='foobar' onEditingStart={noop} checked>
        Toggle Label Text
      </ToggleLabel>,
    );
    expect(screen.getByTestId('toggle-label')).toBeInTheDocument();

    expect(screen.getByTestId('toggle-label').style).toHaveProperty(
      'textDecoration',
      'line-through',
    );
  });

  it('invokes onEditingStart prop when double clicked', async () => {
    const onEditingStart = vi.fn();
    const user = userEvent.setup();

    render(
      <ToggleLabel htmlFor='foobar' onEditingStart={onEditingStart} checked>
        Toggle Label Text
      </ToggleLabel>,
    );

    const toggleLabel = screen.getByTestId('toggle-label');
    expect(toggleLabel).toBeInTheDocument();

    await user.dblClick(toggleLabel);
    expect(onEditingStart).toHaveBeenCalled();
  });
});
