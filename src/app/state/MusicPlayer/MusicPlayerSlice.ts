import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MusicPlayerInterface } from "../../types/musicPlayerTypes";

const initialState: MusicPlayerInterface = {
  device_id: "",
  uris: "",
  status: "idle",
  error: null,
  volume: 0.5,
  isActive: false,
  isPaused: true,
  track: "",
  artist: "",
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
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.device_id = action.payload;
    },
    setActive(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
    setPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    setTrack: (state, action: PayloadAction<string>) => {
      state.track = action.payload;
    },
    setArtist: (state, action: PayloadAction<string>) => {
      state.artist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startPlayback.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(startPlayback.fulfilled, (state) => {
        state.status = "playing";
      })
      .addCase(startPlayback.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { setDeviceId, setActive, setPaused, setTrack, setArtist } =
  musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;
