import type { CSSProperties, MouseEventHandler } from 'react';
/*
const position = {
position: 'absolute',
top: '0',
right: '10px',
bottom: '0',
};
*/
const noop = () => undefined;

export function DeleteButton({
  onClick = noop,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const style: CSSProperties = {
    margin: 'auto 0',
    marginLeft: 'auto',
    fontSize: '20px',
    color: 'rgb(148, 148, 148)',
    transition: 'color 0.2s ease-out 0s',
    padding: '0px',
    border: 'none',
    background: 'none',
    width: '30px',
    height: '30px',
  };

  const afterStyle: CSSProperties = {
    display: 'block',
    height: '100%',
    lineHeight: '1.1',
  };

  return (
    <button
      data-testid='destroy'
      className='destroy'
      style={style}
      onClick={onClick}
    >
      <span style={afterStyle} className='destroy-after'>
        x
      </span>
    </button>
  );
}
