"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { fetchAndUpdateArtistInfo } from "../state/ArtistInfo/ArtistInfoSlice";
import DisplayArtistInfo from "./DisplayArtistInfo";
import LoadingArtistInfo from "./LoadingArtistInfo";

export default function ArtistInfo() {
  const dispatch = useAppDispatch();
  const artistId = useAppSelector((state) => state.ArtistInfo.artistId);
  const artistDataStatus = useAppSelector((state) => state.ArtistInfo.status);
  const musicIsPaused = useAppSelector((state) => state.MusicPlayer.isPaused);
  const targetElementRef = useRef(null);

  //memoizedDisplayArtistInfo
  const MemoizedDisplayArtistInfo = useCallback(() => {
    return <DisplayArtistInfo />;
  }, []);

  useEffect(() => {
    if (musicIsPaused === false) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          dispatch(fetchAndUpdateArtistInfo({ artistId }));

          observer.disconnect();
        }
      });

      if (targetElementRef.current) {
        observer.observe(targetElementRef.current);
      }

      return () => observer.disconnect();
    }
  }, [musicIsPaused, artistId, dispatch]);

  return (
    <>
      <div className="" ref={targetElementRef} id="target-element"></div>
      {artistDataStatus === "succeeded" && <MemoizedDisplayArtistInfo />}
      {artistDataStatus === "pending" && <LoadingArtistInfo />}
      {artistDataStatus === "rejected" && <p>Unable to load artist data.</p>}
    </>
  );
}
