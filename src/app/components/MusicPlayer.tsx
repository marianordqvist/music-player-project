"use client";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { CiPlay1, CiPause1, CiVolumeHigh } from "react-icons/ci";
import LoadSpotifySDK from "./LoadSpotifySDK";
import {
  pausePlayback,
  startPlayback,
  setPlaybackVolume,
} from "../state/MusicPlayer/MusicPlayerSlice";
import Slider from "./Slider";
import { useState, useEffect, useCallback } from "react";

export default function MusicPlayer() {
  const dispatch = useAppDispatch();
  const isPaused = useAppSelector((state) => state.MusicPlayer.isPaused);
  const track = useAppSelector((state) => state.MusicPlayer.track);
  const artist = useAppSelector((state) => state.MusicPlayer.artist);
  const device_id = useAppSelector((state) => state.MusicPlayer.device_id);
  const duration = useAppSelector((state) => state.MusicPlayer.duration);
  const position_ms = useAppSelector((state) => state.MusicPlayer.position);
  const uris = useAppSelector((state) => state.MusicCard.uris);

  const [percentage, setPercentage] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [volumeRangeVisibility, setVolumeRangeVisibility] = useState(false);
  const [shouldPausePlayback, setShouldPausePlayback] = useState(false);

  LoadSpotifySDK();

  const handlePlay = () => {
    dispatch(startPlayback({ uris, device_id, position_ms }));
  };

  const handlePause = () => {
    dispatch(pausePlayback({ device_id }));
  };

  const handleVolume = (newVolume) => {
    dispatch(setPlaybackVolume({ device_id, volume: newVolume }));
  };

  // Slider calculation
  useEffect(() => {
    let intervalId;

    if (!isPaused && duration > 0) {
      setStartTime(Date.now());

      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime =
          currentTime - startTime + (position_ms > 0 ? position_ms : 0);
        const progress = (elapsedTime / duration) * 100;
        setPercentage(progress);
      }, 50); // times per ms that function is checking
    }
    return () => clearInterval(intervalId);
  }, [isPaused, duration, position_ms]);

  // debounce volume
  function debounceFunction(fn, delay) {
    let timeoutId;

    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  }

  const debouncedHandleVolume = useCallback(debounceFunction(handleVolume, 500), [
    device_id,
  ]);

  // if (isPaused) {
  //   return (
  //     <>
  //       <div className="bg-emerald-300 bg-opacity-50 text-black w-5/6 mx-auto sm:w-3/4 max-w-[700px] rounded-full px-5 text-center p-3 my-10">
  //         <p className="font-bold mb-2">
  //           Music player is not active - click a music card to start playing.
  //         </p>
  //         <div className="buttons flex flex-row gap-5 justify-center">
  //           <CiPlay1 size={20} />
  //           <CiPause1 size={20} />
  //           <CiVolumeHigh size={20} />
  //         </div>
  //       </div>
  //     </>
  //   );
  // } else {
  return (
    <>
      <div className=" bg-zinc-700 text-white w-5/6 mx-auto sm:w-3/4 max-w-[700px] rounded-full px-5 text-center p-3 my-10">
        <div className="flex flex-row justify-center gap-5 w-2/5 mx-auto box-border overflow-hidden whitespace-nowrap mb-3">
          <p className="mb-2 whitespace-nowrap animate-marquee">
            {artist ? artist : "Player currently inactive"} -{" "}
            {track ? track : "Click a card to start listening"}
          </p>
        </div>
        <div className="slider-wrapper w-3/5 mx-auto mb-7">
          <Slider percentage={percentage} />
        </div>
        <div className="player-buttons cursor-pointer flex flex-row gap-5 justify-center mb-2 items-center">
          <CiPlay1 size={20} onClick={() => handlePlay()} className="" />
          <CiPause1 size={20} onClick={() => handlePause()} className="" />
          <div className="volume relative">
            <CiVolumeHigh
              size={26}
              onClick={() => setVolumeRangeVisibility(!volumeRangeVisibility)}
            />
            {volumeRangeVisibility ? (
              <input
                className="absolute w-20 -right-[5.5rem] top-[0.6rem]"
                style={{ accentColor: "black" }}
                type="range"
                value={volume}
                onChange={(e) => {
                  const newVolume = Number(e.target.value);
                  setVolume(newVolume); // Set the volume state
                  debouncedHandleVolume(newVolume); // Call the debounced function with the new volume
                }}
                min={0}
                max={100}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
// }
