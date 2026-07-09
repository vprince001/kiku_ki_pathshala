import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("wildAnimalLong");

export const VIDEO_CONFIG = {
  showIntro: false,
  showBrief: false,
  showQuestion: false,
  showTimer: false,
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
export const WildAnimalLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const WildAnimalLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
