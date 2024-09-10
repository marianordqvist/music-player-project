"use client";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { fetchAndUpdateArtistInfo } from "../state/ArtistInfo/ArtistInfoSlice";
import DisplayArtistInfo from "./DisplayArtistInfo";
import LoadingArtistInfo from "./LoadingArtistInfo";

export default function ArtistInfo() {
  const dispatch = useAppDispatch();
  const [gettingArtistInfo, setGettingArtistInfo] = useState(false);
  const artistId = useAppSelector((state) => state.ArtistInfo.artistId);
  const artistDataStatus = useAppSelector((state) => state.ArtistInfo.status);
  const musicIsPaused = useAppSelector((state) => state.MusicPlayer.isPaused);
  const targetElementRef = useRef(null);

  useEffect(() => {
    if (musicIsPaused === false) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          console.log("time to show artist info");
          setGettingArtistInfo(true);
          observer.disconnect();
        }
      });

      if (targetElementRef.current) {
        observer.observe(targetElementRef.current);
      }

      return () => observer.disconnect();
    }
  }, [musicIsPaused === true, artistId, dispatch]);

  // const getArtistInfo = () => {
  //   setGettingArtistInfo(true);
  // };

  useEffect(() => {
    if (gettingArtistInfo) {
      dispatch(fetchAndUpdateArtistInfo({ artistId }));
      setGettingArtistInfo(false);
    }
  }, [gettingArtistInfo]);

  return (
    <>
      <p className="" ref={targetElementRef} id="target-element">
        Keep scrolling to read more about this artist!
      </p>
      {artistDataStatus === "succeeded" && <DisplayArtistInfo />}
      {artistDataStatus === "pending" && <LoadingArtistInfo />}
      {artistDataStatus === "rejected" && <p>Unable to load artist data.</p>}
    </>
  );
}
