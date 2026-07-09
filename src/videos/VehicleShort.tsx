import { ShortVideo } from "../components/ShortVideo";
import { getCategory, getShortDuration } from "../helpers";

const category = getCategory("vehicleShort");

export const VIDEO_CONFIG = {
  showQuestion: false,
  showTimer: false,
  showCorrect: false,
  showLearning: false,
  showSong: false,
  showOutro: true,
};

console.log(category.items);
export const VehicleShortDuration =
  getShortDuration(category.items, VIDEO_CONFIG);

export const VehicleShort = () => (
  <ShortVideo category={category} config={VIDEO_CONFIG} />
);
