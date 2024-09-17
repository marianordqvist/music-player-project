import {
  createSlice,
  createAsyncThunk,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";

interface ArtistInfoSliceInterface {
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
  artistId: string;
  artistData: {
    fields?: {
      artistname: {
        [key: string]: string;
      };
      followers: {
        [key: string]: number;
      };
      popularity: {
        [key: string]: number;
      };
      genres: {
        [key: string]: string[];
      };
      readMore: {
        [key: string]: string;
      };
      imageUrl: {
        [key: string]: string;
      };
      id: {
        [key: string]: string;
      };
    };
  };
}

const initialState: ArtistInfoSliceInterface = {
  status: "idle",
  error: null,
  artistId: "",
  artistData: {},
};

export const fetchAndUpdateArtistInfo = createAsyncThunk(
  "ArtistInfo/fetchAndUpdateArtistInfo",
  async ({ artistId }: { artistId: string }, { dispatch, rejectWithValue }) => {
    try {
      const artistInfo = await dispatch(fetchArtistInfo({ artistId })).unwrap();

      await dispatch(updateContentfulEntry({ artistInfo })).unwrap();

      let updatedEntry = await dispatch(fetchUpdatedContentfulEntry()).unwrap();

      // logic for checking that the most recent entry is shown
      let attempts = 0;
      const maxAttempts = 5;

      // fetch until ID matches or max attempts are reached
      while (updatedEntry.fields.id !== artistId && attempts < maxAttempts) {
        attempts++;
        updatedEntry = await dispatch(fetchUpdatedContentfulEntry()).unwrap();
      }

      // check if id of updatedEntry is the same as artistId
      // if it is, return updatedEntry
      // if it is not, fetch from contentful again to make sure latest post is returned

      if (updatedEntry.fields.id !== artistId) {
        // throw new Error("could not fetch latest updated entry");
        console.log("could not fetch latest updated entry");
      }

      return updatedEntry;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

// to fetch artist info from spotify
export const fetchArtistInfo = createAsyncThunk(
  "ArtistInfo/fetchArtistInfo",
  async ({ artistId }: { artistId: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/spotify-data/artistInfo?artistId=${artistId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch artist info: ${response.statusText}`);
      }

      const artistInfo = await response.json();
      return artistInfo;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

// to update contentful artist entry with info from spotify
export const updateContentfulEntry = createAsyncThunk(
  "Contentful/updateEntry",
  async (
    { artistInfo }: { artistInfo: ArtistInfoSliceInterface },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/contentful-data/PUT", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistInfo }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update Contentful entry: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

// to fetch the updated entry from contentful
export const fetchUpdatedContentfulEntry = createAsyncThunk(
  "Contentful/fetchUpdatedEntry",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/contentful-data/GET", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to get updated Contentful entry: ${response.statusText}`
        );
      }

      const updatedEntry = await response.json();
      return updatedEntry;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

const artistInfoSlice = createSlice({
  name: "ArtistInfo",
  initialState,
  reducers: {
    setArtistId: (state, action: PayloadAction<string>) => {
      state.artistId = action.payload;
    },
    setArtistData: (state, action: PayloadAction<object>) => {
      state.artistData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAndUpdateArtistInfo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        fetchAndUpdateArtistInfo.fulfilled,
        (state, action: PayloadAction<object>) => {
          state.status = "succeeded";
          state.artistData = action.payload;
        }
      )
      .addCase(fetchAndUpdateArtistInfo.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export const { setArtistId, setArtistData } = artistInfoSlice.actions;
export default artistInfoSlice.reducer;
