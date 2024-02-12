import React, { useEffect, useState } from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { thunkGetBoards } from './feauters/boards/boardsSlice';
import { NoBoards } from './components/NoBoards';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    boards,
    loading,
    board,
    error,
  } = useAppSelector(state => state.boards);
  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    dispatch(thunkGetBoards());
    setFirstLoad(true);
  }, [dispatch, board, firstLoad]);

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

          {boards.length === 0 && !loading && !error && firstLoad && (
            <NoBoards />
          )}

          {!!boards.length && (
            <div className="main__content">
              <Outlet />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
