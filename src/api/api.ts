import { client } from '../helpers/fetchMain';
import { Board } from '../types/Board';
import { Card } from '../types/Card';

export const getBoards = () => {
  return client.get<Board[]>('/boards');
};

export const getBoard = (id: string) => {
  return client.get<Board>(`/boards/${id}`);
};

export const createBoard = () => {
  return client.post<Board>('/boards');
};

export const deleteBoard = (id: string) => {
  return client.delete(`/boards/${id}`);
};

export const getCards = (id: string) => {
  return client.get<Card[]>(`/cards/${id}`);
};

export const deleteCard = (id: string) => {
  return client.delete(`/cards/${id}`);
};

export const createCard = (
  id: string,
  data: { title: string, description?: string },
) => {
  return client.post<Card>(`/cards/${id}`, data);
};

export const updateCard = (
  card: Card,
) => {
  return client.put<Card>(`/cards/${card.id}`, card);
};
