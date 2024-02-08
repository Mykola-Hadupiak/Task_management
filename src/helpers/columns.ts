import { Status } from '../types/Status';

export const columns = [
  {
    id: 1,
    status: Status.TODO,
    title: 'To do',
  },
  {
    id: 2,
    status: Status.IN_PROGRESS,
    title: 'In progress',
  },
  {
    id: 3,
    status: Status.DONE,
    title: 'Done',
  },
];
