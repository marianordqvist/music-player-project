"use client";
import { pausePlayback } from "../state/MusicPlayer/MusicPlayerSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../state/store";
import { CiPlay1, CiPause1, CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import LoadSpotifySDK from "./LoadSpotifySDK";
import { MusicPlayerInterface } from "../types/musicPlayerTypes";

export default function MusicPlayer() {
  const dispatch = useDispatch<AppDispatch>();
  const isActive = useSelector((state: MusicPlayerInterface) => state.isActive);
  const playingTrack = useSelector(
    (state: MusicPlayerInterface) => state.playingTrack
  );
  const device_id = useSelector((state: RootState) => state.MusicPlayer.device_id);

  LoadSpotifySDK();

  const handlePause = () => {
    dispatch(pausePlayback(device_id));
  };

  // Render conditions
  if (isActive === false) {
    return <p>Instance is not active</p>;
  } else {
    return (
      <>
        <p>Currently playing</p>
        <p>song: {playingTrack?.name}</p>
        {/* {console.log("playingTrack i musicplayer component: " + playingTrack)} */}

        <button className="p-2" onClick={handlePause}>
          <CiPause1 size={20} />
        </button>

        {/* <div className="now-playing__artist">{currentTrack?.artists[0].name}</div> */}
        {/* <button
          onClick={() => {
            player.togglePlay().then(() => {
              console.log("toggled playback!");
            });
          }}
        >
          {isPaused ? <CiPlay1 size={20} /> : <CiPause1 size={20} />}
        </button> */}
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

//   return (
//     <>
//       <div className="audioPlayer flex justify-center my-14">
//         <div className="px-40 mx-10 sm:w-full lg:w-2/3 xl:w-1/3 max-w-[1200px] bg-slate-200 p-5 rounded-full flex justify-center gap-3">
//           <AudioButtons />
//           {/* <p>Current track: {currentTrack?.title || "no track selected"}</p> */}
//         </div>
//       </div>
//     </>
//   );
// };
