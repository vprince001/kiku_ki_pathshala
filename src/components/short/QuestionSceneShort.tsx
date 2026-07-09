import { Audio, interpolate, useCurrentFrame } from "remotion";
import { ObjectImage } from "../shared/ObjectImage";
import { GuessTimerShort } from "./GuessTimerShort";
import { assets } from "../../data/assets";

type QuestionSceneShortProps = {
  image: string;
  folder: string;
  showTimer?: boolean;
};

export const QuestionSceneShort = ({
  image,
  folder,
  showTimer = false,
}: QuestionSceneShortProps) => {
  const frame = useCurrentFrame();

  const popScale = interpolate(
    frame,
    [0, 6, 12],
    [1.4, 2.3, 2],
    {
      extrapolateRight: "clamp",
    }
  );

  const floatY = Math.sin(frame / 15) * 5;

  return (
    <>
      {/* Object Image */}
        <ObjectImage
          image={image}
          style={{
            top: 300,
            right: 270,
            width: "50%",
            height: "50%",
          }}
          transform={`translateY(${floatY}px) scale(${popScale})`}
        />

      {/* Three Star Timer */}
      {showTimer && (
        <GuessTimerShort
          frame={frame}
          animated={false}
          starContainerStyle={{ top: 550 }}
          firstStarStyle={{ left: 80, width: 220, top: 790 }}
          secondStarStyle={{ left: 320, width: 220, top: 790 }}
          thirdStarStyle={{ left: 560, width: 220, top: 790 }}
        />
      )}

      {/* Question Audio */}
      <Audio src={assets.video.questionAudio(folder)} />
    </>
  );
};