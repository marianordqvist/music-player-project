import AudioPlayer from "@/app/components/AudioPlayer";
import MusicCardList from "@/app/components/MusicCardsList";
import LogOut from "@/app/components/LogOut";
import UserAvatar from "@/app/components/userAvatar";

export default async function Dashboard() {
  return (
    <>
      <UserAvatar />
      <MusicCardList />
      <AudioPlayer />
      <LogOut />
    </>
  );
}
