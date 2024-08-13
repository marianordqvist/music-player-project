"use client";
import { useEffect } from "react";

const FetchSpotifyData = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/spotify-data");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div>Check console for Spotify data.</div>;
};

export default FetchSpotifyData;
