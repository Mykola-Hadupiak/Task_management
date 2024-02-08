// import { useState } from 'react';
import { useState } from 'react';
import { createBoard } from '../../api/api';
import { useAppDispatch } from '../../app/hooks';
import { setBoard } from '../../feauters/boards/boardsSlice';
import './Header.scss';
import { setCard } from '../../feauters/cards/cardsSlice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateBoard = async () => {
    try {
      setIsLoading(true);
      const board = await createBoard();

      dispatch(setBoard(board));
      dispatch(setCard());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="header">
      <div className="header__left">
        <div className="logo" />
        <p className="header__title">
          Pro Manage
        </p>
      </div>

      <button
        type="button"
        className="button"
        onClick={handleCreateBoard}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="loading" />
        ) : (
          'Create new board'
        )}
      </button>
    </div>
  );
};
