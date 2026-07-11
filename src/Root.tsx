import { Composition } from "remotion";
import "./fonts.css";
import {
  // Animals
  // AnimalLongConfig,

  // Birds
  // BirdLongConfig,
  BirdShortConfig,

  // Body Parts
  // BodyPartLongConfig,
  // BodyPartShortConfig,
  // BodyPartReelConfig,

  // Colour
  // ColourShortConfig,

  // Community Helpers
  // CommunityHelperLongConfig,

  // Construction Vehicles
  // ConstructionVehicleLongConfig,

  // Dinosaurs
  // DinosaursLongConfig,

  // Farm Animals
  // FarmAnimalLongConfig,
  // FarmAnimalShortConfig,

  // Flowers
  // FlowerLongConfig,
  // FlowerShortConfig,
  // FlowerReelConfig,

  // Flying Birds
  // FlyingBirdLongConfig,

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
  // VehicleShortConfig,
  // VehicleReelConfig,

  // Wild Animals
  // WildAnimalLongConfig,
  // WildAnimalShortConfig,

  // Zoo Animals
  // ZooAnimalLongConfig,
} from "./config";

export const RemotionRoot = () => {
  return <Composition {...BirdShortConfig} />;
};