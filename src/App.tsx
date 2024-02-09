import React, { useEffect } from 'react';
import './App.scss';

import { Header } from './components/Header';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { thunkGetBoards } from './feauters/boards/boardsSlice';
import { NoBoards } from './components/NoBoards';
import { Loader } from './components/Loader';
import { Board } from './components/Board';
import { SearchForm } from './components/SearchForm';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    boards,
    loading,
    board,
    error,
  } = useAppSelector(state => state.boards);

  useEffect(() => {
    dispatch(thunkGetBoards());
  }, [dispatch, board]);

  return (
    <div className="App">
      <Header />

      <main className="main">
        <div className="main__container">
          {loading && !board && !error && (
            <div className="loader-container">
              <Loader />
            </div>
          )}

          {error && (
            <p>Server error</p>
          )}

          {boards.length === 0 && !loading && !error && (
            <NoBoards />
          )}

          {!!boards.length && (
            <div className="main__content">
              <SearchForm />

              {board && (
                <Board />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
