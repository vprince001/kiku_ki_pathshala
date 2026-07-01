import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("farmAnimals", "15-farm-animal-names-v1");

export const VIDEO_CONFIG = {
  showIntro: false,
  showBrief: true,
  showQuestion: true,
  showHindi: true,
  showTimer: true,
  showCorrect: false,
  showMilestone: true,
  showCompletion: true,
  showOutro: true,
  milestones: [5],
};

export const FarmAnimalLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const FarmAnimalLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
