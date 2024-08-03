"use client";
import { CiPlay1, CiPause1, CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { play, pause } from "../state/MusicPlayer/MusicPlayerSlice";
import { useEffect } from "react";

const AudioPlayer: React.FC = () => {
  const playerRef = useRef<HTMLAudioElement>(null);
  const dispatch = useDispatch();

  // get state from redux store
  const isPlaying = useSelector((state: RootState) => state.MusicPlayer.isPlaying);
  const currentTrack = useSelector(
    (state: RootState) => state.MusicPlayer.currentTrack
  );
  // const currentTime = useSelector(
  //   (state: RootState) => state.MusicPlayer.currentTime
  // );

  // define handlers to dispatch actions
  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.play();
      console.log("handlePlay called");
      dispatch(play());
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pause();
      console.log("handlePause called");
      dispatch(pause());
    }
  };

  useEffect(() => {
    console.log(`isPlaying: ${isPlaying}`);
  }, [isPlaying]);

  return (
    <>
      <div className="audioPlayer">
        <button className="bg-slate-200 p-2" onClick={handlePlay}>
          <CiPlay1 />
        </button>
        <button className="bg-slate-200 p-2" onClick={handlePause}>
          <CiPause1 />
        </button>
        <button className="bg-slate-200 p-2">
          <CiVolumeHigh />
        </button>
        <button className="bg-slate-200 p-2">
          <CiVolumeMute />
        </button>
        {/* <p>Current track: {currentTrack?.title || "no track selected"}</p> */}
        <audio ref={playerRef} />
      </div>
    </>
  );
};

export default AudioPlayer;
