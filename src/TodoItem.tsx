import { useState, type CSSProperties } from 'react';
import { Toggle } from './Toggle';
import { ToggleLabel } from './ToggleLabel';
import { DeleteButton } from './DeleteButton';
import { TodoInput } from './TodoInput';
import { updateTodo, removeTodo } from './api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const style: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  borderBottom: '1px solid #ededed',
};

export function TodoItem({
  text,
  completed,
  id,
}: {
  text: string;
  completed: boolean;
  id: string;
}) {
  const toggleId = `toggle-${id}`;

  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);

  const handleEditingComplete = () => {
    setEditing(false);
  };

  const handleEditingStart = () => {
    setEditing(true);
  };

  const mutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
    onError: () => {
      console.error('Could not save todo');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: removeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
    onError: () => {
      console.error('Could not delete todo');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({
      id: Number.parseInt(id, 10),
    });
  };

  const onStatusChange = (checked: boolean) => {
    mutation.mutate({
      id: Number.parseInt(id, 10),
      text,
      completed: checked,
    });
  };

  if (editing) {
    return (
      <li style={style} className='todo-item' data-testid='todo-item'>
        <TodoInput
          id={id}
          text={text}
          completed={completed}
          onComplete={handleEditingComplete}
        />
      </li>
    );
  }

  return (
    <li style={style} className='todo-item' data-testid='todo-item'>
      <Toggle id={toggleId} checked={completed} onChange={onStatusChange} />
      <ToggleLabel
        htmlFor={toggleId}
        checked={completed}
        onEditingStart={handleEditingStart}
      >
        {text}
      </ToggleLabel>
      <DeleteButton onClick={handleDelete} />
    </li>
  );
}
