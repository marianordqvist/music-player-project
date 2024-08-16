import { CardComponentInterface } from "../types/musicCardTypes";

const MusicCard: React.FC<CardComponentInterface> = ({
  cardId,
  image,
  songName,
  artist,
  genre,
}) => {
  return (
    <>
      <div
        className={`${cardId} music-card mb-5 p-5 bg-white mr-5 inline-block rounded-md`}
      >
        <img
          src={image}
          alt={songName}
          className="music-card-image h-32 w-32 object-cover"
        />
        <h2 className="music-card-title font-bold">{songName}</h2>
        <h3 className="music-card-artist">{artist}</h3>
        <h4 className="music-card-genre text-sm font-light">{genre}</h4>
      </div>
    </>
  );
};

export default MusicCard;
