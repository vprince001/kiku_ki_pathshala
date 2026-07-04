import { Composition } from "remotion";
import "./fonts.css";
import {
  // Animals
  AnimalLongConfig,

  // Fruits
  // FruitLongConfig,

  // Birds
  // BirdLongConfig,

  // Colour
  // ColourShortConfig,

  // Shapes
  // ShapeShortConfig,
  // ShapeReelConfig,

  // Vehicles
  // VehicleShortConfig,
  // VehicleReelConfig,

  // Flowers
  // FlowerShortConfig,
  // FlowerReelConfig,
  // FlowerLongConfig,

  // Body Parts
  // BodyPartLongConfig,
  // BodyPartShortConfig,
  // BodyPartReelConfig,

  // Insects
  // InsectLongConfig,
  // InsectShortConfig,
  // InsectReelConfig,

  // Farm Animals
  FarmAnimalLongConfig,
  // FarmAnimalShortConfig,

  // Sea Animals
  // SeaAnimalLongConfig,

  // Wild Animals
  // WildAnimalLongConfig,

  // School Objects
  // SchoolObjectLongConfig,

  // Household Objects
  // HouseholdObjectLongConfig,

  // Community Helpers
  // CommunityHelperLongConfig,

  // Food Items
  // FoodItemsLongConfig,

  // Places Around Us
  // PlacesAroundUsConfig,

  // Toys
  // ToysLongConfig,

  // Dinosaurs
  // DinosaursLongConfig,

  // Pet Animals
  // PetAnimalLongConfig
} from "./config";

export const RemotionRoot = () => {
  return <Composition { ...FarmAnimalLongConfig} />;
};