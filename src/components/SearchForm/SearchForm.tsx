import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './SearchForm.scss';
import { thunkGetCards } from '../../feauters/cards/cardsSlice';
import { getBoard } from '../../api/api';
import { setBoard } from '../../feauters/boards/boardsSlice';

export const SearchForm = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { board } = useAppSelector(state => state.boards);

  useEffect(() => {
    setQuery('');
    setIsLoading(false);
    setIsError(false);
  }, [board]);

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
  );
};
