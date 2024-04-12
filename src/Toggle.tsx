import {
  useEffect,
  useState,
  type CSSProperties,
  type ChangeEvent,
} from 'react';

const style: CSSProperties = {
  position: 'relative',
  height: '40px',
  width: '40px',
  appearance: 'none',
  borderRadius: '50%',
  border: '1px solid black',
  outline: 'none',
  cursor: 'pointer',
};

const checkedStyle: CSSProperties = {
  content: '\xb9',
  color: 'green',
  fontSize: '32px',
  fontWeight: 700,
  left: '12px',
  top: '14px',
  position: 'absolute',
};

export function Toggle({
  id,
  checked = false,
  onChange,
}: {
  checked?: boolean;
  id: string;
  onChange: (checked: boolean) => void;
}) {
  const [isChecked, setChecked] = useState(checked);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange(e.target.checked);
  };

  return (
    <div style={{ position: 'relative', marginLeft: checked ? '10px' : '' }}>
      <span style={isChecked ? checkedStyle : { opacity: 0 }}>
        {String.fromCodePoint(0x2714)}
      </span>
      <input
        onChange={handleChange}
        id={id}
        checked={isChecked}
        style={style}
        className='toggle'
        type='checkbox'
        data-testid='todo-item-toggle'
      />
    </div>
  );
}
