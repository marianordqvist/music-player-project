import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MusicPlayerInterface } from "../../types/musicPlayerTypes";
import { playTrack, transferPlayback } from "@/_lib/SpotifyService";

const initialState: MusicPlayerInterface = {
  device_id: "",
  trackUri: "",
  status: "idle",
  error: null,
  volume: 0.5,
  isActive: false,
  playingTrack: null,
};

// thunk to transfer and start play
export const startPlayback = createAsyncThunk(
  "musicPlayer/startPlayback",
  async ({ trackUri, device_id }: { trackUri: string; device_id: string }) => {
    try {
      const response = await fetch("/api/spotify-data/play", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackUri, device_id }),
      });

      const data = await response.json();

      return (
        data.playingTrack +
        console.log("playingTracK returned: " + data.playingtrack)
      );
    } catch (error) {
      // Handle errors here if needed
      throw error;
    }
  }
);

const musicPlayerSlice = createSlice({
  name: "MusicPlayer",
  initialState,
  reducers: {
    setDeviceId: (state, action: PayloadAction) => {
      state.device_id = action.payload;
      // Device id works here
    },
    setIsActive(state, action) {
      state.isActive = action.payload;
    },
    setPlayingTrack: (state, action) => {
      state.playingTrack = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startPlayback.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(startPlayback.fulfilled, (state, action) => {
        state.status = "playing";
        state.playingTrack = action.payload;
      })
      .addCase(startPlayback.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
      });
  },
});

export const { setDeviceId, setIsActive, setPlayingTrack } =
  musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;
