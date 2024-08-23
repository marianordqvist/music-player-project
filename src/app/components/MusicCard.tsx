import { CardComponentInterface } from "../types/musicCardTypes";
import { FaCirclePlay } from "react-icons/fa6";
import { useState } from "react";

const MusicCard: React.FC<CardComponentInterface> = ({
  cardId,
  image,
  songName,
  artist,
  genre,
  onPlay,
}) => {
  const [playVisible, setPlayVisible] = useState(false);
  return (
    <>
      <div
        className={`${cardId} music-card mb-5 p-1 bg-white mr-5 inline-block rounded-md`}
        onMouseEnter={() => setPlayVisible(true)}
        onMouseLeave={() => setPlayVisible(false)}
      >
        {playVisible ? (
          <button onClick={onPlay}>
            <FaCirclePlay
              size="35"
              color="white"
              className="absolute"
              // onClick={onPlay}
            />
          </button>
        ) : null}
        <img
          src={image}
          alt={songName}
          className="music-card-image h-64 w-64 object-cover"
        />

        <h2 className="music-card-title font-bold pt-3 pl-3 w-40 max-h-14 mb-2 overflow-hidden">
          {songName}
        </h2>
        <h3 className="music-card-artist pl-3 ">{artist}</h3>
        <h4 className="music-card-genre pl-3 text-sm font-light">{genre}</h4>
      </div>
    </>
  );
};

export default MusicCard;
