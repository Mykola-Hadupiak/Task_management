/* eslint-disable no-console */
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './Board.scss';
import { Column } from '../Column';
import { setBoard } from '../../feauters/boards/boardsSlice';
import { deleteBoard } from '../../api/api';
import { setCard } from '../../feauters/cards/cardsSlice';
import { columns } from '../../helpers/columns';

export const Board = () => {
  const { board } = useAppSelector(state => state.boards);
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeliting] = useState(false);
  const [isErrorOnDelete, setIsErrorOnDelete] = useState(false);
  const navigate = useNavigate();

  const handleCopyClick = async () => {
    try {
      if (board) {
        await navigator.clipboard.writeText(board.id);
      }
    } catch (error) {
      console.error('Unable to copy text:', error);
    }
  };

  const handleDeleteBoard = async () => {
    try {
      setIsErrorOnDelete(false);
      setIsDeliting(true);

      if (board) {
        await deleteBoard(board.id);
      }

      dispatch(setCard());
      dispatch(setBoard(null));
      navigate('/board');
    } catch (error) {
      setIsErrorOnDelete(true);
    } finally {
      setIsDeliting(false);
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
          disabled={isDeleting}
        >
          <div className="trash" />
          Delete board

          {isErrorOnDelete && (
            <div className={cn({
              'trash--error-on-board': isErrorOnDelete,
            })}
            >
              Error on delete
            </div>
          )}
        </button>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="columns">
          {columns.map(column => (
            <Column key={column.id} column={column} />
          ))}
        </div>
      </DndProvider>

    </div>
  );
};
