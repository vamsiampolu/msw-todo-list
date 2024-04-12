import {
  useState,
  useId,
  type ChangeEvent,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { createTodo } from './api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const style: CSSProperties = {
  background: 'rgba(0,0,0,.003)',
  border: 'none',
  boxShadow: 'inset 0 -2px 1px rgba(0,0,0,.03)',
  height: '65px',
  padding: '16px 16px 16px 60px',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  boxSizing: 'border-box',
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: '24px',
  fontWeight: 'inherit',
  lineHeight: '1.4em',
  margin: '0',
  position: 'relative',
  width: '100%',
};

const visuallyHidden: CSSProperties = {
  clip: 'rect(0 0 0 0)',
  border: '0',
  clipPath: 'inset(50%)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

export function NewTodo() {
  const [value, setValue] = useState('');
  const queryClient = useQueryClient();
  const id = useId();

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
      console.log('invalidated queries');
      setValue('');
    },
  });

  const handleCreate = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.length > 0) {
      mutation.mutate({
        text: value,
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className='input-container'>
      <input
        style={style}
        className='new-todo'
        id={id}
        type='text'
        data-testid='create-todo-input'
        placeholder='What needs to be done?'
        value={value}
        onChange={handleChange}
        onKeyDown={handleCreate}
      />
      <label
        data-testid='create-todo-input-label'
        style={visuallyHidden}
        className='visually-hidden'
        htmlFor={id}
      >
        New Todo Input
      </label>
    </div>
  );
}
