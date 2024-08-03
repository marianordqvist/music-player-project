import { MusicCardInterface } from "../types/musicCardTypes";

const MusicCard: React.FC<MusicCardInterface> = ({ image, songName, artist }) => {
  return (
    <>
      <div className="music-card mb-5 p-5 bg-zinc-200 mr-5 inline-block">
        <img
          src={image}
          alt={songName}
          className="music-card-image h-32 w-32 object-cover"
        />
        <h3 className="music-card-title">{songName}</h3>
        <p className="music-card-artist font-bold">{artist}</p>
      </div>
    </>
  );
};

export default MusicCard;
