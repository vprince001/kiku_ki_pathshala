import { Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ObjectImage } from "../shared/ObjectImage";
import { GuessTimerLong } from "./GuessTimerLong";
import { assets } from "../../data/assets";

type QuestionSceneLongProps = {
  image: string;
  folder: string;
  showTimer?: boolean;
  showCorrect?: boolean;
};

export const QuestionSceneLong = ({
  image,
  folder,
  showTimer = true,
  showCorrect = true
}: QuestionSceneLongProps) => {
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
  const showTimerBox = showTimer || showCorrect;
  const [top, right, width, height] =
    showTimerBox ?
      [225, 850, 540, 430] :
      [270, 1075, 600, 540];

  return (
    <>
      {/* Object Image */}
      <ObjectImage
        image={image}
        style={{ top, right, width, height }}
        transform={`translateY(${floatY}px) scale(${popScale})`}
      />

      {/* Three Star Timer */}
      {showTimerBox && (
        <GuessTimerLong
          frame={frame}
          animated={false}
          starContainerStyle={{ top: 150 }}
          firstStarStyle={{ left: 550, width: 150, top: 730 }}
          secondStarStyle={{ left: 710, width: 150, top: 730 }}
          thirdStarStyle={{ left: 870, width: 150, top: 730 }}
        />
      )}

      {/* Question Audio */}
      <Audio src={assets.video.questionAudio(folder)} />
    </>
  );
};