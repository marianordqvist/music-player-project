import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ApiCardInterface } from "@/app/types/musicCardTypes";

interface MusicCardSliceInterface {
  cards: ApiCardInterface[];
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
  uris: string;
  ids: string;
}

const initialState: MusicCardSliceInterface = {
  cards: [],
  status: "idle",
  error: null,
  uris: "",
  ids: "",
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

export const saveToSpotifyLibrary = createAsyncThunk(
  "MusicCard/saveToSpotifyLibrary",
  async (ids: string, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/spotify-data/save", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

const musicCardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    resetCardStatus: (state) => {
      state.status = "idle";
    },
    setUris: (state, action: PayloadAction<string>) => {
      state.uris = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardInfo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCardInfo.fulfilled, (state, action: PayloadAction<[]>) => {
        state.status = "succeeded";
        state.cards = action.payload;
      })
      .addCase(fetchCardInfo.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const { resetCardStatus, setUris } = musicCardSlice.actions;
export default musicCardSlice.reducer;
