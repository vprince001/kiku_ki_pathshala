import { animals } from "./animals";
import { birds } from "./birds";
import { reptiles } from "./reptiles";

export const entities = {
  ...animals,
  ...birds,
  ...reptiles,
};