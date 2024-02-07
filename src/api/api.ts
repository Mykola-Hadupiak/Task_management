import { client } from '../helpers/fetchMain';
import { Board } from '../types/Board';

export const getBoards = () => {
  return client.get<Board[]>('/boards');
};

export const createBoard = () => {
  return client.post<Board>('/boards');
};

export const deleteBoard = (id: string) => {
  return client.delete(`/boards/${id}`);
};
