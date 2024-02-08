import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './Board.scss';
import { Status } from '../../types/Status';
import { Column } from '../Column';
import { setBoard } from '../../feauters/boards/boardsSlice';
import { deleteBoard } from '../../api/api';
import { setCard } from '../../feauters/cards/cardsSlice';

const columns = [
  {
    id: 1,
    status: Status.TODO,
    title: 'To do',
  },
  {
    id: 2,
    status: Status.IN_PROGRESS,
    title: 'In progress',
  },
  {
    id: 3,
    status: Status.DONE,
    title: 'Done',
  },
];

export const Board = () => {
  const { board } = useAppSelector(state => state.boards);
  const dispatch = useAppDispatch();

  useEffect(() => {
  }, [board]);

  const handleCopyClick = async () => {
    try {
      if (board) {
        await navigator.clipboard.writeText(board.id);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Unable to copy text:', error);
    }
  };

  const handleDeleteBoard = async () => {
    try {
      if (board) {
        await deleteBoard(board.id);
      }

      dispatch(setBoard(null));
      dispatch(setCard());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className="board">
      <div className="board__top">
        <p className="board__id">
          {`Board ID ${board?.id.slice(0, 5)}`}
          <button
            type="button"
            aria-label="copy"
            className="board__button-copy"
            onClick={handleCopyClick}
            title="copy"
          >
            <div className="board__copy" />
          </button>
        </p>

        <button
          className="board__button-trash"
          type="button"
          onClick={handleDeleteBoard}
        >
          <div className="trash" />
          Delete board
        </button>
      </div>

      <div className="columns">
        {columns.map(column => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
};
