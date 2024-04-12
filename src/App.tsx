import { Container } from './Container';
import { MainContent } from './MainContent';
import { Header } from './Header';
import Footer from './Footer';
import { useState } from 'react';
import { TodoFilters } from './TodoFilters';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function App() {
  const [filter, setFilter] = useState(TodoFilters.All);

  return (
    <Container>
      <Header />
      <MainContent filter={filter} />
      <Footer filter={filter} setFilter={setFilter} />
      <ReactQueryDevtools initialIsOpen={false} />
    </Container>
  );
}
