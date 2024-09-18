import React from "react";

function LoadingArtistInfo() {
  return (
    <>
      <div className="wrapper ArtistInfo Skeleton animate-pulse bg-zinc-800  p-5 mx-5 max-w-[830px] pt-4 sm:w-3/5 md:w-4/5 sm:mx-auto rounded-lg mb-10 ">
        <div className="upper-row flex flex-row flex-wrap gap-3 mb-5">
          <div className="headline bg-zinc-900 w-full h-7 my-2 rounded-lg"></div>
          <div className="image bg-zinc-900 h-52 flex-grow-[4] rounded-lg"></div>
          <div className="text bg-zinc-900 h-52 flex-grow-[5] rounded-lg p-5 gap-3 flex flex-col">
            <div className="row bg-zinc-800 h-4 w-3/4 rounded-lg"></div>
            <div className="row bg-zinc-800 h-4 rounded-lg"></div>
            <div className="row bg-zinc-800 h-4 rounded-lg"></div>
            <div className="row bg-zinc-800 h-4 rounded-lg"></div>
            <div className="row bg-zinc-800 h-4 w-1/3 rounded-lg"></div>
          </div>
        </div>
        <div className="lower-row flex flex-row flex-wrap gap-3">
          <div className="list bg-zinc-900 h-52 flex-grow-[5] rounded-lg p-5 gap-3 flex flex-col">
            <div className="row bg-zinc-800 h-4 w-1/3 rounded-lg"></div>
            <div className="row bg-zinc-800 h-4 rounded-lg"></div>
            <div className="row bg-zinc-800 h-4 rounded-lg"></div>
            <div className="row bg-zinc-800 h-4 rounded-lg"></div>
            <div className="row bg-zinc-800 h-4 w-2/3 rounded-lg mb-10 "></div>
          </div>
          <div className="text bg-zinc-900 h-52 flex-grow-[4] mb-10 rounded-lg"></div>
        </div>
      </div>
    </>
  );
}

export default LoadingArtistInfo;
