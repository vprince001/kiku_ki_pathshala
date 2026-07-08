import { amphibians } from "./amphibians";
import { animals } from "./animals";
import { birds } from "./birds";
import { crustaceans } from "./crustaceans";
import { fishes } from "./fishes";
import { reptiles } from "./reptiles";
import { vehicles } from "./vehicles";

export const entities = {
  ...amphibians,
  ...animals,
  ...birds,
  ...crustaceans,
  ...fishes,
  ...reptiles,
  ...vehicles,
};