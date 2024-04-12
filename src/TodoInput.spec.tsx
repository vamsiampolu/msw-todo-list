import { describe, it, expect } from 'vitest';
import { render } from './test-utils';
import {screen} from '@testing-library/react';

import { TodoInput } from './TodoInput';
import * as api from './api';
import userEvent from '@testing-library/user-event';

const noop = () => undefined;

describe('TodoInput', () => {
  it('displays a text input with class edit-todo', () => {
    render(
      <TodoInput text='Foobar' id='2' completed={false} onComplete={noop} />,
    );
    expect(screen.getByTestId('edit-todo-input')).toBeInTheDocument();

    expect(screen.getByTestId('edit-todo-input').tagName).toEqual('INPUT');
    expect(screen.getByTestId('edit-todo-input')).toHaveAttribute(
      'type',
      'text',
    );
    expect(screen.getByTestId('edit-todo-input')).toHaveClass('edit-todo');
  });

  it('displays a label with class visually-hidden', () => {
    render(
      <TodoInput text='Foobar' id='2' completed={false} onComplete={noop} />,
    );
    expect(screen.getByTestId('edit-todo-label')).toBeInTheDocument();

    expect(screen.getByTestId('edit-todo-label')).toHaveClass(
      'visually-hidden',
    );
    expect(screen.getByTestId('edit-todo-label')).toHaveTextContent(
      'Edit Todo Input',
    );
  });

  it('invokes onComplete prop when Escape is pressed', async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();

    render(
      <TodoInput
        text='Foobar'
        id='2'
        completed={false}
        onComplete={onComplete}
      />,
    );
    const editTodo = screen.getByTestId('edit-todo-input');

    expect(editTodo).toBeInTheDocument();
    expect(editTodo).toHaveValue('Foobar');

    await user.type(editTodo, 'Write 5 secret projects for fun{Escape}');
    expect(onComplete).toHaveBeenCalled();
  });

  it('saves the edited todo when Enter is pressed', async () => {
    const onComplete = vi.fn();
    const updateTodoSpy = vi
      .spyOn(api, 'updateTodo')
      .mockImplementationOnce(() => Promise.resolve(undefined));
    const user = userEvent.setup();

    render(
      <TodoInput
        text='Foobar'
        id='2'
        completed={false}
        onComplete={onComplete}
      />,
    );
    const editTodo = screen.getByTestId('edit-todo-input');

    expect(editTodo).toBeInTheDocument();
    expect(editTodo).toHaveValue('Foobar');

    const backspaces = new Array('Foobar'.length).fill('{Backspace}').join('');
    await user.type(
      editTodo,
      backspaces + 'Write 5 secret projects for fun{Enter}',
    );

    expect(onComplete).toHaveBeenCalled();
    expect(updateTodoSpy).toHaveBeenCalledWith({
      id: 2,
      completed: false,
      text: 'Write 5 secret projects for fun',
    });

    updateTodoSpy.mockRestore();
  });
});
