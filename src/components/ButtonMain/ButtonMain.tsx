import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import './ButtonMain.scss';
import { setBoard } from '../../feauters/boards/boardsSlice';
import { setCard } from '../../feauters/cards/cardsSlice';
import { createBoard } from '../../api/api';

export const ButtonMain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateBoard = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const board = await createBoard();

      dispatch(setBoard(board));
      dispatch(setCard());

      navigate(`/board/${board.id}`);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="button"
      type="button"
      onClick={handleCreateBoard}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="loading" />
      ) : (
        'Create new board'
      )}

      {isError && (
        <p className="button__error">Error</p>
      )}
    </button>
  );
};
