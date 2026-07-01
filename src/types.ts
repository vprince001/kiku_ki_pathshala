import { Entity } from "./data/types";

export type LearningLongItem = {
  name: string;
  hindiName?: string;
  image: string;
  praiseAudio: string;
  narration: string;
  video: string;
  video2?: string;
  learningFrames?: number;
  factFrames?: number;
  songAudio?: string;
  songFrames?: number;
  callout?: string;
};

export type Category = {
  title: string;
  folder: string;
  items: Entity[];
};

export type MilestoneConfig = {
  checkpoint: number;
  component: React.ComponentType<{
    items: Entity[];
    topicName: string;
    musicFile: string;
    folder: string;
  }>;
};

export type LongVideoConfig = {
  showIntro?: boolean;
  showBrief?: boolean;
  showQuestion?: boolean;
  showHindi?: boolean;
  showTimer?: boolean;
  showCorrect?: boolean;
  showLearning?: boolean;
  showFact?: boolean;
  showSong?: boolean;
  showMilestone?: boolean;
  showCompletion?: boolean;
  showOutro?: boolean;
  milestones?: number[];
};
