import { describe, it, expect, vi, type Mock } from 'vitest';
import { render } from './test-utils';
import { NewTodo } from './NewTodo';
import userEvent from '@testing-library/user-event';
import {screen} from '@testing-library/react';

describe('NewTodo', () => {
  it('displays an input with class new-todo', () => {
    render(<NewTodo />);

    expect(screen.getByTestId('create-todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('create-todo-input')).toHaveClass('new-todo');
    expect(screen.getByTestId('create-todo-input')).toHaveAttribute(
      'placeholder',
      'What needs to be done?',
    );
  });

  it('displays a label with class visually hidden', () => {
    render(<NewTodo />);

    expect(screen.getByTestId('create-todo-input-label')).toBeInTheDocument();
    expect(screen.getByTestId('create-todo-input-label')).toHaveClass(
      'visually-hidden',
    );
    expect(screen.getByTestId('create-todo-input-label')).toHaveTextContent(
      'New Todo Input',
    );
  });

  it('should not save a todo when enter is pressed on an empty input', async () => {
    global.fetch = vi.fn();
    const user = userEvent.setup();
    render(<NewTodo />);

    const input = screen.getByTestId('create-todo-input');
    expect(input).toBeInTheDocument();

    await user.type(input, '{Enter}');
    expect(global.fetch).not.toHaveBeenCalled();
    (global.fetch as Mock).mockReset();
  });

  it('should save a todo when enter is pressed on input with value', async () => {
    global.fetch = vi.fn();

    const user = userEvent.setup();
    render(<NewTodo />);

    const input = screen.getByTestId('create-todo-input');
    expect(input).toBeInTheDocument();

    await user.type(input, 'Open a noodle shop for Design');
    await user.type(input, '{Enter}');

    expect(global.fetch).toHaveBeenCalledWith('/api/todos/', {
      method: 'POST',
      body: JSON.stringify({
        text: 'Open a noodle shop for Design',
        completed: false,
      }),
    });
    (global.fetch as Mock).mockReset();
  });
});
