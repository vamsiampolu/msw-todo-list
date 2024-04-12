import type { CSSProperties, ComponentPropsWithoutRef } from 'react';

export function Container({ children }: ComponentPropsWithoutRef<'div'>) {
  const style: CSSProperties = {
    WebkitFontSmoothing: 'antialiased',
    color: '#111',
    font: '14px Helvetica Neue,Helvetica,Arial,sans-serif',
    fontWeight: '300',
    lineHeight: '1.4em',
    margin: '0 auto',
    maxWidth: '550px',
    minWidth: '230px',
    border: '1px solid #ededed',
    borderBottom: 'none',
    marginTop: '100px',
  };
  return (
    <div data-testid='container' className='todo-mvc-container' style={style}>
      {children}
    </div>
  );
}
