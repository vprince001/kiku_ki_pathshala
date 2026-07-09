import { useCurrentFrame } from "remotion";
import { ObjectImage } from "../shared/ObjectImage";
import { GuessTimerShort } from "./GuessTimerShort";

type TimerSceneShort = {
  image: string;
};

export const TimerSceneShort = ({ image }: TimerSceneShort) => {
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

        {/* Timer with yellow box */}
        <GuessTimerShort
          frame={frame}
          starContainerStyle={{ top: 550 }}
          firstStarStyle={{ left: 80, width: 220, top: 790 }}
          secondStarStyle={{ left: 320, width: 220, top: 790 }}
          thirdStarStyle={{ left: 560, width: 220, top: 790 }}
          animated
        />
    </>
  );
};
