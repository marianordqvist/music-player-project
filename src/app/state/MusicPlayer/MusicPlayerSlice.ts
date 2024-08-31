import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import { MusicPlayerInterface } from "../../types/musicPlayerTypes";

const initialState: MusicPlayerInterface = {
  device_id: "",
  uris: "",
  status: "idle",
  error: null,
  volume: 0.5,
  isActive: false,
  playingTrack: { name: "" },
};

// thunk to transfer and start play
export const startPlayback = createAsyncThunk(
  "musicPlayer/startPlayback",
  async ({ uris, device_id }: { uris: string; device_id: string }) => {
    try {
      const response = await fetch("/api/spotify-data/play", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris, device_id }),
      });

      const data = await response.json();
      return data.playingTrack;
    } catch (error) {
      throw error;
    }
  }
);

// thunk to pause playback
export const pausePlayback = createAsyncThunk(
  "musicPlayer/pausePlayback",
  async (device_id: { device_id: string }) => {
    try {
      const response = await fetch("/api/spotify-data/pause", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ device_id }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
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
