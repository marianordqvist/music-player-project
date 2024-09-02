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
import { useEffect } from "react";

const MusicCardList = () => {
  const dispatch = useDispatch<AppDispatch>(); // extract states from Redux store
  const { fetchCards, cardStatus, cards, error } = GetMusicCards();
  const device_id = useSelector((state: RootState) => state.MusicPlayer.device_id);
  const [shouldAttemptPlay, setShouldAttemptPlay] = useState(false);
  const [shouldAttemptFetchCards, setShouldAttemptFetchCards] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [uris, setUris] = useState("");

  // fetch music cards
  const handleButtonClick = () => {
    setShouldAttemptFetchCards(true);
  };

  useEffect(() => {
    if (shouldAttemptFetchCards) {
      fetchCards();
      setHasFetched(true);
      setShouldAttemptFetchCards(false);
    }
  }, [shouldAttemptFetchCards]);

  // Start playback
  const handlePlay = (uris: string) => {
    setShouldAttemptPlay(true);
    setUris(uris);
  };

  useEffect(() => {
    if (shouldAttemptPlay) {
      dispatch(startPlayback({ uris: uris, device_id }));
      setShouldAttemptPlay(false);
    }
  }, [shouldAttemptPlay]);

  const MapCards = () => {
    if (cards)
      return (
        <>
          <ul>
            {cards?.map((card) => (
              <li key={card.id}>
                <MusicCard
                  cardId={card.id}
                  image={card.album?.images?.[1].url}
                  songName={card.name}
                  artist={card.artists[0].name}
                  genre={card.genre}
                  onPlay={() => handlePlay(card.uri)}
                />
              </li>
            ))}
          </ul>
        </>
      );
  };

  return (
    <>
      <DefaultButton
        description="refetch-cards-button"
        icon={<RxReload />}
        bgColor="bg-slate-200 mx-auto block"
        clickFunction={handleButtonClick}
      />
      {hasFetched && (
        <>
          {cardStatus === "pending" && <LoadingMusicCards />}
          {cardStatus === "succeeded" && MapCards()}
          {cardStatus === "rejected" && <div>Error: {error}</div>}
        </>
      )}
    </>
  );
};

export default MusicCardList;
