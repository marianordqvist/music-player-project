import { CardComponentInterface } from "../types/musicCardTypes";
import { FaCirclePlay } from "react-icons/fa6";

const MusicCard: React.FC<CardComponentInterface> = ({
  cardId,
  image,
  songName,
  artist,
  genre,
  onPlay,
}) => {
  return (
    <>
      <div
        className={`${cardId} group relative music-card mb-5 p-1 text-zinc-100 bg-zinc-800 mr-5 inline-block rounded-md`}
      >
        <button
          onClick={onPlay}
          className="absolute top-2 left-2 hidden group-hover:block"
        >
          <FaCirclePlay size="35" color="white" className="absolute" />
        </button>
        <img
          src={image}
          alt={songName}
          className="music-card-image h-64 w-64 object-cover"
        />

        <h2 className="music-card-title font-bold pt-3 pl-3 w-40 max-h-14 mb-2 overflow-hidden">
          {songName}
        </h2>
        <h3 className="music-card-artist pl-3 ">{artist}</h3>
        <h4 className="music-card-genre pl-3 text-sm font-light pb-5">{genre}</h4>
      </div>
    </>
  );
};

export default MusicCard;
