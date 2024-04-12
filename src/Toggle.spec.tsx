import { Toggle } from './Toggle';
import { describe, it, expect, vi } from 'vitest';
import { render } from './test-utils';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const noop = () => undefined;

describe('Toggle', () => {
  it('displays a checkbox', () => {
    render(<Toggle id='foobar' onChange={noop} />);

    expect(screen.getByTestId('todo-item-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-toggle')).toHaveAttribute(
      'type',
      'checkbox',
    );
  });

  it('is unchecked by default', () => {
    render(<Toggle id='foobar' onChange={noop} />);

    expect(screen.getByTestId('todo-item-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-toggle')).not.toBeChecked();
  });

  it('is checked when prop checked is set', () => {
    render(<Toggle id='foobar' onChange={noop} checked />);

    expect(screen.getByTestId('todo-item-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-toggle')).toBeChecked();
  });

  it('invokes onChange prop when Toggle state changes', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Toggle id='foobar' onChange={onChange} />);

    const toggle = screen.getByTestId('todo-item-toggle');
    await user.click(toggle);

    expect(toggle).toBeChecked();
    expect(onChange).toHaveBeenCalled();
  });
});
