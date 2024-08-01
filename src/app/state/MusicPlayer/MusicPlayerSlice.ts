import { createSlice } from "@reduxjs/toolkit";

interface MusicPlayerInterface {
  isPlaying: boolean;
  // currentTrack: object;
  // currentTime: number;
  // volume: number;
  // isMuted: boolean;
}

const initialState: MusicPlayerInterface = {
  isPlaying: false,
  // currentTrack: {
  //   title: "",
  //   waveType: "",
  //   imageUrl: "",
  // },
  // currentTime: 0,
  // volume: 1.0,
  // isMuted: false,
};

const musicPlayerSlice = createSlice({
  name: "MusicPlayer",
  initialState,
  reducers: {
    play: (state) => {
      console.log("Play action dispatched");
      state.isPlaying = true;
    },
    pause: (state) => {
      console.log("Pause action dispatched");
      state.isPlaying = false;
    },
    // setTrack: (state, action) => {
    //   state.currentTrack = action.payload;
    // },
    // setTime: (state, action) => {
    //   state.currentTime = action.payload;
    // },
    // setVolume: (state, action) => {
    //   state.volume = action.payload;
    // },
    // setMute: (state) => {
    //   state.isMuted = false;
    // },
  },
});

export const { play, pause } = musicPlayerSlice.actions;
export default musicPlayerSlice.reducer;
