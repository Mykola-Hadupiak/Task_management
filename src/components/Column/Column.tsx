import cn from 'classnames';
import { Status } from '../../types/Status';
import './Column.scss';

type Props = {
  column: {
    id: number,
    status: Status,
    title: string,
  }
};

export const Column: React.FC<Props> = ({ column }) => {
  const { status, title } = column;

  return (
    <div
      className={cn('column', {
        'column--todo': status === Status.TODO,
        'column--progress': status === Status.IN_PROGRESS,
        'column--done': status === Status.DONE,
      })}
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

      {status === Status.TODO && (
        <div className="column__add-new">
          <button type="button" className="column__button">
            + Add new
          </button>
        </div>
      )}

    </div>
  );
};
