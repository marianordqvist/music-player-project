"use client";
import { CiPlay1, CiPause1 } from "react-icons/ci";
// import { IoVolumeMediumOutline } from "react-icons/io5";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { play, pause } from "../state/MusicPlayer/MusicPlayerSlice";
import { useEffect } from "react";

// const sound = {
//   title: "Card Title",
//   song: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//   imageUrl:
//     "https://images.unsplash.com/photo-1521417531039-75e91486cc40?q=80&w=2629&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// };

const AudioPlayer: React.FC = () => {
  const playerRef = useRef<HTMLAudioElement>(null);
  const dispatch = useDispatch();

  // get state from redux store
  const isPlaying = useSelector((state: RootState) => state.MusicPlayer.isPlaying);
  // const currentTrack = useSelector(
  //   (state: RootState) => state.MusicPlayer.currentTrack
  // );
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
        {/* <button className="bg-slate-200 p-2">
          <IoVolumeMediumOutline />
        </button>
        <p>Current track: {currentTrack?.title || "no track selected"}</p> */}
        <audio ref={playerRef} />
      </div>
    </>
  );
};

export default AudioPlayer;
