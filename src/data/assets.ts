import { staticFile } from "remotion";
import { Entity } from "./types";

export const assets = {
  entity: {
    image: (entity: Entity) =>
      staticFile(`entities/${entity.entityType}/${entity.id}/image.png`),

    narration: (entity: Entity) =>
      staticFile(`entities/${entity.entityType}/${entity.id}/narration.mp3`),

    callout: (entity: Entity) =>
      staticFile(`entities/${entity.entityType}/${entity.id}/callout.mp3`),

    song: (entity: Entity) =>
      staticFile(`entities/${entity.entityType}/${entity.id}/song.mp3`),

    dance: (entity: Entity) =>
      staticFile(`entities/${entity.entityType}/${entity.id}/dance.mp4`),

    educationalVideo: (entity: Entity) =>
      staticFile(`entities/${entity.entityType}/${entity.id}/educational.mp4`),

    realVideo: (entity: Entity) =>
      staticFile(`entities/${entity.entityType}/${entity.id}/real.mp4`),
  },

  video: {
    backgroundLong: (folder: string) =>
      staticFile(`videos/${folder}/backgrounds/long.png`),

    backgroundShort: (folder: string) =>
      staticFile(`videos/${folder}/backgrounds/short.png`),

    openingBackground: (folder: string) =>
      staticFile(`videos/${folder}/backgrounds/opening.png`),

    questionAudio: (folder: string) =>
      staticFile(`videos/${folder}/audio/question.mp3`),

    briefAudio: (folder: string, itemCount: number) =>
      staticFile(`videos/${folder}/audio/brief_10.mp3`),

    milestoneAudio: (folder: string) =>
      staticFile(`videos/${folder}/audio/milestone_5.mp3`),

    completionAudio: (folder: string) =>
      staticFile(`videos/${folder}/audio/completion_10.mp3`),
  },

  shared: {
    praise: (index: number = 1) =>
      staticFile(`shared/audio/correct/${index}.mp3`),

    sparkle: staticFile("shared/audio/sound_effects/sparkle.mp3"),

    starSparkle: staticFile("shared/audio/sound_effects/star_sparkle.mp3"),

    revealMusic: staticFile("shared/audio/music/reveal_music.mp3"),

    boardStar: staticFile("shared/images/board_star.png"),

    completionBackground: staticFile(`shared/images/completion_background.png`),
    
    outro: staticFile("shared/audio/outro.mp3"),

    wave: staticFile(`shared/kiku/wave.webm`),

    intro: staticFile(`shared/kiku/intro.webm`),

    thinking: staticFile(`shared/kiku/thinking.webm`),

    pointing: staticFile(`shared/kiku/pointing.webm`),

    happy: staticFile(`shared/kiku/happy.webm`),
  },
};