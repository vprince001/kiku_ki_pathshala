import {
    Audio,
    OffthreadVideo,
    staticFile,
} from "remotion";
import { BackgroundScene } from "../shared/BackgoundScene";

type OutroSceneProps = {
    audioFile?: string;
    musicFile?: string;
    folder: string;
};

export const OutroScene = ({
    audioFile,
    musicFile,
    folder,
}: OutroSceneProps) => {
    return (
        <>
            <BackgroundScene
                image={staticFile("shared/images/outro_background.png")}
            />

            {/* Kiku Outro */}
            <OffthreadVideo
                src={staticFile("shared/kiku/outro.webm")}
                transparent
                style={{
                    position: "absolute",
                    bottom: 0,
                    right: 920,
                    width: 600,
                    zIndex: 10,
                }}
            />

            {/* Dialogue */}
            {audioFile && <Audio
                src={staticFile(`${folder}/audio/${audioFile}`)}
            />}

            {/* BG Music */}
            {musicFile && <Audio src={musicFile} volume={0.50} />}
        </>
    );
};