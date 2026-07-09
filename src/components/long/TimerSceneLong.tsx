import { useCurrentFrame } from "remotion";
import { ObjectImage } from "../shared/ObjectImage";
import { GuessTimerLong } from "./GuessTimerLong";

type TimerSceneLongProps = {
  image: string;
};

export const TimerSceneLong = ({ image }: TimerSceneLongProps) => {
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

        {/* Timer with yellow box */}
        <GuessTimerLong
          frame={frame}
          starContainerStyle={{ top: 150 }}
          firstStarStyle={{ left: 550, width: 150, top: 730 }}
          secondStarStyle={{ left: 710, width: 150, top: 730 }}
          thirdStarStyle={{ left: 870, width: 150, top: 730 }}
          animated
        />
    </>
  );
};
