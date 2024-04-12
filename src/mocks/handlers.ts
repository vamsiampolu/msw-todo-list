import { HttpResponse, http } from 'msw';

type FindOneParams = {
  id: string;
};

type TodoPostItem = {
  text: string;
  completed: boolean;
};

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type BulkUpdateBody = {
  todos: Todo[];
};

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

const list = http.get('/api/todos/', () => {
  return HttpResponse.json({ todos });
});

const findOne = http.get<FindOneParams>('/api/todos/:id', ({ params }) => {
  const { id: idStr } = params;
  const id = Number.parseInt(idStr, 10);
  const todo = todos.find((item) => item.id === id);
  return HttpResponse.json({ todo });
});

const create = http.post<{}, TodoPostItem>(
  '/api/todos/',
  async ({ request }) => {
    const item = await request.json();
    const id = todos.length + 1;
    const newTodo = {
      ...item,
      id,
    };
    todos.push(newTodo);
    return HttpResponse.json(
      {
        id,
      },
      {
        status: 201,
      },
    );
  },
);

const bulkUpdate = http.post<{}, BulkUpdateBody>(
  '/api/todos/bulk-upsert',
  async ({ request }) => {
    const { todos: updatedTodos } = await request.json();
    const missingTodos = [];
    const foundTodos = [];
    for (const todo of updatedTodos) {
      const { id, text, completed } = todo;
      const found = todos.find((item) => item.id === id);

      if (!found) {
        missingTodos.push(todo);
      } else {
        foundTodos.push(todo);

        found.text = text;
        found.completed = completed;
      }
    }

    todos.push(...missingTodos);

    return HttpResponse.json({
      message: `${missingTodos.length} were inserted as they do not exist and ${foundTodos.length} were updated`,
      missingTodos,
      foundTodos,
    });
  },
);

const update = http.put<FindOneParams, TodoPostItem>(
  '/api/todos/:id',
  async ({ params, request }) => {
    const { id: idStr } = params;
    const id = Number.parseInt(idStr, 10);

    const item = await request.json();
    const found = todos.find((todo) => todo.id === id);

    console.log({
      message: 'Update todo',
      data: {
        id,
        body: item,
      },
      todo: found,
    });

    if (!found) {
      return HttpResponse.json(
        {
          message: 'Could not find todo item with id ' + idStr,
        },
        {
          status: 404,
        },
      );
    }

    found.text = item.text;
    found.completed = item.completed;

    return new HttpResponse(null, {
      status: 204,
    });
  },
);

const remove = http.delete<FindOneParams>('/api/todos/:id', ({ params }) => {
  const { id: idStr } = params;
  const id = Number.parseInt(idStr, 10);
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return HttpResponse.json(
      {
        message: 'Could not find todo item with id ' + idStr,
      },
      {
        status: 404,
      },
    );
  }

  console.log({
    message: 'Deleting todo',
    index,
  });

  todos.splice(index, 1);

  console.log({
    message: 'Updated todos',
    todos,
  });

  return new HttpResponse(null, {
    status: 204,
  });
});

export const handlers = [list, create, update, remove, findOne, bulkUpdate];
