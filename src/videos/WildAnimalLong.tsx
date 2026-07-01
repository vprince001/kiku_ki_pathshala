import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("wildAnimalLong", "20-wild-animals-names-v4");

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

export const WildAnimalLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const WildAnimalLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
