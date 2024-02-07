import React, { useEffect, useState } from 'react';
import './App.scss';
import { Header } from './components/Header';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { thunkGetBoards } from './feauters/boards/boardsSlice';
import { NoBoards } from './components/NoBoards';
import { Loader } from './components/Loader';
import { Board } from './components/Board';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    boards,
    loading,
    board,
    error,
  } = useAppSelector(state => state.boards);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(thunkGetBoards());
  }, [dispatch, board]);

  const handleFindBoard = () => {
    return 1;
  };

  return (
    <div className="App">
      <Header />

      <main className="main">
        <div className="main__container">
          {loading && !board && (
            <div className="loader-container">
              <Loader />
            </div>
          )}

          {boards.length === 0 && !loading && !error && (
            <NoBoards />
          )}

          {!!boards.length && (
            <div className="main__content">
              <div className="search-form">
                <input
                  type="text"
                  className="search-form__input"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Enter board ID here"
                />

                <button
                  type="button"
                  onClick={handleFindBoard}
                  className="search-form__button"
                >
                  Go to board
                </button>
              </div>

              {board && (<Board />)}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
