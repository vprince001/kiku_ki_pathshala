import { interpolate } from "remotion";
import { LONG_TIMINGS, SHORT_TIMINGS } from "./config";
import { LongVideoConfig, ShortVideoConfig } from "./types";
import seedrandom from "seedrandom";
import { categories } from "./data/categories";
import { entities } from "./data/entities";
import { Entity } from "./data/types";

export const DEFAULT_LONG_VIDEO_CONFIG = {
  showIntro: false,
  showBrief: false,
  showQuestion: false,
  showTimer: false,
  showCorrect: false,
  showLearning: true,
  showSong: false,
  showMilestone: false,
  showCompletion: false,
  showOutro: false,
};

export const DEFAULT_SHORT_VIDEO_CONFIG = {
  showQuestion: false,
  showTimer: false,
  showCorrect: false,
  showLearning: true,
  showSong: false,
  showOutro: false,
};

export const getLongDuration = (
  items: Entity[],
  config: LongVideoConfig = DEFAULT_LONG_VIDEO_CONFIG
) => {
  const timings = LONG_TIMINGS;

  const introDuration = config.showIntro ? timings.INTRO : 0;
  const briefDuration = config.showBrief ? timings.BRIEF : 0;

  const questionDuration = config.showQuestion ? timings.QUESTION : 0;
  const timerDuration = config.showTimer ? timings.TIMER : 0;
  const correctDuration = config.showCorrect ? timings.CORRECT : 0;

  const getLearningDuration = (item: Entity) =>
    config.showLearning
      ? item.learningFrames ?? timings.LEARNING
      : 0;

  const getSongDuration = (item: Entity) =>
    config.showSong
      ? item.songFrames ?? 0
      : 0;

  const getItemDuration = (item: Entity) =>
    questionDuration +
    timerDuration +
    correctDuration +
    getLearningDuration(item) +
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

export const getShortDuration = (
  items: Entity[],
  config: ShortVideoConfig = DEFAULT_SHORT_VIDEO_CONFIG
) => {
  const timings = SHORT_TIMINGS;

  const questionDuration = config.showQuestion ? timings.QUESTION : 0;
  const timerDuration = config.showTimer ? timings.TIMER : 0;
  const correctDuration = config.showCorrect ? timings.CORRECT : 0;

  const getLearningDuration = (item: Entity) =>
    config.showLearning
      ? item.learningFrames ?? timings.LEARNING
      : 0;

  const getSongDuration = (item: Entity) =>
    config.showSong
      ? item.songFrames ?? 0
      : 0;

  const getItemDuration = (item: Entity) =>
    questionDuration +
    timerDuration +
    correctDuration +
    getLearningDuration(item) +
    getSongDuration(item);

  const totalItemsDuration = items.reduce(
    (total, item) => total + getItemDuration(item),
    0
  );

  const outroDuration = config.showOutro ? timings.OUTRO : 0;

  return (
    totalItemsDuration +
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
  items: Entity[],
  seed: string
): Entity[] => {
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

const MAX_SINGLE_LINE_WIDTH = 14;

const measureWidth = (text: string) => text.length;

const splitThreeWords = (words: string[]): string[] => {
  const firstTwo = `${words[0]} ${words[1]}`;
  const lastTwo = `${words[1]} ${words[2]}`;

  const width12 = measureWidth(firstTwo);
  const width23 = measureWidth(lastTwo);
  const width3 = measureWidth(words[2]);

  // If first two words fit comfortably on one line and
  // are not wider than the third word, keep them together.
  if (
    width12 <= MAX_SINGLE_LINE_WIDTH &&
    width12 <= width3
  ) {
    return [firstTwo, words[2]];
  }

  // Otherwise choose the more balanced split.
  const score12_3 = Math.abs(width12 - width3);
  const score1_23 = Math.abs(measureWidth(words[0]) - width23);

  return score12_3 <= score1_23
    ? [firstTwo, words[2]]
    : [words[0], lastTwo];
};

export const splitEnglishWord = (englishWord: string): string[] => {
  const words = englishWord.trim().split(/\s+/);

  if (words.length === 1) {
    return words;
  }

  if (words.length === 2) {
    const combined = words.join(" ");
    const result = measureWidth(combined) <= MAX_SINGLE_LINE_WIDTH
      ? [combined]
      : words;
    return result
  }

  if (words.length === 3) {
    return splitThreeWords(words);
  }

  // 4+ words (generic balancing)
  let bestSplit = 1;
  let bestScore = Number.MAX_SAFE_INTEGER;

  for (let i = 1; i < words.length; i++) {
    const left = words.slice(0, i).join(" ");
    const right = words.slice(i).join(" ");

    const score = Math.abs(
      measureWidth(left) - measureWidth(right)
    );

    if (score < bestScore) {
      bestScore = score;
      bestSplit = i;
    }
  }

  return [
    words.slice(0, bestSplit).join(" "),
    words.slice(bestSplit).join(" "),
  ];
};