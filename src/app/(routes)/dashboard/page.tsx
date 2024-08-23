import MusicCardList from "@/app/components/MusicCardsList";
import { auth } from "../../../../authconfig";
import LoadingArtistInfo from "@/app/components/LoadingArtistInfo";
import MusicPlayer from "@/app/components/MusicPlayer";

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
          <MusicPlayer />
          <LoadingArtistInfo />
        </div>
      </div>
    </>
  );
}
