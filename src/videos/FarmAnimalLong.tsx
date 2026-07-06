import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("farmAnimalLong", "20-Farm-Animal-Songs-v6");

export const VIDEO_CONFIG = {
  showIntro: false,
  showBrief: false,
  showQuestion: false,
  showHindi: false,
  showTimer: false,
  showCorrect: false,
  showLearning: false,
  showFact: false,
  showSong: true,
  showMilestone: false,
  showCompletion: false,
  showOutro: true,
  milestones: [5, 10, 15, 20],
};

export const FarmAnimalLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const FarmAnimalLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
