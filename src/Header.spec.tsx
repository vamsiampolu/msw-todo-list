import { Header } from './Header';
import { describe, it, expect } from 'vitest';
import { render } from './test-utils';
import {screen} from '@testing-library/react';

describe('Header', () => {
  it('uses a semantic header element as a wrapper', () => {
    render(<Header />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('header').tagName).toEqual('HEADER');
  });

  it('displays a h1 with text todos', () => {
    render(<Header />);
    expect(screen.getByTestId('todos-heading')).toBeInTheDocument();

    expect(screen.getByTestId('todos-heading')).toHaveTextContent('todos');
    expect(screen.getByTestId('todos-heading')).toHaveClass('todos-heading');
  });

  it('displays the new todo input', () => {
    render(<Header />);
    expect(screen.getByTestId('create-todo-input')).toBeInTheDocument();
  });
});
