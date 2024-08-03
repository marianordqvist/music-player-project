import AudioPlayer from "@/app/components/AudioPlayer";
import MusicCardList from "@/app/components/MusicCardsList";

export default function Dashboard() {
  return (
    <>
      <MusicCardList />
      <AudioPlayer />
    </>
  );
}
