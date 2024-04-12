import type { Todo } from './Todo';
import { TodoList } from './TodoList';
import { describe, it, expect } from 'vitest';
import { render } from './test-utils';
import {screen} from '@testing-library/react';

const todos: Todo[] = [
  {
    id: '1',
    text: 'Find the Eleventh Metal',
    completed: false,
  },
  {
    id: '2',
    text: 'Assemble a crew',
    completed: true,
  },
  {
    id: '3',
    text: 'Recruit a mistborn to spy on the nobles',
    completed: true,
  },
];

describe('TodoList', () => {
  it('displays a list with class todo-list', () => {
    render(<TodoList data={{ todos }} />);

    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getByTestId('todo-list')).toHaveClass('todo-list');
  });

  it('displays a todo item for each todo', () => {
    render(<TodoList data={{ todos }} />);
    expect(screen.getAllByTestId('todo-item')).toHaveLength(3);

    const getTodoTextFromItem = (item: HTMLElement) => {
      const todoText = item.textContent?.substring(
        1,
        item.textContent.length - 1,
      );
      return todoText;
    };

    const todoItems = screen.getAllByTestId('todo-item');
    expect(todoItems.map(getTodoTextFromItem)).toEqual([
      'Find the Eleventh Metal',
      'Assemble a crew',
      'Recruit a mistborn to spy on the nobles',
    ]);
  });
});
