import AudioPlayer from "@/app/components/AudioPlayer";
import MusicCardList from "@/app/components/MusicCardsList";
import LogOut from "@/app/components/LogOut";
import { auth } from "../../../../authconfig";

async function Greeting() {
  const session = await auth();

  if (!session || !session.user) return null;

  const userName = session.user.name || "";
  console.log(session.user);
  return <div className="mb-5">Hello {userName}!</div>;
}

export default async function Dashboard() {
  return (
    <>
      <div className="m-5">
        <Greeting />
        <MusicCardList />
        <AudioPlayer />
        <LogOut />
      </div>
    </>
  );
}
