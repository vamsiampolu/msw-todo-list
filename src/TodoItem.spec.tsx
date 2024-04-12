import { describe, it, expect, vi } from 'vitest';
import { render } from './test-utils';
import {screen} from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { TodoItem } from './TodoItem';
import * as api from './api';

describe('TodoItem', () => {
  it('displays a list item with class todo-item', () => {
    render(<TodoItem text='Foobar' id='12' completed={false} />);

    expect(screen.getByTestId('todo-item')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item')).toHaveClass('todo-item');
  });

  it('displays a toggle with comleted status', () => {
    render(<TodoItem text='Foobar' id='12' completed={false} />);
    expect(screen.getByTestId('todo-item-toggle')).toBeInTheDocument();

    expect(screen.getByTestId('todo-item-toggle')).not.toBeChecked();
  });

  it('displays a toggle label with todo text', () => {
    render(<TodoItem text='Use the Awesomeness' id='12' completed={false} />);
    expect(screen.getByTestId('toggle-label')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-label')).toHaveTextContent(
      'Use the Awesomeness',
    );
  });

  it('displays a delete button', () => {
    render(<TodoItem text='Use the Awesomeness' id='12' completed={false} />);
    expect(screen.getByTestId('destroy')).toBeInTheDocument();
  });

  it('displays a todo input when editing', async () => {
    const user = userEvent.setup();
    render(<TodoItem text='Use the Awesomeness' id='12' completed={false} />);

    const toggleLabel = screen.getByTestId('toggle-label');
    expect(toggleLabel).toBeInTheDocument();

    await user.dblClick(toggleLabel);

    expect(toggleLabel).not.toBeInTheDocument();
    expect(screen.getByTestId('edit-todo-input')).toBeInTheDocument();
  });

  it('updates the todo status when toggle is pressed', async () => {
    const updateTodoSpy = vi.spyOn(api, 'updateTodo');
    const user = userEvent.setup();

    render(<TodoItem text='Foobar' id='12' completed={false} />);
    const toggle = screen.getByTestId('todo-item-toggle');

    expect(toggle).toBeInTheDocument();
    expect(toggle).not.toBeChecked();

    await user.click(toggle);

    expect(updateTodoSpy).toHaveBeenCalledWith({
      id: 12,
      completed: true,
      text: 'Foobar',
    });
    expect(toggle).toBeChecked();

    updateTodoSpy.mockRestore();
  });

  it('updates the todo when text is updated', async () => {
    const user = userEvent.setup();
    const updateTodoSpy = vi.spyOn(api, 'updateTodo');

    render(<TodoItem text='Foobar' id='12' completed={false} />);
    const toggleLabel = screen.getByTestId('toggle-label');

    expect(toggleLabel).toBeInTheDocument();
    await user.dblClick(toggleLabel);

    const editTodo = screen.getByTestId('edit-todo-input');

    expect(editTodo).toBeInTheDocument();
    expect(editTodo).toHaveValue('Foobar');

    await user.type(editTodo, ' Clarinet{Enter}');
    expect(editTodo).not.toBeInTheDocument();

    expect(screen.getByTestId('toggle-label')).toBeInTheDocument();

    expect(updateTodoSpy).toHaveBeenCalledWith({
      id: 12,
      text: 'Foobar Clarinet',
      completed: false,
    });

    updateTodoSpy.mockRestore();
  });

  it('remove a todo when delete button is clicked', async () => {
    const removeTodoSpy = vi
      .spyOn(api, 'removeTodo')
      .mockImplementation(() => Promise.resolve(undefined));
    const user = userEvent.setup();

    render(<TodoItem text='Use the Awesomeness' id='12' completed={false} />);

    const deleteBtn = screen.getByTestId('destroy');
    expect(deleteBtn).toBeInTheDocument();

    await user.click(deleteBtn);
    expect(removeTodoSpy).toHaveBeenCalledWith({ id: 12 });

    removeTodoSpy.mockRestore();
  });
});
