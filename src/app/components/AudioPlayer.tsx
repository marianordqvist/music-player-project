const AudioPlayer: React.FC = () => {
  return (
    <>
      <div className="audioPlayer">
        <audio controls>
          <source
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  );
};

export default AudioPlayer;
