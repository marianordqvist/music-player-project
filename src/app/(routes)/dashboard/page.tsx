import MusicCardList from "@/app/components/MusicCardsList";
import { auth } from "../../../../authconfig";
import MusicPlayer from "@/app/components/MusicPlayer";
import ArtistInfo from "@/app/components/ArtistInfo";
import LoadingMusicCards from "@/app/components/LoadingMusicCards";

export default async function Dashboard() {
  return (
    <>
      <div className="bg-zinc-950">
        <div className="mx-5 m-auto">
          <MusicCardList />
          <MusicPlayer />
          <ArtistInfo />
        </div>
      </div>
    </>
  );
}
