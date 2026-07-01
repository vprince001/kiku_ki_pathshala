import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("animalLong", "20-animal-names-v6");

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
  milestones: [5, 10],
};

export const AnimalLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const AnimalLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
