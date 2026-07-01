import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("insectLong", "20-insect-names-v18");

export const VIDEO_CONFIG = {
  showIntro: false,
  showBrief: true,
  showQuestion: true,
  showHindi: true,
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

export const InsectLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const InsectLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
