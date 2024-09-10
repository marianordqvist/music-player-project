"use client";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useState, useEffect } from "react";
import { startPlayback } from "../state/MusicPlayer/MusicPlayerSlice";
import { setArtistId } from "../state/ArtistInfo/ArtistInfoSlice";
import { RxReload } from "react-icons/rx";
import MusicCard from "./MusicCard";
import DefaultButton from "./DefaultButton";
import GetMusicCards from "./GetMusicCards";
import LoadingMusicCards from "./LoadingMusicCards";

const MusicCardList = () => {
  const dispatch = useAppDispatch(); // extract states from Redux store
  const { fetchCards, cardStatus, cards } = GetMusicCards();
  const device_id = useAppSelector((state) => state.MusicPlayer.device_id);
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
  const handlePlay = (uris: string, artistId: string) => {
    setShouldAttemptPlay(true);
    setUris(uris);
    dispatch(setArtistId(artistId));
  };

  useEffect(() => {
    if (shouldAttemptPlay) {
      dispatch(startPlayback({ uris: uris, device_id }));
      setShouldAttemptPlay(false);
    }
  }, [shouldAttemptPlay]);

  const MapCards = () => {
    if (cards) {
      return (
        <>
          <ul className="flex flex-row flex-wrap mx-auto justify-center mt-28 max-w-[1100px]">
            {cards.map((card) => (
              <li key={card.id}>
                <MusicCard
                  cardId={card.id}
                  image={card.album?.images?.[1].url}
                  songName={card.name}
                  artist={card.artists[0].name}
                  genre={card.genre}
                  onPlay={() => handlePlay(card.uri, card.artists?.[0].id)}
                />
              </li>
            ))}
          </ul>
        </>
      );
    }
  };

  return (
    <>
      <div className={`musicCardsList-wrapper ${cards ? "" : "h - screen"} `}>
        <DefaultButton
          description="refetch-cards-button"
          icon={<RxReload />}
          bgColor="bg-slate-200 mx-auto block"
          clickFunction={handleButtonClick}
        />

        {cardStatus === "pending" && <LoadingMusicCards />}
        {cardStatus === "succeeded" && MapCards()}
        {cardStatus === "rejected" && <div className="">Cannot load cards</div>}
      </div>
    </>
  );
};

export default MusicCardList;
