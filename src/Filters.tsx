import { type Dispatch, type CSSProperties, type SetStateAction } from 'react';
import { TodoFilters } from './TodoFilters';

type SetFilter = Dispatch<SetStateAction<TodoFilters>>;

const filtersStyle: CSSProperties = {
  left: '0',
  listStyle: 'none',
  margin: '0',
  padding: '0',
  position: 'absolute',
  right: '0',
};

const filterLink: CSSProperties = {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderRadius: '3px',
  color: 'inherit',
  margin: '3px',
  padding: '3px 7px',
  textDecoration: 'none',
};

const selectedFilterLink: CSSProperties = {
  ...filterLink,
  borderColor: '#ce4646',
};

export function Filters({
  filter,
  setFilter,
}: {
  filter: TodoFilters;
  setFilter: SetFilter;
}) {
  return (
    <ul
      style={filtersStyle}
      className='filters'
      data-testid='filter-navigation'
    >
      <li
        data-testid='filter-item'
        style={{ display: 'inline' }}
        onClick={() => setFilter(TodoFilters.All)}
      >
        <a
          style={filter === TodoFilters.All ? selectedFilterLink : filterLink}
          href='#/'
          className={filter === TodoFilters.All ? 'selected' : ''}
        >
          All
        </a>
      </li>
      <li
        style={{ display: 'inline' }}
        onClick={() => setFilter(TodoFilters.Active)}
      >
        <a
          style={
            filter === TodoFilters.Active ? selectedFilterLink : filterLink
          }
          href='#/'
          className={filter === TodoFilters.Active ? 'selected' : ''}
        >
          Active
        </a>
      </li>
      <li
        style={{ display: 'inline' }}
        onClick={() => setFilter(TodoFilters.Completed)}
      >
        <a
          style={
            filter === TodoFilters.Completed ? selectedFilterLink : filterLink
          }
          href='#/'
          className={filter === TodoFilters.Completed ? 'selected' : ''}
        >
          Completed
        </a>
      </li>
    </ul>
  );
}
