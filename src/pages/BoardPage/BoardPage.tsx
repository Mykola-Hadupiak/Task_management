import { useAppSelector } from '../../app/hooks';
import { Board } from '../../components/Board';
import { SearchForm } from '../../components/SearchForm';

export const BoardPage = () => {
  const { board } = useAppSelector(state => state.boards);

  return (
    <>
      <SearchForm />
      {board && (
        <Board />
      )}
    </>
  );
};
