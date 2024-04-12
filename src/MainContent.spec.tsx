import {MainContent} from './MainContent';
import {describe, expect, it} from 'vitest';
import {render} from './test-utils';
import {screen} from '@testing-library/react';
import { TodoFilters } from './TodoFilters';
import { http, delay, HttpResponse } from 'msw';
import { server } from './mocks/server';

  const todos = [
  {
    id: 1,
    text: 'Dont forget the milk',
    completed: false,
  },
  {
    id: 2,
    text: 'Become a stick',
    completed: true,
  },
  {
    id: 3,
    text: 'Watch Design annoy Hoid',
    completed: false,
  },
];

describe('MainContent', () => {

  it('displays a list of todos', async () => {
    render(<MainContent filter={TodoFilters.All}/>);
    const todoList = await screen.findByTestId('todo-list');
    expect(todoList).toBeInTheDocument();
  });

  it('displays a loading text', async () => {
    const delayHandler = http.get('/api/todos/', async () => {
        await delay()
        return HttpResponse.json({ todos })
    });

    server.use(delayHandler);
    render(<MainContent filter={TodoFilters.All} />);

    expect(screen.getByTestId('network-loading')).toBeInTheDocument();
    expect(screen.getByTestId('network-loading')).toHaveTextContent('Loading Todos...');
  });

  it('displays an error message when api returns an error', async () => {
    const errorHandler = http.get('/api/todos/', async () => {
      await delay();
      return HttpResponse.error();
    }); 

    server.use(errorHandler);
    render(<MainContent filter={TodoFilters.All} />);
    const error = await screen.findByTestId('network-error');

    expect(error).toBeInTheDocument();
  });
});
