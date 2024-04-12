import { type CSSProperties, type Dispatch, type SetStateAction } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, removeTodo } from './api';
import { Todo } from './Todo';
import { Filters } from './Filters';
import { TodoFilters } from './TodoFilters';

type SetFilter = Dispatch<SetStateAction<TodoFilters>>;

const footerStyle: CSSProperties = {
  borderTop: '1px solid #e6e6e6',
  borderBottom: '1px solid #e6e6e6',
  fontSize: '15px',
  height: '20px',
  padding: '10px 15px',
  textAlign: 'center',
};

const footerBeforeStyle: CSSProperties = {
  bottom: '0',
  boxShadow:
    '0 1px 1px rgba(0,0,0,.2),0 8px 0 -3px #f6f6f6,0 9px 1px -3px rgba(0,0,0,.2),0 16px 0 -6px #f6f6f6,0 17px 2px -6px rgba(0,0,0,.2)',
  height: '50px',
  left: '0',
  overflow: 'hidden',
  position: 'absolute',
  right: '0',
};

const clearCompletedStyle: CSSProperties = {
  appearance: 'none',
  background: 'none',
  border: 0,
  color: 'inherit',
  cursor: 'pointer',
  float: 'right',
  fontFamily: 'inherit',
  fontSize: '100%',
  fontWeight: 'inherit',
  lineHeight: '19px',
  margin: 0,
  position: 'relative',
  textDecoration: 'none',
  WebkitFontSmoothing: 'antialiased',
  verticalAlign: 'baseline',
};

const todoCountStyle: CSSProperties = {
  float: 'left',
  textAlign: 'left',
};

export default function Footer({
  filter,
  setFilter,
}: {
  filter: TodoFilters;
  setFilter: SetFilter;
}) {
  const queryClient = useQueryClient();
  const { data } = useQuery<{ todos: Todo[] }>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const todoCount = data?.todos?.length;
  const item = todoCount === 1 ? 'item' : 'items';

  const mutation = useMutation({
    mutationFn: removeTodo,
  });

  const activeTodos = data?.todos?.filter((item) => item.completed);
  const activeTodoCount = activeTodos?.length;

  const handleClearCompleted = async () => {
    const completedTodos = data?.todos.filter((item) => item.completed);
    await Promise.all(
      (completedTodos ?? []).map((item) =>
        mutation.mutate({ id: Number.parseInt(item.id, 10) }),
      ),
    );

    queryClient.invalidateQueries({
      queryKey: ['todos'],
    });
  };

  if (todoCount) {
    return (
      <>
        <div className='footer-before' style={footerBeforeStyle} />
        <footer data-testid='footer' className='footer' style={footerStyle}>
          <span
            style={todoCountStyle}
            className='todo-count'
            data-testid='todo-count'
          >
            {todoCount} {item} left!
          </span>
          <Filters filter={filter} setFilter={setFilter} />
          <button
            onClick={handleClearCompleted}
            className='clear-completed'
            style={clearCompletedStyle}
            disabled={todoCount === activeTodoCount}
          >
            Clear Completed
          </button>
        </footer>
      </>
    );
  }

  return null;
}
