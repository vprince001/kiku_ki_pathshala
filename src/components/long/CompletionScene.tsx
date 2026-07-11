import {
    Audio,
    OffthreadVideo,
    staticFile,
} from "remotion";
import { BackgroundScene } from "../shared/BackgoundScene";
import { assets } from "../../data/assets";

type CompletionSceneProps = {
    audioFile: string;
    musicFile?: string;
};

export const CompletionScene = ({
    audioFile,
    musicFile,
}: CompletionSceneProps) => {
    return (
        <>
            <BackgroundScene image={assets.shared.completionBackground} />

            {/* Happy Kiku */}
            <OffthreadVideo
                src={staticFile("shared/kiku/completion.webm")}
                transparent
                style={{
                    position: "absolute",
                    bottom: 0,
                    right: 650,
                    width: 600,
                    zIndex: 10,
                }}
            />

            {/* Dialogue */}
            <Audio src={audioFile} volume={1} />

            {/* BG Music */}
            {musicFile && <Audio src={musicFile} volume={0.50} />}
        </>
    );
};