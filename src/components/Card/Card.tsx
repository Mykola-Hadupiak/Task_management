import React, { useState } from 'react';
import cn from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import { Card as CardType } from '../../types/Card';
import './Card.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeCard, updateCardReducer } from '../../feauters/cards/cardsSlice';
import { deleteCard, updateCard, updateSortedinDb } from '../../api/api';
import {
  removeFromSorted,
  updateSorted,
} from '../../feauters/boards/boardsSlice';

type Props = {
  card: CardType;
  index: number;
};

export const Card: React.FC<Props> = ({ card, index }) => {
  const {
    id,
    title,
    description,
    status,
  } = card;
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const [isErrorOnEdit, setIsErrorOnEdit] = useState(false);
  const [isErrorOnDelete, setIsErrorOnDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [descriptionEdit, setDescriptionEdit] = useState(description);
  const { board } = useAppSelector(state => state.boards);

  const handleCancel = () => {
    setIsEditing(false);
    setDescriptionEdit(description);
    setTitleEdit(title);
    setIsErrorOnDelete(false);
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsErrorOnDelete(false);

    if (!board) {
      return;
    }

    if (title === titleEdit && descriptionEdit === description) {
      setIsEditing(false);

      return;
    }

    try {
      setIsErrorOnEdit(false);
      setIsLoading(true);

      const data = {
        id,
        title: titleEdit,
        description: descriptionEdit,
        status,
        boardId: board.id,
      };

      const updCard = await updateCard(data);

      dispatch(updateCardReducer(updCard));

      setTitleEdit(updCard.title);

      setDescriptionEdit(updCard.description);
    } catch (error) {
      setIsErrorOnEdit(true);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsErrorOnDelete(false);
      dispatch(removeCard(card));
      dispatch(removeFromSorted(id));

      await deleteCard(id);
    } catch (error) {
      setIsErrorOnDelete(true);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsErrorOnDelete(false);
  };

  const handleOnEnterSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handelSubmit(e);
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { card },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [card]);

  const handleDrop = async (draggedCardId: string) => {
    setIsErrorOnEdit(false);

    if (!board) {
      return;
    }

    const draggedIndex = board.sorted.indexOf(draggedCardId);

    if (draggedIndex === undefined || draggedIndex === index) {
      return;
    }

    const newSorted = [...board.sorted];

    newSorted.splice(draggedIndex, 1);
    newSorted.splice(index, 0, draggedCardId);

    dispatch(updateSorted(newSorted));

    try {
      await updateSortedinDb(board.id, newSorted);
    } catch (error) {
      setIsErrorOnEdit(true);
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (
      item: {
        card: { id: string }, index: number },
    ) => handleDrop(item.card.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [board]);

  return (
    <div
      className={cn('card', {
        'card--edit': isEditing,
        'card--dragging': isDragging,
        'card--is-over': isOver,
      })}
      ref={drop}
    >
      {isEditing && (
        <>
          <div className="card__top">
            <p className="card__title">Edit task</p>

            <button
              type="button"
              aria-label="trash"
              className="card__button"
              onClick={handleDelete}
            >
              <div className="trash" />

              {isErrorOnDelete && (
                <div className={cn({
                  'trash--error': isErrorOnDelete,
                })}
                >
                  Error on delete
                </div>
              )}
            </button>
          </div>

          <form
            className="form"
            onSubmit={handelSubmit}
          >
            <textarea
              name="title"
              id="title"
              className="textarea"
              rows={1}
              placeholder="Type title here"
              value={titleEdit}
              onChange={e => setTitleEdit(e.target.value)}
              disabled={isLoading}
              required
              onKeyDown={handleOnEnterSubmit}
            />

            <textarea
              name="description"
              id="description"
              className="textarea textarea--desc"
              rows={1}
              placeholder="Add description"
              value={descriptionEdit}
              onChange={e => setDescriptionEdit(e.target.value)}
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
                className="button-add button-add--save"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loading" />
                ) : (
                  <>
                    Save changes

                    {isErrorOnEdit && (
                      <div className={cn({
                        'button-add--save-error': isErrorOnEdit,
                      })}
                      >
                        Error on edit
                      </div>
                    )}
                  </>
                )}
              </button>
            </div>
          </form>
        </>

      )}

      {!isEditing && (
        <div
          className="card__conatiner"
          ref={!isEditing ? drag : null}
        >
          <div
            className="card__top"
          >
            <p className="card__title">{title}</p>

            <div className="card__buttons">
              <button
                type="button"
                aria-label="trash"
                className="card__button"
                onClick={handleEdit}
              >
                <div className="edit" />
              </button>

              <button
                type="button"
                aria-label="trash"
                className="card__button"
                onClick={handleDelete}
              >
                <div className="trash" />

                {isErrorOnDelete && (
                  <div className={cn({
                    'trash--error': isErrorOnDelete,
                  })}
                  >
                    Error on delete
                  </div>
                )}
              </button>
            </div>
          </div>

          {description && (
            <p className="card__description">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
