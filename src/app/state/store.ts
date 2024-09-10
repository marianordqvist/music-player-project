import { configureStore } from "@reduxjs/toolkit";
import musicPlayerSliceReducer from "./MusicPlayer/MusicPlayerSlice";
import musicCardsSliceReducer from "./MusicCard/MusicCardSlice";
import artistInfoSliceReducer from "./ArtistInfo/ArtistInfoSlice";

export const store = configureStore({
  reducer: {
    MusicPlayer: musicPlayerSliceReducer,
    MusicCard: musicCardsSliceReducer,
    ArtistInfo: artistInfoSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
