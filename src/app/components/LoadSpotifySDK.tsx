import { useAppDispatch } from "../hooks/hooks";
import {
  setDeviceId,
  setActive,
  setTrack,
  setArtist,
  setPaused,
  setDuration,
  setPosition,
} from "../state/MusicPlayer/MusicPlayerSlice";
import { useEffect, useRef } from "react";
import { SpotifySDKInterface } from "../types/musicPlayerTypes";

function LoadSpotifySDK() {
  const dispatch = useAppDispatch();
  const audioRef = useRef();

  useEffect(() => {
    async function loadSDK() {
      // Fetch the token from server to authenticate
      const response = await fetch("/api/spotify-data/play");
      const { token } = await response.json();
      if (!token) return null;

      //Load the Spotify Web Playback SDK
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      // create player instance
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOauthToken: (cb: Function) => {
            cb(token);
          },
          volume: 0.5,
        });

        // Player event listeners
        player.addListener("ready", ({ device_id }: { device_id: string }) => {
          dispatch(setDeviceId(device_id));
        });

        player.addListener(
          "not_ready",
          ({ device_id }: { device_id: string }) => {}
        );

        player.addListener(
          "player_state_changed",
          (state: SpotifySDKInterface | null) => {
            if (!state) {
              return;
            }

            // Assume the player is active whenever player_state_changed is fired
            dispatch(setActive(true));

            // Dispatch track info, paused state, song duration
            if (state) {
              dispatch(setTrack(state.track_window.current_track.name));
              dispatch(setArtist(state.track_window.current_track.artists[0].name));
              dispatch(setPaused(state.paused));
              dispatch(setDuration(state.duration)); //length of song
              dispatch(setPosition(state.position)); //position in song on pause
            }
            // Optionally use getCurrentState for further checks
            player.getCurrentState().then((state: SpotifySDKInterface) => {
              if (!state) {
                // Only set to inactive if getCurrentState consistently returns null
                dispatch(setActive(false));
              }
            });
          }
        );

        player.setName("Tune.in Player").then(() => {});

        player.connect();

        // Cleanup: Disconnect player and remove listeners when component unmounts
        return () => {
          if (player) {
            player.removeListener("ready");
            player.removeListener("not_ready");
            player.disconnect();
          }
        };
      };
    }
    loadSDK();
  }, [dispatch]);

  return null;
}

export default LoadSpotifySDK;
