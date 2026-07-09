import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("toys", "15-toy-names-v1");

export const VIDEO_CONFIG = {
  showIntro: false,
  showBrief: true,
  showQuestion: true,
  showTimer: true,
  showCorrect: false,
  showMilestone: true,
  showCompletion: true,
  showOutro: true,
  milestones: [5],
};

export const ToyLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const ToyLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
