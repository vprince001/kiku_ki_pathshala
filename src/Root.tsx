import { Composition } from "remotion";
import "./fonts.css";
import {
  // Animals
  // AnimalLongConfig,

  // Birds
  // BirdLongConfig,

  // Body Parts
  // BodyPartLongConfig,
  // BodyPartShortConfig,
  // BodyPartReelConfig,

  // Colour
  // ColourShortConfig,

  // Community Helpers
  // CommunityHelperLongConfig,

  // Dinosaurs
  // DinosaursLongConfig,

  // Farm Animals
  // FarmAnimalLongConfig,
  // FarmAnimalShortConfig,

  // Flowers
  // FlowerShortConfig,
  // FlowerReelConfig,
  // FlowerLongConfig,

  // Food Items
  // FoodItemsLongConfig,

  // Fruits
  // FruitLongConfig,

  // Household Objects
  // HouseholdObjectLongConfig,

  // Insects
  // InsectLongConfig,
  // InsectShortConfig,
  // InsectReelConfig,

  // Pet Animals
  // PetAnimalLongConfig

  // Places Around Us
  // PlacesAroundUsConfig,

  // Reptiles
  // ReptileLongConfig,

  // Sea Animals
  // SeaAnimalLongConfig,

  // School Objects
  // SchoolObjectLongConfig,

  // Shapes
  // ShapeShortConfig,
  // ShapeReelConfig,

  // Toys
  // ToysLongConfig,

  // Vehicles
  // VehicleLongConfig,
  VehicleShortConfig,
  // VehicleReelConfig,

  // Wild Animals
  // WildAnimalLongConfig,
} from "./config";

export const RemotionRoot = () => {
  return <Composition {...VehicleShortConfig} />;
};