import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("flyingBirdLong", "20-Flying-Bird-Names-v5");

export const VIDEO_CONFIG = {
  showIntro: false,
  showBrief: true,
  showQuestion: true,
  showTimer: true,
  showCorrect: false,
  showLearning: true,
  showFact: false,
  showSong: true,
  showMilestone: true,
  showCompletion: false,
  showOutro: true,
  milestones: [5, 10, 15, 20],
};

console.log(category.items);
export const FlyingBirdLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const FlyingBirdLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
