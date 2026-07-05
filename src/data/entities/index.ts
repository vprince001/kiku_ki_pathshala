import { amphibians } from "./amphibians";
import { animals } from "./animals";
import { birds } from "./birds";
import { crustaceans } from "./crustaceans";
import { fishes } from "./fishes";
import { reptiles } from "./reptiles";

export const entities = {
  ...amphibians,
  ...animals,
  ...birds,
  ...crustaceans,
  ...fishes,
  ...reptiles,
};