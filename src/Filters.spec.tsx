import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Filters } from './Filters';
import { TodoFilters } from './TodoFilters';
import userEvent from '@testing-library/user-event';

const noop = () => undefined;

describe('Filters', () => {
  it('displays a list of filters', () => {
    render(<Filters filter={TodoFilters.All} setFilter={noop} />);
    expect(screen.getByTestId('filter-navigation')).toBeInTheDocument();

    expect(screen.getByTestId('filter-navigation').tagName).toEqual('UL');
    expect(screen.getByTestId('filter-navigation')).toHaveClass('filters');
  });

  it('sets the className selected on the matching filter', () => {
    render(<Filters filter={TodoFilters.All} setFilter={noop} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('All')).toHaveClass('selected');
  });

  it('invokes the setFilter prop when a filter is clicked', async () => {
    const user = userEvent.setup();
    const setFilter = vi.fn();

    render(<Filters filter={TodoFilters.All} setFilter={setFilter} />);

    const activeFilter = screen.getByText('Active');
    expect(activeFilter).toBeInTheDocument();

    await user.click(activeFilter);
    expect(setFilter).toHaveBeenCalledWith(TodoFilters.Active);
  });
});
