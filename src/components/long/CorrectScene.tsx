import {
  Audio,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ObjectImage } from "../shared/ObjectImage";
import { TimerBox } from "../shared/TimerBox";
import { assets } from "../../data/assets";

type CorrectSceneLongProps = {
  image: string;
  audioFile: string;
  folder: string;
};

export const CorrectScene = ({ image, audioFile, folder }: CorrectSceneLongProps) => {
  const frame = useCurrentFrame();

  const floatY = Math.sin(frame / 15) * 5;

  return (
    <>
      {/* OBJECT IMAGE */}
      <ObjectImage
        image={image}
        style={{
          top: 225,
          right: 850,
          width: 540,
          height: 430,
        }}
        transform={`translateY(${floatY}px) scale(2)`}
      />

      {/* Yellow Box */}
      <TimerBox style={{
        position: "absolute",
        bottom: -110,
        left: "41%",
        transform: "translateX(-50%)",
        width: 650,
      }} />

      {/* Three star bounce animation */}
      <OffthreadVideo
        src={staticFile("shared/images/timer/star_animation.webm")}
        trimBefore={4}
        volume={0}
        style={{
          position: "absolute",
          top: 480,
          left: "41%",
          transform: "translateX(-50%)",
          width: 520,
          zIndex: 0,
        }}
        transparent
      />

      {/* Three star bounce audio effect */}
      <Audio
        src={assets.shared.starSparkle}
        volume={0.7}
      />

      {/* Kiku Happy */}
      <OffthreadVideo
        src={assets.shared.happy}
        style={{
          position: "absolute",
          bottom: 0,
          right: 100,
          width: 600,
          zIndex: 999,
        }}
        transparent
      />

      {/* Correct Audio */}
      <Audio src={audioFile} />
    </>
  );
};
