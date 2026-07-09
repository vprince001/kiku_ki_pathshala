import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("dinosaurs", "15-dinosaur-names-v1");

export const VIDEO_CONFIG = {
  showIntro: false,
  showBrief: true,
  showQuestion: true,
  showTimer: false,
  showCorrect: false,
  showLearning: true,
  showFact: true,
  showMilestone: true,
  showCompletion: true,
  showOutro: true,
  milestones: [5, 10],
};

export const DinosaurLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const DinosaurLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
