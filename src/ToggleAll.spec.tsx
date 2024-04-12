import { ToggleAll } from './ToggleAll';
import userEvent from '@testing-library/user-event';

import { render } from './test-utils';
import {screen} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const noop = () => undefined;

describe('ToggleAll', () => {
  it('displays a checkbox input', () => {
    render(<ToggleAll checked={false} onChange={noop} />);
    expect(screen.getByTestId('toggle-all')).toBeInTheDocument();

    expect(screen.getByTestId('toggle-all').tagName).toEqual('INPUT');
    expect(screen.getByTestId('toggle-all')).toHaveAttribute(
      'type',
      'checkbox',
    );
  });

  it('displays a label with a caret', () => {
    const text = '❯';
    render(<ToggleAll checked={false} onChange={noop} />);
    expect(screen.getByTestId('toggle-all-label')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-all-label')).toHaveTextContent(text);
  });

  it('invokes onChange prop when input checked status changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ToggleAll checked={false} onChange={onChange} />);
    const toggleAll = screen.getByTestId('toggle-all');

    await user.click(toggleAll);
    expect(onChange).toHaveBeenCalled();
  });
});
