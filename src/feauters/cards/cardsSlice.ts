/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Card } from '../../types/Card';
import { getCards } from '../../api/api';

export interface CardsState {
  cards: Card[];
  error: boolean,
  loading: boolean,
}

const initialState: CardsState = {
  cards: [],
  error: false,
  loading: false,
};

export const thunkGetCards = createAsyncThunk(
  'cards/fetchCards', (id: string) => {
    return getCards(id);
  },
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<Card>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload.id);
    },
    setCard: (state) => {
      state.cards = [];
    },
    updateCardReducer: (state, action: PayloadAction<Card>) => {
      const updatedIndex = state.cards
        .findIndex(card => card.id === action.payload.id);

      if (updatedIndex !== -1) {
        state.cards[updatedIndex] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkGetCards.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(thunkGetCards.fulfilled,
        (state, action: PayloadAction<Card[]>) => {
          state.cards = action.payload;
          state.loading = false;
        })
      .addCase(thunkGetCards.rejected, (state) => {
        state.error = true;
      });
  },
});

export const {
  addCard,
  removeCard,
  setCard,
  updateCardReducer,
} = cardsSlice.actions;

export default cardsSlice.reducer;
