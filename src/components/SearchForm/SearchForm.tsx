import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './SearchForm.scss';
import { thunkGetCards } from '../../feauters/cards/cardsSlice';
import { getBoard } from '../../api/api';
import { setBoard } from '../../feauters/boards/boardsSlice';

export const SearchForm = () => {
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { board } = useAppSelector(state => state.boards);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isError]);

  useEffect(() => {
    setQuery('');
    setIsLoading(false);
    setIsError(false);
  }, [board]);

  const handleLoad = useCallback(async () => {
    if (!boardId) {
      return;
    }

    try {
      setIsLoading(true);
      setIsError(false);

      const boardExist = await getBoard(boardId);

      dispatch(thunkGetCards(boardExist.id));

      dispatch(setBoard(boardExist));
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [boardId, dispatch]);

  const handleFindBoard = useCallback(async () => {
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
      navigate(`/board/${boardExist.id}`);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, navigate, query]);

  useEffect(() => {
    handleLoad();

    return () => {
      dispatch(setBoard(null));
    };
  }, [dispatch, handleLoad]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsError(false);
  };

  const handleOnEnterSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      handleFindBoard();
    }
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
          onKeyDown={handleOnEnterSubmit}
          ref={inputRef}
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
