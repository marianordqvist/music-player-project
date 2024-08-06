import AudioPlayer from "@/app/components/AudioPlayer";
import MusicCardList from "@/app/components/MusicCardsList";
import LogOut from "@/app/components/LogOut";

export default function Dashboard() {
  return (
    <>
      <MusicCardList />
      <AudioPlayer />
      <LogOut />
    </>
  );
}
