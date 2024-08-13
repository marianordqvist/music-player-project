import AudioPlayer from "@/app/components/AudioPlayer";
import MusicCardList from "@/app/components/MusicCardsList";
import LogOut from "@/app/components/LogOut";
import { auth } from "../../../../authconfig";
import FetchSpotifyData from "@/app/components/Fetchtest";

async function Greeting() {
  const session = await auth();

  if (!session || !session.user) return null;

  const userName = session.user.name || "";

  return <div className="mb-5">Hello {userName}!</div>;
}

export default async function Dashboard() {
  return (
    <>
      <div className="m-5">
        <FetchSpotifyData />
        <Greeting />
        <MusicCardList />
        <AudioPlayer />
        <LogOut />
      </div>
    </>
  );
}
