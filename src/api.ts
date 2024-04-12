import { type Todo } from './Todo';
type UpdateTodoMutationKey = {
  id: number;
  text: string;
  completed: boolean;
};

type FetchTodoQueryKey = {
  queryIdentifier: 'fetch-todo-by-id';
  id: number;
};

export async function createTodo({ text }: { text: string }) {
  const body = JSON.stringify({
    text,
    completed: false,
  });
  const response = await fetch('/api/todos/', {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    throw new Error('Cannot save todo');
  }

  if (response.status === 204) {
    return undefined;
  }

  const data = await response.json();
  return data;
}

export async function fetchTodos({ signal }: { signal: AbortSignal }) {
  const response = await fetch('/api/todos/', { signal });
  if (!response.ok) {
    throw new Error('Could not fetch todos');
  }

  const result = await response.json();
  return result;
}

export async function fetchTodoById({
  signal,
  queryKey,
}: {
  signal: AbortSignal;
  queryKey: FetchTodoQueryKey;
}) {
  const { id } = queryKey;
  const response = await fetch(`/api/todos/${id}`, { signal });

  if (!response.ok) {
    throw new Error('Could not fetch todo by id');
  }

  const result = await response.json();
  return result;
}

export async function updateTodo(todo: UpdateTodoMutationKey) {
  const { id, text, completed } = todo;
  const url = `/api/todos/${id}`;
  const body = JSON.stringify({
    text,
    completed,
  });

  const response = await fetch(url, {
    method: 'PUT',
    body,
  });

  if (!response.ok) {
    throw new Error('Could not update todo with id ' + id);
  }

  if (response.status === 204) {
    return undefined;
  }

  const result = await response.json();
  return result;
}

export async function removeTodo({ id }: { id: number }) {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Could not delete todo with id ' + id);
  }

  if (response.status === 204) {
    return undefined;
  }

  const result = await response.json();
  return result;
}

export async function bulkUpdateStatus({
  todos,
  completed,
}: {
  todos: Todo[];
  completed: boolean;
}) {
  const updatedTodos = todos.map((todo) => ({ ...todo, completed }));
  const response = await fetch('/api/todos/bulk-upsert', {
    method: 'POST',
    body: JSON.stringify({ todos: updatedTodos }),
  });

  if (!response.ok) {
    throw new Error('Bulk Upsert failed');
  }

  const result = await response.json();
  return result;
}
