import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ApiCardInterface } from "@/app/types/musicCardTypes";

interface MusicCardSliceInterface {
  cards: ApiCardInterface[];
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
}

const initialState: MusicCardSliceInterface = {
  cards: [],
  status: "idle",
  error: null,
};

// thunk to fetch card data
export const fetchCardInfo = createAsyncThunk(
  "MusicCard/fetchCardInfo",
  async () => {
    const response = await fetch("/api/spotify-data");
    const data = await response.json();
    return data;
  }
);

const musicCardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardInfo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchCardInfo.fulfilled,
        (state, action: PayloadAction<ApiCardInterface[]>) => {
          state.status = "succeeded";
          state.cards = action.payload;
        }
      )
      .addCase(fetchCardInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message ?? "failed to fetch cards";
      });
  },
});

export default musicCardSlice.reducer;
