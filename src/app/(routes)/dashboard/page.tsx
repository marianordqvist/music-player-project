import AudioPlayer from "@/app/components/AudioPlayer";
import MusicCardList from "@/app/components/MusicCardsList";
import LogOut from "@/app/components/LogOut";
import { auth } from "../../../../authconfig";
import LoadingArtistInfo from "@/app/components/LoadingArtistInfo";

async function Greeting() {
  const session = await auth();

  if (!session || !session.user) return null;

  const userName = session.user.name || "";

  return <div className="mb-5">Hello {userName}!</div>;
}

export default async function Dashboard() {
  return (
    <>
      <div className="bg-zinc-100">
        <div className="mx-5">
          <Greeting />
          <MusicCardList />
          <AudioPlayer />

          <LoadingArtistInfo />
        </div>
      </div>
    </>
  );
}
