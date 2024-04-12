import type { PropsWithChildren, CSSProperties } from 'react';

const style: CSSProperties = {
  overflowWrap: 'break-word',
  padding: '15px 15px 15px 60px',
  display: 'block',
  lineHeight: 1.2,
  transition: 'color 0.4s',
  fontWeight: 400,
  color: '#484848',
};

const checkedStyle = {
  ...style,
  color: '#949494',
  textDecoration: 'line-through',
};

export function ToggleLabel({
  checked = false,
  children,
  onEditingStart,
  htmlFor,
}: PropsWithChildren<{
  checked?: boolean;
  htmlFor: string;
  onEditingStart: () => void;
}>) {
  const handleDoubleClick = () => {
    onEditingStart();
  };

  return (
    <label
      data-testid='toggle-label'
      className='toggle-label'
      htmlFor={htmlFor}
      style={checked ? checkedStyle : style}
      onDoubleClick={handleDoubleClick}
    >
      {children}
    </label>
  );
}
