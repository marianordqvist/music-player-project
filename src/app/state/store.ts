import { configureStore } from "@reduxjs/toolkit";
import musicPlayerSliceReducer from "./MusicPlayer/MusicPlayerSlice";

export const store = configureStore({
  reducer: {
    MusicPlayer: musicPlayerSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
