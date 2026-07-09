import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("birdLong", "20-bird-names-v1");

export const VIDEO_CONFIG = {
  showIntro: false,
  showBrief: true,
  showQuestion: true,
  showTimer: false,
  showCorrect: false,
  showLearning: true,
  showFact: false,
  showSong: true,
  showMilestone: true,
  showCompletion: true,
  showOutro: true,
  milestones: [5, 10, 15, 20],
};

export const BirdLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const BirdLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
