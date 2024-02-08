/* eslint-disable global-require */
import './NoBoards.scss';
import { ButtonMain } from '../ButtonMain';

export const noBoardsImage = [
  require('../../assets/no-boards.png'),
][0];

export const NoBoards = () => {
  return (
    <div className="no-boards">
      <div className="no-boards__container">
        <img src={noBoardsImage} alt="" />

        <p className="no-boards__title">
          Start managing your tasks
        </p>

        <ButtonMain />
      </div>
    </div>
  );
};
