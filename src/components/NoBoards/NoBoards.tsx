/* eslint-disable global-require */
import { useState } from 'react';
import { createBoard } from '../../api/api';
import { useAppDispatch } from '../../app/hooks';
import { setBoard } from '../../feauters/boards/boardsSlice';
import './NoBoards.scss';
import { setCard } from '../../feauters/cards/cardsSlice';

export const favouritesPageImage = [
  require('../../assets/no-boards.png'),
][0];

export const NoBoards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

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
    <div className="no-boards">
      <div className="no-boards__container">
        <img src={favouritesPageImage} alt="" />
        <p className="no-boards__title">
          Start managing your tasks
        </p>
        <button
          className="button"
          type="button"
          onClick={handleCreateBoard}
        >
          {isLoading ? (
            <div className="loading" />
          ) : (
            'Create new board'
          )}
        </button>
      </div>
    </div>
  );
};
