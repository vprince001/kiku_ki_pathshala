import { interpolate } from "remotion";
import {
  LONG_TIMINGS_ENGLISH,
  LONG_TIMINGS_HINDI,
  SHORT_TIMINGS_ENGLISH_1_FACT,
  SHORT_TIMINGS_ENGLISH_2_FACT,
  SHORT_TIMINGS_HINDI_1_FACT,
  SHORT_TIMINGS_HINDI_2_FACT
} from "./config";
import { LearningLongItem, LongVideoConfig } from "./types";
import seedrandom from "seedrandom";
import { categories } from "./data/categories";
import { entities } from "./data/entities";

export const getShortDuration = (
  itemCount: number,
  showHindi: boolean,
  outroDuration: number,
  factCount: number = 1
) => {
  const shortTimingEnglish = factCount == 1 ?
    SHORT_TIMINGS_ENGLISH_1_FACT :
    SHORT_TIMINGS_ENGLISH_2_FACT;

  const shortTimingHindi = factCount === 1 ?
    SHORT_TIMINGS_HINDI_1_FACT :
    SHORT_TIMINGS_HINDI_2_FACT;

  const shortTimings = showHindi
    ? shortTimingHindi
    : shortTimingEnglish;

  return (
    itemCount * shortTimings.ITEM_DURATION +
    outroDuration
  );
};

export const DEFAULT_LONG_VIDEO_CONFIG = {
  showIntro: true,
  showBrief: true,
  showQuestion: true,
  showHindi: false,
  showTimer: true,
  showCorrect: true,
  showLearning: true,
  showFact: true,
  showSong: true,
  showMilestone: true,
  showCompletion: true,
  showOutro: true,
};

export const getLongDuration = (
  items: LearningLongItem[],
  config: LongVideoConfig = DEFAULT_LONG_VIDEO_CONFIG
) => {
  const timings = config.showHindi ? LONG_TIMINGS_HINDI : LONG_TIMINGS_ENGLISH;

  const introDuration = config.showIntro ? timings.INTRO : 0;
  const briefDuration = config.showBrief ? timings.BRIEF : 0;

  const questionDuration = config.showQuestion ? timings.QUESTION : 0;
  const timerDuration = config.showTimer ? timings.TIMER : 0;
  const correctDuration = config.showCorrect ? timings.CORRECT : 0;
  console.log("items", items);
  const getLearningDuration = (item: LearningLongItem) =>
    config.showLearning
      ? item.learningFrames ?? timings.LEARNING
      : 0;

  const getFactDuration = (item: LearningLongItem) =>
    config.showFact
      ? item.factFrames ?? timings.FACT
      : 0;

  const getSongDuration = (item: LearningLongItem) =>
    config.showSong
      ? item.songFrames ?? 0
      : 0;

  const getItemDuration = (item: LearningLongItem) =>
    questionDuration +
    timerDuration +
    correctDuration +
    getLearningDuration(item) +
    getFactDuration(item) +
    getSongDuration(item);

  const totalItemsDuration = items.reduce(
    (total, item) => total + getItemDuration(item),
    0
  );

  const milestoneDuration = config.showMilestone
    ? timings.MILESTONE
    : 0;

  const milestoneCount = config.showMilestone
    ? (config.milestones?.length ?? 0)
    : 0;

  const completionDuration = config.showCompletion
    ? timings.COMPLETION
    : 0;

  const outroDuration = config.showOutro
    ? timings.OUTRO
    : 0;

  return (
    introDuration +
    briefDuration +
    totalItemsDuration +
    milestoneCount * milestoneDuration +
    completionDuration +
    outroDuration
  );
};

export const getTextScale = (
  text: string,
  maxChars = 7
) => {
  if (text.length <= maxChars) {
    return 1;
  }

  return maxChars / text.length;
};

export const getNameScale = (
  frame: number,
  inputRange = [0, 4, 8, 12],
  outputRange = [0.1, 1.3, 0.9, 1],
  options = {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
  }
) =>
  interpolate(
    frame,
    inputRange,
    outputRange,
    options
  );

export const getNameOpacity = (
  frame: number,
  inputRange = [0, 4],
  outputRange = [0, 1]
) =>
  interpolate(
    frame,
    inputRange,
    outputRange,
    {
      extrapolateRight: "clamp",
    }
  );

export const getResponsiveFontSize = (
  text: string,
  baseFontSize: number,
  maxChars: number
) => {
  if (text.length <= maxChars) {
    return baseFontSize;
  }

  return Math.floor(
    baseFontSize * (maxChars / text.length)
  );
};

export const getWordOffset = (
  text: string
) => {
  const longestWord = text
    .split(" ")
    .reduce(
      (max, word) =>
        Math.max(max, word.length),
      0
    );

  if (longestWord <= 7) return 0;

  const extraChars =
    longestWord - 7;

  return -Math.round(
    extraChars * 8
  );
};

export const getTransitionEffect = (frame: number, range: number[]) =>
  interpolate(
    frame,
    [0, 15],
    range,
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

export const getCardEntry = (
  frame: number,
  startFrame: number,
  endX: number,
  endY: number
) => {
  const progress = interpolate(
    frame,
    [startFrame, startFrame + 15],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return {
    x: endX * progress,
    y: endY * progress,
  };
};

export const shuffleArray = (
  items: any[],
  seed: string
): any[] => {
  const rng = seedrandom(seed);
  const shuffled = [...items];

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      rng() * (i + 1)
    );

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
};

export function getCategory(name: keyof typeof categories, seed?: string) {
  const category = categories[name];

  const items = category.entities.map(id => entities[id]);

  return {
    ...category,
    items: seed ? shuffleArray(items, seed) : items,
  };
}