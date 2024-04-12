import { type CSSProperties } from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from './Todo';

export type TodoListProps = {
  data: {
    todos: Todo[];
  };
};

const style: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
};

export function TodoList({ data }: TodoListProps) {
  return (
    <ul className='todo-list' style={style} data-testid='todo-list'>
      {data.todos.map((todo: Todo, index: number) => (
        <TodoItem
          key={`todo-${index}`}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
}
