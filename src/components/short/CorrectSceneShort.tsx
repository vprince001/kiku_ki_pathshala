import {
  Audio,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ObjectImage } from "../shared/ObjectImage";
import { KikuAnimation } from "../shared/KikuAnimation";
import { assets } from "../../data/assets";
import { TimerBox } from "../shared/TimerBox";

type CorrectSceneShortProps = {
  image: string;
  audioFile: string;
};

export const CorrectSceneShort = ({ image, audioFile }: CorrectSceneShortProps) => {
  const frame = useCurrentFrame();

  const floatY = Math.sin(frame / 15) * 5;

  return (
    <>
      {/* OBJECT IMAGE */}
      <ObjectImage
        image={image}
        style={{
          top: 300,
          right: 270,
          width: "50%",
          height: "50%",
        }}
        transform={`translateY(${floatY}px) scale(2)`}
      />

      {/* Yellow Box */}
      <TimerBox style={{
        position: "absolute",
        bottom: 120,
        left: "40%",
        transform: "translateX(-50%)",
        width: 1000,
      }} />

      {/* Three star bounce animation */}
      
        <OffthreadVideo
          src={staticFile("shared/images/timer/star_animation.webm")}
          trimBefore={4}
          volume={1}
          style={{
            position: "absolute",
            top: 680,
            left: "40%",
            transform: "translateX(-50%)",
            width: 850,
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
        <KikuAnimation
          webm={assets.shared.happy}
          style={{
            position: "absolute",
            bottom: -360,
            right: -150,
            width: 680,
            zIndex: 999,
          }}
        />
        <Audio src={audioFile} />
    </>
  );
};
