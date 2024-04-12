import { describe, it, expect } from 'vitest';
import { render } from './test-utils';
import {screen} from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('should render a container', () => {
    render(<Container>Foobar</Container>);

    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByTestId('container')).toHaveTextContent('Foobar');
  });
});
