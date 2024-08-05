"use client";
import { CiPlay1, CiPause1, CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { play, pause } from "../state/MusicPlayer/MusicPlayerSlice";

const AudioPlayer = () => {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
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
    if (audioPlayerRef.current) {
      audioPlayerRef.current.play();
      dispatch(play());
    }
  };

  const handlePause = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      dispatch(pause());
    }
  };

  useEffect(() => {
    console.log(`isPlaying: ${isPlaying}`);
  }, [isPlaying]);

  const AudioButtons = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <>
      <div className="audioPlayer">
        <AudioButtons />
        {/* <p>Current track: {currentTrack?.title || "no track selected"}</p> */}
        <audio ref={audioPlayerRef} />
      </div>
    </>
  );
};

export default AudioPlayer;
