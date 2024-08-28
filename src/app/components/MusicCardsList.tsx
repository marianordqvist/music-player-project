"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { fetchCardInfo } from "../state/MusicCard/MusicCardSlice";
import { startPlayback } from "../state/MusicPlayer/MusicPlayerSlice";
import MusicCard from "../components/MusicCard";
import { RxReload } from "react-icons/rx";
import DefaultButton from "./DefaultButton";
import LoadingMusicCards from "./LoadingMusicCards";

const MusicCardList = () => {
  const dispatch = useDispatch<AppDispatch>(); // extract states from Redux store
  const cardStatus = useSelector((state: RootState) => state.MusicCard.status);
  const cards = useSelector((state: RootState) => state.MusicCard.cards);
  const error = useSelector((state: RootState) => state.MusicCard.error);
  const device_id = useSelector((state: RootState) => state.MusicPlayer.device_id);

  const handleButtonClick = () => {
    if (cardStatus !== "pending") {
      dispatch(fetchCardInfo());
    }

    if (cardStatus === "pending") {
      return <LoadingMusicCards />;
    }

    if (cardStatus === "rejected") {
      return <div> Error: {error}</div>;
    }
  };

  const handlePlay = (uris: string) => {
    dispatch(startPlayback({ uris, device_id })); // Attempt to start playback
  };

  return (
    <>
      <DefaultButton
        description="refetch-button"
        icon={<RxReload />}
        bgColor="bg-slate-200 mx-auto"
        clickFunction={handleButtonClick}
      />

      <div className="music-card-list max-w-[1100px] mx-auto mt-20">
        <div className="flex flex-wrap justify-center">
          {cards.map((card) => {
            return (
              <MusicCard
                cardId={card.id}
                key={card.id}
                image={card.album?.images?.[1].url}
                songName={card.name}
                artist={card.artists[0].name}
                genre={card.genre}
                onPlay={() => handlePlay(card.uri)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MusicCardList;
