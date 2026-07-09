import { LongVideo } from "../components/LongVideo";
import { getCategory, getLongDuration } from "../helpers";

const category = getCategory("foodItems", "15-food-item-names-v1");

export const VIDEO_CONFIG = {
  showIntro: false,
  showBrief: true,
  showQuestion: true,
  showTimer: true,
  showCorrect: false,
  showMilestone: true,
  showCompletion: true,
  showOutro: true,
  milestones: [5, 10],
};


export const FoodItemLong = () => (
  <LongVideo category={category} />
);

export const FoodIemLongDuration =
  getLongDuration(
    category.items,
    VIDEO_CONFIG
  );