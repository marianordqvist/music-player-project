import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { MusicCardState, MusicCardInterface } from "@/app/types/musicCardTypes";
import { musicCardData } from "../MusicCard/musicCardData";

const initialState: MusicCardState = {
  cards: [],
  loading: false,
  error: null,
};

// thunk to fetch card data
export const fetchCardInfo = createAsyncThunk(
  "MusicCard/fetchCardInfo",
  async () => {
    return new Promise<MusicCardInterface[]>((resolve) => {
      setTimeout(() => {
        resolve(musicCardData);
      }, 1000);
    });
  }
);

const musicCardSlice = createSlice({
  name: "MusicCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCardInfo.fulfilled,
        (state, action: PayloadAction<MusicCardInterface[]>) => {
          state.cards = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCardInfo.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error.message || "failed to fetch cards");
      });
  },
});

export default musicCardSlice.reducer;
