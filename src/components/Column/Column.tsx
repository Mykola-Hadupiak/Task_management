import cn from 'classnames';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDrop } from 'react-dnd';
import { Status } from '../../types/Status';
import './Column.scss';
import { Card } from '../Card';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createCard, updateCard } from '../../api/api';
import { addCard, updateCardReducer } from '../../feauters/cards/cardsSlice';
import { Card as CardType } from '../../types/Card';
import { addToSorted } from '../../feauters/boards/boardsSlice';

type Props = {
  column: {
    id: number,
    status: Status,
    title: string,
  }
};

export const Column: React.FC<Props> = ({ column }) => {
  const { cards } = useAppSelector(state => state.cards);
  const { status, title } = column;
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [addTitle, setAddTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();

  const { board } = useAppSelector(state => state.boards);

  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddNew = () => {
    setIsAdding(true);
  };

  useEffect(() => {
    if (isAdding && titleTextareaRef.current) {
      titleTextareaRef.current.focus();
    }
  }, [isAdding]);

  const handleCancel = () => {
    setIsAdding(false);
    setDescription('');
    setAddTitle('');
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!board) {
      return;
    }

    try {
      setIsLoading(true);
      const data = {
        title: addTitle,
        description,
      };

      const card = await createCard(board.id, data);

      dispatch(addCard(card));
      dispatch(addToSorted(card.id));
      setAddTitle('');
      setDescription('');
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsAdding(false);
    }
  };

  const cardsToRender = useMemo(() => {
    if (!board) {
      return [];
    }

    return board.sorted
      .map(cardId => cards
        .find(card => card.id === cardId && card.status === status));
  }, [board, cards, status]);

  const addItemToColumn = async (card: CardType) => {
    if (card.status === status) {
      return;
    }

    const cardToUpd = {
      ...card,
      status,
    };

    dispatch(updateCardReducer(cardToUpd));

    try {
      await updateCard(cardToUpd);
    } catch (error) {
      dispatch(updateCardReducer(card));
    }
  };

  const handleOnEnterSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handelSubmit(e);
    }
  };

  const [, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: { card: CardType }) => addItemToColumn(item.card),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      className={cn('column', {
        'column--todo': status === Status.TODO,
        'column--progress': status === Status.IN_PROGRESS,
        'column--done': status === Status.DONE,
      })}
      ref={drop}
    >
      <div
        className={cn('column__text-container', {
          'column__text-container--todo': status === Status.TODO,
          'column__text-container--progress': status === Status.IN_PROGRESS,
          'column__text-container--done': status === Status.DONE,
        })}
      >
        <p className="column__text">
          {`● ${title}`}
        </p>
      </div>

      {cardsToRender.length > 0 && (
        <div className="column__cards">
          {cardsToRender.map((card, ind) => (
            card !== undefined && (
              <Card card={card} key={card.id} index={ind} />
            )
          ))}
        </div>
      )}

      {isAdding && (
        <div className="form-add-new">
          <p>Add new task</p>

          <form className="form" onSubmit={handelSubmit}>
            <textarea
              name="title"
              id="title"
              className="textarea"
              rows={1}
              placeholder="Type title here"
              value={addTitle}
              onChange={e => setAddTitle(e.target.value)}
              disabled={isLoading}
              required
              ref={titleTextareaRef}
              onKeyDown={handleOnEnterSubmit}
            />

            <textarea
              name="description"
              id="description"
              className="textarea textarea--desc"
              rows={1}
              placeholder="Add description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              disabled={isLoading}
              onKeyDown={handleOnEnterSubmit}
            />

            <div className="form-add-new__buttons">
              <button
                type="button"
                className="button-cancel"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="button-add"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading" />
                ) : (
                  'Add task'
                )}

                {isError && (
                  <p className="button-add__error">Error</p>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {status === Status.TODO && !isAdding && (
        <div className="column__add-new">
          <button
            type="button"
            className="column__button"
            onClick={handleAddNew}
          >
            + Add new
          </button>
        </div>
      )}
    </div>
  );
};
