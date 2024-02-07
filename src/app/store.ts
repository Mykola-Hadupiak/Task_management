import {
  configureStore,
} from '@reduxjs/toolkit';
import boardsSlice from '../feauters/boards/boardsSlice';

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
