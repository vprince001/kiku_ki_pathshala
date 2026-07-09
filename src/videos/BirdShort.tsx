import { ShortVideo } from "../components/ShortVideo";
import { getCategory, getShortDuration } from "../helpers";

const category = getCategory("birdShort");

export const VIDEO_CONFIG = {
  showQuestion: false,
  showTimer: false,
  showCorrect: false,
  showLearning: false,
  showSong: true,
  showOutro: true,
};

console.log(category.items);
export const BirdShortDuration =
  getShortDuration(category.items, VIDEO_CONFIG);

export const BirdShort = () => (
  <ShortVideo category={category} config={VIDEO_CONFIG} />
);
