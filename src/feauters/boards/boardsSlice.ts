/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBoards } from '../../api/api';
import { Board } from '../../types/Board';

export interface BoardsState {
  boards: Board[];
  board: Board | null,
  error: boolean,
  loading: boolean,
}

const initialState: BoardsState = {
  boards: [],
  board: null,
  error: false,
  loading: false,
};

export const thunkGetBoards = createAsyncThunk(
  'boards/fetchBoards', () => {
    return getBoards();
  },
);

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<Board | null>) => {
      state.board = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkGetBoards.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(thunkGetBoards.fulfilled,
        (state, action: PayloadAction<Board[]>) => {
          state.boards = action.payload;
          state.loading = false;
        })
      .addCase(thunkGetBoards.rejected, (state) => {
        state.error = true;
      });
  },
});

export const {
  setBoard,
} = boardsSlice.actions;

export default boardsSlice.reducer;
