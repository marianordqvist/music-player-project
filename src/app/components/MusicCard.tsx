import { CardComponentInterface } from "../types/musicCardTypes";
import { FaCirclePlay } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";

const MusicCard = ({
  cardId,
  image,
  songName,
  artist,
  genre,
  onPlay,
  onSave,
}: CardComponentInterface) => {
  return (
    <>
      <div
        className={`music-card ${cardId} group hover:scale-105 duration-500 ease-in-out relative music-card w-[258px] mb-5 p-1 text-zinc-100 bg-zinc-800 mr-5 inline-block rounded-md`}
      >
        <button className="absolute right-7 bottom-7 hover:scale-110 duration-300 ease-in-out hidden group-hover:block">
          <IoMdHeart
            size={20}
            color="pink"
            className="absolute"
            style={{
              filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 1))",
            }}
            onClick={onSave}
          />
        </button>
        <button
          onClick={() => onPlay()}
          className="absolute hover:scale-105 duration-500 ease-in-out  top-24 ml-24 hidden group-hover:block"
        >
          <FaCirclePlay
            size="55"
            color="white"
            className="absolute"
            style={{
              filter: "drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.3))",
            }}
          />
        </button>
        <img
          src={image}
          alt={songName}
          className="music-card-image h-64 w-64 object-cover rounded-md"
        />

        <h2 className="music-card-title font-bold pt-3 pl-3 w-full max-h-14 mb-1 text-nowrap overflow-hidden">
          {songName}
        </h2>
        <h3 className="music-card-artist pl-3 text-nowrap w-full overflow-hidden mb-4">
          {artist}
        </h3>
        <h4 className="music-card-genre pl-3 text-sm font-light pb-2">{genre}</h4>
      </div>
    </>
  );
};

export default MusicCard;
