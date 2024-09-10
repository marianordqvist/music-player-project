"use client";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { CiPlay1, CiPause1, CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import LoadSpotifySDK from "./LoadSpotifySDK";
import { pausePlayback } from "../state/MusicPlayer/MusicPlayerSlice";

export default function MusicPlayer() {
  const dispatch = useAppDispatch();
  const isPaused = useAppSelector((state) => state.MusicPlayer.isPaused);
  const track = useAppSelector((state) => state.MusicPlayer.track);
  const artist = useAppSelector((state) => state.MusicPlayer.artist);
  const device_id = useAppSelector((state) => state.MusicPlayer.device_id);

  // console.log("toggle in musicPlayer " + toggle);

  LoadSpotifySDK();

  const handlePlayAndPause = () => {
    dispatch(pausePlayback({ device_id }));
  };

  // Render conditions
  if (isPaused) {
    return (
      <>
        <div className="bg-emerald-300 bg-opacity-50 text-black m-auto w-1/3 rounded-full pl-10 text-center p-3 my-10">
          <p className="font-bold">
            Music player is not active - click a music card to start playing.
          </p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="bg-emerald-300 text-black m-auto w-1/3 rounded-full pl-10 text-center p-3 my-10">
          <div className="flex flex-row">
            <p className="mb-3">{artist ? artist : ""} - </p>
            <p className="font-bold"> {track ? track : "No track playing"}</p>
            <button onClick={() => handlePlayAndPause()}>
              {isPaused ? <CiPlay1 size={20} /> : <CiPause1 size={20} />}
            </button>{" "}
          </div>
        </div>
      </>
    );
  }
}
//   const AudioButtons = () => {
//     return (
//       <>
//         <button className="p-2">
//           <CiPlay1 size={20} />
//         </button>
//         <button className="p-2">
//           <CiPause1 size={20} />
//         </button>
//         <button className="p-2">
//           <CiVolumeHigh size={20} />
//         </button>
//         <button className="p-2">
//           <CiVolumeMute size={20} />
//         </button>
//       </>
//     );
//   };
