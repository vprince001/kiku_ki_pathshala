import { ShortVideo } from "../components/ShortVideo";
import { getCategory, getShortDuration } from "../helpers";

const category = getCategory("wildAnimalShort");

export const VIDEO_CONFIG = {
  showQuestion: false,
  showTimer: false,
  showCorrect: false,
  showLearning: false,
  showSong: true,
  showOutro: true,
};

console.log(category.items);
export const WildAnimalShortDuration =
  getShortDuration(category.items, VIDEO_CONFIG);

export const WildAnimalShort = () => (
  <ShortVideo category={category} config={VIDEO_CONFIG} />
);
