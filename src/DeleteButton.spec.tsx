import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import {screen} from '@testing-library/react';
import { DeleteButton } from './DeleteButton';
import { render } from './test-utils';

describe('DeleteButton', () => {
  it('renders a delete button with the className destroy', () => {
    render(<DeleteButton />);

    expect(screen.getByTestId('destroy')).toBeInTheDocument();
    expect(screen.getByTestId('destroy')).toHaveClass('destroy');
  });

  it('renders a delete button with a span representing after pseudo class', () => {
    render(<DeleteButton />);

    expect(screen.getByTestId('destroy').children[0].tagName).toEqual('SPAN');
    expect(screen.getByTestId('destroy').children[0]).toHaveClass(
      'destroy-after',
    );
  });

  it('should display an x as the close icon', () => {
    render(<DeleteButton />);
    expect(screen.getByTestId('destroy')).toHaveTextContent('x');
  });

  it('should invoke onClick prop when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<DeleteButton onClick={onClick} />);
    const deleteBtn = screen.getByTestId('destroy');

    expect(deleteBtn).toBeInTheDocument();

    await user.click(deleteBtn);
    expect(onClick).toHaveBeenCalled();
  });
});
