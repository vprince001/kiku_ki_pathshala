import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("seaAnimals", "15-sea-animal-names-v1");

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

export const SeaAnimalLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const SeaAnimalLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
