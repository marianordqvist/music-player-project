"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { fetchCardInfo } from "../state/MusicCard/MusicCardSlice";
import MusicCard from "../components/MusicCard";

const MusicCardList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, loading, error } = useSelector(
    (state: RootState) => state.MusicCard
  );

  useEffect(() => {
    dispatch(fetchCardInfo());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="music-card-list">
      {cards.map((card) => (
        <MusicCard
          key={card.id}
          image={card.image}
          songName={card.songName}
          artist={card.artist}
        />
      ))}
    </div>
  );
};

export default MusicCardList;
