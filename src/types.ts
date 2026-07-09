import { Entity } from "./data/types";

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
  showTimer?: boolean;
  showCorrect?: boolean;
  showLearning?: boolean;
  showSong?: boolean;
  showMilestone?: boolean;
  showCompletion?: boolean;
  showOutro?: boolean;
  milestones?: number[];
};

export type ShortVideoConfig = {
  showQuestion?: boolean;
  showTimer?: boolean;
  showCorrect?: boolean;
  showLearning?: boolean;
  showSong?: boolean;
  showOutro?: boolean;
};
