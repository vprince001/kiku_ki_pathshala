import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("reptileLong");

export const VIDEO_CONFIG = {
  showIntro: false,
  showBrief: false,
  showQuestion: false,
  showTimer: false,
  showCorrect: false,
  showLearning: false,
  showFact: false,
  showSong: true,
  showMilestone: false,
  showCompletion: false,
  showOutro: false,
  milestones: [5, 10, 15, 20],
};

export const ReptileLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const ReptileLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
