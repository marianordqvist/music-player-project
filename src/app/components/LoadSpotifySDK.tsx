import { useDispatch, useSelector } from "react-redux";
import { setDeviceId, setIsActive } from "../state/MusicPlayer/MusicPlayerSlice";
import { useEffect } from "react";
import { MusicPlayerInterface } from "../types/musicPlayerTypes";

function LoadSpotifySDK() {
  const dispatch = useDispatch();

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
        player.addListener("ready", ({ device_id }: MusicPlayerInterface) => {
          dispatch(setDeviceId(device_id));
        });

        player.addListener("not_ready", ({ device_id }: MusicPlayerInterface) => {});

        player.getCurrentState().then((state: Object) => {
          if (!state) {
            dispatch(setIsActive(false));
          } else {
            dispatch(setIsActive(true));
          }
        });

        player.connect();
      };
    }
    loadSDK();

    // Cleanup: Disconnect player and remove listeners when component unmounts
    // return () => {
    //   if (player) {
    //     console.log("Web Playback SDK disconnected");
    //     player.removeListener("ready");
    //     player.removeListener("not_ready");
    //     player.disconnect();
    //     console.log("Event listeners removed");
    //   }
    // };
  }, [dispatch]);

  return null;
}

export default LoadSpotifySDK;
