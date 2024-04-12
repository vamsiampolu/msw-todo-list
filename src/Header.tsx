import { type CSSProperties } from 'react';
import { NewTodo } from './NewTodo';

const style: CSSProperties = {
  color: '#b83f45',
  fontSize: '80px',
  fontWeight: '200',
  textAlign: 'center',
  textRendering: 'optimizeLegibility',
  width: '100%',
};
export function Header() {
  return (
    <header className='header' data-testid='header'>
      <h1 style={style} data-testid='todos-heading' className='todos-heading'>
        todos
      </h1>
      <NewTodo />
    </header>
  );
}
