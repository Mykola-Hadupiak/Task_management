import React, { useEffect, useState } from 'react';
import './App.scss';
import { Header } from './components/Header';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setBoard, thunkGetBoards } from './feauters/boards/boardsSlice';
import { NoBoards } from './components/NoBoards';
import { Loader } from './components/Loader';
import { Board } from './components/Board';
import { getBoard } from './api/api';
import { thunkGetCards } from './feauters/cards/cardsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    boards,
    loading,
    board,
    error,
  } = useAppSelector(state => state.boards);
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(thunkGetBoards());
  }, [dispatch, board]);

  const handleFindBoard = async () => {
    if (!query.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      setIsError(false);

      const boardExist = await getBoard(query.trim());

      dispatch(thunkGetCards(boardExist.id));

      setQuery('');
      dispatch(setBoard(boardExist));
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsError(false);
  };

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
              <div className="search-form">
                <div className="search-form__query">
                  <input
                    type="text"
                    className="search-form__input"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Enter board ID here"
                    disabled={isLoading}
                  />

                  {isError && (
                    <p className="search-form__error">
                      Board not found. Try another query.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleFindBoard}
                  className="search-form__button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loading" />
                  ) : (
                    'Go to board'
                  )}
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
