import {
  useState,
  useId,
  type KeyboardEvent,
  type ChangeEvent,
  type CSSProperties,
} from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from './api';

const visuallyHidden: CSSProperties = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  width: '1px',
  margin: '-1px',
  padding: 0,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
};

const inputStyle: CSSProperties = {
  width: 'calc(100% - 43px)',
  padding: '12px 16px',
  margin: '0 0 0 43px',
};

export function TodoInput({
  text,
  id,
  completed,
  onComplete,
}: {
  text: string;
  id: string;
  completed: boolean;
  onComplete: () => void;
}) {
  const queryClient = useQueryClient();
  const inputId = useId();

  const [value, setValue] = useState(text);
  const mutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      onComplete();
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
    onError: () => {
      console.error('Could not save todo');
      onComplete();
    },
  });

  const handleSave = () => {
    mutation.mutate({
      id: Number.parseInt(id, 10),
      text: value,
      completed,
    });
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const { key } = event;
    if (key === 'Enter' && value.length > 0) {
      handleSave();
    }

    if (key === 'Escape') {
      onComplete();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    handleSave();
  };

  return (
    <div className='input-container'>
      <input
        style={inputStyle}
        className='edit-todo'
        id={inputId}
        type='text'
        data-testid='edit-todo-input'
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeydown}
      />
      <label
        style={visuallyHidden}
        className='visually-hidden'
        data-testid='edit-todo-label'
        htmlFor={inputId}
      >
        Edit Todo Input
      </label>
    </div>
  );
}
