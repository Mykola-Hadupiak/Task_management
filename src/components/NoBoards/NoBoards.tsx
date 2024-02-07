/* eslint-disable global-require */
import { createBoard } from '../../api/api';
import { useAppDispatch } from '../../app/hooks';
import { setBoard } from '../../feauters/boards/boardsSlice';
import './NoBoards.scss';

export const favouritesPageImage = [
  require('../../assets/no-boards.png'),
][0];

export const NoBoards = () => {
  const dispatch = useAppDispatch();

  const handleCreateBoard = async () => {
    try {
      const board = await createBoard();

      dispatch(setBoard(board));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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
          Create new board
        </button>
      </div>
    </div>
  );
};
