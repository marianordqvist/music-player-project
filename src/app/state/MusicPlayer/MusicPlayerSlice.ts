import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MusicPlayerInterface } from "../../types/musicPlayerTypes";

const initialState: MusicPlayerInterface = {
  isPlaying: false,
  volume: 0.5,
  trackUri: "",
  status: "idle",
  // currentTime: 0,
};

export const playTrackThunk = createAsyncThunk(
  "player/playtrack",
  async (trackUri: string, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/spotify-data/play", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackUri }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Assuming the server returns JSON error messages
        return rejectWithValue(errorData);
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const musicPlayerSlice = createSlice({
  name: "MusicPlayer",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      console.log("Play action dispatched");
      state.isPlaying = action.payload;
    },
    // setVolume: (state, action: PayloadAction<number>) => {
    //   console.log("volume action dispatched");
    //   state.volume = action.payload;
    // },
    setTrackUri: (state, action: PayloadAction<string>) => {
      state.trackUri = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(playTrackThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(playTrackThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.isPlaying = true;
      })
      .addCase(playTrackThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.isPlaying = false;
        console.error("error playing track: ", action.payload);
      });
  },
});

export const { setIsPlaying, setTrackUri } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;
