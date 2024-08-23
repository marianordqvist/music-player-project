"use client";
import { CiPlay1, CiPause1, CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { setIsPlaying, setTrackUri } from "../state/MusicPlayer/MusicPlayerSlice";

const MusicPlayer = ({}) => {
  const AudioButtons = () => {
    return (
      <>
        <button className="p-2">
          <CiPlay1 size={20} />
        </button>
        <button className="p-2">
          <CiPause1 size={20} />
        </button>
        <button className="p-2">
          <CiVolumeHigh size={20} />
        </button>
        <button className="p-2">
          <CiVolumeMute size={20} />
        </button>
      </>
    );
  };

  return (
    <>
      <div className="audioPlayer flex justify-center my-14">
        <div className="px-40 mx-10 sm:w-full lg:w-2/3 xl:w-1/3 max-w-[1200px] bg-slate-200 p-5 rounded-full flex justify-center gap-3">
          <AudioButtons />
          {/* <p>Current track: {currentTrack?.title || "no track selected"}</p> */}
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
