import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("constructionVehicleLong");

export const VIDEO_CONFIG = {
  showIntro: false,
  showBrief: true,
  showQuestion: true,
  showTimer: true,
  showCorrect: false,
  showLearning: true,
  showSong: true,
  showMilestone: true,
  showCompletion: false,
  showOutro: true,
  milestones: [5, 10, 15, 20],
};

console.log(category.items);
export const ConstructionVehicleLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const ConstructionVehicleLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
