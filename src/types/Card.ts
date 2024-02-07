import { Status } from './Status';

export interface Card {
  id: string,
  title: string,
  description?: string,
  status: Status,
  boardId: string,
}
