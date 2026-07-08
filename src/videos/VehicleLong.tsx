import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("vehicleLong", "20-Vehicle-Names");

export const VIDEO_CONFIG = {
  showIntro: false,
  showBrief: true,
  showQuestion: true,
  showHindi: false,
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
export const VehicleLongDuration =
  getLongDuration(category.items, VIDEO_CONFIG);

export const VehicleLong = () => (
  <LongVideo category={category} config={VIDEO_CONFIG} />
);
