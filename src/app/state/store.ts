import { configureStore } from "@reduxjs/toolkit";
import musicPlayerSliceReducer from "./MusicPlayer/MusicPlayerSlice";
import musicCardsSliceReducer from "./MusicCard/MusicCardSlice";

export const store = configureStore({
  reducer: {
    MusicPlayer: musicPlayerSliceReducer,
    MusicCard: musicCardsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
