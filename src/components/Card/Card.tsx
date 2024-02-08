import React, { useState } from 'react';
import cn from 'classnames';
import { Card as CardType } from '../../types/Card';
import './Card.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeCard, updateCardReducer } from '../../feauters/cards/cardsSlice';
import { deleteCard, updateCard } from '../../api/api';

type Props = {
  card: CardType;
};

export const Card: React.FC<Props> = ({ card }) => {
  const {
    id,
    title,
    description,
    status,
  } = card;
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [descriptionEdit, setDescriptionEdit] = useState(description);
  const { board } = useAppSelector(state => state.boards);

  const handleCancel = () => {
    setIsEditing(false);
    setDescriptionEdit(description);
    setTitleEdit(title);
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!board) {
      return;
    }

    if (title === titleEdit && descriptionEdit === description) {
      setIsEditing(false);
    }

    try {
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
      // eslint-disable-next-line no-console
      console.log('errr');
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(removeCard(card));

      await deleteCard(id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('smth went wrong');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className={cn('card', {
      'card--edit': isEditing,
    })}
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
            </button>
          </div>

          <form className="form" onSubmit={handelSubmit}>
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
            />

            <div className="form-add-new__buttons">
              <button
                type="button"
                className="button-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="button-add button-save"
              >
                {isLoading ? (
                  <div className="loading" />
                ) : (
                  'Save changes'
                )}
              </button>
            </div>
          </form>
        </>

      )}

      {!isEditing && (
        <>
          <div className="card__top">
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
              </button>
            </div>
          </div>

          {description && (
            <p className="card__description">
              {description}
            </p>
          )}
        </>
      )}
    </div>
  );
};
