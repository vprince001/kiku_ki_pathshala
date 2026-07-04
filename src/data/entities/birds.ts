import { Entity } from "../types";

export const birds: Record<string, Entity> = {
  duck: {
    id: "duck",
    name: "Duck",
    hindiName: "बत्तख",
    entityType: "bird",
    learningFrames: 210,
    factFrames: 360,
    songFrames: 349,
  },

  hen: {
    id: "hen",
    name: "hen",
    hindiName: "मुर्गी",
    entityType: "bird",
    learningFrames: 195,
    factFrames: 360,
    songFrames: 354,
  },

  rooster: {
    id: "rooster",
    name: "Rooster",
    hindiName: "मुर्गा",
    entityType: "bird",
    learningFrames: 250,
    factFrames: 360,
    songFrames: 358,
  },

  turkey: {
    id: "turkey",
    name: "Turkey",
    hindiName: "टर्की",
    entityType: "bird",
    learningFrames: 235,
    factFrames: 360,
    songFrames: 355,
  },
};