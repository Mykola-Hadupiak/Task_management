import { createBoard } from '../../api/api';
import { useAppDispatch } from '../../app/hooks';
import { setBoard } from '../../feauters/boards/boardsSlice';
import './Header.scss';

export const Header = () => {
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
      >
        Create new board
      </button>
    </div>
  );
};
