import { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/hooks";
import Image from "next/image";

export default function DisplayArtistInfo() {
  const artistData = useAppSelector((state) => state.ArtistInfo.artistData);
  const [currentArtist, setCurrentArtist] = useState<any>(null);

  useEffect(() => {
    if (artistData.fields) {
      setCurrentArtist({
        artistName: artistData.fields?.artistname?.["en-US"] || "No name available",
        followers: artistData.fields?.followers?.["en-US"] || " ",
        popularity: artistData.fields?.popularity?.["en-US"] || " ",
        genres: artistData.fields?.genres?.["en-US"] || [],
        readMore: artistData.fields?.readMore?.["en-US"] || " ",
        imageUrl: artistData.fields?.imageUrl?.["en-US"] || "/",
      });
    }
  }, [artistData]);

  if (!currentArtist) {
    return <p>No current artist data available</p>;
  }

  return (
    <>
      <div className="wrapper ArtistInfo  text-zinc-100 bg-zinc-800 p-5 mx-5 max-w-[830px] pt-4 sm:w-3/5 md:w-4/5 sm:mx-auto rounded-lg mb-10 ">
        <div className="upper-row flex flex-row flex-wrap gap-3 mb-5">
          <div className="headline w-full h-7 font-bold text-xl">
            {currentArtist.artistName}
          </div>
          <div className="upper-row gap-3 w-full flex flex-col md:flex-row">
            <Image
              src={currentArtist.imageUrl}
              alt="image of artist"
              width={320}
              height={320}
              className="image bg-zinc-900 w-full h-52 md:w-3/5 rounded-lg object-cover sm:object-cover"
            ></Image>
            <div className="stats-text bg-zinc-900 h-60 sm:h-52 rounded-lg p-3 pl-4 pr-3 gap-2 flex flex-col">
              <div>
                <p className="font-bold">Spotify followers: </p>
                <p>{currentArtist.followers.toLocaleString("en-US")}</p>
              </div>
              <div>
                <p className="font-bold">Popularity: </p>
                <p className="mb-3"> {currentArtist.popularity}</p>
              </div>
              <p className="text-xs max-w-full md:w-4/5">
                Popularity represents the popularity of the artist on Spotify. The
                value varies between 0 and 100. The artist's popularity is calculated
                from the popularity of all the artist's tracks.
              </p>
            </div>
          </div>
        </div>
        <div className="lower-row h-64 flex flex-col flex-wrap md:flex-row gap-3">
          <div className="list bg-zinc-900 w-full md:w-1/3 md:h-full rounded-lg p-3 gap-3 flex flex-col">
            <h3 className="font-bold">Genres</h3>
            <ul className="list-disc">
              {currentArtist.genres.length > 0 ? (
                currentArtist.genres.map((genre: string, index: number) => (
                  <li className="ml-4 pr-5" key={index}>
                    {genre}
                  </li>
                ))
              ) : (
                <li>No genres available</li>
              )}
            </ul>
          </div>
          <div className="text p-3 bg-zinc-900 md:h-full flex-grow-[8] mb-10 rounded-lg">
            <h3>Read more about this artist</h3>
            <a href={currentArtist.readMore}>Read more link </a>
          </div>
        </div>
      </div>
    </>
  );
}
