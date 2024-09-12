import React from "react";

const MusicCardSkeleton = () => {
  return (
    <>
      <div className="wrapper ArtistInfo Skeleton bg-zinc-700 p-1 mr-5 rounded-lg animate-pulse mb-5">
        <div className="image bg-zinc-950 h-64 w-64 rounded-t-lg mb-5"></div>

        <div className="row bg-zinc-950 h-3 mb-4 mx-3 w-3/4 rounded-lg"></div>
        <div className="row bg-zinc-950 h-3 mb-4 mx-3 rounded-lg"></div>
        <div className="row bg-zinc-950 h-3 mb-4 mx-3 w-1/3 rounded-lg"></div>
      </div>
    </>
  );
};

function LoadingMusicCards() {
  const skeletonArray = Array(6).fill(0);
  return (
    <>
      <div className="flex flex-row flex-wrap justify-center mt-28 max-w-[1100px] mx-auto">
        {skeletonArray.map((_, index) => (
          <MusicCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
}

export default LoadingMusicCards;
