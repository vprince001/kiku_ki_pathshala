import { Fragment } from "react/jsx-runtime";
import { Sequence } from "remotion";
import { KikuThinking } from "./shared/KikuThinking";
import { QuestionSceneShort } from "./short/QuestionSceneShort";
import { TimerSceneShort } from "./short/TimerSceneShort";
import { RevealSceneShort } from "./short/RevealSceneShort";
import { OutroSceneShort } from "./short/OutroSceneShort";
import {
  SHORT_TIMINGS_ENGLISH_1_FACT,
  SHORT_TIMINGS_ENGLISH_2_FACT,
  SHORT_TIMINGS_HINDI_1_FACT,
  SHORT_TIMINGS_HINDI_2_FACT
} from "../config";
import { BackgroundScene } from "./shared/BackgoundScene";
import { ThumbnailScene } from "./short/ThumbnailScene";

export type LearningItem = {
  name: string;
  hindiName?: string;
  image: string;
  praiseAudio: string;
  narration: string;
  video: string;
  video2?: string;
};

export type OutroConfig = {
  video: string;
  duration: number;
  style: React.CSSProperties;
};

type ShortVideoProps = {
  items: LearningItem[];
  folder: string;
  outro: OutroConfig;
  showHindi?: boolean;
  factCount?: number;
};

export const ShortVideo = ({
  items,
  folder,
  outro,
  showHindi,
  factCount=1,
}: ShortVideoProps) => {
  const shortTimingEnglish = factCount === 1 ? SHORT_TIMINGS_ENGLISH_1_FACT : SHORT_TIMINGS_ENGLISH_2_FACT;
  const shortTimingHindi = factCount === 1 ? SHORT_TIMINGS_HINDI_1_FACT : SHORT_TIMINGS_HINDI_2_FACT;

  const shortTimings = showHindi ? shortTimingHindi : shortTimingEnglish;

  return (
    <>
      {/* LEARNING BG */}
      <Sequence
        from={0}
      >
        <BackgroundScene
          image="background_short.png"
          folder={folder}
        />
      </Sequence>

      <Sequence
        from={0}
        durationInFrames={2}
      >
        <ThumbnailScene
          thumbnail={`${folder}/thumbnail.png`}
        />
      </Sequence>
      {items.map((item, index) => {
        const start = index * shortTimings.ITEM_DURATION;

        return (
          <Fragment key={item.name}>

            {/* KIKU THINKING */}
            <Sequence
              from={start}
              durationInFrames={shortTimings.KIKU_THINKING_DURATION}
            >
              <KikuThinking />
            </Sequence>

            {/* QUESTION */}
            <Sequence
              from={start}
              durationInFrames={shortTimings.QUESTION_DURATION}
            >
              <QuestionSceneShort image={item.image} folder={folder} />
            </Sequence>

            {/* TIMER */}
            <Sequence
              from={start + shortTimings.TIMER_START_OFFSET}
              durationInFrames={shortTimings.TIMER_DURATION}
            >
              <TimerSceneShort
                image={item.image}
                audioFile={item.praiseAudio}
                folder={folder}
              />
            </Sequence>

            {/* REVEAL */}
            <Sequence
              from={start + shortTimings.REVEAL_START_OFFSET}
              durationInFrames={shortTimings.REVEAL_DURATION}
            >
              <RevealSceneShort
                image={item.image}
                name={item.name}
                hindiName={item.hindiName}
                audioFile={item.narration}
                videoFile={item.video}
                videoFile2={item.video2}
                folder={folder}
                timings={shortTimings}
              />
            </Sequence>
          </Fragment>
        );
      })}

      {/* BACKGROUND */}
      <Sequence
        from={items.length * shortTimings.ITEM_DURATION}
        durationInFrames={shortTimings.FACT_START_OFFSET}
      >
        <BackgroundScene image={"background_short.png"} folder={folder} />
      </Sequence>

      {/* OUTRO */}
      <Sequence
        from={items.length * shortTimings.ITEM_DURATION}
        durationInFrames={outro.duration}
      >
        <OutroSceneShort video={outro.video} style={outro.style} />
      </Sequence>
    </>
  );
};