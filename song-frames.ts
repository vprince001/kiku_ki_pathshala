import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const FPS = 30;
const ROOT = "./public/entities";

function getSongFrames(songPath: string) {
  const duration = Number(
    execSync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${songPath}"`
    )
  );

  return Math.ceil(duration * FPS);
}

function scan(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scan(fullPath);
      continue;
    }

    // if (entry.name !== "dance.mp4") {
    //   continue;
    // }

    if (entry.name !== "song.mp3") {
      continue;
    }

    const entity = path.basename(path.dirname(fullPath));
    const frames = getSongFrames(fullPath);

    console.log(`${entity}: ${frames},`);
  }
}

scan(ROOT);