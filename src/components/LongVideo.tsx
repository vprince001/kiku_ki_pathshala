import { Fragment } from "react/jsx-runtime";
import { Sequence } from "remotion";
import { BackgroundScene } from "./shared/BackgoundScene";
import { IntroScene } from "./long/IntroScene";
import { BriefScene } from "./long/BriefScene";
import { LearningSceneLong } from "./long/LearningSceneLong";
import { LONG_TIMINGS_ENGLISH, LONG_TIMINGS_HINDI } from "../config";
import { CompletionScene } from "./long/CompletionScene";
import { OutroScene } from "./long/OutroScene";
import { TimerSceneLong } from "./long/TimerSceneLong";
import { QuestionSceneLong } from "./long/QuestionSceneLong";
import { CorrectScene } from "./long/CorrectScene";
import { FactSceneLong } from "./long/FactSceneLong";
import { Category, LongVideoConfig } from "../types";
import { SongSceneLong } from "./long/SongSceneLong";
import { MilestoneScene } from "./long/MilestoneScene";
import { assets } from "../data/assets";
import { Entity } from "../data/types";
import { KikuAnimation } from "./shared/KikuAnimation";

type LongVideoProps = {
  category: Category;
  config?: LongVideoConfig;
};

export const LongVideo = ({
  category,
  config = {
    showIntro: true,
    showBrief: true,
    showQuestion: true,
    showHindi: true,
    showTimer: true,
    showCorrect: true,
    showLearning: true,
    showFact: true,
    showSong: true,
    showMilestone: true,
    showCompletion: true,
    showOutro: true,
  },
}: LongVideoProps) => {
  const { items, folder, title } = category;
  console.log('items--', items);

  const timings = config.showHindi ? LONG_TIMINGS_HINDI : LONG_TIMINGS_ENGLISH;

  const introDuration = config.showIntro ? timings.INTRO : 0;
  const briefDuration = config.showBrief ? timings.BRIEF : 0;
  const contentStart = introDuration + briefDuration;

  const questionDuration = config.showQuestion ? timings.QUESTION : 0;
  const timerDuration = config.showTimer ? timings.TIMER : 0;
  const correctDuration = config.showCorrect ? timings.CORRECT : 0;

  const getLearningDuration = (item: Entity) =>
    config.showLearning ? item.learningFrames ?? timings.LEARNING : 0;

  const getFactDuration = (item: Entity) =>
    config.showFact ? item.factFrames ?? timings.FACT : 0;

  const getSongDuration = (item: Entity) =>
    config.showSong ? item.songFrames ?? 0 : 0;

  const getItemDuration = (item: Entity) =>
    questionDuration +
    timerDuration +
    correctDuration +
    getLearningDuration(item) +
    getFactDuration(item) +
    getSongDuration(item);

  const getItemsDuration = (items: Entity[]) =>
    items.reduce((total, item) => total + getItemDuration(item), 0);

  const milestoneDuration = config.showMilestone ? timings.MILESTONE : 0;
  const milestones = config.milestones ?? [];

  const totalItemsDuration =
    items.reduce((total, item) => total + getItemDuration(item), 0);

  const completionStart =
    contentStart +
    totalItemsDuration +
    milestones.length * milestoneDuration;
  const completionDuration = config.showCompletion ? timings.COMPLETION : 0;

  const contentDuration =
    totalItemsDuration +
    milestones.length * milestoneDuration +
    completionDuration;

  const outroDuration = config.showOutro ? timings.OUTRO : 0;
  console.log("---", folder);

  return (
    <>
      {/* OPENING BG */}
      <BackgroundScene image={assets.video.openingBackground(folder)} />

      {/* INTRO */}
      {config.showIntro && (
        <Sequence durationInFrames={introDuration}>
          <IntroScene />
        </Sequence>
      )}

      {/* BRIEF */}
      {config.showBrief && (
        <Sequence from={introDuration} durationInFrames={briefDuration}>
          <BriefScene
            itemCount={items.length}
            musicFile={assets.shared.revealMusic}
            folder={folder}
          />
        </Sequence>
      )}

      {/* LEARNING BG */}
      {config.showLearning && (
        <Sequence from={contentStart} durationInFrames={contentDuration}>
          <BackgroundScene image={assets.video.backgroundLong(folder)} />
        </Sequence>
      )}

      {items.map((item, index) => {
        const milestonesPassed =
          milestones.filter(milestone => index >= milestone).length;

        const itemStart = items.slice(0, index).reduce(
          (total, current) =>
            total + getItemDuration(current), contentStart
        );

        const start = itemStart + milestonesPassed * milestoneDuration;

        return (
          <Fragment key={item.name}>

            {/* QUESTION */}
            {config.showQuestion && (
              <Sequence from={start} durationInFrames={questionDuration}>
                <QuestionSceneLong
                  image={assets.entity.image(item)}
                  folder={folder}
                  showTimer={config.showTimer}
                  showCorrect={config.showCorrect}
                />
              </Sequence>
            )}

            {/* KIKU THINKING */}
            {config.showQuestion && (
              <Sequence
                from={start}
                durationInFrames={questionDuration + timerDuration}
              >
                {/* KIKU Thinking */}
                <KikuAnimation
                  webm={assets.shared.thinking}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 100,
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
                from={start + questionDuration}
                durationInFrames={timerDuration}
              >
                <TimerSceneLong
                  image={assets.entity.image(item)}
                  folder={folder}
                />
              </Sequence>
            )}

            {/* CORRECT */}
            {config.showCorrect && (
              <Sequence
                from={start + questionDuration + timerDuration}
                durationInFrames={correctDuration}
              >
                <CorrectScene
                  image={assets.entity.image(item)}
                  audioFile={assets.shared.praise(item.praiseAudio)}
                  folder={folder}
                />
              </Sequence>
            )}

            {/* LEARNING */}
            {config.showLearning && (
              <Sequence
                from={
                  start +
                  questionDuration +
                  timerDuration +
                  correctDuration
                }
                durationInFrames={getLearningDuration(item)}
              >
                <LearningSceneLong
                  image={assets.entity.image(item)}
                  name={item.name}
                  hindiName={item.hindiName}
                  audioFile={assets.entity.narration(item)}
                  folder={folder}
                  showTimer={config.showTimer}
                  showCorrect={config.showCorrect}
                />
              </Sequence>
            )}

            {/* FACT VIDEO */}
            {config.showFact && (
              <Sequence
                from={
                  start +
                  questionDuration +
                  timerDuration +
                  correctDuration +
                  getLearningDuration(item)
                }
                durationInFrames={getFactDuration(item)}
              >
                <FactSceneLong
                  videoFile={assets.entity.dance(item)}
                  folder={folder}
                />
              </Sequence>
            )}

            {/* SONG VIDEO */}
            {config.showSong && (
              <Sequence
                from={
                  start +
                  questionDuration +
                  timerDuration +
                  correctDuration +
                  getLearningDuration(item) +
                  getFactDuration(item)
                }
                durationInFrames={getSongDuration(item)}
              >
                <SongSceneLong
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

      {config.showMilestone &&
        milestones.map(
          (milestone, index) => {
            const start = contentStart + getItemsDuration(
              items.slice(0, milestone)
            ) +
              index * milestoneDuration;


            return (
              <Sequence
                key={milestone}
                from={start}
                durationInFrames={milestoneDuration}
              >
                <MilestoneScene
                  items={items.slice(milestone - 5, milestone)}
                  topicName={title}
                  musicFile={assets.shared.revealMusic}
                  folder={folder}
                />
              </Sequence>
            );
          }
        )
      }

      {config.showCompletion && (
        <Sequence
          from={completionStart}
          durationInFrames={completionDuration}
        >
          <CompletionScene
            audioFile={assets.video.completionAudio(folder)}
            musicFile={assets.shared.revealMusic}
            folder={folder}
          />
        </Sequence>
      )}

      {config.showOutro && (
        <Sequence
          from={completionStart + completionDuration}
          durationInFrames={outroDuration}
        >
          <OutroScene
            musicFile={assets.shared.revealMusic}
            folder={folder}
          />
        </Sequence>
      )}
    </>
  );
};