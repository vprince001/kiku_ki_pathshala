export interface Entity {
  id: string;

  name: string;
  hindiName?: string;

  entityType:
  | "amphibian"
  | "animal"
  | "bird"
  | "crustacean"
  | "fish"
  | "flower"
  | "fruit"
  | "householdObject"
  | "insect"
  | "mollusk"
  | "reptile"
  | "vehicle"
  ;

  learningFrames?: number;
  factFrames?: number;
  songFrames?: number;
  danceFrames?: number;

  praiseAudio?: number;
}