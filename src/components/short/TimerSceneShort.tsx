import {
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ObjectImage } from "../shared/ObjectImage";
import { GuessTimerShort } from "./GuessTimerShort";

type TimerSceneShort = {
  image: string;
  audioFile: string;
  folder: string;
};

export const TimerSceneShort = ({ image, audioFile, folder }: TimerSceneShort) => {
  const frame = useCurrentFrame();

  const floatY = Math.sin(frame / 15) * 5;

  return (
    <>
      {/* OBJECT IMAGE */}
      <Sequence from={49} durationInFrames={51}>
        <ObjectImage
          image={`${folder}/images/${image}`}
          style={{
            top: 300,
            right: 270,
            width: "50%",
            height: "50%",
          }}
          transform={`translateY(${floatY}px) scale(2)`}
        />
      </Sequence>

      {/* Timer with yellow box */}
      <Sequence from={0} durationInFrames={100}>
        <GuessTimerShort
          frame={frame}
          starContainerStyle={{ top: 550 }}
          firstStarStyle={{ left: 80, width: 220, top: 790 }}
          secondStarStyle={{ left: 320, width: 220, top: 790 }}
          thirdStarStyle={{ left: 560, width: 220, top: 790 }}
          animated
        />
      </Sequence>

      {/* Three star bounce animation */}
      <Sequence from={40} durationInFrames={60}>
        <OffthreadVideo
          src={staticFile("timer/star_animation.webm")}
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
      </Sequence>

      {/* Kiku Happy */}
      <Sequence from={45} durationInFrames={55}>
        <OffthreadVideo
          src={staticFile("kiku/happy.webm")}
          style={{
            position: "absolute",
            bottom: -360,
            right: -150,
            width: 680,
            zIndex: 999,
          }}
          transparent
        />
      </Sequence>

      {/* Correct Audio */}
      <Sequence from={45}>
        <Audio src={staticFile(`audio/${audioFile}`)} />
      </Sequence>
    </>
  );
};
