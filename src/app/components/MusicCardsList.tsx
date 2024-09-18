"use client";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useState, useEffect } from "react";
import { setPosition, startPlayback } from "../state/MusicPlayer/MusicPlayerSlice";
import { setArtistId } from "../state/ArtistInfo/ArtistInfoSlice";
import { setUris } from "../state/MusicCard/MusicCardSlice";
import MusicCard from "./MusicCard";
import GetMusicCards from "./GetMusicCards";
import LoadingMusicCards from "./LoadingMusicCards";
import { saveToSpotifyLibrary } from "../state/MusicCard/MusicCardSlice";

const MusicCardList = () => {
  const dispatch = useAppDispatch(); // extract states from Redux store
  const { fetchCards, cardStatus, cards } = GetMusicCards();
  const device_id = useAppSelector((state) => state.MusicPlayer.device_id);
  const position_ms = useAppSelector((state) => state.MusicPlayer.position);
  const uris = useAppSelector((state) => state.MusicCard.uris);
  const [shouldAttemptPlay, setShouldAttemptPlay] = useState(false);

  const [shouldAttemptFetchCards, setShouldAttemptFetchCards] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    setHasFetched(false);
    setShouldAttemptFetchCards(true);
    fetchCards();
    setHasFetched(true);
    setShouldAttemptFetchCards(false);
  }, []);

  // Start playback
  const handlePlay = (uris: string, artistId: string) => {
    setShouldAttemptPlay(true);
    dispatch(setUris(uris));
    dispatch(setPosition(0));
    dispatch(setArtistId(artistId));
  };

  useEffect(() => {
    if (shouldAttemptPlay) {
      dispatch(startPlayback({ uris, device_id, position_ms }));
      setShouldAttemptPlay(false);
    }
  }, [shouldAttemptPlay]);

  // save card to spotify library
  const handleSave = (ids: string) => {
    dispatch(saveToSpotifyLibrary(ids));
  };

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
                  onSave={() => handleSave(card.id)}
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
        {cardStatus === "idle" && hasFetched === false && <LoadingMusicCards />}
        {cardStatus === "pending" && <LoadingMusicCards />}
        {cardStatus === "succeeded" && MapCards()}
        {cardStatus === "rejected" && <div className="">Cannot load cards</div>}
      </div>
    </>
  );
};

export default MusicCardList;
