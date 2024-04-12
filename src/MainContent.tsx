import { useState, type CSSProperties, type ChangeEvent } from 'react';

import { TodoList } from './TodoList';
import { type Todo } from './Todo';
import { ToggleAll } from './ToggleAll';

import { bulkUpdateStatus, fetchTodos } from './api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TodoFilters } from './TodoFilters';

const mainStyle: CSSProperties = {
  borderTop: '1px solid #e6e6e6',
  position: 'relative',
  zIndex: '2',
};

export function MainContent({ filter }: { filter: TodoFilters }) {
  const queryClient = useQueryClient();
  const [toggleAll, setToggleAll] = useState(false);

  const { data, error, isLoading, isError, isPaused } = useQuery<{
    todos: Todo[];
  }>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  console.log({
    message: 'fetch todos query',
    isLoading,
    isPaused,
    isError,
    data,
  });

  const toggleAllMutation = useMutation({
    mutationFn: bulkUpdateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
    onError: () => {
      console.error('Bulk update all todos failed');
    },
  });

  const handleToggleAll = (e: ChangeEvent<HTMLInputElement>) => {
    setToggleAll(e.target.checked);

    if (data?.todos) {
      toggleAllMutation.mutate({
        todos: data?.todos as unknown as Todo[],
        completed: e.target.checked,
      });
    }
  };

  const filtered = data?.todos?.filter((item: Todo) => {
    if (filter === TodoFilters.Active) {
      return item.completed === false;
    }

    if (filter === TodoFilters.Completed) {
      return item.completed;
    }

    return true;
  });

  const filteredData = {
    todos: filtered ?? [],
  };

  return (
    <main data-testid='main' style={mainStyle} className='main'>
      <ToggleAll checked={toggleAll} onChange={handleToggleAll} />
      {isLoading ? (
        <div data-testid='network-loading' className='loading'>
          Loading Todos...
        </div>
      ) : null}
      {isPaused ? (
        <div data-testid='network-offline' className='paused'>
          Network Offline: Waiting for network to reconnect before fetching the
          data.
        </div>
      ) : null}
      {isError ? (
        <div data-testid='network-error' className='error'>
          Error: {error.message}
        </div>
      ) : null}
      {filteredData?.todos?.length ?? 0 > 0 ? (
        <TodoList data={filteredData} />
      ) : null}
    </main>
  );
}
