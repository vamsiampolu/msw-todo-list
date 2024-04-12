import { useId, type ChangeEventHandler, type CSSProperties } from 'react';

const checkboxStyle: CSSProperties = {
  width: '1px',
  height: '1px',
  border: 'none',
  opacity: 0,
  position: 'absolute',
  right: '40%',
  bottom: '40%',
};

const labelStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '45px',
  height: '65px',
  fontSize: 0,
  position: 'absolute',
  top: '-65px',
  left: 0,
};

export function ToggleAll({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const id = useId();
  const labelBeforeStyle: CSSProperties = {
    display: 'inline-block',
    fontSize: '22px',
    padding: '10px 27px 10px 27px',
    transform: 'rotate(90deg)',
  };

  if (checked) {
    labelBeforeStyle.color = '#484848';
  } else {
    labelBeforeStyle.color = '#949494';
  }

  return (
    <span className='toggle-all-wrapper'>
      <input
        style={checkboxStyle}
        type='checkbox'
        className='toggle-all'
        data-testid='toggle-all'
        checked={checked}
        onChange={onChange}
        id={id}
      />
      <label
        className='toggle-all-label'
        style={labelStyle}
        htmlFor={id}
        data-testid='toggle-all-label'
      >
        <span className='toggle-all-label-before' style={labelBeforeStyle}>
          ❯
        </span>
      </label>
    </span>
  );
}
