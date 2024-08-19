import React from "react";

function LoadingArtistInfo() {
  return (
    <>
      <div className="wrapper ArtistInfo Skeleton bg-white p-5 sm:w-3/4 md:w-1/2 mx-auto rounded-lg mb-10 ">
        <div className="upper-row flex flex-row flex-wrap gap-3 mb-5">
          <div className="headline bg-zinc-200 w-full h-7 my-2 rounded-lg"></div>
          <div className="image bg-zinc-400 h-52 flex-grow-[4] rounded-lg"></div>
          <div className="text bg-zinc-200 h-52 flex-grow-[5] rounded-lg p-5 gap-3 flex flex-col">
            <div className="row bg-zinc-100 h-4 w-3/4 rounded-lg"></div>
            <div className="row bg-zinc-100 h-4 rounded-lg"></div>
            <div className="row bg-zinc-100 h-4 rounded-lg"></div>
            <div className="row bg-zinc-100 h-4 rounded-lg"></div>
            <div className="row bg-zinc-100 h-4 w-1/3 rounded-lg"></div>
          </div>
        </div>
        <div className="lower-row flex flex-row flex-wrap gap-3">
          <div className="list bg-zinc-200 h-52 flex-grow-[5] rounded-lg p-5 gap-3 flex flex-col">
            <div className="row bg-zinc-100 h-4 w-1/3 rounded-lg"></div>
            <div className="row bg-zinc-100 h-4 rounded-lg"></div>
            <div className="row bg-zinc-100 h-4 rounded-lg"></div>
            <div className="row bg-zinc-100 h-4 rounded-lg"></div>
            <div className="row bg-zinc-100 h-4 w-2/3 rounded-lg"></div>
          </div>
          <div className="text bg-zinc-200 h-52 flex-grow-[4] rounded-lg"></div>
        </div>
      </div>
    </>
  );
}

export default LoadingArtistInfo;
