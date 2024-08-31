"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { startPlayback } from "../state/MusicPlayer/MusicPlayerSlice";
import MusicCard from "../components/MusicCard";
import { RxReload } from "react-icons/rx";
import DefaultButton from "./DefaultButton";
import GetMusicCards from "./GetMusicCards";
import { useState } from "react";
import LoadingMusicCards from "./LoadingMusicCards";

const MusicCardList = () => {
  const dispatch = useDispatch<AppDispatch>(); // extract states from Redux store
  const { fetchCards, cardStatus, cards, error } = GetMusicCards();
  const device_id = useSelector((state: RootState) => state.MusicPlayer.device_id);
  const [hasFetched, setHasFetched] = useState(false);

  // fetch music cards
  const handleButtonClick = () => {
    fetchCards();
    setHasFetched(true); // To trigger rendering after button click
  };

  // Attempt to start playback
  const handlePlay = (uris: string) => {
    dispatch(startPlayback({ uris, device_id }));
  };

  return (
    <>
      <DefaultButton
        description="refetch-button"
        icon={<RxReload />}
        bgColor="bg-slate-200 mx-auto"
        clickFunction={handleButtonClick}
      />
      {hasFetched && (
        <>
          {cardStatus === "pending" && <LoadingMusicCards />}
          {cardStatus === "succeeded" && (
            <div>
              {cards.map((card) => (
                <MusicCard
                  cardId={card.id}
                  key={card.id}
                  image={card.album?.images?.[1].url}
                  songName={card.name}
                  artist={card.artists[0].name}
                  genre={card.genre}
                  onPlay={() => handlePlay(card.uri)}
                />
              ))}
            </div>
          )}
          {cardStatus === "rejected" && <div>Error: {error}</div>}
        </>
      )}
    </>
  );
};

export default MusicCardList;
