import { useDispatch } from "react-redux";
import { setDeviceId, setIsActive } from "../state/MusicPlayer/MusicPlayerSlice";
import { MusicPlayerApiInterface } from "../types/musicPlayerTypes";
import { useEffect } from "react";

function LoadSpotifySDK() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadSDK() {
      // Fetch the token from server
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
          getOauthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        });

        // Player event listeners - TODO REDUX!
        player.addListener("ready", ({ device_id }: MusicPlayerApiInterface) => {
          dispatch(setDeviceId(device_id));
          console.log("ready with device_iD: ", device_id);
        });

        player.addListener("not_ready", ({ device_id }: MusicPlayerApiInterface) => {
          console.log("Device ID has gone offline: ", device_id);
        });

        player.getCurrentState().then((state) => {
          if (!state) {
            dispatch(setIsActive(false));
            console.error("User is not playing music through the Web Playback SDK");
          } else {
            dispatch(setIsActive(true));
          }
        });

        player.connect().then((success) => {
          if (success) {
            console.log("The Web Playback SDK successfully connected to Spotify!");
          }
        });
      };
    }
    loadSDK();

    // Cleanup: Disconnect player and remove listeners when component unmounts
    // return () => {
    //   if (player.disconnect()) {
    //     console.log("Web Playback SDK disconnected");
    //   }
    // };
  }, [dispatch]);

  return null;
}

export default LoadSpotifySDK;
