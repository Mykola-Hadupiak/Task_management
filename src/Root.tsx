import React from 'react';
import {
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { SearchForm } from './components/SearchForm';
import { BoardPage } from './pages/BoardPage';
import { PageNotFound } from './pages/PageNotFound';

export const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<SearchForm />} />

          <Route path="/board">
            <Route index element={<SearchForm />} />

            <Route
              path=":boardId"
              element={<BoardPage />}
            />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
