import {
  configureStore,
} from '@reduxjs/toolkit';
import boardsSlice from '../feauters/boards/boardsSlice';
import cardsSlice from '../feauters/cards/cardsSlice';

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
    cards: cardsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
