import { Fragment } from "react/jsx-runtime";
import { Sequence } from "remotion";
import { QuestionSceneShort } from "./short/QuestionSceneShort";
import { TimerSceneShort } from "./short/TimerSceneShort";
import { LearningSceneShort } from "./short/LearningSceneShort";
import { SHORT_TIMINGS } from "../config";
import { BackgroundScene } from "./shared/BackgoundScene";
import { ThumbnailScene } from "./short/ThumbnailScene";
import { Category, ShortVideoConfig } from "../types";
import { assets } from "../data/assets";
import { Entity } from "../data/types";
import { KikuAnimation } from "./shared/KikuAnimation";
import { CorrectSceneShort } from "./short/CorrectSceneShort";
import { SongSceneShort } from "./short/SongSceneShort";
import { OutroSceneShort } from "./short/OutroSceneShort";

type ShortVideoProps = {
  category: Category;
  config?: ShortVideoConfig;
};

export const ShortVideo = ({
  category,
  config = {
    showQuestion: true,
    showTimer: true,
    showCorrect: true,
    showLearning: true,
    showSong: true,
    showOutro: true,
  },
}: ShortVideoProps) => {
  const { items, folder } = category;

  const timings = SHORT_TIMINGS;

  const contentStart = 0;
  
  const questionDuration = config.showQuestion ? timings.QUESTION : 0;
  const timerDuration = config.showTimer ? timings.TIMER : 0;
  const correctDuration = config.showCorrect ? timings.CORRECT : 0;
  
  const getLearningDuration = (item: Entity) =>
    config.showLearning ? item.learningFrames ?? timings.LEARNING : 0;
  
  const getSongDuration = (item: Entity) =>
    config.showSong ? item.songFrames ?? 0 : 0;
  
  const getItemDuration = (item: Entity) =>
    questionDuration +
    timerDuration +
    correctDuration +
    getLearningDuration(item) +
    getSongDuration(item);

  // const getItemsDuration = (items: Entity[]) =>
  //   items.reduce((total, item) => total + getItemDuration(item), 0);

  const totalItemsDuration =
    items.reduce((total, item) => total + getItemDuration(item), 0);

  const outroDuration = config.showOutro ? timings.OUTRO : 0;

  return (
    <>
      {/* THUMBNAIL */}
      <Sequence durationInFrames={1} >
        <ThumbnailScene thumbnail={assets.shared.shortThumbnail(folder)} />
      </Sequence>

      <BackgroundScene image={assets.video.backgroundShort(folder)} />

      {items.map((item, index) => {
        const itemStart = items.slice(0, index).reduce(
          (total, current) =>
            total + getItemDuration(current), contentStart
        );

        return (
          <Fragment key={item.name}>

            {/* QUESTION */}
            {config.showQuestion && (
              <Sequence from={itemStart} durationInFrames={questionDuration}>
                <QuestionSceneShort
                  image={assets.entity.image(item)}
                  folder={folder}
                  showTimer={config.showTimer}
                />
              </Sequence>
            )}

            {/* KIKU THINKING */}
            {config.showQuestion && (
              <Sequence
                from={itemStart}
                durationInFrames={questionDuration + timerDuration}
              >
                <KikuAnimation
                  webm={assets.shared.thinking}
                  style={{
                    position: "absolute",
                    bottom: -250,
                    right: -130,
                    width: 600,
                    zIndex: 100,
                    clipPath: "inset(0 0 15px 0)",
                  }}
                  volume={0.70}
                />
              </Sequence>
            )}

            {/* TIMER */}
            {config.showTimer && (
              <Sequence
                from={itemStart + questionDuration}
                durationInFrames={timerDuration}
              >
                <TimerSceneShort image={assets.entity.image(item)} />
              </Sequence>
            )}

            {/* CORRECT */}
            {config.showCorrect && (
              <Sequence
                from={itemStart + questionDuration + timerDuration}
                durationInFrames={correctDuration}
              >
                <CorrectSceneShort
                  image={assets.entity.image(item)}
                  audioFile={assets.shared.praise(item.praiseAudio)}
                />
              </Sequence>
            )}

            {/* LEARNING */}
            {config.showLearning && (
              <Sequence
                from={
                  itemStart +
                  questionDuration +
                  timerDuration +
                  correctDuration
                }
                durationInFrames={getLearningDuration(item)}
              >
                <LearningSceneShort
                  image={assets.entity.image(item)}
                  name={item.name}
                  hindiName={item.hindiName}
                  audioFile={assets.entity.narration(item)}
                  learningFrames={item.learningFrames}
                />
              </Sequence>
            )}

            {/* SONG VIDEO */}
            {config.showSong && (
              <Sequence
                from={
                  itemStart +
                  questionDuration +
                  timerDuration +
                  correctDuration +
                  getLearningDuration(item)
                }
                durationInFrames={getSongDuration(item)}
              >
                <SongSceneShort
                  itemName={{ english: item.name, hindi: item.hindiName || "" }}
                  songFile={assets.entity.song(item)}
                  videoFile={assets.entity.dance(item)}
                  songFrames={item.songFrames}
                  danceFrames={item.danceFrames}
                  folder={folder}
                />
            </Sequence>
            )}
          </Fragment>
        );
      })}

      {/* OUTRO */}
      {config.showOutro && (
        <Sequence from={totalItemsDuration} durationInFrames={outroDuration}>
          <OutroSceneShort audioFile={assets.shared.channelNameCallout} />
        </Sequence>
      )}
    </>
  );
};