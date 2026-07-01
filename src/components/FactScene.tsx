import {
  AbsoluteFill,
  Audio,
  staticFile,
  OffthreadVideo,
} from "remotion";

type FactSceneProps = {
  video: string;
  audioFile?: string;
  folder: string;
};

export const FactScene = ({
  video,
  audioFile,
  folder,
}: FactSceneProps) => {
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(`${folder}/videos/${video}`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* FACT AUDIO */}
      {audioFile && (
        <Audio
          src={staticFile(`${folder}/audio/${audioFile}`)}
        />
      )}

      {/* REVEAL MUSIC */}
      <Audio
        src={staticFile(`audio/reveal_music.mp3`)}
      />
    </AbsoluteFill>
  );
};