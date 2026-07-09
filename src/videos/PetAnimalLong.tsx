import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("petAnimalLong", "20 Pet Animals Songs");

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
  showOutro: true,
  milestones: [5, 10, 15, 20],
};

export const PetAnimalLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const PetAnimalLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
