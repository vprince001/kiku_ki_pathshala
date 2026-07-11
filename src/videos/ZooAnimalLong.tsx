import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("zooAnimalLong", "20-Zoo-Animal-Names-Long-v1");

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

console.log(category.items);
export const ZooAnimalLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const ZooAnimalLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
